---
title: "Threat Intelligence Report: LiteLLM 1.107.0 Supply Chain Compromise"
date: "2026-10-25"
severity: "CRITICAL"
classification: "TLP:CLEAR"
description: "Cross-source analysis of the October LiteLLM release compromise, Python startup implants, credential theft and remote-loader capability, with a three-month historical review."
tags:
  - supply-chain
  - litellm
  - pypi
  - docker
  - github-actions
  - credential-theft
  - python-startup-hooks
  - ai-infrastructure
sources_count: 11
core_reports_count: 8
context_reports_count: 3
research_window_start: "2026-07-25"
research_window_end: "2026-10-25"
author: "TI Mindmap HUB - Cross-source synthesis"
---

# Threat Intelligence Report: LiteLLM 1.107.0 Supply Chain Compromise

**Scope:** October's compromised LiteLLM 1.107.0 release, with an archive review covering 2026-07-25 through 2026-10-25. Intelligence was obtained exclusively through TI Mindmap HUB MCP. No external webpages, package downloads or live infrastructure were accessed. Report counts describe documents, not independent investigations or victims.

**Evidence convention:** statements attributed to publishers are supported by HUB's retrieved summaries, IOC records and available article content; artifacts were not independently executed or hashed. Recommendations and analytical ATT&CK mappings are distinguished from observed activity. Classification is assigned to this synthesis, not asserted for every underlying source.

## 1. Reports Summary Table

Eight incident reports from seven publishers form the core corpus. Three unique historical articles provide background, yielding **11 included articles from seven publishers**. Dates are **HUB record dates**: the returned publication and ingestion fields commonly coincide, so they are not independently verified original publication dates.

| # | Title | HUB Date | Source | Platform Link |
|---|-------|----------|--------|---------------|
| 1 | New Evidence Shows LiteLLM Secret-Stealing Workflows Ran 11 Days Before Supply Chain Attack | 2026-10-24 | Socket | [View Report](https://ti-mindmap-hub.com/report/f0b89b99-9224-4c22-b880-711999445bde) |
| 2 | LiteLLM 1.107.0 PyPI Wheel Contains a Credential Stealer and Persistent Python Backdoor | 2026-10-23 | Open Source Malware | [View Report](https://ti-mindmap-hub.com/report/e2fb9659-8658-4f2b-ac60-1a76fd42e7f4) |
| 3 | LiteLLM Compromised, Steals Credentials | 2026-10-23 | Wiz | [View Report](https://ti-mindmap-hub.com/report/2d870f8d-b7c0-4fec-83ea-33795a860065) |
| 4 | Inside the LiteLLM 1.107.0 supply chain compromise: Credential theft through Python startup hooks | 2026-10-23 | Microsoft | [View Report](https://ti-mindmap-hub.com/report/6e5966c9-098a-48f3-842e-b6aa57788fa8) |
| 5 | LiteLLM compromised again: infostealer and RAT found in version 1.107.0 | 2026-10-22 | Aikido | [View Report](https://ti-mindmap-hub.com/report/a126b4cb-e84f-4a1f-a721-c21b0e62e3d3) |
| 6 | LiteLLM supply chain compromise: What you need to know | 2026-10-22 | Datadog | [View Report](https://ti-mindmap-hub.com/report/7fbd660b-afb5-4bef-8be8-c2d2b19c7ea3) |
| 7 | Compromised LiteLLM 1.107.0 on PyPI Installs a Credential Stealer and Backdoor | 2026-10-21 | SafeDep | [View Report](https://ti-mindmap-hub.com/report/d54307f9-b50b-4c94-a546-fa85f2fb963d) |
| 8 | LiteLLM PyPI Package and Docker Images Compromised to Steal Cloud and AI Credentials | 2026-10-21 | Socket | [View Report](https://ti-mindmap-hub.com/report/6666ce91-79ca-435f-882a-2b0c915cd4fd) |
| 9 | **Context:** Off Guard: Breaking LiteLLM from authentication bypass to cloud compromise | 2026-09-11 | Wiz | [View Report](https://ti-mindmap-hub.com/report/7e847626-e193-4e87-b845-fdc7d26cb683) |
| 10 | **Context:** Inside 90 days of attacks on AI infrastructure | 2026-08-27 | Wiz | [View Report](https://ti-mindmap-hub.com/report/fc76d093-c2e4-4085-8334-e2d16f51f2ba) |
| 11 | **Context:** When AI infrastructure becomes the target: Securing gateways and control points | 2026-08-26 | Microsoft | [View Report](https://ti-mindmap-hub.com/report/35073ed8-a3bb-40f1-b8a0-209580cbf955) |

**Deduplication and exclusions.** HUB's [September 10 Off Guard record](https://ti-mindmap-hub.com/report/5b6061e3-6498-42fb-9b71-240366ca6b40) points to the same original article as row 9 and is not a second source. General weekly roundups were not added merely because they mention LiteLLM. An August-ingested Resecurity/SANDCLOCK retrospective describes the separate March campaign; restricted source content is not reproduced or included in this report's source count. March incident reports returned by the archive search are outside the requested document window.

---

## 2. Executive Summary

### Overview

On October 21, 2026, attackers distributed malicious **LiteLLM 1.107.0** wheels through PyPI and compromised container artifacts through official distribution channels. The release installed Python startup implants that could execute when an affected interpreter started, **without importing LiteLLM**. Developer workstations, CI/CD runners, containers and AI gateway environments were consequently in scope.

The implant combined credential collection, encrypted exfiltration and a remote-loader capability. Startup components were installed into the Python environment's library path, outside the ordinary LiteLLM package directory. Removing only that package directory could leave execution hooks behind. Wiz reports approximately **49,000 downloads**; that is not a count of infected endpoints, victims or successful exfiltrations.

Socket subsequently identified successful secret-stealing GitHub Actions workflows on **October 10 and October 12**, establishing upstream repository access at least 11 days before malicious distribution. Those findings extend the repository investigation window, but the retrieved evidence does not establish the precise causal bridge between those stolen secrets and the October 21 release.

### Diagram: Attack Flow Overview

```text
Oct 10/12: temporary upstream branches execute secret-stealing workflows
                |
                | earlier access established; causal bridge unresolved
                v
Reported developer credential compromise / release workflow modification
                |
Lookalike Berri-AI/litellm source -> malicious 1.107.0 artifacts
                |
                +--> PyPI platform wheels
                +--> Container images and affected floating tags
                            |
Python initialization -> cook.pth / cook.py / sitecustomize.py
                            |
                +-----------+----------------------+
                v                                  v
Credential collection -> encrypted upload    Remote loader / GitHub pointer
Cloud, AI, developer and browser secrets     Second-stage retrieval capability
```

### Attribution & Threat Actor

**October operator: unattributed in the available evidence.** Microsoft did not independently determine how the developer accounts were initially compromised. Wiz and Datadog relay investigative explanations involving developer GitHub OAuth credentials; Wiz discusses possible token exposure through retained AI-assistant responses and an exposed internal deployment. These explanations should not be promoted into a proven initial-access chain.

**Do not attribute October to TeamPCP by association.** The earlier LiteLLM/Trivy incident and this release share victim software and credential-theft objectives, but the retrieved material does not establish common operators. Datadog explicitly does not establish a connection to the earlier campaign.

### Three-Month Historical Assessment

| Earlier evidence | Relevance | Boundary |
|------------------|-----------|----------|
| Microsoft, August 26: AI gateways and control points | Establishes broader targeting of AI infrastructure and high-value credentials | Separate exploitation and persistence cases, not October's demonstrated entry vector |
| Wiz, August 27: AI infrastructure honeypots | Shows tailored attacks, credential theft, prompt injection and mining against AI services | Does not identify October's publisher-compromise operator |
| Wiz, September 10/11: Off Guard | Reports exposure and authentication/guardrail weaknesses affecting LiteLLM deployments | One article ingested twice; vulnerabilities are not proven causes of October's release compromise |
| Socket, October 24: retrospective repository evidence | Documents October 10/12 workflow execution | Earlier operational evidence published later, not an August or September report of this incident |

**Finding:** relevant documentation does go back to August, but the selected corpus does not demonstrate that October's 1.107.0 supply-chain incident was already active in August or September. Hunt the publisher repository from October 10 at minimum, and consumer systems from their first contact with affected artifacts.

---

## 3. Technical Details

### 3.1 Malware Analysis

#### Stage 0: Upstream Access and Secret Harvesting

Socket identified two unsigned commits creating `.github/workflows/cache.yml` under the misleading subject `ci: bump cache config`. Temporary branches `ci-tmp-a351cc` and `ci-tmp-4d8517` were pushed, their workflows executed in the upstream repository, and the branches were deleted. The first run lasted approximately four seconds; the second expanded to six jobs and multiple environment scopes. Successful workflow execution is documented; the complete downstream use of harvested secrets is not.

#### Stage 1: Release-Pipeline and Artifact Compromise

Socket's provenance analysis identifies **`Berri-AI/litellm`**, rather than legitimate **`BerriAI/litellm`**, revision `20535d8fa11f786a6c24df7488a0e449ed5f09ad`, and workflow run `39587059944`. SafeDep reports Maturin packaging configuration that included the malicious `cook` data directory; Socket describes its inclusion in Docker build stages.

Wheel integrity manifests contained the implants, supporting build-time inclusion. Such manifests and apparently valid provenance do not prove that source selection, approvers or the release workflow were trustworthy. The public source tag did not contain the malicious packaging change according to the retrieved reporting.

#### Stage 2: Startup Execution and Credential Collection

`cook.pth` contains an executable import of `cook`. Normal Python site initialization can therefore load `cook.py`, which Base64-decodes and zlib-decompresses the collector described as **PRIVCOLLECT**. `sitecustomize.py` provides another startup path and a Unix-oriented loader. Execution depends on the interpreter's startup behavior and environment; not every short-lived process necessarily completes collection or exfiltration.

Reported collection targets include cloud and developer configuration, AI-provider secrets, private keys, browser credential stores, environment data, shell history and selected LiteLLM database records. Datadog describes AES-256/RSA-4096 protection of collected data before upload. This is credential theft by package malware, not exploitation of a newly demonstrated Python vulnerability.

#### Stage 3: Exfiltration and Remote Loader

Reports identify `/healthcheck` uploads on attacker-associated `litellm.dev` infrastructure. A loader checks a GitHub-hosted pointer hourly and can retrieve additional Python code, including a `/codepy` endpoint. **Successful second-stage retrieval is not established by the retrieved evidence**; capability must not be equated with observed operator tasking.

The marker `/tmp/.pc_once_72129118c59f5636c0bb` is described by Microsoft, SafeDep and Socket as written after an HTTP 200 upload response. Its presence supports a completed upload transaction, not certainty about every secret collected or retained. Absence of the marker or `/tmp/remote_code_loader.lock` does not clear a host. Windows-specific execution limitations do not make the confirmed malicious Windows wheel safe.

### 3.2 Exposure Window and Source Discrepancies

| Event, 2026 | Source-backed time / observation | Assessment |
|-------------|---------------------------------|------------|
| First secret-theft commit | October 10, 22:11:45 UTC, Socket | Earliest precisely timed repository evidence in the selected corpus |
| Second secret-theft workflow | October 12, Socket | Exact time not established here |
| Malicious PyPI publication | October 21, 11:39 UTC, Wiz/Datadog | Start point for release-distribution review |
| Container exposure begins | October 21, 11:46 UTC, Aikido | Image pulls and cached digests require separate review |
| PyPI exposure endpoint | 12:47 UTC in Aikido; quarantine at 13:20 UTC in Wiz/Datadog | Different reported endpoints; do not silently reconcile |
| Container removal/exposure endpoint | 13:53 UTC in Wiz/Datadog; 14:20 UTC in Aikido | Search conservatively across the combined interval and later cache use |
| Package downloads | Approximately 49,000, Wiz | Not unique victims or confirmed executions |
| Startup-file hashes | Two SafeDep extracted strings differ from corroborated values | Disputed values excluded from operational hash table below |
| Exfiltration scheme | HTTP in several sources; HTTPS in Wiz/Datadog IOC extraction | Search both; endpoint scheme is not resolved here |

### 3.3 Infrastructure and Downstream Exposure

Affected scope includes seven platform wheels and multiple container variants. Reported image references include `ghcr.io/berriai/litellm:v1.107.0` and `litellm/litellm:1.107.0`; Aikido also flags `latest`, `main-latest` and `main-stable`. Floating tags are not immutable evidence: use digests and deployment/pull logs.

Wiz and Datadog identify **1.106.2** as a clean rollback option at reporting time. Installing it is not proof that an already exposed environment has been cleaned. Images, build caches, mirrors, virtual environments and mounted secrets may extend exposure beyond registry removal.

---

## 4. Detection Opportunities

### 4.1 Behavioral Detections

- Correlate Python startup with unexpected reads of cloud configuration, AI-provider secrets, browser stores and private keys, followed by archive creation or outbound uploads.
- Investigate Python processes reaching the exact exfiltration or GitHub pointer paths in section 6, including interpreters started by package-management or CI jobs.
- Inspect environment-wide library directories for startup implants, not only the LiteLLM package directory. `sitecustomize.py` is also legitimate functionality: filename-only matches require content or hash confirmation.
- Hunt for detached Python loaders and repeated pointer retrieval; lack of a shell child does not exclude execution.

### 4.2 Network-Based Detections

- Search proxy, DNS and EDR telemetry for `litellm.dev`, `www.litellm.dev`, `/healthcheck` and the specific `letters9813/pythonclient-test` raw GitHub path.
- Correlate the October 10/12 webhook paths with GitHub Actions and build-runner activity. `webhook.site` and GitHub are shared services, not domains to classify wholesale as malicious.
- Review cloud activity from `168.100.8[.]57` and `165.227.201[.]8` in the incident context. Wiz associates these with use of stolen AWS role credentials; they are not established as package-download or collector-exfiltration endpoints.

### 4.3 Host-Based Detections

- Inventory `litellm==1.107.0`, immutable image digests, package caches and installed wheel metadata without starting an untrusted interpreter on an exposed system.
- Check for the three startup components, collector hashes and `/tmp` artifacts in section 6. Marker absence is inconclusive.
- Preserve disk, volatile evidence, installation logs and cloud sessions before rebuilding. Avoid triggering the implant during investigation through routine Python or pip startup.

### 4.4 CI/CD and Provenance Checks

- Search repository audit records for short-lived `ci-tmp-*` branches, workflow creation/deletion, unexpected environment access and anomalous production approvals.
- Compare release provenance against the exact expected repository owner and workflow inputs. A repository-owner hyphen is security-relevant in this incident.
- Review secrets and tokens accessible to affected jobs, not only credentials visibly referenced in a workflow. Include mirrors, derived images and cached artifacts in the inventory.

### 4.5 Retrospective Hunt Window

For the **upstream repository**, start no later than October 10, 2026, and include October 12 workflow execution and subsequent publishing actions. For **consumers**, start at the first download, pull or installation of an affected artifact on October 21, extending beyond removal wherever caches or copied environments remained usable. August/September gateway-exploitation cases require their own hunts; they do not establish an earlier start for this package incident.

These are source-derived hunting recommendations, not detection rules executed or validated against an organization's telemetry.

---

## 5. Conclusion

1. **This is an artifact and release-trust compromise.** A clean-looking source tag or valid artifact manifest does not clear a published wheel or container.
2. **Startup hooks expand the blast radius.** Importing LiteLLM is not required, and uninstalling it alone can leave executable files in the environment's library path.
3. **The repository compromise predates distribution.** October 10/12 secret-theft workflows materially extend the upstream investigation, while their precise connection to October 21 remains unresolved.
4. **Attribution remains open.** The separate TeamPCP campaign must not become October attribution by repetition.
5. **History matters without proving continuity.** August/September reports show why AI gateways are valuable credential targets, not that the same operator or entry vector caused October's release incident.

**Recommended Immediate Actions:**
- Isolate affected systems and preserve artifacts, CI logs and cloud audit evidence.
- Rebuild Python environments and affected containers from verified clean inputs; do not rely on package-directory deletion or downgrade alone.
- Revoke or rotate accessible cloud, developer, browser-session and AI-provider credentials from clean systems, prioritizing those present during execution.
- Investigate use of stolen credentials, active sessions and downstream build artifacts; removing the malware does not revoke secrets already copied.
- Restore publishing only after reviewing repository access, release inputs, workflow permissions and approval boundaries.

---

## 6. Indicators of Compromise (IoC List)

Network indicators are defanged. Shared-service URLs and legitimate software paths require contextual correlation. The tables keep October indicators separate from historical gateway-exploitation cases.

### 6.1 Network Indicators

| Type | Value | Description / provenance |
|------|-------|--------------------------|
| Domain | `litellm[.]dev`, `www.litellm[.]dev` | October collector infrastructure; several core sources |
| URL | `hxxp://www.litellm[.]dev/healthcheck` | Exfiltration endpoint in Microsoft, Socket, SafeDep, Aikido and Open Source Malware records |
| URL | `hxxps://www.litellm[.]dev/healthcheck` | HTTPS variant in Wiz/Datadog extraction; scheme disagreement retained |
| URL | `hxxps://raw.githubusercontent[.]com/letters9813/pythonclient-test/main/domain.txt` | Remote-loader pointer; legitimate shared hosting service, specific path relevant |
| URL | `hxxps://webhook[.]site/65a42464-3cfa-4b02-a18c-17a6d7b86f37` | October 10 secret-theft workflow, Socket |
| URL | `hxxps://webhook[.]site/4da03473-a3e7-4dc2-a087-9c564b4208e1` | October 12 secret-theft workflow, Socket |
| IPv4 | `168.100.8[.]57` | Stolen AWS credential validation/use, Wiz |
| IPv4 | `165.227.201[.]8` | Stolen AWS credential use and discovery, Wiz |
| Email | `ckdi82fkoos@proton[.]me` | Commit identity metadata, Wiz; not a verified operator identity |

### 6.2 File Hashes - Malicious Wheels

All values are SHA-256. The seven-wheel set is reported across Wiz, Microsoft, Aikido, Datadog, SafeDep and Socket; Open Source Malware also analyzed the macOS x86-64 artifact.

| Artifact | SHA-256 |
|----------|---------|
| 1.107.0 macOS x86-64 wheel | `7598727f209d717041db37f7dca271d3a7d328a279890e0e1d55375729aeb86d` |
| 1.107.0 macOS ARM64 wheel | `0aaf7ba346d41ef2f40390436738b001180d5a1c03aa093f121078a9969d9a1a` |
| 1.107.0 manylinux 2.28 ARM64 wheel | `668169d35b87bf51324080390b1b1c5ab12bd335cfe5f1a99e3689abd5e02ae6` |
| 1.107.0 manylinux 2.28 x86-64 wheel | `462d0c9f67ca522d9e0e4acd245e90b36ce0d5353604a66bb7c43a1ec4a6fcf7` |
| 1.107.0 musllinux 1.2 ARM64 wheel | `c2e32d0ce2548aa662c18bf5001911a79fe5b30cf8357132275add02fdcde054` |
| 1.107.0 musllinux 1.2 x86-64 wheel | `1bbce8caa94f01c0aaa0b7ddae51553a8a32e1ce53d96d44fe583272aff7ad00` |
| 1.107.0 Windows AMD64 wheel | `12d4ccc5c6f8d35cf4f2cf233b7f3e418e863e657d81ff5f5fc9e210005b9484` |

### 6.3 File Hashes - Startup Components and Collectors

| Artifact | SHA-256 | Provenance |
|----------|---------|------------|
| Unix `cook.pth` | `7f191632e7320705d154b85204f1ae546b543acbd7e8861229b76f5042b92bdb` | Wiz, Microsoft, Socket; also Open Source Malware/Aikido |
| Windows `cook.pth` | `84dc8c82c0a4a4a62552ef826b49fcc86d1a5c4a5d0f2c06665723f93d129d7d` | Wiz, Microsoft, Socket |
| Unix `cook.py` | `9dd0a3926f96a37eb86cf1ee2310d9be93139cc4ebef3ef9e2efe9531390be25` | Wiz, Microsoft, Socket; also Open Source Malware/Aikido |
| Windows `cook.py` | `03ac2a8b752605d1d7710979c17ff18b03dd978203ba23ba97fd8ce3d6f897ea` | Wiz, Microsoft, Socket |
| Unix `sitecustomize.py` | `34bef04fe88ac9d0aae0475630b1738681d15b94f233ac8aa46eacf5968305fa` | Multiple core sources |
| Windows `sitecustomize.py` | `b6122440d0d9cb1eb1ade9933f49214da8c31288de7710c076c2680dfa528465` | Wiz, Microsoft, Socket |
| Collector decoded from `sitecustomize.py` | `20a59e5a285799e7cf7fa16cfba1c1414f1e84a8459e14207cfd4e998c2cd24b` | Open Source Malware |
| Collector decoded from `cook.py` | `6ea3d8ef6cf73a72d8df24f663b7a31ce67494eeb9b0d707b93484e66675d2df` | Open Source Malware |

Two SafeDep-extracted startup hash strings differ from the corroborated values above. They are omitted rather than silently corrected or merged. A hash match is stronger evidence than a filename alone.

### 6.4 Container Digests

Values below are SHA-256 digests; prepend `sha256:` when querying container inventories. Index and platform-manifest digests identify different objects and are not interchangeable. Variant labels do not establish a repository/tag name.

| Object | Digest | Provenance |
|--------|--------|------------|
| Multi-platform index | `1bbcb1443bc962e45f5aad53fe3d2c30600e0379715fb6c664cdd3ac126c339e` | Datadog, Socket |
| Standard AMD64 manifest | `bd1aeee419ea36da9aa2b657288da4101887be468f020ac63d22ba6ed84a3ea5` | Wiz, Socket |
| Standard ARM64 manifest | `56b74573eed6e4aafe4b50603dbe7853e0345f188c8e44a09f1098caf1f4bcdf` | Wiz, Socket |
| Database AMD64 variant | `24581ddc30767f16ecb69d2b0517556f2cd7dea56971adb42a3d1beb97d69523` | Wiz |
| Database ARM64 variant | `827dd893c74cf621a860a66a3a447a5c732533f087589ce905573e285c0a239c` | Wiz |
| Non-root AMD64 variant | `645a67d810628252d63df85dcc8824c58bcc77cf8383f4d3e6321f0ccc3ce9e4` | Wiz |
| Non-root ARM64 variant | `f75c8edae59b72b1ebfd617295833f465c85bb2fab9c1d60f21b496db86cb8da` | Wiz |

### 6.5 File System and Repository Artifacts

| Artifact | Value | Interpretation |
|----------|-------|----------------|
| Startup components | `cook.pth`, `cook.py`, `sitecustomize.py` | Inspect environment library roots and content |
| Upload marker | `/tmp/.pc_once_72129118c59f5636c0bb` | Reported after HTTP 200 upload response; absence inconclusive |
| Loader lock | `/tmp/remote_code_loader.lock` | Primarily described as loader coordination artifact |
| Malicious workflow | `.github/workflows/cache.yml` | October 10/12 repository activity |
| Temporary branches | `ci-tmp-a351cc`, `ci-tmp-4d8517` | Socket; branches deleted after execution |
| Staging paths | `/tmp/c.env`, `/tmp/c.b64` | Earlier CI secret-theft workflow artifacts |
| Lookalike source | `Berri-AI/litellm` | Contrast with legitimate `BerriAI/litellm` |
| Malicious source revision | `20535d8fa11f786a6c24df7488a0e449ed5f09ad` | Socket provenance analysis |
| October 10 commit | `b69bc36fd4e23b23ea09f4ce63a92b07258f5044` | Socket timeline |
| October 12 commit | `1a6e3c1e41f1b5c8eeaeeb2ae94bcd95390fa891` | Socket timeline |

### 6.6 Package and Image Identifiers

| Identifier | Meaning |
|------------|---------|
| `litellm==1.107.0` | Compromised October release; artifact verification required |
| `ghcr.io/berriai/litellm:v1.107.0` | Reported affected container reference |
| `litellm/litellm:1.107.0` | Additional reference reported by Aikido |
| `latest`, `main-latest`, `main-stable` | Reported affected floating tags; inspect historical digest resolution |
| `litellm==1.106.2` | Reported clean rollback version, not a cleanup guarantee |

---

## 7. MITRE ATT&CK Techniques

Mappings apply to October unless marked as capability or analytical context. They are not evidence of a confirmed action in every consumer environment. Historical gateway-exploitation techniques are intentionally not transferred into this incident.

| Technique ID | Technique Name | Tactic | Evidence / boundary |
|--------------|----------------|--------|---------------------|
| T1195.001 | Compromise Software Dependencies and Development Tools | Initial Access | Malicious published package and container build inputs |
| T1059.006 | Python | Execution | Startup imports and decoded Python collector/loader |
| T1546 | Event Triggered Execution | Persistence / Privilege Escalation | Analytical parent-level mapping for Python startup hooks; execution inherits interpreter privileges, not proven elevation |
| T1027 | Obfuscated Files or Information | Defense Evasion | Encoded and compressed payload material |
| T1140 | Deobfuscate/Decode Files or Information | Defense Evasion | Runtime Base64 decoding and zlib decompression |
| T1552.001 | Credentials In Files | Credential Access | Cloud, developer and AI secrets targeted in local files |
| T1552.004 | Private Keys | Credential Access | Private-key collection capability |
| T1552.005 | Cloud Instance Metadata API | Credential Access | Capability described; successful metadata credential retrieval not established |
| T1555.003 | Credentials from Web Browsers | Credential Access | Browser-store collection capability |
| T1082 | System Information Discovery | Discovery | Host/environment information collection |
| T1005 | Data from Local System | Collection | Local configuration, files and selected database records |
| T1074.001 | Local Data Staging | Collection | Data prepared locally before upload |
| T1560 | Archive Collected Data | Collection | Archive preparation before exfiltration |
| T1102.001 | Dead Drop Resolver | Command and Control | GitHub-hosted pointer used by remote loader |
| T1105 | Ingress Tool Transfer | Command and Control | Additional Python retrieval capability; successful second stage not confirmed |
| T1071.001 | Web Protocols | Command and Control | HTTP(S)-based loader and endpoint traffic |
| T1041 | Exfiltration Over C2 Channel | Exfiltration | Source mapping for collector upload; endpoint monitoring needed to establish per-host success |

---

*Cross-source synthesis using TI Mindmap HUB MCP only.*
*Analysis date: 2026-10-25 | Research window: 2026-07-25 to 2026-10-25 | Included articles: 11 (8 incident, 3 context) | Classification: TLP:CLEAR.*