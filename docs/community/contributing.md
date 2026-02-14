---
title: Contributing
description: How to contribute to TI Mindmap HUB — documentation improvements, STIX examples, source suggestions, and academic collaboration.
---

# Contributing

Thank you for your interest in contributing to TI Mindmap HUB. This guide covers how to submit improvements to this documentation and research repository.

---

## Contribution Types

### 1. Documentation Improvements

Help improve these docs:

- Fix typos or clarify explanations
- Add examples or diagrams
- Improve navigation or structure
- Translate documentation

### 2. STIX Examples

Contribute example STIX bundles:

- Real-world examples (sanitized — no live IOCs)
- Edge-case examples for validation testing
- Integration examples for specific platforms

### 3. Source Suggestions

Suggest new OSINT sources for monitoring. Open an issue using the **Feature Request** template.

### 4. Academic Collaboration

We welcome research partnerships. See [Academic Collaborations](../research/academic-collaborations.md) for details.

### 5. Bug Reports and Feedback

Report incorrect outputs or platform issues using the **Bug Report** issue template.

---

## How to Submit Changes

### Pull Request Process

1. **Fork** the repository
2. **Create a branch** with a descriptive name:
    ```bash
    git checkout -b docs/improve-methodology
    ```
3. **Make your changes** following the [Docs Style Guide](style-guide.md)
4. **Test locally** — run `mkdocs serve` to preview
5. **Commit** with a clear message:
    ```bash
    git commit -m "docs: clarify IOC extraction pipeline description"
    ```
6. **Push** to your fork and **open a Pull Request**

### Commit Message Format

Use conventional commits:

```
type: short description

Optional longer explanation.
```

| Type | Use For |
|------|---------|
| `docs` | Documentation changes |
| `fix` | Corrections and bug fixes |
| `feat` | New content or features |
| `chore` | Maintenance and tooling |

---

## Adding a New Page

1. Create a Markdown file in the appropriate `docs/` subdirectory
2. Add front matter with `title` and `description`
3. Add the page to the `nav` section in `mkdocs.yml`
4. Use relative links to reference other pages
5. Test with `mkdocs serve`

## Adding a Video Page

1. Create a new `.md` file in `docs/videos/`
2. Use the responsive embed pattern:
    ```html
    <div class="video-wrapper">
      <iframe
        src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID"
        title="Descriptive title"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    ```
3. Add the page to the `nav` in `mkdocs.yml`
4. Link from `docs/videos/index.md`

---

## Recognition

Contributors are acknowledged in:

- Repository CONTRIBUTORS.md file (for significant contributions)
- Platform "About" page
- Research publications (for academic collaborators)

---

## Questions?

- **Documentation issues:** [Open a GitHub issue](https://github.com/TI-Mindmap-HUB-Org/ti-mindmap-hub-research/issues)
- **Academic collaboration:** [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
- **General questions:** [info@ti-mindmap-hub.com](mailto:info@ti-mindmap-hub.com)
