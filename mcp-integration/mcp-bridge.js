#!/usr/bin/env node
/**
 * MCP Bridge v3 per Claude Desktop -> TI Mindmap HUB
 * Gestisce correttamente notifiche (senza id) e richieste (con id)
 */

const readline = require('readline');

const API_URL = 'https://mcp.ti-mindmap-hub.com/mcp';
const API_KEY = process.env.TI_MINDMAP_API_KEY;
const DEBUG = process.env.DEBUG === 'true';

function debug(...args) {
  if (DEBUG) console.error('[DEBUG]', new Date().toISOString(), ...args);
}

if (!API_KEY) {
  console.log(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32000,message:'TI_MINDMAP_API_KEY not set'}}));
  process.exit(1);
}

let SESSION_ID = null;
let pendingRequests = 0;
let inputClosed = false;

function checkExit() {
  if (inputClosed && pendingRequests === 0) {
    debug('All requests complete, exiting');
    process.exit(0);
  }
}

async function forwardToRemote(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream',
    'X-API-Key': API_KEY
  };
  if (SESSION_ID) headers['Mcp-Session-Id'] = SESSION_ID;
  
  debug('Request:', request.method, 'id:', request.id, 'Session:', SESSION_ID || 'none');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    });
    
    debug('Response status:', response.status);
    
    const newSessionId = response.headers.get('mcp-session-id');
    if (newSessionId) {
      debug('Session ID:', newSessionId);
      SESSION_ID = newSessionId;
    }
    
    // Per le notifiche (status 202 o 204), non c'è risposta da parsare
    if (response.status === 202 || response.status === 204) {
      debug('Notification acknowledged, no response body');
      return null; // Nessuna risposta da inviare
    }
    
    const contentType = response.headers.get('content-type') || '';
    let data;
    
    if (contentType.includes('text/event-stream')) {
      const text = await response.text();
      debug('SSE Response length:', text.length);
      const lines = text.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try { data = JSON.parse(line.substring(6)); break; } catch (e) {}
        }
      }
      if (!data) {
        try { data = JSON.parse(text); } catch (e) {
          debug('Parse error, text:', text.substring(0, 100));
          return {jsonrpc:'2.0',id:request.id,error:{code:-32000,message:'Invalid response'}};
        }
      }
    } else {
      const text = await response.text();
      if (!text.trim()) {
        debug('Empty response body');
        return null; // Nessuna risposta
      }
      debug('Response:', text.substring(0, 200));
      try {
        data = JSON.parse(text);
      } catch (e) {
        debug('JSON parse error:', e.message);
        return {jsonrpc:'2.0',id:request.id,error:{code:-32000,message:'Parse error'}};
      }
    }
    
    return data;
  } catch (err) {
    debug('Error:', err.message);
    // Solo restituisci errore se la richiesta aveva un id
    if (request.id !== undefined) {
      return {jsonrpc:'2.0',id:request.id,error:{code:-32000,message:err.message}};
    }
    return null;
  }
}

async function handleLine(line) {
  if (!line.trim()) return;
  
  let request;
  try { 
    request = JSON.parse(line); 
  } catch (e) {
    console.log(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32700,message:'Parse error'}}));
    return;
  }
  
  const isNotification = request.id === undefined;
  debug('Received:', request.method, isNotification ? '(notification)' : `(id: ${request.id})`);
  
  pendingRequests++;
  try {
    const result = await forwardToRemote(request);
    
    // Solo invia risposta se c'è un risultato (non per notifiche)
    if (result !== null) {
      console.log(JSON.stringify(result));
    } else {
      debug('No response to send (notification or empty)');
    }
  } finally {
    pendingRequests--;
    checkExit();
  }
}

const rl = readline.createInterface({input:process.stdin,output:process.stdout,terminal:false});
rl.on('line', (line) => { handleLine(line); });
rl.on('close', () => { inputClosed = true; checkExit(); });

debug('Bridge v3 started');
