---
title: Outputs
description: Overview of all structured outputs produced by TI Mindmap HUB — mindmaps, STIX bundles, IOCs, CVEs, MITRE ATT&CK mappings, weekly briefings, knowledge graph, and analytics reports.
---

# Outputs

TI Mindmap HUB generates several structured outputs from each processed threat intelligence report. This section documents each output type, its format, and how to consume it.

---

## Output Types

| Output | Format | Description |
|--------|--------|-------------|
| [Interactive Mindmaps](mindmaps.md) | Mermaid / Markdown | Visual threat models connecting actors, campaigns, malware, TTPs, and IOCs |
| [STIX 2.1 Bundles](stix-bundles.md) | JSON | Standardized threat intelligence packages with semantic relationship graphs |
| [IOC Extraction](ioc-extraction.md) | JSON | Indicators of Compromise — IPs, domains, hashes, URLs, emails |
| [CVE Intelligence](cve-intelligence.md) | JSON | Vulnerability identifiers with enrichment and cross-report correlation |
| [MITRE ATT&CK Mapping](mitre-mapping.md) | Table / JSON | Behavioral technique and tactic mapping from report content |
| [Weekly Briefings](weekly-briefings.md) | Markdown / HTML | Trend-focused weekly threat landscape synthesis from 50–60 reports |
| [Knowledge Graph](knowledge-graph.md) | Neo4j Graph | Cross-report entity correlation via STIX Constellation |
| [Analytics Reports](analytics-reports.md) | Markdown / HTML | Cross-source deep-dive intelligence analyses with severity ratings |

---

## Common Characteristics

All outputs share these properties:

- **AI-generated** — Produced by LLM processing; requires human verification
- **Source-linked** — Every output references the original report URL
- **Timestamped** — Creation and modification dates are preserved
- **Downloadable** — Available through the web interface and API
- **Structured** — Designed to be machine-readable and reusable beyond the UI

!!! warning
    All outputs are experimental and for informational purposes only. Verify indicators against original sources before operational use.

---

## Access Methods

- **Web interface** — Browse and download from [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
- **MCP tools** — Query programmatically via [MCP integration](../mcp/index.md)
- **API** — Retrieve STIX bundles and content types via authenticated API calls
