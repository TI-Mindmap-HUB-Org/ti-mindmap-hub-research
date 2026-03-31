---
title: "Threat Intelligence Report: Axios npm Supply Chain Attack"
date: "2026-03-31"
severity: "CRITICAL"
classification: "TLP:WHITE"
description: "Cross-source analysis of the Axios npm supply chain attack delivering cross-platform RATs via compromised maintainer credentials."
tags:
  - supply-chain
  - npm
  - axios
  - rat
  - credential-theft
sources_count: 7
author: "TI Mindmap HUB"
---

# 🛡️ Threat Intelligence Report: Axios npm Supply Chain Attack

---

## 1. Source Reports

| # | Title | Published | Source | Platform Link |
|---|-------|-----------|--------|---------------|
| 1 | Supply Chain Attack on Axios Pulls Malicious Dependency from npm | 2026-03-31 | socket.dev | [Report](https://ti-mindmap-hub.com/report/bade1989-8d07-4b35-b573-9bdc8d4b7dc5) |
| 2 | One of the most popular JavaScript packages on earth Axios has been compromised | 2026-03-31 | opensourcemalware.com | [Report](https://ti-mindmap-hub.com/report/a83ab645-a5cb-4c77-945d-2a085f9b7bcb) |
| 3 | Axios npm Supply Chain Attack: Cross-Platform RAT Delivery via Compromised Maintainer Credentials | 2026-03-31 | picussecurity.com | [Report](https://ti-mindmap-hub.com/report/c729ac02-ea2d-44b4-bc77-58584879a7ee) |
| 4 | Axios npm compromise: XOR dropper to cross-platform RAT | 2026-03-31 | derp.ca | [Report](https://ti-mindmap-hub.com/report/c7be730d-e165-4425-928b-c746fa3d72fc) |
| 5 | Axios NPM Distribution Compromised in Supply Chain Attack | 2026-03-31 | wiz.io | [Report](https://ti-mindmap-hub.com/report/2aa15683-2d92-4d69-b583-071c4d0cfd24) |
| 6 | Supply-Chain Compromise of axios npm Package | 2026-03-31 | gist.github.com (joe-desimone) | [Report](https://ti-mindmap-hub.com/report/2a19352c-0d3b-41bd-a954-878887e3e61d) |
| 7 | axios Compromised on npm — Malicious Versions Drop Remote Access Trojan | 2026-03-31 | stepsecurity.io | [Report](https://ti-mindmap-hub.com/report/2532c2c1-043f-46b4-bfbb-0de55dd22ea8) |

---

## 2. Cross-Source Analysis

### 2.1 Consensus Findings

All seven reports converge on the same core attack chain and agree on the following:

- **Target:** The `axios` npm package, one of the most widely used JavaScript HTTP clients (~83–100 million weekly downloads, used in approximately 80% of cloud and developer environments).
- **Attack vector:** Compromise of a classic npm access token belonging to the lead maintainer account (`jasonsaayman`), followed by unauthorized publication of two poisoned versions: `axios@1.14.1` (tagged `latest`) and `axios@0.30.4` (tagged `legacy`).
- **Mechanism:** Injection of a single new runtime dependency — `plain-crypto-js@4.2.1` — into the package manifest. This malicious package executed a postinstall script (`setup.js`) that served as a multi-platform RAT dropper.
- **C2 infrastructure:** All payloads communicated with `sfrclak.com:8000` (IP: `142.11.206.73`).
- **Exposure window:** Approximately 169 minutes (under 3 hours) before npm removed the compromised versions.
- **Anti-forensics:** The dropper deleted itself and restored a clean `package.json` after execution, leaving minimal forensic artifacts.

### 2.2 Unique Insights Per Source

| Source | Key Unique Contribution |
|--------|------------------------|
| **socket.dev** | First public disclosure; identified `plain-crypto-js@4.2.1` as malicious; discovered secondary downstream packages `@shadanai/openclaw` and `@qqbrowser/openclaw-qbot` that re-distributed the poisoned dependency |
| **opensourcemalware.com** | Detailed RAT capability breakdown including reflective DLL injection (Windows), registry persistence key (`HKCU\...\Run\MicrosoftUpdate`), and Windows User-Agent string `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` |
| **picussecurity.com** | Confirmed that the attacker changed the maintainer's npm email to `ifstap@proton.me`, effectively locking out the legitimate owner and blocking recovery. Noted that the classic npm token lacked IP binding, expiration, and fine-grained permissions |
| **derp.ca** | Deepest technical analysis: disclosed the XOR key (`OrDeR_7077`), two-layer obfuscation scheme (reverse + base64 + XOR), campaign ID `6202033`, and confirmed the C2 was hosted by Hostwinds in Seattle (AS54290). Exposure window of exactly 169 minutes. Noted absence of macOS persistence |
| **wiz.io** | Identified a second compromised account (`nrwise`) and confirmed at least 3% of environments reported execution of the compromised code. Provided GHSA advisory IDs: `GHSA-fw8c-xr5c-95f9` and `MAL-2026-2306` |
| **joe-desimone (GitHub)** | Highlighted the provenance gap: legitimate axios releases were published via GitHub Actions OIDC with SLSA provenance attestation; malicious versions were published via CLI without any attestation — a detectable signal |
| **stepsecurity.io** | Provided runtime validation via Harden-Runner showing live network connections and process spawning during `npm install`; confirmed process orphaning to evade process-tree analysis |

### 2.3 Points of Discrepancy

- **Weekly downloads:** Reports range from 40M (opensourcemalware.com) to 100M+ (derp.ca, wiz.io). The most authoritative figures cite ~83–100M, suggesting the lower figure is outdated.
- **macOS persistence:** Most reports describe macOS persistence via the `com.apple.act.mond` binary. However, derp.ca specifically notes the macOS variant did **not** implement persistence, relying on the binary being run once at installation time. Windows persistence is confirmed by all sources via the registry Run key.
- **Linux payload recovery:** The Linux RAT (`/tmp/ld.py`) was referenced by all sources, but derp.ca confirms the payload was **never recovered** by researchers, leaving its full capabilities unknown.

---

## 3. Threat Intelligence Report

### 3.1 Executive Summary

On March 31, 2026, a sophisticated threat actor executed a high-impact supply chain attack against the `axios` JavaScript library, one of the most widely used npm packages globally. By stealing a classic npm access token from the project's lead maintainer, the attacker bypassed the official CI/CD pipeline and published two malicious package versions (`axios@1.14.1` and `axios@0.30.4`) to the npm registry. Rather than modifying axios's own code — which would have been immediately visible — the attacker injected a single dependency, the newly created and trojanized `plain-crypto-js@4.2.1`, into the package manifest.

Any developer, CI/CD pipeline, or production server that ran `npm install` against these versions during the approximately 169-minute exposure window automatically fetched and executed a cross-platform Remote Access Trojan (RAT) dropper. The dropper delivered OS-specific second-stage RATs for Windows, macOS, and Linux, enabling persistent unauthorized access, system reconnaissance, credential exposure, and arbitrary command execution. Anti-forensic cleanup routines erased traces of the infection immediately after execution, significantly complicating incident response.

Given axios's ubiquity — present in an estimated 80% of cloud and development environments — the blast radius of this attack is potentially unprecedented in the npm ecosystem's history.

**Severity:** CRITICAL  
**Affected packages:** `axios@1.14.1`, `axios@0.30.4`, `plain-crypto-js@4.2.1`  
**Safe versions:** `axios@1.14.0` and earlier (confirmed clean; published via SLSA-attested pipeline)  
**Status:** Malicious packages removed from npm; C2 infrastructure dismantled  

---

### 3.2 Attack Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AXIOS NPM SUPPLY CHAIN ATTACK FLOW                      │
└─────────────────────────────────────────────────────────────────────────────┘

[PREPARATION PHASE — T-18h]
        │
        ▼
 ┌──────────────────────────────────────┐
 │  Attacker steals classic npm token   │
 │  for maintainer "jasonsaayman"        │
 │  Changes account email →              │
 │  ifstap@proton.me (ProtonMail)        │
 └──────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────┐
 │  Publishes DECOY package:            │
 │  plain-crypto-js@4.2.0 (benign)      │
 │  to seed trust & evade heuristics    │
 └──────────────────────────────────────┘
        │
        ▼
[ATTACK PHASE — T-0]
        │
        ▼
 ┌──────────────────────────────────────┐
 │  Publishes MALICIOUS:                │
 │  plain-crypto-js@4.2.1              │
 │  ├─ postinstall hook → setup.js     │
 │  └─ 2-layer XOR obfuscation         │
 └──────────────────────────────────────┘
        │
        ▼
 ┌──────────────────────────────────────┐
 │  Publishes TROJANIZED axios:         │
 │  axios@1.14.1 (tag: latest)          │
 │  axios@0.30.4 (tag: legacy)          │
 │  ONLY CHANGE: +plain-crypto-js dep   │
 └──────────────────────────────────────┘
        │
        ▼
[VICTIM EXECUTION — on npm install]
        │
        ├──────────────────────────────────────────────────┐
        │                                                  │
        ▼                                                  ▼
 Developer workstation                          CI/CD pipeline
        │
        ▼
 ┌──────────────────────────────────────┐
 │  setup.js executes via postinstall   │
 │  Decodes: reverse + base64 + XOR    │
 │  XOR key: OrDeR_7077                │
 │  Detects OS → branches payload       │
 └──────────────────────────────────────┘
        │
        ├──────────────────┬──────────────────┐
        ▼                  ▼                  ▼
   [WINDOWS]           [macOS]           [LINUX]
 PowerShell+VBS     AppleScript       Python/curl
 wt.exe (PS copy)  com.apple.act.mond  /tmp/ld.py
 Registry persist   (Mach-O RAT)      nohup detach
        │                  │                  │
        └──────────────────┴──────────────────┘
                           │
                           ▼
            ┌──────────────────────────────┐
            │  C2: sfrclak.com:8000        │
            │  IP: 142.11.206.73           │
            │  Path: /6202033              │
            │  Payloads: /product0,1,2     │
            │  Beacon: every 60 seconds    │
            └──────────────────────────────┘

[POST-EXPLOITATION]
        │
        ▼
 ┌──────────────────────────────────────┐
 │  RAT capabilities:                   │
 │  ├─ System fingerprinting            │
 │  ├─ Process listing                  │
 │  ├─ Directory enumeration            │
 │  ├─ Arbitrary command execution      │
 │  ├─ Code/DLL injection (Windows)     │
 │  └─ Credential/secret harvesting     │
 └──────────────────────────────────────┘

[ANTI-FORENSICS — immediate]
        │
        ▼
 ┌──────────────────────────────────────┐
 │  Deletes setup.js                    │
 │  Deletes malicious package.json      │
 │  Restores clean package.json (4.2.0) │
 │  Orphans processes from npm tree     │
 └──────────────────────────────────────┘
```

---

### 3.3 Attribution & Threat Actor

**Attribution status:** UNKNOWN — No confirmed group attribution as of 2026-03-31.

**Threat actor profile (behavioral assessment):**

The actor demonstrates a high level of operational discipline and technical sophistication, suggesting an experienced team or individual rather than a script-kiddie. Key behavioral indicators:

- **Pre-staging discipline:** Published a benign decoy version (`plain-crypto-js@4.2.0`) approximately 18 hours before the attack to establish package trust and bypass "new package" heuristics deployed by security scanners. This is a hallmark of patient, experienced operators.
- **Minimal footprint philosophy:** Rather than modifying axios source code (detectable via diff), the attacker made a single, minimal change to `package.json` — adding one dependency line. This reflects tradecraft awareness of code review monitoring.
- **Multi-platform capability:** Cross-platform RAT development (C++ Mach-O for macOS, PowerShell/.NET injection for Windows, Python for Linux) indicates substantial development resources and capability.
- **Account takeover as entry vector:** Targeting a classic npm token (non-expiring, non-IP-bound) suggests familiarity with npm's authentication weaknesses. Changing the account email to a ProtonMail address before publishing shows awareness of account recovery mechanisms and a deliberate plan to lock out the legitimate maintainer.
- **Infrastructure pre-registration:** The C2 domain `sfrclak.com` was registered hours before the attack, minimizing the domain's threat intelligence footprint.
- **Process orphaning:** Deliberately detaching malicious processes from the `npm install` process tree to evade EDR/process-tree analysis is an advanced anti-forensic technique not commonly seen in opportunistic actors.

**Possible motivations:** Credential and secret harvesting from developer workstations and CI/CD pipelines (API keys, cloud credentials, tokens stored in environment variables); potential espionage or financial gain; possible precursor to a broader supply chain campaign targeting downstream software that uses axios.

**Related packages (downstream propagation):** `@shadanai/openclaw` and `@qqbrowser/openclaw-qbot@0.0.130` were identified as secondary packages that vendored the trojanized axios, potentially propagating the compromise further into the npm ecosystem.

---

### 3.4 Technical Details

#### 3.4.1 Stage 1 — Credential Theft & Account Takeover

The attacker obtained a **classic npm access token** associated with the account `jasonsaayman` (axios lead maintainer). Classic tokens have no expiration date, no IP binding, and grant full publishing rights over all packages owned by the account — a critical security design weakness in the npm registry. After token acquisition, the attacker changed the account's registered email to `ifstap@proton.me`, blocking the legitimate maintainer from receiving account alerts or recovering access through standard email-based flows.

#### 3.4.2 Stage 2 — Package Staging & Publication

**Decoy publication (T-18h):** `plain-crypto-js@4.2.0` was published as a benign, empty package designed to pass malware heuristics that flag newly created packages. The name was chosen to closely resemble the legitimate `crypto-js` library (typosquatting by design).

**Malicious publication (T-0):** `plain-crypto-js@4.2.1` was published with a `postinstall` hook pointing to `setup.js`. Simultaneously, two poisoned axios versions were published with `plain-crypto-js@^4.2.1` as the only new dependency:
- `axios@1.14.1` (tagged `latest`) — SHA1: `2553649f232204966871cea80a5d0d6adc700ca`
- `axios@0.30.4` (tagged `legacy`) — SHA1: `d6f3f62fd3b9f5432f5782b62d8cfd5247d5ee71`

Any project using caret-range version constraints (`^1.14.0` or `^0.30.0`) would automatically pull in the compromised version on next `npm install`.

Critically, these releases lacked **SLSA provenance attestation** — legitimate axios releases are published via GitHub Actions OIDC with attestation. This absence is a detectable signal for security-conscious environments.

#### 3.4.3 Stage 3 — Dropper (setup.js)

The dropper is a 4,209-byte JavaScript file (`setup.js`) executed automatically via npm's `postinstall` lifecycle hook. It is obfuscated with a custom two-layer encoding scheme:

1. **Layer 1:** String reversal + Base64 decoding
2. **Layer 2:** Custom XOR cipher with static key `OrDeR_7077`

This dual-layer approach was designed to defeat both signature-based detection and simple static analysis. After decoding, the script performs OS detection and branches into platform-specific payload delivery routines. The entire dropper execution completes in under two seconds, before npm finishes installing other dependencies.

**Platform delivery logic:**

| Platform | Mechanism | Payload | Destination |
|----------|-----------|---------|-------------|
| **Windows** | PowerShell copied to `%PROGRAMDATA%\wt.exe` (masquerades as Windows Terminal); VBScript (`%TEMP%\6202033.vbs`) executes PowerShell with `-w hidden -ep bypass` | `windows_rat.ps1` via `http://sfrclak.com:8000/product1` | In-memory (fileless) + `system.bat` for persistence |
| **macOS** | AppleScript via `nohup osascript`; downloads Mach-O binary; ad-hoc code signs it (`codesign --force --deep --sign -`) to bypass Gatekeeper | Mach-O C++ RAT via `http://sfrclak.com:8000/product0` | `/Library/Caches/com.apple.act.mond` |
| **Linux** | `curl` + `nohup python3` detached in background | Python script via `http://sfrclak.com:8000/product2` | `/tmp/ld.py` |

#### 3.4.4 Stage 4 — RAT Payloads

**macOS RAT (C++ Mach-O, universal binary):**
- SHA256: `92ff08773995ebc8d55ec4b8e1a225d0d1e51efa4ef88b8849d0071230c9645a`
- System fingerprinting: hostname, username, macOS version, timezone, CPU type, OS install date, boot time, running processes, directory listings (`/Applications`, `~/Library`, `~/Application Support`)
- C2 beacon: HTTP POST every 60 seconds, data Base64-encoded
- Supported commands: arbitrary shell execution, code injection, directory enumeration, RAT termination
- Written to hidden temp file (`/private/tmp/.XXXXXX`), ad-hoc signed, then moved to final path
- **No persistence mechanism** on macOS (confirmed by derp.ca)

**Windows RAT (PowerShell/.NET):**
- SHA256: `617b67a8e1210e4fc87c92d1d1da45a2f311c08d26e89b12307cf583c900d101`
- Fileless execution: reflective .NET injection — payload never written to disk as PE
- Persistence: registry Run key `HKCU\Software\Microsoft\Windows\CurrentVersion\Run\MicrosoftUpdate` pointing to `%PROGRAMDATA%\system.bat`, which re-downloads and executes the RAT from C2 on every boot
- Persistence stub: `system.bat` SHA256: `f7d335205b8d7b20208fb3ef93ee6dc817905dc3ae0c10a0b164f4e7d07121cd`
- Same HTTP POST protocol and User-Agent spoofing as macOS variant

**Linux RAT (Python):**
- SHA256: `fcb81618bb15edfdedfb638b4c08a2af9cac9ecba551af135a8402bf980375cf`
- Executed detached: `nohup python3 /tmp/ld.py SCR_LINK > /dev/null 2>&1 &`
- Full capabilities unknown — payload was never recovered by researchers

**Shared RAT characteristics (all platforms):**
- C2 protocol: HTTP POST to `http://sfrclak.com:8000/6202033`
- Traffic designed to mimic legitimate npm registry traffic (paths: `packages.npm.org/product{0,1,2}`)
- User-Agent: `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` (legacy IE8/XP string, used for blending)
- All data Base64-encoded

#### 3.4.5 Stage 5 — Anti-Forensics

Immediately after dropper execution:
- `setup.js` is **deleted** (removes the malicious install script)
- `package.json` is **deleted** (removes version 4.2.1 containing the `postinstall` hook)
- A clean `package.json` (`package.md` renamed to `package.json`) presenting version `4.2.0` is **restored**
- All spawned processes are **orphaned** from the `npm install` process tree, defeating process-ancestry-based EDR alerts

The only reliable post-infection artifact confirming compromise is the presence of the `plain-crypto-js` directory in `node_modules` — this package is not a dependency in any legitimate axios release.

#### 3.4.6 Incident Response Guidance

**Immediate actions (within 24h):**

1. **Audit lockfiles and node_modules** across all repositories, CI/CD agents, and developer workstations for `axios@1.14.1`, `axios@0.30.4`, or any version of `plain-crypto-js`.
2. **Pin axios** to `1.14.0` or earlier in all `package.json` files; regenerate lockfiles.
3. **Block C2 infrastructure** at the network perimeter: domain `sfrclak.com`, IP `142.11.206.73`, port 8000.
4. **Search for host-based artifacts:**
   - macOS: `/Library/Caches/com.apple.act.mond`
   - Windows: `%PROGRAMDATA%\wt.exe`, `%PROGRAMDATA%\system.bat`, registry key `HKCU\...\Run\MicrosoftUpdate`, temp files `%TEMP%\6202033.*`
   - Linux: `/tmp/ld.py`
5. **Rotate all secrets** exposed in affected environments: npm tokens, cloud provider credentials (AWS, Azure, GCP), API keys, SSH keys, `.env` files.
6. **Review CI/CD pipeline logs** for the exposure window (2026-03-31 ~07:00–10:00 UTC) for any `npm install` executions that may have fetched compromised versions.
7. **Treat affected systems as fully compromised** — reimage where feasible; conduct forensic investigation on others.

**Longer-term mitigations:**
- Migrate npm publishing workflows to **granular tokens** (scoped, IP-bound, expiring).
- Enable **publish provenance** / SLSA attestation requirements in CI/CD pipelines.
- Implement **Software Composition Analysis (SCA)** tools (e.g., Socket.dev, Snyk, Dependabot) with real-time monitoring.
- Disable or restrict **npm lifecycle scripts** (`--ignore-scripts` flag) in non-development environments.
- Monitor network egress for HTTP POST traffic matching `sfrclak.com` patterns during `npm install`.

---

### 3.5 Infrastructure Analysis

| Component | Value | Notes |
|-----------|-------|-------|
| C2 Domain | `sfrclak.com` | Registered hours before the attack; no prior malicious history |
| C2 IP | `142.11.206.73` | Hosted by Hostwinds, Seattle, WA (AS54290) |
| C2 Port | `8000` (HTTP, plaintext) | No TLS; deliberate to avoid certificate transparency logs |
| Beacon URL | `http://sfrclak.com:8000/6202033` | `6202033` = campaign ID |
| Payload URLs | `/product0` (macOS), `/product1` (Windows), `/product2` (Linux) | Platform-specific staging |
| Infrastructure lifetime | Hours (taken down after npm removal) | Rapid operational cleanup |
| Hosting provider | Hostwinds (AS54290) | Commercial US hosting; likely paid with untraceable method |

The use of plain HTTP (port 8000) instead of HTTPS is noteworthy: it avoids leaving traces in certificate transparency logs and reduces infrastructure setup complexity, but also makes traffic trivially detectable if monitored. The C2 infrastructure was dismantled rapidly after the npm takedown, suggesting the attacker monitored the situation in real time and had a planned withdrawal procedure.

---

### 3.6 Detection Opportunities

#### Network-Based Detections

| Detection | Pattern | Priority |
|-----------|---------|----------|
| C2 beacon | Outbound HTTP POST to `sfrclak.com` or `142.11.206.73:8000` | CRITICAL |
| Campaign path | HTTP requests containing path `/6202033` or `/product[012]` | CRITICAL |
| Suspicious User-Agent during npm install | `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` on port 8000 | HIGH |
| Non-TLS traffic from CI/CD agents | HTTP (not HTTPS) egress during `npm install` operations | MEDIUM |
| DNS queries | Any resolution of `sfrclak.com` | CRITICAL |

#### Host-Based Detections

| Platform | Artifact | Detection Method |
|----------|---------|-----------------|
| All | `plain-crypto-js` in `node_modules` | File system scan / SCA tool |
| All | `axios@1.14.1` or `axios@0.30.4` in lockfiles | Dependency audit (`npm audit`) |
| macOS | `/Library/Caches/com.apple.act.mond` | File existence check; AV scan |
| Windows | `%PROGRAMDATA%\wt.exe` (PowerShell copy) | File path + hash check |
| Windows | `%PROGRAMDATA%\system.bat` | File path + hash check |
| Windows | `HKCU\...\Run\MicrosoftUpdate` with unusual value | Registry monitoring |
| Windows | `%TEMP%\6202033.vbs` or `%TEMP%\6202033.ps1` | File existence / EDR |
| Linux | `/tmp/ld.py` | File existence check |
| All | Child processes spawned by `node` / `npm` connecting to external IPs | EDR process-tree monitoring |

#### Behavioral Detections (EDR/XDR Rules)

```
ALERT: npm postinstall spawning PowerShell or curl with external network connections
ALERT: Node.js spawning AppleScript (osascript) with download arguments
ALERT: Process spawned by npm making HTTP POST to non-npm-registry domains
ALERT: PowerShell copy to PROGRAMDATA with subsequent registry Run key creation
ALERT: File creation in /Library/Caches/ by node/npm process
ALERT: Outbound connections from CI/CD agents to IP 142.11.206.73
```

#### SIEM / Sentinel Queries (KQL sketch)

```kusto
// Detect C2 domain resolution
DnsEvents
| where Name contains "sfrclak.com"
| project TimeGenerated, Computer, Name, IPAddresses

// Detect C2 IP connections
CommonSecurityLog
| where DestinationIP == "142.11.206.73"
| project TimeGenerated, DeviceName, DestinationPort, Protocol

// Detect suspicious registry persistence
RegistryEvents
| where RegistryKey contains "MicrosoftUpdate"
    and RegistryKey contains "CurrentVersion\\Run"
| project TimeGenerated, DeviceName, RegistryKey, RegistryValue
```

---

### 3.7 Conclusion

The Axios npm supply chain attack of March 31, 2026, represents one of the most technically sophisticated and broadly impactful package compromise events ever documented in the npm ecosystem. The attacker combined credential theft, pre-staging tradecraft, minimal-footprint dependency injection, cross-platform RAT delivery, and aggressive anti-forensic cleanup into a tightly orchestrated operation that could have compromised millions of developer and production environments within hours.

The incident exposes deep systemic vulnerabilities in open-source software supply chains: the reliance on long-lived, unscoped credentials; the implicit trust in transitive dependencies; the unsandboxed execution of npm lifecycle scripts; and the lack of mandatory provenance verification for package publications.

Organizations are strongly advised to treat any environment that executed `npm install` against `axios@1.14.1` or `axios@0.30.4` during the exposure window as fully compromised and initiate full incident response procedures immediately.

---

## 4. Indicators of Compromise (Labeled)

### 4.1 Network IOCs

| Type | Value | Description | Confidence | Kill Chain |
|------|-------|-------------|------------|------------|
| Domain | `sfrclak.com` | C2 command-and-control domain | HIGH | C2 |
| IP | `142.11.206.73` | C2 server IP (Hostwinds, Seattle, AS54290) | HIGH | C2 |
| URL | `http://sfrclak.com:8000/6202033` | Primary C2 beacon + payload delivery endpoint | HIGH | C2 |
| URL | `http://sfrclak.com:8000/product0` | macOS RAT payload download URL | MEDIUM | C2 |
| URL | `http://sfrclak.com:8000/product1` | Windows RAT payload download URL | MEDIUM | C2 |
| URL | `http://sfrclak.com:8000/product2` | Linux RAT payload download URL | MEDIUM | C2 |

### 4.2 Email IOCs

| Type | Value | Description | Confidence |
|------|-------|-------------|------------|
| Email | `ifstap@proton.me` | Attacker-controlled email used to hijack the `jasonsaayman` npm account | HIGH |

### 4.3 File Hashes

| Type | Hash | Description | Confidence |
|------|------|-------------|------------|
| SHA256 | `5bb67e88846096f1f8d42a0f0350c9c46260591567612ff9af46f98d1b7571cd` | `axios-1.14.1.tgz` (malicious npm package) | HIGH |
| SHA256 | `59336a964f110c25c112bcc5adca7090296b54ab33fa95c0744b94f8a0d80c0f` | `axios-0.30.4.tgz` (malicious npm package) | HIGH |
| SHA1 | `2553649f232204966871cea80a5d0d6adc700ca` | `axios@1.14.1` npm shasum | HIGH |
| SHA1 | `d6f3f62fd3b9f5432f5782b62d8cfd5247d5ee71` | `axios@0.30.4` npm shasum | HIGH |
| SHA256 | `58401c195fe0a6204b42f5f90995ece5fab74ce7c69c67a24c61a057325af668` | `plain-crypto-js-4.2.1.tgz` (dropper package) | HIGH |
| SHA1 | `07d889e2dadce6f3910dcbc253317d28ca61c766` | `plain-crypto-js@4.2.1` npm shasum | HIGH |
| SHA256 | `e10b1fa84f1d6481625f741b69892780140d4e0e7769e7491e5f4d894c2e0e09` | `setup.js` dropper script | HIGH |
| SHA256 | `92ff08773995ebc8d55ec4b8e1a225d0d1e51efa4ef88b8849d0071230c9645a` | `com.apple.act.mond` — macOS Mach-O RAT | HIGH |
| SHA256 | `617b67a8e1210e4fc87c92d1d1da45a2f311c08d26e89b12307cf583c900d101` | `windows_rat.ps1` / `stage2.ps1` — Windows PowerShell RAT | HIGH |
| SHA256 | `f7d335205b8d7b20208fb3ef93ee6dc817905dc3ae0c10a0b164f4e7d07121cd` | `system.bat` — Windows persistence stub | HIGH |
| SHA256 | `fcb81618bb15edfdedfb638b4c08a2af9cac9ecba551af135a8402bf980375cf` | `ld.py` — Linux Python RAT (not recovered) | HIGH |

### 4.4 File Path IOCs

| Platform | Path | Description | Confidence |
|----------|------|-------------|------------|
| macOS | `/Library/Caches/com.apple.act.mond` | macOS RAT binary (masquerading as Apple daemon) | MEDIUM |
| macOS | `/private/tmp/.XXXXXX` | Temporary staging file (random 6-char name) | MEDIUM |
| macOS | `/tmp/.XXXXXX.scpt` | Temporary AppleScript execution file | MEDIUM |
| Windows | `%PROGRAMDATA%\wt.exe` | PowerShell copy disguised as Windows Terminal | HIGH |
| Windows | `%PROGRAMDATA%\system.bat` | Windows persistence batch stub | HIGH |
| Windows | `%TEMP%\6202033.vbs` | VBScript downloader | HIGH |
| Windows | `%TEMP%\6202033.ps1` | PowerShell payload staging file | HIGH |
| Linux | `/tmp/ld.py` | Linux Python RAT script | MEDIUM |
| All | `node_modules/plain-crypto-js/` | Presence of this package = compromise indicator | HIGH |

### 4.5 Registry IOCs (Windows)

| Type | Value | Description | Confidence |
|------|-------|-------------|------------|
| Registry Key | `HKCU\Software\Microsoft\Windows\CurrentVersion\Run\MicrosoftUpdate` | Persistence Run key; value points to `system.bat` for RAT re-download on reboot | MEDIUM |

### 4.6 Package IOCs

| Package | Version | Status |
|---------|---------|--------|
| `axios` | `1.14.1` | MALICIOUS — remove immediately |
| `axios` | `0.30.4` | MALICIOUS — remove immediately |
| `plain-crypto-js` | `4.2.1` | MALICIOUS — primary dropper |
| `plain-crypto-js` | `4.2.0` | SUSPICIOUS — benign decoy, not used by legitimate software |
| `@shadanai/openclaw` | any | SUSPICIOUS — re-distributes compromised axios |
| `@qqbrowser/openclaw-qbot` | `0.0.130` | SUSPICIOUS — re-distributes compromised axios |

### 4.7 Behavioral / String IOCs

| Type | Value | Description |
|------|-------|-------------|
| XOR Key | `OrDeR_7077` | Static XOR key used in dropper obfuscation |
| Campaign ID | `6202033` | Hardcoded campaign identifier in C2 URL path |
| User-Agent | `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` | Spoofed legacy IE8/WinXP User-Agent used by all RAT variants for C2 beaconing |
| npm Account | `jasonsaayman` | Compromised maintainer account |
| GHSA ID | `GHSA-fw8c-xr5c-95f9` | GitHub Security Advisory for this incident |
| MAL ID | `MAL-2026-2306` | Malware advisory identifier |

---

## 5. MITRE ATT&CK Techniques

| Technique ID | Technique Name | Tactic | Description |
|-------------|----------------|--------|-------------|
| **T1195** | Supply Chain Compromise | Initial Access | The attacker published malicious axios versions to the npm registry, poisoning the package supply chain and affecting any consumer of `axios@1.14.1` or `axios@0.30.4` |
| **T1195.002** | Compromise Software Dependencies and Development Tools | Initial Access | `plain-crypto-js@4.2.1` was injected as a transitive dependency into the poisoned axios releases, exploiting npm's automatic dependency resolution |
| **T1078** | Valid Accounts | Initial Access | The attacker stole and abused a classic npm access token belonging to the legitimate maintainer `jasonsaayman` to authenticate as a trusted publisher |
| **T1059.007** | Command and Scripting Interpreter: JavaScript | Execution | The obfuscated dropper `setup.js` was executed automatically via npm's `postinstall` lifecycle hook upon package installation |
| **T1059.001** | Command and Scripting Interpreter: PowerShell | Execution | On Windows, PowerShell was used to download and execute the RAT payload, launched with `-w hidden -ep bypass` flags to suppress windows and bypass execution policy |
| **T1059.002** | Command and Scripting Interpreter: AppleScript | Execution | On macOS, `osascript` via a `nohup` wrapper was used to download and execute the Mach-O RAT binary |
| **T1059.006** | Command and Scripting Interpreter: Python | Execution | On Linux, a Python script (`ld.py`) was fetched and launched via `nohup python3` in a detached background process |
| **T1059.003** | Command and Scripting Interpreter: Windows Command Shell | Execution | VBScript (`6202033.vbs`) was used on Windows to orchestrate PowerShell execution and payload staging |
| **T1204.002** | User Execution: Malicious File | Execution | Victims who executed `npm install` on projects with caret-ranged axios dependencies unknowingly triggered the malicious postinstall hook |
| **T1027** | Obfuscated Files or Information | Defense Evasion | The `setup.js` dropper used a custom two-layer encoding (string reversal + Base64 + XOR with key `OrDeR_7077`) to evade static analysis and signature detection |
| **T1027.002** | Software Packing | Defense Evasion | Custom encoding/packing of the dropper payload to defeat antivirus and signature-based scanning |
| **T1036** | Masquerading | Defense Evasion | The dropper restored a clean `package.json` (presenting version 4.2.0) after execution to appear as a legitimate, unmodified package |
| **T1036.003** | Masquerading: Rename System Utilities | Defense Evasion | On Windows, PowerShell was copied to `%PROGRAMDATA%\wt.exe` to masquerade as Windows Terminal and evade EDR detection heuristics |
| **T1070.004** | Indicator Removal: File Deletion | Defense Evasion | `setup.js` and the malicious `package.json` were deleted immediately after execution to eliminate forensic evidence of the postinstall hook |
| **T1070.003** | Indicator Removal: Rename or Move Files | Defense Evasion | `package.md` was renamed to `package.json` to restore a clean package manifest, obscuring the attack mechanism from post-incident investigators |
| **T1564.001** | Hide Artifacts: Hidden Files and Directories | Defense Evasion | macOS payloads were initially staged in randomly named hidden temp files (`/private/tmp/.XXXXXX`) before being moved to their final paths |
| **T1116** | Code Signing | Defense Evasion | On macOS, the RAT binary was ad-hoc code signed (`codesign --force --deep --sign -`) to bypass Gatekeeper without requiring a legitimate Apple developer certificate |
| **T1218** | System Binary Proxy Execution | Defense Evasion | `osascript` (a signed Apple binary) was used as a proxy to download and execute the macOS RAT, evading controls that block unsigned executables |
| **T1547.001** | Boot or Logon Autostart Execution: Registry Run Keys | Persistence | On Windows, the malware created `HKCU\...\Run\MicrosoftUpdate` pointing to `system.bat`, ensuring the RAT was re-fetched and executed on every user logon |
| **T1053.003** | Scheduled Task/Job: Unix Shell Script | Persistence | On macOS and Linux, `nohup` was used to launch payloads detached from the terminal session, surviving session termination |
| **T1105** | Ingress Tool Transfer | Command and Control | Platform-specific RAT binaries and scripts were downloaded from the C2 server (`sfrclak.com:8000/product[0-2]`) during the dropper execution phase |
| **T1219** | Remote Access Software | Command and Control | All platform variants deployed fully functional RATs with remote command execution, process control, and file system access capabilities |
| **T1071.001** | Application Layer Protocol: Web Protocols | Command and Control | RATs beaconed to the C2 server every 60 seconds via plain HTTP POST, with payloads Base64-encoded and traffic patterns designed to mimic npm registry requests |
| **T1041** | Exfiltration Over C2 Channel | Exfiltration | System fingerprint data (hostname, username, OS version, timezone, CPU, processes, directory listings) was exfiltrated to the C2 server via the same HTTP POST channel used for command receipt |
| **T1082** | System Information Discovery | Discovery | All RAT variants collected comprehensive system information: hostname, username, OS version, timezone, CPU type, OS install date, boot time |
| **T1057** | Process Discovery | Discovery | All RAT variants enumerated running processes and transmitted the list to the C2 server |
| **T1083** | File and Directory Discovery | Discovery | RATs enumerated directory structures including `/Applications`, `~/Library`, `~/Application Support` (macOS) and equivalent Windows paths |
| **T1005** | Data from Local System | Collection | The macOS RAT specifically collected data from application directories and local system inventory for exfiltration to the C2 |
| **T1074** | Data Staged | Collection | On macOS, the received binary was written to a hidden temp file (`/private/tmp/.XXXXXX`) before being moved and executed |
| **T1552** | Unsecured Credentials | Credential Access | Developer workstations and CI/CD environments commonly store secrets in environment variables, config files, and `.env` files — all accessible to the RAT's command execution capability |

---

*Report generated by [TI Mindmap HUB](https://ti-mindmap-hub.com) — Automated Threat Intelligence Platform*  
*Generation date: 2026-03-31 | Sources: 7 reports | Classification: TLP:WHITE*
