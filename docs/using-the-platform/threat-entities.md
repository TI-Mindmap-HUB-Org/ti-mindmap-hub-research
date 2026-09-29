---
title: Threat Entities
description: Browse threat actors, malware families, tools, and campaigns aggregated across all reports, and read cross-report entity profiles.
---

# Threat Entities

**Sidebar:** Hunt & Explore → **Threat Entities** · **Path:** `/entities` · **Sign-in required**

Threat Entities is an index of the **actors, malware families, tools, and campaigns** that appear across the whole report corpus. Each entity has a profile page that aggregates everything the platform knows about it.

---

## Entities Index

### Filtering and searching

| Control | How it works |
|---------|--------------|
| **Search box** | Search by name or alias (for example, `Lazarus`, `Fancy Bear`, `Cobalt Strike`). Press Enter to run; click **×** to clear |
| **Class toggle** | `All`, `ThreatActor`, `Malware`, `Tool`, `Campaign` |
| **Sort** | Click the **Reports** column header to sort by report count, or **Last Seen** to sort by most recent evidence |

Without a search, the index lists entities **seen in 2 or more reports**. Click **Load more** at the bottom to extend the list.

### Table

| Column | Content |
|--------|---------|
| **Name** | Canonical entity name (opens the profile) |
| **Type** | Entity class |
| **Aliases** | Other names the entity is known by |
| **Reports** | Number of reports mentioning the entity |
| **Last Seen** | Date of the most recent report |

!!! tip "Deep links"
    `/entities?q=APT28` opens the index with a search already applied. `/entities?sort=last_seen` sorts by recent activity.

---

## Entity Profile

**Path:** `/entity/{id}`

### Header

- **Name** and **type** chip
- **External IDs** such as MITRE ATT&CK group or software IDs — click to open the ATT&CK page
- **Also known as** — aliases merged into this entity
- **Reports**, **First seen**, **Last seen**
- An **activity sparkline** showing how often the entity appeared over time
- **Explore in STIX Constellation** — opens the [knowledge graph explorer](stix-constellation.md)

### Sections

| Section | What it shows |
|---------|---------------|
| **Exploited CVEs** | CVEs attributed to the entity across the corpus, highest risk first — with **Severity**, **Exploitation**, **Risk**, and **Reports** |
| **Connected Entities** | Observed relationships from the knowledge graph, grouped by class and ordered by strength. Hover a chip to see the number and type of relationships; click to open that entity |
| **ATT&CK Techniques** | Techniques connected to the entity, rendered as an ATT&CK heatmap |
| **Associated IOCs** | Indicators linked to the entity — **Indicator**, **Type**, **Kill Chain**, **Reports**, **Last Seen** |

---

## How It's Generated

- Entities come from the STIX bundles of every processed report (threat actors, malware, tools, campaigns, attack patterns)
- **Entity resolution** merges aliases into one canonical entity (for example, *APT28*, *Fancy Bear*, and *Sofacy*) and attaches external IDs where available
- **Connected Entities** are relationships **observed** in reports; the strength is the number of times the relationship was seen
- **Exploited CVEs** are matched to the entity through the CVE corpus and the entity's aliases
- Coverage of ATT&CK techniques depends on the quality of technique ID extraction in each report

!!! warning "Attribution"
    Attribution is only as good as the source reports. Entity merges and relationships can be wrong; check the underlying reports before drawing conclusions.

See [Knowledge Graph](../outputs/knowledge-graph.md) and [How Content Is Generated](../concepts/how-content-is-generated.md).
