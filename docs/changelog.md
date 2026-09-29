---
title: Changelog
description: Release history and notable changes to TI Mindmap HUB documentation and public artifacts.
---

# Changelog

Notable changes to TI Mindmap HUB documentation and public research artifacts.

This changelog covers the public documentation repository. For platform release notes, see [ti-mindmap-hub.com](https://ti-mindmap-hub.com).

---

## 2026-09 — End-User Documentation Overhaul

### Added

- **[Using the Platform](using-the-platform/index.md)** — New section with a page-by-page guide to the web app: Account & Access (public vs. authenticated pages, sign-in, profile, MCP API keys), Threat Reports Dashboard, Report View (all 12 tabs), Weekly Briefing, Agentic Reports, IOC Search (bulk triage, CSV export), CVE Search (Patch Priority, KEV), Threat Entities, STIX Bundles, STIX Constellation, Statistics, Submit an Article
- **[How Content Is Generated](concepts/how-content-is-generated.md)** — Plain-language explanation of each output, its deterministic safeguards, IOC confidence rules, and what to verify
- **[Glossary](concepts/glossary.md)**
- MCP setup guides for **[ChatGPT](mcp/chatgpt.md)**, **[Microsoft Copilot Studio](mcp/copilot-studio.md)**, **[Microsoft Foundry](mcp/foundry.md)**, and **[Other Clients](mcp/other-clients.md)** (OpenAI Responses API, Cursor, Claude Code, Claude Desktop bridge, Python SDK)
- Two new MCP tools documented: `export_iocs_csv` and `kg_get_related_reports`
- MCP server OAuth 2.1 documentation (PKCE, Dynamic Client Registration, discovery endpoints) and public endpoints (`/health`, `/info`)

### Changed

- MCP tool count updated to **27** across all pages (VS Code and Claude pages previously showed 16 and 18)
- Transport documented as **Streamable HTTP** (MCP spec `2025-11-25`) instead of HTTP + SSE
- API keys can also be sent as `Authorization: Bearer tim_…`; VS Code, Cursor, and Claude Code can use OAuth instead of a key
- ChatGPT page: only `submit_article` requires confirmation (all other tools are read-only)
- API key instructions now point to **My Profile → MCP Server API Keys** (5 active keys, 365-day validity, regenerate/revoke)
- Frontend routes in [Architecture](concepts/architecture.md) corrected and split into public and authenticated routes
- Report tabs updated everywhere to include the **Knowledge Graph** tab, **Export MISP Event**, and **Related Reports**
- [Tutorial](tutorials/report-to-intelligence.md) rewritten with actual tab names and the human-reviewed submission flow
- IOC extraction and methodology pages document the high/medium/low confidence rules and STIX validation behaviour
- Video pages marked as **coming soon**

### Fixed

- Missing front-matter delimiter in `mcp/claude.md`
- Knowledge Graph MCP tool names corrected to the names exposed by the server: `kg_get_graph_stats`, `kg_search_entities`, `kg_get_entity_cluster`, `kg_get_entity_timeline`, `kg_search_attack_path`, `kg_find_cross_report_links` (previously documented as `kg_stats`, `kg_search`, `kg_cluster`, `kg_timeline`, `kg_attack_path`, `kg_cross_report`)

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
