---
title: ChatGPT Setup
description: Connect ChatGPT to the TI Mindmap HUB MCP server as a developer-mode app using OAuth.
---

# ChatGPT Setup

Connect ChatGPT to TI Mindmap HUB so you can query reports, IOCs, CVEs, STIX bundles, briefings, and the knowledge graph in natural language.

!!! note "ChatGPT's interface changes often"
    The steps below reflect ChatGPT's **developer mode** at the time of writing. If a label has moved, see OpenAI's [Developer mode guide](https://developers.openai.com/api/docs/guides/developer-mode).

## Prerequisites

- A ChatGPT plan that supports **developer mode** (currently Plus, Pro, Business, Enterprise, and Education, on the web)
- A **TI Mindmap HUB** account — see [Account & Access](../using-the-platform/account-and-access.md)
- MCP endpoint: `https://mcp.ti-mindmap-hub.com/mcp`

No API key is needed: ChatGPT signs you in with OAuth, as Claude does.

## Setup

### 1. Enable developer mode

In ChatGPT, open **Settings → Security and login** and turn on **Developer mode**.

### 2. Create an app for the MCP server

1. Open the apps/plugins page in ChatGPT and click the **+** button to create a developer-mode app
2. Fill in:
    - **Name**: `TI Mindmap HUB`
    - **Description**: `Threat intelligence reports, IOCs, CVEs, STIX 2.1 bundles, weekly briefings and knowledge graph from TI Mindmap HUB`
    - **MCP server URL**: `https://mcp.ti-mindmap-hub.com/mcp`
    - **Authentication**: `OAuth`
3. Save. ChatGPT starts the OAuth flow

### 3. Sign in

Complete the TI Mindmap HUB sign-in in the browser window ChatGPT opens, then return to ChatGPT. The app appears under **Drafts** in your app settings.

### 4. Review tools

Open the app's details page to see the 25 tools and toggle any of them off. Use **Refresh** after server updates to pull new tools and descriptions.

### 5. Use it in a conversation

In the composer, open the **+** menu, choose **Developer mode**, and select **TI Mindmap HUB**.

## Example Prompts

Be explicit about the app when you start:

```text
Use the TI Mindmap HUB app. Show me the latest ransomware reports from the past 7 days.
```

```text
Using TI Mindmap HUB only, search CVE-2024-3400 and summarise severity, EPSS, and KEV status.
```

```text
With TI Mindmap HUB, get the latest weekly briefing and list the top observed TTPs.
```

```text
Use TI Mindmap HUB kg_search for "APT28", then kg_cluster with depth 2, and describe the main connected malware and tools.
```

## Confirmations

ChatGPT treats tools without a read-only hint as **write actions** and asks for confirmation. Review the payload before approving — especially `submit_article`, which sends a URL for processing. You can expand each tool call to see the full JSON input and output.

## Troubleshooting

| Problem | What to try |
|---------|-------------|
| Developer mode option missing | Check your plan and that you are using ChatGPT on the web |
| OAuth window closes without connecting | Allow pop-ups; complete sign-in in the same browser session; recreate the app |
| ChatGPT uses web search instead of the app | Say "Use only the TI Mindmap HUB app" in the prompt |
| Tools missing | Open the app details page and click **Refresh** |

## Security

- Authentication is OAuth; no TI Mindmap HUB key is stored in ChatGPT
- Tool output enters ChatGPT's context; treat it as untrusted data and verify before acting
- Revoke access by deleting the app in ChatGPT

## Related

- [MCP Server](server.md) — tools and protocol
- [Claude Setup](claude.md) — the equivalent OAuth flow for Claude
