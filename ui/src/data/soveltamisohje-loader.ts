// Build-time loader for soveltamisohje data.
// Imports soveltamisohje JSON + existing precast data, builds cross-reference maps.

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

import meta from "./soveltamisohje/meta.json";
import kokoonpanoTyypit from "./soveltamisohje/kokoonpano-tyypit.json";
import elementtityypit from "./soveltamisohje/elementtityypit.json";
import raudoitus from "./soveltamisohje/raudoitus.json";
import pintakasittely from "./soveltamisohje/pintakasittely.json";
import varibetoni from "./soveltamisohje/varibetoni.json";
import vahahiilinen from "./soveltamisohje/vahahiilinen.json";
import tyyppielementti from "./soveltamisohje/tyyppielementti.json";
import kaantokivi from "./soveltamisohje/kaantokivi.json";
import lyhenteet from "./soveltamisohje/lyhenteet.json";
import raudoitusEsimerkit from "./soveltamisohje/raudoitus-esimerkit.json";

const products = productsJson as Product[];
const properties = propertiesJson as Property[];

// --- Cross-reference maps ---

// Maps element type codes (V, S, O, etc.) to products whose generalId matches.
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

// Maps ominaisuusjoukko (property set) names to properties in that group.
export const propertySetToProperties: Map<string, Property[]> = new Map();
for (const prop of properties) {
  const bucket = propertySetToProperties.get(prop.group);
  if (bucket) {
    bucket.push(prop);
  } else {
    propertySetToProperties.set(prop.group, [prop]);
  }
}

// --- Exports ---

export const documentMeta = meta as DocumentMeta;

// Ordered list of value tables for rendering in sequence.
// pintakasittely has a different shape (nested alavaihtoehdot), handled separately.
export const valueTables: ValueTable[] = [
  kokoonpanoTyypit as ValueTable,
  elementtityypit as ValueTable,
  raudoitus as ValueTable,
  varibetoni as ValueTable,
  vahahiilinen as ValueTable,
  tyyppielementti as ValueTable,
  kaantokivi as ValueTable,
];

export const pintakasittelyTable = pintakasittely as PintakasittelyTable;

export const glossary = lyhenteet as Lyhenteet;
export const reinforcementExamples = raudoitusEsimerkit as RaudoitusEsimerkit;

// The ordered list of content collection slugs paired with their table data.
// Used by the page to interleave prose + table for each section.
export const sectionTableMap: Record<string, ValueTable | PintakasittelyTable | null> = {
  "03-kokoonpano-tyyppi": kokoonpanoTyypit as ValueTable,
  "03-elementtityyppi": elementtityypit as ValueTable,
  "03-raudoitus": raudoitus as ValueTable,
  "03-pintakasittely": pintakasittely as PintakasittelyTable,
  "03-varibetoni": varibetoni as ValueTable,
  "03-vahahiilinen": vahahiilinen as ValueTable,
  "03-tyyppielementti": tyyppielementti as ValueTable,
  "03-kaantokivi": kaantokivi as ValueTable,
};
