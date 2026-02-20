---
title: VS Code + Copilot Setup
description: Connect VS Code with GitHub Copilot to TI Mindmap HUB's threat intelligence via MCP.
---

# VS Code + GitHub Copilot Setup

Connect VS Code with GitHub Copilot to TI Mindmap HUB's threat intelligence platform via MCP.

## Prerequisites

- **VS Code** 1.99+ ([download](https://code.visualstudio.com/))
- **GitHub Copilot** extension installed and active
- **TI Mindmap HUB API Key** (get one from [ti-mindmap-hub.com/settings](https://ti-mindmap-hub.com/settings))

## Setup

### 1. Create MCP Configuration

In your project folder (or user settings), create `.vscode/mcp.json`:

```json
{
  "servers": {
    "ti-mindmap": {
      "type": "http",
      "url": "https://mcp.ti-mindmap-hub.com/mcp",
      "headers": {
        "X-API-Key": "${input:tiMindmapApiKey}"
      }
    }
  },
  "inputs": [
    {
      "id": "tiMindmapApiKey",
      "type": "promptString",
      "description": "TI Mindmap HUB API Key",
      "password": true
    }
  ]
}
```

### 2. Reload VS Code

Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and run:
```
Developer: Reload Window
```

### 3. Enter API Key

When prompted, enter your TI Mindmap HUB API key (format: `tim_xxxxxxxxxxxx`).

## Alternative: Hardcoded API Key

If you prefer not to be prompted each time:

```json
{
  "servers": {
    "ti-mindmap": {
      "type": "http",
      "url": "https://mcp.ti-mindmap-hub.com/mcp",
      "headers": {
        "X-API-Key": "tim_your_api_key_here"
      }
    }
  }
}
```

> ⚠️ **Security Warning**: Don't commit API keys to version control. Add `.vscode/mcp.json` to your `.gitignore`.

## User-Level Configuration

To make TI Mindmap available in all projects, add to your VS Code settings (`settings.json`):

```json
{
  "mcp.servers": {
    "ti-mindmap": {
      "type": "http",
      "url": "https://mcp.ti-mindmap-hub.com/mcp",
      "headers": {
        "X-API-Key": "tim_your_api_key_here"
      }
    }
  }
}
```

## Using with GitHub Copilot

### Open Copilot Chat

Press `Ctrl+Shift+I` (or `Cmd+Shift+I` on macOS) to open Copilot Chat.

### Verify Connection

1. Click on the **Tools** icon (🔧) in the chat
2. You should see **ti-mindmap** listed with 16 tools

### Example Prompts

**List recent reports:**
```
Show me the latest threat intelligence reports about ransomware
```

**Get report details:**
```
Get the full details and AI summary for report [report-id]
```

**Search for CVEs:**
```
Search for CVE-2024-3400 and explain its impact
```

**Get weekly briefing:**
```
What's in the latest weekly threat briefing?
```

**Search IOCs:**
```
Search for any reports mentioning the domain malware.example.com
```

**Get MITRE ATT&CK TTPs:**
```
Show me the MITRE ATT&CK techniques from report [report-id]
```

**Submit article for analysis:**
```
Analyze this threat article: https://example.com/threat-report
```

## Available Tools

| Category | Tools |
|----------|-------|
| **Reports** | `list_reports`, `get_report_details`, `get_report_content`, `get_available_sources`, `get_available_tags` |
| **Briefings** | `get_latest_briefing`, `list_briefings`, `get_briefing_by_date` |
| **IOCs** | `search_ioc` |
| **CVEs** | `search_cve`, `search_cves_by_keyword`, `list_cves`, `get_cves_by_article`, `get_cve_statistics` |
| **Other** | `get_statistics`, `submit_article` |

## Example Workflows

### Investigating a Threat

```
1. "List the latest reports about APT29"
2. "Get the full details for the first report"
3. "Show me the MITRE ATT&CK TTPs from this report"
4. "Search for any CVEs mentioned in this report"
5. "Get the STIX bundle for this report"
```

### Daily Threat Review

```
1. "What's in the latest weekly briefing?"
2. "List all critical CVEs from the past 7 days"
3. "Show me reports about ransomware from this week"
```

### IOC Investigation

```
1. "Search for reports mentioning IP 192.168.1.100"
2. "Search for the domain evil.example.com"
3. "Look up hash d41d8cd98f00b204e9800998ecf8427e"
```

## Troubleshooting

### Tools not appearing

1. Verify `.vscode/mcp.json` exists and is valid JSON
2. Reload VS Code (`Developer: Reload Window`)
3. Check that your API key is correct

### Authentication errors

1. Verify your API key at [ti-mindmap-hub.com/settings](https://ti-mindmap-hub.com/settings)
2. Ensure the key has not expired
3. Check for typos in the configuration

### Connection timeout

1. Check your internet connection
2. Verify the server is accessible: `curl https://mcp.ti-mindmap-hub.com/health`
3. Check if a firewall is blocking the connection

### View logs

1. Open Output panel (`Ctrl+Shift+U`)
2. Select "GitHub Copilot" from the dropdown
3. Look for MCP-related messages

## Security Best Practices

1. **Use input prompts** for API keys instead of hardcoding
2. **Add to .gitignore**:
   ```
   .vscode/mcp.json
   ```
3. **Rotate keys regularly** in your account settings
4. **Use separate keys** for different projects/environments

## Support

- **MCP Server Documentation**: [MCP Server](server.md)
- **Issues**: [GitHub Issues](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
