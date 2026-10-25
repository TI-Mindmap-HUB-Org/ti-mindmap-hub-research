---
title: "Threat Intelligence Report: Storm-0940, ARTEX and ConnectWise Cloud Credential Abuse"
date: "2026-10-25"
severity: "CRITICAL"
classification: "TLP:CLEAR"
description: "Cross-source analysis of ConnectWise application-credential abuse, downstream Microsoft 365 access and cloud persistence, with a three-month review of related ARTEX reporting."
tags:
  - storm-0940
  - artex
  - connectwise
  - skykick
  - supply-chain
  - microsoft-365
  - entra-id
  - service-principal
  - cloud-persistence
  - agentic-ai
sources_count: 11
core_reports_count: 6
context_reports_count: 5
research_window_start: "2026-07-25"
research_window_end: "2026-10-25"
author: "TI Mindmap HUB - Cross-source synthesis"
---

# Threat Intelligence Report: Storm-0940, ARTEX and ConnectWise Cloud Credential Abuse

**Scope:** ConnectWise/SkyKick application-credential abuse and the associated Storm-0940 campaign, with an archive review covering 2026-07-25 through 2026-10-25. Intelligence was obtained exclusively through TI Mindmap HUB MCP; no external webpages, tenant queries or live infrastructure were accessed.

**Evidence convention:** attributed findings reflect HUB's retrieved summaries, IOC records and available source text, not independent incident verification. Recommendations and analytical ATT&CK mappings are identified as such. Shared software, infrastructure or language artifacts are not sufficient to merge threat actors. Classification is assigned to this synthesis, not asserted for every underlying source.

## 1. Reports Summary Table

The corpus contains **11 articles from ten publishers**: five directly cover the ConnectWise incident, one covers the broader linked Storm-0940 vendor-targeting campaign, and five provide separate ARTEX context. Dates are **HUB record dates**, not independently verified original publication dates: publication and ingestion fields commonly coincide. Microsoft's original article URL is dated October 21, while HUB records October 22.

| # | Title | HUB Date | Source | Platform Link |
|---|-------|----------|--------|---------------|
| 1 | Storm-0940 ARTEX attacks: ConnectWise app abuse and Okta sign-ups | 2026-10-24 | Expel | [View Report](https://ti-mindmap-hub.com/report/a881039b-93e7-4b3f-9006-131b668e18e9) |
| 2 | ARTEX in the Wild: Storm-0940 Expands Targeting of IT and Software Vendors | 2026-10-22 | Wiz | [View Report](https://ti-mindmap-hub.com/report/48a0a433-52bb-401e-9e72-bdf5cc264534) |
| 3 | ConnectWise Cloud Backup Issue Investigation | 2026-10-22 | ConnectWise | [View Report](https://ti-mindmap-hub.com/report/f6401972-1d84-4e22-b87a-2f4efdb44493) |
| 4 | AI-driven, large-scale nation-state campaign using ARTEX enables supply chain compromise | 2026-10-22 | Microsoft | [View Report](https://ti-mindmap-hub.com/report/7f3a36c2-537d-425e-8388-299e0a88d53c) |
| 5 | ConnectWise Cloud Backup application abused in cross-tenant token sweep | 2026-10-20 | Sophos | [View Report](https://ti-mindmap-hub.com/report/8a4bfa32-9405-4803-a091-9eb4874599f9) |
| 6 | ConnectWise (SkyKick) Vendor Credentials Abused in M365 Attacks | 2026-10-17 | Huntress | [View Report](https://ti-mindmap-hub.com/report/26c1786f-dfb2-43d1-9280-61681d670479) |
| 7 | **Context:** Inside a Global AI-Assisted Hacking Campaign | 2026-10-22 | Zscaler | [View Report](https://ti-mindmap-hub.com/report/1d8e6d83-935d-4938-87cc-db67ad318f34) |
| 8 | **Context:** Threat Actor Abuses Agentic AI Pentesting Framework to Target South Korean Financial Institutions | 2026-10-19 | Zscaler | [View Report](https://ti-mindmap-hub.com/report/9e26b04a-52d1-4ad5-8ec9-bcb2128ba51f) |
| 9 | **Context:** Confirmed that many of the sources of the successive unauthorized access attacks are AI | 2026-10-19 | GMO Cybersecurity | [View Report](https://ti-mindmap-hub.com/report/d0059ddb-9e0c-4414-bf22-f1f3cd132da6) |
| 10 | **Context:** TAG-217 Targets South Korean Financial Services with ARTEX | 2026-10-16 | Recorded Future | [View Report](https://ti-mindmap-hub.com/report/58b51a75-88a5-48f4-b435-b302eb5a4b14) |
| 11 | **Context:** AI-Driven tool ARTEX used in attacks against South Korean Banks | 2026-10-11 | Security Affairs | [View Report](https://ti-mindmap-hub.com/report/39ec7424-4b79-4e3c-b22d-9c3ba47b2064) |

**Exclusions:** archive matches for August 29 ScreenConnect abuse and September 30 RMM phishing concern different product-abuse chains. No retrieved evidence ties them to this application-credential incident. They are not counted as earlier Storm-0940/ConnectWise reports. Secondary summaries of the same observations are not independent victim confirmations.

---

## 2. Executive Summary

### Overview

Microsoft attributes the compromise of ConnectWise's multi-tenant cloud applications to **Storm-0940**, a China-state-aligned actor active since 2021. The attacker used vendor-controlled application authentication material to request tokens and access downstream Microsoft 365 tenants through permissions customers had already granted. **ARTEX**, an agentic penetration-testing framework, accelerated reconnaissance, authentication attempts and follow-on cloud operations. This is not evidence of a newly disclosed Microsoft vulnerability or a poisoned software update.

The incident illustrates an identity supply-chain failure: trust in a vendor application can expose many tenants without compromising each customer's user password. Application-only access also means that user MFA and password changes do not directly remediate the abused credential path.

Huntress confirmed unauthorized sign-ins in **162 tenants** by 19:00 UTC on October 16. Microsoft reports attempted access to **more than 2,250 tenants**, and privileged persistence in multiple organizations. Those figures describe different populations and outcomes and must not be combined into a compromise rate. Installed applications, successful authentication, data access and exfiltration are distinct evidentiary stages.

### Diagram: Attack Flow Overview

```text
Compromise of vendor application authentication material
                 | initial acquisition mechanism unresolved
                 v
Trusted ConnectWise / SkyKick multi-tenant applications
                 |
ARTEX-assisted app-only token requests across customer tenants
                 |
                 +--> Failed requests / no effective permission
                 |
                 +--> Successful authentication and Graph access
                                   |
                     Directory / permission reconnaissance
                                   |
                     +-------------+--------------------+
                     v                                  v
             Privileged role changes          Secrets added to other apps
                     |                                  |
                     +--------------+-------------------+
                                    v
                 Persistence beyond original vendor identity

Separate branch: user password spraying -> many failures;
not demonstrated as the source of the vendor application's credentials.
```

### Attribution & Threat Actor

**Storm-0940 attribution:** Microsoft assesses the actor as responsible for the ConnectWise compromise and describes a broader campaign beginning as early as September. Wiz reports overlapping infrastructure, tooling and behavior against software vendors. Individual earlier Huntress phases lacked enough source-IP evidence to independently tie every event to one operator; preserve that distinction even when discussing Microsoft's broader attribution.

**ARTEX is not an actor identity.** Recorded Future's **TAG-217**, the financial operator covered by Zscaler and Security Affairs, and GMO's Japanese incident observations must not automatically become Storm-0940 operations. Shared framework use, Chinese-language artifacts or overlapping generic clients do not prove common control.

### Three-Month Historical Assessment

| Historical layer | What the archive establishes | What it does not establish |
|------------------|------------------------------|----------------------------|
| July | Wiz describes ARTEX's initial open-source publication | A July report or July ConnectWise compromise |
| August 17 onward | Recorded Future places preparations for the separate TAG-217 operation in this period | Storm-0940 ownership of that infrastructure |
| September | Microsoft retrospectively places the broader Storm-0940 ARTEX campaign as early as September; financial/Japanese activity also predates disclosure | One continuous, single-actor campaign across all ARTEX users |
| October 11 and 16 reporting | Security Affairs and Recorded Future cover earlier ARTEX financial-sector activity | Earlier direct public reporting of this ConnectWise credential incident |
| October 17 reporting | Huntress provides the earliest direct ConnectWise article found in the selected archive search | The first-ever public disclosure anywhere, or the exact date the credential was initially stolen |

**Finding:** extending beyond one week adds a material direct source, Huntress on October 17, plus earlier ARTEX reporting. In the retrieved corpus, the documents selected for the specific incident remain October-dated; operational histories go back further. No directly linked July/August ConnectWise incident article was found in these searches.

---

## 3. Technical Details

### 3.1 Access and Persistence Analysis

#### Stage 0: Vendor Credential Compromise

Huntress describes client-assertion evidence placing the abused credential in the vendor environment. The retrieved evidence does not resolve how ConnectWise's authentication material was first obtained. Failed user password spraying is documented but is not established as that acquisition mechanism. Microsoft states the incident did not originate from a compromise or vulnerability in Microsoft systems, products or services.

#### Stage 1: Cross-Tenant Application Authentication

The attacker requested Microsoft Graph tokens using established ConnectWise application identities. Tenant access depended on the customer's existing consent and effective permissions. Sophos observed one app-only token request per targeted tenant in its telemetry, including historical integrations without active backup subscriptions. Huntress observed tenant GUIDs processed in sorted order and seconds between requests, consistent with automation.

Potentially available resources included directory information, email, Teams, SharePoint and OneDrive, depending on the application's actual permissions. These permissions describe possible access, not demonstrated collection from every tenant. User-password resets alone do not revoke a compromised application credential or remove attacker-created secondary credentials.

#### Stage 2: Roles and Secondary Application Credentials

Huntress observed one tenant where a Cloud Management-MS Teams application assigned itself Global Administrator and modified two other applications. Between **03:44 and 03:49 UTC on October 15**, nine changes included six successes and three failures. Unauthorized client secrets expiring in 2028 were planted in a legitimate MSP management application and a tenant-specific Huntress Security Platform application. A certificate addition failed with a thumbprint mismatch.

Such changes can preserve access through other identities after the original vendor credential is rotated. They do not establish that the MSP application's downstream customers were subsequently compromised. The earlier changes preceded the first observed `.128` token-sweep authentication in that tenant by roughly 2.5 hours; Huntress lacked source-IP evidence to independently connect those phases.

At approximately 01:58 UTC that day, around 50 monitored tenants also showed ConnectWise Cloud Management role assignments, mostly Exchange Administrator. The `kiota-dotnet` client suggested possible vendor automation, but legitimacy had not been confirmed by Huntress. Those events must not all be labeled attacker escalation without additional evidence.

#### Stage 3: Broader Identity Targeting

Wiz describes source-map and API discovery, password-recovery probing, cross-tenant authorization tests and malformed OAuth/JWT attempts against software vendors. Many returned HTTP 401/403. Expel separately observed Okta self-registration, authenticator enrollment and SSO activity from overlapping infrastructure; **no ConnectWise application was involved in that Okta case**. Treat it as related investigative context, not another proven ConnectWise customer compromise.

### 3.2 Operational Timeline and Exposure Metrics

| Date / time, 2026 | Observation | Source / evidentiary boundary |
|------------------|-------------|-------------------------------|
| October 10-14 | Over 151,000 failed authentications targeting 327 accounts across eight organizations | Microsoft; no successful authentication, token issuance, Graph call or directory change observed from this particular spray |
| October 11 | Over 111,000 failures; peak near 2,900 failures/minute | Microsoft; failed-spray metric, not downstream compromise count |
| October 13-14 | Failed spraying against four law-firm tenants | Huntress; no successful user sign-ins observed |
| October 15, 01:58 UTC onward | Role assignments across about 50 monitored tenants | Huntress; possible vendor activity, legitimacy unresolved |
| October 15, 03:44-03:49 UTC | Privileged role and application-credential changes in one examined tenant | Huntress; earlier phase not independently tied by source IP to the later sweep |
| October 15, 06:13-08:34 UTC | Unauthorized application authentication/token activity | Huntress observation window |
| October 15, 07:11-08:47 UTC | Cross-tenant token sweep | Sophos observation window; different cadence and coverage |
| October 16, 19:00 UTC | 162 tenants with confirmed unauthorized sign-ins | Huntress snapshot; not all ConnectWise customers |
| October 17 | Nearly 1,000 tenants with activity and over 300 successful sign-ins, relayed later by Expel | Successful events are not necessarily distinct tenants; do not add to the 162 snapshot |
| October 17, approximately 05:00 UTC | Vendor mitigations begin; seven affected identities disabled | ConnectWise; customer-side persistence still requires investigation |
| October 19 | Affected-environment account/credential reset completed | ConnectWise |
| October 21 onward | Phased restoration begins | Vendor October 22 snapshot does not prove completion by October 25 |
| Broader campaign | More than 2,250 tenants targeted; some targeting-to-privileged-access sequences under three hours | Microsoft; attempted reach and selected successful cases are different measures |

Microsoft also reports approximately 2,900 sign-in attempts/minute for downstream ARTEX activity. That must not be confused with the separately reported October 11 peak of 2,900 **failed user authentications/minute**.

### 3.3 Cross-Source Discrepancies and Visibility Limits

| Topic | Source findings | Assessment |
|-------|-----------------|------------|
| Follow-on persistence | Huntress documents unauthorized secrets/roles; Sophos found no new credentials, grants or interactive follow-on activity in its reviewed tenants | Different observed tenant sets; not a global contradiction |
| Data compromise | Microsoft discusses privileged activity and historical actor tradecraft; successful sign-ins are confirmed | Do not assert incident-wide email exfiltration from historical behavior or detection descriptions |
| Backup archives | ConnectWise reports no evidence of access to encrypted backup archives | Does not clear Microsoft 365 data or customer-side identities |
| Activity after mitigation | Vendor reports no observed successful threat activity in environments it monitors after mitigation began | Limited downstream visibility; not proof that all customer persistence ended |
| Actor scope | Microsoft: Storm-0940; Recorded Future/Zscaler: separate financial-operator reporting | Keep actors and infrastructure sets separate |
| Financial-campaign victims | Recorded Future cites 68,000 people in public reporting; Zscaler approximately 67,000 | Source-specific estimates for a separate campaign; not ConnectWise victims |

---

## 4. Detection Opportunities

### 4.1 Identity and Authentication Detections

- Inventory relevant enterprise applications by **App ID**, not display name. Include historical consents and dormant vendor integrations.
- Review service-principal sign-ins and token activity, explicitly separating failures, successes, effective permissions and downstream operations.
- Correlate source IP, application ID, resource, user agent and time; programmatic clients or a successful sign-in alone do not establish malicious data access.
- Investigate app-only access from unexpected networks and automated requests traversing multiple tenants. Do not assume user MFA covers application authentication.

### 4.2 Persistence and Privilege Detections

- Review all applications for unexpected secrets, certificates, owners, grants and role assignments; scope is broader than the affected ConnectWise identities.
- Prioritize self-assignment of privileged roles and credentials added to existing trusted applications, including MSP and security-product integrations.
- Separate unconfirmed vendor automation from confirmed malicious changes. Preserve operation outcomes and failure details, not just event names.
- Investigate unusual credential expiry, authorization changes and activity by secondary applications after the original vendor identity was disabled.

### 4.3 Data-Access Correlation

- Correlate Entra records with existing Microsoft Graph, Microsoft 365 and Purview audit coverage to assess directory, mailbox, SharePoint, OneDrive and Teams access.
- Examine forwarding rules, unusual downloads, high-volume reads and unexpected application access where telemetry is available. These are hunting leads, not asserted observations in every affected tenant.
- Absence of Entra directory-change events does not establish absence of Graph read operations. Retention gaps and missing workloads must remain explicit investigation limitations.

### 4.4 Broader Campaign Detections

- Hunt for source-map retrieval followed rapidly by calls to newly discovered internal APIs, repeated recovery/registration attempts and cross-tenant authorization probes.
- Correlate Okta self-registered accounts, new authenticator enrollments and unusual OAuth/SSO activity with supporting infrastructure evidence, without treating the separate Okta case as ConnectWise access.
- Track password-spray outcomes separately from service-principal use; many reported sprays failed completely.

### 4.5 Retrospective Hunt Window

Prioritize service-principal and cloud changes from **October 1**, with detailed review of **October 10-14** failed sprays, application/audit changes from **October 13**, and vendor-application/Graph activity on **October 15-17**. Continue through the reporting cutoff and until secondary persistence is resolved. Preserve older records in the three-month window where available for correlation, not because a July compromise is established.

Microsoft's minimum narrative review begins October 15, sample hunting reaches October 13, and extended guidance reaches October 1. These are investigation boundaries, not confirmed credential-theft dates. Hunting suggestions here were not executed against any tenant.

---

## 5. Conclusion

1. **The trust boundary is the vendor application.** Previously granted permissions enabled cross-tenant access attempts without separately obtaining every customer's password.
2. **Persistence can survive initial containment.** Rotating the original vendor credential does not remove unauthorized secrets or privileges planted in other applications.
3. **Attempted reach is not confirmed compromise.** More than 2,250 targeted tenants, 162 tenants with unauthorized sign-ins in one snapshot, and successful-event counts are not interchangeable.
4. **Automation compresses response time.** Microsoft reports rapid privileged access in selected cases, while many other attempts failed. ARTEX is an accelerator, not proof of universal success.
5. **Historical ARTEX reporting is relevant but multi-actor.** Earlier financial/Japanese cases add context without establishing a common operator or a July/August ConnectWise incident.

**Recommended Immediate Actions:**
- Preserve service-principal sign-ins, application configuration, consent state and audit evidence while containing promptly.
- Disable affected integrations where required; avoid deleting identities before evidence capture. Validate vendor restoration and credential-rotation instructions for each service.
- Inspect the entire tenant for unauthorized credentials, owners, grants and roles, then remove confirmed secondary persistence.
- Review tokens, sessions and resource access according to the affected services' revocation behavior; do not assume rotating one credential immediately invalidates every already issued token.
- Investigate tenant data access independently of backup-archive assurances and vendor-side visibility.
- Reduce application permissions, maintain an inventory of multi-tenant consents and alert on high-risk application identity changes.

---

## 6. Indicators of Compromise (IoC List)

IP addresses are defanged and time-bounded investigative leads. Legitimate application IDs and vendor tenant IDs are **exposure/correlation identifiers**, not intrinsically malicious objects. Shared or reassigned infrastructure requires context. The retrieved core evidence provides no campaign payload hash set; none is invented.

### 6.1 Network Indicators - Incident and Linked Campaign

| Type | Value | Description / provenance |
|------|-------|--------------------------|
| IPv4 | `144.172.64[.]128` | Huntress October 13/14 failed sprays and October 15 application activity; Sophos October 15 token sweep; Microsoft/vendor corroboration |
| IPv4 | `144.172.64[.]99` | Microsoft October 10-14 failed spray and later application activity; Expel October 13/14 Okta case; not independently seen by Sophos |
| IPv4 | `144.172.64[.]60` | Microsoft/vendor incident infrastructure; individual first-seen time not established here |
| IPv4 | `187.15.88[.]186` | Microsoft: VPN exit used for Graph access through compromised applications, October 15-16 |
| IPv4 | `187.15.90[.]217` | Same time-bounded Microsoft context |
| IPv4 | `187.15.89[.]186` | Same time-bounded Microsoft context |
| IPv4 | `104.194.150[.]21` | Wiz broader vendor-targeting campaign; not established as a ConnectWise token-sweep source |
| IPv4 | `167.88.172[.]97` | Wiz broader vendor-targeting campaign; same boundary |

### 6.2 Application and Tenant Identifiers

Huntress identifies the first seven applications. Microsoft independently highlights Cloud Backup, MS Teams and MS Graph. Expel supplies the eighth App ID without a resolved display name in the retrieved summary. **Eight hunting identifiers do not imply eight vendor-disabled identities**: ConnectWise reports seven disabled identities.

| Application / object | Identifier | Interpretation |
|----------------------|------------|----------------|
| ConnectWise Cloud Backup | `506e08f9-6e9a-4da4-942b-a099a03644ae` | Legitimate application to inventory and investigate |
| Cloud Management-MS Teams | `24205314-2b89-4e07-a2a4-579e898a5640` | Involved in the Huntress persistence case |
| Cloud Management | `2399d300-6fca-4e6a-a686-399fefe75b83` | Review role assignments; some observed automation remained unconfirmed |
| Exchange Online integration | `b78f6a77-d4e5-46fb-87e5-d1648bd02519` | Vendor integration identifier, not the Microsoft resource's universal identity |
| Microsoft Graph integration | `0de14c77-b9b0-4137-9360-34878a929827` | Vendor integration identifier |
| Partner Center integration | `412dcf96-176d-4b3a-a1b0-4981ad66971e` | Vendor integration identifier |
| SharePoint Online integration | `b2b55f5b-7758-4719-8d8f-88ae172e6bdb` | Vendor integration identifier |
| Additional ConnectWise/SkyKick App ID | `c921256f-04a7-44e8-9b2a-69c33929ba19` | Expel; display name not resolved here |
| Vendor tenant | `3f9cd7a0-127a-4ed4-bf06-2f830d5616b7` | Huntress correlation identifier; not an attacker-owned tenant assertion |

### 6.3 Client and Behavioral Artifacts

| Type | Value / behavior | Qualification |
|------|------------------|---------------|
| User agent | `Python-urllib/3.12` | Microsoft; correlate with app, IP and operation |
| User agent | `python-requests/2.31` | Huntress/Sophos exact reported variant |
| User agent | `python-requests/2.31.0`, `python-requests/2.34.2` | Microsoft variants; retain exact strings |
| User agent | `curl/7.88.1`, `azure-toolkit/1.0` | Microsoft; generic clients are not attribution by themselves |
| User agent | `ReconProbe/1.0`, `norma/0.4` | Wiz broader campaign, not specifically proven in the token sweep |
| Persistence | Secrets added to trusted applications, some expiring in 2028 | Huntress examined-tenant evidence |
| Privilege change | Application self-assignment of Global Administrator | Huntress specific case; not observed in every tenant |
| Request pattern | Automated tenant traversal, app-only Graph token requests | Distinguish issuance from downstream data reads |
| Possible benign overlap | `kiota-dotnet` | Unconfirmed vendor automation in Huntress observations; not a standalone malicious IOC |

Huntress's private IPv6 observations also overlapped legitimate activity and are not promoted into external malicious infrastructure indicators.

### 6.4 Separate ARTEX Financial-Campaign Context

The following indicators belong to Zscaler's financial-operator reporting, **not established Storm-0940/ConnectWise infrastructure**. Keep them in a separately labeled intelligence set.

| Type | Value | Context |
|------|-------|---------|
| IPv4 range | `23.248.226[.]250` through `23.248.226[.]254` | Financial-campaign work servers, Zscaler |
| IPv4 | `38.244.50[.]120` | Financial-campaign jump server; also referenced by Security Affairs |
| IP:port | `154.201.79[.]246:443` | Financial-campaign proxy API |
| IP:port | `205.214.59[.]31:443` | Financial-campaign SOCKS endpoint |
| IP:port | `161.8.161[.]140:11005` | Financial-campaign SOCKS endpoint |

Public AI service use, Chinese-language text or an ARTEX artifact alone is insufficient to assign these indicators to Storm-0940.

---

## 7. MITRE ATT&CK Techniques

Mappings distinguish observed actions, analytical descriptions and unresolved acquisition steps. Framework capabilities and permissions alone are not evidence of collection or exfiltration.

| Technique ID | Technique Name | Tactic | Evidence / boundary |
|--------------|----------------|--------|---------------------|
| T1195 | Supply Chain Compromise | Initial Access | Analytical description of vendor-trust abuse; no poisoned software update established |
| T1078.004 | Valid Accounts: Cloud Accounts | Initial Access / Persistence | Compromised application-identity authentication; app-only path rather than proven user-account takeover in every tenant |
| T1110.003 | Password Spraying | Credential Access | Documented user-authentication sprays; the specific Microsoft October 10-14 spray had no observed successes |
| T1098.001 | Additional Cloud Credentials | Persistence | Secrets planted in existing trusted applications in the Huntress case; Microsoft broader campaign reporting |
| T1098.003 | Additional Cloud Roles | Persistence / Privilege Escalation | Confirmed malicious privileged-role change; other possibly vendor-generated changes remain unresolved |
| T1087.004 | Account Discovery: Cloud Account | Discovery | Directory/account reconnaissance through Graph where observed |
| T1580 | Cloud Infrastructure Discovery | Discovery | Microsoft campaign description; not proof every targeted tenant was enumerated |
| T1595 | Active Scanning | Reconnaissance | Wiz broader vendor campaign; many probes failed |
| T1528 | Steal Application Access Token | Credential Access | Listed by Microsoft, but initial acquisition is unresolved; obtaining a token using stolen application credentials does not itself demonstrate token theft |

No incident-wide exfiltration technique is asserted solely because applications could read mail or because Storm-0940 historically exfiltrated email. The separate Okta and financial-operator cases are not silently merged into this mapping.

---

*Cross-source synthesis using TI Mindmap HUB MCP only.*
*Analysis date: 2026-10-25 | Research window: 2026-07-25 to 2026-10-25 | Included articles: 11 (6 incident/linked campaign, 5 separate ARTEX context) | Classification: TLP:CLEAR.*