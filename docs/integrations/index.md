---
title: Integrations
description: Connect TI Mindmap HUB to AI assistants via MCP and import STIX bundles into security platforms.
---

# Integrations

TI Mindmap HUB integrates with AI development environments via the Model Context Protocol (MCP) and with security platforms via STIX 2.1 exports.

---

## MCP Server

The [MCP Server](mcp/index.md) exposes 19 tools that allow AI assistants to query threat intelligence data directly.

| Client | Guide |
|--------|-------|
| VS Code + GitHub Copilot | [Setup Guide](mcp/vscode-copilot.md) |
| Claude Desktop | [Setup Guide](mcp/claude-desktop.md) |
| Custom Clients | [MCP Server Documentation](mcp/index.md) |

**Quick example** — With an MCP client connected, ask:

```
Show me the latest ransomware reports from the past week
```

---

## STIX Platforms

STIX 2.1 bundles can be imported into any compliant security tool. See the [STIX Platforms](stix-platforms.md) guide for step-by-step import instructions for:

- MISP
- OpenCTI
- Microsoft Sentinel
- Other STIX-compatible SIEMs, SOARs, and TIPs
