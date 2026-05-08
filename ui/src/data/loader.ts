// Build-time loader. Reads the PRECAST JSON, indexes properties, and groups
// products into the Koodisto -> Pääryhmä -> Alaryhmä -> Product[] tree the UI
// renders.

import productsJson from "./precast.json";
import valutarvikeJson from "./valutarvike.json";
import precastPropertiesJson from "./precastProperties.json";
import valutarvikePropertiesJson from "./valutarvikeProperties.json";
import type {
  AlaryhmaNode,
  KoodistoNode,
  PaaryhmaNode,
  Product,
  Property,
  PropertyGroup,
  PropertySet,
  ProductTree,
} from "./types";

const products = [
  ...(productsJson as Product[]),
  ...(valutarvikeJson as unknown as Product[]),
];

const precastProperties = precastPropertiesJson as Property[];
const valutarvikeProperties = valutarvikePropertiesJson as Property[];

// Union of all property catalogs — valutarvike's IDs overlap with precast,
// so duplicates collapse to one entry (later inserts win, but content is shared).
const properties: Property[] = Array.from(
  new Map(
    [...precastProperties, ...valutarvikeProperties].map((p) => [p.id, p]),
  ).values(),
);

export const propertyMap: Map<string, Property> = new Map(
  properties.map((p) => [p.id, p]),
);

function buildTree(items: Product[]): ProductTree {
  // Insertion-ordered Maps so we keep the natural order we find in the JSON.
  const koodistot = new Map<string, KoodistoNode>();

  for (const product of items) {
    const [koodistoName, paaryhmaName, alaryhmaName] = product.hierarchy;

    let koodisto = koodistot.get(koodistoName);
    if (!koodisto) {
      koodisto = {
        name: koodistoName,
        version: product.version, // all PRECAST products share a version today
        paaryhmat: [],
      };
      koodistot.set(koodistoName, koodisto);
    }

    let paaryhma: PaaryhmaNode | undefined = koodisto.paaryhmat.find(
      (p) => p.name === paaryhmaName,
    );
    if (!paaryhma) {
      paaryhma = { name: paaryhmaName, alaryhmat: [] };
      koodisto.paaryhmat.push(paaryhma);
    }

    let alaryhma: AlaryhmaNode | undefined = paaryhma.alaryhmat.find(
      (a) => a.name === alaryhmaName,
    );
    if (!alaryhma) {
      alaryhma = { name: alaryhmaName, products: [] };
      paaryhma.alaryhmat.push(alaryhma);
    }

    alaryhma.products.push(product);
  }

  return Array.from(koodistot.values());
}

export const tree: ProductTree = buildTree(products);

// Discipline-level catalogs. Used for products whose requiredPropertyIds
// is empty — the discipline's catalog defines the applicable property set.
const disciplineCatalogs: Record<string, Property[]> = {
  PRECAST: precastProperties,
  VALUTARVIKE: valutarvikeProperties,
};

function groupProperties(items: Property[]): PropertyGroup[] {
  const groups = new Map<string, Property[]>();
  for (const prop of items) {
    const bucket = groups.get(prop.group);
    if (bucket) {
      bucket.push(prop);
    } else {
      groups.set(prop.group, [prop]);
    }
  }
  return Array.from(groups.entries()).map(([group, props]) => ({
    group,
    properties: props,
  }));
}

export function resolveProductProperties(product: Product): PropertyGroup[] {
  if (product.requiredPropertyIds.length === 0) {
    const catalog = disciplineCatalogs[product.discipline];
    return catalog ? groupProperties(catalog) : [];
  }

  // Preserve the order ids appear in the product, but collapse into groups.
  const resolved: Property[] = [];
  for (const id of product.requiredPropertyIds) {
    const prop = propertyMap.get(id);
    if (prop) resolved.push(prop);
  }
  return groupProperties(resolved);
}

// Property sets — properties grouped by their `group` field, in first-seen order.
function buildPropertySets(items: Property[]): PropertySet[] {
  const sets = new Map<string, Property[]>();
  for (const prop of items) {
    const bucket = sets.get(prop.group);
    if (bucket) {
      bucket.push(prop);
    } else {
      sets.set(prop.group, [prop]);
    }
  }
  return Array.from(sets.entries()).map(([group, props]) => ({ group, properties: props }));
}

export const propertySets: PropertySet[] = buildPropertySets(properties);

export interface DisciplinePropertySets {
  discipline: string;
  label: string;
  sets: PropertySet[];
}

// Per-discipline property catalogs for the /propertysets view.
export const propertySetsByDiscipline: DisciplinePropertySets[] = [
  {
    discipline: "PRECAST",
    label: "Betonielementit",
    sets: buildPropertySets(precastProperties),
  },
  {
    discipline: "VALUTARVIKE",
    label: "Valutarvikkeet",
    sets: buildPropertySets(valutarvikeProperties),
  },
];

// Exposed for smoke checks / debug pages.
export const productCount = products.length;
export const propertyCount = properties.length;
