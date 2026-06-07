// Shared anchor (URL fragment) helpers. Used by both the cross-reference
// links in soveltamisohje docs and the browser pages they target, so the
// two sides can never drift apart.

// ASCII-safe slug: lowercase, fold Finnish/Swedish letters, collapse
// everything else to single hyphens. Safe to use in a hash without
// URL-encoding.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äå]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Property set section on /propertysets. Discipline-scoped because the same
// group name (e.g. "BETK-Materiaali") exists under several disciplines.
export function propertySetAnchor(discipline: string, group: string): string {
  return `pset-${slugify(discipline)}-${slugify(group)}`;
}

// Product row on /properties. Product names are unique across the catalog.
export function productAnchor(name: string): string {
  return `product-${slugify(name)}`;
}
