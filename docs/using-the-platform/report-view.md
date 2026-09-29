---
title: Report View
description: A tab-by-tab guide to the TI Mindmap HUB report page — Intel Graph, Diamond Model, AI Summary, TI Mindmap, IOCs, CVEs, TTP Catalog, Attack Flow, 5W Context, ATT&CK Heatmap, Knowledge Graph, and Source Report.
---

# Report View

**Path:** `/report/{reportId}` · **Sign-in required**

Open a report from the [dashboard](dashboard.md) with **View AI Analysis**. The report page combines every output generated for a single article into 12 tabs.

!!! tip "Shareable links"
    The report URL is stable. If a colleague opens it while signed out, they are asked to sign in and then land directly on the report.

---

## Header

| Element | What it does |
|---------|--------------|
| **Title**, **Source**, **Published** | Article metadata from ingestion |
| **Bookmark** icon | Add or remove the report from your bookmarks (**Add Bookmark** / **Remove Bookmark**) |
| **View Original Source** | Opens the original article in a new tab |
| **Export PDF (Beta)** | Generates a PDF of the report analysis in your browser. Layout may vary |
| **Export MISP Event** | Downloads `misp-event-{reportId}.json` — the report's IOCs and CVEs as a MISP event, importable into any MISP instance |

---

## Tabs at a Glance

| # | Tab | Best for | Built from |
|---|-----|----------|------------|
| 1 | [Intel Graph](#intel-graph) | Seeing all STIX objects and relationships | STIX 2.1 bundle |
| 2 | [Diamond Model](#diamond-model) | Framing the intrusion | STIX 2.1 bundle |
| 3 | [AI Summary](#ai-summary) | Reading the gist in a minute | LLM summary |
| 4 | [TI Mindmap](#ti-mindmap) | Visual storyline of the threat | LLM mindmap |
| 5 | [IOCs](#iocs) | Indicators to hunt or block | Regex + LLM extraction |
| 6 | [CVEs](#cves) | Vulnerabilities and exploitation status | Pattern matching + enrichment |
| 7 | [TTP Catalog](#ttp-catalog) | ATT&CK techniques with evidence | LLM mapping + validation |
| 8 | [Attack Flow](#attack-flow) | Probable execution order | STIX attack patterns |
| 9 | [5W Context](#5w-context) | Who / What / When / Where / Why | LLM analysis |
| 10 | [ATT&CK Heatmap](#attck-heatmap) | Tactic coverage | ATT&CK Navigator layer |
| 11 | [Knowledge Graph](#knowledge-graph) | Links to other reports | STIX Constellation |
| 12 | [Source Report](#source-report) | Verifying any claim | Original article text |

If a tab has no data for a report (for example, a report with no CVEs), it shows an informational message instead.

---

## Intel Graph

An interactive graph of the report's **STIX 2.1 bundle**.

- Switch between **Graph View** and **JSON View**
- Click nodes to inspect objects (threat actors, malware, indicators, attack patterns, vulnerabilities) and their relationships
- **Download STIX Bundle** saves the bundle as `stix_bundle.json`

Use it to import the report into a TIP, SIEM, or SOAR — see [STIX Platform Integration](../integrations/stix-platforms.md) and [STIX Bundles](../outputs/stix-bundles.md).

## Diamond Model

The [Diamond Model of Intrusion Analysis](https://www.activeresponse.org/the-diamond-model/) built from the STIX bundle, with four expandable vertices: **Adversary**, **Capability**, **Infrastructure**, **Victim**. Click a vertex to see the objects placed there.

## AI Summary

A concise, structured summary of the article written by an LLM. Read it first, then confirm specific details in **Source Report**.

## TI Mindmap

A navigable **threat topology** — the report turned into a hierarchical mindmap (actors, campaigns, malware, techniques, infrastructure, targets).

- Branches are colour-coded by analytical domain
- Click a branch chip (or a node) to focus that branch; click **All branches** or **Reset view** to return to the full map
- Zoom and pan to inspect nodes
- **Download** the active view as **PNG** or **SVG**

See [Interactive Mindmaps](../outputs/mindmaps.md).

## IOCs

Indicators of Compromise extracted from the article.

- The table shows **high and medium confidence** indicators only (**Displaying High & Medium Confidence IOCs**)
- **Download Advanced IOCs (JSON)** saves the complete set, including low-confidence items, as `advanced_iocs_{reportId}.json`
- Each indicator carries type, confidence, and context where available (malware family, threat actor)

Benign infrastructure (large cloud providers, common software vendors, documentation IP ranges) is filtered out automatically. See [IOC Extraction](../outputs/ioc-extraction.md).

!!! warning
    Validate IOCs against **Source Report** before blocking. Shared hosting and CDN infrastructure can produce false positives.

## CVEs

Vulnerabilities mentioned in the article, enriched with risk context.

| Column | Meaning |
|--------|---------|
| **CVE ID** | Identifier |
| **Severity** | CVSS v3 severity |
| **Exploitation** | CISA KEV listing and EPSS probability of exploitation |
| **Status** | 🔥 Exploited · 🔧 Patched · 💻 PoC available |
| **Affected Products** | Vendor / product |
| **Context** | How the report discusses the CVE |

Expand a row to see **Description**, **Threat Context**, **Associated Threat Actors**, **Associated Malware** (click to open in [Threat Entities](threat-entities.md)), **CWE**, **CVSS Vector**, **Published**, and **References**. Summary chips such as **Active Exploitation** and **Contains Critical** appear above the table. See [CVE Intelligence](../outputs/cve-intelligence.md).

## TTP Catalog

The MITRE ATT&CK techniques identified in the article, with technique name, technique ID (for example, `T1566.001`), tactic, and a short justification from the text. IDs are validated against the official ATT&CK catalogue. See [MITRE ATT&CK Mapping](../outputs/mitre-mapping.md).

## Attack Flow

A vertical timeline of the **kill chain phases observed in this report**. Techniques from the STIX bundle are grouped by ATT&CK tactic (Reconnaissance → Initial Access → Execution → … → Impact) and shown in tactic order, so you can read the attack as a sequence. Only tactics with at least one technique are shown. Treat the order as a hypothesis: reports rarely describe every step explicitly.

## 5W Context

A structured **Who, What, When, Where, Why** analysis. Switch between **card view** and **table view** (**Question** / **Summary**). Items can carry a confidence label and references back to the source.

## ATT&CK Heatmap

A matrix of ATT&CK tactics and techniques with the report's techniques highlighted. It is rendered from an ATT&CK Navigator–compatible layer.

## Knowledge Graph

The report's entities as they appear in the cross-report [STIX Constellation](stix-constellation.md). Toggle **Include indicators** to add IOC nodes. Use it to see which actors, malware, or tools in this report also appear elsewhere.

## Source Report

The original article, converted to clean text. This is your ground truth for verification.

---

## Related Reports

Below the tabs, **Related Reports** lists up to five other reports that share entities (actors, malware, tools, techniques) with the current one, together with the shared entities. Rare entities (a specific malware family, a unique IOC) weigh more than ubiquitous ones (PowerShell, curl). The same ranking is available via the `kg_get_related_reports` MCP tool.

---

## How It's Generated

| Tab | Technique |
|-----|-----------|
| AI Summary, TI Mindmap, 5W Context | Task-specific LLM prompts over the full article text |
| IOCs | Pattern extraction plus LLM classification, validation, deduplication, and benign-domain filtering |
| CVEs | CVE pattern matching, then enrichment with CVSS, EPSS, CISA KEV, and exploit/patch signals |
| TTP Catalog, ATT&CK Heatmap | LLM behavioural mapping to ATT&CK, validated against the official technique list |
| Intel Graph | STIX objects and relationships generated by LLM, validated with a STIX 2.1 library |
| Diamond Model, Attack Flow | Derived in the browser from the STIX bundle |
| Knowledge Graph, Related Reports | Entity resolution across all reports in a graph database |

See [How Content Is Generated](../concepts/how-content-is-generated.md) for details.
