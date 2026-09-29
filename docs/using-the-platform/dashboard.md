---
title: Threat Reports Dashboard
description: How to browse, search, and filter processed threat reports on the TI Mindmap HUB dashboard.
---

# Threat Reports Dashboard

**Sidebar:** Intelligence → **Threat Reports** · **Path:** `/` · **Sign-in required**

The dashboard is the home page of the platform. It lists every processed threat report, newest first, as a grid of cards.

---

## Page Layout

### Header

- **AI-Powered Threat Intelligence** title and a personalised greeting
- A status bar with **AI-Generated Summaries**, **Real-Time Updates**, and the total number of reports available

### Search and filters

| Control | How it works |
|---------|--------------|
| **Search box** | Free text matched against title, source, summary, CVE, IOC, or keyword. Results update as you type |
| **Source** | Pick a single source feed (for example, a vendor blog or a government advisory feed) |
| **Tags** | Pick one or more tags to narrow the list |
| **Time Range** | `All Time`, `Last 24 Hours`, `Last 7 Days`, `Last 30 Days`, or `Custom Range...` |

`Custom Range...` opens a dialog with **Start Date** and **End Date**. The selected range appears as a chip under the filter; click the chip's **×** to clear it.

Filters combine: for example, *Source = CISA* + *Tags = ransomware* + *Last 30 Days*.

---

## Report Cards

Each card shows:

| Element | Meaning |
|---------|---------|
| **AI Analyzed** badge | The report has been processed by the AI pipeline |
| **NEW** badge | Published within the last 7 days |
| Title | Report title (up to two lines) |
| Teaser | One-sentence AI-generated summary |
| **Source** / **Published** | Source feed and publication date |
| Tags | Up to three tags, plus a `+N` chip if there are more |
| **View AI Analysis** | Opens the [Report View](report-view.md) |
| **Source** | Opens the original article in a new tab |

---

## Loading More

The dashboard loads 12 reports at a time. Scroll to the bottom and click **Load More Reports** to fetch the next page. If nothing matches, the page shows **No reports found — Try adjusting your search criteria or filters**.

---

## How It's Generated

- Reports enter automatically from a curated list of OSINT sources, or through [human-approved submissions](submit-article.md)
- The **teaser** on each card is a separate, short LLM summary, different from the full **AI Summary** in the report view
- **Tags** and **source** come from the ingestion pipeline and are used for filtering

See [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Tips

- Search for a CVE ID (for example, `CVE-2024-3400`) to find every report that mentions it — then use [CVE Search](cve-search.md) for risk context
- Search for an indicator to find reports quickly — then use [IOC Search](ioc-search.md) for per-report extraction details
- Bookmark important reports from the [Report View](report-view.md#header)
