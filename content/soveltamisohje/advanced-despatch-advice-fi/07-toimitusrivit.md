---
title: "Toimitusrivit ja tuotetiedot"
order: 7
section: "7"
draft: true
---

Jokainen `cac:DespatchLine` kuvaa yhden toimitettavan betonielementin, tuote-erän tai palvelun ja kytkee sen ostotilauksen riviin.

### 7.1 Rivitaso

`cbc:ID` on rivin yksilöivä numero (`1`, `2`, ...). Kenttä on pakollinen.

`cbc:DeliveredQuantity` ilmoittaa toimitettavan määrän. Attribuutti `@unitCode` on pakollinen ja noudattaa liitteen A yksikkökoodeja (kappalemääräisille elementeille suositellaan koodia `EA`).

`cbc:OutstandingQuantity` ja `cbc:OutstandingReason` ilmoittavat osatoimituksessa jäljelle jäävän määrän ja syyn. `cbc:Note` välittää rivikohtaisen vapaan huomautuksen.

`cac:OrderLineReference` kytkee toimitusrivin ostotilauksen riviin kentillä `cbc:LineID`, `cbc:SalesOrderLineID` ja `cac:OrderReference` / `cbc:ID`. `cac:DocumentReference` voi viitata elementtikuvaan, lähetteeseen tai sertifikaattiin.

### 7.2 Tuotetiedot (Item)

`cbc:Name` on tuotteen tai elementin nimi, esimerkiksi suunnitelman elementtitunnus.

`cac:BuyersItemIdentification` / `cbc:ID` välittää ostajan tai suunnittelijan antaman tuote- tai elementtitunnuksen. `cac:SellersItemIdentification` / `cbc:ID` välittää toimittajan oman tuote- tai elementtitunnisteen.

`cac:StandardItemIdentification` / `cbc:ID` välittää GTIN-koodin (`@schemeID="0160"`). Kun GTIN-koodia ei voida antaa, voidaan käyttää valmistajan tunnistetta rakenteessa `cac:ManufacturersItemIdentification` / `cbc:ID`. `cac:CommodityClassification` / `cbc:ItemClassificationCode` välittää tuoteluokituksen.

`cac:AdditionalItemProperty` välittää toimialakohtaiset lisäominaisuudet (liite B). `cac:ItemInstance` / `cbc:SerialID` yksilöi yksittäisen valmistetun elementin. `TODO`: kohdista käyttö BETK UPID/SGTIN-määritykseen (`(03) MTO GTIN` + `(242)` + `(21)`). `cac:Dimension` välittää elementin fyysiset mitat ja painon (liite C).

**Esimerkki – toimitusrivi**

```xml
<cac:DespatchLine>
  <cbc:ID>1</cbc:ID>
  <cbc:DeliveredQuantity unitCode="EA">1</cbc:DeliveredQuantity>
  <cac:OrderLineReference>
    <cbc:LineID>10</cbc:LineID>
    <cac:OrderReference><cbc:ID>TIL-10025</cbc:ID></cac:OrderReference>
  </cac:OrderLineReference>
  <cac:Item>
    <cbc:Name>SW-elementti S12</cbc:Name>
    <cac:BuyersItemIdentification><cbc:ID>S12</cbc:ID></cac:BuyersItemIdentification>
    <cac:SellersItemIdentification><cbc:ID>EL-2026-0112</cbc:ID></cac:SellersItemIdentification>
    <cac:ItemInstance><cbc:SerialID>EL-2026-0112-01</cbc:SerialID></cac:ItemInstance>
    <cac:Dimension>
      <cbc:AttributeID>LN</cbc:AttributeID>
      <cbc:Measure unitCode="MMT">4800</cbc:Measure>
    </cac:Dimension>
  </cac:Item>
</cac:DespatchLine>
```
