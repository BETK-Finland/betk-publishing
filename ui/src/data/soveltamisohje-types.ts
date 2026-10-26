// Types for soveltamisohje JSON data files.
// Reuses Product and Property from ./types.ts for cross-referencing.

export interface VersioHistoria {
  versio: string;
  paivamaara: string;
  tekija: string;
  kuvaus: string;
}

export interface Laatija {
  nimi: string;
  organisaatio: string;
}

export interface DocumentMeta {
  otsikko: string;
  alaotsikko: string;
  julkaisija: string;
  paivamaara: string;
  versio: string;
  status: string;
  versiohistoria: VersioHistoria[];
  laatijat: Laatija[];
}

export interface TaulukkoArvo {
  koodi: string;
  kuvaus: string;
  /** Translated guides only: the Finnish value written to the model, when kuvaus is a translation. */
  arvo?: string;
}

export interface PintakasittelyArvo {
  koodi: string;
  kuvaus: string;
  alavaihtoehdot?: TaulukkoArvo[];
  arvo?: string;
}

export interface ValueTable {
  taulukonNumero: number;
  tietosisalto: string;
  rajaukset: string;
  ominaisuusjoukko: string;
  ominaisuus: string;
  arvot: TaulukkoArvo[];
}

export interface PintakasittelyTable {
  taulukonNumero: number;
  tietosisalto: string;
  rajaukset: string;
  ominaisuusjoukko: string;
  ominaisuus: string;
  arvot: PintakasittelyArvo[];
}

export interface Termi {
  termi: string;
  selite: string;
}

export interface Lyhenteet {
  termit: Termi[];
}

export interface EsimerkkirRivi {
  ominaisuus: string;
  arvot: string[];
}

export interface EsimerkkiTaulukko {
  rakennetyyppi: string;
  kuvaus: string;
  sarakkeet: string[];
  rivit: EsimerkkirRivi[];
}

export interface RaudoitusEsimerkit {
  selite?: string; // optional note shown above the tables
  taulukot: EsimerkkiTaulukko[];
}

export interface Gs1AiRivi {
  ai: string;
  tieto: string;
  esimerkki: string;
}

export interface Gs1AiTable {
  taulukonNumero: number;
  otsikko: string;
  rivit: Gs1AiRivi[];
}

export interface Gs1AiTaulukot {
  taulukot: Gs1AiTable[];
}

export interface GenericRow {
  cells: string[];
}

export interface GenericTable {
  taulukonNumero: number;
  otsikko: string;
  sarakkeet: string[];
  rivit: GenericRow[];
}

export interface GenericTaulukot {
  taulukot: GenericTable[];
}
