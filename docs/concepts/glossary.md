---
title: Glossary
description: Definitions of the terms used across TI Mindmap HUB — CTI, STIX, ATT&CK, IOC, CVE, EPSS, KEV, MCP, and platform-specific features.
---

# Glossary

## Platform Terms

| Term | Definition |
|------|------------|
| **Report** | A single processed article (blog post, advisory, research paper) with all its generated outputs |
| **Threat Reports** | The dashboard listing all processed reports |
| **Report View** | The 12-tab page for a single report |
| **Intel Graph** | Interactive view of a report's STIX 2.1 bundle |
| **TI Mindmap** | Hierarchical, navigable mindmap of a report's threat topology |
| **5W Context** | Who / What / When / Where / Why analysis of a report |
| **Attack Flow** | A report's ATT&CK techniques grouped by tactic in kill-chain order |
| **Advanced IOCs** | The consolidated indicator set for a report, with confidence and context |
| **STIX Constellation** | The cross-report knowledge graph of canonical entities and relationships |
| **Canonical entity** | A single node representing an actor, malware, tool, campaign, or technique after merging aliases |
| **Observed relation** | A relationship stated in at least one report |
| **Inferred relation** | A relationship proposed by the platform from cross-report patterns, with a confidence score |
| **Threat Entities** | Index and profiles of canonical entities |
| **AI Briefing Agent** | The multi-agent system that writes the weekly threat briefing |
| **Agentic Reports** | Public, cross-source deep-dive analyses (path `/analytics`) |
| **Patch Priority** | KEV-listed CVEs from the corpus ranked by EPSS |
| **Risk score** | A 0–100 composite of CVSS, EPSS, KEV, and reported exploitation |
| **Bulk IOC Triage** | Checking up to 500 indicators at once against the corpus |
| **MCP Server API Key** | A personal `tim_…` key used by key-based MCP clients |

## Threat Intelligence Terms

| Term | Definition |
|------|------------|
| **CTI** | Cyber Threat Intelligence — evidence-based knowledge about threats, used to inform decisions |
| **OSINT** | Open-Source Intelligence — publicly available information |
| **IOC** | Indicator of Compromise — an observable (IP, domain, URL, hash, email) associated with malicious activity |
| **Defang / Refang** | Making an indicator non-clickable (`evil[.]com`, `hxxp://`) / restoring it |
| **TTP** | Tactics, Techniques, and Procedures — how an adversary operates |
| **MITRE ATT&CK** | A knowledge base of adversary tactics and techniques (for example, `T1566.001` Spearphishing Attachment) |
| **ATT&CK Navigator layer** | A JSON format for highlighting techniques on the ATT&CK matrix |
| **Kill chain** | The ordered phases of an attack, from reconnaissance to impact |
| **Diamond Model** | An intrusion-analysis model linking Adversary, Capability, Infrastructure, and Victim |
| **CVE** | Common Vulnerabilities and Exposures identifier (for example, `CVE-2024-3400`) |
| **CVSS** | Common Vulnerability Scoring System — technical severity from 0 to 10 |
| **EPSS** | Exploit Prediction Scoring System — probability a CVE will be exploited in the next 30 days |
| **CISA KEV** | Known Exploited Vulnerabilities catalog maintained by the US CISA |
| **PoC** | Proof of Concept exploit code |
| **Threat actor** | An individual or group conducting malicious activity (for example, APT28) |
| **Campaign** | A set of related malicious activities over a period of time |

## Standards and Integration Terms

| Term | Definition |
|------|------------|
| **STIX 2.1** | Structured Threat Information Expression — an OASIS standard JSON format for CTI |
| **STIX bundle** | A collection of STIX objects exchanged together |
| **SDO / SCO / SRO** | STIX Domain Objects (actor, malware…), Cyber-observable Objects (IP, file…), Relationship Objects |
| **MISP** | An open-source threat intelligence sharing platform; TI Mindmap HUB exports MISP events |
| **TIP / SIEM / SOAR** | Threat Intelligence Platform / Security Information and Event Management / Security Orchestration, Automation and Response |
| **MCP** | Model Context Protocol — an open standard for connecting AI assistants to tools and data |
| **OAuth 2.1** | Authorisation protocol used by connector-based MCP clients to sign you in |

## AI Terms

| Term | Definition |
|------|------------|
| **LLM** | Large Language Model |
| **Prompt** | The instructions given to an LLM for a task |
| **Temperature** | A setting controlling how deterministic (low) or varied (high) an LLM's output is |
| **Hallucination** | Plausible but incorrect output produced by an LLM |
| **Multi-agent system** | Several LLM-driven agents with distinct roles collaborating on a task |
| **Entity resolution** | Deciding that different names refer to the same real-world entity |
