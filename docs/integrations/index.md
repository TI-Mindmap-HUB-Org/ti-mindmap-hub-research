---
title: Integrations
description: Import TI Mindmap HUB STIX 2.1 bundles into security platforms and connect to existing threat intelligence workflows.
---

# Integrations

TI Mindmap HUB produces STIX 2.1 bundles that can be imported into security platforms and integrated into existing threat intelligence workflows.

For AI assistant integrations via MCP, see the dedicated [MCP](../mcp/index.md) section.

---

## STIX Platforms

STIX 2.1 bundles can be imported into any compliant security tool. See the [STIX Platforms](stix-platforms.md) guide for step-by-step import instructions for:

- **MISP** — Import bundles as events with indicators and objects
- **OpenCTI** — Ingest structured intelligence via STIX 2.1 connector
- **Microsoft Sentinel** — Upload bundles to the Threat Intelligence blade
- **Other STIX-compatible SIEMs, SOARs, and TIPs** — Splunk, Elastic Security, Cortex XSOAR, ThreatConnect, Anomali

---

## API Access

STIX bundles and report content can be retrieved programmatically:

**MCP tool:**

```
get_stix_bundle(article_id="<report-id>")
```

**REST API:**

```http
GET https://ti-mindmap-hub.com/api/reports/{reportId}/stix
Authorization: Bearer <your-token>
Accept: application/json
```

See [MCP Server](../mcp/server.md) for the full list of available tools and protocol details.
