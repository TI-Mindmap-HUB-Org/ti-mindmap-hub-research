---
title: MITRE ATT&CK Mapping
description: How TI Mindmap HUB maps threat behaviors to MITRE ATT&CK techniques and tactics.
---

# MITRE ATT&CK Mapping

TI Mindmap HUB automatically maps attack behaviors described in threat reports to the [MITRE ATT&CK](https://attack.mitre.org/) framework.

---

## How It Works

```
Report Content + IOCs → LLM Analysis → MITRE ATT&CK Techniques → Validation
```

1. The LLM analyzes report content for described attack behaviors
2. Behaviors are mapped to specific ATT&CK techniques
3. Technique IDs are validated against the ATT&CK database
4. Associated tactics are inferred from technique definitions

---

## Output Format

Each mapping includes:

| Field | Description | Example |
|-------|-------------|---------|
| Technique ID | ATT&CK identifier | `T1566.001` |
| Technique Name | Human-readable name | Spearphishing Attachment |
| Tactic(s) | Kill-chain phase(s) | Initial Access |
| Confidence | Estimated reliability | High / Medium / Low |

---

## Example: STIX Attack Pattern

Mapped techniques are represented as STIX Attack Pattern objects:

```json
{
  "type": "attack-pattern",
  "spec_version": "2.1",
  "id": "attack-pattern--<uuid>",
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

---

## Known Limitations

- **Overly broad mapping** — Generic behaviors may map to overly specific techniques
- **Sub-technique granularity** — Sub-technique mapping is less reliable than technique-level
- **Framework updates** — New ATT&CK releases may not be reflected immediately
- **Confidence estimates** — Stated confidence levels are approximate

See [Known Limitations](../concepts/limitations.md#ttp-mapping-limitations) for the full list.
