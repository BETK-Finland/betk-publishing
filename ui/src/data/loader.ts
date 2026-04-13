// Build-time loader. Reads the PRECAST JSON, indexes properties, and groups
// products into the Koodisto -> Pääryhmä -> Alaryhmä -> Product[] tree the UI
// renders.

import productsJson from "./precast.json";
import propertiesJson from "./precastProperties.json";
import type {
  AlaryhmaNode,
  KoodistoNode,
  PaaryhmaNode,
  Product,
  Property,
  PropertyGroup,
  ProductTree,
} from "./types";

const products = productsJson as Product[];
const properties = propertiesJson as Property[];

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

export function resolveProductProperties(product: Product): PropertyGroup[] {
  // Preserve the order ids appear in the product, but collapse into groups.
  const groups = new Map<string, Property[]>();

  for (const id of product.requiredPropertyIds) {
    const prop = propertyMap.get(id);
    if (!prop) continue; // missing ids are silently skipped; surface in a log if needed
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

// Exposed for smoke checks / debug pages.
export const productCount = products.length;
export const propertyCount = properties.length;
