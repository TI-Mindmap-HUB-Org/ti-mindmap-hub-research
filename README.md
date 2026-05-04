<div align="center">

# TI Mindmap HUB

**Research platform exploring Generative AI applications in Cyber Threat Intelligence**

[![Docs](https://img.shields.io/badge/Docs-docs.ti--mindmap--hub.com-blue)](https://docs.ti-mindmap-hub.com)
[![Research Project](https://img.shields.io/badge/Type-Research%20Project-blueviolet)](https://ti-mindmap-hub.com/research)
[![Status](https://img.shields.io/badge/Status-Beta-yellow)](https://ti-mindmap-hub.com)
[![MCP](https://img.shields.io/badge/MCP-Enabled-green)](docs/integrations/mcp/index.md)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey)](LICENSE)

[Live Platform](https://ti-mindmap-hub.com) · [Documentation](https://docs.ti-mindmap-hub.com) · [MCP Integration](docs/integrations/mcp/index.md) · [Research](docs/research/index.md)

</div>

---

## About

TI Mindmap HUB is an **independent research project** exploring the application of Generative AI to Cyber Threat Intelligence (CTI) workflows. The platform automates the processing of OSINT sources, transforming unstructured threat reports into structured, actionable intelligence.

> **Independence Statement**: This is a personal research project. It is not affiliated with, endorsed by, or representative of any employer, organization, or commercial entity.

---

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| **Automated Ingestion** | Continuous monitoring of curated OSINT sources | Live |
| **AI-Powered Analysis** | LLM-generated summaries, mindmaps, and structured reports | Live |
| **IOC Extraction** | Automated identification of IPs, domains, hashes, CVEs | Live |
| **TTP Mapping** | Automatic alignment to MITRE ATT&CK framework | Live |
| **STIX 2.1 Export** | Standardized bundles for SIEM/SOAR/TIP integration | Live |
| **Weekly Briefing** | Multi-agent AI system analyzing weekly trends | Live |
| **CVE Intelligence** | Real-time CVE enrichment with EPSS scores | Live |
| **MCP Server** | Model Context Protocol for AI assistant integration | Live |
| **Knowledge Graph** | Visual exploration of threat relationships | Beta |

---

## Documentation

Full documentation is available at **[docs.ti-mindmap-hub.com](https://docs.ti-mindmap-hub.com)**.

You can also browse the docs directly in this repo under [`docs/`](docs/):

| Section | Description |
|---------|-------------|
| [Getting Started](docs/getting-started/index.md) | What it does, supported inputs, outputs |
| [Concepts](docs/concepts/index.md) | Processing pipeline, STIX data model, limitations |
| [Outputs](docs/outputs/index.md) | STIX bundles, IOCs, MITRE mapping, briefings |
| [Integrations](docs/integrations/index.md) | MCP server, STIX platform import guides |
| [Tutorials](docs/tutorials/index.md) | Step-by-step workflows |
| [Videos](docs/videos/index.md) | Video tutorials |
| [Research](docs/research/index.md) | Academic collaborations, publications |
| [Security](docs/security/index.md) | Vulnerability disclosure, privacy |
| [Community](docs/community/index.md) | Contributing, style guide |

---

## MCP Integration

TI Mindmap HUB exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server with 25 tools for AI assistant integration.

| Client | Setup Guide |
|--------|-------------|
| VS Code + GitHub Copilot | [Setup Guide](docs/mcp/vscode-copilot.md) |
| Claude | [Setup Guide](docs/mcp/claude.md) |
| Custom Clients | [MCP Server Docs](docs/mcp/index.md) |

**Quick example** — with a connected MCP client:

```
"Show me the latest ransomware reports from the past week"
"Search for CVE-2024-3400 and explain its impact"
"Get the STIX bundle for report abc123"
```

---

## Repository Structure

```
ti-mindmap-hub-research/
├── docs/                    # Documentation source (MkDocs)
│   ├── index.md             # Docs landing page
│   ├── getting-started/     # Getting started guide
│   ├── concepts/            # Methodology, data model, limitations
│   ├── outputs/             # STIX, IOCs, MITRE, briefings
│   ├── integrations/        # MCP server, STIX platforms
│   ├── tutorials/           # Step-by-step guides
│   ├── videos/              # Video tutorials
│   ├── research/            # Academic collaborations
│   ├── security/            # Security & privacy
│   ├── community/           # Contributing, style guide
│   ├── deployment/          # Azure SWA deployment guide
│   └── changelog.md         # Release history
├── schemas/stix-examples/   # Example STIX 2.1 bundles
├── mcp-integration/         # MCP bridge script
├── mkdocs.yml               # MkDocs configuration
├── requirements.txt         # Python dependencies
├── CONTRIBUTING.md           # Contribution guidelines
├── CODE_OF_CONDUCT.md        # Code of conduct
├── SECURITY.md               # Security policy
└── LICENSE                   # CC BY-NC 4.0
```

> **Note**: The core application code is maintained in private repositories. This public repository focuses on documentation, methodology, schemas, and integration guides.

---

## Academic Collaboration

This project actively collaborates with universities and researchers. See [Academic Collaborations](docs/research/academic-collaborations.md) for details.

| Project | Author | University | Status |
|---------|--------|------------|--------|
| [STIX 2.1 Generator](https://github.com/GiulioTriggiani/STIX-2.1-Generator) | Giulio Triggiani | UNISA | Integrated |

**Interested?** Contact [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com).

---

## Contributing

We welcome contributions to documentation, STIX examples, and research. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

This repository is licensed under [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](LICENSE).

---

## Contact

- **Email**: [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
- **Twitter/X**: [@ti_mindmap_hub](https://x.com/ti_mindmap_hub)
- **Platform**: [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
- **Docs**: [docs.ti-mindmap-hub.com](https://docs.ti-mindmap-hub.com)
