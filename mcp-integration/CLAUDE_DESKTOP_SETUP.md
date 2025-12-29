# Claude Desktop Setup

Connect Claude Desktop to TI Mindmap HUB's threat intelligence platform via MCP using a local bridge.

## Prerequisites

- **Claude Desktop** installed ([download](https://claude.ai/download))
- **Node.js 18+** installed ([download](https://nodejs.org/))
- **TI Mindmap HUB API Key** (get one from [ti-mindmap-hub.com/settings](https://ti-mindmap-hub.com/settings))

## How the Bridge Works

Claude Desktop communicates via stdio (standard input/output), but the TI Mindmap MCP server uses HTTP. The bridge translates between these protocols:

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ Claude Desktop  │◀─stdio─▶│   mcp-bridge    │◀─HTTPS─▶│  MCP Server     │
│                 │         │   (Node.js)     │         │  (ti-mindmap)   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

The bridge:
1. Receives JSON-RPC requests from Claude via stdin
2. Adds your API key to headers
3. Forwards to `https://mcp.ti-mindmap-hub.com/mcp`
4. Manages session ID automatically
5. Returns responses via stdout

## Setup

### 1. Download the MCP Bridge

Download [`mcp-bridge.js`](mcp-bridge.js) from this repository.

Save it to a permanent location:
- **Windows**: `C:\Users\YourName\mcp-bridge\mcp-bridge.js`
- **macOS/Linux**: `~/mcp-bridge/mcp-bridge.js`

### 2. Configure Claude Desktop

Open Claude Desktop's configuration file:

| OS | Path |
|----|------|
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

**Quick open (Windows PowerShell):**
```powershell
notepad "$env:APPDATA\Claude\claude_desktop_config.json"
```

**Quick open (macOS Terminal):**
```bash
open -e ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 3. Add Configuration

#### Windows

```json
{
  "mcpServers": {
    "ti-mindmap": {
      "command": "C:/Program Files/nodejs/node.exe",
      "args": ["C:/Users/YourName/mcp-bridge/mcp-bridge.js"],
      "env": {
        "TI_MINDMAP_API_KEY": "tim_your_api_key_here"
      }
    }
  }
}
```

> **Note**: Use forward slashes (`/`) in paths, or escape backslashes (`\\`).

#### macOS / Linux

```json
{
  "mcpServers": {
    "ti-mindmap": {
      "command": "node",
      "args": ["/Users/YourName/mcp-bridge/mcp-bridge.js"],
      "env": {
        "TI_MINDMAP_API_KEY": "tim_your_api_key_here"
      }
    }
  }
}
```

### 4. Restart Claude Desktop

Close Claude Desktop completely and reopen it.

### 5. Verify Connection

1. Click the **"Search and tools"** button (bottom left)
2. You should see **ti-mindmap** listed
3. The status should show as connected

## Available Tools (16 total)

### Reports
| Tool | Description |
|------|-------------|
| `list_reports` | List threat intelligence reports with filters |
| `get_report_details` | Get full details of a specific report |
| `get_report_content` | Get AI summary, mindmap, TTPs, STIX bundle, or IOCs |
| `get_available_sources` | List all threat intelligence sources |
| `get_available_tags` | List all available tags |

### Weekly Briefings
| Tool | Description |
|------|-------------|
| `get_latest_briefing` | Get the most recent Weekly Threat Briefing |
| `list_briefings` | List all available briefings |
| `get_briefing_by_date` | Get briefing for a specific date |

### IOC Search
| Tool | Description |
|------|-------------|
| `search_ioc` | Search for IP, domain, hash, or URL |

### CVE Intelligence
| Tool | Description |
|------|-------------|
| `search_cve` | Search for CVE by ID (e.g., CVE-2024-3400) |
| `search_cves_by_keyword` | Search CVEs by vendor, product, or description |
| `list_cves` | List CVEs with severity filters |
| `get_cves_by_article` | Get CVEs mentioned in an article |
| `get_cve_statistics` | Get aggregate CVE statistics |

### Other
| Tool | Description |
|------|-------------|
| `get_statistics` | Get platform statistics |
| `submit_article` | Submit a URL for automated analysis |

## Example Prompts

Try asking Claude:

**Threat Research:**
```
Show me the latest ransomware reports from the past week
```

**CVE Investigation:**
```
Search for CVE-2024-3400 and explain its severity and impact
```

**Weekly Review:**
```
What are the key highlights from the latest weekly threat briefing?
```

**IOC Lookup:**
```
Search for any reports mentioning the domain evil.example.com
```

**Deep Dive:**
```
Get the MITRE ATT&CK techniques and STIX bundle for report [id]
```

**Submit for Analysis:**
```
Analyze this article: https://thehackernews.com/2024/01/example.html
```

## Troubleshooting

### "Server disconnected" or "failed"

1. **Verify Node.js is installed:**
   ```powershell
   node --version
   ```
   Must be v18 or higher.

2. **Verify bridge file exists:**
   ```powershell
   Test-Path "C:\Users\YourName\mcp-bridge\mcp-bridge.js"
   ```

3. **Test bridge manually:**
   ```powershell
   $env:TI_MINDMAP_API_KEY="tim_your_api_key"
   echo '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}},"id":1}' | node C:\Users\YourName\mcp-bridge\mcp-bridge.js
   ```

### "spawn node ENOENT"

Node.js is not in PATH. Use the full path to node:

**Find Node.js path (Windows):**
```powershell
where.exe node
```

**Find Node.js path (macOS/Linux):**
```bash
which node
```

Then update your config to use the full path.

### Enable Debug Logging

Add `DEBUG` to the environment:

```json
{
  "mcpServers": {
    "ti-mindmap": {
      "command": "node",
      "args": ["/path/to/mcp-bridge.js"],
      "env": {
        "TI_MINDMAP_API_KEY": "tim_your_api_key",
        "DEBUG": "true"
      }
    }
  }
}
```

View logs at:
- **Windows**: `%APPDATA%\Claude\logs\`
- **macOS**: `~/Library/Logs/Claude/`

### JSON Parse Errors

Ensure your `claude_desktop_config.json` is valid:
- No trailing commas
- All strings in double quotes
- Paths use forward slashes or escaped backslashes

**Validate JSON online:** [jsonlint.com](https://jsonlint.com/)

## Security

- API key is stored locally in Claude's config file
- All communication uses HTTPS
- Bridge runs locally, no data is stored
- Consider using environment variables for API keys in shared environments

## Updating the Bridge

To update to a new version:
1. Download the latest `mcp-bridge.js`
2. Replace the existing file
3. Restart Claude Desktop

## Support

- **MCP Server Documentation**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
