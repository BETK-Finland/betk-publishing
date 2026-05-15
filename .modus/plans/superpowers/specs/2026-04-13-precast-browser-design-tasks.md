# BETK Precast Browser — UI Tasks

Task list derived from `2026-04-13-precast-browser-design.md`. Each task is sized to keep diffs reviewable; phases are separated by verification checkpoints per CLAUDE.md rule 2.

**Current state of `ui/`:** Astro 6.1.6 installed, minimal scaffold (only `src/pages/` exists, no components/layouts/data/styles folders). Node 22.12+ required.

**Ground rules:**
- No `npm install` without explicit approval — ask first if a dep is needed.
- Python analysis scripts go in `ui/scripts/`, not `data/scripts/`.
- Verify with `npm run build` (and `astro check` if/when added) after each phase.

---

## Phase 0 — Preparation

- [ ] 0.1 Confirm `data/reference/precast.json` and `data/reference/precastProperties.json` exist and match schemas in the design spec.
- [ ] 0.2 Decide how `ui/` will import data from `../data/reference/*.json` (relative import vs. copy into `ui/src/data/`). Confirm with user.
- [ ] 0.3 Confirm whether `astro check` / TypeScript type-checking is expected (would need `@astrojs/check` + `typescript` — **requires approval to install**).

**Checkpoint:** Align on data-import approach and type-check expectations before writing code.

---

## Phase 1 — Data layer & TypeScript types

Files touched: ≤ 5

- [ ] 1.1 Create `ui/src/data/types.ts` — `Product` and `Property` interfaces from the spec.
- [ ] 1.2 Create `ui/src/data/loader.ts`:
  - Load both JSON files (build-time import).
  - Build `Map<string, Property>` keyed by property id.
  - Build nested tree: `Koodisto > Pääryhmä > Alaryhmä > Product[]`.
  - For each product, resolve `requiredPropertyIds` → `Property[]` grouped by `group`.
  - Export: `tree`, `propertyMap`, `resolveProductProperties(product)`.
- [ ] 1.3 Add `ui/tsconfig.json` paths/includes if needed for JSON imports (`resolveJsonModule`, etc.).

**Verification:** `npm run build` succeeds; loader can be imported from a throwaway page that logs counts (65 products, 133 properties).

---

## Phase 2 — Layout shell & global styles

Files touched: ≤ 3

- [ ] 2.1 Create `ui/src/layouts/Layout.astro` — HTML shell, `<slot />`, meta tags, link to global CSS.
- [ ] 2.2 Create `ui/src/styles/global.css` — dark theme tokens from the spec:
  - Background `#1a1a2e`, surface `#242442`, text `#e0e0e0`.
  - Accents: teal `#5eead4`, blue `#93c5fd`.
  - Badge bg `#2d2d4a`, row separator `#333355`.
  - System font stack + monospace for IDs.
- [ ] 2.3 Update `ui/src/pages/index.astro` to use `Layout` with a placeholder "BETK — PROPERTYT" header.

**Verification:** `npm run dev` shows styled empty page with header.

---

## Phase 3 — Product tree (read-only render)

Files touched: ≤ 4

- [ ] 3.1 Create `ui/src/components/ProductRow.astro` — single row with cells for name, generalId, version, id, uri, description, and a "Tiedot" button. Each togglable cell gets `data-column="<key>"`.
- [ ] 3.2 Create `ui/src/components/ProductTree.astro` — renders three nested levels (Koodisto → Pääryhmä → Alaryhmä) with product tables inside Alaryhmä. No interactivity yet; all nodes rendered expanded for visual verification.
- [ ] 3.3 Wire `ProductTree` into `index.astro` using data from `loader.ts`.
- [ ] 3.4 Style the tree (indent, separators, headings) per spec.

**Verification:** All 65 products render under correct hierarchy nodes; visual review.

---

## Phase 4 — Sidebar + column toggling

Files touched: ≤ 3

- [ ] 4.1 Create `ui/src/components/Sidebar.astro` — "SARAKKEIDEN SUODATUS" heading + checkboxes per the spec table (KUVAUS unchecked by default, TIEDOT always visible with no checkbox).
- [ ] 4.2 Add inline/page-level vanilla JS: checkbox `change` handler toggles a CSS class on `<body>` (e.g. `hide-col-description`) that hides matching `[data-column="description"]` cells.
- [ ] 4.3 Update `index.astro` to place sidebar + main in a two-column layout.

**Verification:** Toggling each checkbox shows/hides the right column without layout jumps.

---

## Phase 5 — Tree collapse/expand

Files touched: ≤ 2

- [ ] 5.1 Add vanilla JS: clicking Koodisto/Pääryhmä/Alaryhmä headers toggles an `open` class on the parent node. All nodes start collapsed.
- [ ] 5.2 CSS: hide children when parent lacks `open`; rotate/indicate pastel-teal caret based on state.

**Verification:** Fresh load shows only top-level Koodisto row; drilling down works at every level.

---

## Phase 6 — Detail modal

Files touched: ≤ 3

- [ ] 6.1 Create `ui/src/components/DetailModal.astro` — single modal element rendered once; content populated via JS.
- [ ] 6.2 For each product row, serialize resolved property-group data into `data-*` attributes or a hidden `<template>` keyed by product id.
- [ ] 6.3 JS: "Tiedot" click reads the data, populates modal (name, KUVAUS, grouped properties with label + `ifcPropertyType` badge + unit), shows overlay. Close via X button or backdrop click; Escape also closes.

**Verification:** Click through several products across different groups; verify grouping, badges, and close interactions.

---

## Phase 7 — Polish & build check

- [ ] 7.1 Run `npm run build`; fix any warnings.
- [ ] 7.2 Manual smoke test against spec: header, sidebar defaults, tree collapse state, modal behavior.
- [ ] 7.3 Note any deviations from spec in a short follow-up list for the user.

---

## Explicitly out of scope (v1)

Landing page, property-set descriptions page, search/filter, GitHub Actions deploy, other koodistos (non-PRECAST), responsive/mobile layout.
