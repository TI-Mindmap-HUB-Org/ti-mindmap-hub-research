---
title: MCP Server
description: Model Context Protocol server for TI Mindmap HUB — 19 tools for AI assistants to query threat intelligence data.
---

# MCP Server Integration

TI Mindmap HUB exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that allows AI assistants to access threat intelligence data programmatically.

## Overview

The MCP server provides AI clients with access to:

- **Threat Intelligence Reports** — Curated articles from multiple sources with AI-generated analysis
- **Weekly Briefings** — Automated weekly threat landscape summaries
- **CVE Intelligence** — Vulnerability data with real-time enrichment (EPSS, exploit status)
- **IOC Search** — Search for Indicators of Compromise across all reports
- **STIX 2.1 Bundles** — Structured threat intelligence in standard format
- **MITRE ATT&CK Mapping** — TTPs extracted from threat reports

## Quick Start

| Client | Setup Guide |
|--------|-------------|
| VS Code + GitHub Copilot | [VS Code + Copilot Setup](vscode-copilot.md) |
| Claude Desktop | [Claude Desktop Setup](claude-desktop.md) |

## Server Endpoint

```
https://mcp.ti-mindmap-hub.com/mcp
```

## Authentication

All requests require an API key passed in the `X-API-Key` header.

### Getting an API Key

1. Sign up at [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
2. Navigate to **My Profile** → **MCP Server API Keys**
3. Click **Generate Key**
4. Copy and securely store your key (format: `tim_xxxxxxxxxxxx`)

> **Roadmap**: OAuth 2.0 authentication support is planned for a future release, enabling browser-based authorization flows for MCP clients that support it (e.g., Claude Web).

## Available Tools (19)

### Reports (5 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_reports` | List threat intelligence reports | `search`, `tags`, `source`, `time_range`, `limit` |
| `get_report_details` | Get full report details | `report_id` |
| `get_report_content` | Get specific content type | `report_id`, `content_type` |
| `get_available_sources` | List all sources | — |
| `get_available_tags` | List all tags | — |

**Content types** for `get_report_content`:
- `summary` — AI-generated summary
- `raw` — Original article text
- `mindmap` — Threat mindmap in Markdown
- `ttps_table` — MITRE ATT&CK TTPs table
- `ttps_execution` — TTP execution order
- `five_whats` — Root cause analysis
- `stix` — STIX 2.1 bundle (JSON)
- `iocs` — Extracted IOCs (JSON)

### Weekly Briefings (3 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_latest_briefing` | Get most recent briefing | — |
| `list_briefings` | List all briefings | — |
| `get_briefing_by_date` | Get briefing by date | `date` (YYYY-MM-DD) |

### IOC Search (1 tool)

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_ioc` | Search for IOC | `ioc_value` (IP, domain, hash, URL) |

### CVE Intelligence (5 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_cve` | Search CVE by ID | `cve_id` (e.g., CVE-2024-3400) |
| `search_cves_by_keyword` | Search CVEs by keyword | `query`, `limit` |
| `list_cves` | List CVEs with filters | `page`, `size`, `severity`, `sort_by`, `sort_order` |
| `get_cves_by_article` | Get CVEs from article | `article_id` |
| `get_cve_statistics` | Get CVE statistics | — |

### STIX Bundles (3 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_stix_bundle` | Get STIX 2.1 bundle for an article | `article_id` |
| `list_stix_bundles` | List all available STIX bundles | `limit`, `offset` |
| `get_stix_statistics` | Get STIX generation statistics | — |

The STIX bundle contains structured threat intelligence objects:
- **Threat Actors** (`threat-actor`)
- **Malware** (`malware`)
- **Attack Patterns / TTPs** (`attack-pattern`)
- **Indicators / IOCs** (`indicator`)
- **Vulnerabilities / CVEs** (`vulnerability`)
- **Relationships** between all objects

Bundles can be imported into STIX-compatible platforms like MISP, OpenCTI, or Microsoft Sentinel.

### Statistics & Submissions (2 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_statistics` | Platform statistics | — |
| `submit_article` | Submit URL for analysis | `url` |

## Protocol Details

### Transport

- **Protocol**: MCP over HTTP with SSE (Server-Sent Events)
- **Content-Type**: `application/json`
- **Accept**: `application/json, text/event-stream`

### Session Management

The server uses session-based communication:

1. Client sends `initialize` request
2. Server returns `Mcp-Session-Id` header
3. Client includes `Mcp-Session-Id` in subsequent requests

### Authentication Flow

```
Client                           MCP Server                    CosmosDB
  │                                   │                            │
  │─── initialize + X-API-Key ───────>│                            │
  │                                   │─── Validate API Key ──────>│
  │                                   │<── User claims ────────────│
  │<── Mcp-Session-Id ────────────────│                            │
  │                                   │                            │
  │─── tools/list + Mcp-Session-Id ──>│                            │
  │<── Tool definitions ──────────────│                            │
```

### Example: Initialize Session

**Request:**
```http
POST /mcp HTTP/1.1
Host: mcp.ti-mindmap-hub.com
X-API-Key: tim_your_api_key_here
Content-Type: application/json
Accept: application/json, text/event-stream

{
  "jsonrpc": "2.0",
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "my-client",
      "version": "1.0.0"
    }
  },
  "id": 1
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: text/event-stream
Mcp-Session-Id: abc123def456

event: message
data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2024-11-05","capabilities":{"tools":{"listChanged":true}},"serverInfo":{"name":"TI Mindmap HUB","version":"2.14.1"}}}
```

### Example: Call Tool

**Request:**
```http
POST /mcp HTTP/1.1
Host: mcp.ti-mindmap-hub.com
X-API-Key: tim_your_api_key_here
Mcp-Session-Id: abc123def456
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "list_reports",
    "arguments": {
      "search": "ransomware",
      "time_range": "7d",
      "limit": 5
    }
  },
  "id": 3
}
```

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│     AI Client       │     │     MCP Server      │     │      Backend        │
│  (VS Code, Claude,  │────>│  (FastMCP + FastAPI)│────>│  (Azure Functions)  │
│   Custom)           │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
                                     │                           │
                                     ▼                           ▼
                            ┌─────────────────────┐     ┌─────────────────────┐
                            │     CosmosDB        │     │   Blob Storage      │
                            │  (Users, API Keys)  │     │   (Reports, STIX)   │
                            └─────────────────────┘     └─────────────────────┘
```

## Error Codes

| Code | Description |
|------|-------------|
| -32700 | Parse error — Invalid JSON |
| -32600 | Invalid request |
| -32601 | Method not found |
| -32602 | Invalid params |
| -32000 | Server error |
| 401 | Invalid or missing API key |
| 403 | Insufficient permissions |

## Related Pages

| Page | Description |
|------|-------------|
| [MCP Overview](index.md) | MCP section overview, use cases, and agents |
| [VS Code + Copilot Setup](vscode-copilot.md) | Setup guide for VS Code + GitHub Copilot |
| [Claude Desktop Setup](claude-desktop.md) | Setup guide for Claude Desktop |
| [mcp-bridge.js](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/blob/main/mcp-integration/mcp-bridge.js) | Bridge script for stdio-based clients |

## Support

- **Issues**: [GitHub Issues](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)