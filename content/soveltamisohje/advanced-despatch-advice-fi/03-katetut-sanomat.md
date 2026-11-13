---
title: "Katetut sanomamääritykset (BIS)"
order: 3
section: "3"
draft: true
---

Tämä soveltamisohje kattaa Peppol Logistics **Advanced Despatch Advice** -sanomamäärityksen (profiili `urn:fdc:peppol.eu:logistics:bis:despatch_advice_only:1`, mukautus `urn:fdc:peppol.eu:logistics:trns:advanced_despatch_advice:1`).

Sanomalla ilmoitetaan vastaanottajalle tulevasta tai toteutuneesta toimituksesta (`cbc:DespatchAdviceTypeCode` `1` = tavarat ja elementit, `2` = palvelut ja massat). Se tukee kuljetus- ja aikataulutietoja (`cac:Shipment`), toimialakohtaisia lisäominaisuuksia (`cac:AdditionalItemProperty`), yksilöllisiä sarjatunnisteita (`cac:ItemInstance/cbc:SerialID`) sekä fyysisiä mittoja (`cac:Dimension`).

> **TODO:** Lisää prosessikaavio lähettäjän, Peppol-verkoston ja työmaan rooleista.
