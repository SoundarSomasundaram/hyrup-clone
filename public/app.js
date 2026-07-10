// State Management
let stations = [];
let selectedStation = null;
let chatHistory = [];
let isGenerating = false;

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
    renderStations(stations);
  } catch (error) {
    console.error('Error fetching stations:', error);
    stationsList.innerHTML = `
      <div class="loading-state">
        <span style="font-size: 2rem;">⚠️</span>
        <p style="color: var(--color-danger)">Failed to fetch stations from API.</p>
        <p style="font-size: 0.75rem;">Make sure your TruePower token is valid in settings.</p>
        <button class="btn btn-secondary" onclick="fetchStations()" style="margin-top: 0.5rem;">Try Again</button>
      </div>
    `;
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
    
    // Remove typing indicator
    typingIndicator.remove();
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Server responded with an error');
    }
    
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
