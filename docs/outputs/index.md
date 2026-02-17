---
title: Outputs
description: Overview of the structured outputs produced by TI Mindmap HUB — STIX bundles, IOCs, MITRE ATT&CK mappings, and weekly briefings.
---

# Outputs

TI Mindmap HUB generates several structured outputs from each processed threat intelligence report. This section documents each output type, its format, and how to consume it.

---

## Output Types

| Output | Format | Description |
|--------|--------|-------------|
| [STIX 2.1 Bundles](stix-bundles.md) | JSON | Standardized threat intelligence packages for SIEM/SOAR/TIP |
| [IOC Extraction](ioc-extraction.md) | JSON | Indicators of Compromise — IPs, domains, hashes, CVEs |
| [MITRE ATT&CK Mapping](mitre-mapping.md) | Table / JSON | Techniques and tactics identified in the report |
| [Weekly Briefings](weekly-briefings.md) | Markdown / HTML | Trend-focused weekly threat landscape summary |

---

## Common Characteristics

All outputs share these properties:

- **AI-generated** — Produced by LLM processing; requires human verification
- **Source-linked** — Every output references the original report URL
- **Timestamped** — Creation and modification dates are preserved
- **Downloadable** — Available through the web interface and API

!!! warning
    All outputs are experimental and for informational purposes only. Verify indicators against original sources before operational use.

---

## Access Methods

- **Web interface** — Browse and download from [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
- **MCP tools** — Query programmatically via [MCP integration](../integrations/mcp/index.md)
- **API** — Retrieve STIX bundles and content types via authenticated API calls
