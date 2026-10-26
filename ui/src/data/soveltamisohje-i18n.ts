// Fixed labels on soveltamisohje pages, in the language of the guide itself
// (manifest `lang`), not the site's UI language. A Swedish guide reads as
// Swedish end to end even if the visitor's site language is Finnish.

export type SovLang = "fi" | "sv" | "en";

export const SOV_LANGS: SovLang[] = ["fi", "sv", "en"];

const strings = {
  fi: {
    documents: "Dokumentit",
    toc: "Sisällysluettelo",
    publisher: "Julkaisija",
    date: "Päivämäärä",
    version: "Versio",
    status: "Status",
    docVersion: "Asiakirjan versio",
    author: "Tekijä",
    change: "Muutoskuvaus",
    authors: "Asiakirjan laatijat",
    name: "Nimi",
    organisation: "Organisaatio",
    table: "Taulukko",
    allowedValues: "sallitut arvot",
    dataNeed: "Tietosisältötarve",
    limits: "Rajaukset",
    propertySet: "Ominaisuusjoukko",
    property: "Ominaisuus",
    code: "Koodi",
    description: "Kuvaus",
    modelValue: "Arvo mallissa",
    ai: "Sovellustunnus (AI)",
    data: "Tieto",
    example: "Esimerkki",
    glossary: "Lyhenteet ja terminologia",
    annex: "Liite",
    printed: "Tulostettu",
    open: "Avaa",
    openTitle: "Avaa BETK-selaimessa",
  },
  sv: {
    documents: "Dokument",
    toc: "Innehållsförteckning",
    publisher: "Utgivare",
    date: "Datum",
    version: "Version",
    status: "Status",
    docVersion: "Dokumentversion",
    author: "Författare",
    change: "Ändringsbeskrivning",
    authors: "Dokumentets författare",
    name: "Namn",
    organisation: "Organisation",
    table: "Tabell",
    allowedValues: "tillåtna värden",
    dataNeed: "Informationsbehov",
    limits: "Avgränsningar",
    propertySet: "Egenskapsgrupp",
    property: "Egenskap",
    code: "Kod",
    description: "Beskrivning",
    modelValue: "Värde i modellen (fi)",
    ai: "Applikationsidentifierare (AI)",
    data: "Uppgift",
    example: "Exempel",
    glossary: "Förkortningar och terminologi",
    annex: "Bilaga",
    printed: "Utskriven",
    open: "Öppna",
    openTitle: "Öppna i BETK-webbläsaren",
  },
  en: {
    documents: "Documents",
    toc: "Table of contents",
    publisher: "Publisher",
    date: "Date",
    version: "Version",
    status: "Status",
    docVersion: "Document version",
    author: "Author",
    change: "Description of change",
    authors: "Document authors",
    name: "Name",
    organisation: "Organisation",
    table: "Table",
    allowedValues: "allowed values",
    dataNeed: "Information need",
    limits: "Limitations",
    propertySet: "Property set",
    property: "Property",
    code: "Code",
    description: "Description",
    modelValue: "Value in model (fi)",
    ai: "Application identifier (AI)",
    data: "Data",
    example: "Example",
    glossary: "Abbreviations and terminology",
    annex: "Annex",
    printed: "Printed",
    open: "Open",
    openTitle: "Open in the BETK browser",
  },
} satisfies Record<SovLang, Record<string, string>>;

export type SovStrings = Record<keyof (typeof strings)["fi"], string>;

export function sovLang(lang: string | undefined): SovLang {
  return (SOV_LANGS as string[]).includes(lang ?? "") ? (lang as SovLang) : "fi";
}

export function sovStrings(lang: string | undefined): SovStrings {
  return strings[sovLang(lang)];
}

export const dateLocale: Record<SovLang, string> = { fi: "fi-FI", sv: "sv-FI", en: "en-GB" };
