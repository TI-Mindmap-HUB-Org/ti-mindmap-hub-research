---
title: MCP Server
description: Model Context Protocol server for TI Mindmap HUB — 27 tools for AI assistants to query threat intelligence data.
---

# MCP Server Integration

TI Mindmap HUB exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that allows AI assistants to access threat intelligence data programmatically.

## Overview

The MCP server provides AI clients with access to:

- **Threat Intelligence Reports** — Curated articles from multiple sources with AI-generated analysis
- **Weekly Briefings** — Automated weekly threat landscape summaries
- **CVE Intelligence** — Vulnerability data with real-time enrichment (EPSS, exploit status)
- **IOC Search & Export** — Search for Indicators of Compromise across all reports and export them as CSV
- **STIX 2.1 Bundles** — Structured threat intelligence in standard format
- **MITRE ATT&CK Mapping** — TTPs extracted from threat reports
- **Knowledge Graph** — Cross-report entity search, clustering, timeline, attack path analysis, and related reports via STIX Constellation

All tools are **read-only** (annotated with `readOnlyHint`) except `submit_article`, which sends a URL for processing.

## Quick Start

| Client | Auth | Setup Guide |
|--------|------|-------------|
| VS Code + GitHub Copilot | API key or OAuth | [VS Code + Copilot Setup](vscode-copilot.md) |
| Claude (custom connector) | OAuth 2.1 | [Claude Setup](claude.md) |
| ChatGPT (developer mode) | OAuth 2.1 | [ChatGPT Setup](chatgpt.md) |
| Microsoft Copilot Studio | API key or OAuth 2.0 | [Copilot Studio Setup](copilot-studio.md) |
| Microsoft Foundry Agent Service | API key (project connection) | [Foundry Setup](foundry.md) |
| OpenAI Responses API, Cursor, Claude Code, custom clients | API key or OAuth | [Other Clients](other-clients.md) |

## Server Endpoint

```
https://mcp.ti-mindmap-hub.com/mcp
```

Public (unauthenticated) endpoints on the same host:

| Path | Purpose |
|------|---------|
| `/health` | Health check |
| `/info` | Server version, tool count, and supported authentication methods |
| `/.well-known/oauth-protected-resource` | OAuth protected-resource metadata (RFC 9728) |
| `/.well-known/oauth-authorization-server` | OAuth authorization-server metadata |

## Authentication

TI Mindmap HUB supports two authentication models. Every request to `/mcp` must use one of them; unauthenticated requests receive `401` with a `WWW-Authenticate` header pointing to the OAuth metadata.

### OAuth 2.1

For connector-native clients (Claude, ChatGPT, Copilot Studio) and any MCP client that implements the MCP authorization spec.

| Property | Value |
|----------|-------|
| Flow | Authorization Code with PKCE (`S256`) |
| Identity provider | Azure AD B2C (proxied by the MCP server) — you sign in with your TI Mindmap HUB account |
| Client registration | Dynamic Client Registration (RFC 7591) at `/oauth/register` — no manual client ID needed |
| Redirect URIs accepted | HTTPS redirect URIs, and `localhost` / `127.0.0.1` loopback URIs for IDE and CLI clients |
| Scopes | `openid`, `profile`, `offline_access`, plus the TI Mindmap HUB API scope |
| Token usage | `Authorization: Bearer <access token>` |

The client discovers everything from the `.well-known` endpoints, registers itself, and opens the sign-in page. No API key is needed.

### API key

For IDEs, agent frameworks, scripts, and any client that can send custom headers.

| Header | Example |
|--------|---------|
| `X-API-Key` (preferred) | `X-API-Key: tim_xxxxxxxxxxxx` |
| `Authorization` (Bearer) | `Authorization: Bearer tim_xxxxxxxxxxxx` |
| `Authorization` (ApiKey) | `Authorization: ApiKey tim_xxxxxxxxxxxx` |

The `Authorization: Bearer tim_…` form is useful for clients that only let you set a bearer token (for example, the OpenAI Responses API `authorization` field).

!!! warning "Avoid keys in URLs"
    The server also accepts `?api_key=` as a last-resort fallback, but URLs end up in logs and browser history. Use a header.

### Getting an API Key

1. Sign in at [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
2. Navigate to **My Profile** → **MCP Server API Keys**
3. Click **Generate Key**, give the key a name, and confirm with **Generate**
4. Copy and securely store your key (format: `tim_xxxxxxxxxxxx`) — it is shown **only once**

Each account can hold up to **5 active keys**. Keys expire after **365 days** and can be regenerated or revoked from the same page.

Use an API key for clients that cannot run the OAuth flow, or for shared/automated agents.

## Available Tools (27)

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

### IOC Search & Export (2 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `search_ioc` | Search for an IOC across all reports | `ioc_value` (IP, domain, hash, URL, email) |
| `export_iocs_csv` | Export IOCs as CSV for SIEM/EDR ingestion | `since_days` (default 30; `0`/`null` = all time), `ioc_type`, `article_id`, `defang` (default `true`), `unique` (default `true`), `limit` (default 1000, max 5000) |

`export_iocs_csv` returns CSV text and a row count. With `unique=true` the columns are `indicator`, `type`, `confidence`, `threat_actors`, `malware_families`, `first_seen`, `last_seen`, `article_count`, `article_ids`; with `unique=false` there is one row per indicator-report pair. It is the MCP equivalent of **Export IOCs to CSV** on the [IOC Search](../using-the-platform/ioc-search.md#export-iocs-to-csv) page.

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
| `submit_article` | Submit URL for analysis (the only non-read-only tool) | `url` |

### Knowledge Graph — STIX Constellation (7 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `kg_get_graph_stats` | Graph-wide statistics: reports, canonical entities, observed and inferred relations, top entities, distribution by class | — |
| `kg_search_entities` | Search canonical entities by name or alias, sorted by report count | `query`, `entity_type` (e.g. `ThreatActor`, `Malware`, `Tool`, `Campaign`, `AttackPattern`, `Vulnerability`), `limit` (default 20, max 100) |
| `kg_get_entity_cluster` | Neighbourhood of an entity up to N hops (nodes + edges, capped at 150 nodes) | `canon_id`, `depth` (1–3, default 1), `include_inferred` (default `false`), `min_inferred_confidence` (default 0.7) |
| `kg_get_entity_timeline` | Chronological report appearances of an entity | `canon_id` |
| `kg_search_attack_path` | From an ATT&CK technique, find connected threat actors, malware, tools, and campaigns | `ttp_query` (ATT&CK ID like `T1566` or name substring), `depth` (1–3, default 2) |
| `kg_find_cross_report_links` | Entities shared between two reports | `report_id_a`, `report_id_b` |
| `kg_get_related_reports` | Reports most similar to a given report via shared entities (rare entities weigh more than ubiquitous ones) | `report_id`, `limit` (default 5, max 20) |

The Knowledge Graph tools run read-only queries against the Neo4j-backed **STIX Constellation** — a cross-report graph that deduplicates entities into canonical nodes and connects them across all processed intelligence. Get a `canon_id` from `kg_search_entities` first, then use it with the cluster and timeline tools. Use these tools to:

- **Pivot from IOC to actor** — Start with an indicator and discover associated threat groups
- **Map adversary infrastructure** — Query a TTP and traverse to the actors, malware, and tools using it
- **Correlate reports** — Find shared entities between two articles, or the most related reports to one article
- **Track entity activity** — View the timeline of an actor or malware family across reports

## Protocol Details

### Transport

- **Transport**: MCP [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) (responses may be JSON or an SSE stream)
- **MCP specification**: `2025-11-25`
- **Content-Type**: `application/json`
- **Accept**: `application/json, text/event-stream`

### Session Management

The server uses session-based communication:

1. Client sends `initialize` request
2. Server returns `Mcp-Session-Id` header
3. Client includes `Mcp-Session-Id` in subsequent requests

### Authentication Flow

=== "API key"

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

=== "OAuth 2.1"

    ```mermaid
    sequenceDiagram
        participant C as MCP client
        participant S as MCP Server
        participant B as Azure AD B2C
        C->>S: POST /mcp (no token)
        S-->>C: 401 + WWW-Authenticate (resource_metadata)
        C->>S: GET /.well-known/oauth-protected-resource
        C->>S: GET /.well-known/oauth-authorization-server
        C->>S: POST /oauth/register (DCR)
        C->>S: GET /oauth/authorize (PKCE)
        S->>B: Redirect to sign-in
        B-->>S: Authorization code
        S-->>C: Redirect with code
        C->>S: POST /oauth/token
        S-->>C: Access token
        C->>S: POST /mcp + Authorization: Bearer <token>
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
    "protocolVersion": "2025-11-25",
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
data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-11-25","capabilities":{"tools":{"listChanged":true}},"serverInfo":{"name":"TI Mindmap HUB","version":"..."}}}
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
| 401 | Invalid or missing credentials (API key or OAuth token); see `WWW-Authenticate` |
| 403 | Insufficient permissions |

## Related Pages

| Page | Description |
|------|-------------|
| [MCP Overview](index.md) | MCP section overview, use cases, and agents |
| [VS Code + Copilot Setup](vscode-copilot.md) | Setup guide for VS Code + GitHub Copilot |
| [Claude Setup](claude.md) | Setup guide for Claude via native connector and OAuth |
| [ChatGPT Setup](chatgpt.md) | Setup guide for ChatGPT developer-mode apps |
| [Copilot Studio Setup](copilot-studio.md) | Add TI Mindmap HUB as an MCP tool in a Copilot Studio agent |
| [Foundry Setup](foundry.md) | Attach TI Mindmap HUB to a Microsoft Foundry agent |
| [Other Clients](other-clients.md) | Cursor, Claude Code, Claude Desktop bridge, and custom clients |
| [mcp-bridge.js](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/blob/main/mcp-integration/mcp-bridge.js) | Legacy bridge script for stdio-based clients |

## Support

- **Issues**: [GitHub Issues](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)