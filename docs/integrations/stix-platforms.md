---
title: STIX Platform Integration
description: How to import TI Mindmap HUB STIX 2.1 bundles into MISP, OpenCTI, Microsoft Sentinel, and other security platforms.
---

# STIX Platform Integration

TI Mindmap HUB generates [STIX 2.1](https://oasis-open.github.io/cti-documentation/stix/intro.html) bundles that can be imported into any compliant security platform.

---

## Compatible Platforms

| Category | Platforms |
|----------|-----------|
| **SIEMs** | Splunk, Microsoft Sentinel, Elastic Security |
| **SOARs** | Cortex XSOAR, Splunk SOAR, Tines |
| **TIPs** | MISP, OpenCTI, ThreatConnect, Anomali |

---

## Import Guides

### MISP

1. Download the STIX bundle from TI Mindmap HUB (web interface or API)
2. In MISP, go to **Event Actions** → **Add STIX**
3. Upload the JSON file
4. Review and confirm the import

### OpenCTI

1. Use the OpenCTI STIX 2.1 connector
2. Configure the connector to read from a file or API endpoint
3. The bundle will be parsed and objects created automatically

### Microsoft Sentinel

1. Navigate to the **Threat Intelligence** blade
2. Select **Import** → **STIX 2.1**
3. Upload the bundle or configure API-based ingestion

---

## API Access

STIX bundles can be retrieved programmatically via the MCP server or the REST API:

**MCP tool:**

```
get_stix_bundle(article_id="<report-id>")
```

**REST API:**

```http
GET https://ti-mindmap-hub.com/api/reports/{reportId}/stix
Authorization: Bearer <your-token>
Accept: application/json
```

!!! note
    Replace `<your-token>` with your authentication token. API keys can be generated from your account settings at [ti-mindmap-hub.com](https://ti-mindmap-hub.com).

---

## Validation

Before importing, you can validate bundles locally:

```bash
pip install stix2-validator
stix2_validator bundle.json
```

Or with Python:

```python
from stix2 import parse

with open("bundle.json", "r") as f:
    bundle = parse(f.read())

for obj in bundle.objects:
    print(f"{obj.type}: {obj.get('name', obj.id)}")
```

---

## References

- [STIX 2.1 Specification](https://docs.oasis-open.org/cti/stix/v2.1/stix-v2.1.html)
- [STIX 2.1 Examples](https://oasis-open.github.io/cti-documentation/stix/examples)
- [MITRE ATT&CK STIX Data](https://github.com/mitre-attack/attack-stix-data)
