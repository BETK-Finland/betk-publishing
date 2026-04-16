// Build-time loader for soveltamisohje docs.
// Discovers per-doc folders under ./soveltamisohje/<slug>/ and exposes a
// getDoc(slug) / listDocs() API so pages and the landing-page nav can be
// driven from manifests instead of hardcoded imports.

import type { Product, Property } from "./types";
import type {
  DocumentMeta,
  ValueTable,
  PintakasittelyTable,
  Lyhenteet,
  RaudoitusEsimerkit,
} from "./soveltamisohje-types";

import productsJson from "./precast.json";
import propertiesJson from "./precastProperties.json";

const products = productsJson as Product[];
const properties = propertiesJson as Property[];

// --- Manifest shape ---

export type SectionKind =
  | "prose"
  | "prose+table"
  | "prose+pintakasittely"
  | "glossary"
  | "reinforcement-annex";

export interface ManifestSection {
  kind: SectionKind;
  content?: string; // markdown filename without .md, for prose kinds
  table?: string;   // JSON filename without .json, for table kinds
  data?: string;    // JSON filename without .json, for glossary / reinforcement-annex
  anchor: string;
  label?: string;   // TOC label for non-prose kinds; prose kinds derive from frontmatter
}

export interface Manifest {
  slug: string;
  nav_title: string;
  sections: ManifestSection[];
}

// --- Glob imports (eager, build-time) ---

// Path keys look like: ./soveltamisohje/<slug>/<file>.json
const metaModules = import.meta.glob<DocumentMeta>(
  "./soveltamisohje/*/meta.json",
  { eager: true, import: "default" },
);
const manifestModules = import.meta.glob<Manifest>(
  "./soveltamisohje/*/manifest.json",
  { eager: true, import: "default" },
);
// Everything else under each doc folder — table data, glossary, annex examples.
const dataModules = import.meta.glob<unknown>(
  "./soveltamisohje/*/*.json",
  { eager: true, import: "default" },
);

function slugFromPath(path: string): string {
  // ./soveltamisohje/<slug>/<file>.json -> <slug>
  const parts = path.split("/");
  return parts[parts.length - 2];
}

function basenameFromPath(path: string): string {
  // ./soveltamisohje/<slug>/<file>.json -> <file>
  const file = path.split("/").pop()!;
  return file.replace(/\.json$/, "");
}

// Index everything by slug so lookups are O(1).
interface DocRecord {
  slug: string;
  meta: DocumentMeta;
  manifest: Manifest;
  tables: Record<string, ValueTable | PintakasittelyTable | Lyhenteet | RaudoitusEsimerkit>;
}

const docs: Record<string, DocRecord> = {};

for (const [path, meta] of Object.entries(metaModules)) {
  const slug = slugFromPath(path);
  docs[slug] = {
    slug,
    meta,
    // Manifest and tables filled in below.
    manifest: undefined as unknown as Manifest,
    tables: {},
  };
}

for (const [path, manifest] of Object.entries(manifestModules)) {
  const slug = slugFromPath(path);
  if (docs[slug]) {
    docs[slug].manifest = manifest;
  }
}

for (const [path, data] of Object.entries(dataModules)) {
  const slug = slugFromPath(path);
  const name = basenameFromPath(path);
  if (name === "meta" || name === "manifest") continue;
  if (docs[slug]) {
    docs[slug].tables[name] = data as ValueTable | PintakasittelyTable | Lyhenteet | RaudoitusEsimerkit;
  }
}

// --- Public API ---

export function getDoc(slug: string): DocRecord {
  const doc = docs[slug];
  if (!doc) throw new Error(`Unknown soveltamisohje slug: ${slug}`);
  if (!doc.manifest) throw new Error(`Missing manifest.json for doc: ${slug}`);
  return doc;
}

export function listDocs(): Array<{ slug: string; meta: DocumentMeta; manifest: Manifest }> {
  return Object.values(docs)
    .filter(d => d.manifest)
    .map(d => ({ slug: d.slug, meta: d.meta, manifest: d.manifest }));
}

// --- Cross-reference maps (product-scoped, not doc-scoped) ---

export const elementTypeToProducts: Map<string, Product[]> = new Map();
for (const product of products) {
  const gid = product.generalId;
  const bucket = elementTypeToProducts.get(gid);
  if (bucket) {
    bucket.push(product);
  } else {
    elementTypeToProducts.set(gid, [product]);
  }
}

export const propertySetToProperties: Map<string, Property[]> = new Map();
for (const prop of properties) {
  const bucket = propertySetToProperties.get(prop.group);
  if (bucket) {
    bucket.push(prop);
  } else {
    propertySetToProperties.set(prop.group, [prop]);
  }
}
