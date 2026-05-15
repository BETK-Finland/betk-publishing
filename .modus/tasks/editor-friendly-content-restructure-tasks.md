# Editor-friendly content restructure — tasks

Plan: [.modus/plans/editor-friendly-content-restructure.md](../plans/editor-friendly-content-restructure.md)

Goal: move the BETK documentation content (landing page, soveltamisohje prose, JSON data tables, meta/manifest) into a top-level `content/` folder, enable MDX for the landing page, and add an `EDITORS.md` walking domain experts through the github.com flow. All data tables stay JSON for future API compatibility with a product-data master.

## Phase 1 — MDX integration (no content moves)

- [ ] Install `@astrojs/mdx` in `ui/`

    Run `npm install @astrojs/mdx` in `C:\Spheres\digisphere\betk-publishing\ui\`. Pin to a version compatible with Astro 6 (currently `^4.x`). This adds the MDX integration without touching any content yet.

- [ ] Update `ui/astro.config.mjs`

    Import `mdx` from `@astrojs/mdx` and add it to the `integrations` array. Also add `vite: { server: { fs: { allow: [".."] } } }` so the dev server can read files above `ui/` in Phase 2. Keep `site`, `base`, and `trailingSlash` unchanged.

- [ ] Update `ui/src/content.config.ts` landing pattern

    Change the landing collection's `pattern: "*.md"` to `pattern: "*.{md,mdx}"`. Schema and base stay the same. Don't touch soveltamisohje yet.

- [ ] Rename `landing-page.md` → `landing-page.mdx`

    Pure rename, no content change. Confirms the MDX integration works before any content restructuring.

- [ ] Verify Phase 1

    From `ui/`: `npm install && npm run build && npx astro check`. All green. Open the dev server and confirm the site renders identically — landing page, soveltamisohje page, properties, propertysets.

## Phase 2 — Move content to repo-root `content/`

- [ ] Create the top-level `content/` folder structure

    Create empty directories: `content/landing/`, `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/`, and `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/tables/`. Add a `.gitkeep` in each new empty subdir if needed.

- [ ] Move the landing page

    Move `ui/src/content/landing/landing-page.mdx` → `content/landing/page.mdx`. Verify the file content is intact after the move.

- [ ] Move the soveltamisohje prose files

    Move all 13 markdown files from `ui/src/content/soveltamisohje/tarjousvaiheen-tietomaaritykset/` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/`. Keep filenames identical (no `sections/` subfolder).

- [ ] Move meta.json and manifest.json

    Move `meta.json` and `manifest.json` from `ui/src/data/soveltamisohje/tarjousvaiheen-tietomaaritykset/` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/`. Verify they remain at the page root (not under `tables/`).

- [ ] Move the 9 table JSONs into `tables/`

    Move `elementtityypit.json`, `kokoonpano-tyypit.json`, `raudoitus.json`, `pintakasittely.json`, `varibetoni.json`, `vahahiilinen.json`, `tyyppielementti.json`, `kaantokivi.json`, `lyhenteet.json`, `raudoitus-esimerkit.json` from `ui/src/data/soveltamisohje/tarjousvaiheen-tietomaaritykset/` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/tables/`.

- [ ] Verify JSON formatting

    For each moved JSON: 2-space indent, one object per line in `arvot`, sorted top-level keys where it doesn't break semantics. The existing files already follow this — just preserve it during moves. Editors editing on github.com should see a predictable "copy a line, change two values" pattern.

- [ ] Update `ui/src/content.config.ts` paths

    Landing collection `base`: `"./src/content/landing"` → `"../content/landing"`. Soveltamisohje collection `base`: `"./src/content/soveltamisohje"` → `"../content/soveltamisohje"` and `pattern`: `"**/*.md"` → `"*/[0-9]*.md"` (so `tables/*.json`, `meta.json`, `manifest.json` aren't matched as markdown entries).

- [ ] Update `ui/src/data/soveltamisohje-loader.ts` glob paths

    Change three `import.meta.glob` calls (lines 48–60). Old: `"./soveltamisohje/*/meta.json"`, `"./soveltamisohje/*/manifest.json"`, `"./soveltamisohje/*/*.json"`. New: `"/content/soveltamisohje/*/meta.json"`, `"/content/soveltamisohje/*/manifest.json"`, `"/content/soveltamisohje/*/tables/*.json"`. The third glob now targets the `tables/` subfolder so `meta`/`manifest` aren't picked up — drop the `if (name === "meta" || name === "manifest") continue;` guard at line 105 since it's no longer needed (or keep it as a belt-and-braces check).

- [ ] Adjust `slugFromPath` and `basenameFromPath` for new path depth

    Old assumption: `./soveltamisohje/<slug>/<file>.json` → slug at index `-2`. New: meta/manifest still at `-2` but table files are now at `/content/soveltamisohje/<slug>/tables/<file>.json` → slug at index `-3`. Simplest fix: write a regex that matches `soveltamisohje/([^/]+)/` and extracts capture group 1 from any path shape.

- [ ] Verify Phase 2 — build and behavior

    From `ui/`: `npm run dev` — landing renders, soveltamisohje page renders identically section-by-section (check the nav title matches manifest, all 15 sections present in order). Edit a row in `content/.../tables/elementtityypit.json`, save, confirm HMR shows the change. Then `npm run build` and `npx astro check` — both green. All ~80 `elementtityypit` rows render, Finnish characters intact ("Sokkelielementti", "väliseinä"), nested tables (`pintakasittely`, `raudoitus-esimerkit`) render correctly.

- [ ] Verify Phase 2 — print

    Browser print preview (Ctrl+P). TOC appears in print, sections break onto new pages, abbreviations table fits, page footer with date/document name shows. Print stylesheet untouched, so this should pass without code changes.

- [ ] Verify Phase 2 — CI deploy

    Commit to a feature branch, push, watch the GitHub Actions deploy run. Confirm green. If a preview deploy URL exists, visit it; otherwise temporarily merge into `main` on a staging-only fork or trust the build status.

## Phase 3 — Image bucket

- [ ] Create per-page image directories

    Create `ui/public/content-images/landing/` and `ui/public/content-images/soveltamisohje/tarjousvaiheen-tietomaaritykset/`. Add a `.gitkeep` in each so git tracks the empty folders.

- [ ] Add one test image and reference it from `page.mdx`

    Drop a small placeholder image (e.g., a BETK logo or any test PNG) into `ui/public/content-images/landing/`. Reference it from `content/landing/page.mdx` as `![BETK](/betk-publishing/content-images/landing/<filename>.png)`. Note the `/betk-publishing/` base prefix — required in production, will work in dev too.

- [ ] Verify image renders locally and on deploy

    Dev: `npm run dev`, see image on landing page. Build: `npm run build && npm run preview`, see image. Push to a branch, let CI deploy, visit the live URL, confirm image loads with the right base path.

## Phase 4 — Editor onboarding artifacts

- [ ] Write `content/README.md`

    One paragraph: "This folder holds all editable content for the BETK site — the landing page, the implementation guide prose, the data tables, and images. To edit anything here via github.com, see EDITORS.md."

- [ ] Write `content/EDITORS.md`

    Sections to cover, each with a screenshot of the github.com flow: (1) edit a prose section, (2) edit a data table JSON, (3) edit meta/manifest, (4) add an image, (5) what gets published and when, (6) what to do if the live site looks wrong. Be concrete: where to click, what to type, what to commit, how to open a PR. For JSON tables, emphasize the "copy a line, change two values, save" pattern and show the line shape `{ "koodi": "X", "kuvaus": "Y" }`.

- [ ] Write an onboarding checklist for new editors

    Either at the top of `EDITORS.md` or in a separate `content/ONBOARDING.md`: (1) get a GitHub account, (2) be added to the repo as a collaborator with write access, (3) bookmark the `content/` folder URL on github.com, (4) make one trivial test edit to confirm the flow works.

- [ ] Real-editor smoke test

    Ask one non-technical domain expert to make a trivial edit through github.com end-to-end: fix a typo in `01-tausta.md`, add a row to `elementtityypit.json`, open a PR, see it deploy after merge. If they get stuck, EDITORS.md needs another pass.

## Phase 5 — Cleanup (only after one release of stability)

- [ ] Delete the old `ui/src/content/landing/` and `ui/src/content/soveltamisohje/` directories

    These should be empty after Phase 2 moves. Confirm before deleting.

- [ ] Delete the old `ui/src/data/soveltamisohje/` directory

    Kept as a fallback during Phase 2. After one release with no rollback needed, remove it.

- [ ] Confirm propertysets data is untouched

    `ui/src/data/precast.json`, `precastProperties.json`, `valutarvike.json`, `valutarvikeProperties.json`, `types.ts`, `loader.ts`, `soveltamisohje-types.ts` must still exist. These are out of scope for this plan.

---

## Log

_What was actually done, in chronological order. Append entries as work progresses._

- _(not started)_

## Lessons

### What worked

- _(to be filled in during/after execution)_

### What didn't work

- _(to be filled in during/after execution)_

## Follow-ups

_New tasks that surfaced during execution but aren't part of this plan. Move to a new plan if any grows beyond a quick item._

- **PR preview deploys.** The current GitHub Pages workflow only deploys on push to `main`. Editors don't see their changes until merge. Add a preview deploy on PR open/update so editors can review their own work before merging.
- **JSON Schema files for the data tables.** Optional: add `$schema` references so anyone editing in VS Code gets autocomplete and validation. github.com web UI won't benefit, but local-tooling editors will.
- **Decap CMS at `/admin/`.** If the github.com editing flow turns out to be too painful for some editors even with the new structure, layer a Decap CMS on top. The current restructure makes that a drop-in: Decap reads/writes the same markdown + JSON files.
- **Product-data master integration.** When the BETK product-data master API is available, swap the `import.meta.glob` data sources in `soveltamisohje-loader.ts` for a build-time fetch. The JSON shapes already match — no schema work.
- **Convert remaining `ui/src/data/` JSON-as-product-data into a runtime-fetchable shape.** The propertysets data (`precast.json` etc.) is out of scope for this plan but follows the same future-API pattern.