// Schemas mirror data/reference/precast.json and data/reference/precastProperties.json.
// hierarchy is always [Koodisto, Pääryhmä, Alaryhmä].

export interface Product {
  id: string;
  name: string;
  generalId: string;
  discipline: string;
  version: string;
  uri: string;
  description: string;
  hierarchy: [string, string, string];
  requiredPropertyIds: string[];
}

export interface Property {
  id: string;
  version: string;
  label: string;
  group: string;
  ifcPropertyType: string;
  dataType: string;
  unit: string;
  exampleValue: string;
  requirement: string;
  allowedValues: string;
  description: string;
}

// Resolved shapes built by the loader.

export interface PropertyGroup {
  group: string;
  properties: Property[];
}

export interface PropertySet {
  group: string;
  properties: Property[];
}

export interface AlaryhmaNode {
  name: string;
  products: Product[];
}

export interface PaaryhmaNode {
  name: string;
  alaryhmat: AlaryhmaNode[];
}

export interface KoodistoNode {
  name: string;
  version: string;
  paaryhmat: PaaryhmaNode[];
}

export type ProductTree = KoodistoNode[];
