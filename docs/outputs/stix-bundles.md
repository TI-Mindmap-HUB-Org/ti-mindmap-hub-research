---
title: STIX 2.1 Bundles
description: How TI Mindmap HUB generates STIX 2.1 bundles from processed threat intelligence reports, including object types and example structure.
---

# STIX 2.1 Bundles

Each processed report generates a [STIX 2.1](https://oasis-open.github.io/cti-documentation/stix/intro.html) bundle — a standardized package of threat intelligence objects that can be imported into security platforms.

---

## Bundle Structure

```
Bundle
├── Report (SDO) — Main container
├── Threat Actor(s) (SDO) — if identified
├── Malware (SDO) — if identified
├── Indicator(s) (SDO) — from extracted IOCs
├── Attack Pattern(s) (SDO) — from TTP mapping
├── Vulnerability (SDO) — from CVEs
└── Relationship(s) (SRO) — connecting objects
```

## Example

A minimal bundle looks like this:

```json
{
  "type": "bundle",
  "id": "bundle--a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "objects": [
    {
      "type": "report",
      "spec_version": "2.1",
      "id": "report--<uuid>",
      "name": "APT Campaign Targeting Financial Sector",
      "published": "2025-01-15T10:00:00.000Z",
      "object_refs": ["threat-actor--<uuid>", "malware--<uuid>"]
    },
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--<uuid>",
      "name": "C2 Server IP",
      "pattern": "[ipv4-addr:value = '198.51.100.42']",
      "pattern_type": "stix",
      "valid_from": "2025-01-15T00:00:00.000Z"
    }
  ]
}
```

For a complete example bundle, see [`example-apt-campaign.json`](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/blob/main/schemas/stix-examples/example-apt-campaign.json).

---

## STIX Pattern Types

| IOC Type | STIX Pattern |
|----------|--------------|
| IPv4 | `[ipv4-addr:value = '<ip>']` |
| IPv6 | `[ipv6-addr:value = '<ip>']` |
| Domain | `[domain-name:value = '<domain>']` |
| URL | `[url:value = '<url>']` |
| MD5 | `[file:hashes.MD5 = '<hash>']` |
| SHA-1 | `[file:hashes.'SHA-1' = '<hash>']` |
| SHA-256 | `[file:hashes.'SHA-256' = '<hash>']` |
| Email | `[email-addr:value = '<email>']` |

---

## Validation

All generated bundles are validated against:

- STIX 2.1 JSON Schema
- Object reference integrity
- Required field presence
- Pattern syntax (for indicators)

---

## Limitations

- Relationship accuracy depends on LLM interpretation of the source
- Some optional STIX fields may be absent
- Strict TIP parsers may require minor adjustments

See [Known Limitations](../concepts/limitations.md#stix-21-generation-limitations) for details.
