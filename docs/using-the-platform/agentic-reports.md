---
title: Agentic Reports
description: Browse TI Mindmap HUB's public, cross-source intelligence reports — search, severity filter, tags, grid and timeline views.
---

# Agentic Reports

**Sidebar:** Intelligence → **Agentic Reports** · **Path:** `/analytics` · **Public — no sign-in required**

Agentic Reports are long-form, **cross-source** intelligence analyses. Instead of covering a single article, each one correlates several reports and sources about a significant threat, campaign, or vulnerability. This is the only intelligence content that is **publicly accessible** without an account.

---

## Library Page

### Summary

The header shows the number of reports, sources analysed, Critical/High reports, and tags. Four cards repeat these figures: **Total Reports**, **Critical / High**, **Sources Analyzed**, **Unique Tags**.

### Search and filters

| Control | How it works |
|---------|--------------|
| **Search** | Match title, description, or tag |
| **Severity** | `All`, or a single severity (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFORMATIONAL`) |
| **Sort by** | `Newest first`, `Oldest first`, `Severity` |
| **View** | Grid view or timeline view |
| **POPULAR TAGS** | Click one or more tags to filter; **Clear tags** resets |

### Report cards

Each card shows the title, severity, classification (for example, *Supply Chain Attack*, *Vulnerability Analysis*), date, tags, a short description, and the number of sources analysed.

---

## Single Report

**Path:** `/analytics/{slug}`

Each report has a permanent URL you can share publicly. The page renders the full analysis with its metadata (date, severity, classification, tags) and the list of sources it draws on.

---

## Severity Levels

| Level | Meaning |
|-------|---------|
| CRITICAL | Immediate, widespread impact; active exploitation |
| HIGH | Significant threat with confirmed activity |
| MEDIUM | Notable threat requiring awareness |
| LOW | Limited impact or early-stage threat |
| INFORMATIONAL | Context and background; no immediate action required |

---

## How It's Generated

Each Agentic Report starts from a set of processed TI Mindmap HUB reports on the same topic. These are listed as sources at the top of the report, each with a link to its TI Mindmap HUB analysis. An agentic, AI-assisted workflow then:

1. Gathers the structured outputs of those reports (summaries, IOCs, CVEs, TTPs, entities)
2. Correlates findings across sources — agreements, contradictions, and gaps
3. Drafts a structured analysis with a severity rating and classification

They go deeper than per-article outputs but remain AI-assisted analysis. Check the cited sources before acting on the conclusions.

See [Analytics Reports](../outputs/analytics-reports.md) for the report structure and methodology. Markdown versions of several reports are published in the [research repository](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/tree/main/reports).
