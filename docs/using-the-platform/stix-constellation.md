---
title: STIX Constellation
description: How to explore the TI Mindmap HUB cross-report knowledge graph — search entities, expand clusters, toggle inferred relations, and read entity timelines.
---

# STIX Constellation

**Sidebar:** Hunt & Explore → **STIX Constellation** · **Path:** `/knowledge-graph` · **Sign-in required** · **Beta**

The STIX Constellation is an interactive knowledge graph built from the STIX bundles of every processed report. It shows how threat actors, malware, tools, techniques, vulnerabilities, and campaigns connect **across** reports.

For a short explainer inside the app, click **What is STIX Constellation?** under the title (`/knowledge-graph/about`).

---

## Statistics Bar

| Card | Meaning |
|------|---------|
| **Reports Ingested** | Reports synchronised into the graph |
| **Canonical Entities** | Unique entities after alias merging |
| **Cross-Report Relations** | Relationships observed in reports |
| **Inferred Relations** | Relationships proposed by the platform (not stated directly in a single report) |
| **High Confidence** | Inferred relations above the high-confidence threshold |

---

## Exploring the Graph

### 1. Find a starting entity

- Type in **Search entities...** (for example, `APT28`, `Cobalt Strike`, `T1566`) and press Enter
- Optionally restrict with **Entity Type**
- Or click one of the **Explore Examples** cards (such as `APT28`, `PowerShell`, `Lazarus Group`, `Ransomware`, `Supply Chain`, `T1059`)

Click a result card to load its neighbourhood.

### 2. Read and expand the cluster

| Control | Effect |
|---------|--------|
| **Depth** `1` `2` `3` | How many hops from the selected entity to show |
| **Layout** `Force` / `Radial` | Arrangement of nodes (2D mode) |
| **Inferred relations** | Include relationships proposed by the platform. Inferred edges use a distinct colour and carry a confidence value |
| **Zoom in / Zoom out / Fit to view** | Navigate the canvas |
| **Export as PNG** | Save the current view |
| **Legend · click to filter** | Show or hide entity types; counts are shown per type |
| **2D Graph / 3D Graph** | Switch between the 2D map and a 3D force graph |
| **Fullscreen graph** | Expand the canvas |

Click a node to open its details; select another node to move the exploration there. A **breadcrumb** trail above the graph lets you jump back to earlier entities.

For readability, a cluster is capped at **150 nodes**. Reduce depth or filter types if the graph is truncated.

### 3. Inspect an entity

The side panel shows the entity's type, aliases, report count, a **Timeline** of report appearances, and **View Reports (N)** to open the underlying reports. For a full profile, open the entity in [Threat Entities](threat-entities.md).

!!! tip "Shareable views"
    The URL keeps the current entity, depth, and inferred-relations setting (for example, `?entity=...&depth=2&inferred=1`), so you can share an exploration.

---

## Observed vs. Inferred Relations

| Type | Where it comes from | How to use it |
|------|---------------------|---------------|
| **Observed** | A relationship stated in at least one report's STIX bundle; weight = number of mentions | Evidence you can trace back to reports |
| **Inferred** | Proposed by the platform from cross-report patterns, with a confidence score | Leads to investigate — not evidence |

Inferred relations are hidden by default.

---

## How It's Generated

1. Each report's STIX bundle is synchronised to a graph database
2. **Entity resolution** merges duplicates and aliases into canonical entities
3. Relationships from all reports are aggregated into observed edges
4. An inference step proposes additional relationships with confidence scores

See [Knowledge Graph](../outputs/knowledge-graph.md) for the data model and [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Via MCP

Use `kg_get_graph_stats`, `kg_search_entities`, `kg_get_entity_cluster`, `kg_get_entity_timeline`, `kg_search_attack_path`, `kg_find_cross_report_links`, and `kg_get_related_reports` from an AI assistant. See [MCP Server](../mcp/server.md#knowledge-graph-stix-constellation-7-tools).
