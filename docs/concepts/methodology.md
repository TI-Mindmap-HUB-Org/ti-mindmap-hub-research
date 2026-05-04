---
title: Processing Methodology
description: How TI Mindmap HUB processes threat intelligence through a multi-stage AI pipeline — from content acquisition to structured STIX 2.1 outputs and analyst frontend.
---

# Processing Methodology

This document describes the methodology used in TI Mindmap HUB for processing threat intelligence using Generative AI.

## Overview

TI Mindmap HUB employs a multi-stage pipeline to transform unstructured threat intelligence reports into structured, actionable data. The system leverages Large Language Models (LLMs) for natural language understanding and information extraction, combined with pattern matching and validation layers.

For the visual pipeline diagrams, see [Concepts](index.md).

## Processing Pipeline

### Stage 1: Content Acquisition

```
OSINT Sources / Analyst Submissions → Validation → Raw Storage → Processing Trigger
```

**Process:**

1. Curated list of OSINT threat intelligence sources is monitored continuously
2. Analysts can submit URLs via the web interface or the MCP `submit_article` tool
3. Submissions are validated, deduplicated, and assigned a tracking identifier
4. Raw content is stored for reference and reproducibility
5. The article is queued for automated analysis

**Sources include:**

- Security vendor blogs (e.g., Mandiant, CrowdStrike, Recorded Future)
- Government advisories (e.g., CISA, NCSC)
- Security research publications
- Industry reports
- Analyst-submitted URLs

### Stage 2: Normalization and Processing

```
Raw Content → Text Parsing → Entity Extraction → Normalization and Confidence Scoring
```

**Process:**

1. HTML is stripped and content is converted to clean text
2. Metadata (source, publication date, URL) is preserved
3. LLMs and pattern matchers identify candidate entities across the text
4. Extracted entities are validated, deduplicated, and assigned confidence levels (high, medium, low)

### Stage 3: Threat Analysis Layer

Five extraction branches run in parallel:

#### IOC Detection and Enrichment

```
Normalized Text → Pattern Matching + LLM → IOC List → Validation → Deduplication
```

**IOC Types Extracted:**

| Type | Method | Validation |
|------|--------|------------|
| IPv4/IPv6 | Regex + LLM | Format validation, private range exclusion |
| Domains | Regex + LLM | TLD validation, whitelist filtering |
| URLs | Regex + LLM | Format validation |
| File Hashes (MD5, SHA-1, SHA-256) | Regex | Length and character validation |
| Email Addresses | Regex + LLM | Format validation |

**Whitelisting:**

- Common benign domains are excluded (e.g., google.com, microsoft.com)
- Cloud provider infrastructure ranges are filtered
- RFC 5737 documentation IP ranges are excluded
- Known false-positive patterns are maintained

#### TTP Extraction and ATT&CK Mapping

```
Report Behaviors → LLM Analysis → MITRE ATT&CK Techniques → Validation
```

**Process:**

1. LLM analyzes content for described attack behaviors
2. Behaviors are mapped to specific ATT&CK techniques based on behavioral analysis (not keyword matching)
3. Technique IDs are validated against the ATT&CK database
4. Tactics are inferred from technique associations

**Output:**

- Technique ID (e.g., T1566.001)
- Technique name
- Associated tactic(s)
- Confidence level (when determinable)

#### CVE Extraction with Risk Context

```
Vulnerability Mentions → Pattern Matching → Enrichment → Risk Context
```

**Process:**

1. CVE identifiers are extracted via pattern matching (CVE-YYYY-NNNNN)
2. Each CVE is enriched with CVSS severity, EPSS score, and exploit status
3. Patch availability and Proof-of-Concept status are correlated
4. Affected products and correlated references are linked

#### Threat Actor and Malware Extraction

```
Attribution Context → LLM Analysis → Named Entities → Relationship Mapping
```

**Process:**

1. LLM identifies named threat groups, malware families, and tools
2. Contextual relationships between actors and their tools/techniques are preserved
3. Attribution is extracted without fabrication — only explicitly stated attributions are captured

#### Summary and Mindmap Synthesis

```
Full Report Content → LLM Processing → Summary + Mindmap + 5W Analysis
```

**Outputs generated:**

- Technical summary
- Visual mindmap (Mermaid format) connecting actors, campaigns, malware, TTPs, IOCs, and targets
- "Five Whats" structured root-cause analysis (Who, What, When, Where, Why)
- Probable attack execution sequence

**Prompt Engineering:**

- Each output type uses specialized prompts
- Prompts are iteratively refined based on output quality
- Temperature and other parameters are tuned per task

### Stage 4: STIX 2.1 Structuring

```
Extracted Objects → Relationship Generation → Bundle Assembly → Validation → Storage
```

The backend assembles all extraction outputs into a unified STIX 2.1 bundle:

**Objects Generated:**

- `report` — Container for the intelligence
- `threat-actor` — When identified in the source
- `malware` — Malware families mentioned
- `indicator` — IOCs with STIX patterns
- `attack-pattern` — MITRE ATT&CK techniques
- `vulnerability` — CVE identifiers with risk context
- `relationship` — Connections between objects

**Relationship Types:**

- `indicates` — Indicator → Malware/Threat-Actor
- `uses` — Threat-Actor → Malware/Attack-Pattern
- `attributed-to` — Malware → Threat-Actor
- `exploits` — Malware/Threat-Actor → Vulnerability

**Validation:**

- STIX 2.1 JSON Schema compliance
- Object reference integrity
- Required field presence
- Pattern syntax validation (for indicators)

See [STIX 2.1 Data Model](data-model.md) for detailed STIX generation documentation.

### Stage 4b: Knowledge Graph Sync

```
STIX Bundle → Entity Resolution → Neo4j Canonical Entities → Cross-Report Relationships
```

After STIX bundle assembly, entities are synced to the **STIX Constellation** Knowledge Graph (Neo4j):

1. STIX objects are extracted and normalized
2. Entity deduplication merges aliases into canonical entities
3. Relationships are stored as graph edges
4. Cross-report links are computed (shared actors, tools, techniques)

This enables cross-report queries, attack path analysis, and campaign tracking. See [Knowledge Graph](../outputs/knowledge-graph.md) for full documentation.

### Stage 5: Per-Article Frontend Delivery

Each processed article is presented to the analyst through a tabbed interface with:

- **Header Metadata** — Title, source, publication date, link to original report, bookmark, and PDF export
- **Intel Graph** — Interactive STIX graph with graph/JSON views, object count, and bundle download
- **Diamond Model** — Adversary, capability, infrastructure, and victim mapping
- **AI Summary** — AI-generated technical summary
- **TI Mindmap** — Interactive visual threat model
- **IOCs** — High and medium confidence indicators with JSON export (low-confidence IOCs available in downloadable file)
- **CVEs** — CVSS severity, exploited/patch/PoC status, affected products, and references
- **TTP Catalog** — Full MITRE ATT&CK technique catalog
- **Attack Flow** — Reconstructed attack execution sequence
- **5W Context** — Structured root-cause analysis
- **ATT&CK Heatmap** — Visual technique heatmap across tactics
- **Source Report** — Original content for verification

### Stage 6: Weekly Briefing Generation

```
Weekly Reports → Multi-Agent Analysis → Trend Identification → Briefing
```

**Multi-Agent System (Autogen-based):**

The weekly briefing uses a specialized multi-agent architecture that processes 50–60 reports per week:

1. **Collector Agent** — Aggregates all reports from the past week
2. **Analyst Agents** — Each analyzes a subset of reports
3. **Trend Agent** — Identifies patterns across analyses
4. **Synthesis Agent** — Produces final briefing
5. **Editor Agent** — Reviews and refines output

**Briefing Sections:**

- Executive summary
- Top TTPs observed
- Most targeted sectors
- Emerging threats
- Notable campaigns (deep dives)

## Quality Assurance

### Automated Validation

- IOC format validation
- STIX schema compliance
- MITRE ATT&CK ID verification
- Duplicate detection
- Confidence scoring

### Human Review

- Periodic sampling of outputs
- Feedback incorporation
- Prompt refinement based on errors

### Metrics Tracked

- IOC extraction precision/recall (sampled)
- TTP mapping accuracy (sampled)
- Processing success rate
- User feedback scores

## Known Limitations

See [Known Limitations](limitations.md) for detailed information on system limitations.

## Technology Stack

| Component | Technology |
|-----------|------------|
| LLM Provider | Azure OpenAI |
| Backend | Python, FastAPI, Azure Functions |
| Primary Database | Azure Cosmos DB |
| Graph Database | Neo4j (Knowledge Graph) |
| Object Storage | Azure Blob Storage |
| Queue | Azure Storage Queue |
| Frontend | React 19, TypeScript, MUI 7 |
| Authentication | Azure AD B2C + API Keys |
| Hosting | Azure Static Web Apps (frontend), Azure Functions (backend) |
| Secrets | Azure Key Vault |

For full architectural details, see [Architecture](architecture.md).

## Reproducibility

While the core application code is private, we aim to provide:

- Detailed methodology documentation (this document)
- Example outputs and STIX bundles
- Evaluation metrics when available
- Research publications describing specific components

## Future Research Directions

1. **Knowledge Graph Expansion** — Improving entity resolution accuracy and expanding inferred relationship detection with confidence scoring
2. **Confidence Scoring** — Developing reliable confidence metrics for AI outputs
3. **Cross-Source Correlation** — Deepening analytics reports with automated multi-source correlation
4. **Evaluation Framework** — Systematic evaluation of extraction accuracy
5. **Expanded OSINT Coverage** — Broader source monitoring and deeper cross-report correlation
