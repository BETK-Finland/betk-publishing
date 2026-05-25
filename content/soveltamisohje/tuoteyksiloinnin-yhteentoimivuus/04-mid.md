---
title: ""
order: 4
section: ""
---

**Esimerkki tietosisällöstä EPC / Gen2 RFID -tunnisteessa:**

RFID Tag EPC Memory Bank Contents (hexadecimal): `301586A004000602DFDC1C3E`

EPC Tag URI: `urn:epc:tag:sgtin-96:0.6400001.000024.12345678910`

**Tietorakenteen osat**

**1. URN-etuliite**
Arvo: `urn:epc:id`
Kuvaus: Määrittää, että tunniste noudattaa EPC URI -standardia. Tämä etuliite on osa Uniform Resource Identifier (URI) -kehystä.

**2. EPC-järjestelmä**
Arvo: `sgtin-96`
Kuvaus: Määrittää koodaustavan ja käytetyn GS1-tunnistusavaimen tyypin. Tässä tapauksessa kyseessä on Serialized Global Trade Item Number (SGTIN), joka on 96-bittisesti binäärikoodattu.

**3. Suodatusarvo**
Arvo: `0`
Kuvaus: Ilmoittaa suodatusasetuksen. Arvo 0 tarkoittaa, että tuotetta ei ole suodatettu myyntipisteellä tapahtuvan skannauksen perusteella, mikä viittaa yleiskäyttöön.

**4. GS1-yritystunniste**
Arvo: `6400001`
Kuvaus: Tunnistaa yrityksen, joka on julkaissut tuotteen. Tämä on GS1:n myöntämä maailmanlaajuisesti yksilöllinen tunniste.

**5. Ilmaisinluku ja tuotenimikkeen numero**
Arvo: `000024`
Kuvaus: Yhdistää ilmaisinluvun ja tuotetunnuksen.

**6. Sarjanumero**
Arvo: `12345678910`
Kuvaus: Yksilöi tuotteen jokaisen yksittäisen instanssin. Tämä mahdollistaa tuotekohtaisen seurannan.

> **Jakoparametri**
> Määrittää, mihin kohtaan erotinmerkki `( . )` asetetaan GS1-yritystunnuksen ja tuotetunnuksen välille. Jakoparametri riippuu GS1-yritystunnuksen pituudesta. Viimeinen erotinmerkki `( . )` URI:ssä erottaa GTIN-numeron (Global Trade Item Number) sarjanumerosta.

> **Tarkistusnumero**
> Käytetään virheentarkistukseen GTIN-tunnuksissa. Tarkistusnumeroa ei kuitenkaan sisällytetä EPC-koodiin RFID-tunnisteessa, sillä RFID-prosessoinnissa sitä ei tarvita.

**Käyttäjämuisti-osio**

Muu lisätieto sijoitetaan RFID-sirun käyttäjämuisti-osioon (User memory) seuraavalla tavalla:
