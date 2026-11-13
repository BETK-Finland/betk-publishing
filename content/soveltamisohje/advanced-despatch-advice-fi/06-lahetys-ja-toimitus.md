---
title: "Lähetys, kuljetus ja toimitus"
order: 6
section: "6"
draft: true
---

Lohko `cac:Shipment` kokoaa kuljetuksen, kuorman kokonaispainon ja -tilavuuden sekä työmaan toimitusikkunan. Yksinkertaisissa ennakkoilmoituksissa kuljetus- ja kalusto-osiot voidaan jättää pois, mutta työmaalogistiikan aikataulutuksessa ne ovat keskeisiä.

### 6.1 Lähetys ja rahtierä

`cbc:ID` yksilöi lähetyksen. `cbc:GrossWeightMeasure` ja `cbc:GrossVolumeMeasure` kertovat kuorman kokonaisbruttopainon (`KGM`) ja -tilavuuden (`MTQ`).

`cac:Consignment` kokoaa rahtierän kuljetustiedot. Sen alla `cac:CarrierParty` yksilöi rahdinkuljettajan samoilla tunnistussäännöillä kuin luvussa 5. `cac:OriginalDespatchTransportationService` voi lisäksi välittää kuljetuskaluston tiedot ja kuljetuksen päästötiedot rakenteessa `cac:EnvironmentalEmission` (esimerkiksi `CO2`).

### 6.2 Kuljetusväline ja kuljetusyksiköt

`cac:ShipmentStage` kuvaa kuljetusvaiheen. `cbc:TransportModeCode` kertoo kuljetusmuodon (esimerkiksi `3` maantiekuljetukselle), `cbc:TransportMeansTypeCode` ajoneuvotyypin ja `cac:TransportMeans` / `cac:RoadTransport` / `cbc:LicensePlateID` ajoneuvon rekisteritunnuksen.

`cac:TransportHandlingUnit` kuvaa kuormatilat, elementtipukit, telineet ja lavat, joihin toimitettavat elementit tai tuotteet on pakattu. `TODO`: vahvista SSCC- ja GRAI-tunnisteiden käyttö palautuville elementtipukeille.

### 6.3 Toimitusaika ja -paikka

`cac:Delivery` sisältää toimitusosoitteet ja aikataulun. `cbc:ActualDeliveryDate` ja `cbc:ActualDeliveryTime` kertovat toteutuneen lähtö- tai toimitusajan muodossa `YYYY-MM-DD` ja `HH:MM:SS`. `cac:EstimatedDeliveryPeriod` määrittelee suunnitellun työmaan purkuikkunan (`cbc:StartDate`, `cbc:StartTime`, `cbc:EndDate`, `cbc:EndTime`).

`cac:DeliveryLocation` yksilöi työmaan tai vastaanottopaikan (`cbc:ID`, `cbc:Name`, `cac:Address`). `cac:Despatch` / `cac:DespatchAddress` kertoo lähettävän tehtaan tai varaston osoitteen.

**Esimerkki – lähetys ja toimitus**

```xml
<cac:Shipment>
  <cbc:ID>LAH-9001</cbc:ID>
  <cbc:GrossWeightMeasure unitCode="KGM">18400</cbc:GrossWeightMeasure>
  <cac:Consignment>
    <cbc:ID>ER-9001</cbc:ID>
    <cac:CarrierParty>
      <cac:PartyName><cbc:Name>Kuljetusliike Oy</cbc:Name></cac:PartyName>
    </cac:CarrierParty>
  </cac:Consignment>
  <cac:ShipmentStage>
    <cbc:TransportModeCode>3</cbc:TransportModeCode>
    <cac:TransportMeans>
      <cac:RoadTransport><cbc:LicensePlateID>ABC-123</cbc:LicensePlateID></cac:RoadTransport>
    </cac:TransportMeans>
  </cac:ShipmentStage>
  <cac:Delivery>
    <cac:DeliveryLocation>
      <cbc:ID schemeID="0088">6412345678999</cbc:ID>
      <cbc:Name>Työmaa Kortteli 4</cbc:Name>
    </cac:DeliveryLocation>
    <cac:EstimatedDeliveryPeriod>
      <cbc:StartDate>2026-11-14</cbc:StartDate>
      <cbc:StartTime>08:00:00</cbc:StartTime>
      <cbc:EndDate>2026-11-14</cbc:EndDate>
      <cbc:EndTime>09:00:00</cbc:EndTime>
    </cac:EstimatedDeliveryPeriod>
  </cac:Delivery>
</cac:Shipment>
```
