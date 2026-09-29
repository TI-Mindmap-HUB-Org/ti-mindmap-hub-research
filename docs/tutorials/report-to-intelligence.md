---
title: "Tutorial: From Report to Structured Intelligence"
description: Step-by-step guide to submitting a threat report to TI Mindmap HUB and consuming the structured outputs.
---

# From Report to Structured Intelligence

This tutorial walks through the process of going from a raw threat report to structured, actionable intelligence using TI Mindmap HUB.

---

## Prerequisites

- A TI Mindmap HUB account — see [Account & Access](../using-the-platform/account-and-access.md)
- A publicly accessible threat intelligence report URL (or an existing report already in the platform)

---

## Step 1: Find or Submit a Report

Most reports are ingested automatically from curated OSINT sources. First check whether your report is already there:

1. Open **Threat Reports** (the dashboard at `/`)
2. Search by title, source, CVE, IOC, or keyword

If it is not there, submit it:

=== "Web Interface"

    1. In the sidebar, open **Platform → Submit Article**
    2. Paste the URL in **Article URL**
    3. Click **Submit URL**

=== "MCP Tool"

    If you have an MCP client connected:

    ```
    Submit this article for analysis: https://example.com/threat-report
    ```

    This invokes the `submit_article` tool.

!!! info "Human approval"
    Every submission is reviewed by a human before entering the pipeline. Once approved and processed, you receive an email from `info@ti-mindmap-hub.com` with a direct link to the report. See [Submit an Article](../using-the-platform/submit-article.md).

---

## Step 2: Processing

Once approved, the report goes through the [processing pipeline](../concepts/methodology.md):

1. Content acquisition and cleaning
2. Parallel AI analysis (summary, mindmap, IOCs, CVEs, TTPs, 5W)
3. STIX 2.1 bundle assembly and validation
4. Knowledge graph synchronisation

For details on how each output is produced, see [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Step 3: Get the Big Picture

Open the report and start with the narrative tabs:

- **AI Summary** — concise AI-generated overview
- **TI Mindmap** — visual threat topology; focus a branch and export as PNG/SVG
- **5W Context** — Who, What, When, Where, Why
- **Diamond Model** — adversary, capability, infrastructure, victim

---

## Step 4: Examine Extracted IOCs

Open the **IOCs** tab:

- High- and medium-confidence indicators are shown in the table
- Download the full JSON (including low-confidence items) for offline review
- Pivot any indicator through [IOC Search](../using-the-platform/ioc-search.md) to see which other reports mention it

!!! warning "Verify Before Blocking"
    Always validate extracted IOCs against the original source (the **Source Report** tab) before adding them to blocklists or detection rules.

---

## Step 5: Review Vulnerabilities

Open the **CVEs** tab to see CVSS severity, exploitation status (exploited, PoC, patched), affected products, and references. Use [CVE Search](../using-the-platform/cve-search.md) to check CISA KEV and EPSS context across the whole corpus.

---

## Step 6: Review MITRE ATT&CK Mappings

- **TTP Catalog** — technique ID, name, tactic, and supporting comment
- **Attack Flow** — probable execution sequence
- **ATT&CK Heatmap** — coverage across tactics, rendered from an ATT&CK Navigator–compatible layer

Use these mappings to check your detection coverage against the described attack.

---

## Step 7: Export Structured Intelligence

| Need | Where |
|------|-------|
| STIX 2.1 bundle | **Intel Graph** tab → download, or [STIX Bundles](../using-the-platform/stix-bundles.md) page |
| MISP event | **Export MISP Event** button in the report header |
| PDF briefing | **Export PDF (Beta)** button in the report header |
| IOC list | **IOCs** tab JSON download, or CSV from [IOC Search](../using-the-platform/ioc-search.md#export-iocs-to-csv) |

Import the STIX bundle into your SIEM, SOAR, or TIP (see [STIX Platform Integration](../integrations/stix-platforms.md)).

---

## Step 8: Cross-Reference

- Open the **Knowledge Graph** tab and the **Related Reports** panel to find reports sharing actors, malware, or infrastructure
- Open an actor or malware profile in [Threat Entities](../using-the-platform/threat-entities.md)
- Check the [AI Briefing Agent](../using-the-platform/weekly-briefing.md) to place the report in the week's trends

---

## Next Steps

- [Using the Platform](../using-the-platform/index.md) — Page-by-page guide to the web interface
- [Outputs](../outputs/index.md) — Detailed documentation of each output type
- [MCP](../mcp/index.md) — Automate queries with AI assistants
- [Known Limitations](../concepts/limitations.md) — Understand what to verify
