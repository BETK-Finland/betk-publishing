# Multi-doc Soveltamisohje + Landing Page — Design

## Context

Today the site has two pages: `/` (Properties browser) and `/soveltamisohje` (a single hardcoded document). The project now needs:

- **Multiple soveltamisohjeet** for different BETK sub-standards (current precast one, RFID, Peppol, precast-embeds, GPS-in-BIM, more to come). Each is free-form today but standardization is welcomed, so the design targets a shared skeleton with per-doc variation.
- **Flat/"lazy" navigation** — the important destinations reachable in one click from the home page, not buried in menus.
- **A landing page at `/`** introducing the BETK supply chain concept, with Properties and each soveltamisohje reachable from it.

Properties remain the heart of the site. Additional product namespaces (e.g. precast-embeds) are out of scope for this refactor but the directory layout leaves room for them.

## URLs

```
/                                            Landing page (new)
/properties                                  Properties browser (moved from /)
/soveltamisohje/tarjousvaiheen-tietomaaritykset    Existing doc (renamed/slug-scoped)
/soveltamisohje/<slug>                       Future docs, same template
```

No separate `/soveltamisohje` index page — the landing page is the hub.

## File layout

```
ui/src/content/
  landing/
    landing-page.md                          # "COMING SOON.." placeholder, editable
  soveltamisohje/
    tarjousvaiheen-tietomaaritykset/
      01-tausta.md
      02-tarkoitus-ja-rajaukset.md
      03-*.md
      04-toimintaohjeita.md
      05-viittaukset.md

ui/src/data/
  soveltamisohje/
    tarjousvaiheen-tietomaaritykset/
      meta.json                              # renamed from existing meta.json
      manifest.json                          # new — see below
      kokoonpano-tyypit.json
      elementtityypit.json
      ...
```

The existing `src/data/soveltamisohje/*.json` files move wholesale into the per-doc folder. No content changes.

## Per-doc manifest

Each doc carries a `manifest.json` declaring what sections it renders and in what order. The template reads this and emits sections one by one.

```json
{
  "slug": "tarjousvaiheen-tietomaaritykset",
  "nav_title": "Tarjousvaiheen tietomääritykset ja toteutusvaiheen tietomalliohjeita toimitusketjulle",
  "sections": [
    { "kind": "prose", "content": "01-tausta", "anchor": "tausta" },
    { "kind": "prose", "content": "02-tarkoitus-ja-rajaukset", "anchor": "tarkoitus" },
    { "kind": "prose", "content": "03-tuotetiedot-intro", "anchor": "tuotetiedot" },
    { "kind": "prose+table", "content": "03-kokoonpano-tyyppi", "table": "kokoonpano-tyypit", "anchor": "kokoonpano-tyyppi" },
    { "kind": "prose+table", "content": "03-elementtityyppi",  "table": "elementtityypit",  "anchor": "elementtityyppi" },
    { "kind": "prose+table", "content": "03-raudoitus",        "table": "raudoitus",        "anchor": "raudoitus" },
    { "kind": "prose+pintakasittely", "content": "03-pintakasittely", "table": "pintakasittely", "anchor": "pintakasittely" },
    { "kind": "prose+table", "content": "03-varibetoni",    "table": "varibetoni",    "anchor": "varibetoni" },
    { "kind": "prose+table", "content": "03-vahahiilinen",  "table": "vahahiilinen",  "anchor": "vahahiilinen" },
    { "kind": "prose+table", "content": "03-tyyppielementti","table": "tyyppielementti","anchor": "tyyppielementti" },
    { "kind": "prose+table", "content": "03-kaantokivi",    "table": "kaantokivi",    "anchor": "kaantokivi" },
    { "kind": "prose",       "content": "04-toimintaohjeita", "anchor": "toimintaohjeita" },
    { "kind": "glossary",    "data": "lyhenteet",            "anchor": "lyhenteet" },
    { "kind": "reinforcement-annex", "data": "raudoitus-esimerkit", "anchor": "liite-1" },
    { "kind": "prose",       "content": "05-viittaukset",    "anchor": "viittaukset" }
  ]
}
```

Section "kinds":
- `prose` — render a markdown entry.
- `prose+table` — render markdown, then render a standard value table.
- `prose+pintakasittely` — markdown + the nested pintakasittely table (different shape).
- `glossary` — render the glossary table.
- `reinforcement-annex` — render the annex example tables.

Future docs declare any subset; missing kinds are skipped.

### `meta.json` is unchanged

Title, subtitle, publisher, date, version, status, versiohistoria, laatijat — all stays as-is, just lives under the per-doc folder. The template reads it the same way.

## Dynamic route

`src/pages/soveltamisohje/[slug].astro`:

- `getStaticPaths` — enumerate doc folders from `src/data/soveltamisohje/` at build time.
- Page reads `meta.json` + `manifest.json` for the slug.
- Iterates the manifest and renders one section per entry, reusing the existing `SoveltamisohjeHeader`, `SoveltamisohjeToc`, `PrintToc`, `ProseSection`, `DataTable`, `ReinforcementTable` components.
- TOC (`SoveltamisohjeToc`) becomes data-driven — takes sections from the manifest instead of a hardcoded list.

## Loader refactor

`src/data/soveltamisohje-loader.ts` today statically imports one doc's JSON files. That flips to:

- Exports `getDoc(slug)` returning `{ meta, manifest, tables, glossary, reinforcementExamples }` for a given slug.
- Exports `listDocs()` returning `{ slug, meta, nav_title }[]` for the landing-page nav.
- Uses `import.meta.glob` (eager, JSON) to discover per-doc JSONs at build time — no manual import list per doc.

## Content collection

`src/content.config.ts`:

```ts
const soveltamisohje = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/soveltamisohje" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

const landing = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/landing" }),
  schema: z.object({ title: z.string() }),
});
```

Entry ids become `<slug>/<filename>` (e.g. `tarjousvaiheen-tietomaaritykset/01-tausta`), which is what the manifest `content` field matches against.

## Landing page at `/`

`src/pages/index.astro`:

- Page title: **"BETK — Betonielementin toimitusketju"**
- Left column (where Properties' column-filter used to live): nav list
  - **Properties** → `/properties`
  - one entry per soveltamisohje, labelled from `manifest.nav_title`, linking to `/soveltamisohje/<slug>`
- Main column: renders `landing-page.md` (frontmatter title + body "COMING SOON..")

New styles reuse `.sidebar` / `.sidebar-heading` look so landing and Properties visually echo each other.

## Properties page — move and toolbar rework

- `src/pages/properties.astro` receives the former `index.astro` body.
- The left `Sidebar.astro` (column-filter) is removed from this page. Its responsibility moves to a new `ColumnFilterBar.astro`: a full-width horizontal strip sitting **above** the product tree. Checkboxes stacked vertically inside the strip (one per line), same `data-column` / body-class `hide-col-<key>` wiring — no JS behaviour change.
- `Sidebar.astro` keeps existing. It's no longer used by the Properties page, so it can be deleted — inspect first and remove only if no other page uses it.

## Layout / top nav

`src/layouts/Layout.astro` currently renders an `<a href="/">Propertyt</a>` + `<a href="/soveltamisohje">Soveltamisohje</a>` header.

Updates:
- "Propertyt" → "Properties", target `/properties`
- "Soveltamisohje" → drop (since the landing page is the hub, a single-target link there is low-value). Optional: leave a "Etusivu" / home link pointing to `/`.
- Heading title stays driven by the page's `title` prop.

## Out of scope

- Multiple Properties namespaces (precast-embeds etc.) — future refactor, separate spec.
- A `/soveltamisohje` index page.
- Any visual redesign of the Properties table itself.
- Content changes to existing markdown/JSON.

## Phasing

Each phase stays under 5 files per CLAUDE.md constraint and is separately committable.

**Phase 1 — Restructure (foundation).**
Move content + data into per-doc folder. Add `manifest.json`. Update `content.config.ts`, `soveltamisohje-loader.ts`. Keep existing `soveltamisohje.astro` working against the new layout. No user-visible change.

**Phase 2 — Dynamic route.**
Convert `pages/soveltamisohje.astro` into `pages/soveltamisohje/[slug].astro` reading from the manifest. Make `SoveltamisohjeToc` data-driven. Old URL `/soveltamisohje` now redirects or 404s; new URL is `/soveltamisohje/tarjousvaiheen-tietomaaritykset`.

**Phase 3 — Landing page.**
Add `landing` content collection + `landing-page.md`. Build new `index.astro` with title, nav list, markdown body. Update `Layout.astro` top nav.

**Phase 4 — Properties move + top toolbar.**
Move `/` body into `pages/properties.astro`. Build `ColumnFilterBar.astro`. Remove or retarget `Sidebar.astro`. Re-wire internal links.

**Phase 5 — Verification.**
`npm run build`, `astro check`, manual smoke test of all routes including print view.

## Verification checklist

- `npm run build` succeeds
- `astro check` reports no errors
- `/` renders landing page with title and nav
- `/properties` renders the property tree; filter toolbar at top toggles columns correctly
- `/soveltamisohje/tarjousvaiheen-tietomaaritykset` renders identically to pre-refactor (header, TOC, all sections, print view)
- Print stylesheet still expands `<details>` and stamps date

## Open items

- Slug for existing doc: **`tarjousvaiheen-tietomaaritykset`** — approved.
- Whether `Sidebar.astro` has any other consumer before deletion — inspect during Phase 4.
