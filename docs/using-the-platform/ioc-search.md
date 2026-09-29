---
title: IOC Search
description: Look up indicators of compromise across all processed reports, triage up to 500 indicators at once, and export IOCs to CSV.
---

# IOC Search

**Sidebar:** Hunt & Explore → **IOC Search** · **Path:** `/ioc-search` · **Sign-in required**

Use IOC Search to answer *"Have we seen this indicator before, and where?"* The page has three tools: single lookup, bulk triage, and CSV export.

---

## Single Lookup

1. Enter an IP address, domain, URL, file hash, or email in **IOC Value**
2. Click **Search** (or press Enter)

Example chips below the field fill in sample values.

### Results — IOC Database Results

The results come from **per-report extractions**: every row is an indicator extracted from one specific report.

| Column | Content |
|--------|---------|
| **Indicator** | The matched value |
| **Type** | Indicator type (for example, `ipv4-addr`, `domain-name`, `url`, `file`, `email-addr`) |
| **Source Article** | Title of the report the indicator came from — opens the original article |
| **Actions** | **View Report** opens the [Report View](report-view.md) |

Below the table, a companion panel checks the same value against the [knowledge graph](stix-constellation.md) and lists connected threat entities (actors, malware) you can open directly.

If nothing matches, you see **No results found**. An unknown indicator is not proof of benign activity — it only means it has not appeared in a processed report.

---

## Bulk IOC Triage

Paste a list of indicators from an alert or incident and check which ones are known to the corpus.

1. Paste indicators into the text area — one per line (commas and semicolons also work)
2. Defanged values are accepted: `evil[.]com`, `hxxp://`, `hxxps://`
3. Click **Triage N IOCs** (up to **500** indicators per run)

Summary chips show **N known** and **N unknown**.

| Column | Content |
|--------|---------|
| **IOC** | The value you submitted |
| **Verdict** | **Known (n)** with the number of matches, or **Unknown** |
| **Context** | Threat actor and malware family from the first match, when available |
| **Seen In** | First matching report (link) and `+N more` if it appears in other reports |

Click **Download results CSV** to save the triage (`ioc-triage-YYYY-MM-DD.csv`).

---

## Export IOCs to CSV

Produce a flat CSV of extracted indicators for SIEM/EDR ingestion, with provenance.

| Option | Values |
|--------|--------|
| **Period** | `Last 7 days`, `Last 30 days`, `Last 90 days`, `All time` |
| **Unique indicators** | Off: one row per indicator per report. On: one row per distinct indicator with aggregated provenance |
| **Defang** | On: network indicators are defanged (`.` → `[.]`, `http` → `hxxp`, `@` → `[at]`); hashes are unchanged |

Click **Download CSV**.

| Mode | Columns |
|------|---------|
| Default | `indicator`, `type`, `confidence`, `threat_actor`, `malware_family`, `kill_chain_phase`, `first_seen`, `article_id`, `article_title`, `article_source`, `article_url` |
| Unique | `indicator`, `type`, `confidence`, `threat_actors`, `malware_families`, `first_seen`, `last_seen`, `article_count`, `article_ids` |

!!! warning "Review before blocking"
    Exported IOCs are AI-assisted extractions. Review them — especially shared infrastructure and CDN addresses — before loading them into blocking controls.

---

## How It's Generated

- Indicators are extracted per report by combining pattern matching with LLM classification, then validated, normalised (refanged), deduplicated, and filtered against a list of benign domains and ranges
- Each indicator keeps a **confidence** level (high, medium, low) and, when stated in the report, the associated **threat actor** and **malware family**
- Lookup and triage normalise your input the same way, so defanged and refanged forms match

See [IOC Extraction](../outputs/ioc-extraction.md) and [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Via MCP

The `search_ioc` MCP tool performs the same single lookup from an AI assistant. See [MCP Server](../mcp/server.md#ioc-search-1-tool).
