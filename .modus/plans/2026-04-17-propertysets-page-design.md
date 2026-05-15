# Property Sets page — Design

## Context

The Properties page (`/properties`) lists products grouped by Koodisto → Pääryhmä → Alaryhmä, with a property-filter sidebar and an expandable tree. The user wants a parallel page that lists **property sets** (the `group` field on each Property), with each set expandable to reveal its properties in a full table.

There are currently 7 property sets, sizes 5–49. Flat, no hierarchy.

## Route and nav

- URL: `/propertysets`
- Landing page (`/`) nav gets a new entry **"Property-setit"** → `/propertysets`, alongside the existing Properties entry.
- Top-of-page header reuses `Layout.astro` with `title="BETK — Property-setit"`.

## Data

New export in `src/data/loader.ts`:

```ts
export interface PropertySet {
  group: string;
  properties: Property[];
}

export const propertySets: PropertySet[];
```

Built by grouping `properties` by `group`, preserving insertion order. Exposed alphabetically within each set by `label`, or natural JSON order if that's already sensible — prefer the latter for consistency with Properties page behaviour.

## UI structure

Mirror the Properties page visually:

```
<Layout title="BETK — Property-setit">
  <div class="app-main">
    <Sidebar columns={propertyColumns} heading="..." />   ← parameterized
    <section class="tree-pane">
      {propertySets.map(set => (
        <section class="node">
          <header class="node-header"> caret, h2=set.group, count </header>
          <div class="node-body">
            <table class="property-set-table">
              ...columns...
              {set.properties.map(p => <row/>)}
            </table>
          </div>
        </section>
      ))}
    </section>
  </div>
</Layout>
```

Reuse the existing `.node` / `.node-header` / caret toggle pattern and its inline script — extract the expand-collapse JS into a small shared helper or inline a duplicate (duplicate is fine; the script is ~15 lines). Start with a duplicated inline script; extract only if it grows.

## Sidebar parameterization

`Sidebar.astro` is currently hardcoded with the Properties column list. Make it accept:

```ts
interface Props {
  heading: string;
  columns: ColumnToggle[];
  // `always-on` row appended automatically if needed — keep the existing TIEDOT row only for Properties page
}
```

- Properties page passes its existing 6 columns + TIEDOT always-on row.
- Property-sets page passes property-table columns (no TIEDOT row).
- The body-class wiring (`hide-col-<key>` → `[data-column="<key>"]`) already generalises — CSS selectors in `global.css` get a second block for property-set-specific column keys.

## Property-set table columns

Column keys (for `data-column` and body-class wiring) and defaults:

| Column key   | Heading           | Default checked |
|--------------|-------------------|-----------------|
| `label`      | LABEL             | on (effectively always) |
| `ifcType`    | IFC PROPERTY TYPE | on |
| `dataType`   | DATA TYPE         | on |
| `unit`       | UNIT              | on |
| `requirement`| REQUIREMENT       | on |
| `exampleValue` | EXAMPLE VALUE   | off |
| `allowedValues` | ALLOWED VALUES | off |
| `description`| DESCRIPTION       | off |
| `propId`     | ID                | off |
| `propVersion`| VERSION           | off |

Keys are distinct from Properties-page keys so the two pages don't cross-toggle. CSS gets a dedicated block for these keys in `global.css`.

The `group` field is not shown — it's constant within each expanded set.

## File changes

Target 5 files.

1. `src/data/loader.ts` — add `propertySets` export + type.
2. `src/components/Sidebar.astro` — parameterize with `heading` and `columns` props.
3. `src/pages/properties.astro` — pass the existing columns to the parameterized Sidebar.
4. `src/pages/propertysets.astro` — new page.
5. `src/pages/index.astro` — add "Property-setit" nav entry.
6. `src/styles/global.css` — add `hide-col-<propertyset-key>` selectors and any table-specific styles.

That's 6. Acceptable — close to the 5-file ceiling and each change is small. If the CSS additions are trivial I can keep them inside the new page's scoped `<style>` block and drop global.css from the list.

## Out of scope

- Sorting / search within a set (can be added later based on feedback).
- Per-property detail modal.
- Cross-linking from property-set view to products that require a set (covered tangentially by Properties page already).
- Mobile-first responsive polish — same posture as Properties page.

## Verification

- `astro check` clean.
- `astro build` emits `/propertysets/index.html`.
- Manual smoke: landing nav → Property-setit loads; each set expands/collapses; column toggles hide/show columns; navigating to Properties page still works unchanged.
