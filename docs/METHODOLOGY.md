# Research Methodology

This document describes the methodology used in TI Mindmap HUB for processing threat intelligence using Generative AI.

## Overview

TI Mindmap HUB employs a multi-stage pipeline to transform unstructured threat intelligence reports into structured, actionable data. The system leverages Large Language Models (LLMs) for natural language understanding and information extraction.

## Processing Pipeline

### Stage 1: Content Acquisition

```
OSINT Sources → Web Scraping → Raw Content → Content Cleaning
```

**Process:**
1. Curated list of threat intelligence sources is monitored continuously
2. New articles are identified and retrieved
3. HTML content is cleaned and converted to plain text
4. Metadata (source, date, URL) is preserved

**Sources include:**
- Security vendor blogs (e.g., Mandiant, CrowdStrike, Recorded Future)
- Government advisories (e.g., CISA, NCSC)
- Security research publications
- Industry reports

### Stage 2: AI-Powered Analysis

```
Clean Content → LLM Processing → Structured Outputs
```

**Outputs generated:**
- Technical summary
- Visual mindmap (Mermaid format)
- Indicators of Compromise (IOCs)
- TTPs mapped to MITRE ATT&CK
- "Five Whats" structured report
- Probable attack execution sequence

**Prompt Engineering:**
- Each output type uses specialized prompts
- Prompts are iteratively refined based on output quality
- Temperature and other parameters are tuned per task

### Stage 3: IOC Extraction

```
Raw Text → Pattern Matching + LLM → IOC List → Validation → Deduplication
```

**IOC Types Extracted:**

| Type | Method | Validation |
|------|--------|------------|
| IPv4/IPv6 | Regex + LLM | Format validation, private range exclusion |
| Domains | Regex + LLM | TLD validation, whitelist filtering |
| URLs | Regex + LLM | Format validation |
| File Hashes (MD5, SHA1, SHA256) | Regex | Length and character validation |
| CVE IDs | Regex | Format validation (CVE-YYYY-NNNNN) |
| Email Addresses | Regex + LLM | Format validation |

**Whitelisting:**
- Common benign domains are excluded (e.g., google.com, microsoft.com)
- Cloud provider ranges may be filtered
- Known false positive patterns are maintained

### Stage 4: TTP Mapping

```
Content + IOCs → LLM → MITRE ATT&CK Techniques → Validation
```

**Process:**
1. LLM analyzes content for attack behaviors
2. Behaviors are mapped to MITRE ATT&CK techniques
3. Technique IDs are validated against ATT&CK database
4. Tactics are inferred from technique associations

**Output:**
- Technique ID (e.g., T1566.001)
- Technique name
- Associated tactic(s)
- Confidence level (when determinable)

### Stage 5: STIX 2.1 Generation

```
Structured Data → STIX Object Creation → Relationship Mapping → Bundle Assembly
```

**Objects Generated:**
- `report` — Container for the intelligence
- `threat-actor` — When identified in the source
- `malware` — Malware families mentioned
- `indicator` — IOCs with patterns
- `attack-pattern` — MITRE ATT&CK techniques
- `relationship` — Connections between objects

**Relationship Types:**
- `indicates` — Indicator → Malware/Threat-Actor
- `uses` — Threat-Actor → Malware/Attack-Pattern
- `attributed-to` — Malware → Threat-Actor

See [`STIX-GENERATION.md`](STIX-GENERATION.md) for detailed STIX generation documentation.

### Stage 6: Weekly Briefing Generation

```
Weekly Reports → Multi-Agent Analysis → Trend Identification → Briefing
```

**Multi-Agent System:**
The weekly briefing uses a specialized multi-agent architecture:

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

See [`LIMITATIONS.md`](LIMITATIONS.md) for detailed information on system limitations.

## Technology Stack

| Component | Technology |
|-----------|------------|
| LLM Provider | OpenAI GPT-4 / Azure OpenAI |
| Backend | Python, Azure Functions |
| Database | Azure Cosmos DB |
| Frontend | React, TypeScript, Material-UI |
| Authentication | Azure AD B2C |
| Hosting | Azure Static Web Apps, Azure Container Apps |

## Reproducibility

While the core application code is private, we aim to provide:
- Detailed methodology documentation (this document)
- Example outputs and STIX bundles
- Evaluation metrics when available
- Research publications describing specific components

## Future Research Directions

1. **Knowledge Graph Construction** — Building a graph database of threat relationships
2. **Confidence Scoring** — Developing reliable confidence metrics for AI outputs
3. **Cross-Source Correlation** — Linking intelligence across multiple sources
4. **Evaluation Framework** — Systematic evaluation of extraction accuracy

---

*Last updated: December 2025*
