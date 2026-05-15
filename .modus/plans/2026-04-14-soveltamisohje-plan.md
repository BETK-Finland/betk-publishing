# Soveltamisohje Living Document — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Astro page at `/soveltamisohje` that renders the BETK application guide as a printable, contract-ready document backed by JSON data files and markdown prose, cross-referenced with the existing precast property browser.

**Architecture:** JSON data files in `src/data/soveltamisohje/` hold all table data. Markdown prose lives in `src/content/soveltamisohje/` as an Astro content collection. A dedicated loader (`soveltamisohje-loader.ts`) cross-references element type codes and property set names with `precast.json` and `precastProperties.json`. Seven Astro components render the page. Print CSS produces contract-ready PDFs.

**Tech Stack:** Astro 6, TypeScript, Astro Content Collections (built-in), CSS `@media print`

**Source document:** `BETK soveltamisohje_ Tarjousvaiheen tietomääritykset ja toteutusvaiheen tietomalliohjeita toimitusketjulle.md` (repo root)

---

## Phase 1: JSON Data Files (Tables)

### Task 1: Document metadata + assembly types + element types

**Files:**
- Create: `ui/src/data/soveltamisohje/meta.json`
- Create: `ui/src/data/soveltamisohje/kokoonpano-tyypit.json`
- Create: `ui/src/data/soveltamisohje/elementtityypit.json`

- [ ] **Step 1: Create `meta.json`**

```json
{
  "otsikko": "BETK soveltamisohje: Tarjousvaiheen tietomääritykset ja toteutusvaiheen tietomalliohjeita toimitusketjulle",
  "alaotsikko": "Tilauksesta suunniteltavat rakennustuotteet",
  "julkaisija": "Rakennusteollisuus ry",
  "paivamaara": "2025-12-17",
  "versio": "1.0",
  "status": "Luonnos",
  "versiohistoria": [
    { "versio": "0.1", "paivamaara": "2024-12-30", "tekija": "AnPekk", "kuvaus": "Luonnos vaihe" },
    { "versio": "0.2", "paivamaara": "2025-02-25", "tekija": "AnPekk", "kuvaus": "Tekstiosuuksia täydennetty" },
    { "versio": "0.3", "paivamaara": "2025-05-30", "tekija": "AnPekk", "kuvaus": "Tekstiosuuksia täydennetty" },
    { "versio": "0.4", "paivamaara": "2025-07-02", "tekija": "AnPekk", "kuvaus": "YIT, NCC ja Consoliksen kommentit huomioitu" },
    { "versio": "0.5", "paivamaara": "2025-09-12", "tekija": "AnPekk", "kuvaus": "Elementtityyppi-listausta päivitetty" },
    { "versio": "0.6", "paivamaara": "2025-10-22", "tekija": "AnPekk", "kuvaus": "Propertyjen nimet tarkistettu excelin mukaiseksi" },
    { "versio": "0.7", "paivamaara": "2025-12-05", "tekija": "AnPekk", "kuvaus": "Pintakäsittely ja väribetonit-kentät muokattu" },
    { "versio": "1.0", "paivamaara": "2025-12-17", "tekija": "AnPekk", "kuvaus": "Github julkaisu" }
  ],
  "laatijat": [
    { "nimi": "Antti Pekkala", "organisaatio": "Fira Oy" },
    { "nimi": "Teemu Anttila", "organisaatio": "Ramboll" },
    { "nimi": "Janne Kihula", "organisaatio": "Rakennustuoteteollisuus RTT ry" },
    { "nimi": "Teemu Alaluusua", "organisaatio": "Aalto-yliopisto" },
    { "nimi": "Tom Partanen", "organisaatio": "Consolis Parma Oy" },
    { "nimi": "Eetu Lahtinen", "organisaatio": "Consolis Parma Oy" },
    { "nimi": "Satu Parikka", "organisaatio": "Consolis Parma Oy" },
    { "nimi": "Kari Turunen", "organisaatio": "Lujabetoni Oy" },
    { "nimi": "Markku Räisänen", "organisaatio": "Betset Oy" },
    { "nimi": "Jarkko Vitikainen", "organisaatio": "Sitowise Oy" },
    { "nimi": "Antti Taskinen", "organisaatio": "Fira Oy" },
    { "nimi": "Riku Laiho", "organisaatio": "NCC Suomi Oy" },
    { "nimi": "Arto Nieminen", "organisaatio": "NCC Suomi Oy" },
    { "nimi": "Paula Valkonen", "organisaatio": "Suutarinen / SBS Betoni Oy" }
  ]
}
```

- [ ] **Step 2: Create `kokoonpano-tyypit.json`**

```json
{
  "taulukonNumero": 1,
  "tietosisalto": "Kokoonpanon tyyppi",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Tunnistetiedot ja luokittelu",
  "ominaisuus": "Kokoonpanon tyyppi",
  "arvot": [
    { "koodi": "BETONIELEMENTTI", "kuvaus": "" },
    { "koodi": "PAIKALLAVALU", "kuvaus": "" },
    { "koodi": "PUUKOKOONPANO", "kuvaus": "" },
    { "koodi": "TERÄSKOKOONPANO", "kuvaus": "" },
    { "koodi": "EI ASETETTU", "kuvaus": "" }
  ]
}
```

- [ ] **Step 3: Create `elementtityypit.json`**

Extract all ~65 element type code/description pairs from the source document (lines 172–438). Structure:

```json
{
  "taulukonNumero": 2,
  "tietosisalto": "Elementtityyppi",
  "rajaukset": "-",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Elementin tyyppi, koodi / Elementin tyyppi, kuvaus",
  "arvot": [
    { "koodi": "A", "kuvaus": "Anturaelementti" },
    { "koodi": "PH", "kuvaus": "Pilariholkkielementti" },
    { "koodi": "AN", "kuvaus": "Sokkelielementti (ei-kantava)" },
    { "koodi": "AS", "kuvaus": "Sokkelielementti (kantava)" },
    { "koodi": "AK", "kuvaus": "Sokkelipalkki" },
    { "koodi": "AR", "kuvaus": "Sokkeliruutuelementti (maanpaine)" },
    { "koodi": "AV", "kuvaus": "Sokkelielementti (yksi kuori)" },
    { "koodi": "MP", "kuvaus": "Maanpaineseinäelementti" },
    { "koodi": "TKE", "kuvaus": "Tukimuurielementti" },
    { "koodi": "MUU", "kuvaus": "Muu perustuselementti" },
    { "koodi": "P", "kuvaus": "Pilari" },
    { "koodi": "MUU", "kuvaus": "Muu pilarielementti" },
    { "koodi": "V", "kuvaus": "Väliseinä" },
    { "koodi": "VSP", "kuvaus": "Väliseinä (seinämäinen palkki)" },
    { "koodi": "S", "kuvaus": "Ruutuelementti (kantava)" },
    { "koodi": "R", "kuvaus": "Ruutuelementti (ei-kantava)" },
    { "koodi": "SK", "kuvaus": "Sisäkuorielementti (kantava)" },
    { "koodi": "RK", "kuvaus": "Sisäkuorielementti (ei-kantava)" },
    { "koodi": "SKE", "kuvaus": "Sisäkuorielementti (kantava, tehdaseriste)" },
    { "koodi": "RKE", "kuvaus": "Sisäkuorielementti (ei kantava, tehdaseriste)" },
    { "koodi": "SKRO", "kuvaus": "Ohutrapattu elementti (kantava)" },
    { "koodi": "RKRO", "kuvaus": "Ohutrapattu elementti (ei-kantava)" },
    { "koodi": "SKRP", "kuvaus": "Paksurapattu elementti (kantava)" },
    { "koodi": "RKRP", "kuvaus": "Paksurapattu elementti (ei-kantava)" },
    { "koodi": "NK", "kuvaus": "Nauhaelementti (kantava)" },
    { "koodi": "N", "kuvaus": "Nauhaelementti (ei-kantava)" },
    { "koodi": "KE", "kuvaus": "Kuorielementti" },
    { "koodi": "MUU", "kuvaus": "Muu seinäelementti" },
    { "koodi": "K", "kuvaus": "Palkkielementti (teräsbetoni)" },
    { "koodi": "I", "kuvaus": "Jännebetonipalkki (I-profiili)" },
    { "koodi": "HI", "kuvaus": "Jännebetonipalkki (HI-profiili)" },
    { "koodi": "JK", "kuvaus": "Jännebetonipalkki (muut profiilit)" },
    { "koodi": "JR", "kuvaus": "Jäykistesauva" },
    { "koodi": "MUU", "kuvaus": "Muu palkkielementti" },
    { "koodi": "L", "kuvaus": "Laattaelementti (massiivilaatta, välipohja)" },
    { "koodi": "LT", "kuvaus": "Lepotasolaatta (teräskonsolit)" },
    { "koodi": "EL", "kuvaus": "Alapohjalaatta (massivilaatta, eristetty)" },
    { "koodi": "JL", "kuvaus": "Jännitetty laattaelementti" },
    { "koodi": "O", "kuvaus": "Ontelolaatta" },
    { "koodi": "KL", "kuvaus": "Kuorilaatta" },
    { "koodi": "SL", "kuvaus": "Luja-Superlaatta" },
    { "koodi": "TT", "kuvaus": "TT-laatta" },
    { "koodi": "TEK", "kuvaus": "TEK-laatta" },
    { "koodi": "STT", "kuvaus": "SuperTT-laatta" },
    { "koodi": "HTT", "kuvaus": "HTT-laatta" },
    { "koodi": "RL", "kuvaus": "Ripalaatta" },
    { "koodi": "MUU", "kuvaus": "Muu laattaelementti" },
    { "koodi": "C", "kuvaus": "Parveke-elementti" },
    { "koodi": "CL", "kuvaus": "Parvekelaattaelementti" },
    { "koodi": "CP", "kuvaus": "Parvekepilari" },
    { "koodi": "JCL", "kuvaus": "Jännitetty parvekelaattaelementti" },
    { "koodi": "UCL", "kuvaus": "Ulokeparvekelaatta" },
    { "koodi": "M", "kuvaus": "Parvekepielielementti" },
    { "koodi": "Z", "kuvaus": "Parvekekaide-elementti" },
    { "koodi": "CX", "kuvaus": "Parvekekattoelementti" },
    { "koodi": "JCX", "kuvaus": "Jännitetty parvekkeen kattoelementti" },
    { "koodi": "MUU", "kuvaus": "Muu parveke-elementti" },
    { "koodi": "T", "kuvaus": "Porraselementti" },
    { "koodi": "MUU", "kuvaus": "Muu porraselementti" },
    { "koodi": "HK", "kuvaus": "Hissikuiluelementti" },
    { "koodi": "HKA", "kuvaus": "Hissikuilun pohjaelementti" },
    { "koodi": "HKL", "kuvaus": "Hissikuilun kattolaatta" },
    { "koodi": "HKY", "kuvaus": "Hissikuilun yläpään elementti" },
    { "koodi": "MUU", "kuvaus": "Muu hissikuilun elementti" },
    { "koodi": "H", "kuvaus": "Hormielementti" },
    { "koodi": "MUU", "kuvaus": "Muu erikoiselementti" },
    { "koodi": "Ei asetettu", "kuvaus": "Ei asetettu" }
  ]
}
```

- [ ] **Step 4: Commit**

```bash
git add ui/src/data/soveltamisohje/meta.json ui/src/data/soveltamisohje/kokoonpano-tyypit.json ui/src/data/soveltamisohje/elementtityypit.json
git commit -m "data: add soveltamisohje metadata, assembly types, and element types JSON"
```

---

### Task 2: Remaining value-table JSON files

**Files:**
- Create: `ui/src/data/soveltamisohje/raudoitus.json`
- Create: `ui/src/data/soveltamisohje/pintakasittely.json`
- Create: `ui/src/data/soveltamisohje/varibetoni.json`

- [ ] **Step 1: Create `raudoitus.json`**

```json
{
  "taulukonNumero": 3,
  "tietosisalto": "Raudoitusmäärä",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Raudoitus 1, koodi / Raudoitus 1, kuvaus / Raudoitus 2, koodi / Raudoitus 2, kuvaus",
  "arvot": [
    { "koodi": "R1", "kuvaus": "Description" },
    { "koodi": "R2", "kuvaus": "Description" },
    { "koodi": "R3", "kuvaus": "Description" },
    { "koodi": "R4", "kuvaus": "Description" },
    { "koodi": "R5", "kuvaus": "Description" },
    { "koodi": "R6", "kuvaus": "Description" },
    { "koodi": "R7", "kuvaus": "Description" },
    { "koodi": "R8", "kuvaus": "Description" },
    { "koodi": "R9", "kuvaus": "Description" },
    { "koodi": "Ei asetettu", "kuvaus": "" }
  ]
}
```

- [ ] **Step 2: Create `pintakasittely.json`**

```json
{
  "taulukonNumero": 4,
  "tietosisalto": "Elementin pintakäsittely",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Pintakäsittely",
  "arvot": [
    {
      "koodi": "PK1",
      "kuvaus": "",
      "alavaihtoehdot": [
        { "koodi": "01", "kuvaus": "MUO-muottipinta" },
        { "koodi": "02", "kuvaus": "TIIP-Tiililaatta pinta (poltetut tiilet)" },
        { "koodi": "03", "kuvaus": "KALV-Valukalvon päälle valettu pesubetoni-pinta" },
        { "koodi": "04", "kuvaus": "MUK-Kuvioitua muottia vasten valettu pinta" },
        { "koodi": "05", "kuvaus": "ER-Eristepinta" },
        { "koodi": "06", "kuvaus": "SEM-Sementtiliiman poisto" },
        { "koodi": "07", "kuvaus": "PESH-Hienopesubetonipinta" },
        { "koodi": "08", "kuvaus": "MUU-Muu pinta" }
      ]
    },
    {
      "koodi": "PK2",
      "kuvaus": "",
      "alavaihtoehdot": [
        { "koodi": "01", "kuvaus": "MUO-muottipinta" },
        { "koodi": "02", "kuvaus": "TIIP-Tiililaatta pinta (poltetut tiilet)" },
        { "koodi": "03", "kuvaus": "KALV-Valukalvon päälle valettu pesubetoni-pinta" },
        { "koodi": "04", "kuvaus": "MUK-Kuvioitua muottia vasten valettu pinta" },
        { "koodi": "05", "kuvaus": "ER-Eristepinta" },
        { "koodi": "06", "kuvaus": "SEM-Sementtiliiman poisto" },
        { "koodi": "07", "kuvaus": "PESH-Hienopesubetonipinta" },
        { "koodi": "08", "kuvaus": "MUU-Muu pinta" }
      ]
    },
    {
      "koodi": "PK3–9",
      "kuvaus": "jos tarvetta",
      "alavaihtoehdot": [
        { "koodi": "01", "kuvaus": "MUO-muottipinta" },
        { "koodi": "02", "kuvaus": "TIIP-Tiililaatta pinta (poltetut tiilet)" },
        { "koodi": "03", "kuvaus": "KALV-Valukalvon päälle valettu pesubetoni-pinta" },
        { "koodi": "04", "kuvaus": "MUK-Kuvioitua muottia vasten valettu pinta" },
        { "koodi": "05", "kuvaus": "ER-Eristepinta" },
        { "koodi": "06", "kuvaus": "SEM-Sementtiliiman poisto" },
        { "koodi": "07", "kuvaus": "PESH-Hienopesubetonipinta" },
        { "koodi": "08", "kuvaus": "MUU-Muu pinta" }
      ]
    }
  ]
}
```

- [ ] **Step 3: Create `varibetoni.json`**

```json
{
  "taulukonNumero": 5,
  "tietosisalto": "Väribetoni",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Väribetoni",
  "arvot": [
    { "koodi": "01", "kuvaus": "Harmaa, värjätty" },
    { "koodi": "02", "kuvaus": "MUS-Musta" },
    { "koodi": "03", "kuvaus": "VAL-Valkoinen" },
    { "koodi": "04", "kuvaus": "PUN-Punainen" },
    { "koodi": "05", "kuvaus": "SIN-Sininen" },
    { "koodi": "06", "kuvaus": "RUS-Ruskea" },
    { "koodi": "07", "kuvaus": "VIH-Vihreä" },
    { "koodi": "08", "kuvaus": "KEL-Keltainen" },
    { "koodi": "Muu", "kuvaus": "" }
  ]
}
```

- [ ] **Step 4: Commit**

```bash
git add ui/src/data/soveltamisohje/raudoitus.json ui/src/data/soveltamisohje/pintakasittely.json ui/src/data/soveltamisohje/varibetoni.json
git commit -m "data: add reinforcement, surface treatment, and colored concrete JSON"
```

---

### Task 3: Boolean fields + glossary + reinforcement examples

**Files:**
- Create: `ui/src/data/soveltamisohje/vahahiilinen.json`
- Create: `ui/src/data/soveltamisohje/tyyppielementti.json`
- Create: `ui/src/data/soveltamisohje/kaantokivi.json`
- Create: `ui/src/data/soveltamisohje/lyhenteet.json`
- Create: `ui/src/data/soveltamisohje/raudoitus-esimerkit.json`

- [ ] **Step 1: Create `vahahiilinen.json`**

```json
{
  "taulukonNumero": 5,
  "tietosisalto": "Vähähiilinen",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Vähähiilinen",
  "arvot": [
    { "koodi": "Ei", "kuvaus": "" },
    { "koodi": "Kyllä", "kuvaus": "Description" }
  ]
}
```

- [ ] **Step 2: Create `tyyppielementti.json`**

```json
{
  "taulukonNumero": 6,
  "tietosisalto": "Tyyppielementti",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Onko tyyppielementti",
  "arvot": [
    { "koodi": "Ei", "kuvaus": "" },
    { "koodi": "Kyllä", "kuvaus": "Description" }
  ]
}
```

- [ ] **Step 3: Create `kaantokivi.json`**

```json
{
  "taulukonNumero": 7,
  "tietosisalto": "Kääntökivi",
  "rajaukset": "–",
  "ominaisuusjoukko": "BETK-Hankinta",
  "ominaisuus": "Kääntökivi",
  "arvot": [
    { "koodi": "Ei", "kuvaus": "" },
    { "koodi": "Kyllä", "kuvaus": "Description" }
  ]
}
```

- [ ] **Step 4: Create `lyhenteet.json`**

```json
{
  "termit": [
    {
      "termi": "Alkuperäisformaatti",
      "selite": "Mallinnusohjelman oma tallennusformaatti. Alan julkaisuissa käytetään tälle synonyyminä käsitteitä natiivimalli tai natiiviformaatti."
    },
    {
      "termi": "BIM",
      "selite": "Rakennuskohteen tietomalli tai tietomallinnus, lyhenne englanninkielisestä käsitteestä Building Information Modeling."
    },
    {
      "termi": "IFC",
      "selite": "Rakennusten mallinnuksessa käytetty tuotetietojen siirron kansainvälinen standardi, lyhenne englanninkielisestä käsitteestä Industry Foundation Classes."
    },
    {
      "termi": "UDA",
      "selite": "Suunnitteluohjelmistoissa mallin objekteille talletettavaa liitännäistietoa (metatieto), lyhenne englanninkielisestä käsitteestä User Defined Attribute."
    },
    {
      "termi": "Ominaisuusryhmä",
      "selite": "Rakentamisalalla on yleisesti käytössä \"Property Set\" -termi. Tässä dokumentissa käytetään termiä \"Ominaisuusryhmä\", jotta termi on helpommin ymmärrettävissä ja päästään eroon vieraskielisestä termistä. Ominaisuusryhmien tarkka määrittäminen mahdollistaa ominaisuuksien ryhmittelyn ihmiselle sopiviin kokonaisuuksiin. Usealla ominaisuusryhmällä vältetään myös ominaisuuksien pitkä listaus yhdessä \"kaiken kattavassa\" ominaisuusryhmässä."
    },
    {
      "termi": "Ominaisuus",
      "selite": "Rakentamisalalle on vakiintunut \"Property\" -termin käyttö. Tässä dokumentissa käytetään termiä \"Ominaisuus\", jotta termi on helpommin ymmärrettävissä ja päästään eroon vieraskielisestä termistä. Ominaisuuksien tarkka määrittäminen mahdollistaa vakioidun tietorakenteen. Ominaisuudet on aina liitetty johonkin ominaisuusryhmään."
    }
  ]
}
```

- [ ] **Step 5: Create `raudoitus-esimerkit.json`**

```json
{
  "taulukot": [
    {
      "rakennetyyppi": "V",
      "kuvaus": "Betonirakenteiden paksuudet, lujuudet ja raudoitukset kerrosluvun mukaan",
      "sarakkeet": ["1.krs 20%", "2.krs 50%", "3–4.krs", "5.krs", "6–9.krs", "10–14.krs", "15–16.krs"],
      "rivit": [
        { "ominaisuus": "Paksuus (mm)", "arvot": ["250", "200 / 240 / 250", "200 / 240 / 250", "200 / 220 / 250", "200 / 220 / 250", "200 / 220 / 250", "200 / 220 / 250"] },
        { "ominaisuus": "Bet. lujuus", "arvot": ["C35/45", "C35/45", "C35/45", "C35/45", "C35/45", "C35/45", "C35/45"] },
        { "ominaisuus": "Pääteräs", "arvot": ["#10-k200 MP", "#10-k150 MP", "#10-k150 MP", "#10-k150 MP", "#8-k150 MP", "ei verkoraud.", "ei verkoraud."] },
        { "ominaisuus": "Lisäraudoitus, vaaka", "arvot": ["–", "4+4T16 (VSP)", "–", "–", "–", "–", "–"] },
        { "ominaisuus": "Haat elem. ymp.", "arvot": ["T10-k200", "T10-k150", "T10-k150", "T10-k150", "T8-k150", "–", "–"] },
        { "ominaisuus": "Reunaraud. ymp.", "arvot": ["2T12", "2T12", "2T12", "2T12", "2T12", "2T10", "2T10"] },
        { "ominaisuus": "Pilariosat PT", "arvot": ["–", "4+4T16", "4+4T16", "4+4T16", "4+4T16", "4+4T10", "2+2T10"] },
        { "ominaisuus": "Pilariosat UH", "arvot": ["–", "T10-k125", "T10-k150", "T10-k150", "T10-k150", "T8-k200", "T8-k200"] },
        { "ominaisuus": "Palkkiosat PT", "arvot": ["2+2T16", "2+2T20", "2+2T20", "2+2T16", "2+2T16", "2+2T16", "2+2T12"] },
        { "ominaisuus": "Palkkiosat UH", "arvot": ["T10-k200", "T10-k100", "T10-k100", "T10-k100", "T10-k100", "T10-k150", "T10-k200"] }
      ]
    },
    {
      "rakennetyyppi": "S, SK (ei parv)",
      "kuvaus": "Betonirakenteiden paksuudet, lujuudet ja raudoitukset kerrosluvun mukaan",
      "sarakkeet": ["1.krs", "2.krs", "3–4.krs", "5.krs", "6–9.krs", "10–14.krs", "15–16.krs", "Vesikatto"],
      "rivit": [
        { "ominaisuus": "Paksuus (SK), mm", "arvot": ["–", "250", "250", "200", "200", "180", "180", "180"] },
        { "ominaisuus": "Paksuus (UK), mm", "arvot": ["–", "0", "0", "0 / 135", "0 / 135", "0 / 135", "0 / 135", "135"] },
        { "ominaisuus": "Bet. lujuus (SK)", "arvot": ["–", "C35/45", "C35/45", "C35/45", "C35/45", "C35/45", "C35/45", "C35/45"] },
        { "ominaisuus": "Bet. lujuus (UK)", "arvot": ["–", "–", "–", "C30/37 säänkest.", "C30/37 säänkest.", "C30/37 säänkest.", "C30/37 säänkest.", "C30/37 säänkest."] },
        { "ominaisuus": "Reunaraudoitus ymp. (SK)", "arvot": ["–", "2T12", "2T12", "2T12", "2T12", "2T12", "2T10", "2T12"] },
        { "ominaisuus": "Reunaraudoitus ymp. (UK)", "arvot": ["–", "–", "–", "1E7", "1E7", "1E7", "1E7", "1E7"] },
        { "ominaisuus": "Pääteräs (SK)", "arvot": ["–", "#10-K150 MP", "#10-K150 MP", "#8-K150 MP", "#8-K150 MP", "#8-K200 MP (50%)", "#8-K200 MP", "#8-K200 MP"] },
        { "ominaisuus": "Pääteräs (UK)", "arvot": ["–", "–", "–", "#E5-150", "#E5-150", "#E5-150", "#E5-150", "#E5-150"] },
        { "ominaisuus": "Haat elem. ymp.", "arvot": ["–", "T10-K150", "T10-K150", "T8-K150", "T8-K150", "T8-K200", "–", "T8-K200"] },
        { "ominaisuus": "Pilariosat >980 mm (PT)", "arvot": ["–", "2×8T20", "2×8T16", "2×6T20", "2×6T16", "2×6T12", "2×4T10", "–"] },
        { "ominaisuus": "Pilariosat >980 mm (UH)", "arvot": ["–", "T10-K150", "T10-K150", "T8-K150", "T8-K150", "T8-K150", "T8-K150", "–"] },
        { "ominaisuus": "Palkkiosat, ikkuna – yläosa (PT)", "arvot": ["–", "2×2T20", "2×2T16", "2×2T16", "2×2T16", "2×2T16", "2×2T12", "–"] },
        { "ominaisuus": "Palkkiosat, ikkuna – yläosa (UH)", "arvot": ["–", "T10-K100", "T10-K100", "T10-K100", "T10-K125", "T10-K150", "T10-K150", "–"] },
        { "ominaisuus": "Palkkiosat, ikkuna – alaosa (PT)", "arvot": ["–", "2×2T16", "2×2T16", "2×2T16", "2×2T16", "2×2T16", "2×2T12", "–"] },
        { "ominaisuus": "Palkkiosat, ikkuna – alaosa (UH)", "arvot": ["–", "T10-K150", "T10-K200", "T10-K200", "T10-K200", "T10-K200", "T10-K200", "–"] }
      ]
    }
  ]
}
```

- [ ] **Step 6: Commit**

```bash
git add ui/src/data/soveltamisohje/vahahiilinen.json ui/src/data/soveltamisohje/tyyppielementti.json ui/src/data/soveltamisohje/kaantokivi.json ui/src/data/soveltamisohje/lyhenteet.json ui/src/data/soveltamisohje/raudoitus-esimerkit.json
git commit -m "data: add boolean fields, glossary, and reinforcement examples JSON"
```

---

## Phase 2: Content Collection + Prose Markdown

### Task 4: Content collection config + first prose sections

**Files:**
- Create: `ui/src/content.config.ts`
- Create: `ui/src/content/soveltamisohje/01-tausta.md`
- Create: `ui/src/content/soveltamisohje/02-tarkoitus-ja-rajaukset.md`
- Create: `ui/src/content/soveltamisohje/03-tuotetiedot-intro.md`

- [ ] **Step 1: Create `content.config.ts`**

```typescript
import { defineCollection, z } from "astro:content";

const soveltamisohje = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    order: z.number(),
    section: z.string(),
  }),
});

export const collections = { soveltamisohje };
```

- [ ] **Step 2: Create `01-tausta.md`**

Extract the prose from source document section 1 (lines 66–84). Frontmatter:

```yaml
---
title: "Tausta"
order: 1
section: "1"
---
```

Body: the full Finnish text of section 1, preserving the paragraph structure. Convert footnote references `[^1]`–`[^5]` to markdown links. The bulleted list of related BETK publications is preserved as-is.

- [ ] **Step 3: Create `02-tarkoitus-ja-rajaukset.md`**

Extract prose from source document section 2 (lines 86–87). Frontmatter:

```yaml
---
title: "Soveltamisohjeen tarkoitus ja rajaukset"
order: 2
section: "2"
---
```

- [ ] **Step 4: Create `03-tuotetiedot-intro.md`**

Extract the intro paragraph from source document section 3 (lines 89–90). Frontmatter:

```yaml
---
title: "Rakentamiskohteen tietomallin tietosisällöt tarjousvaiheessa"
order: 3
section: "3"
---
```

- [ ] **Step 5: Verify content collection**

Run: `cd ui && npx astro check`
Expected: no errors related to content collection schema

- [ ] **Step 6: Commit**

```bash
git add ui/src/content.config.ts ui/src/content/soveltamisohje/
git commit -m "content: add content collection config and first prose sections"
```

---

### Task 5: Per-table prose + remaining sections

**Files:**
- Create: `ui/src/content/soveltamisohje/03-kokoonpano-tyyppi.md`
- Create: `ui/src/content/soveltamisohje/03-elementtityyppi.md`
- Create: `ui/src/content/soveltamisohje/03-raudoitus.md`
- Create: `ui/src/content/soveltamisohje/03-pintakasittely.md`
- Create: `ui/src/content/soveltamisohje/03-varibetoni.md`

Each file has frontmatter with `title`, `order` (3.1–3.5), and `section` (e.g. `"3.1.1"`). Body is the explanatory paragraph that precedes the corresponding table in the source document.

- [ ] **Step 1: Create `03-kokoonpano-tyyppi.md`**

```yaml
---
title: "Kokoonpanon tyyppi"
order: 3.1
section: "3.1.1"
---
```

Body: "Betonielementtien erottamiseen tietomallin muista objekteista ja kokoonpanoista voi käyttää kokoonpanon tyyppi-ominaisuustietoa." (source line 95)

- [ ] **Step 2: Create `03-elementtityyppi.md`**

```yaml
---
title: "Elementtityyppi"
order: 3.2
section: "3.1.2"
---
```

Body: paragraph from source line 139.

- [ ] **Step 3: Create `03-raudoitus.md`**

```yaml
---
title: "Raudoitus"
order: 3.3
section: "3.1.3"
---
```

Body: paragraph from source line 443–444.

- [ ] **Step 4: Create `03-pintakasittely.md`**

```yaml
---
title: "Pintakäsittely"
order: 3.4
section: "3.1.4"
---
```

Body: paragraph from source line 513–514.

- [ ] **Step 5: Create `03-varibetoni.md`**

```yaml
---
title: "Väribetoni"
order: 3.5
section: "3.1.5"
---
```

Body: "Väribetoni-kenttään merkitään väribetonin väri." (source line 629)

- [ ] **Step 6: Commit**

```bash
git add ui/src/content/soveltamisohje/03-*.md
git commit -m "content: add per-table prose for sections 3.1.1-3.1.5"
```

---

### Task 6: Remaining per-table prose + final sections

**Files:**
- Create: `ui/src/content/soveltamisohje/03-vahahiilinen.md`
- Create: `ui/src/content/soveltamisohje/03-tyyppielementti.md`
- Create: `ui/src/content/soveltamisohje/03-kaantokivi.md`
- Create: `ui/src/content/soveltamisohje/04-toimintaohjeita.md`
- Create: `ui/src/content/soveltamisohje/05-viittaukset.md`

- [ ] **Step 1: Create `03-vahahiilinen.md`**

```yaml
---
title: "Vähähiilinen"
order: 3.6
section: "3.1.6"
---
```

Body: paragraph from source line 674–675.

- [ ] **Step 2: Create `03-tyyppielementti.md`**

```yaml
---
title: "Tyyppielementti"
order: 3.7
section: "3.1.7"
---
```

Body: paragraph from source line 711–712.

- [ ] **Step 3: Create `03-kaantokivi.md`**

```yaml
---
title: "Työmaalla käännettävä elementti"
order: 3.8
section: "3.1.8"
---
```

Body: paragraph from source lines 748–749.

- [ ] **Step 4: Create `04-toimintaohjeita.md`**

```yaml
---
title: "Toimintaohjeita hankkeisiin"
order: 4
section: "4"
---
```

Body: the three subsections (Numerointi, Sijaintieto, Revisiointi käytännöt) from source lines 785–794.

- [ ] **Step 5: Create `05-viittaukset.md`**

```yaml
---
title: "Viittaukset"
order: 5
section: "viittaukset"
---
```

Body: footnote definitions from source lines 80–84 converted to a reference list.

- [ ] **Step 6: Verify all content**

Run: `cd ui && npx astro check`
Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add ui/src/content/soveltamisohje/
git commit -m "content: add remaining prose sections (3.1.6-3.1.8, operations, references)"
```

---

## Phase 3: Types + Loader

### Task 7: Soveltamisohje types

**Files:**
- Create: `ui/src/data/soveltamisohje-types.ts`

- [ ] **Step 1: Create `soveltamisohje-types.ts`**

```typescript
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
```

- [ ] **Step 2: Verify types compile**

Run: `cd ui && npx astro check`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add ui/src/data/soveltamisohje-types.ts
git commit -m "types: add soveltamisohje data type definitions"
```

---

### Task 8: Soveltamisohje loader with cross-references

**Files:**
- Create: `ui/src/data/soveltamisohje-loader.ts`

- [ ] **Step 1: Create `soveltamisohje-loader.ts`**

```typescript
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
```

- [ ] **Step 2: Verify loader compiles**

Run: `cd ui && npx astro check`
Expected: no type errors

- [ ] **Step 3: Commit**

```bash
git add ui/src/data/soveltamisohje-loader.ts
git commit -m "feat: add soveltamisohje loader with cross-reference maps"
```

---

## Phase 4: Components (Part 1)

### Task 9: Header + ProseSection + CrossReferenceLink

**Files:**
- Create: `ui/src/components/SoveltamisohjeHeader.astro`
- Create: `ui/src/components/ProseSection.astro`
- Create: `ui/src/components/CrossReferenceLink.astro`

- [ ] **Step 1: Create `SoveltamisohjeHeader.astro`**

```astro
---
import { documentMeta } from "../data/soveltamisohje-loader";
const { otsikko, alaotsikko, julkaisija, paivamaara, versio, status, versiohistoria, laatijat } = documentMeta;
---

<header class="sov-header">
  <h1 class="sov-title">{otsikko}</h1>
  <p class="sov-subtitle"><strong>{alaotsikko}</strong></p>
  <div class="sov-meta">
    <p>Julkaisija: {julkaisija}</p>
    <p>Päivämäärä: {paivamaara}</p>
    <p>Versio: {versio} &middot; Status: {status}</p>
  </div>
  <p class="sov-print-date" aria-hidden="true"></p>

  <details class="sov-details">
    <summary>Asiakirjan versio</summary>
    <table class="sov-meta-table">
      <thead>
        <tr><th>Versio</th><th>Päivämäärä</th><th>Tekijä</th><th>Muutoskuvaus</th></tr>
      </thead>
      <tbody>
        {versiohistoria.map(v => (
          <tr><td>{v.versio}</td><td>{v.paivamaara}</td><td>{v.tekija}</td><td>{v.kuvaus}</td></tr>
        ))}
      </tbody>
    </table>
  </details>

  <details class="sov-details">
    <summary>Asiakirjan laatijat</summary>
    <table class="sov-meta-table">
      <thead>
        <tr><th>Nimi</th><th>Organisaatio</th></tr>
      </thead>
      <tbody>
        {laatijat.map(l => (
          <tr><td>{l.nimi}</td><td>{l.organisaatio}</td></tr>
        ))}
      </tbody>
    </table>
  </details>
</header>
```

- [ ] **Step 2: Create `ProseSection.astro`**

```astro
---
interface Props {
  id: string;
  sectionNumber: string;
  title: string;
}
const { id, sectionNumber, title } = Astro.props;
const headingTag = sectionNumber.includes(".") ? "h4" : "h2";
---

<section id={id} class="sov-section">
  {headingTag === "h2" ? (
    <h2>{sectionNumber} {title}</h2>
  ) : (
    <h4>{sectionNumber} {title}</h4>
  )}
  <div class="sov-prose">
    <slot />
  </div>
</section>
```

- [ ] **Step 3: Create `CrossReferenceLink.astro`**

```astro
---
import { elementTypeToProducts, propertySetToProperties } from "../data/soveltamisohje-loader";

interface Props {
  type: "element" | "propertySet";
  code: string;
}

const { type, code } = Astro.props;
const base = import.meta.env.BASE_URL;

let count = 0;
let href = "";

if (type === "element") {
  const products = elementTypeToProducts.get(code);
  count = products?.length ?? 0;
  // Link to the main browser page; the element can be found via search/scroll
  href = `${base}`;
} else {
  const props = propertySetToProperties.get(code);
  count = props?.length ?? 0;
  href = `${base}`;
}
---

{count > 0 && (
  <a href={href} class="sov-xref" title={`${count} kohdetta BETK-selaimessa`}>
    <span class="sov-xref-badge">{count}</span>
  </a>
)}
```

- [ ] **Step 4: Commit**

```bash
git add ui/src/components/SoveltamisohjeHeader.astro ui/src/components/ProseSection.astro ui/src/components/CrossReferenceLink.astro
git commit -m "feat: add SoveltamisohjeHeader, ProseSection, and CrossReferenceLink components"
```

---

### Task 10: DataTable + ReinforcementTable

**Files:**
- Create: `ui/src/components/DataTable.astro`
- Create: `ui/src/components/ReinforcementTable.astro`

- [ ] **Step 1: Create `DataTable.astro`**

```astro
---
import type { ValueTable, PintakasittelyTable, PintakasittelyArvo } from "../data/soveltamisohje-types";
import CrossReferenceLink from "./CrossReferenceLink.astro";
import { elementTypeToProducts } from "../data/soveltamisohje-loader";

interface Props {
  table: ValueTable | PintakasittelyTable;
}

const { table } = Astro.props;
const isPintakasittely = table.arvot.length > 0 && "alavaihtoehdot" in table.arvot[0];
---

<div class="sov-datatable">
  <div class="sov-datatable-header">
    <table class="sov-envelope">
      <tbody>
        <tr><th>Tietosisältötarve</th><td>{table.tietosisalto}</td></tr>
        <tr><th>Rajaukset</th><td>{table.rajaukset}</td></tr>
        <tr><th>Ominaisuusjoukko</th><td>
          <code>{table.ominaisuusjoukko}</code>
          <CrossReferenceLink type="propertySet" code={table.ominaisuusjoukko} />
        </td></tr>
        <tr><th>Ominaisuus</th><td>{table.ominaisuus}</td></tr>
      </tbody>
    </table>
  </div>

  <table class="sov-values-table">
    <caption class="sr-only">Taulukko {table.taulukonNumero}. {table.tietosisalto} — sallitut arvot</caption>
    <thead>
      <tr>
        <th>Koodi</th>
        <th>Kuvaus</th>
        {!isPintakasittely && <th class="sov-xref-col"></th>}
      </tr>
    </thead>
    <tbody>
      {isPintakasittely ? (
        (table.arvot as PintakasittelyArvo[]).map(arvo => (
          <>
            <tr class="sov-pk-group">
              <td colspan="2"><strong><code>{arvo.koodi}</code></strong> {arvo.kuvaus}</td>
            </tr>
            {arvo.alavaihtoehdot?.map(sub => (
              <tr class="sov-pk-sub">
                <td><code>{sub.koodi}</code></td>
                <td>{sub.kuvaus}</td>
              </tr>
            ))}
          </>
        ))
      ) : (
        (table.arvot as { koodi: string; kuvaus: string }[]).map(arvo => (
          <tr>
            <td><code>{arvo.koodi}</code></td>
            <td>{arvo.kuvaus}</td>
            <td class="sov-xref-col">
              {elementTypeToProducts.has(arvo.koodi) && (
                <CrossReferenceLink type="element" code={arvo.koodi} />
              )}
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  <p class="sov-table-number">Taulukko {table.taulukonNumero}.</p>
</div>
```

- [ ] **Step 2: Create `ReinforcementTable.astro`**

```astro
---
import type { EsimerkkiTaulukko } from "../data/soveltamisohje-types";

interface Props {
  table: EsimerkkiTaulukko;
}

const { table } = Astro.props;
---

<div class="sov-reinforcement">
  <table class="sov-reinforcement-table">
    <caption>{table.rakennetyyppi} — {table.kuvaus}</caption>
    <thead>
      <tr>
        <th>{table.rakennetyyppi}</th>
        {table.sarakkeet.map(col => <th>{col}</th>)}
      </tr>
    </thead>
    <tbody>
      {table.rivit.map(rivi => (
        <tr>
          <td><strong>{rivi.ominaisuus}</strong></td>
          {rivi.arvot.map(arvo => <td>{arvo}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add ui/src/components/DataTable.astro ui/src/components/ReinforcementTable.astro
git commit -m "feat: add DataTable and ReinforcementTable components"
```

---

## Phase 5: Components (Part 2) + Page

### Task 11: TOC components

**Files:**
- Create: `ui/src/components/SoveltamisohjeToc.astro`
- Create: `ui/src/components/PrintToc.astro`

- [ ] **Step 1: Create `SoveltamisohjeToc.astro`**

Sticky sidebar TOC with scrollspy. The TOC items match the page section ids.

```astro
---
// The section list is static — matches the page assembly order.
const sections = [
  { id: "tausta", label: "1 Tausta" },
  { id: "tarkoitus", label: "2 Tarkoitus ja rajaukset" },
  { id: "tuotetiedot", label: "3 Tietosisällöt tarjousvaiheessa" },
  { id: "kokoonpano-tyyppi", label: "3.1.1 Kokoonpanon tyyppi" },
  { id: "elementtityyppi", label: "3.1.2 Elementtityyppi" },
  { id: "raudoitus", label: "3.1.3 Raudoitus" },
  { id: "pintakasittely", label: "3.1.4 Pintakäsittely" },
  { id: "varibetoni", label: "3.1.5 Väribetoni" },
  { id: "vahahiilinen", label: "3.1.6 Vähähiilinen" },
  { id: "tyyppielementti", label: "3.1.7 Tyyppielementti" },
  { id: "kaantokivi", label: "3.1.8 Kääntökivi" },
  { id: "toimintaohjeita", label: "4 Toimintaohjeita" },
  { id: "lyhenteet", label: "Lyhenteet" },
  { id: "liite-1", label: "Liite 1: Raudoitusesimerkit" },
  { id: "viittaukset", label: "Viittaukset" },
];
---

<nav class="sov-toc" aria-label="Sisällysluettelo">
  <p class="sidebar-heading">SISÄLLYSLUETTELO</p>
  <ul class="sov-toc-list">
    {sections.map(s => (
      <li><a href={`#${s.id}`} class="sov-toc-link">{s.label}</a></li>
    ))}
  </ul>
</nav>

<script>
  const links = document.querySelectorAll<HTMLAnchorElement>(".sov-toc-link");
  const sections = Array.from(links).map(link => {
    const id = link.getAttribute("href")!.slice(1);
    return { id, link, el: document.getElementById(id) };
  }).filter(s => s.el);

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        const match = sections.find(s => s.el === entry.target);
        if (match) {
          match.link.classList.toggle("active", entry.isIntersecting);
        }
      }
    },
    { rootMargin: "-80px 0px -60% 0px" }
  );

  for (const s of sections) {
    observer.observe(s.el!);
  }
</script>
```

- [ ] **Step 2: Create `PrintToc.astro`**

Same section list, rendered as a static numbered list visible only in print.

```astro
---
const sections = [
  { label: "1 Tausta" },
  { label: "2 Soveltamisohjeen tarkoitus ja rajaukset" },
  { label: "3 Rakentamiskohteen tietomallin tietosisällöt tarjousvaiheessa" },
  { label: "3.1.1 Kokoonpanon tyyppi" },
  { label: "3.1.2 Elementtityyppi" },
  { label: "3.1.3 Raudoitus" },
  { label: "3.1.4 Pintakäsittely" },
  { label: "3.1.5 Väribetoni" },
  { label: "3.1.6 Vähähiilinen" },
  { label: "3.1.7 Tyyppielementti" },
  { label: "3.1.8 Työmaalla käännettävä elementti" },
  { label: "4 Toimintaohjeita hankkeisiin" },
  { label: "Lyhenteet ja terminologia" },
  { label: "Liite 1: Esimerkkejä raudoitustiedosta" },
  { label: "Viittaukset" },
];
---

<div class="sov-print-toc">
  <h2>Sisällysluettelo</h2>
  <ol class="sov-print-toc-list">
    {sections.map(s => <li>{s.label}</li>)}
  </ol>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add ui/src/components/SoveltamisohjeToc.astro ui/src/components/PrintToc.astro
git commit -m "feat: add SoveltamisohjeToc (scrollspy) and PrintToc components"
```

---

### Task 12: Main page assembly

**Files:**
- Create: `ui/src/pages/soveltamisohje.astro`

- [ ] **Step 1: Create `soveltamisohje.astro`**

Note: Astro 6 content collections use `render()` which returns `{ Content }` component. The exact rendering API may differ from Astro 5. During implementation, check the Astro 6 docs for the correct `render()` usage pattern. The page should:

1. Import `getCollection` and `render` from `astro:content`
2. For each entry, call `const { Content } = await render(entry)` 
3. Use `<Content />` inside the template

```astro
---
import { getCollection, render } from "astro:content";
import Layout from "../layouts/Layout.astro";
import SoveltamisohjeHeader from "../components/SoveltamisohjeHeader.astro";
import SoveltamisohjeToc from "../components/SoveltamisohjeToc.astro";
import PrintToc from "../components/PrintToc.astro";
import ProseSection from "../components/ProseSection.astro";
import DataTable from "../components/DataTable.astro";
import ReinforcementTable from "../components/ReinforcementTable.astro";
import {
  sectionTableMap,
  glossary,
  reinforcementExamples,
} from "../data/soveltamisohje-loader";

const allEntries = await getCollection("soveltamisohje");
const entries = allEntries.sort((a, b) => a.data.order - b.data.order);

// Helper: find entry by id
function getEntry(slug: string) {
  return entries.find(e => e.id === slug);
}

// Pre-render all prose entries we need
async function rendered(slug: string) {
  const entry = getEntry(slug);
  if (!entry) return null;
  const { Content } = await render(entry);
  return { data: entry.data, Content };
}

const tausta = await rendered("01-tausta");
const tarkoitus = await rendered("02-tarkoitus-ja-rajaukset");
const tuotetiedotIntro = await rendered("03-tuotetiedot-intro");
const toimintaohjeita = await rendered("04-toimintaohjeita");
const viittaukset = await rendered("05-viittaukset");

// Per-table sections: prose + table data
const tableSlugs = [
  "03-kokoonpano-tyyppi",
  "03-elementtityyppi",
  "03-raudoitus",
  "03-pintakasittely",
  "03-varibetoni",
  "03-vahahiilinen",
  "03-tyyppielementti",
  "03-kaantokivi",
];

const tableSections = await Promise.all(
  tableSlugs.map(async slug => {
    const r = await rendered(slug);
    const table = sectionTableMap[slug];
    const sectionId = slug.replace("03-", "");
    return r && table ? { ...r, table, sectionId } : null;
  })
);
---

<Layout title="BETK — Soveltamisohje">
  <div class="sov-layout">
    <SoveltamisohjeToc />
    <article class="sov-document">
      <SoveltamisohjeHeader />
      <PrintToc />

      {tausta && (
        <ProseSection id="tausta" sectionNumber={tausta.data.section} title={tausta.data.title}>
          <tausta.Content />
        </ProseSection>
      )}

      {tarkoitus && (
        <ProseSection id="tarkoitus" sectionNumber={tarkoitus.data.section} title={tarkoitus.data.title}>
          <tarkoitus.Content />
        </ProseSection>
      )}

      {tuotetiedotIntro && (
        <ProseSection id="tuotetiedot" sectionNumber={tuotetiedotIntro.data.section} title={tuotetiedotIntro.data.title}>
          <tuotetiedotIntro.Content />
        </ProseSection>
      )}

      {tableSections.map(s => s && (
        <div>
          <ProseSection id={s.sectionId} sectionNumber={s.data.section} title={s.data.title}>
            <s.Content />
          </ProseSection>
          <DataTable table={s.table} />
        </div>
      ))}

      {toimintaohjeita && (
        <ProseSection id="toimintaohjeita" sectionNumber={toimintaohjeita.data.section} title={toimintaohjeita.data.title}>
          <toimintaohjeita.Content />
        </ProseSection>
      )}

      <section id="lyhenteet" class="sov-section">
        <h2>Lyhenteet ja terminologia</h2>
        <table class="sov-glossary-table">
          <tbody>
            {glossary.termit.map(t => (
              <tr>
                <td><strong>{t.termi}</strong></td>
                <td>{t.selite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="liite-1" class="sov-section">
        <h2>Liite 1: Esimerkkejä raudoitustiedosta betonielementti tehtaan tarjouslaskennassa</h2>
        {reinforcementExamples.taulukot.map(t => (
          <ReinforcementTable table={t} />
        ))}
      </section>

      {viittaukset && (
        <ProseSection id="viittaukset" sectionNumber={viittaukset.data.section} title={viittaukset.data.title}>
          <viittaukset.Content />
        </ProseSection>
      )}
    </article>
  </div>
</Layout>

<script>
  // Print date stamp — set on beforeprint, visible only in print CSS
  const el = document.querySelector(".sov-print-date");
  if (el) {
    window.addEventListener("beforeprint", () => {
      el.textContent = `Tulostettu: ${new Date().toLocaleDateString("fi-FI")}`;
    });
  }
</script>
```

- [ ] **Step 2: Verify page builds**

Run: `cd ui && npx astro check`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add ui/src/pages/soveltamisohje.astro
git commit -m "feat: add soveltamisohje page with full document assembly"
```

---

## Phase 6: Layout Adjustment + Styles

### Task 13: Layout.astro adjustment

**Files:**
- Modify: `ui/src/layouts/Layout.astro`

The layout currently hardcodes "BETK — PROPERTYT" in the header `<h1>`. The soveltamisohje page needs its own header text. Make the header text configurable.

- [ ] **Step 1: Re-read `Layout.astro`**

Read `ui/src/layouts/Layout.astro` before editing.

- [ ] **Step 2: Make header text use the title prop**

Change the `<h1>` inside `<header>` to use the `title` prop:

Replace:
```html
<h1>BETK — PROPERTYT</h1>
```
With:
```html
<h1>{title}</h1>
```

Also remove `class="hide-col-description"` from `<body>` — it should only be set on the product browser page. Move it to `index.astro` instead.

- [ ] **Step 3: Update `index.astro` to set body class**

Add a `<script>` to `index.astro` that sets `document.body.classList.add('hide-col-description')` on load, or pass the body class through Layout. Simplest: add a `bodyClass` prop to Layout.

In `Layout.astro`, add to Props:
```typescript
interface Props {
  title?: string;
  bodyClass?: string;
}
const { title = "BETK — PROPERTYT", bodyClass = "" } = Astro.props;
```

Change `<body class="hide-col-description">` to `<body class={bodyClass}>`.

In `index.astro`, change `<Layout>` to `<Layout bodyClass="hide-col-description">`.

- [ ] **Step 4: Verify both pages still build**

Run: `cd ui && npx astro check`
Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add ui/src/layouts/Layout.astro ui/src/pages/index.astro
git commit -m "refactor: make Layout header and body class configurable"
```

---

### Task 14: Soveltamisohje styles

**Files:**
- Modify: `ui/src/styles/global.css`

- [ ] **Step 1: Re-read `global.css`**

Read `ui/src/styles/global.css` before editing.

- [ ] **Step 2: Add soveltamisohje screen styles**

Append the following to `global.css`:

```css
/* Soveltamisohje layout ---------------------------------------------------- */

.sov-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 28px;
  align-items: start;
}

.sov-toc {
  position: sticky;
  top: 24px;
  background: var(--surface);
  border: 1px solid var(--separator);
  border-radius: 6px;
  padding: 16px 18px;
}

.sov-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sov-toc-link {
  display: block;
  padding: 3px 8px;
  font-size: 12px;
  color: var(--text-muted);
  border-radius: 3px;
  transition: color 120ms, background 120ms;
}

.sov-toc-link:hover {
  color: var(--text-strong);
  text-decoration: none;
}

.sov-toc-link.active {
  color: var(--accent-teal);
  background: rgba(94, 234, 212, 0.08);
}

/* Document body */

.sov-document {
  max-width: 820px;
}

.sov-header {
  margin-bottom: 32px;
}

.sov-title {
  font-size: 22px;
  line-height: 1.3;
  margin-bottom: 8px;
}

.sov-subtitle {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0 0 12px;
}

.sov-meta {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.sov-meta p {
  margin: 2px 0;
}

.sov-print-date {
  display: none;
}

.sov-details {
  margin-bottom: 8px;
}

.sov-details summary {
  cursor: pointer;
  font-size: 13px;
  color: var(--accent-blue);
  padding: 4px 0;
}

.sov-meta-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 8px;
}

.sov-meta-table th,
.sov-meta-table td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--separator);
  text-align: left;
}

.sov-meta-table th {
  color: var(--text-muted);
  font-weight: 500;
}

/* Prose sections */

.sov-section {
  margin-bottom: 32px;
}

.sov-section h2 {
  font-size: 17px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--separator);
}

.sov-section h4 {
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--accent-teal);
}

.sov-prose {
  font-size: 14px;
  line-height: 1.65;
}

.sov-prose p {
  margin: 0 0 12px;
}

/* Data tables */

.sov-datatable {
  margin-bottom: 24px;
}

.sov-envelope {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 12px;
  background: var(--surface);
}

.sov-envelope th {
  text-align: left;
  padding: 6px 10px;
  color: var(--text-muted);
  font-weight: 500;
  width: 180px;
  border-bottom: 1px solid var(--separator);
}

.sov-envelope td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--separator);
}

.sov-values-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: var(--surface);
}

.sov-values-table thead th {
  text-align: left;
  padding: 8px 10px;
  color: var(--text-muted);
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--separator);
}

.sov-values-table tbody td {
  padding: 6px 10px;
  border-bottom: 1px solid var(--separator);
}

.sov-pk-group td {
  background: var(--surface-raised);
  padding: 8px 10px;
}

.sov-pk-sub td:first-child {
  padding-left: 28px;
}

.sov-table-number {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 6px;
  font-style: italic;
}

.sov-xref-col {
  width: 50px;
  text-align: center;
}

.sov-xref {
  display: inline-flex;
  align-items: center;
}

.sov-xref-badge {
  display: inline-block;
  background: var(--accent-teal);
  color: var(--bg);
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  margin-left: 6px;
}

/* Glossary */

.sov-glossary-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  background: var(--surface);
}

.sov-glossary-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--separator);
  vertical-align: top;
}

.sov-glossary-table td:first-child {
  width: 180px;
  white-space: nowrap;
}

/* Reinforcement tables */

.sov-reinforcement {
  margin-bottom: 24px;
  overflow-x: auto;
}

.sov-reinforcement-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  background: var(--surface);
}

.sov-reinforcement-table caption {
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.sov-reinforcement-table th,
.sov-reinforcement-table td {
  padding: 6px 8px;
  border: 1px solid var(--separator);
  text-align: left;
}

.sov-reinforcement-table th {
  background: var(--surface-raised);
  font-weight: 500;
  color: var(--text-muted);
}

/* Screen-reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Print-only TOC (hidden on screen) */
.sov-print-toc {
  display: none;
}
```

- [ ] **Step 3: Commit**

```bash
git add ui/src/styles/global.css
git commit -m "style: add soveltamisohje screen styles"
```

---

### Task 15: Print styles

**Files:**
- Modify: `ui/src/styles/global.css`

- [ ] **Step 1: Re-read `global.css`**

Read `ui/src/styles/global.css` (end of file) before editing.

- [ ] **Step 2: Append print styles**

```css
/* Print styles ------------------------------------------------------------- */

@media print {
  :root {
    color-scheme: light;
  }

  html, body {
    background: white;
    color: black;
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 11pt;
  }

  code, kbd, samp, .mono {
    font-size: 10pt;
  }

  .app-header {
    background: white;
    border-bottom: 2px solid black;
    padding: 12px 0;
  }

  .app-header h1 {
    color: black;
    font-size: 12pt;
  }

  /* Hide interactive elements */
  .sov-toc,
  .sov-xref-badge {
    display: none !important;
  }

  /* Show print-only elements */
  .sov-print-toc {
    display: block;
    margin-bottom: 24pt;
  }

  .sov-print-toc h2 {
    font-size: 14pt;
    color: black;
    border-bottom: 1px solid #333;
  }

  .sov-print-toc-list {
    font-size: 11pt;
    line-height: 1.8;
  }

  .sov-print-date {
    display: block;
    font-size: 10pt;
    color: #333;
    margin-top: 8pt;
    font-style: italic;
  }

  /* Expand all details elements */
  details {
    open: true;
  }

  details > summary {
    display: none;
  }

  details[open] > *:not(summary) {
    display: block;
  }

  /* Force details open via attribute (CSS cannot toggle open; JS handles it) */

  /* Layout: single column for print */
  .sov-layout {
    display: block;
  }

  .sov-document {
    max-width: 100%;
  }

  /* Page breaks */
  .sov-section h2 {
    break-before: page;
    color: black;
    border-bottom: 1px solid #333;
  }

  .sov-header h2 {
    break-before: auto;
  }

  .sov-datatable,
  .sov-reinforcement-table,
  .sov-meta-table,
  .sov-glossary-table {
    break-inside: avoid;
  }

  /* Table styling for print */
  .sov-values-table,
  .sov-envelope,
  .sov-meta-table,
  .sov-glossary-table,
  .sov-reinforcement-table {
    background: white;
  }

  .sov-values-table thead th,
  .sov-envelope th,
  .sov-reinforcement-table th {
    color: #333;
    border-bottom: 1px solid #333;
  }

  .sov-values-table tbody td,
  .sov-envelope td,
  .sov-glossary-table td,
  .sov-reinforcement-table td {
    border-bottom: 1px solid #ccc;
    color: black;
  }

  .sov-pk-group td {
    background: #f0f0f0;
  }

  .sov-section h4 {
    color: #333;
  }

  /* Cross-reference links — show as plain text in print */
  .sov-xref {
    color: black;
    text-decoration: none;
  }

  /* Page footer */
  @page {
    margin: 2cm;
    @bottom-center {
      content: "BETK Soveltamisohje v1.0 — 17.12.2025";
      font-size: 8pt;
      color: #666;
    }
  }
}
```

- [ ] **Step 3: Add print script to soveltamisohje.astro**

Add to the existing `<script>` block in `soveltamisohje.astro`:

```javascript
// Force all <details> open before print
window.addEventListener("beforeprint", () => {
  document.querySelectorAll("details").forEach(d => d.setAttribute("open", ""));
});
```

- [ ] **Step 4: Commit**

```bash
git add ui/src/styles/global.css ui/src/pages/soveltamisohje.astro
git commit -m "style: add print styles for contract-ready PDF output"
```

---

## Phase 7: Verification

### Task 16: Build verification + type check

- [ ] **Step 1: Run type check**

```bash
cd ui && npx astro check
```
Expected: 0 errors, 0 warnings

- [ ] **Step 2: Run build**

```bash
cd ui && npm run build
```
Expected: build succeeds, output in `../docs/`

- [ ] **Step 3: Verify page exists in build output**

```bash
ls ../docs/soveltamisohje/
```
Expected: `index.html` exists

- [ ] **Step 4: Verify existing page still works**

```bash
ls ../docs/index.html
```
Expected: file exists, unmodified except for Layout changes

- [ ] **Step 5: Start dev server and manually verify**

```bash
cd ui && npm run dev
```

Manual checks:
1. User will visit `/betk-publishing/soveltamisohje` — page renders with sidebar TOC
2. All 8 data tables render with correct values
3. Prose sections display between tables
4. Header shows version, date, status
5. Details panels expand/collapse
6. Cross-reference badges appear on element types that exist in precast data
7. Scrollspy highlights active section in sidebar
8. User visits `/betk-publishing/` — existing product browser still works
9. Print preview (`Ctrl+P`): sidebar hidden, print TOC visible, print date stamp shown, clean layout

- [ ] **Step 6: Spot-check data accuracy**

Verify element type count: the `elementtityypit.json` should have 66 entries (65 types + "Ei asetettu"). Cross-check a few codes against the source document (e.g., `AK` = Sokkelipalkki, `O` = Ontelolaatta, `HK` = Hissikuiluelementti).

- [ ] **Step 7: Commit build output if all passes**

```bash
git add -A
git commit -m "build: add soveltamisohje page to built site"
```
