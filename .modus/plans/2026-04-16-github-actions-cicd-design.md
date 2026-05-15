# GitHub Actions CI/CD — Design Spec

**Date:** 2026-04-16
**Status:** Draft

## Context

The project currently deploys to GitHub Pages by building locally, committing the `docs/` folder to `main`, and pushing. This is manual, error-prone, and doesn't validate changes before deployment. We need automated CI/CD that:

- Validates PRs before merge (typecheck + build)
- Auto-deploys to GitHub Pages when code lands on `main`
- Removes build artifacts (`docs/`) from version control
- Supports non-technical users editing content via GitHub's web editor + PRs

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Deploy model | `actions/deploy-pages` | Clean git history, no build artifacts in repo |
| PR checks | Typecheck + Build | Catches the most impactful failures without adding new tooling |
| Triggers | PRs to main + push to main | Feature branch pushes without PR are ignored (saves CI minutes) |
| Branch protection | Required PR + passing checks | Prevents accidental direct pushes, critical for non-technical users |
| Workflow structure | Single file, two jobs | Astro's recommended pattern, artifact shared between check and deploy |

## Workflow: `.github/workflows/deploy.yml`

### Triggers

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### Job 1: `build`

Runs on **both** PR and push to main.

1. `actions/checkout`
2. `actions/setup-node` — Node 22, cache npm (`ui/package-lock.json`)
3. `npm ci` — in `ui/` working directory
4. `npx astro check` — TypeScript validation
5. `npm run build` — produces `ui/dist/`
6. `actions/upload-pages-artifact` — upload `ui/dist/` (only on push to main)

### Job 2: `deploy`

Runs **only** on push to main, depends on `build`.

1. `actions/deploy-pages` — publishes the uploaded artifact
2. Requires permissions: `pages: write`, `id-token: write`
3. Uses environment: `github-pages`
4. Concurrency group ensures only one deploy runs at a time

### Permissions

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Config Changes

### `ui/astro.config.mjs`

Remove `outDir: '../docs'` — let Astro use its default `dist/` output directory. Update the comment to reflect CI-based deployment.

### Remove `docs/` directory

Delete the entire `docs/` directory from version control. Add `docs/` to `.gitignore` as a safety measure (prevents accidental re-creation).

### `.gitignore`

Add `docs/` to the root `.gitignore`.

## Manual Steps (Human)

These cannot be automated by the agent and must be done by the repository admin:

### 1. GitHub Pages Source

**Settings → Pages → Build and deployment → Source** → change from "Deploy from a branch" to "GitHub Actions".

### 2. Branch Protection Rules

**Settings → Branches → Add branch ruleset** for `main`:
- Require a pull request before merging
- Require status checks to pass before merging (select the `build` job)
- Do not require approvals (optional — decide based on team size)

## Verification

1. Push the workflow file to a feature branch
2. Open a PR to `main` → verify the `build` job runs and passes
3. Merge the PR → verify the `deploy` job runs and the site is live at `betk-finland.github.io/betk-publishing/`
4. Test a failing scenario: introduce a type error on a branch, open PR → verify the check fails
5. Verify branch protection blocks merge when checks fail

## Future Work

- **Decap CMS** — admin UI for non-technical content editors (separate spec)
- **ESLint / Prettier** — add linting workflow when tooling is configured
- **Preview deployments** — deploy PR branches to preview URLs (optional, requires Cloudflare Pages or similar)
