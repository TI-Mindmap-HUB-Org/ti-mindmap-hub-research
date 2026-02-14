---
title: "Deployment: Azure Static Web Apps"
description: How to deploy the TI Mindmap HUB documentation site to Azure Static Web Apps on the Free plan with a custom domain.
---

# Azure Static Web Apps Deployment

This guide covers deploying the TI Mindmap HUB documentation site to [Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/) on the Free plan with the custom domain `docs.ti-mindmap-hub.com`.

---

## Architecture Overview

```
GitHub (push to main)
  → GitHub Actions workflow
    → mkdocs build → site/
      → Azure Static Web Apps deployment
        → docs.ti-mindmap-hub.com
```

The site is built by MkDocs during CI and deployed as pre-rendered static HTML. No server-side code is required.

---

## Prerequisites

- An Azure account with an active subscription
- Owner or Contributor access to the GitHub repository
- DNS management access for `ti-mindmap-hub.com`

---

## Step 1: Create the Azure Static Web App

1. In the [Azure Portal](https://portal.azure.com), search for **Static Web Apps**
2. Click **Create**
3. Configure:

    | Setting | Value |
    |---------|-------|
    | Subscription | Your subscription |
    | Resource Group | Create new or use existing |
    | Name | `ti-mindmap-hub-docs` |
    | Plan type | **Free** |
    | Region | Choose nearest to your audience |
    | Source | **GitHub** |

4. Authenticate with GitHub and select:

    | Setting | Value |
    |---------|-------|
    | Organization | `TI-Mindmap-HUB-Org` |
    | Repository | `ti-mindmap-hub-research` |
    | Branch | `main` |

5. For **Build Details**, select **Custom** and set:

    | Setting | Value |
    |---------|-------|
    | App location | `/` |
    | API location | *(leave empty)* |
    | Output location | `site` |

6. Click **Review + create**, then **Create**

!!! note
    Azure will generate a GitHub Actions workflow file. Since this repository already includes a workflow at `.github/workflows/deploy.yml`, you may need to delete the auto-generated one and use the provided workflow instead.

---

## Step 2: Retrieve the Deployment Token

1. In the Azure Portal, navigate to your Static Web App
2. Go to **Settings** → **Manage deployment token**
3. Click **Copy** to copy the token

---

## Step 3: Add the GitHub Secret

1. In the GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Set:

    | Field | Value |
    |-------|-------|
    | Name | `AZURE_STATIC_WEB_APPS_API_TOKEN` |
    | Secret | *(paste the deployment token)* |

4. Click **Add secret**

---

## Step 4: Configure the Custom Domain

### DNS Records

Add the following records to your DNS provider for `ti-mindmap-hub.com`:

**TXT record (for domain validation):**

| Type | Name | Value |
|------|------|-------|
| TXT | `_dnsauth.docs` | *(value from Azure Portal → Custom domains → Add)* |

**CNAME record (for routing):**

| Type | Name | Value |
|------|------|-------|
| CNAME | `docs` | `<your-app-name>.<region>.azurestaticapps.net` |

### Apply in Azure Portal

1. Go to your Static Web App → **Settings** → **Custom domains**
2. Click **Add**
3. Enter `docs.ti-mindmap-hub.com`
4. Follow the validation steps (Azure will check the TXT record)
5. Once validated, the CNAME routing becomes active
6. Azure automatically provisions a free TLS certificate

!!! info
    DNS propagation may take up to 48 hours, though it typically completes within minutes.

---

## Step 5: Verify the Deployment

After a push to `main`, the GitHub Actions workflow will:

1. Install Python and dependencies
2. Run `mkdocs build` to generate `site/`
3. Deploy `site/` to Azure Static Web Apps

Check the **Actions** tab in GitHub for build status.

Once deployed, verify:

- [ ] `https://docs.ti-mindmap-hub.com` loads the site
- [ ] Navigation and search work correctly
- [ ] TLS certificate is valid (padlock icon in browser)

---

## GA4 Verification

Google Analytics 4 is integrated via `mkdocs.yml` using the Material theme's built-in analytics support. To verify:

1. Open [Google Analytics](https://analytics.google.com) → Property `G-Y5SS9FR5V4`
2. Go to **Realtime** → **Overview**
3. Visit `docs.ti-mindmap-hub.com` in a separate browser
4. Confirm the visit appears in the realtime view

---

## Search Console Considerations

### Domain Property Coverage

If you manage `ti-mindmap-hub.com` as a **Domain property** in Google Search Console, the `docs.ti-mindmap-hub.com` subdomain is automatically included. No additional verification is needed.

### Confirming Coverage

To verify the docs subdomain is included:

1. In Search Console, go to the `ti-mindmap-hub.com` Domain property
2. Use the **URL Inspection** tool to check `https://docs.ti-mindmap-hub.com/`
3. The URL should be recognized as part of the property

### Submitting the Sitemap

To help Google discover docs pages faster:

1. In Search Console, go to **Sitemaps**
2. Enter: `https://docs.ti-mindmap-hub.com/sitemap.xml`
3. Click **Submit**

MkDocs Material generates `sitemap.xml` automatically during build using the `site_url` configured in `mkdocs.yml`.

!!! tip
    If you are using a **URL-prefix property** instead of a Domain property, you would need to add a separate property for `https://docs.ti-mindmap-hub.com`. Using a Domain property is recommended for simpler management.

---

## PR Preview Deployments

Azure Static Web Apps Free plan supports **staging environments** for pull requests. When a PR is opened:

- A temporary preview URL is generated (e.g., `https://<random>-<pr-number>.<region>.azurestaticapps.net`)
- The preview URL is posted as a comment on the PR
- The staging environment is automatically deleted when the PR is closed

!!! warning "Free Plan Limitation"
    The Free plan supports up to **3 staging environments** at a time. If more than 3 PRs are open simultaneously, the oldest staging environment will not be updated.

---

## Troubleshooting

### Build fails in GitHub Actions

- Check the Actions tab for error logs
- Verify `requirements.txt` contains the correct package version
- Ensure `mkdocs.yml` syntax is valid (test with `mkdocs build` locally)

### Custom domain not working

- Verify DNS records are correct using `dig docs.ti-mindmap-hub.com`
- Check that the TXT validation record is set on `_dnsauth.docs`
- Allow up to 48 hours for DNS propagation
- Check Azure Portal → Custom domains for validation status

### Site shows old content

- Verify the workflow completed successfully
- Check browser cache (try incognito/private mode)
- Azure CDN may cache content briefly; wait a few minutes

### 404 errors on pages

- Ensure internal links use relative paths
- Verify the page exists in the `nav` section of `mkdocs.yml`
- Check that `mkdocs build` completes without warnings locally

---

## References

- [Azure Static Web Apps documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Custom domains in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)
- [MkDocs Material deployment guide](https://squidfunk.github.io/mkdocs-material/publishing-your-site/)
