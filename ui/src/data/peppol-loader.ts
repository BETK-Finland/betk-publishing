// Build-time loader for the Peppol intro page.
// Reads meta.json + manifest.json from /content/peppol/ (repo root).
// Mirrors landing-loader: single-page, multi-section markdown driven by manifest.

export interface PeppolMeta {
  otsikko: string;
  alaotsikko?: string;
  paivamaara?: string;
}

export interface PeppolSection {
  kind: "prose";
  content: string;
  anchor: string;
}

export interface PeppolManifest {
  slug: string;
  nav_title: string;
  sections: PeppolSection[];
}

const metaModules = import.meta.glob<PeppolMeta>(
  "../../../content/peppol/meta.json",
  { eager: true, import: "default" },
);
const manifestModules = import.meta.glob<PeppolManifest>(
  "../../../content/peppol/manifest.json",
  { eager: true, import: "default" },
);

const meta = Object.values(metaModules)[0];
const manifest = Object.values(manifestModules)[0];

if (!meta) throw new Error("Missing content/peppol/meta.json");
if (!manifest) throw new Error("Missing content/peppol/manifest.json");

export function getPeppolMeta(): PeppolMeta {
  return meta;
}

export function getPeppolManifest(): PeppolManifest {
  return manifest;
}
