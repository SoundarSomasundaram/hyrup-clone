// State Management
let stations = [];
let selectedStation = null;
let chatHistory = [];
let isGenerating = false;
let isMockMode = false;

// Mock Stations Data for Static Build / Demo Mode
const mockStations = [
  {
    id: 1121,
    name: "Direction EV Station",
    status: "closed",
    no_of_charge_points: 4,
    no_of_connectors: 8,
    active_sessions: 0,
    total_sessions: 1450,
    total_energy_consumed: 24500,
    address: {
      address_line1: "Plot No. 45, Sector 18",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122015"
    },
    company: "Direction EV Ltd",
    host: { name: "Rakesh Sharma" }
  },
  {
    id: 6786,
    name: "Grand Mall Charging Hub",
    status: "under_maintenance",
    no_of_charge_points: 2,
    no_of_connectors: 4,
    active_sessions: 0,
    total_sessions: 890,
    total_energy_consumed: 12400,
    address: {
      address_line1: "Lower Ground Floor, Grand Mall",
      city: "Delhi",
      state: "Delhi",
      pincode: "110002"
    },
    company: "PowerGrid EV",
    host: { name: "Mall Operations" }
  },
  {
    id: 6788,
    name: "Highway Fast Charger - NH48",
    status: "open",
    no_of_charge_points: 6,
    no_of_connectors: 12,
    active_sessions: 3,
    total_sessions: 4200,
    total_energy_consumed: 98000,
    address: {
      address_line1: "Mile 82, NH-48 Expressway",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001"
    },
    company: "TruePower Networks",
    host: { name: "Highway Plaza" }
  },
  {
    id: 8990,
    name: "Tech Park Charging Station",
    status: "open",
    no_of_charge_points: 8,
    no_of_connectors: 16,
    active_sessions: 7,
    total_sessions: 12500,
    total_energy_consumed: 310000,
    address: {
      address_line1: "Block C, Cyber Towers",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001"
    },
    company: "TruePower Networks",
    host: { name: "Cyber Towers Management" }
  },
  {
    id: 9021,
    name: "Downtown Shopping Center",
    status: "open",
    no_of_charge_points: 2,
    no_of_connectors: 4,
    active_sessions: 1,
    total_sessions: 3120,
    total_energy_consumed: 43200,
    address: {
      address_line1: "12 Church Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    company: "ElectroCharge",
    host: { name: "City Center Parking" }
  }
];

const connectionStatusDot = document.getElementById('connectionStatusDot');
const connectionStatusText = document.getElementById('connectionStatusText');

// DOM Selectors
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const refreshStationsBtn = document.getElementById('refreshStationsBtn');
const stationSearchInput = document.getElementById('stationSearchInput');
const stationsList = document.getElementById('stationsList');

// Details Card DOM
const stationDetailCard = document.getElementById('stationDetailCard');
const detName = document.getElementById('detName');
const detId = document.getElementById('detId');
const detStatus = document.getElementById('detStatus');
const detCompany = document.getElementById('detCompany');
const detHost = document.getElementById('detHost');
const detChargers = document.getElementById('detChargers');
const detConnectors = document.getElementById('detConnectors');
const detAddress = document.getElementById('detAddress');
const closeDetailBtn = document.getElementById('closeDetailBtn');
const askAiAboutStationBtn = document.getElementById('askAiAboutStationBtn');

// Settings Modal DOM
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
const truepowerTokenInput = document.getElementById('truepowerTokenInput');
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const clearSettingsBtn = document.getElementById('clearSettingsBtn');

// Tool Logs DOM
const toolLogsContainer = document.getElementById('toolLogsContainer');
const toolLogsBody = document.getElementById('toolLogsBody');
const closeLogsBtn = document.getElementById('closeLogsBtn');

// Initialize settings from LocalStorage
function loadSettings() {
  const apiKey = localStorage.getItem('gemini_api_key') || '';
  const token = localStorage.getItem('truepower_token') || '';
  
  geminiApiKeyInput.value = apiKey;
  if (token) {
    truepowerTokenInput.value = token;
  }
}

// Save settings to LocalStorage
function saveSettings() {
  const apiKey = geminiApiKeyInput.value.trim();
  const token = truepowerTokenInput.value.trim();
  
  if (apiKey) {
    localStorage.setItem('gemini_api_key', apiKey);
  } else {
    localStorage.removeItem('gemini_api_key');
  }
  
  if (token) {
    localStorage.setItem('truepower_token', token);
  } else {
    localStorage.removeItem('truepower_token');
  }
  
  settingsModal.style.display = 'none';
  showSystemMessage('Settings saved. Refreshing station list...');
  fetchStations();
}

// Reset settings
function clearSettings() {
  localStorage.removeItem('gemini_api_key');
  localStorage.removeItem('truepower_token');
  geminiApiKeyInput.value = '';
  truepowerTokenInput.value = '';
  settingsModal.style.display = 'none';
  showSystemMessage('Settings reset to default. Refreshing station list...');
  fetchStations();
}

// Fetch Stations list from Backend
async function fetchStations() {
  stationsList.innerHTML = `
    <div class="loading-state">
      <span class="loader"></span>
      <p>Fetching live stations from TruePower...</p>
    </div>
  `;
  
  try {
    const response = await fetch('/api/stations');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    
    // Check if result data is structured as data.stations
    stations = result?.data?.stations || result?.data || [];
    isMockMode = false;
    if (connectionStatusDot && connectionStatusText) {
      connectionStatusDot.className = 'status-dot online';
      connectionStatusText.textContent = 'Live Agent Console';
    }
    renderStations(stations);
  } catch (error) {
    console.warn('Backend server unreachable or error. Switching to Demo Mode with mock data:', error);
    isMockMode = true;
    stations = mockStations;
    if (connectionStatusDot && connectionStatusText) {
      connectionStatusDot.className = 'status-dot warning';
      connectionStatusText.textContent = 'Demo Mode (Mock API)';
    }
    renderStations(stations);
  }
}

// Render stations in the side directory
function renderStations(stationsToRender) {
  if (stationsToRender.length === 0) {
    stationsList.innerHTML = `
      <div class="loading-state">
        <p>No stations found.</p>
      </div>
    `;
    return;
  }
  
  stationsList.innerHTML = '';
  stationsToRender.forEach(station => {
    // Map status to lower for class naming
    const statusVal = (station.status || 'closed').toLowerCase();
    let statusClass = 'closed';
    if (statusVal === 'open' || statusVal === 'active' || statusVal === 'available') {
      statusClass = 'open';
    } else if (statusVal === 'maintenance' || statusVal === 'under_maintenance') {
      statusClass = 'maintenance';
    }
    
    const div = document.createElement('div');
    div.className = 'station-item';
    div.innerHTML = `
      <div class="station-item-info">
        <div class="station-item-name">${station.name || 'Unnamed Station'}</div>
        <div class="station-item-meta">
          <span>🔌 ${station.no_of_charge_points || 0} pts</span>
          <span>⚡ ${station.no_of_connectors || 0} connectors</span>
        </div>
      </div>
      <div class="station-item-status">
        <span class="station-status-pill ${statusClass}">${station.status || 'Closed'}</span>
        <span class="station-item-id">ID: ${station.id}</span>
      </div>
    `;
    
    div.addEventListener('click', () => showStationDetail(station));
    stationsList.appendChild(div);
  });
}

// Show station details card
function showStationDetail(station) {
  selectedStation = station;
  detName.textContent = station.name || 'N/A';
  detId.textContent = station.id || 'N/A';
  
  const statusVal = station.status || 'Closed';
  detStatus.innerHTML = `<span class="station-status-pill ${statusVal.toLowerCase() === 'open' ? 'open' : statusVal.toLowerCase().includes('maintenance') ? 'maintenance' : 'closed'}">${statusVal}</span>`;
  
  detCompany.textContent = station.company?.company_name || station.company || 'N/A';
  detHost.textContent = station.host?.name || station.host_name || 'N/A';
  detChargers.textContent = station.no_of_charge_points || '0';
  detConnectors.textContent = station.no_of_connectors || '0';
  
  const addr = station.address;
  if (typeof addr === 'object' && addr !== null) {
    detAddress.textContent = `${addr.address_line1 || ''} ${addr.address_line2 || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.pincode || ''}`.trim() || 'N/A';
  } else {
    detAddress.textContent = addr || 'N/A';
  }
  
  stationDetailCard.style.display = 'block';
}

// Hide details card
function hideStationDetail() {
  stationDetailCard.style.display = 'none';
  selectedStation = null;
}

// Local Station Search filtering
stationSearchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) {
    renderStations(stations);
    return;
  }
  
  const filtered = stations.filter(station => {
    const name = (station.name || '').toLowerCase();
    const id = String(station.id || '');
    const city = station.address?.city ? station.address.city.toLowerCase() : '';
    const state = station.address?.state ? station.address.state.toLowerCase() : '';
    
    return name.includes(query) || id.includes(query) || city.includes(query) || state.includes(query);
  });
  
  renderStations(filtered);
});

// Helper for client-side direct Gemini calls
async function callGeminiDirectlyFromBrowser(messageText, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  // Format current stations list simplified for LLM prompt
  const cleanStations = stations.map(s => ({
    id: s.id,
    name: s.name,
    status: s.status,
    no_of_charge_points: s.no_of_charge_points,
    no_of_connectors: s.no_of_connectors,
    address: typeof s.address === 'object' ? `${s.address.address_line1 || ''}, ${s.address.city || ''}, ${s.address.state || ''}`.trim() : s.address,
    company: s.company?.company_name || s.company || 'N/A',
    host_name: s.host?.name || s.host_name || 'N/A'
  }));

  const systemInstructionText = `You are an EV Charging Customer Care assistant. You help support agents troubleshoot why users cannot charge their vehicles at specific stations.
Here is the live data for all charging stations currently available:
${JSON.stringify(cleanStations, null, 2)}

Instructions:
1. Explain clearly and concisely why charging might be failing based on the station details.
2. If status is 'closed', explain that the station is currently closed and not accepting charges.
3. If status is 'under_maintenance', explain it is down for maintenance.
4. If status is 'open', explain that the station is online, and suggest checking connector connections or vehicle compatibility.
5. Be polite, direct, and helpful. Mention the specific station name and its details in your explanation.`;

  const contents = chatHistory.map(h => ({
    role: h.role === 'model' ? 'model' : 'user',
    parts: [{ text: h.text }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: messageText }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents,
      systemInstruction: {
        parts: [{ text: systemInstructionText }]
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to call Gemini API directly');
  }

  const result = await response.json();
  const textReply = result.candidates?.[0]?.content?.parts?.[0]?.text;
  return {
    reply: textReply || "No response received from Gemini.",
    toolCalls: [
      {
        name: "get_stations_data_directly",
        status: "success",
        args: { reason: "loaded from browser state" },
        result: stations
      }
    ]
  };
}

// Helper for local mock responses when no API key is provided
function generateLocalMockResponse(messageText) {
  const query = messageText.toLowerCase();
  let reply = "";
  let toolCalls = [];

  if (query.includes('list') || query.includes('show') || query.includes('all station')) {
    toolCalls.push({
      name: "list_stations",
      status: "success",
      args: {},
      result: stations.map(s => ({ id: s.id, name: s.name, status: s.status }))
    });
    
    reply = "Here are the EV charging stations currently in our directory:\n\n" + 
            stations.map(s => `• **${s.name}** (ID: ${s.id}) — *${s.status.toUpperCase()}*`).join('\n') + 
            "\n\nLet me know if you would like me to troubleshoot a specific station.";
  } else {
    let matchedStation = null;
    for (const station of stations) {
      if (query.includes(String(station.id)) || query.includes(station.name.toLowerCase().replace(' station', ''))) {
        matchedStation = station;
        break;
      }
    }

    if (matchedStation) {
      toolCalls.push({
        name: "get_station_by_id",
        status: "success",
        args: { stationId: String(matchedStation.id) },
        result: matchedStation
      });

      const status = matchedStation.status.toLowerCase();
      if (status === 'closed') {
        reply = `I have checked the status of **${matchedStation.name}** (ID: ${matchedStation.id}).\n\n` +
                `🔴 The station status is currently **CLOSED**. This explains why the user is unable to charge. ` +
                `Please inform the customer that the station is closed at this time. You can contact the site host, **${matchedStation.host?.name || matchedStation.host_name || 'N/A'}**, for operational hours.`;
      } else if (status === 'under_maintenance' || status.includes('maintenance')) {
        reply = `I have checked the details for **${matchedStation.name}** (ID: ${matchedStation.id}).\n\n` +
                `⚠️ The station is currently **UNDER MAINTENANCE**. All charging points are temporarily offline. ` +
                `Our technical team is working to resolve the issue as soon as possible. Please advise the user to navigate to the nearest available station.`;
      } else {
        reply = `I've retrieved the details for **${matchedStation.name}** (ID: ${matchedStation.id}).\n\n` +
                `🟢 The station status is **OPEN** and functioning normally with ${matchedStation.no_of_charge_points || 0} active charge points.\n\n` +
                `Since the station itself is online, the charging failure might be due to:\n` +
                `1. A bad cable connection or physical connector damage.\n` +
                `2. User authentication issues in their mobile app.\n` +
                `3. Vehicle-side charging configuration.\n\n` +
                `Ask the user to replug the cable or try another connector.`;
      }
    } else {
      reply = `Hello! I am your TruePower EV Support Copilot.\n\n` +
              `I can help you troubleshoot charging issues by querying our live database. Try asking:\n` +
              `• *"Is Direction EV open?"*\n` +
              `• *"Why is the user failing to charge at station 6786?"*\n` +
              `• *"Show me all stations."*`;
    }
  }

  return { reply, toolCalls };
}

// Chat logic
async function submitChat(messageText) {
  if (isGenerating || !messageText.trim()) return;
  
  isGenerating = true;
  chatInput.value = '';
  chatInput.disabled = true;
  sendBtn.disabled = true;
  
  // Append User message to UI
  appendMessage('user', messageText);
  
  // Create typing indicator
  const typingIndicator = appendTypingIndicator();
  
  // Prepare request
  const geminiApiKey = localStorage.getItem('gemini_api_key') || '';
  
  try {
    let data;
    
    if (isMockMode) {
      await new Promise(resolve => setTimeout(resolve, 800)); // natural delay
      if (geminiApiKey) {
        data = await callGeminiDirectlyFromBrowser(messageText, geminiApiKey);
      } else {
        data = generateLocalMockResponse(messageText);
      }
    } else {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: messageText,
            history: chatHistory,
            geminiApiKey
          })
        });
        
        const responseText = await response.text();
        if (!response.ok) {
          let errMessage = 'Server error';
          try {
            const parsed = JSON.parse(responseText);
            errMessage = parsed.error || errMessage;
          } catch(e) {}
          throw new Error(errMessage);
        }
        data = JSON.parse(responseText);
      } catch (backendError) {
        console.warn('Backend chat failed, switching to client-side direct/mock chat:', backendError);
        isMockMode = true;
        if (connectionStatusDot && connectionStatusText) {
          connectionStatusDot.className = 'status-dot warning';
          connectionStatusText.textContent = 'Demo Mode (Mock API)';
        }
        
        if (geminiApiKey) {
          data = await callGeminiDirectlyFromBrowser(messageText, geminiApiKey);
        } else {
          data = generateLocalMockResponse(messageText);
        }
      }
    }
    
    // Remove typing indicator
    typingIndicator.remove();
    
    // Append LLM reply
    appendMessage('model', data.reply);
    
    // Update Chat History (local representation)
    chatHistory.push({ role: 'user', text: messageText });
    chatHistory.push({ role: 'model', text: data.reply });
    
    // Render tool calls log if tool calls were made
    if (data.toolCalls && data.toolCalls.length > 0) {
      renderToolLogs(data.toolCalls);
    }
    
  } catch (error) {
    console.error('Chat error:', error);
    typingIndicator.remove();
    appendErrorMessage(error.message);
  } finally {
    isGenerating = false;
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// Append Chat bubble
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  
  const senderSpan = document.createElement('span');
  senderSpan.className = 'message-sender';
  senderSpan.textContent = sender === 'user' ? 'Support Agent' : 'TruePower Care AI';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  
  // Convert standard newlines to html breaks
  contentDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  msgDiv.appendChild(senderSpan);
  msgDiv.appendChild(contentDiv);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Append Error Bubble
function appendErrorMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message error-message';
  msgDiv.innerHTML = `<strong>Error:</strong> ${text}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show System Announcement
function showSystemMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message system-message';
  msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Append Loading indicator
function appendTypingIndicator() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message model typing-msg';
  
  const senderSpan = document.createElement('span');
  senderSpan.className = 'message-sender';
  senderSpan.textContent = 'TruePower Care AI';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = `
    <div class="typing-indicator">
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    </div>
  `;
  
  msgDiv.appendChild(senderSpan);
  msgDiv.appendChild(contentDiv);
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgDiv;
}

// Render Gemini Tool Execution logs inside overlay
function renderToolLogs(toolCalls) {
  toolLogsBody.innerHTML = '';
  
  toolCalls.forEach(call => {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    // Status text styles
    let statusClass = 'executing';
    if (call.status === 'success') statusClass = 'success';
    if (call.status === 'failed') statusClass = 'failed';
    
    entry.innerHTML = `
      <div class="log-title">
        <span>🔧 Tool Called: <strong>${call.name}</strong></span>
        <span class="log-status ${statusClass}">${call.status}</span>
      </div>
      <div class="log-args">
        <strong>Arguments:</strong> ${JSON.stringify(call.args)}
      </div>
      ${call.result ? `
        <div class="log-result">
          <strong>Returned:</strong> ${JSON.stringify(call.result, null, 2)}
        </div>
      ` : ''}
      ${call.error ? `
        <div class="log-result" style="color: #fca5a5;">
          <strong>Error:</strong> ${call.error}
        </div>
      ` : ''}
    `;
    
    toolLogsBody.appendChild(entry);
  });
  
  toolLogsContainer.style.display = 'block';
}

// Event Bindings
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitChat(chatInput.value);
});

// Quick action chips click handler
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const query = chip.getAttribute('data-query');
    submitChat(query);
  });
});

// Ask AI About clicked station
askAiAboutStationBtn.addEventListener('click', () => {
  if (selectedStation) {
    const msg = `user is not able to charge at ${selectedStation.name} (ID: ${selectedStation.id}), can you check why?`;
    submitChat(msg);
    hideStationDetail();
  }
});

// Settings Modal controls
settingsBtn.addEventListener('click', () => {
  loadSettings();
  settingsModal.style.display = 'flex';
});

closeSettingsModalBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

saveSettingsBtn.addEventListener('click', saveSettings);
clearSettingsBtn.addEventListener('click', clearSettings);

// Close details / logs click handlers
closeDetailBtn.addEventListener('click', hideStationDetail);
closeLogsBtn.addEventListener('click', () => {
  toolLogsContainer.style.display = 'none';
});

refreshStationsBtn.addEventListener('click', fetchStations);

// Initial Load
loadSettings();
fetchStations();
