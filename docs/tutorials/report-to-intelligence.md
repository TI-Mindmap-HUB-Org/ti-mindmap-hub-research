---
title: "Tutorial: From Report to Structured Intelligence"
description: Step-by-step guide to submitting a threat report to TI Mindmap HUB and consuming the structured outputs.
---

# From Report to Structured Intelligence

This tutorial walks through the process of going from a raw threat report to structured, actionable intelligence using TI Mindmap HUB.

---

## Prerequisites

- A TI Mindmap HUB account at [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
- A publicly accessible threat intelligence report URL

---

## Step 1: Submit a Report

You can submit a report URL in two ways:

=== "Web Interface"

    1. Log in to [ti-mindmap-hub.com](https://ti-mindmap-hub.com)
    2. Navigate to the submission form
    3. Paste the report URL
    4. Click **Submit**

=== "MCP Tool"

    If you have an MCP client connected:

    ```
    Submit this article for analysis: https://example.com/threat-report
    ```

    This invokes the `submit_article` tool.

---

## Step 2: Wait for Processing

The platform processes the report through its [six-stage pipeline](../concepts/methodology.md):

1. Content acquisition and cleaning
2. AI-powered analysis
3. IOC extraction
4. TTP mapping
5. STIX 2.1 generation
6. Storage and indexing

Processing typically completes within a few minutes.

---

## Step 3: Review the Summary

Once processing completes, the report page shows:

- **Technical summary** — A concise AI-generated overview
- **Visual mindmap** — Key relationships in diagram form
- **Five Whats** — Structured root-cause analysis

These provide a quick understanding of the report's content without reading the full original article.

---

## Step 4: Examine Extracted IOCs

Navigate to the IOCs tab to see extracted indicators:

- IP addresses, domains, and URLs
- File hashes (MD5, SHA-1, SHA-256)
- CVE identifiers
- Email addresses

!!! warning "Verify Before Blocking"
    Always validate extracted IOCs against the original source before adding them to blocklists or detection rules.

---

## Step 5: Review MITRE ATT&CK Mappings

The TTPs tab shows which MITRE ATT&CK techniques were identified:

- Technique ID and name
- Associated tactic (kill-chain phase)
- Execution sequence (probable attack flow)

Use these mappings to check your coverage against the described attack.

---

## Step 6: Download the STIX Bundle

The STIX tab provides the complete STIX 2.1 bundle for import into your security tools:

1. Click **Download STIX Bundle**
2. Import into your SIEM, SOAR, or TIP (see [STIX Platform Integration](../integrations/stix-platforms.md))
3. Review the imported objects and relationships

---

## Step 7: Cross-Reference with Existing Intelligence

For best results:

- Compare extracted IOCs with your existing threat feeds
- Check whether mapped TTPs align with known adversary profiles
- Use the weekly briefing to understand broader trends

---

## Next Steps

- [Outputs](../outputs/index.md) — Detailed documentation of each output type
- [MCP Integration](../integrations/mcp/index.md) — Automate queries with AI assistants
- [Known Limitations](../concepts/limitations.md) — Understand what to verify
