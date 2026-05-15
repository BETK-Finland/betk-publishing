# BETK Precast Browser Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Astro + TypeScript web UI that browses BETK precast products, their hierarchy, and required IFC properties, deployable to GitHub Pages.

**Architecture:** Astro static-output site in `ui/`. A build-time TypeScript loader reads the two JSON files from `data/reference/`, resolves product → property relationships, and emits a nested catalog tree. Astro components render the tree, sidebar filter, and detail modal. Interactivity uses native HTML (`<details>`, `<dialog>`) plus a small vanilla JS script for column-visibility toggles.

**Tech Stack:** Astro (static output), TypeScript, Vitest (loader unit tests), native `<details>` / `<dialog>` elements, vanilla JS, CSS custom properties. No frameworks, no runtime fetching.

**Spec:** `plans/superpowers/specs/2026-04-13-precast-browser-design.md`

**Scope boundary — human vs. agent:**

- **User handles:** Node via `fnm`, `npm install` in `ui/`, composing `ui/src/pages/index.astro`, visual verification via `python -m http.server` against `ui/dist/`.
- **Agents handle:** Tasks 1–11 — scaffold config, loader (TDD), styles, components, client script. Agents never run `npm install` or `astro dev`.

**User checkpoint after Task 1:** before dispatching Task 2, user must run `cd ui && npm install` so subsequent tasks can invoke `npm run check` and `npm test`.

---

## Pre-flight notes for the executing agent

Read this whole section before starting Task 1. The repo state has a few non-obvious quirks.

- **No git, no commits.** This project is not a git repo yet (`git status` → fatal). The plan deliberately contains no `git add` / `git commit` steps. Do not run `git init` or commit anything. Demo cleanup and the initial commit are the user's job, after this iteration ships visually.
- **Don't touch sibling files in `ui/scripts/`.** `analyze-data.py` and `analyze-structure.js` already exist there — they are exploratory data-inspection scripts, not part of this build. New code goes in `ui/src/`. (Memory note: analysis/UI helper scripts live in `ui/scripts/`; agent-authored Astro source is the only thing under `ui/src/`.)
- **Only two JSON files are in scope.** `data/reference/` contains other files — `TYHJENNETTY - products.json`, `TYHJENNETTY - systemsProperties.json`, etc. Those are out of scope. Touch only `precast.json` and `precastProperties.json`.
- **Windows + bash.** Shell is bash on Windows 11. Use forward slashes in paths. `python -m http.server` is the verification mechanism (user-run).
- **Subagent context hygiene.** If you are dispatched as a subagent for one task, read only that task's section of this plan, not the whole document. The plan is ~1.1k lines.
- **`node_modules/` may not exist when you run.** Tasks 2+ assume the user has run `npm install`. If `node_modules/` is missing, stop and report — do not run `npm install` yourself.
- **Finnish characters everywhere.** Hierarchy values (`TERÄSBETONI`, `JÄNNITETTY`), group names, product labels. Write all files as UTF-8.

---

## File Structure

Files this plan creates, all under `ui/`:

| Path | Responsibility |
|------|----------------|
| `ui/package.json` | npm scripts, dependencies |
| `ui/astro.config.mjs` | static output, base path |
| `ui/tsconfig.json` | strict TS, path aliases |
| `ui/vitest.config.ts` | Vitest runner config |
| `ui/src/data/types.ts` | Product / Property / Catalog types |
| `ui/src/data/loader.ts` | Pure build-time catalog builder |
| `ui/src/data/loader.test.ts` | Vitest tests for loader |
| `ui/src/data/fixtures.ts` | Small hand-written test fixtures |
| `ui/src/styles/global.css` | Dark theme tokens + layout |
| `ui/src/layouts/Layout.astro` | HTML shell, imports global CSS |
| `ui/src/components/Sidebar.astro` | Column-filter checkboxes |
| `ui/src/components/ProductTree.astro` | 3-level `<details>` tree |
| `ui/src/components/ProductRow.astro` | Table row + "Tiedot" trigger |
| `ui/src/components/DetailModal.astro` | `<dialog>` per product |
| `ui/src/scripts/ui.ts` | Column toggle + modal open/close |
| `ui/README.md` | Dev / build instructions |

`ui/src/pages/index.astro` is composed by the user after Task 11 — see the "User-run" section at the end of this plan.

JSON data is imported directly from `../../data/reference/*.json` using Vite's built-in JSON loader.

---

## Task 1: Scaffold Astro project

**Files:**
- Create: `ui/package.json`
- Create: `ui/astro.config.mjs`
- Create: `ui/tsconfig.json`
- Create: `ui/.gitignore`
- Create: `ui/README.md`

**Agent must NOT run `npm install`, `npm run build`, or `astro dev`** — the user handles Node/Astro setup. Write files only, then commit.

- [ ] **Step 1: Create `ui/package.json`**

```json
{
  "name": "betk-precast-browser",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "astro": "^4.16.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "typescript": "^5.6.3",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 2: Create `ui/astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

// Static output suitable for GitHub Pages.
// `base` is left unset for now; set to the repo name (e.g. '/betk-publishing')
// when the deploy workflow is added in a later iteration.
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets'
  }
});
```

- [ ] **Step 3: Create `ui/tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "resolveJsonModule": true,
    "allowImportingTsExtensions": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "astro.config.mjs"],
  "exclude": ["dist", "node_modules"]
}
```

- [ ] **Step 4: Create `ui/.gitignore`**

```
node_modules
dist
.astro
*.log
.env
.env.*
```

- [ ] **Step 5: Create `ui/README.md`**

```markdown
# BETK Precast Browser

Static Astro site that browses BETK precast products and required IFC properties.

## Dev

```
cd ui
npm install
npm run dev
```

## Build (static output → `ui/dist/`)

```
npm run build
```

## Test

```
npm test
```

Data sources live in `../data/reference/`.
```

**→ USER CHECKPOINT:** Before Task 2, run:
```
cd ui
fnm use                  # or whatever initializes fnm in this shell
node -v                  # sanity check
npm install              # resolves lockfile + installs astro, vitest, typescript
```
Subsequent tasks assume `node_modules/` is populated. If an agent finds the modules missing, it should report that and stop rather than attempting to install.

---

## Task 2: Domain types

**Files:**
- Create: `ui/src/data/types.ts`

- [ ] **Step 1: Create `ui/src/data/types.ts`**

```ts
// Raw shapes as they appear in data/reference/*.json.

export interface RawProduct {
  id: string;
  name: string;
  generalId: string;
  discipline: string;
  version: string;
  uri: string;
  description: string;
  hierarchy: [string, string, string]; // [Koodisto, Pääryhmä, Alaryhmä]
  requiredPropertyIds: string[];
}

export interface Property {
  id: string;
  version: string;
  label: string;
  group: string;
  ifcPropertyType: string;
  dataType: string;
  unit: string;
  exampleValue: string;
  requirement: string;
  allowedValues: string;
  description: string;
}

// Structures produced by the loader.

export interface PropertyGroup {
  name: string;           // value of Property.group
  properties: Property[]; // in input order, deduped by id
}

export interface ResolvedProduct extends RawProduct {
  propertyGroups: PropertyGroup[];
  slug: string;           // safe id usable in DOM attributes
}

export interface AlaryhmaNode {
  name: string;
  products: ResolvedProduct[];
}

export interface PaaryhmaNode {
  name: string;
  alaryhmat: AlaryhmaNode[];
}

export interface KoodistoNode {
  name: string;
  version: string;
  paaryhmat: PaaryhmaNode[];
}

export interface Catalog {
  koodistot: KoodistoNode[];
}
```

- [ ] **Step 2: Typecheck**

Run from `ui/`:
```
npm run check
```
Expected: zero errors.


---

## Task 3: Loader fixtures

**Files:**
- Create: `ui/src/data/fixtures.ts`

- [ ] **Step 1: Create `ui/src/data/fixtures.ts`**

```ts
import type { Property, RawProduct } from './types';

// Hand-written minimal fixtures covering:
// - two koodistot
// - two pääryhmät within one koodisto
// - two alaryhmät within one pääryhmä
// - a product referencing properties across two groups
// - a property id listed by a product that does NOT exist in the property list
// - two products sharing a property id (dedup within a group across products N/A —
//   dedup is per-product, but we verify stable ordering)

export const properties: Property[] = [
  {
    id: 'P-001',
    version: '0.1',
    label: 'GUID',
    group: 'Identifiers',
    ifcPropertyType: 'IfcLabel',
    dataType: 'Text',
    unit: '',
    exampleValue: '',
    requirement: '',
    allowedValues: '',
    description: ''
  },
  {
    id: 'P-002',
    version: '0.1',
    label: 'Mass',
    group: 'Physical',
    ifcPropertyType: 'IfcMassMeasure',
    dataType: 'Number',
    unit: 'kg',
    exampleValue: '500',
    requirement: '',
    allowedValues: '',
    description: ''
  },
  {
    id: 'P-003',
    version: '0.1',
    label: 'Name',
    group: 'Identifiers',
    ifcPropertyType: 'IfcLabel',
    dataType: 'Text',
    unit: '',
    exampleValue: '',
    requirement: '',
    allowedValues: '',
    description: ''
  }
];

export const products: RawProduct[] = [
  {
    id: '',
    name: 'Anturaelementti',
    generalId: 'A',
    discipline: 'PRECAST',
    version: '0.1',
    uri: '',
    description: 'Footing element',
    hierarchy: ['BETONIELEMENTIT', 'TERÄSBETONI', 'Muut elementit'],
    // P-001 and P-003 belong to group Identifiers; P-002 to Physical.
    // P-999 is intentionally missing from the property list.
    requiredPropertyIds: ['P-001', 'P-002', 'P-003', 'P-999']
  },
  {
    id: '',
    name: 'Seinäelementti',
    generalId: 'S',
    discipline: 'PRECAST',
    version: '0.1',
    uri: '',
    description: '',
    hierarchy: ['BETONIELEMENTIT', 'TERÄSBETONI', 'SW-elementit'],
    requiredPropertyIds: ['P-001']
  },
  {
    id: '',
    name: 'Jännitetty palkki',
    generalId: 'JP',
    discipline: 'PRECAST',
    version: '0.1',
    uri: '',
    description: '',
    hierarchy: ['BETONIELEMENTIT', 'JÄNNITETTY', 'Palkit'],
    requiredPropertyIds: ['P-002']
  },
  {
    id: '',
    name: 'Esim',
    generalId: 'X',
    discipline: 'OTHER',
    version: '0.2',
    uri: '',
    description: '',
    hierarchy: ['MUUT', 'RYHMÄ', 'Osa'],
    requiredPropertyIds: []
  }
];
```

- [ ] **Step 2: Typecheck**

Run: `npm run check`
Expected: zero errors.


---

## Task 4: Loader — tree grouping (failing test first)

**Files:**
- Create: `ui/src/data/loader.ts`
- Create: `ui/src/data/loader.test.ts`
- Create: `ui/vitest.config.ts`

- [ ] **Step 1: Create `ui/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node'
  }
});
```

- [ ] **Step 2: Write failing test for tree shape**

Create `ui/src/data/loader.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { buildCatalog } from './loader';
import { products, properties } from './fixtures';

describe('buildCatalog — hierarchy', () => {
  it('groups products into Koodisto > Pääryhmä > Alaryhmä in input order', () => {
    const catalog = buildCatalog(products, properties, { version: '0.1' });

    expect(catalog.koodistot.map(k => k.name)).toEqual([
      'BETONIELEMENTIT',
      'MUUT'
    ]);

    const betoni = catalog.koodistot[0];
    expect(betoni.version).toBe('0.1');
    expect(betoni.paaryhmat.map(p => p.name)).toEqual([
      'TERÄSBETONI',
      'JÄNNITETTY'
    ]);

    const terasbetoni = betoni.paaryhmat[0];
    expect(terasbetoni.alaryhmat.map(a => a.name)).toEqual([
      'Muut elementit',
      'SW-elementit'
    ]);

    expect(terasbetoni.alaryhmat[0].products.map(p => p.name))
      .toEqual(['Anturaelementti']);
    expect(terasbetoni.alaryhmat[1].products.map(p => p.name))
      .toEqual(['Seinäelementti']);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run from `ui/`: `npm test`
Expected: FAIL — `buildCatalog` not exported from `./loader`.

- [ ] **Step 4: Write minimal loader implementation**

Create `ui/src/data/loader.ts`:

```ts
import type {
  AlaryhmaNode,
  Catalog,
  KoodistoNode,
  PaaryhmaNode,
  Property,
  PropertyGroup,
  RawProduct,
  ResolvedProduct
} from './types';

export interface BuildOptions {
  /** Version shown on the top-level Koodisto header. */
  version: string;
}

export function buildCatalog(
  rawProducts: RawProduct[],
  rawProperties: Property[],
  opts: BuildOptions
): Catalog {
  const koodistot: KoodistoNode[] = [];

  for (const p of rawProducts) {
    const [kName, paaName, alaName] = p.hierarchy;

    let k = koodistot.find(x => x.name === kName);
    if (!k) {
      k = { name: kName, version: opts.version, paaryhmat: [] };
      koodistot.push(k);
    }

    let pa = k.paaryhmat.find(x => x.name === paaName);
    if (!pa) {
      pa = { name: paaName, alaryhmat: [] };
      k.paaryhmat.push(pa);
    }

    let al = pa.alaryhmat.find(x => x.name === alaName);
    if (!al) {
      al = { name: alaName, products: [] };
      pa.alaryhmat.push(al);
    }

    al.products.push(resolveProduct(p, rawProperties));
  }

  return { koodistot };
}

function resolveProduct(
  p: RawProduct,
  properties: Property[]
): ResolvedProduct {
  // Placeholder — fleshed out in later task.
  return {
    ...p,
    propertyGroups: [],
    slug: slugify(`${p.generalId}-${p.name}`)
  };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS for the hierarchy test.


---

## Task 5: Loader — resolve properties and group them

**Files:**
- Modify: `ui/src/data/loader.ts`
- Modify: `ui/src/data/loader.test.ts`

- [ ] **Step 1: Add failing tests for property resolution**

Append to `ui/src/data/loader.test.ts`:

```ts
describe('buildCatalog — property resolution', () => {
  it('resolves ids into grouped, in-input-order properties', () => {
    const catalog = buildCatalog(products, properties, { version: '0.1' });

    const anturaelementti = catalog.koodistot[0]
      .paaryhmat[0]
      .alaryhmat[0]
      .products[0];

    expect(anturaelementti.propertyGroups.map(g => g.name))
      .toEqual(['Identifiers', 'Physical']);

    expect(anturaelementti.propertyGroups[0].properties.map(p => p.label))
      .toEqual(['GUID', 'Name']);
    expect(anturaelementti.propertyGroups[1].properties.map(p => p.label))
      .toEqual(['Mass']);
  });

  it('silently drops property ids not present in the property list', () => {
    const catalog = buildCatalog(products, properties, { version: '0.1' });
    const anturaelementti = catalog.koodistot[0]
      .paaryhmat[0]
      .alaryhmat[0]
      .products[0];

    const allLabels = anturaelementti.propertyGroups
      .flatMap(g => g.properties.map(p => p.label));
    expect(allLabels).not.toContain('P-999');
    expect(allLabels).toHaveLength(3);
  });

  it('produces a DOM-safe slug per product', () => {
    const catalog = buildCatalog(products, properties, { version: '0.1' });
    const jannitetty = catalog.koodistot[0]
      .paaryhmat[1]
      .alaryhmat[0]
      .products[0];
    expect(jannitetty.slug).toBe('jp-jannitetty-palkki');
  });
});
```

- [ ] **Step 2: Run tests to verify failures**

Run: `npm test`
Expected: the two new resolution tests FAIL (propertyGroups is empty).

- [ ] **Step 3: Replace `resolveProduct` in `ui/src/data/loader.ts`**

Replace the placeholder body:

```ts
function resolveProduct(
  p: RawProduct,
  properties: Property[]
): ResolvedProduct {
  const byId = new Map(properties.map(pr => [pr.id, pr]));
  const groups: PropertyGroup[] = [];

  for (const id of p.requiredPropertyIds) {
    const prop = byId.get(id);
    if (!prop) continue;

    let group = groups.find(g => g.name === prop.group);
    if (!group) {
      group = { name: prop.group, properties: [] };
      groups.push(group);
    }
    if (!group.properties.some(existing => existing.id === prop.id)) {
      group.properties.push(prop);
    }
  }

  return {
    ...p,
    propertyGroups: groups,
    slug: slugify(`${p.generalId}-${p.name}`)
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: all four tests PASS.


---

## Task 6: Loader entrypoint that reads real JSON

**Files:**
- Modify: `ui/src/data/loader.ts`
- Modify: `ui/tsconfig.json` (add JSON module resolution if missing)

- [ ] **Step 1: Re-read `ui/src/data/loader.ts`**

Read the file to confirm current contents before editing.

- [ ] **Step 2: Append a `loadCatalog()` entrypoint that reads real JSON**

Append to `ui/src/data/loader.ts`:

```ts
// Vite/Astro-native JSON imports. Paths are relative to THIS file.
import rawProductsJson from '../../../data/reference/precast.json';
import rawPropertiesJson from '../../../data/reference/precastProperties.json';

/**
 * Build the catalog from the real data files. The version shown on the
 * top-level Koodisto header is derived from the first product (all precast
 * products currently share version 0.1). Fallback is '0.1'.
 */
export function loadCatalog(): Catalog {
  const rawProducts = rawProductsJson as RawProduct[];
  const rawProperties = rawPropertiesJson as Property[];
  const version = rawProducts[0]?.version ?? '0.1';
  return buildCatalog(rawProducts, rawProperties, { version });
}
```

- [ ] **Step 3: Sanity-check with the Astro compiler**

Run from `ui/`: `npm run check`
Expected: zero errors.

- [ ] **Step 4: Sanity-check with Vitest**

Run: `npm test`
Expected: all previous tests still PASS. (No new tests here — `loadCatalog` is a thin wrapper; it'll be exercised end-to-end by the Astro build in Task 12.)


---

## Task 7: Global styles

**Files:**
- Create: `ui/src/styles/global.css`

- [ ] **Step 1: Create `ui/src/styles/global.css`**

```css
:root {
  --bg: #1a1a2e;
  --surface: #242442;
  --surface-2: #2d2d4a;
  --text: #e0e0e0;
  --text-strong: #ffffff;
  --accent: #5eead4;        /* pastel teal */
  --accent-2: #93c5fd;      /* pastel blue */
  --divider: #333355;
  --font-sans: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  --font-mono: ui-monospace, Menlo, Consolas, monospace;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.5;
}

a { color: var(--accent-2); }

.app {
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.app__header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--divider);
  color: var(--text-strong);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.app__body {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 0;
}

.app__sidebar {
  border-right: 1px solid var(--divider);
  padding: 24px;
}

.app__main {
  padding: 24px 32px;
}

/* Sidebar */

.sidebar__title {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin: 0 0 12px;
}

.sidebar__list { list-style: none; padding: 0; margin: 0; }
.sidebar__item { margin: 6px 0; }
.sidebar__item input { accent-color: var(--accent); }

/* Tree */

details { margin: 0; }
details > summary {
  list-style: none;
  cursor: pointer;
  padding: 8px 0;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
details > summary::-webkit-details-marker { display: none; }

details > summary::before {
  content: '▸';
  color: var(--accent);
  transition: transform 0.1s ease;
  display: inline-block;
  width: 1em;
}
details[open] > summary::before { transform: rotate(90deg); }

.tree__koodisto > summary {
  font-size: 18px;
  color: var(--text-strong);
  font-weight: 600;
  letter-spacing: 0.05em;
}
.tree__koodisto { margin-bottom: 16px; }

.tree__paaryhma { margin-left: 16px; }
.tree__paaryhma > summary { font-size: 16px; color: var(--text-strong); }

.tree__alaryhma { margin-left: 24px; }
.tree__alaryhma > summary { font-size: 14px; color: var(--accent-2); }

.tree__products {
  margin: 8px 0 16px 32px;
}

/* Product table */

.products {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
  border-radius: 6px;
  overflow: hidden;
}
.products th, .products td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid var(--divider);
  font-size: 13px;
}
.products th {
  background: var(--surface-2);
  color: var(--text-strong);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.08em;
}
.products tbody tr:last-child td { border-bottom: none; }

.products td.mono, .products th.mono { font-family: var(--font-mono); }

.products .btn-tiedot {
  background: var(--surface-2);
  color: var(--accent);
  border: 1px solid var(--divider);
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.products .btn-tiedot:hover { border-color: var(--accent); }

/* Column hiding — applied on table root via .hide-col-<col> */
.hide-col-name      [data-column="name"],
.hide-col-generalId [data-column="generalId"],
.hide-col-version   [data-column="version"],
.hide-col-id        [data-column="id"],
.hide-col-uri       [data-column="uri"],
.hide-col-description [data-column="description"] {
  display: none;
}

/* Modal */

dialog.detail {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 0;
  width: min(720px, 90vw);
  max-height: 85vh;
}
dialog.detail::backdrop {
  background: rgba(0, 0, 0, 0.6);
}

.detail__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px 12px;
  border-bottom: 1px solid var(--divider);
}
.detail__title {
  margin: 0;
  font-size: 20px;
  color: var(--text-strong);
}
.detail__close {
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}

.detail__body {
  padding: 16px 24px 24px;
  overflow-y: auto;
}

.detail__section { margin-top: 20px; }
.detail__section-title {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--accent);
  text-transform: uppercase;
  margin: 0 0 8px;
}

.detail__group {
  background: var(--surface-2);
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
}
.detail__group-name {
  color: var(--accent-2);
  font-weight: 600;
  margin: 0 0 6px;
  font-size: 13px;
}
.detail__prop {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  padding: 4px 0;
  border-top: 1px solid var(--divider);
  align-items: center;
}
.detail__prop:first-of-type { border-top: none; }
.detail__prop-label { color: var(--text-strong); }
.detail__prop-type {
  background: var(--surface-2);
  color: var(--accent-2);
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid var(--divider);
}
.detail__prop-unit {
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 12px;
  min-width: 40px;
  text-align: right;
}
```


---

## Task 8: Layout

**Files:**
- Create: `ui/src/layouts/Layout.astro`

- [ ] **Step 1: Create `ui/src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---
<!doctype html>
<html lang="fi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <div class="app">
      <header class="app__header">{title}</header>
      <div class="app__body">
        <slot />
      </div>
    </div>
  </body>
</html>
```


---

## Task 9: Sidebar component

**Files:**
- Create: `ui/src/components/Sidebar.astro`

- [ ] **Step 1: Create `ui/src/components/Sidebar.astro`**

```astro
---
// Column filter checkboxes. "Tiedot" column has no checkbox — always visible.
// The `data-col` value must match the column keys used in ProductTree.astro.
const columns: Array<{
  key: 'name' | 'generalId' | 'version' | 'id' | 'uri' | 'description';
  label: string;
  defaultChecked: boolean;
}> = [
  { key: 'name',        label: 'TUOTEOSAN NIMI', defaultChecked: true },
  { key: 'generalId',   label: 'TUNNUS',         defaultChecked: true },
  { key: 'version',     label: 'VERSIO',         defaultChecked: true },
  { key: 'id',          label: 'ID',             defaultChecked: true },
  { key: 'uri',         label: 'LINKKI',         defaultChecked: true },
  { key: 'description', label: 'KUVAUS',         defaultChecked: false }
];
---
<aside class="app__sidebar">
  <h2 class="sidebar__title">SARAKKEIDEN SUODATUS</h2>
  <ul class="sidebar__list">
    {columns.map(col => (
      <li class="sidebar__item">
        <label>
          <input
            type="checkbox"
            class="js-column-toggle"
            data-col={col.key}
            checked={col.defaultChecked}
          />
          {col.label}
        </label>
      </li>
    ))}
  </ul>
</aside>
```


---

## Task 10: Product tree + row + detail modal components

**Files:**
- Create: `ui/src/components/ProductRow.astro`
- Create: `ui/src/components/ProductTree.astro`
- Create: `ui/src/components/DetailModal.astro`

- [ ] **Step 1: Create `ui/src/components/ProductRow.astro`**

The row does not track column visibility — the `.hide-col-*` classes are applied to the surrounding `<table>` element (see ProductTree) and CSS hides matching `[data-column=...]` descendants. The row's only responsibilities are rendering cells with stable `data-column` attributes and a Tiedot button whose `data-target` references the dialog id.

```astro
---
import type { ResolvedProduct } from '../data/types';

interface Props {
  product: ResolvedProduct;
}

const { product } = Astro.props;
---
<tr>
  <td data-column="name">{product.name}</td>
  <td data-column="generalId" class="mono">{product.generalId}</td>
  <td data-column="version" class="mono">{product.version}</td>
  <td data-column="id" class="mono">{product.id || '—'}</td>
  <td data-column="uri">
    {product.uri
      ? <a href={product.uri} target="_blank" rel="noreferrer">link</a>
      : '—'}
  </td>
  <td data-column="description">{product.description || '—'}</td>
  <td>
    <button
      type="button"
      class="btn-tiedot js-open-detail"
      data-target={`detail-${product.slug}`}
    >Tiedot</button>
  </td>
</tr>
```

- [ ] **Step 2: Create `ui/src/components/ProductTree.astro`**

```astro
---
import type { Catalog } from '../data/types';
import ProductRow from './ProductRow.astro';

interface Props {
  catalog: Catalog;
  initialHiddenColumns: string[]; // column keys hidden by default
}

const { catalog, initialHiddenColumns } = Astro.props;
const tableClasses = [
  'products',
  ...initialHiddenColumns.map(k => `hide-col-${k}`)
].join(' ');
---
<div class="tree js-tree-root">
  {catalog.koodistot.map(k => (
    <details class="tree__koodisto">
      <summary>{k.name} (Versio {k.version})</summary>
      {k.paaryhmat.map(pa => (
        <details class="tree__paaryhma">
          <summary>{pa.name}</summary>
          {pa.alaryhmat.map(al => (
            <details class="tree__alaryhma">
              <summary>{al.name}</summary>
              <div class="tree__products">
                <table class={tableClasses}>
                  <thead>
                    <tr>
                      <th data-column="name">TUOTEOSAN NIMI</th>
                      <th data-column="generalId">TUNNUS</th>
                      <th data-column="version">VERSIO</th>
                      <th data-column="id">ID</th>
                      <th data-column="uri">LINKKI</th>
                      <th data-column="description">KUVAUS</th>
                      <th>TIEDOT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {al.products.map(p => <ProductRow product={p} />)}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </details>
      ))}
    </details>
  ))}
</div>
```

- [ ] **Step 3: Create `ui/src/components/DetailModal.astro`**

```astro
---
import type { ResolvedProduct } from '../data/types';

interface Props {
  product: ResolvedProduct;
}

const { product } = Astro.props;
---
<dialog class="detail" id={`detail-${product.slug}`}>
  <div class="detail__header">
    <h2 class="detail__title">{product.name}</h2>
    <button type="button" class="detail__close js-close-detail" aria-label="Sulje">×</button>
  </div>
  <div class="detail__body">
    {product.description && (
      <section class="detail__section">
        <h3 class="detail__section-title">KUVAUS</h3>
        <p>{product.description}</p>
      </section>
    )}

    <section class="detail__section">
      <h3 class="detail__section-title">
        TUOTEOSAN VAADITUT OMINAISUUDET (Property Set + Property)
      </h3>
      {product.propertyGroups.map(g => (
        <div class="detail__group">
          <h4 class="detail__group-name">{g.name}</h4>
          {g.properties.map(pr => (
            <div class="detail__prop">
              <span class="detail__prop-label">{pr.label}</span>
              <span class="detail__prop-type">{pr.ifcPropertyType}</span>
              <span class="detail__prop-unit">{pr.unit || '—'}</span>
            </div>
          ))}
        </div>
      ))}
    </section>
  </div>
</dialog>
```

- [ ] **Step 4: Typecheck**

Run from `ui/`: `npm run check`
Expected: zero errors.


---

## Task 11: Client-side UI script

**Files:**
- Create: `ui/src/scripts/ui.ts`

- [ ] **Step 1: Create `ui/src/scripts/ui.ts`**

```ts
// Wires up three interactions:
// 1. Column filter checkboxes toggle .hide-col-<key> on every .products table.
// 2. "Tiedot" buttons call showModal() on the matching <dialog>.
// 3. Close button and backdrop click close the dialog.
//
// Tree expand/collapse is handled natively by <details> elements.

function setColumnHidden(col: string, hidden: boolean): void {
  const cls = `hide-col-${col}`;
  for (const table of document.querySelectorAll<HTMLTableElement>('table.products')) {
    table.classList.toggle(cls, hidden);
  }
}

function initColumnToggles(): void {
  const boxes = document.querySelectorAll<HTMLInputElement>('input.js-column-toggle');
  for (const box of boxes) {
    const col = box.dataset.col;
    if (!col) continue;
    // Sync initial state in case default attribute and checkbox disagree.
    setColumnHidden(col, !box.checked);
    box.addEventListener('change', () => setColumnHidden(col, !box.checked));
  }
}

function initDetailModals(): void {
  for (const btn of document.querySelectorAll<HTMLButtonElement>('button.js-open-detail')) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.target;
      if (!id) return;
      const dlg = document.getElementById(id);
      if (dlg instanceof HTMLDialogElement) dlg.showModal();
    });
  }

  for (const dlg of document.querySelectorAll<HTMLDialogElement>('dialog.detail')) {
    // Close button.
    dlg.querySelector('.js-close-detail')?.addEventListener('click', () => dlg.close());

    // Backdrop click — only fires when target is the dialog itself.
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) dlg.close();
    });
  }
}

function init(): void {
  initColumnToggles();
  initDetailModals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
```

- [ ] **Step 2: Typecheck**

Run from `ui/`: `npm run check`
Expected: zero errors.


---

## User-run: compose index page and verify

Agent work stops after Task 11. Everything below is done by the user at the terminal. Kept in this plan document so the intent and acceptance criteria are in one place.

### Compose `ui/src/pages/index.astro`

Create (or replace) `ui/src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Sidebar from '../components/Sidebar.astro';
import ProductTree from '../components/ProductTree.astro';
import DetailModal from '../components/DetailModal.astro';
import { loadCatalog } from '../data/loader';

const catalog = loadCatalog();

// Flatten every product so we can render one <dialog> per product.
const allProducts = catalog.koodistot
  .flatMap(k => k.paaryhmat)
  .flatMap(pa => pa.alaryhmat)
  .flatMap(al => al.products);

// Must match the defaultChecked setup in Sidebar.astro.
const initialHiddenColumns = ['description'];
---
<Layout title="BETK — PROPERTYT">
  <Sidebar />
  <main class="app__main">
    <ProductTree catalog={catalog} initialHiddenColumns={initialHiddenColumns} />
    {allProducts.map(p => <DetailModal product={p} />)}
  </main>
</Layout>

<script>
  import '../scripts/ui.ts';
</script>
```

### Build and verify

From `ui/`:

```
npm run check     # zero type errors expected
npm test          # loader unit tests expected to pass
npm run build     # produces ui/dist/
```

### Serve `ui/dist/` with Python and open the page

From `ui/dist/`:

```
python -m http.server 8000
```

Open `http://localhost:8000/` in a browser. This mirrors how GitHub Pages will serve the site — absolute asset paths (`/assets/...`) resolve correctly against the server root.

**Smoke checks:**
- Header reads "BETK — PROPERTYT".
- Sidebar shows six checkboxes; KUVAUS is the only one unchecked.
- Tree shows "BETONIELEMENTIT (Versio 0.1)" collapsed at the top.
- Click expands TERÄSBETONI and JÄNNITETTY.
- Expanding an Alaryhmä reveals a products table.
- Clicking "Tiedot" on any row opens a modal grouped by property set.
- × button and backdrop click both close the modal.
- Toggling KUVAUS shows/hides the description column everywhere.

### Cleanup before git (later, user-run)

When the demo is judged ready, before `git init`-ing this project:

- Delete `node_modules/` (rebuilt by `npm install`).
- Delete `ui/dist/` (build artifact).
- Delete `ui/.astro/` (build cache).
- Confirm `.gitignore` includes `node_modules`, `dist`, `.astro`, `*.log`, `.env*` (the Task 1 file already does).
- Decide whether `ui/scripts/analyze-data.py` and `ui/scripts/analyze-structure.js` belong in the repo or stay local.
- Decide whether the `TYHJENNETTY - *.json` files in `data/reference/` should be committed or excluded.
- `git init`, then craft the initial commit history at whatever granularity feels right (single big "initial commit" or chunked by feature).

---

## Notes for the implementer

- **Finnish characters** appear in hierarchy names and group names (ä, ö, é). Use UTF-8 for every file. Astro defaults to this.
- **Astro JSON imports** work via Vite. If TypeScript complains about missing module declarations for the JSON imports in loader.ts, ensure `resolveJsonModule: true` in `tsconfig.json` (set in Task 1).
- **`<details>`** is the whole tree-toggle mechanism — do not add custom JS to reimplement it.
- **`<dialog>`** is supported in all evergreen browsers (Chrome/Edge/Firefox/Safari). Fallback polyfills are out of scope.
- **CLAUDE.md Rule 2** (phased execution, 5 files per phase): every agent task touches ≤ 5 files. Task 10 creates three component files.
- **CLAUDE.md Rule 4** (forced verification): for tasks that touch the loader (4/5/6), run `npm test` and `npm run check` and confirm zero errors before declaring the task done. Without git commits between tasks, this is the only safety net.
- **CLAUDE.md Rule 9** (edit integrity): Before editing `loader.ts` in Tasks 5 and 6, re-read it. After editing, re-read again to confirm changes applied.
- **Agents must not run `npm install`, `astro dev`, or `astro build`.** If `node_modules/` is missing when an agent tries `npm run check` or `npm test`, the agent should stop and report — do not attempt to install.
- **Out of scope (spec §"Out of Scope v1"):** landing page, Tietosisällöt page, search, GitHub Actions workflow, multiple koodistot, responsive layout. Do not implement them.
