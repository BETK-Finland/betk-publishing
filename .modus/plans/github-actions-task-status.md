# GitHub Actions CI/CD — Task Status

**Date:** 2026-04-16
**Branch:** `feat/soveltamisohje-living-document`
**Design spec:** `plans/github-actions-cicd.md`

## Completed (Agent work)

- [x] **Created workflow file** — `.github/workflows/deploy.yml`
  - Single workflow, two jobs: `build` (PR + push to main) and `deploy` (push to main only)
  - Node 22, npm cache, working directory set to `ui/`
  - Steps: checkout → setup-node → npm ci → astro check → npm run build → upload-pages-artifact → deploy-pages
  - Concurrency group prevents parallel deploys
  - Proper permissions: `contents: read`, `pages: write`, `id-token: write`

- [x] **Updated `ui/astro.config.mjs`** — removed `outDir: '../docs'` (now uses default `dist/`)

- [x] **Updated `.gitignore`** — added `/docs/` to prevent build artifacts from being committed

- [x] **Removed `docs/` from git** — `git rm -r docs/` executed, 6 files staged for deletion

## Not yet done (Agent work)

- [ ] **Verify build works** — run `npm ci && npx astro check && npm run build` in `ui/` to confirm the config change (removed `outDir`) doesn't break anything. Build output should now go to `ui/dist/` instead of `docs/`.

- [ ] **Commit changes** — all changes are staged/unstaged but not committed. Files involved:
  - `.github/workflows/deploy.yml` (new, untracked)
  - `.gitignore` (modified)
  - `ui/astro.config.mjs` (modified)
  - `docs/*` (deleted from git)
  - Note: `ui/src/data/precast.json` also shows as modified — **unrelated** to this work, check before including in commit

## Not yet done (Human work — requires repo admin)

- [ ] **GitHub Pages source** — go to repo Settings → Pages → Build and deployment → Source → change from "Deploy from a branch" to **"GitHub Actions"**

- [ ] **Branch protection rules** — go to repo Settings → Branches → Add ruleset for `main`:
  - Require a pull request before merging
  - Require status checks to pass before merging (select the `build` job after first successful run)
  - Review approvals: optional (decide based on team size)

## Verification checklist

1. [ ] Build passes locally (`npm run build` outputs to `ui/dist/`)
2. [ ] Push branch and open PR to `main` → `build` job runs and passes
3. [ ] GitHub Pages source changed to "GitHub Actions"
4. [ ] Merge PR → `deploy` job runs and site is live at `betk-finland.github.io/betk-publishing/`
5. [ ] Branch protection enabled on `main`
6. [ ] Test: introduce a type error on a branch, open PR → check fails, merge is blocked
