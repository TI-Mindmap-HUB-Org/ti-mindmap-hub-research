---
title: Interactive Mindmaps
description: How TI Mindmap HUB generates interactive visual threat models from processed threat intelligence reports.
---

# Interactive Mindmaps

Each analyzed report is transformed into an interactive mindmap — a visual threat model representing threat actors, campaigns, malware, TTPs, IOCs, and targeted sectors as a connected graph.

This allows analysts to reason visually about relationships instead of scanning pages of text, without losing analytical depth.

---

## What the Mindmap Contains

Each mindmap captures the key entities and relationships extracted from a threat report:

| Element | Description |
|---------|-------------|
| **Threat Actors** | Attributed groups or individuals behind the activity |
| **Campaigns** | Named operations or attack waves |
| **Malware & Tools** | Software used during the attack lifecycle |
| **TTPs** | MITRE ATT&CK techniques and tactics identified |
| **IOCs** | Indicators of Compromise linked to the activity |
| **Targeted Sectors** | Industries, geographies, or organizations affected |
| **Vulnerabilities** | CVEs exploited during the campaign |

---

## Format

Mindmaps are generated in **Mermaid Markdown** format, which allows rendering as interactive diagrams in the web interface and in any tool that supports Mermaid syntax (e.g., GitHub, VS Code, Obsidian).

The mindmap content can also be retrieved programmatically via the MCP `get_report_content` tool using the `mindmap` content type.

---

## Use Cases

- **Rapid triage** — Quickly understand the scope and structure of a threat report
- **Briefing preparation** — Use as a visual aid in threat briefings and presentations
- **Cross-report comparison** — Compare mindmaps from different reports to identify overlapping actors or infrastructure
- **Knowledge building** — Build mental models of threat actor behaviors over time

---

## Known Limitations

- **Relationship accuracy** — Connections between entities depend on LLM interpretation of the source text
- **Information density** — Complex reports with many entities may produce dense, hard-to-read graphs
- **Missing context** — Some nuances from the original report may not be captured in the visual representation

See [Known Limitations](../concepts/limitations.md) for the full list.
