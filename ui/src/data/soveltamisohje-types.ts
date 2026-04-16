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
}

export interface PintakasittelyArvo {
  koodi: string;
  kuvaus: string;
  alavaihtoehdot?: TaulukkoArvo[];
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
  taulukot: EsimerkkiTaulukko[];
}
