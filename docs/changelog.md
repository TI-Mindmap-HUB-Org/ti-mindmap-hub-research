---
title: Changelog
description: Release history and notable changes to TI Mindmap HUB documentation and public artifacts.
---

# Changelog

Notable changes to TI Mindmap HUB documentation and public research artifacts.

This changelog covers the public documentation repository. For platform release notes, see [ti-mindmap-hub.com](https://ti-mindmap-hub.com).

---

## 2026-05 — Architecture, Knowledge Graph & MCP 25 Tools

### Added

- **[Architecture](concepts/architecture.md)** — Full technical architecture page covering backend (Azure Functions + FastAPI), frontend (React 19 + MUI 7), data stores (Cosmos DB, Neo4j, Blob Storage), authentication model, and deployment topology with Mermaid diagrams
- **[Knowledge Graph — STIX Constellation](outputs/knowledge-graph.md)** — Documentation for the Neo4j-backed cross-report knowledge graph: graph schema, API endpoints (6), frontend experience, entity resolution, and use cases
- **[Analytics Reports](outputs/analytics-reports.md)** — Documentation for cross-source intelligence reports with severity classification and correlation methodology
- Knowledge Graph tools added to MCP server documentation (6 new tools: `kg_stats`, `kg_search`, `kg_cluster`, `kg_timeline`, `kg_attack_path`, `kg_cross_report`)

### Changed

- **MCP tool count updated from 19 to 25** across all documentation (`server.md`, `index.md`, `llms.txt`, `README.md`, home page)
- MCP server overview now lists seven tool categories (added Knowledge Graph)
- Processing pipeline diagrams updated to include Neo4j Knowledge Graph sync stage
- Technology stack in `methodology.md` corrected: Azure OpenAI (not generic OpenAI), FastAPI (added), Neo4j (added), MUI 7 (was "Material-UI"), Azure Functions (was "Azure Container Apps")
- Future research directions updated — Knowledge Graph moved from "planned" to "shipped"
- Home page (`index.md`) — added Knowledge Graph feature card
- Outputs index table — added Knowledge Graph and Analytics Reports rows
- `concepts/index.md` high-level pipeline — added Knowledge Graph sync and STIX Constellation node
- `mkdocs.yml` navigation — added Architecture, Knowledge Graph, and Analytics Reports entries

---

## 2025-02 — Documentation Site Launch

### Added

- MkDocs Material documentation site at [docs.ti-mindmap-hub.com](https://docs.ti-mindmap-hub.com)
- Getting Started guide
- Concepts section with methodology, data model, and limitations
- Outputs documentation for STIX bundles, IOCs, MITRE mapping, and weekly briefings
- Integrations section with MCP server documentation for VS Code and Claude Desktop
- Tutorial: From Report to Structured Intelligence
- Video Tutorials section with embed pattern
- Research section with academic collaborations
- Security & Privacy policy documentation
- Community section with contributing guide and style guide
- Deployment documentation for Azure Static Web Apps
- GA4 analytics integration
- `llms.txt` for AI tool consumption
- `robots.txt` and sitemap generation
- GitHub Actions CI/CD for automated site deployment
- Issue templates for bug reports, docs improvements, and feature requests
- Pull request template
- CODE_OF_CONDUCT.md
- Comprehensive CONTRIBUTING.md

### Changed

- Repository restructured from flat documentation layout to MkDocs-compatible tree
- Files migrated with `git mv` to preserve history
- README.md rewritten as project entry point linking to docs site

---

## 2025-01 — MCP Tools Update

### Added

- STIX bundle tools (3 new MCP tools)
- CVE intelligence tools (5 new MCP tools)
- Updated MCP documentation to reflect 19 available tools

---

## 2025-01 — Academic Collaborations

### Added

- Academic collaborations documentation
- Giulio Triggiani Master's thesis integration (UNISA)
- Research areas and collaboration opportunities

---

## 2025-01 — Initial Public Release

### Added

- Public research documentation repository
- Methodology documentation
- Limitations documentation
- STIX 2.1 generation documentation
- Contributing guidelines
- MCP server integration guides (VS Code, Claude Desktop)
- Example STIX 2.1 bundle
- MCP bridge script for stdio clients
- Security policy
- CC BY-NC 4.0 license
