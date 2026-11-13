---
title: "Liite B: AdditionalItemProperty-käyttö"
order: 10
section: "10"
draft: true
---

Käytä seuraavia `cac:AdditionalItemProperty`-nimiä ja -arvoja yhdenmukaisesti, jotta automaattinen käsittely onnistuu läpi tilaus- ja toimitusketjun. Pidä nimeäminen identtisenä kaikkien sanomien välillä.

### 10.1 Vakiinnutetut ominaisuudet (ensimmäinen Peppol-soveltamisohje)

| `cbc:Name`&nbsp;(FI) | `cbc:Name`&nbsp;(EN) | `cbc:Name`&nbsp;(SV) | `cbc:Value` | `cbc:ValueQuantity` | `@unitCode` | Huomiot |
|---|---|---|---|---|---|---|
| `Rakennus` | `Building` | `Byggnad` | `A` | - | - | Ympäristötiedon sanasto `c6` |
| `Kerros` | `Floor` | `Våning` | `1` | - | - | Ympäristötiedon sanasto `c604` |
| `Asennuslohko` | `Assembly block` | `Monteringsblock` | `1` | - | - | - |
| `Suunnittelijan lohko` | `Designers building block` | `Konstruktörens block` | `1` | - | - | - |
| `Porras` | `Staircase` | `Trappa` | `A1` | - | - | Ympäristötiedon sanasto `c606` |
| `Purkupaikka` | `Unloading location` | `Lossningsplats` | - | - | - | - |
| `Suunniteltu tehtaan valupäivä` | `Planned factory casting date` | `Planerat gjutningsdatum (i fabrik)` | `2025-01-15` | - | - | - |
| `Suunniteltu toimituspäivä` | `Planned delivery date` | `Planerat leveransdatum` | `2025-01-16` | - | - | - |
| `MTO - Variation Number` | `MTO - Variation Number` | `MTO - Variation Number` | - | - | - | GS1 Application Identifier `(242)` |
| `GUID` | `GUID` | `GUID` | - | - | - | Suunnitteluohjelmiston GUID/UUID |
| `GUID, IFC` | `GUID, IFC` | `GUID, IFC` | - | - | - | IFC-viennissä annettu GUID/UUID |
| `CO2 ekvivalentti` | `CO2 equivalent` | `CO2-ekvivalent` | `22.8` | `1` | `TNE` | - |
| `Kokoonpanon tyyppi` | `Assembly type` | `Sammansättningstyp` | `BETONIELEMENTTI`, `PAIKALLAVALU`, `TERÄSKOKOONPANO`, `PUUKOKOONPANO`, `MUU KOKOONPANO` | - | - | - |
| `Kääntökivi` | `Flip required` | `Vändning krävs` | `True` / `False` | - | - | - |

### 10.2 Käsittelemättä / Unhandled (TODO)

Seuraavat BEAst-esimerkeissä esiintyvät `cbc:Name`-kentät ovat toistaiseksi käsittelemättä (`TODO`). Kommenttisarake kuvaa alustavan kohdistuksen ensimmäisen soveltamisohjeen kenttiin.

| BEAst `cbc:Name` | Esimerkkiarvo / yksikkö | Kommentti (kohdistus ensimmäiseen soveltamisohjeeseen) |
|---|---|---|
| `Destination1` | `1-09` | Vastaa lähinnä kenttää `Purkupaikka` (tai `Asennuslohko`). Vahvistettava, käytetäänkö yhtä vakiokenttää. |
| `Start unloading time`, `Stop unloading time` | `2023-05-03T12:40:00` | Ei suoraa vastinetta; tarkentaa kenttää `Suunniteltu toimituspäivä` kellonajoilla (vrt. `cac:EstimatedDeliveryPeriod`). |
| `Gross Area` | `4.81` (`MTK`) | Ei vastinetta ensimmäisessä ohjeessa. |
| `ItemType` | `Assembly device` | Ei suoraa vastinetta; liittyy osittain kenttään `Kokoonpanon tyyppi` (esim. apu-/asennustarvikkeet). |
| `GWP GHG A1-3 EPD total value for line`, `GWP GHG A1-3 EPD per kg`, `GWP GHG A1-3 vA1 EPD value`, `GWP GHG A1-3 EPD value per kilogram` | `160.87` / `0.153` (`KGM`) | Rinnakkainen kentälle `CO2 ekvivalentti` (ensimmäinen ohje käyttää `TNE`, BEAst käyttää `KGM` ja neljää eri nimeä). |
| `Program Operator`, `EPD Number`, `EPD Product Name`, `EPD Dataset ID`, `EPD Dataset URL`, `EPD HR URL`, `Mother EPD ID` | `NEPD-6998-6380-SE`, UUID, URL | Ei vastinetta ensimmäisessä ohjeessa; laajentaa ympäristötiedon EPD-viitteillä. |
| `Boverket Resource ID`, `Trafikverket Resource ID` | `6000000059` | Ruotsin viranomaisrekistereitä; ei käytössä Suomessa ilman kansallista vastinetta. |
| `Water Contact`, `Strength Class`, `Exposure Class`, `Chloride Content Class`, `Consistence Class`, `Density Class`, `Dmax`, `Water Cement Ratio`, `Target VCT`, `Actual VCT`, `Binder Combination Type`, `Binder Combination Strength Class`, `Cement Type`, `Cement Description`, `Cement Strength Class`, `Cement Content`, `Cement Origin`, `Additive Type`, `Additive Type Description`, `Addition origin`, `Admixture Type`, `Fiber Description`, `Fiber Amount`, `Target Density`, `Target Slump`, `Ordered Quantity` | `C25/30`, `XC4 XF1`, `S3`, `0.45` | Valmisbetonikohtaisia ominaisuuksia; ei vastinetta ensimmäisessä betonielementtiohjeessa (`PAIKALLAVALU`). |
| `Treatment Code` | `1234567890` | Ei vastinetta ensimmäisessä ohjeessa. |
