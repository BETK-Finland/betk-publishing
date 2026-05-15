# GitHub Actions CI/CD Setup

## Context

The repo currently commits built output to `docs/` and serves GitHub Pages from it. This is a temporary demo setup. We're switching to the standard approach: GitHub Actions builds the site and deploys via the Pages artifact action. No built files in version control. A second developer is joining this week, so we need proper PR validation gates.

## Overview

- **Two workflow files**: `ci.yml` (PR gate) and `deploy.yml` (production deploy)
- **Remove `docs/`** from git and stop building to it
- **Branch protection guidance** for onboarding

---

## Phase 1: Create workflows + update config (4 files)

### 1. Create `.github/workflows/ci.yml`
Triggers on PRs to `main`. Runs type-check (`npx astro check`) then build (`npm run build`) in `ui/`. Uses Node 22, npm cache, concurrency cancellation.

### 2. Create `.github/workflows/deploy.yml`
Triggers on push to `main` + `workflow_dispatch`. Two jobs:
- **build**: checkout, install, type-check, build, upload `ui/dist` as Pages artifact
- **deploy**: `actions/deploy-pages@v4` with `github-pages` environment

Permissions: `contents: read`, `pages: write`, `id-token: write`.
Concurrency group `pages` with `cancel-in-progress: false` (don't cancel mid-deploy).

### 3. Modify `ui/astro.config.mjs`
Remove the `outDir: '../docs'` line. Astro defaults to `dist/` which is already in `.gitignore`. Update the comment to reflect Actions-based deployment.

### 4. Update `.gitignore`
Update the header comment (currently references `docs/` as the served site). No structural changes needed since `ui/dist/` is already ignored.

## Phase 2: Cleanup (1 operation)

### 5. Remove `docs/` from git
`git rm -r docs/` — removes the built site from version control.

## Phase 3: Commit + manual repo config

### 6. Single commit with all changes
All changes ship together — removing `docs/` without the deploy workflow would break the site, and vice versa.

### 7. Manual step (human): Configure GitHub Pages source
**Settings > Pages > Source > GitHub Actions** (must be done before or right after push).
This tells GitHub to expect deployments from the workflow instead of serving from a branch folder.

### 8. Manual step (human): Branch protection (after first CI run)
- Require PR before merging to `main`
- Require status check: `Type-check & Build` (the job name from ci.yml)
- Require branches to be up to date before merging
- 1 required approval

---

## Key files

| File | Action |
|------|--------|
| `.github/workflows/ci.yml` | Create |
| `.github/workflows/deploy.yml` | Create |
| `ui/astro.config.mjs` | Edit (remove `outDir`) |
| `.gitignore` | Edit (update comment) |
| `docs/` | Delete from git |

## Verification

1. Run `npx astro check` locally in `ui/` before committing — confirm zero errors
2. Run `npm run build` locally in `ui/` — confirm output goes to `ui/dist/` (not `docs/`)
3. After push: confirm deploy workflow triggers and completes in Actions tab
4. Visit `https://betk-finland.github.io/betk-publishing/` — confirm site loads
5. Open a test PR — confirm CI workflow runs and reports status check

## Risk: brief downtime

Switching Pages source from `docs/` to Actions means a brief gap. Mitigate by changing the Pages source setting in GitHub UI immediately before pushing.
