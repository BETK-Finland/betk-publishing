# BETK Precast Browser — Design Spec

## Purpose

A static web UI for browsing BETK precast element data (products and their required IFC properties). Modeled after the talotekniikka-sovellus reference app. First iteration, demo-quality, deployed to GitHub Pages as static files.

## Tech Stack

- **Astro** (static output mode) + TypeScript
- No frontend framework — vanilla client-side JS for interactions
- JSON data imported at build time
- Output: static `dist/` folder suitable for GitHub Pages

## Data Sources

- `data/reference/precast.json` — 65 products with hierarchy and requiredPropertyIds
- `data/reference/precastProperties.json` — 133 properties with group, ifcPropertyType, unit, etc.

### Product Schema

```ts
interface Product {
  id: string;            // empty for now
  name: string;          // "Anturaelementti"
  generalId: string;     // "A"
  discipline: string;    // "PRECAST"
  version: string;       // "0.1"
  uri: string;           // empty for now
  description: string;   // mostly empty
  hierarchy: [string, string, string]; // [Koodisto, Pääryhmä, Alaryhmä]
  requiredPropertyIds: string[];
}
```

### Property Schema

```ts
interface Property {
  id: string;              // "Ominaisuus-BETK-012"
  version: string;
  label: string;           // "GUID"
  group: string;           // "BETK-Tunnistetiedot ja luokittelu"
  ifcPropertyType: string; // "IfcLabel"
  dataType: string;
  unit: string;
  exampleValue: string;
  requirement: string;
  allowedValues: string;
  description: string;
}
```

## Page Layout

Single page with three zones:

```
┌──────────────────────────────────────────────────┐
│                    HEADER                         │
├────────────┬─────────────────────────────────────┤
│  SIDEBAR   │          MAIN CONTENT               │
│            │                                     │
│  Column    │  ▼ BETONIELEMENTIT (Versio 0.1)     │
│  filters   │    ▼ TERÄSBETONI                    │
│            │      ▼ SW-elementit                 │
│            │        [table rows: products]        │
│            │      ▼ Laattaelementit              │
│            │        [table rows: products]        │
│            │    ▼ JÄNNITETTY                     │
│            │      ...                            │
└────────────┴─────────────────────────────────────┘
```

### Header

- Title: "BETK — PROPERTYT"
- Minimal, no navigation needed for v1

### Sidebar — Column Filters (SARAKKEIDEN SUODATUS)

Checkboxes controlling column visibility in the product table:

| Checkbox Label   | Maps to         | Default |
|------------------|-----------------|---------|
| TUOTEOSAN NIMI   | name            | checked |
| TUNNUS           | generalId       | checked |
| VERSIO           | version         | checked |
| ID               | id              | checked |
| LINKKI           | uri             | checked |
| KUVAUS           | description     | unchecked |
| TIEDOT           | detail button   | always visible, no checkbox |

Client-side JS toggles column visibility by adding/removing a CSS class.

### Main Content — Collapsible Product Tree

Three-level collapsible hierarchy:

1. **Koodiston nimi** (hierarchy[0]): "BETONIELEMENTIT" with version from data
2. **Pääryhmä** (hierarchy[1]): "TERÄSBETONI", "JÄNNITETTY"
3. **Alaryhmä** (hierarchy[2]): "SW-elementit", "Laattaelementit", etc.

Under each Alaryhmä, a table of products with the togglable columns plus a "Tiedot" button.

All tree nodes start collapsed. Click to expand/collapse.

### Detail Modal

Triggered by clicking "Tiedot" on a product row. Overlay/modal showing:

1. **Product name** — large heading
2. **KUVAUS** — description text (if available)
3. **TUOTEOSAN VAADITUT OMINAISUUDET (Property Set + Property)** — properties grouped by `group` field

Each property group rendered as a section header, with rows showing:
- Property label
- ifcPropertyType (as a dark badge/tag)
- unit

Close button (X) in top-right corner.

## Project Structure

```
ui/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # HTML shell, global styles
│   ├── components/
│   │   ├── Sidebar.astro         # Column filter checkboxes
│   │   ├── ProductTree.astro     # 3-level collapsible tree
│   │   ├── ProductRow.astro      # Single product table row
│   │   └── DetailModal.astro     # Property detail overlay
│   ├── data/
│   │   └── loader.ts             # Reads JSON, builds hierarchy, resolves properties
│   ├── pages/
│   │   └── index.astro           # Main page composing all components
│   └── styles/
│       └── global.css            # Dark theme, pastel accents
├── scripts/
│   └── analyze-data.py           # Data analysis helper
└── public/
    └── (static assets if needed)
```

## Data Loading (loader.ts)

Build-time module that:

1. Reads both JSON files
2. Creates a `Map<string, Property>` keyed by property id
3. Builds a nested tree structure: `Koodisto > Pääryhmä > Alaryhmä > Product[]`
4. For each product, resolves `requiredPropertyIds` to `Property[]` grouped by `group`
5. Exports the tree and resolved product data for use in Astro components

## Visual Style

- **Background:** dark grey (#1a1a2e)
- **Surface/cards:** slightly lighter grey (#242442)
- **Text:** light grey (#e0e0e0), white for headings
- **Primary accent:** pastel teal (#5eead4)
- **Secondary accent:** pastel blue (#93c5fd)
- **Tree expand indicators:** pastel teal
- **Property type badges:** dark background (#2d2d4a) with pastel blue text
- **Row separators:** subtle (#333355)
- **Font:** system font stack, monospace for IDs/codes

## Client-Side JavaScript

Minimal vanilla JS, inlined or in a single `<script>` tag:

1. **Tree toggle:** Click on Koodisto/Pääryhmä/Alaryhmä headers to expand/collapse children
2. **Column toggle:** Checkbox change events add/remove CSS class on table columns using `data-column` attributes
3. **Modal open/close:** "Tiedot" button sets modal content from a hidden `<template>` or `data-*` attributes and shows the overlay. Close button or backdrop click dismisses.

No search functionality in v1.

## Out of Scope (v1)

- Landing page (Etusivu)
- Property set descriptions page (Tietosisällöt)
- Search/filter functionality
- GitHub Actions deployment workflow
- Multiple koodisto support (other product types)
- Responsive/mobile layout
