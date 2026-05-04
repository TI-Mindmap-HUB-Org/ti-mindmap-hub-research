---
title: MCP
description: Model Context Protocol integration for TI Mindmap HUB — connect AI assistants to threat intelligence data, build agents, and automate workflows.
---

# MCP — Model Context Protocol

TI Mindmap HUB exposes its intelligence through a **Model Context Protocol (MCP)** server, allowing AI assistants to query the platform directly from the analyst's working environment.

This means you can ask a natural language question like:

> *"Which IOCs and CVEs are associated with the threat actor discussed in the latest cyber threat report?"*

And receive a structured, contextual, and immediately usable response — without leaving your IDE or AI assistant.

---

## What Is MCP

The [Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that enables AI applications to connect to external data sources and tools. TI Mindmap HUB implements an MCP server that exposes 25 tools across seven categories, covering reports, weekly briefings, IOC search, CVE intelligence, STIX bundles, platform statistics, and knowledge graph queries.

---

## MCP Server

The MCP server is the core integration layer. It provides:

- **25 tools** for querying threat intelligence data
- **HTTP + SSE transport** with session management
- **OAuth 2.1** for connector-native clients such as Claude
- **API key authentication** for direct HTTP clients and local tooling
- **Endpoint**: `https://mcp.ti-mindmap-hub.com/mcp`

For full technical documentation, available tools, protocol details, and examples, see the [MCP Server](server.md) page.

---

## MCP Clients

Setup guides for connecting AI assistants to TI Mindmap HUB:

| Client | Description | Guide |
|--------|-------------|-------|
| **VS Code + GitHub Copilot** | Query threat intelligence directly from your IDE | [Setup Guide](vscode-copilot.md) |
| **Claude** | Use Claude through a native custom connector with OAuth | [Setup Guide](claude.md) |

Additional client integrations (e.g., Microsoft Copilot Studio, Cursor, custom clients) will be documented here as they become available.

---

## Use Cases

This section will document practical use cases for MCP-powered threat intelligence workflows:

- **Threat investigation** — Query reports, IOCs, and CVEs from your IDE while writing detection rules
- **Daily threat review** — Get weekly briefing summaries directly in your AI assistant
- **IOC enrichment** — Search for indicators across all processed reports without context switching
- **Report submission** — Submit URLs for automated analysis from any MCP client
- **Cross-report correlation** — Correlate threat actors, CVEs, and IOCs across multiple reports

Detailed use case documentation will be added progressively.

---

## Agents

This section will document AI agents built on top of the MCP integration:

- Custom agents for automated threat hunting workflows
- Multi-step analysis agents combining multiple MCP tools
- Integration agents connecting TI Mindmap HUB with other security platforms

Agent documentation and examples will be published as they are developed.

---

## Support

- **Issues**: [GitHub Issues](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
