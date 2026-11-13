---
title: "Käyttötapaukset"
order: 8
section: "8"
draft: true
---

| Skenaario | Tyyppikoodi | Kuljetus | Keskeinen tietosisältö |
|---|---|---|---|
| Betonielementit (ei kuljetustietoja) | `1` | Ei | Projektiviite, elementtitunnus, `SerialID`, mitat, EPD. |
| Betonielementit (kuljetustiedoilla) | `1` | Kyllä | `Shipment`, `CarrierParty`, rekisteritunnus, purkuikkuna, purkupaikka (`Destination1`), CO2. |
| Valmisbetonitoimitus | `2` | Kyllä | Resepti- ja erätiedot, vesikosketus- ja purkuajat. |
| Betonipumppauspalvelu | `2` | Kyllä | Palvelumäärät ja aikaikkunat. |
| Ympäristö- ja EPD-tiedot | `1` | Valinnainen | EPD-tunnisteet/URLit, ilmastovaikutus GWP (`A1–A3`) `AdditionalItemProperty`-kentissä. |
| Muut materiaalit ja sertifioitu puu | `1` | Valinnainen | Tuoterivit, kuljetusyksiköt, sertifikaatit (`cac:Certificate`). |

> **TODO:** Yhdistä skenaariot omiin suomalaisiin esimerkkisanomiin.
