# Editor-friendly content restructure

## Context

Today the documentation content for the BETK site lives in two parallel trees inside `ui/src/`:

- Prose: `ui/src/content/{landing,soveltamisohje}/...*.md` (content collection)
- Data: `ui/src/data/soveltamisohje/<slug>/{meta.json, manifest.json, *.json}` (read by a build-time loader)

Domain experts (non-technical construction professionals, with GitHub accounts) need to be able to edit the landing page, the implementation guide prose, the data tables (element types, surface treatments, abbreviations…), the meta/manifest, and add images — without searching the repo. The propertysets data (`precast.json`, `precastProperties.json`, `valutarvike*.json`) is **out of scope** and stays where it is.

Direction chosen: **restructure the repo for GitHub web UI editing**. Co-locate all per-page files under a top-level `content/` folder, enable MDX for the landing page, set up an image bucket, and document the workflow in `EDITORS.md`. No new infrastructure, no auth, no admin UI.

**Format constraint:** all data tables and metadata stay in **JSON** (not CSV or YAML). Reason: these values may need to be pulled from a product-data master via API in the future; JSON keeps the in-repo shape aligned with what an API would return and avoids a format-translation step. The editor-friendliness goal is met instead by (a) co-locating files so they're easy to find, (b) keeping each JSON file small and predictable (one row per line, sorted keys, pretty-printed), and (c) a thorough `EDITORS.md` walking through the github.com flow.

## Target structure

```
betk-publishing/
├── content/                                          ← NEW top-level, editor-facing
│   ├── README.md                                     ← what this folder is
│   ├── EDITORS.md                                    ← github.com walkthrough w/ screenshots
│   ├── landing/
│   │   └── page.mdx                                  ← rich landing page (was landing-page.md)
│   └── soveltamisohje/
│       └── tarjousvaiheen-tietomaaritykset/
│           ├── meta.json                             ← unchanged format, moved
│           ├── manifest.json                         ← unchanged format, moved
│           ├── 01-tausta.md                          ← prose, flat
│           ├── 02-tarkoitus-ja-rajaukset.md
│           ├── 03-tuotetiedot-intro.md
│           ├── 03-kokoonpano-tyyppi.md
│           ├── 03-elementtityyppi.md
│           ├── …
│           └── tables/
│               ├── elementtityypit.json              ← all tables stay JSON
│               ├── kokoonpano-tyypit.json
│               ├── raudoitus.json
│               ├── pintakasittely.json
│               ├── varibetoni.json
│               ├── vahahiilinen.json
│               ├── tyyppielementti.json
│               ├── kaantokivi.json
│               ├── lyhenteet.json
│               └── raudoitus-esimerkit.json
└── ui/
    ├── public/
    │   └── content-images/                           ← NEW image bucket (per-page subfolders)
    │       ├── landing/
    │       └── soveltamisohje/
    │           └── tarjousvaiheen-tietomaaritykset/
    └── src/                                          ← unchanged except for files listed below
```

### Why these choices

- **JSON kept for all data files** — preserves a clean upgrade path to fetching the same shape from a product-data master API later. No format translation. Loader changes are minimal (just glob paths).
- **MDX** for the landing page — lets editors mix prose, images, and tables in one file, plus drop in small inline components later if needed. Prose sections under `soveltamisohje/` stay `.md` (no need for MDX there).
- **Top-level `content/` folder** — non-tech editors browsing the repo on github.com see one obvious folder, not buried inside `ui/src/`. The full path becomes `<repo>/content/soveltamisohje/<page>/...`.
- **Co-located `tables/` subfolder** per page — same folder as the prose; no cross-tree navigation.
- **JSON formatting discipline** — every JSON file pretty-printed with 2-space indent, one row per line in the `arvot` array (it already is — keep it that way), sorted top-level keys where it doesn't break semantics. Editors editing on github.com see a predictable shape: copy a line, change two values, save.
- **Images under `ui/public/content-images/`** instead of `content/<page>/images/`. Reason: Astro's image pipeline only auto-resolves relative `![](./images/x.png)` references when the markdown lives under `src/`. Once content moves to repo-root `content/`, that auto-resolution breaks. `public/content-images/` is served verbatim by Astro and works with absolute URLs (`![alt](/betk-publishing/content-images/landing/x.png)`) — uglier path, but no remark plugin needed and the GitHub "Upload files" flow Just Works.

## Critical files to modify

| File | Change |
|---|---|
| `ui/astro.config.mjs` | Add `mdx()` integration; add `vite: { server: { fs: { allow: [".."] } } }` so the dev server can read `../content/` |
| `ui/package.json` | Add dep: `@astrojs/mdx` (Astro 6-compatible, currently `^4.x`). No YAML/CSV parsers needed since data stays JSON |
| `ui/src/content.config.ts` | Landing collection: `base: "../content/landing"`, `pattern: "*.{md,mdx}"`. Soveltamisohje collection: `base: "../content/soveltamisohje"`, `pattern: "*/[0-9]*.md"` (so `tables/*.json`, `meta.json`, `manifest.json` aren't matched as markdown). Zod schema unchanged |
| `ui/src/data/soveltamisohje-loader.ts` | Update glob paths only (small change, ~10–20 LOC). Public API (`getDoc`, `listDocs`, `elementTypeToProducts`, `propertySetToProperties`) stays identical so `[slug].astro` and components don't change |
| `ui/src/pages/soveltamisohje/[slug].astro` | **No changes** — the loader's public shape is preserved |

### `soveltamisohje-loader.ts` change — minimal

Glob patterns change from `./soveltamisohje/...` (inside `src/data/`) to absolute paths into repo-root `content/`:

```ts
// was: "./soveltamisohje/*/meta.json"
const metaModules = import.meta.glob<DocumentMeta>(
  "/content/soveltamisohje/*/meta.json",
  { eager: true, import: "default" },
);
// was: "./soveltamisohje/*/manifest.json"
const manifestModules = import.meta.glob<Manifest>(
  "/content/soveltamisohje/*/manifest.json",
  { eager: true, import: "default" },
);
// was: "./soveltamisohje/*/*.json"  (caught everything in the doc folder)
// now: tables live in a subfolder, so glob only that subfolder
const dataModules = import.meta.glob<unknown>(
  "/content/soveltamisohje/*/tables/*.json",
  { eager: true, import: "default" },
);
```

`slugFromPath` and `basenameFromPath` adjust for the deeper path (slug is now 3 from end for table files, 2 from end for meta/manifest). Vite's JSON loader works on absolute repo-root paths via `/content/...`. The `precast.json` / `precastProperties.json` imports at lines 15–16 stay unchanged — those drive the cross-reference maps, not the docs.

Total loader diff: ~10–20 LOC changed, structurally identical.

## Phased execution

Each phase is small enough to verify in isolation. Stop and re-plan if any phase grows.

### Phase 1 — MDX integration (no content moves)
- Install `@astrojs/mdx` (Astro 6-compatible, currently `^4.x`).
- Update `astro.config.mjs`: add `mdx()` integration and `vite: { server: { fs: { allow: [".."] } } }` (prepares for Phase 2 reading above `ui/`).
- Update `content.config.ts` landing pattern to `*.{md,mdx}`.
- Rename `landing-page.md` → `landing-page.mdx` (no content change yet).
- **Verify:** `npm install && npm run build && npx astro check` green; site renders identically.

### Phase 2 — Move content to repo-root `content/`
- Move files (no format changes — JSON stays JSON):
  - `ui/src/content/landing/landing-page.mdx` → `content/landing/page.mdx`
  - `ui/src/content/soveltamisohje/tarjousvaiheen-tietomaaritykset/*.md` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/*.md`
  - `ui/src/data/soveltamisohje/tarjousvaiheen-tietomaaritykset/meta.json` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/meta.json`
  - `ui/src/data/soveltamisohje/tarjousvaiheen-tietomaaritykset/manifest.json` → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/manifest.json`
  - 9 table JSONs → `content/soveltamisohje/tarjousvaiheen-tietomaaritykset/tables/*.json`
- Pretty-print each JSON file with 2-space indent, one object per line in the `arvot` array (verify each file — the current files already follow this; preserve it during moves).
- Update `content.config.ts` `base` paths (`./src/content/...` → `../content/...`) and the soveltamisohje pattern (`**/*.md` → `*/[0-9]*.md` so the new `tables/*.json` directory doesn't get matched).
- Update `soveltamisohje-loader.ts` glob patterns per the snippet above. Adjust `slugFromPath`/`basenameFromPath` for the new path depth.
- **Verify:**
  - `npm run dev` from `ui/`: landing renders, soveltamisohje page renders identically section-by-section.
  - Edit a JSON row in `content/.../tables/elementtityypit.json` → save → dev-server HMR shows the update.
  - `npm run build` succeeds; all ~80 `elementtityypit` rows present; Finnish characters intact.
  - Print preview (Ctrl+P): TOC, page breaks, table styling unchanged.
  - `npx astro check` green.
  - Push to a branch, let CI build, verify GitHub Pages deploy.

### Phase 3 — Image bucket
- Create `ui/public/content-images/landing/` and `ui/public/content-images/soveltamisohje/tarjousvaiheen-tietomaaritykset/` with a `.gitkeep` in each.
- Add one example image referenced from `page.mdx` (e.g., a BETK logo) to prove the absolute-URL pattern (`![alt](/betk-publishing/content-images/landing/foo.png)`) works in dev and on the deployed GitHub Pages site (mind the `/betk-publishing/` base path).
- **Verify:** image renders locally and on the deploy.

### Phase 4 — Editor onboarding artifacts
- Write `content/README.md` (one paragraph: "this folder holds all editable content; see EDITORS.md").
- Write `content/EDITORS.md` covering:
  - "How to edit a prose section" — pencil icon on github.com, edit markdown, commit on a new branch, open PR.
  - "How to edit a data table" — open the JSON file on github.com, click pencil, find the row you want, copy a similar line as a template, change the `koodi`/`kuvaus`, keep commas correct, save. Screenshot of the JSON pattern (`{ "koodi": "X", "kuvaus": "Y" }`) on its own line.
  - "How to edit meta/manifest" — same JSON-edit flow; what each field controls.
  - "How to add an image" — "Add file → Upload files" into `ui/public/content-images/<page>/`, then reference via the documented absolute path. Note the `/betk-publishing/` base.
  - "What gets published" — merges to `main` deploy automatically via GitHub Actions; PR validation catches malformed JSON via `astro check`.
  - "If something looks wrong on the live site" — link to the IssueTicket button or open a GitHub issue.
- Onboarding checklist for new editors: ensure GitHub account, be added to the repo as a collaborator (write role), bookmark the `content/` folder URL.
- **Verify:** ask one non-technical editor to make a trivial edit (fix a typo in `01-tausta.md`, add a row to `elementtityypit.json`) via github.com end-to-end. If they get stuck, the EDITORS.md is wrong.

### Phase 5 — Cleanup (after one release of stability)
- Delete `ui/src/content/landing/` and `ui/src/content/soveltamisohje/` (now empty or moved).
- Delete `ui/src/data/soveltamisohje/` (kept as fallback during Phase 2).
- **Do not** touch `ui/src/data/precast.json`, `precastProperties.json`, `valutarvike.json`, `valutarvikeProperties.json`, `types.ts`, `loader.ts`, `soveltamisohje-types.ts` — these are propertysets/product data, out of scope.

## Risks and call-outs

- **JSON editing on github.com is text-mode.** Editors must keep brackets/commas balanced. Mitigation: the existing one-row-per-line layout means editing reduces to "copy a line, change two values, save". `astro check` on PR builds catches malformed JSON before merge.
- **Image URLs need the `/betk-publishing/` base prefix** in production. Document the exact pattern in EDITORS.md and provide a copy-paste template.
- **PR preview deploys.** Current workflow only deploys on push to `main`. Editors won't see their changes until merge. A simple `preview` workflow (deploy each PR to a preview URL) would close this gap — out of scope for this plan, but worth a follow-up.
- **Future API integration.** Keeping data as JSON aligns with what a future product-data master API would return. If that integration arrives, the loader switches from reading local JSON files to fetching the same shape at build time — no schema churn.

## Verification checklist (end-to-end)

After Phase 2, the following must all hold:

- [ ] `npm run build` from `ui/` succeeds with no warnings about missing files.
- [ ] `npx astro check` green.
- [ ] Landing page renders the same heading + body as before (plus any new MDX content if added).
- [ ] Soveltamisohje page renders all 15 sections in the manifest order with identical content.
- [ ] All ~80 rows of `elementtityypit` appear in the rendered table; Finnish characters intact.
- [ ] Nested tables (pintakasittely, raudoitus-esimerkit) render with their child rows.
- [ ] Print preview (Ctrl+P in browser): TOC appears, sections break onto new pages, abbreviations table fits.
- [ ] Cross-reference links from element type codes to products still resolve.
- [ ] `IssueTicket` button still works.
- [ ] GitHub Pages deploy succeeds on push to a test branch.

## Critical files (for execution)

- `C:\Spheres\digisphere\betk-publishing\ui\src\data\soveltamisohje-loader.ts` (glob path changes, ~10–20 LOC)
- `C:\Spheres\digisphere\betk-publishing\ui\src\content.config.ts` (paths + soveltamisohje pattern)
- `C:\Spheres\digisphere\betk-publishing\ui\astro.config.mjs` (mdx + vite.fs.allow)
- `C:\Spheres\digisphere\betk-publishing\ui\package.json` (one dep: @astrojs/mdx)
- `C:\Spheres\digisphere\betk-publishing\ui\src\pages\soveltamisohje\[slug].astro` (no change expected — verify)
- New files: everything under `C:\Spheres\digisphere\betk-publishing\content\` (mostly moved, format unchanged)
- New folder: `C:\Spheres\digisphere\betk-publishing\ui\public\content-images\`