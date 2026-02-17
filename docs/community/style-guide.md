---
title: Docs Style Guide
description: Writing standards and conventions for TI Mindmap HUB documentation.
---

# Docs Style Guide

Concise guidelines for writing and formatting TI Mindmap HUB documentation.

---

## General Principles

- **Be concise.** Say what needs to be said, then stop.
- **Be specific.** Prefer concrete examples over abstract descriptions.
- **Be honest.** Document limitations alongside capabilities.
- **Audience first.** Write for security practitioners and researchers who value precision.

---

## Page Structure

Every page should have:

1. **Front matter** with `title` and `description`:
    ```yaml
    ---
    title: Page Title
    description: One-sentence summary for search engines and link previews.
    ---
    ```
2. **H1 heading** matching the title
3. **Opening paragraph** explaining what this page covers
4. **Sections** using H2 (`##`) and H3 (`###`) headings
5. **Links to related pages** at the bottom

---

## Formatting Conventions

| Element | Convention |
|---------|-----------|
| Product name | **TI Mindmap HUB** (full name on first use per page) |
| STIX version | STIX 2.1 (not STIX2.1 or STIX 2) |
| ATT&CK references | MITRE ATT&CK (not MITRE Att&ck or MITRE attack) |
| Technique IDs | `T1566.001` (in code font) |
| IOC values | In code font: `198.51.100.42`, `example.com` |
| API keys | Always use placeholders: `tim_your_api_key_here` |
| File paths | In code font with forward slashes |

---

## Links

- Use **relative links** between docs pages: `[Methodology](../concepts/methodology.md)`
- Use **absolute URLs** for external sites
- Never hardcode `docs.ti-mindmap-hub.com` in internal links

---

## Admonitions

Use MkDocs Material admonitions for callouts:

```markdown
!!! warning
    Verify IOCs before operational use.

!!! note
    This feature is in beta.

!!! danger "Critical"
    Never commit API keys to version control.
```

---

## Code Blocks

Always specify the language:

````markdown
```json
{"type": "bundle", "id": "bundle--uuid"}
```

```bash
pip install stix2-validator
```

```python
from stix2 import parse
```
````

---

## Embedding Videos

Use the responsive wrapper class defined in `assets/stylesheets/extra.css`:

```html
<div class="video-wrapper">
  <iframe
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    title="Descriptive title for accessibility"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

- Use `youtube-nocookie.com` domain for privacy-enhanced embeds
- Always include a `title` attribute for accessibility
- Never add `cookie` or tracking parameters to the embed URL

---

## Security Sensitivity

When writing documentation:

- **Never** include real API keys, tokens, or credentials
- **Never** expose internal infrastructure details (hostnames, IP ranges, internal URLs)
- **Never** describe attack techniques in actionable detail
- **Always** use RFC 5737 documentation IPs (192.0.2.x, 198.51.100.x, 203.0.113.x)
- **Always** use placeholder domains (example.com, malicious-example-domain.com)
- **Always** sanitize example outputs
