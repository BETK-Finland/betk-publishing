---
title: "Osapuolet"
order: 5
section: "5"
draft: true
---

Lähetysilmoitus erottaa logistiset osapuolet (lähettäjä ja vastaanottaja) kaupallisista osapuolista (myyjä ja ostaja). Elementtitehdas voi siis lähettää kuorman suoraan työmaalle, vaikka tilaus ja laskutus kulkevat eri yhtiöiden kautta. Lähettäjä ja vastaanottaja ovat pakollisia; muut osapuolet ovat valinnaisia.

### 5.1 Lähettäjä (Despatch Supplier Party)

`cac:DespatchSupplierParty` on osapuoli, joka lähettää tavarat tai toimittaa palvelun. Betonielementtitoimituksessa se on yleensä elementtitehdas.

`cbc:EndpointID` välittää lähettäjän sähköisen Peppol-osoitteen. `@schemeID` on pakollinen. Suomalaisilla organisaatioilla EndpointID on aina OVT-tunnus, jonka `@schemeID` on `0216`.

| `cbc:EndpointID` | `@schemeID` | Huomiot |
|---|---|---|
| `003712345678` | `0216` | Suomalainen OVT-tunnus: kiinteä `0037`, Y-tunnus ilman väliviivaa ja valinnainen enintään 5 merkin tarkenne (numerot tai `A–Z`). |
| `6412345678901` | `0088` | GLN (Global Location Number), jota hallinnoi GS1. |

`cac:PartyIdentification` / `cbc:ID` voi sisältää osapuolten ymmärtämän sisäisen tunnisteen, esimerkiksi tehtaan GLN-tunnuksen. `@schemeID` ei ole pakollinen.

`cac:PostalAddress` sisältää yrityksen osoitteen, esimerkiksi pääkonttorin. Se ei ole lähtö- eikä toimitusosoite; ne ilmoitetaan toimitustiedoissa (luku 6).

`cac:PartyLegalEntity` / `cbc:RegistrationName` on yrityksen virallinen nimi. `cbc:CompanyID` on Y-tunnus, jonka `@schemeID` on `0212`. `cac:RegistrationAddress` kertoo rekisteröintikaupungin ja maan; maakoodi on ISO 3166-1 Alpha-2 (`FI`, `SE`).

`cac:Contact` sisältää yhteyshenkilön tiedot: `cbc:Name`, `cbc:Telephone` ja `cbc:ElectronicMail`.

**Esimerkki – lähettäjä**

```xml
<cac:DespatchSupplierParty>
  <cac:Party>
    <cbc:EndpointID schemeID="0216">003712345678</cbc:EndpointID>
    <cac:PartyIdentification>
      <cbc:ID schemeID="0088">6412345678901</cbc:ID>
    </cac:PartyIdentification>
    <cac:PostalAddress>
      <cbc:StreetName>Katu 1</cbc:StreetName>
      <cbc:CityName>Helsinki</cbc:CityName>
      <cbc:PostalZone>00500</cbc:PostalZone>
      <cac:Country><cbc:IdentificationCode>FI</cbc:IdentificationCode></cac:Country>
    </cac:PostalAddress>
    <cac:PartyLegalEntity>
      <cbc:RegistrationName>Elementtitehdas Oy</cbc:RegistrationName>
      <cbc:CompanyID schemeID="0212">1234567-8</cbc:CompanyID>
      <cac:RegistrationAddress>
        <cbc:CityName>Helsinki</cbc:CityName>
        <cac:Country><cbc:IdentificationCode>FI</cbc:IdentificationCode></cac:Country>
      </cac:RegistrationAddress>
    </cac:PartyLegalEntity>
    <cac:Contact>
      <cbc:Name>Matti Lähettäjä</cbc:Name>
      <cbc:Telephone>+358401234567</cbc:Telephone>
      <cbc:ElectronicMail>logistiikka@elementtitehdas.fi</cbc:ElectronicMail>
    </cac:Contact>
  </cac:Party>
</cac:DespatchSupplierParty>
```

### 5.2 Vastaanottaja (Delivery Customer Party)

`cac:DeliveryCustomerParty` on osapuoli, joka vastaanottaa toimituksen työmaalla tai varastossa. Sanoma reititetään tälle osapuolelle, joten `cbc:EndpointID` on pakollinen ja noudattaa samoja sääntöjä kuin lähettäjällä. Muut kentät (`cac:PartyIdentification`, `cac:PostalAddress`, `cac:PartyLegalEntity`, `cac:Contact`) täytetään kuten luvussa 5.1. Yhteyshenkilö on käytännössä työmaan vastaanottaja.

**Esimerkki – vastaanottaja**

```xml
<cac:DeliveryCustomerParty>
  <cac:Party>
    <cbc:EndpointID schemeID="0216">003787654321</cbc:EndpointID>
    <cac:PartyLegalEntity>
      <cbc:RegistrationName>Rakennusliike Oy</cbc:RegistrationName>
      <cbc:CompanyID schemeID="0212">8765432-1</cbc:CompanyID>
    </cac:PartyLegalEntity>
    <cac:Contact>
      <cbc:Name>Työmaan vastaanotto</cbc:Name>
      <cbc:Telephone>+358409876543</cbc:Telephone>
    </cac:Contact>
  </cac:Party>
</cac:DeliveryCustomerParty>
```

### 5.3 Ostaja (Buyer Customer Party)

`cac:BuyerCustomerParty` on kaupallinen ostaja. Sitä käytetään, kun ostaja on eri kuin vastaanottaja. Ostajalla ei tarvita `cbc:EndpointID`-kenttää, koska sanomaa ei reititetä ostajalle. `cac:PartyIdentification` / `cbc:ID` sisältää ostajan tunnisteen, ja `cac:PartyName` / `cbc:Name` on kauppanimi, jonka ei tarvitse olla virallinen rekisteröity nimi.

**Esimerkki – ostaja**

```xml
<cac:BuyerCustomerParty>
  <cac:Party>
    <cac:PartyIdentification><cbc:ID schemeID="0212">8765432-1</cbc:ID></cac:PartyIdentification>
    <cac:PartyName><cbc:Name>Rakennusliike</cbc:Name></cac:PartyName>
  </cac:Party>
</cac:BuyerCustomerParty>
```

### 5.4 Myyjä (Seller Supplier Party)

`cac:SellerSupplierParty` on kaupallinen myyjä. Sitä käytetään, kun myyjä on eri kuin lähettäjä, esimerkiksi kun konsernin myyntiyhtiö myy ja tehdas toimittaa. Rakenne on sama kuin ostajalla: `cac:PartyIdentification` ja `cac:PartyName`.

**Esimerkki – myyjä**

```xml
<cac:SellerSupplierParty>
  <cac:Party>
    <cac:PartyIdentification><cbc:ID schemeID="0212">1234567-8</cbc:ID></cac:PartyIdentification>
    <cac:PartyName><cbc:Name>Elementtimyynti</cbc:Name></cac:PartyName>
  </cac:Party>
</cac:SellerSupplierParty>
```

### 5.5 Tilaaja (Originator Customer Party)

`cac:OriginatorCustomerParty` on osapuoli, joka alun perin teki tilauksen, kun se on eri kuin ostaja tai vastaanottaja. Esimerkiksi aliurakoitsija voi tilata pääurakoitsijan sopimuksella. Rakenne on sama kuin ostajalla. `TODO`: vahvista, tarvitaanko osapuolta suomalaisessa elementtiketjussa.

**Esimerkki – tilaaja**

```xml
<cac:OriginatorCustomerParty>
  <cac:Party>
    <cac:PartyName><cbc:Name>Asennusurakoitsija Oy</cbc:Name></cac:PartyName>
  </cac:Party>
</cac:OriginatorCustomerParty>
```
