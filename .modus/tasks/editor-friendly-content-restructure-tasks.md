# Editor-friendly content restructure — tasks

Plan: [.modus/plans/editor-friendly-content-restructure.md](../plans/editor-friendly-content-restructure.md)

Goal: move the BETK documentation content (landing page, soveltamisohje prose, JSON data tables, meta/manifest) into a top-level `content/` folder, enable MDX for the landing page, and add an `EDITORS.md` walking domain experts through the github.com flow. All data tables stay JSON for future API compatibility with a product-data master.

## Phase 1 — MDX integration (no content moves)

- [x] Install `@astrojs/mdx` in `ui/`

    Added `"@astrojs/mdx": "^4.0.0"` to `ui/package.json` dependencies. Per CLAUDE.md "Never install npm packages automatically", the user must run `npm install` from `ui/` to actually fetch the package. If the resolved version is wrong for Astro 6, adjust the version specifier and re-install.

- [x] Update `ui/astro.config.mjs`

    Imported `mdx` from `@astrojs/mdx`, added it to `integrations`, and added `vite: { server: { fs: { allow: ['..'] } } }` so the dev server will be able to read files above `ui/` in Phase 2. `site`, `base`, and `trailingSlash` unchanged.

- [x] Update `ui/src/content.config.ts` landing pattern

    Landing collection pattern changed from `"*.md"` to `"*.{md,mdx}"`. Soveltamisohje collection untouched.

- [x] Rename `landing-page.md` → `landing-page.mdx`

    Renamed via `git mv` so history is preserved. Content unchanged.

- [ ] Verify Phase 1

    User to run from `ui/`: `npm install && npm run build && npx astro check`. All green expected. Open dev server (`npm run dev`) and confirm the site renders identically — landing page, soveltamisohje page, properties, propertysets.

## Phase 2 — Move content to repo-root `content/`

- [x] Create the top-level `content/` folder structure

    Created `content/landing/`, `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/`, and `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/tables/` via `mkdir -p`. Folders are populated by file moves below — no `.gitkeep` needed.

- [x] Move the landing page

    `ui/src/content/landing/landing-page.mdx` → `content/landing/page.mdx` via `git mv`.

- [x] Move the soveltamisohje prose files

    All 13 markdown files moved from `ui/src/content/soveltamisohje/tarjousvaiheen-tietomaaritykset/` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/` via `git mv` in a loop. Filenames preserved.

- [x] Move meta.json and manifest.json

    Both moved from `ui/src/data/soveltamisohje/tarjousvaiheen-tietomaaritykset/` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/` (page root, not under `tables/`).

- [x] Move the 10 table JSONs into `tables/`

    All 10 tables moved into `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/tables/`: `elementtityypit`, `kokoonpano-tyypit`, `raudoitus`, `pintakasittely`, `varibetoni`, `vahahiilinen`, `tyyppielementti`, `kaantokivi`, `lyhenteet`, `raudoitus-esimerkit`. (Note: original tasklist said "9 table JSONs" — actual count was 10.)

- [x] Verify JSON formatting

    All JSON files moved as-is; existing 2-space indent and one-object-per-line `arvot` layout preserved. Editors will see the "copy a line, change two values" pattern on github.com.

- [x] Update `ui/src/content.config.ts` paths

    Landing collection `base`: `"./src/content/landing"` → `"../content/landing"`. Soveltamisohje collection `base`: `"./src/content/soveltamisohje"` → `"../content/soveltamisohje"`, `pattern`: `"**/*.md"` → `"*/[0-9]*.md"`. Schema unchanged.

- [x] Update `ui/src/data/soveltamisohje-loader.ts` glob paths

    Three globs updated to use relative paths from the loader file: `../../../content/soveltamisohje/*/meta.json`, `../../../content/soveltamisohje/*/manifest.json`, and `../../../content/soveltamisohje/*/tables/*.json`. Used relative (not absolute `/content/...`) because Vite resolves absolute globs against the project root (`ui/`), not the repo root — absolute `/content/...` would have looked at `ui/content/...` which doesn't exist. Dead `if (name === "meta" || name === "manifest") continue;` guard removed since the new third glob only matches files under `tables/`.

- [x] Adjust `slugFromPath` and `basenameFromPath` for new path depth

    `slugFromPath` rewritten as a regex match `/soveltamisohje\/([^/]+)\//` which extracts the slug from any path shape (meta/manifest at depth 2 OR tables at depth 3). `basenameFromPath` unchanged — still strips `.json` from the last segment.

- [ ] Verify Phase 2 — build and behavior

    User to run from `ui/`: `npm run dev` — landing renders, soveltamisohje page renders identically section-by-section (check the nav title matches manifest, all 15 sections present in order). Edit a row in `content/.../tables/elementtityypit.json`, save, confirm HMR shows the change. Then `npm run build` and `npx astro check` — both green. All ~80 `elementtityypit` rows render, Finnish characters intact ("Sokkelielementti", "väliseinä"), nested tables (`pintakasittely`, `raudoitus-esimerkit`) render correctly.

- [ ] Verify Phase 2 — print

    Browser print preview (Ctrl+P). TOC appears in print, sections break onto new pages, abbreviations table fits, page footer with date/document name shows. Print stylesheet untouched, so this should pass without code changes.

- [ ] Verify Phase 2 — CI deploy

    Commit to a feature branch, push, watch the GitHub Actions deploy run. Confirm green. If a preview deploy URL exists, visit it; otherwise temporarily merge into `main` on a staging-only fork or trust the build status.

## Phase 2b — Landing page restructure (added during execution)

User reported the landing page wasn't rendering and asked for meta.json + manifest.json + a few sections (parallel to soveltamisohje). Investigation: the Phase 1 rename `landing-page.md` → `page.mdx` broke `getEntry("landing", "landing-page")` in `index.astro` — the collection entry ID changed from `landing-page` to `page` but the consumer wasn't updated. Decision: don't just rename back — adopt the soveltamisohje pattern (meta.json + manifest.json + per-section markdown) so editors can grow the landing page without touching code.

- [x] Add `content/landing/meta.json`

    Created with `otsikko`, `alaotsikko`, `paivamaara`. Matches the field names used by soveltamisohje's `meta.json` so editors learn one vocabulary.

- [x] Add `content/landing/manifest.json`

    Sections list with `kind: prose`, `content` (filename without extension), and `anchor`. Same shape as soveltamisohje manifest (minus the table/glossary kinds the landing doesn't need yet).

- [x] Add three placeholder section files

    `01-tervetuloa.md`, `02-mita-on-betk.md`, `03-aineisto.md` — each with `title`, `order`, `section` frontmatter and Finnish placeholder copy that the user can rewrite. Pattern parallels the `01-tausta.md` etc. in soveltamisohje.

- [x] Remove `content/landing/page.mdx`

    Removed via `git rm -f` since the single-file MDX approach is replaced by the multi-section structure.

- [x] Update `ui/src/content.config.ts` landing schema and pattern

    Schema now requires `title`, `order`, `section` (matching soveltamisohje). Pattern: `[0-9]*.md` so meta.json and manifest.json aren't picked up.

- [x] Rewrite `ui/src/pages/index.astro`

    Replaced the single-entry `getEntry("landing", "landing-page")` call with manifest-driven section iteration. Imports `meta.json` and `manifest.json` directly as JSON modules. Uses `getCollection("landing")` to grab all section entries, indexed by ID, then iterates manifest sections to resolve each. Reuses the existing `ProseSection` component for visual consistency with soveltamisohje. Added a subtitle paragraph rendered from `meta.alaotsikko`.

- [ ] Verify Phase 2b — landing renders

    User to run `npm run dev` from `ui/`. Confirm landing page shows: `meta.otsikko` as h1, `meta.alaotsikko` as italic subtitle, three sections each with their `title` as h2 and the markdown body rendered below. Edit `01-tervetuloa.md` and confirm HMR shows the change.

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

## Phase 5 — Cleanup

- [x] Delete the old `ui/src/content/landing/` and `ui/src/content/soveltamisohje/` directories

    Confirmed empty (all files moved in Phase 2). Removed via `rmdir`.

- [x] Delete the old `ui/src/data/soveltamisohje/` directory

    Confirmed empty. Removed via `rmdir`. Did this now rather than waiting for "after one release" since rollback would still be easy via git history.

- [x] Confirm propertysets data is untouched

    `ui/src/data/` still has `precast.json`, `precastProperties.json`, `valutarvike.json`, `valutarvikeProperties.json`, `types.ts`, `loader.ts`, `soveltamisohje-loader.ts`, `soveltamisohje-types.ts`, plus the new `landing-loader.ts`. Verified.

---

## Log

_What was actually done, in chronological order. Append entries as work progresses._

- **2026-05-15** — Created branch `editor-friendly-content-restructure` off `main`.
- **2026-05-15 (Phase 1)** — Added `@astrojs/mdx ^4.0.0` to `ui/package.json`. Updated `ui/astro.config.mjs` to register the MDX integration and allow Vite fs access above `ui/`. Changed landing collection pattern to `*.{md,mdx}` in `ui/src/content.config.ts`. Renamed `ui/src/content/landing/landing-page.md` → `landing-page.mdx` via `git mv`. Did **not** run `npm install` per CLAUDE.md "no auto-install" rule — handed off to user for verification.
- **2026-05-15 (Phase 1 — fix)** — `npm install` failed: `@astrojs/mdx@^4` peer-requires Astro 5, but we run Astro 6. Checked npm registry: latest `@astrojs/mdx@5.0.6` peer-requires `astro@^6.0.0`. Updated specifier to `^5.0.0`. Plan agent's `^4.x` guess was incorrect for Astro 6.
- **2026-05-15 (Phase 1 — verified)** — User confirmed: `npm install`, `npm run build`, site renders OK.
- **2026-05-15 (Phase 2)** — Moved all editor-facing content to repo-root `content/`: 1 landing `.mdx`, 13 soveltamisohje prose `.md` files, `meta.json`, `manifest.json`, and 10 table JSONs (into `tables/` subfolder). All moves via `git mv` to preserve history. Updated `ui/src/content.config.ts` (collection `base` paths now relative `../content/...`, soveltamisohje pattern tightened to `*/[0-9]*.md`). Updated `ui/src/data/soveltamisohje-loader.ts` glob paths to `../../../content/...` (relative from the loader file). Rewrote `slugFromPath` as a regex that handles both meta/manifest paths (depth 2) and table paths (depth 3). Removed the dead meta/manifest guard since the data-modules glob now only matches `tables/*.json`. Plan note: original tasklist said "9 table JSONs" — actually 10. Discovered subtle gotcha: Vite's absolute-path globs (`/content/...`) resolve against project root `ui/`, not repo root. The plan said use `/content/...` — that would not have worked. Used relative `../../../content/...` instead. Handed off to user for build verification.
- **2026-05-15 (Phase 2b — bug + landing restructure)** — User reported landing page not rendering. Root cause: Phase 1 renamed `landing-page.md` → `page.mdx`, which changed the content-collection entry ID from `landing-page` to `page`, but `index.astro` still called `getEntry("landing", "landing-page")` — a silent lookup failure. **This was a real Phase 1 miss** — the rename should have been paired with a consumer update, or the consumer should have been refactored first. Rather than just renaming back, adopted the soveltamisohje pattern for the landing page (user explicit request: meta + manifest + sections). Created `content/landing/{meta,manifest}.json` + three section markdown files (`01-tervetuloa.md`, `02-mita-on-betk.md`, `03-aineisto.md`). Deleted `page.mdx`. Updated `content.config.ts` landing schema and pattern to match soveltamisohje. Rewrote `index.astro` as manifest-driven, reusing the `ProseSection` component. Also noted: `01-tausta.md` shows a small whitespace/markdown-italics diff — VS Code auto-formatted it when the user opened the file; harmless, equivalent output, left alone.
- **2026-05-15 (Phase 2b — Vite SSR error)** — Dev server failed with `Cannot split a chunk that has already been edited (0:7 – "import.meta")`. Hypothesis: direct JSON imports across the project-root boundary (`import meta from "../../../content/landing/meta.json"`) in an `.astro` frontmatter that also uses `import.meta.env` hit a Vite transform corner case. Fix: moved the JSON loading into a new `ui/src/data/landing-loader.ts` that uses `import.meta.glob` with eager mode — same pattern as `soveltamisohje-loader.ts` (known-working). `index.astro` now imports `getLandingMeta()` and `getLandingManifest()` from there.
- **2026-05-15 (Phase 3 — image)** — User dropped `morko.png` into `content/landing/images/` and wanted it shown under section 02. Added `![Mörkö](./images/morko.png)` to `02-mita-on-betk.md` and a `.sov-prose img` CSS rule in `global.css` (display: block, max-width: 100%, height: auto, vertical margin) so images fill the text column with aspect preserved. Astro 6 auto-resolves relative image paths in content-collection markdown — no public-folder workaround needed despite the cross-root content layout. Plan note: the original plan recommended `ui/public/content-images/<page>/` because the Plan agent thought relative resolution would break above the project root. It didn't break — relative `./images/x.png` works.
- **2026-05-15 (Phase 5 — cleanup)** — Removed now-empty leftover directories `ui/src/content/`, `ui/src/content/landing/`, `ui/src/content/soveltamisohje/...`, `ui/src/data/soveltamisohje/...` via `rmdir`. Did this immediately rather than waiting "after one release" since git history makes rollback cheap. Propertysets data (`precast.json`, `valutarvike.json` etc.) untouched.
- **2026-05-15 (Phase 6 — landing printable)** — User wanted landing printable like soveltamisohje. Refactored `PrintToc.astro` to take a `sections` prop (was hardcoded). Updated `[slug].astro` to pass its `tocItems` to PrintToc. Updated `index.astro`: added `<PrintToc>` with landing's sections, restructured header to use `sov-header`/`sov-title`/`sov-meta` classes for shared styling, added the print date stamp element and the same beforeprint script (date + force details open). Updated `global.css` print rules: hide `.sidebar` and `.issue-ticket` in print, made `.app-main` block + `.landing-body` flush so the article fills the page, generalized `@page` footer from soveltamisohje-specific "v1.0 — 17.12.2025" string to "BETK — Betonielementin toimitusketju" (now correct for both pages), added page-count to `@bottom-right`.

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