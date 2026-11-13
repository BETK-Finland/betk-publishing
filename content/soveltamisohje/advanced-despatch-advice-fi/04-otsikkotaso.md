---
title: "Advanced Despatch Advice – toteutuksen yksityiskohdat"
order: 4
section: "4"
draft: true
---

Advanced Despatch Advice -sanoman koko syntaksi on kuvattu Peppolin sivustolla (liite D). Tämä ohje ei lisää syntaksiin uusia elementtejä. Kaikkia Peppolin yleisiä sääntöjä on noudatettava, eikä elementtiä saa käyttää muuhun kuin sille määriteltyyn tarkoitukseen. Jos elementtiä ei kuvata tässä, noudatetaan Peppolin yleisohjeistusta.

### 4.1 Otsikkotaso

`cbc:CustomizationID` kertoo, minkä määrityksen mukainen sanoma on. Arvo on aina `urn:fdc:peppol.eu:logistics:trns:advanced_despatch_advice:1`.

`cbc:ProfileID` kertoo liiketoimintaprosessin. Arvo on aina `urn:fdc:peppol.eu:logistics:bis:despatch_advice_only:1`.

`cbc:ID` on lähetysilmoituksen tunniste ja sanoman päätunniste. Kenttä on pakollinen.

`cbc:IssueDate` ja `cbc:IssueTime` ovat lähetysilmoituksen laatimispäivä ja -aika. Vain päivämäärä on pakollinen. Päivämäärän muoto on `YYYY-MM-DD` ja kellonajan `HH:MM:SS`.

`cbc:DocumentStatusCode` kertoo sanoman tilan, esimerkiksi alkuperäinen ilmoitus. `TODO`: vahvista sallitut koodit.

`cbc:DespatchAdviceTypeCode` erottaa toimitustyypit. Arvo `1` tarkoittaa tavara- ja elementtitoimitusta, arvo `2` palvelu- tai massatoimitusta, kuten valmisbetonia tai pumppausta. `TODO`: vahvista koodiston käyttö.

`cbc:Note` on vapaa tekstikenttä tiedoille, joilla ei ole omaa paikkaa sanomassa, esimerkiksi työmaan purkuohjeille.

`cac:OrderReference` / `cbc:ID` viittaa ostajan tilaukseen, johon lähetys perustuu. `cbc:SalesOrderID` viittaa myyjän myyntitilaukseen. Viittaus on betonielementtitoimituksissa tärkeä, koska työmaa kohdistaa lähetyksen sen avulla oikeaan tilaukseen.

`cac:AdditionalDocumentReference` / `cbc:ID` välittää muut viitteet. Kun `cbc:DocumentType` on `ProjectReference`, tunniste on hankkeen tai työmaan tunnus.

**Esimerkki – otsikkotaso**

```xml
<cbc:CustomizationID>urn:fdc:peppol.eu:logistics:trns:advanced_despatch_advice:1</cbc:CustomizationID>
<cbc:ProfileID>urn:fdc:peppol.eu:logistics:bis:despatch_advice_only:1</cbc:ProfileID>
<cbc:ID>TOIM-2026-0042</cbc:ID>
<cbc:IssueDate>2026-11-13</cbc:IssueDate>
<cbc:IssueTime>08:30:00</cbc:IssueTime>
<cbc:DocumentStatusCode>9</cbc:DocumentStatusCode>
<cbc:DespatchAdviceTypeCode>1</cbc:DespatchAdviceTypeCode>
<cbc:Note>Purku nosturilla, sisäänajo pohjoisportista</cbc:Note>
<cac:OrderReference>
  <cbc:ID>TIL-10025</cbc:ID>
  <cbc:SalesOrderID>MT-5541</cbc:SalesOrderID>
</cac:OrderReference>
<cac:AdditionalDocumentReference>
  <cbc:ID>PRJ-8840</cbc:ID>
  <cbc:DocumentType>ProjectReference</cbc:DocumentType>
</cac:AdditionalDocumentReference>
```
