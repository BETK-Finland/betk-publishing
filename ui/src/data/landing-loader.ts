// Build-time loader for the landing page.
// Reads meta.json + manifest.json from /content/landing/ (repo root).
// Mirrors the soveltamisohje-loader pattern; eager glob imports are the
// only mechanism Vite handles cleanly for content above the project root.

export interface LandingMeta {
  otsikko: string;
  alaotsikko?: string;
  paivamaara?: string;
}

export interface LandingSection {
  kind: "prose";
  content: string;
  anchor: string;
}

export interface LandingManifest {
  slug: string;
  nav_title: string;
  sections: LandingSection[];
}

const metaModules = import.meta.glob<LandingMeta>(
  "../../../content/landing/meta.json",
  { eager: true, import: "default" },
);
const manifestModules = import.meta.glob<LandingManifest>(
  "../../../content/landing/manifest.json",
  { eager: true, import: "default" },
);

const meta = Object.values(metaModules)[0];
const manifest = Object.values(manifestModules)[0];

if (!meta) throw new Error("Missing content/landing/meta.json");
if (!manifest) throw new Error("Missing content/landing/manifest.json");

export function getLandingMeta(): LandingMeta {
  return meta;
}

export function getLandingManifest(): LandingManifest {
  return manifest;
}
