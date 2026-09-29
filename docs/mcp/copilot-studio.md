---
title: Microsoft Copilot Studio Setup
description: Add the TI Mindmap HUB MCP server as a tool in a Microsoft Copilot Studio agent, using an API key or OAuth 2.0.
---

# Microsoft Copilot Studio Setup

Give a Copilot Studio agent access to TI Mindmap HUB threat intelligence through the Model Context Protocol. The agent can then be published to Microsoft Teams, Microsoft 365 Copilot, or a website.

## Prerequisites

- A Copilot Studio environment where you can create or edit an agent
- **Generative orchestration** enabled on the agent (required for MCP tools)
- A **TI Mindmap HUB** account and, for API key auth, an API key from **My Profile → MCP Server API Keys** — see [MCP Server API Keys](../using-the-platform/account-and-access.md#mcp-server-api-keys)
- MCP endpoint: `https://mcp.ti-mindmap-hub.com/mcp`

## Setup

### 1. Start the MCP onboarding wizard

1. Open your agent and go to **Tools**
2. Select **Add a tool** → **New tool** → **Model Context Protocol**

### 2. Enter server details

| Field | Value |
|-------|-------|
| **Server name** | `TI Mindmap HUB` |
| **Server description** | `Cyber threat intelligence: threat reports, IOC lookup, CVE enrichment (CVSS, EPSS, KEV), MITRE ATT&CK, STIX 2.1 bundles, weekly briefings, and a cross-report knowledge graph.` |
| **Server URL** | `https://mcp.ti-mindmap-hub.com/mcp` |

The orchestrator uses the description to decide when to call the server, so keep it specific.

### 3. Choose authentication

=== "API key (recommended for shared agents)"

    1. Select **API key**
    2. Type: **Header**
    3. Header name: `X-API-Key`
    4. Select **Create**

    When you create the connection (next step), paste your `tim_…` key.

    !!! warning
        With a shared connection, every user of the agent queries TI Mindmap HUB with the key owner's identity. Use a dedicated key and revoke it when no longer needed.

=== "OAuth 2.0 (per-user sign-in)"

    1. Select **OAuth 2.0**
    2. Type: **Dynamic discovery**
    3. Select **Create**

    Each user signs in with their own TI Mindmap HUB account the first time the agent calls the server.

### 4. Create the connection and add the tool

1. In **Add tool**, select **Create a new connection** (enter the API key if prompted)
2. Select **Add to agent**

The server's tools appear in the agent's **Tools** list. Open the tool to review the individual tools and disable any you don't need.

### 5. Test

Use the **Test** pane:

```text
What are the key highlights of the latest weekly threat briefing?
```

```text
Is 185.220.101.1 known in TI Mindmap HUB? Which reports mention it?
```

Check the activity map to confirm which tool was called and with which arguments.

## Suggested Agent Instructions

```text
You are a threat intelligence assistant. Use the TI Mindmap HUB tools to answer questions
about threat reports, indicators, vulnerabilities, ATT&CK techniques, and threat actors.
Always cite the report title and link returned by the tools. State clearly that outputs are
AI-generated and should be verified against the original source before operational use.
Do not submit articles unless the user explicitly asks.
```

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| Tools never called | Make sure generative orchestration is on; improve the server description |
| `401` errors | Check the key is `Active` in **My Profile**, and the header name is exactly `X-API-Key` |
| OAuth fails | Switch to API key auth, or recreate the connection |

## Related

- [MCP Server](server.md) — tools and protocol
- [Microsoft Learn: Connect your agent to an existing MCP server](https://learn.microsoft.com/microsoft-copilot-studio/mcp-add-existing-server-to-agent)
