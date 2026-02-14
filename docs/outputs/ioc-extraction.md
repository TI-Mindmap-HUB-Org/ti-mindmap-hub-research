---
title: IOC Extraction
description: How TI Mindmap HUB extracts Indicators of Compromise from threat reports using pattern matching and LLM analysis.
---

# IOC Extraction

TI Mindmap HUB extracts Indicators of Compromise (IOCs) from each processed report using a combination of regex pattern matching and LLM-based analysis.

---

## Supported IOC Types

| Type | Method | Validation |
|------|--------|------------|
| IPv4 / IPv6 | Regex + LLM | Format validation, private range exclusion |
| Domains | Regex + LLM | TLD validation, whitelist filtering |
| URLs | Regex + LLM | Format validation |
| File Hashes (MD5, SHA-1, SHA-256) | Regex | Length and character validation |
| CVE IDs | Regex | Format validation (CVE-YYYY-NNNNN) |
| Email Addresses | Regex + LLM | Format validation |

---

## Extraction Pipeline

```
Raw Text → Pattern Matching + LLM → IOC List → Validation → Deduplication
```

1. **Pattern matching** identifies candidate indicators using regex
2. **LLM analysis** provides context-aware extraction for ambiguous cases
3. **Validation** checks format correctness and filters known false positives
4. **Deduplication** removes duplicate indicators within the same report

---

## Whitelisting

Common benign indicators are excluded automatically:

- Well-known domains (e.g., google.com, microsoft.com)
- Cloud provider infrastructure ranges
- Known false-positive patterns
- RFC 5737 documentation IP ranges (192.0.2.x, 198.51.100.x, 203.0.113.x)

---

## Example Output

```json
{
  "iocs": [
    {
      "type": "ipv4",
      "value": "198.51.100.42",
      "context": "Command and control server"
    },
    {
      "type": "domain",
      "value": "malicious-example-domain.com",
      "context": "Phishing infrastructure"
    },
    {
      "type": "sha256",
      "value": "a1b2c3d4e5f67890abcdef1234567890a1b2c3d4e5f67890abcdef1234567890",
      "context": "Malware payload hash"
    }
  ]
}
```

!!! note
    All IOCs shown in documentation use sanitized or RFC-reserved values.

---

## Known Limitations

- **False positives** — Benign indicators may be extracted (e.g., vendor domains mentioned in context)
- **False negatives** — Obfuscated, image-embedded, or non-standard IOCs may be missed
- **Defanged indicators** — `hxxp://` and `[.]` notation is not always recognized

See [Known Limitations](../concepts/limitations.md#ioc-extraction-limitations) for the full list.
