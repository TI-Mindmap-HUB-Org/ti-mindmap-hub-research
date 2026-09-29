---
title: Statistics
description: Platform-wide metrics in TI Mindmap HUB — reports, IOCs, sources, CVE severity, exploitation, top CVEs, and top vendors.
---

# Statistics

**Sidebar:** Hunt & Explore → **Statistics** · **Path:** `/statistics` · **Sign-in required**

The **Platform Analytics** page gives a quantitative view of the whole corpus. Use it to understand coverage and to spot what the threat reporting is focusing on.

---

## Reports & IOCs

| Card | Meaning |
|------|---------|
| **Total Reports** | Reports processed to date |
| **Reports (Last 7 Days)** | Recent ingestion volume |
| **Total IOCs** | Indicators extracted across all reports |
| **IOCs (Last 7 Days)** | Recently extracted indicators |
| **Intelligence Sources** | Unique source feeds |

## Vulnerability Intelligence (CVEs)

| Card | Meaning |
|------|---------|
| **Total Unique CVEs** | Distinct CVEs mentioned in reports |
| **CVEs (Last 7 Days)** | CVEs seen in the last week |
| **Exploited in Wild** | CVEs with active exploitation observed |
| **Avg. CVSS Score** | Average CVSS across all CVEs |

## Charts

| Chart | What it shows |
|-------|---------------|
| **Top Report Sources** | Most active intelligence sources |
| **Top Report Tags** | Most common threat categories |
| **IOC Type Distribution** | Breakdown by indicator type |
| **CVE Severity Distribution** | CVEs grouped by CVSS severity |
| **Top Mentioned CVEs** | Most frequently referenced vulnerabilities |
| **Top Affected Vendors** | Vendors with the most CVEs in the corpus |

Hover a chart element to see exact values.

---

## How It's Generated

Statistics are computed directly from the platform's databases — they are counts and averages, not AI-generated text. They reflect what the processed reports contain, which depends on which sources are monitored. A high count means *a lot of reporting*, not necessarily *a lot of activity*.

Via MCP: `get_statistics`, `get_cve_statistics`, `get_stix_statistics`, `kg_get_graph_stats`.
