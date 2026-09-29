---
title: Account & Access
description: How to sign in to TI Mindmap HUB, what is available without an account, and how to manage your profile, newsletter, and MCP Server API keys.
---

# Account & Access

TI Mindmap HUB is free to use for research and educational purposes. Most features require an account; a few pages are public.

---

## Public Pages

These pages are available without signing in:

| Page | Path | What you get |
|------|------|--------------|
| **Landing page** | [`/landingpage`](https://ti-mindmap-hub.com/landingpage) | Overview of the platform and its capabilities, with a **Sign In** call to action |
| **Research Project** | [`/research`](https://ti-mindmap-hub.com/research) | Research scope, areas of investigation, methodology, and documented limitations of AI in CTI |
| **Agentic Reports** | [`/analytics`](https://ti-mindmap-hub.com/analytics) | Full library of cross-source intelligence reports — see [Agentic Reports](agentic-reports.md) |
| **Single Agentic Report** | `/analytics/{slug}` | Permanent, shareable link to one report |
| **Terms of Service** | [`/terms`](https://ti-mindmap-hub.com/terms) | Terms of use (research, non-commercial, AS-IS) |
| **Privacy Policy** | [`/privacy`](https://ti-mindmap-hub.com/privacy) | What data is collected and how it is used |

Everything else — the report dashboard, report analyses, IOC/CVE search, entities, STIX bundles, the knowledge graph, the weekly briefing, statistics, the MCP page, and your profile — requires sign-in.

---

## Signing In

### The sign-in screen

When you open a protected page while signed out, you see the **TI Mindmap HUB** sign-in screen. It shows:

- Three feature highlights: **AI-Generated Analysis & Summaries**, **Automated IOC & STIX Extraction**, **Agentic Threat Intelligence**
- A **Generative AI Content** notice: *All summaries and analyses are AI-generated. Please verify critical information against original sources.*
- A consent checkbox: **I agree to the Terms of Service and Privacy Policy**

### Steps

1. Tick the consent checkbox (the **Sign In** button stays disabled until you do)
2. Click **Sign In**
3. Complete the Microsoft sign-in page (Azure AD B2C). New users can create an account from the same page
4. On first sign-in in a browser session, a **Welcome to TI Mindmap HUB Beta** dialog explains the experimental nature of the platform. Click **I Understand, Continue to Platform**

After sign-in you land on the [Threat Reports](dashboard.md) dashboard — or on the page you originally requested if you followed a direct link (for example, a shared report URL).

### Signing out

Open the user menu (top right) and choose **Logout**.

---

## My Profile

Open the user menu and choose **My Profile** (`/profile`).

| Field | Editable | Notes |
|-------|:--------:|-------|
| Email Address | No | Taken from your sign-in account |
| Display Name | Yes | Your preferred name |
| Job Title | Yes | Optional |
| Last Login | No | Timestamp of your latest sign-in |
| **Subscribe to weekly newsletter** | Yes | Toggle to receive the weekly newsletter by email |

Click **Save Changes** to apply edits.

---

## MCP Server API Keys

API keys let external tools — IDEs, agents, and scripts — query TI Mindmap HUB on your behalf through the [MCP Server](../mcp/index.md). You manage them in **My Profile → MCP Server API Keys**.

!!! tip "Do you need a key?"
    OAuth-capable clients (Claude, ChatGPT, Copilot Studio with OAuth, and recent versions of VS Code, Cursor, and Claude Code) sign you in with your TI Mindmap HUB account and **do not** need an API key. Keys are needed for agent frameworks (Foundry, OpenAI Responses API), scripts, shared agents, and clients without OAuth support.

### Create a key

1. Click **Generate Key**
2. Enter a **Key Name** (for example, `VS Code laptop`)
3. Click **Generate**
4. Copy the key from the **New API Key Created — Save it now!** panel

!!! danger "The key is shown only once"
    Store it in a password manager or secret store. If you lose it, regenerate or revoke it and create a new one.

### Key lifecycle

| Property | Value |
|----------|-------|
| Format | `tim_` followed by a random string |
| Maximum active keys | 5 per account |
| Validity | 365 days from creation |
| Status values | `Active`, `Expired`, `Revoked` |
| Storage | Only a SHA-256 hash and an 8-character prefix are stored server-side |

From the keys table you can:

- **Regenerate** a key — issues a new secret with the same name; the old secret stops working
- **Revoke** a key — permanently disables it (cannot be undone)

---

## Other Pages

| Page | Path | Content |
|------|------|---------|
| **Research Project** | `/research` | Research areas, limitations, methodology, and future work (also public) |
| **Roadmap** | `/roadmap` | Planned capabilities under research |
| **About** | `/about` | Project description, audience, independence disclaimer |
| **Feedback** | `/feedback` | Email, X/Twitter, GitHub issues and discussions |
| **Documentation** | external | Opens this documentation site |

---

## Data and Privacy at a Glance

- Sign-in is handled by Azure AD B2C; the platform receives your name and email
- Submitted URLs are stored to process the article
- User data is **not** used to train AI models
- You can request access, correction, or deletion of your data at [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)

The authoritative text is the in-app [Privacy Policy](https://ti-mindmap-hub.com/privacy). See also [Security & Privacy](../security/index.md).
