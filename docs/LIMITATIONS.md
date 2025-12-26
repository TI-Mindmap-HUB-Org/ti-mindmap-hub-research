# Known Limitations

This document provides transparency about the limitations of TI Mindmap HUB's AI-generated content. Understanding these limitations is essential for appropriate use of the platform.

## General AI Limitations

### Hallucinations

Large Language Models can generate plausible-sounding but incorrect information. This manifests in TI Mindmap HUB as:

- **Fabricated IOCs**: The model may generate indicators that don't exist in the source material
- **Incorrect attributions**: Threat actors or malware families may be misattributed
- **Invented details**: Technical details not present in the original report may appear

**Mitigation**: Always verify critical information against the original source (linked in each report).

### Context Window Limitations

LLMs have finite context windows, which can cause:

- **Information loss**: Long reports may be truncated, missing important details
- **Disconnected analysis**: Later sections may not properly reference earlier content
- **Incomplete IOC extraction**: Some indicators may be missed in lengthy documents

### Training Data Cutoff

The underlying models have knowledge cutoffs, meaning:

- **Unknown new threats**: Very recent threat actors or malware may not be recognized
- **Outdated TTPs**: New MITRE ATT&CK techniques may not be properly mapped
- **Missing context**: Recent geopolitical or industry context may be absent

---

## IOC Extraction Limitations

### False Positives

The system may extract benign indicators:

| Issue | Example | Impact |
|-------|---------|--------|
| Documentation IPs | 192.0.2.1 (RFC 5737) | Blocked legitimate documentation ranges |
| Example domains | example.com | False alerts |
| Vendor infrastructure | legitvendor.com mentioned in context | Incorrect blocking |
| Defanged indicators | hxxp:// not always recognized | Missed or malformed IOCs |

### False Negatives

Some indicators may be missed:

- **Obfuscated IOCs**: Heavily obfuscated or encoded indicators
- **Contextual indicators**: IOCs only identifiable with domain knowledge
- **Non-standard formats**: Unusual IP notations or hash representations
- **Embedded in images**: IOCs present only in screenshots/images

### Validation Gaps

Current validation may not catch:

- **Syntactically valid but meaningless**: Random strings matching hash patterns
- **Private/reserved ranges**: Some internal IPs may slip through
- **Sinkholed domains**: Domains now controlled by security researchers

---

## TTP Mapping Limitations

### Accuracy Concerns

- **Overly broad mapping**: Generic behaviors may be mapped to specific techniques
- **Missing techniques**: Subtle or implicit TTPs may not be identified
- **Outdated mappings**: ATT&CK framework updates may not be immediately reflected
- **Confidence not always reliable**: Stated confidence levels are estimates

### Coverage Gaps

- **Sub-techniques**: Granular sub-technique mapping is less reliable
- **Procedure examples**: Specific procedure details may be lost
- **Platform specificity**: Windows/Linux/macOS distinctions may be missed

---

## STIX 2.1 Generation Limitations

### Structural Issues

- **Relationship accuracy**: Relationships between objects may be incorrect or missing
- **Incomplete objects**: Some STIX objects may lack optional but useful fields
- **ID consistency**: Cross-reference IDs may not always be correctly linked

### Semantic Issues

- **Indicator patterns**: STIX patterns may not accurately represent the IOC
- **Confidence levels**: Assigned confidence may not reflect actual certainty
- **Temporal data**: First/last seen dates may be inferred rather than explicit

### Compatibility

- **Strict parsers**: Some TIPs with strict STIX validation may reject bundles
- **Custom properties**: Platform-specific properties are not included
- **Version differences**: Minor STIX 2.1 spec interpretations may vary

---

## Weekly Briefing Limitations

### Trend Analysis

- **Sample bias**: Trends reflect processed sources, not the entire threat landscape
- **Recency bias**: More recent reports may be weighted more heavily
- **Source concentration**: Heavy reliance on frequently publishing sources

### Synthesis Quality

- **Oversimplification**: Complex threat campaigns may be oversimplified
- **Missing connections**: Related campaigns may not be linked
- **Subjective prioritization**: "Most significant" is inherently subjective

---

## Operational Recommendations

### DO

✅ **Verify before acting**: Always check IOCs against original sources before blocking  
✅ **Use as a starting point**: Treat outputs as draft analysis requiring review  
✅ **Cross-reference**: Validate with other intelligence sources  
✅ **Report errors**: Help improve the system by reporting inaccuracies  
✅ **Understand context**: Read the original article for full context  

### DON'T

❌ **Blindly block IOCs**: Extracted indicators need verification  
❌ **Quote without verification**: Don't cite AI-generated content as authoritative  
❌ **Assume completeness**: The analysis may miss important details  
❌ **Use for critical decisions alone**: Combine with human analysis  
❌ **Ignore the source**: The original report is the ground truth  

---

## Improvement Efforts

We are actively working to address these limitations through:

1. **Prompt engineering**: Continuous refinement of extraction prompts
2. **Validation layers**: Adding more automated validation checks
3. **Feedback integration**: Incorporating user-reported errors
4. **Model updates**: Adopting newer, more capable models
5. **Academic collaboration**: Partnering with researchers on evaluation

---

## Reporting Issues

If you encounter incorrect outputs:

1. Use the **Feedback** feature in the platform
2. Email [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
3. Open an issue in this repository (for documentation/schema issues)

Your feedback directly improves the system.

---

## Disclaimer

This platform is provided as a **research experiment**. All outputs are for informational purposes only. The maintainers assume no liability for actions taken based on AI-generated content. 

**Always verify. Always validate. Always think critically.**

---

*Last updated: January 2025*
