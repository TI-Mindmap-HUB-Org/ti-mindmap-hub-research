<div align="center">

# TI Mindmap HUB

**Research platform exploring Generative AI applications in Cyber Threat Intelligence**

[![Research Project](https://img.shields.io/badge/Type-Research%20Project-blueviolet)](https://ti-mindmap-hub.com/research)
[![Status](https://img.shields.io/badge/Status-Beta-yellow)](https://ti-mindmap-hub.com)
[![MCP](https://img.shields.io/badge/MCP-Enabled-green)](mcp-integration/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](LICENSE)

[Live Platform](https://ti-mindmap-hub.com) · [Research](https://ti-mindmap-hub.com/research) · [MCP Integration](mcp-integration/) · [Roadmap](https://ti-mindmap-hub.com/roadmap)

</div>

---

## About

TI Mindmap HUB is an **independent research project** exploring the application of Generative AI to Cyber Threat Intelligence (CTI) workflows. The platform automates the processing of OSINT (Open-Source Intelligence) sources, transforming unstructured threat reports into structured, actionable intelligence.

> ⚠️ **Independence Statement**: This is a personal research project. It is not affiliated with, endorsed by, or representative of any employer, organization, or commercial entity. All views and outputs are the author's own.

### Research Objectives

- Evaluate LLM accuracy in automated IOC extraction
- Explore STIX 2.1 bundle generation from unstructured text
- Map TTPs to MITRE ATT&CK framework programmatically
- Understand limitations and failure modes of AI in security contexts
- Study human-AI collaboration in threat analysis workflows

---

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Automated Ingestion** | Continuous monitoring of curated OSINT sources | ✅ Live |
| **AI-Powered Analysis** | LLM-generated summaries, mindmaps, and structured reports | ✅ Live |
| **IOC Extraction** | Automated identification of IPs, domains, hashes, CVEs | ✅ Live |
| **TTP Mapping** | Automatic alignment to MITRE ATT&CK framework | ✅ Live |
| **STIX 2.1 Export** | Standardized bundles for SIEM/SOAR/TIP integration | ✅ Live |
| **Weekly Briefing** | Multi-agent AI system analyzing weekly trends | ✅ Live |
| **IOC Search** | Fast lookup across all processed reports | ✅ Live |
| **CVE Intelligence** | Real-time CVE enrichment with EPSS scores | ✅ Live |
| **MCP Server** | Model Context Protocol for AI assistant integration | ✅ Live |
| **Knowledge Graph** | Visual exploration of threat relationships | 🚧 Beta |

---

## MCP Integration

TI Mindmap HUB exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server, allowing AI assistants to query threat intelligence data directly.

### Supported Clients

| Client | Guide |
|--------|-------|
| **VS Code + GitHub Copilot** | [Setup Guide](mcp-integration/VSCODE_SETUP.md) |
| **Claude Desktop** | [Setup Guide](mcp-integration/CLAUDE_DESKTOP_SETUP.md) |
| **Custom Clients** | [MCP Server Documentation](mcp-integration/) |

### Available Tools (16)

- **Reports**: List, search, and retrieve threat intelligence reports
- **Weekly Briefings**: Access AI-generated weekly threat summaries
- **CVE Intelligence**: Search and analyze vulnerabilities
- **IOC Search**: Query indicators across all processed data
- **STIX Export**: Retrieve structured threat data

### Quick Example

With Claude Desktop or VS Code Copilot connected:

```
"Show me the latest ransomware reports from the past week"
"Search for CVE-2024-3400 and explain its impact"
"Get the STIX bundle for report abc123"
```

📖 **[Full MCP Documentation →](mcp-integration/)**

---

## Repository Contents

```
ti-mindmap-hub-research/
├── documentation/
│   ├── METHODOLOGY.md          # Research methodology and approach
│   ├── LIMITATIONS.md          # Known limitations of AI-generated content
│   ├── STIX-GENERATION.md      # STIX 2.1 generation process
│   ├── CONTRIBUTING.md         # How to contribute
│   └── ACADEMIC-COLLABORATIONS.md  # Academic partnerships
├── mcp-integration/            # MCP server documentation
│   ├── README.md               # MCP server overview
│   ├── VSCODE_SETUP.md         # VS Code + Copilot setup
│   ├── CLAUDE_DESKTOP_SETUP.md # Claude Desktop setup
│   └── mcp-bridge.js           # Bridge script for stdio clients
├── schemas/
│   └── stix-examples/          # Example STIX 2.1 bundles
├── LICENSE                     # CC BY-NC 4.0
├── SECURITY.md                 # Security policy
└── README.md                   # This file
```

> **Note**: The core application code is maintained in private repositories. This public repository focuses on documentation, methodology, schemas, and integration guides.

---

## STIX 2.1 Integration

TI Mindmap HUB generates STIX 2.1 bundles for each processed threat intelligence report. These bundles can be imported into:

- **SIEMs**: Splunk, Microsoft Sentinel, Elastic Security
- **SOARs**: Cortex XSOAR, Splunk SOAR, Tines
- **TIPs**: MISP, OpenCTI, ThreatConnect, Anomali

### Example Bundle Structure

```json
{
  "type": "bundle",
  "id": "bundle--uuid",
  "objects": [
    { "type": "report", "..." },
    { "type": "threat-actor", "..." },
    { "type": "malware", "..." },
    { "type": "indicator", "..." },
    { "type": "attack-pattern", "..." },
    { "type": "relationship", "..." }
  ]
}
```

See [`schemas/stix-examples/`](schemas/stix-examples/) for complete examples.

---

## Limitations

As with any AI system, outputs are experimental and require human verification:

- **AI-Generated Content**: All analyses may contain errors, omissions, or hallucinations
- **IOC Accuracy**: Extracted indicators require verification before operational use
- **False Positives**: Automated extraction may include benign indicators
- **Context Loss**: Nuanced context from original reports may not be fully captured

For detailed information, see [`documentation/LIMITATIONS.md`](documentation/LIMITATIONS.md).

---

## Academic Collaboration

This project actively collaborates with universities and independent researchers. Current research areas include:

- STIX 2.1 generation and validation
- Knowledge graph construction for threat intelligence
- Evaluation of LLM performance in security contexts
- MCP protocol applications in cybersecurity

### Supervised Research

| Project | Author | Type | Status |
|---------|--------|------|--------|
| [STIX 2.1 Generator](https://github.com/GiulioTriggiani/STIX-2.1-Generator) | Giulio Triggiani | Master's Thesis | ✅ Integrated |

#### STIX 2.1 Generator — Giulio Triggiani

Master's thesis on automatic STIX 2.1 bundle generation using Large Language Models, developed at the University of Salerno (UNISA). The methodology has been integrated into TI Mindmap HUB's production pipeline.

**Supervisors:** Assoc. Prof. Arcangelo Castiglione, Ing. Antonio Formato

**Key contributions:**
- LLM-based extraction of STIX Domain Objects (SDOs) and Cyber Observables (SCOs)
- Automated relationship mapping between threat entities
- Evaluation framework with standard and graph-based metrics
- ~85% precision on SDO extraction

📄 [Thesis PDF](https://github.com/GiulioTriggiani/STIX-2.1-Generator/blob/main/thesis/Tesi_Triggiani_Giulio.pdf) · 💻 [Repository](https://github.com/GiulioTriggiani/STIX-2.1-Generator)

For more details, see [`documentation/ACADEMIC-COLLABORATIONS.md`](documentation/ACADEMIC-COLLABORATIONS.md).

### Interested in Collaborating?

We welcome:
- Thesis supervision opportunities
- Joint research projects
- Dataset sharing initiatives
- Peer review and feedback

Contact: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)

---

## Publications & Presentations

*Coming soon* — Research outputs will be listed here as they are published.

---

## How to Cite

If you reference this project in academic work:

```bibtex
@misc{timindmaphub2025,
  title = {TI Mindmap HUB: An Experimental Platform for GenAI-Powered Cyber Threat Intelligence},
  author = {TI Mindmap HUB},
  year = {2025},
  url = {https://ti-mindmap-hub.com},
  note = {Independent Research Project}
}
```

---

## License

This repository is licensed under [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](LICENSE).

You are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes

---

## Contact

- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
- **Twitter/X**: [@ti_mindmap_hub](https://x.com/ti_mindmap_hub)
- **Platform**: [ti-mindmap-hub.com](https://ti-mindmap-hub.com)

---

<div align="center">

**TI Mindmap HUB** — Independent Research Project

*Exploring the intersection of Generative AI and Cyber Threat Intelligence*

</div>