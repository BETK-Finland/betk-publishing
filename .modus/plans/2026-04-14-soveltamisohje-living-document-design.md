# BETK Soveltamisohje — Living Document Design

## Context

The BETK application guide ("Tarjousvaiheen tietomääritykset ja toteutusvaiheen tietomalliohjeita toimitusketjulle") is a ~1350-line specification document that defines allowed IFC property values for precast concrete elements in the Finnish construction industry. Currently it exists as a static markdown file. It needs to become an Astro-rendered page backed by JSON and markdown files, cross-referenced with the existing precast property browser data. The page must be printable as a clean PDF suitable for use as a contract appendix in BIM project specifications.

## Data Architecture

### Document metadata — `src/data/soveltamisohje/meta.json`

Version, date, status, publisher, authors list, version history table.

### Table data — one JSON file per table in `src/data/soveltamisohje/`

| File | Content | ~Count |
|------|---------|--------|
| `kokoonpano-tyypit.json` | Assembly types | 5 values |
| `elementtityypit.json` | Element type codes + descriptions | ~65 entries |
| `raudoitus.json` | Reinforcement codes R1–R9 | 9 entries |
| `pintakasittely.json` | Surface treatment PK1–PK9 + sub-options | ~30 entries |
| `varibetoni.json` | Colored concrete options | ~10 entries |
| `vahahiilinen.json` | Low-carbon boolean field | 2 values |
| `tyyppielementti.json` | Type element boolean field | 2 values |
| `kaantokivi.json` | Flip element boolean field | 2 values |
| `lyhenteet.json` | Glossary/terminology | ~7 entries |
| `raudoitus-esimerkit.json` | Appendix reinforcement example tables (V-type, S/SK-type) | 2 matrices |

Each value-table JSON follows a common envelope:

```json
{
  "tietosisalto": "Elementtityyppi",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Elementin tyyppi, koodi / Elementin tyyppi, kuvaus",
  "arvot": [
    { "koodi": "A", "kuvaus": "Anturaelementti" },
    { "koodi": "PH", "kuvaus": "Pilariholkkielementti" }
  ]
}
```

### Prose sections — Astro content collection in `src/content/soveltamisohje/`

| File | Section |
|------|---------|
| `01-tausta.md` | Background |
| `02-tarkoitus-ja-rajaukset.md` | Purpose and scope |
| `03-tuotetiedot-intro.md` | Section 3 intro paragraph (before any tables) |
| `03-kokoonpano-tyyppi.md` | Explanatory text for table 3.1.1 |
| `03-elementtityyppi.md` | Explanatory text for table 3.1.2 |
| `03-raudoitus.md` | Explanatory text for table 3.1.3 |
| `03-pintakasittely.md` | Explanatory text for table 3.1.4 |
| `03-varibetoni.md` | Explanatory text for table 3.1.5 |
| `03-vahahiilinen.md` | Explanatory text for table 3.1.6 |
| `03-tyyppielementti.md` | Explanatory text for table 3.1.7 |
| `03-kaantokivi.md` | Explanatory text for table 3.1.8 |
| `04-toimintaohjeita.md` | Operations guidelines |
| `05-viittaukset.md` | References and footnotes |

Each file has frontmatter with `title` and `order` fields.

## Cross-Referencing with Precast Data

New file: `src/data/soveltamisohje-loader.ts`

Responsibilities:
1. Import all soveltamisohje JSON files and existing precast data (`precast.json`, `precastProperties.json`)
2. Build cross-reference maps:
   - `elementTypeToProducts: Map<string, Product[]>` — maps element type codes (V, S, O...) to products from `precast.json` by matching against product `generalId` prefixes
   - `propertySetToProperties: Map<string, Property[]>` — maps ominaisuusjoukko names to properties from `precastProperties.json` by group
3. Export the assembled document structure and cross-reference maps
4. Reuse existing types from `types.ts`, extend with soveltamisohje-specific types

The existing `loader.ts` stays untouched. The soveltamisohje loader reads the same JSON sources but does not modify the existing product browser's data flow.

## Page Structure

Single Astro page at `src/pages/soveltamisohje.astro`. Uses existing `Layout.astro` with title override.

### Components

| Component | Purpose |
|-----------|---------|
| `SoveltamisohjeHeader.astro` | Document title, version badge, date. Collapsible version history and authors list from `meta.json` |
| `SoveltamisohjeToc.astro` | Sticky sidebar table of contents. Scrollspy highlights active section. Hidden in print. |
| `PrintToc.astro` | Static inline TOC rendered in document flow. Visible only in print. |
| `ProseSection.astro` | Renders a single markdown content collection entry. Reused per section. |
| `DataTable.astro` | Renders a table JSON file. Shows envelope fields as header block, then allowed values. Reused for all table types. |
| `ReinforcementTable.astro` | Specialized component for appendix floor-by-floor reinforcement matrices. |
| `CrossReferenceLink.astro` | Inline link from element type code or property set name to matching entry in the property browser. Shows count badge ("12 products"). |

### Page assembly order

1. `SoveltamisohjeHeader` (metadata)
2. `PrintToc` (print only)
3. Prose: Tausta
4. Prose: Tarkoitus ja rajaukset
5. Prose: Tuotetiedot intro
6. For each of the 8 property tables (3.1.1–3.1.8): prose from its dedicated `03-*.md` file, then `DataTable`
7. Prose: Toimintaohjeita
8. `DataTable`: Lyhenteet (glossary)
9. `ReinforcementTable`: Appendix examples (V-type and S/SK-type)
10. Prose: Viittaukset

### Navigation

Sticky sidebar TOC on the left (240px, matching existing browser sidebar). Scrollspy highlights active section. On screen only — print uses the inline `PrintToc`.

## Print Design

The page must produce a clean PDF via browser print (`Ctrl+P`).

### `@media print` rules

- **Hide:** sticky sidebar TOC, cross-reference count badges, `<details>` toggle arrows (expand all content)
- **Show:** `PrintToc`, print date stamp
- **Force:** white background, black text, visible borders on all tables
- **Page breaks:** `break-before: page` on `<h2>` sections, `break-inside: avoid` on tables and metadata block
- **Typography:** serif font stack for body text, monospace preserved for code values

### Print date stamp

- Set via `beforeprint` JS event: `new Date().toLocaleDateString('fi-FI')`
- Rendered in document header block (below version/status, above TOC) — visible only in print
- Format: `Tulostettu: 14.4.2026`
- Repeated in `@page` footer alongside document title and version
- Proves which version of the living document was printed for contract use

### Contract-readiness

- `@page` footer on every page: document title, version, date
- First page: full title block with publisher, version, status
- Sequential table numbering ("Taulukko 1.", "Taulukko 2.") matching original document
- Footnotes rendered as endnotes at bottom of relevant section (not tooltips)
- No JavaScript dependency for content — all static HTML at build time

## Files Modified/Created

### New files
- `src/pages/soveltamisohje.astro`
- `src/data/soveltamisohje/meta.json`
- `src/data/soveltamisohje/kokoonpano-tyypit.json`
- `src/data/soveltamisohje/elementtityypit.json`
- `src/data/soveltamisohje/raudoitus.json`
- `src/data/soveltamisohje/pintakasittely.json`
- `src/data/soveltamisohje/varibetoni.json`
- `src/data/soveltamisohje/vahahiilinen.json`
- `src/data/soveltamisohje/tyyppielementti.json`
- `src/data/soveltamisohje/kaantokivi.json`
- `src/data/soveltamisohje/lyhenteet.json`
- `src/data/soveltamisohje/raudoitus-esimerkit.json`
- `src/data/soveltamisohje-loader.ts`
- `src/data/soveltamisohje-types.ts`
- `src/content/soveltamisohje/01-tausta.md`
- `src/content/soveltamisohje/02-tarkoitus-ja-rajaukset.md`
- `src/content/soveltamisohje/03-tuotetiedot-intro.md`
- `src/content/soveltamisohje/03-kokoonpano-tyyppi.md`
- `src/content/soveltamisohje/03-elementtityyppi.md`
- `src/content/soveltamisohje/03-raudoitus.md`
- `src/content/soveltamisohje/03-pintakasittely.md`
- `src/content/soveltamisohje/03-varibetoni.md`
- `src/content/soveltamisohje/03-vahahiilinen.md`
- `src/content/soveltamisohje/03-tyyppielementti.md`
- `src/content/soveltamisohje/03-kaantokivi.md`
- `src/content/soveltamisohje/04-toimintaohjeita.md`
- `src/content/soveltamisohje/05-viittaukset.md`
- `src/content.config.ts` (content collection definition)
- `src/components/SoveltamisohjeHeader.astro`
- `src/components/SoveltamisohjeToc.astro`
- `src/components/PrintToc.astro`
- `src/components/ProseSection.astro`
- `src/components/DataTable.astro`
- `src/components/ReinforcementTable.astro`
- `src/components/CrossReferenceLink.astro`

### Modified files
- `src/styles/global.css` — add print styles and soveltamisohje-specific styles
- `src/layouts/Layout.astro` — may need minor adjustment for two-layout-mode support (sidebar vs full-width)

### Untouched
- `src/data/loader.ts`
- `src/data/precast.json`
- `src/data/precastProperties.json`
- `src/pages/index.astro`
- All existing components

## Verification

1. `npm run build` succeeds with no type errors
2. `npx astro check` passes
3. Dev server: `/soveltamisohje` renders all sections with correct data
4. Cross-reference links navigate to correct products in the browser page
5. Browser print preview: clean layout, print date visible, no sidebar, all `<details>` expanded, page breaks at `<h2>` boundaries
6. JSON data matches original markdown document tables exactly (spot-check element type counts, surface treatment options)
