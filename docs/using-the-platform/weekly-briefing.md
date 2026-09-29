---
title: Weekly Briefing
description: How to read the AI Briefing Agent's weekly threat briefing in TI Mindmap HUB — key takeaway, snapshot, vulnerability spotlight, IOC summary, ATT&CK coverage, deep dive, and report feed.
---

# Weekly Briefing

**Sidebar:** Intelligence → **AI Briefing Agent** · **Path:** `/briefing` · **Sign-in required**

The **Weekly Threat Briefing** is written by an AI agent system that reads every report processed during the week and produces a trend-focused summary of the threat landscape.

---

## Choosing a Week

The header shows **Week of {date} | N threats analyzed**. Use **Select Week** to switch between **Latest Report** and any previous week.

Older weeks may appear as **Legacy Report** (grey header) if they were produced by an earlier version of the agent and contain fewer sections.

---

## Sections

### Key Takeaway and Looking Ahead

The top banner gives the single most important message of the week, followed by **Looking Ahead** — what to watch for next.

### Weekly Snapshot

| Block | Content |
|-------|---------|
| **Top Observed TTPs** | Most frequent ATT&CK techniques, with frequency and a trend indicator |
| **Most Targeted Sectors** | Sectors with report count and percentage |
| **Emerging Pattern** | A highlighted pattern the agent considers new or growing |

### Vulnerability Spotlight

Counters for **Total CVEs**, **Critical**, **Exploited**, and **Vendors**, plus details on the most notable vulnerabilities of the week.

### IOC Summary

Counters for **Total IOCs**, **Shared Infrastructure**, and **IOC Types**, a type breakdown, a **Top IOCs to Monitor** table (**Type**, **Value**, **Context**), and **Campaign Linkage** — notes on reports connected by shared infrastructure.

### MITRE ATT&CK Coverage

**Techniques Observed** and **Tactics Covered** across the week.

### Top Threat Deep Dive

A focused analysis of the week's most significant threat: **Actor**, **Threat**, **Key TTPs**, **Impact**, an **Analyst Note**, and **Why This Threat?** (the agent's selection rationale). **View Full Analysis** opens the source report.

### Weekly Report Feed

A table of the week's reports — **Report Title**, **Actor(s)**, **Threat(s)**, **Severity** — linking to the [Report View](report-view.md).

### Honorable Mentions

Short call-outs for reports worth reading that did not make the deep dive.

### Platform statistics

**Reports Analyzed**, **CVEs Tracked**, and **IOCs Extracted** for the week.

---

## How It's Generated

- A multi-agent system processes the week's reports (typically 50–60): agents analyse subsets of reports, identify trends, synthesise the briefing, and review it
- Counts (CVEs, IOCs, techniques, sectors) are aggregated from the structured outputs of each report
- Narrative text (**Key Takeaway**, **Emerging Pattern**, **Analyst Note**, **Why This Threat?**) is AI-written and reflects the agent's interpretation

!!! warning
    Treat trends and narrative as a starting point for analysis. Follow the links to the underlying reports before briefing stakeholders.

See [Weekly Briefings](../outputs/weekly-briefings.md) and [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Other Ways to Get It

- **Newsletter** — enable **Subscribe to weekly newsletter** in [My Profile](account-and-access.md#my-profile)
- **MCP** — `get_latest_briefing`, `list_briefings`, `get_briefing_by_date`. See [MCP Server](../mcp/server.md#weekly-briefings-3-tools)
