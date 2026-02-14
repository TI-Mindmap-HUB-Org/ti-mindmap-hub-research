---
title: STIX 2.1 Data Model
description: How TI Mindmap HUB generates STIX 2.1 bundles — object types, patterns, relationships, and integration guides.
---

# STIX 2.1 Data Model

This document describes how TI Mindmap HUB generates STIX 2.1 bundles from processed threat intelligence reports.

## Overview

[STIX (Structured Threat Information Expression)](https://oasis-open.github.io/cti-documentation/stix/intro.html) is a standardized language for describing cyber threat information. TI Mindmap HUB generates STIX 2.1 bundles to enable interoperability with security tools and platforms.

## Bundle Structure

Each processed report generates a STIX 2.1 bundle containing:

```
Bundle
├── Report (SDO)
├── Threat Actor(s) (SDO) — if identified
├── Malware (SDO) — if identified
├── Indicator(s) (SDO) — from extracted IOCs
├── Attack Pattern(s) (SDO) — from TTP mapping
├── Vulnerability (SDO) — from CVEs
└── Relationship(s) (SRO) — connecting objects
```

## STIX Domain Objects (SDOs)

### Report

The container object linking all intelligence from a single source.

```json
{
  "type": "report",
  "spec_version": "2.1",
  "id": "report--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "APT Group Targets Financial Sector",
  "description": "AI-generated summary of the threat report...",
  "report_types": ["threat-actor", "malware"],
  "published": "2025-01-15T10:00:00.000Z",
  "object_refs": [
    "threat-actor--<uuid>",
    "malware--<uuid>",
    "indicator--<uuid>",
    "attack-pattern--<uuid>"
  ],
  "external_references": [
    {
      "source_name": "Original Source",
      "url": "https://example.com/original-report"
    }
  ]
}
```

### Threat Actor

Generated when threat actors are identified in the source material.

```json
{
  "type": "threat-actor",
  "spec_version": "2.1",
  "id": "threat-actor--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "APT28",
  "aliases": ["Fancy Bear", "Sofacy"],
  "threat_actor_types": ["nation-state"],
  "roles": ["agent"],
  "sophistication": "advanced",
  "primary_motivation": "organizational-gain"
}
```

### Malware

Generated for identified malware families.

```json
{
  "type": "malware",
  "spec_version": "2.1",
  "id": "malware--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "Cobalt Strike",
  "malware_types": ["remote-access-trojan"],
  "is_family": true,
  "capabilities": ["communicates-with-c2", "exfiltrates-data"]
}
```

### Indicator

Generated from extracted IOCs with STIX patterns.

```json
{
  "type": "indicator",
  "spec_version": "2.1",
  "id": "indicator--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "Malicious IP Address",
  "indicator_types": ["malicious-activity"],
  "pattern": "[ipv4-addr:value = '192.168.1.1']",
  "pattern_type": "stix",
  "valid_from": "2025-01-15T00:00:00.000Z"
}
```

#### Pattern Types by IOC

| IOC Type | STIX Pattern |
|----------|--------------|
| IPv4 | `[ipv4-addr:value = '<ip>']` |
| IPv6 | `[ipv6-addr:value = '<ip>']` |
| Domain | `[domain-name:value = '<domain>']` |
| URL | `[url:value = '<url>']` |
| MD5 | `[file:hashes.MD5 = '<hash>']` |
| SHA1 | `[file:hashes.'SHA-1' = '<hash>']` |
| SHA256 | `[file:hashes.'SHA-256' = '<hash>']` |
| Email | `[email-addr:value = '<email>']` |

### Attack Pattern

Generated from MITRE ATT&CK technique mapping.

```json
{
  "type": "attack-pattern",
  "spec_version": "2.1",
  "id": "attack-pattern--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "Spearphishing Attachment",
  "external_references": [
    {
      "source_name": "mitre-attack",
      "external_id": "T1566.001",
      "url": "https://attack.mitre.org/techniques/T1566/001"
    }
  ],
  "kill_chain_phases": [
    {
      "kill_chain_name": "mitre-attack",
      "phase_name": "initial-access"
    }
  ]
}
```

### Vulnerability

Generated from extracted CVE identifiers.

```json
{
  "type": "vulnerability",
  "spec_version": "2.1",
  "id": "vulnerability--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "name": "CVE-2024-12345",
  "external_references": [
    {
      "source_name": "cve",
      "external_id": "CVE-2024-12345",
      "url": "https://nvd.nist.gov/vuln/detail/CVE-2024-12345"
    }
  ]
}
```

## STIX Relationship Objects (SROs)

### Relationship Types Used

| Source | Relationship | Target |
|--------|--------------|--------|
| Indicator | `indicates` | Malware |
| Indicator | `indicates` | Threat Actor |
| Threat Actor | `uses` | Malware |
| Threat Actor | `uses` | Attack Pattern |
| Malware | `uses` | Attack Pattern |
| Malware | `exploits` | Vulnerability |
| Campaign | `attributed-to` | Threat Actor |

### Example Relationship

```json
{
  "type": "relationship",
  "spec_version": "2.1",
  "id": "relationship--<uuid>",
  "created": "2025-01-15T10:00:00.000Z",
  "modified": "2025-01-15T10:00:00.000Z",
  "relationship_type": "indicates",
  "source_ref": "indicator--<uuid>",
  "target_ref": "malware--<uuid>"
}
```

## Complete Bundle Example

See the [example STIX bundle](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/blob/main/schemas/stix-examples/example-apt-campaign.json) for a complete bundle example.

## Integration Guide

### Importing into MISP

1. Download the STIX bundle from TI Mindmap HUB
2. In MISP, go to **Event Actions** → **Add STIX**
3. Upload the JSON file
4. Review and confirm the import

### Importing into OpenCTI

1. Use the OpenCTI STIX 2.1 connector
2. Configure the connector to read from a file or API
3. The bundle will be parsed and objects created

### Importing into Microsoft Sentinel

1. Use the Threat Intelligence blade
2. Select **Import** → **STIX 2.1**
3. Upload the bundle or configure API ingestion

### API Access

STIX bundles can be retrieved programmatically:

```
GET https://ti-mindmap-hub.com/api/reports/{reportId}/stix
Authorization: Bearer <token>
Accept: application/json
```

## Validation

All generated bundles are validated against:

- STIX 2.1 JSON Schema
- Object reference integrity
- Required field presence
- Pattern syntax (for indicators)

## Known Limitations

See [Known Limitations](limitations.md#stix-21-generation-limitations) for STIX-specific limitations.

## References

- [STIX 2.1 Specification](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html)
- [STIX 2.1 Examples](https://oasis-open.github.io/cti-documentation/stix/examples)
- [MITRE ATT&CK STIX Data](https://github.com/mitre-attack/attack-stix-data)

---

*Last updated: January 2025*
