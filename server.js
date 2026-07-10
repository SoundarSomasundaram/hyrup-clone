import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// True Power Auth Token and base API setup
const TRUEPOWER_AUTH_TOKEN = process.env.TRUEPOWER_AUTH_TOKEN || '';
const TRUEPOWER_BASE_URL = 'https://api-stg.gettruepower.in/admin/stations';

// Gemini LLM setup
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Keep track of tool calls in memory for the UI to query or show live updates
let recentToolCalls = [];

// Helper function to call the True Power API
async function fetchFromTruePower(params = {}) {
  try {
    const response = await axios.get(TRUEPOWER_BASE_URL, {
      params,
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${TRUEPOWER_AUTH_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('True Power API error:', error.message);
    if (error.response) {
      console.error('True Power Error Data:', error.response.data);
      throw new Error(`True Power API responded with status ${error.response.status}: ${JSON.stringify(error.response.data)}`);
    }
    throw error;
  }
}

// Clean station object to send to LLM (reduces tokens and avoids noise)
function cleanStationData(station) {
  if (!station) return null;
  return {
    id: station.id,
    name: station.name,
    status: station.status,
    no_of_charge_points: station.no_of_charge_points,
    no_of_connectors: station.no_of_connectors,
    active_sessions: station.active_sessions,
    total_sessions: station.total_sessions,
    total_energy_consumed: station.total_energy_consumed,
    address: station.address ? `${station.address.address_line1 || ''}, ${station.address.city || ''}, ${station.address.state || ''}`.trim() : 'N/A',
    company: station.company?.company_name || 'N/A',
    host_name: station.host?.name || 'N/A'
  };
}

// Define tools (functions) available to Gemini
const listStationsTool = {
  name: 'list_stations',
  description: 'Get a list of all EV charging stations with their basic status and locations.',
  parameters: {
    type: 'OBJECT',
    properties: {},
    required: []
  }
};

const searchStationsTool = {
  name: 'search_stations',
  description: 'Search for EV charging stations by name, city, or state. Use this when the user asks about a station by name (e.g., "Direction EV", "Delhi", etc.)',
  parameters: {
    type: 'OBJECT',
    properties: {
      query: {
        type: 'STRING',
        description: 'The search search term (name, city, or state).'
      }
    },
    required: ['query']
  }
};

const getStationByIdTool = {
  name: 'get_station_by_id',
  description: 'Get details of a specific EV charging station using its station ID. Use this when the user provides a numeric ID (e.g. 6786, 1121).',
  parameters: {
    type: 'OBJECT',
    properties: {
      stationId: {
        type: 'STRING',
        description: 'The numeric ID of the station.'
      }
    },
    required: ['stationId']
  }
};

// Implement API calls matching the tools
async function listStations() {
  const data = await fetchFromTruePower();
  const stations = data?.data?.stations || [];
  return stations.map(cleanStationData);
}

async function searchStations(query) {
  const data = await fetchFromTruePower({
    'search[name_or_address_city_or_address_state_cont]': query,
    'page': 1
  });
  const stations = data?.data?.stations || [];
  return stations.map(cleanStationData);
}

async function getStationById(stationId) {
  const data = await fetchFromTruePower({
    'search[id_eq]': stationId
  });
  const stations = data?.data?.stations || [];
  return stations.map(cleanStationData);
}

// REST endpoints for the dashboard
app.get('/api/stations', async (req, res) => {
  try {
    const data = await fetchFromTruePower();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stations/search', async (req, res) => {
  try {
    const { query, id } = req.query;
    let data;
    if (id) {
      data = await fetchFromTruePower({ 'search[id_eq]': id });
    } else {
      data = await fetchFromTruePower({
        'search[name_or_address_city_or_address_state_cont]': query || '',
        'page': 1
      });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/recent-tool-calls', (req, res) => {
  res.json(recentToolCalls);
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history, geminiApiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKeyToUse = geminiApiKey || process.env.GEMINI_API_KEY;

  if (!apiKeyToUse) {
    return res.status(500).json({ 
      error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file or enter it in the Settings panel in the UI.' 
    });
  }

  try {
    // Reset recent tool calls for this request
    recentToolCalls = [];

    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    
    // Initialize the model with the tool declarations
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: `You are an EV Charging Customer Care assistant. You help support agents troubleshoot why users cannot charge their vehicles at specific stations.
You have access to tools that fetch station lists and search details. Always use these tools to look up the status and details of the station the user is asking about.
Analyze the status field (e.g., 'closed', 'open', 'under_maintenance', etc.) and other parameters like active sessions or connector counts to explain clearly and concisely why charging might be failing.
- If status is 'closed', explain that the station is currently closed and not accepting charges.
- If status is 'under_maintenance', explain it is down for maintenance.
- Be polite, direct, and helpful. Mention the specific station name and its details in your explanation.`,
      tools: [{
        functionDeclarations: [listStationsTool, searchStationsTool, getStationByIdTool]
      }]
    });

    // Format chat history for Gemini API
    const formattedHistory = (history || []).map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    const chat = model.startChat({
      history: formattedHistory
    });

    console.log(`User query: "${message}"`);
    let result = await chat.sendMessage(message);
    let response = result.response;
    
    // Check if Gemini requested to call functions
    let functionCalls = response.functionCalls;
    
    // We execute function calls in a loop in case Gemini decides it needs another call after receiving the data
    let loopCount = 0;
    const maxLoops = 5;
    
    while (functionCalls && functionCalls.length > 0 && loopCount < maxLoops) {
      loopCount++;
      const functionResponses = [];
      
      for (const call of functionCalls) {
        const { name, args } = call;
        const callId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        
        console.log(`Tool invocation requested: ${name} with args:`, args);
        recentToolCalls.push({ id: callId, name, args, status: 'executing' });
        
        let toolResult;
        try {
          if (name === 'list_stations') {
            toolResult = await listStations();
          } else if (name === 'search_stations') {
            toolResult = await searchStations(args.query);
          } else if (name === 'get_station_by_id') {
            toolResult = await getStationById(args.stationId);
          } else {
            toolResult = { error: 'Unknown tool requested' };
          }
          
          // Mark tool call as success
          const idx = recentToolCalls.findIndex(t => t.id === callId);
          if (idx !== -1) {
            recentToolCalls[idx].status = 'success';
            recentToolCalls[idx].result = toolResult;
          }
        } catch (err) {
          console.error(`Tool execution error for ${name}:`, err.message);
          toolResult = { error: err.message };
          
          const idx = recentToolCalls.findIndex(t => t.id === callId);
          if (idx !== -1) {
            recentToolCalls[idx].status = 'failed';
            recentToolCalls[idx].error = err.message;
          }
        }

        functionResponses.push({
          functionResponse: {
            name,
            response: { result: toolResult }
          }
        });
      }
      
      // Feed the function response back to Gemini
      const nextResult = await chat.sendMessage(functionResponses);
      response = nextResult.response;
      functionCalls = response.functionCalls;
    }

    const reply = response.text();
    res.json({
      reply,
      toolCalls: recentToolCalls
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`EV Chatbot Server running on http://localhost:${PORT}`);
});
