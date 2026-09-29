---
title: STIX Bundles
description: Browse, filter, preview, and download STIX 2.1 bundles generated for each TI Mindmap HUB report.
---

# STIX Bundles

**Sidebar:** Hunt & Explore → **STIX Bundles** · **Path:** `/stix-bundles` · **Sign-in required**

Every processed report produces a **STIX 2.1 bundle** — a machine-readable package of the threat actors, malware, indicators, attack patterns, vulnerabilities, and relationships found in the report. This page lets you browse all bundles in one place.

---

## Statistics

Four cards summarise the collection: **Total Bundles**, **Total Objects**, **Avg Objects/Bundle**, and **Latest Update**.

---

## Search & Filters

| Control | How it works |
|---------|--------------|
| **Search** | Match by report title, article ID, or bundle ID |
| **Filter by object types** | Toggle one or more chips: 🛡️ **Indicators**, 🦠 **Malware**, 🐛 **CVEs**, 🎯 **Attack Patterns**, 👤 **Threat Actors**, 🔗 **Relationships**. Only bundles containing the selected types are shown |
| **Clear All Filters** | Resets search and type filters |

The line above the table shows *Showing N bundles of M total*.

---

## Bundles Table

| Column | Content |
|--------|---------|
| **Report Title** | Title and source feed of the report |
| **Date** | Bundle creation date |
| **Objects** | Object counts by type (hover a chip for details) |
| **Actions** | **Preview Structure** · **Download JSON** · **View Processed Report** · **View Original Article** |

### Preview

**Preview Structure** opens a dialog summarising the bundle: object counts by type and lists of named objects (malware, threat actors, attack patterns, vulnerabilities). You can download the bundle from the dialog.

### Download

**Download JSON** saves the full STIX 2.1 bundle. You can also download the same bundle from the **Intel Graph** tab of the [Report View](report-view.md#intel-graph).

---

## Using Bundles in Your Tools

STIX 2.1 bundles can be imported into MISP, OpenCTI, Microsoft Sentinel, and other STIX-compliant platforms. See [STIX Platform Integration](../integrations/stix-platforms.md).

For MISP specifically, you can also use **Export MISP Event** on the report page, which produces a native MISP event JSON.

---

## How It's Generated

1. The LLM extracts STIX **domain objects** (threat actors, malware, tools, campaigns, attack patterns, vulnerabilities), **cyber observables and indicators**, and **relationships** in separate, specialised steps
2. Temporary identifiers are replaced with proper STIX UUIDs
3. Every object is validated with a STIX 2.1 library; objects that fail validation are discarded
4. Relationships pointing to missing objects ("dangling" references) are discarded
5. The remaining objects are assembled into a bundle and stored

The STIX generation approach originates from an academic collaboration. See [STIX 2.1 Data Model](../concepts/data-model.md), [STIX Bundles](../outputs/stix-bundles.md), and [How Content Is Generated](../concepts/how-content-is-generated.md).

---

## Via MCP

Use `get_stix_bundle`, `list_stix_bundles`, and `get_stix_statistics`. See [MCP Server](../mcp/server.md#stix-bundles-3-tools).
