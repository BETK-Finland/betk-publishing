# Plan: Reverse-engineer JSON → Excel + unified build script

## Context

`ui/src/data/precast.json` (65 products) and `ui/src/data/precastProperties.json` (133 shared properties) are currently hand-maintained. End users can't edit them. CLAUDE.md claims "Python scripts in `ui/scripts/` convert Excel → JSON" but no such script exists — the JSONs were committed directly.

We want:
1. A single Excel workbook that end users (engineers, designers) can edit to control the catalog.
2. A new namespace `embeds.json` (for embedded parts) generated from the same workbook, **sharing** `precastProperties.json`.
3. One Python script that regenerates all JSON outputs from the Excel, and also seeds the Excel from the current JSONs (one-time reverse) so we can round-trip verify before cutting over.

This eliminates the drift risk between the Excel source and the committed JSONs, and gives us a scalable shape for future product-type namespaces (steel, wood, etc. per CLAUDE.md).

## Design

### Workbook layout — `betk-data.xlsx` (project root)

**The sheet name IS the namespace.** The first sheet is always the shared properties; every subsequent sheet is one product namespace, and its name becomes the output filename (`<sheetname>.json`).

| Sheet order | Name | Purpose | Shape |
|---|---|---|---|
| 1 | `precastProperties` | **Shared** across all namespaces → writes `precastProperties.json` | One row per property. Columns: `id`, `label`, `group`, `ifcPropertyType`, `dataType`, `unit`, `exampleValue`, `requirement`, `allowedValues`, `description`, `version` |
| 2 | `precast` | Source for `precast.json` | One row per product. Metadata columns + one boolean-ish column per property ID |
| 3+ | `<namespace>` (e.g. `embeds`) | Source for `<namespace>.json` — added by the user simply by adding a sheet | Same shape as `precast` |

Adding a new namespace = add a new sheet with the same columns and run `build`. The script does not need to know namespace names in advance — it discovers them by walking sheets after the first.

Row order in each sheet is authoritative — the script emits JSON in sheet-row order, matching today's insertion order.

### Namespace sheet column layout

Metadata columns (left side, frozen):

```
id | name | generalId | discipline | version | uri | description | koodisto | pääryhmä | alaryhmä
```

Then a dynamic **matrix block** — one column per property, header = property `id` (e.g. `Ominaisuus-BETK-012`). A second header row shows the property `label` for readability only (ignored on parse). A cell value in `{X, x, TRUE, true, 1}` means the property is in `requiredPropertyIds`; empty/anything else means it's not.

Why IDs as headers, not labels: IDs are stable, labels can change. Round-trip is deterministic.

Why matrix over long-format join: end users see at a glance which properties apply to which product; adding/removing is a single cell flip; openpyxl handles 133 columns fine; freeze panes make navigation painless.

### Script — `build_data.py` (project root)

Two subcommands in one file:

- `python build_data.py dump` — reads `ui/src/data/precast.json` + `ui/src/data/precastProperties.json` and writes `betk-data.xlsx` with sheets in order: `precastProperties`, `precast`. Idempotent. (User adds a third sheet like `embeds` later by copying the `precast` sheet structure.)
- `python build_data.py build` — reads `betk-data.xlsx`. Sheet 1 (`precastProperties`) → `ui/src/data/precastProperties.json`. Every subsequent sheet → `ui/src/data/<sheetname>.json`. Namespaces are discovered by walking the sheet list; no hardcoded list.

Shared helpers: a single `WorkbookSchema` that defines column names and property metadata fields so both directions stay in lockstep.

Dependencies: `openpyxl` (pure-Python, already standard for this kind of work). Per CLAUDE.md "Never install Python packages" — the user will install `openpyxl` themselves; the script will emit a clear error if it's missing.

### Loader / UI changes

**None required for precast.** `loader.ts` is namespace-agnostic — it just reads `precast.json` + `precastProperties.json` and resolves IDs. Emitting `embeds.json` in the same shape means the loader can be extended later (add a second import + merge into the tree, or render `/embeds` as a parallel page) without changing the data contract.

We are **not** wiring `embeds.json` into the UI in this task. Only the data pipeline.

### Round-trip verification

After `dump`, immediately run `build` and diff against the originals:

```
python build_data.py dump
python build_data.py build
git diff ui/src/data/precast.json ui/src/data/precastProperties.json
```

Exit criterion: `git diff` is empty (byte-for-byte identical, including key order, whitespace, and Unicode characters like `ä`/`ö`). If it's not, the script is wrong — fix it before shipping. This is how we prove no data loss.

### JSON formatting rules the script must preserve

From inspecting the current files:
- 2-space indent
- Unicode characters written literally (not `\uXXXX` escapes) → `ensure_ascii=False`
- Trailing newline at EOF
- Key order matches the type definition in `types.ts` (id, name, generalId, discipline, version, uri, description, hierarchy, requiredPropertyIds for products)
- Empty strings preserved (not omitted / not null)

## Files

**New (project root, per user preference overriding the `ui/scripts/` memory note):**
- `C:\Spheres\lab\betk-publishing\build_data.py` — the script (both subcommands)
- `C:\Spheres\lab\betk-publishing\betk-data.xlsx` — generated by `dump`, committed

**Read for reference (no edits):**
- `C:\Spheres\lab\betk-publishing\ui\src\data\precast.json` — current 65 products
- `C:\Spheres\lab\betk-publishing\ui\src\data\precastProperties.json` — current 133 properties
- `C:\Spheres\lab\betk-publishing\ui\src\data\types.ts` — canonical field list & key order
- `C:\Spheres\lab\betk-publishing\ui\src\data\loader.ts` — confirms shared-properties, namespace-agnostic design

**Untouched:**
- `ui/src/data/loader.ts`, all `.astro` components, `types.ts`

## Verification (end-to-end)

**Human-run (one-time env setup):**
```
pip install openpyxl
```

**Agent-run (within task):**
1. `python build_data.py dump` — produces `betk-data.xlsx`
2. `python build_data.py build` — regenerates the two JSONs (+ any additional namespace sheets)
3. `git diff ui/src/data/precast.json ui/src/data/precastProperties.json` — must be **empty**
4. `cd ui && npm run build` — Astro build must succeed (loader still parses the regenerated JSONs)
5. Smoke-check counts: loader exports `productCount=65`, `propertyCount=133` post-rebuild

**Human-run (sanity):**
6. Open `betk-data.xlsx`, flip one cell in the `precast` sheet (e.g. remove a property from Anturaelementti), re-run `build`, confirm the change lands in `precast.json` and the UI reflects it.
7. Add a new sheet named `embeds` with the same column layout and at least one product row; run `build`; confirm `ui/src/data/embeds.json` appears with the correct shape.
