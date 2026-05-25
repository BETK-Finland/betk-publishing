---
title: "Rakennustuotteiden SGTIN-tuoteyksilöinti"
order: 3
section: "3"
---

Tuoteyksilöinti on edellytys toimitusketjun digitalisoinnille tuotteiden valmistuslogiikasta riippumatta. Betonielementtien osalta tuoteyksilöinti on skaalautumisen mahdollistamiseksi päätetty toteuttaa tuoteryhmästä riippumattomaan, avoimeen ja kansainväliseen standardiin pohjautuen. GS1-standardin mukainen GTIN-koodi on laajasti käytetty ratkaisu tuotteiden yksilöintiin eri toimialoilla ja sen soveltaminen valikoitui hankkeessa lähtökohdaksi myös tilauksesta suunniteltavien tuotteiden (betonielementtien) yksilöinnille.

Perinteisesti GTIN-koodeilla on yksilöity ns. varasto-ohjautuvia-tuotteita (MTS), jolloin kaikille identtisille tuotteille on määritetty sama GTIN. Yhdistämällä GTIN-koodiin sarjanumero, luodaan yksilöllinen tunniste, jonka avulla keskenään identtiset tuotteet voidaan erottaa toisistaan. Tätä yhdistelmää kutsutaan SGTIN-koodiksi.

Betonielementit ovat luonteeltaan tilauksesta valmistettavia (MTO) ja tilauksesta suunniteltavia (ETO) tuotteita, jolloin niiden yksilöiminen GTIN-koodeilla poikkeaa lähtökohtaisesti varasto-ohjautuvista tuotteista. On mahdollista luoda jokaiselle yksilölliselle betonielementille oma GTIN-koodinsa, mutta BETK-työryhmän osalta on päädytty hyödyntämään GS1-standardia ns. kolmella yksilöinnin tasolla (esitetty taulukossa 1). Tässä mallissa GTIN-koodilla yksilöidään tietyn valmistajan tietyntyyppinen perustuote. Made-to-Order varianttinumeron avulla yksilöidään tämän perustuotteen tietty variantti ja lopulta sarjanumerolla yksilöidään perustuotteen saman variantin identtiset yksilöt.

<img width="600" alt="Tuoteyksilöinnin hierarkia tasot" src="https://github.com/user-attachments/assets/8b3d332d-0bfd-411d-b3ab-7927fceb5e97" />

###### Kuva 1. Tuoteyksilöinnin hierarkia tasot tarkempaan yksilöintiin

## 3.1 GS1-sovellustunnusten käyttäminen ETO-tuotteiden yksilöintiin

GS1-sovellustunnukset (AI = Application Identifiers) ovat numeerisia etuliitteitä, joita käytetään viivakoodeissa ja EPC/RFID-tunnisteissa määrittämään tietoelementtien merkitys ja muoto. GS1-sovellustunnusten käyttö mahdollistaa eri tietoelementtien erottamisen toisistaan viivakoodeissa tai EPC/RFID-tunnisteessa. GS1-standardi kattaa yli 100 sovellustunnusta. Listaus kaikista GS1-sovellustunnuksista on saatavilla GS1:n verkkosivuilla: https://ref.gs1.org/ai/

Betonielementin yksilöinnissä minimitietovaatimuksissa tarvittaviksi GS1-sovellustunnuksiksi on tunnistettu seuraavat: `(03) MTO GTIN`, `(242) Made-to-Order variation number` ja `(21) Serial number`.

GS1-standardissa ei ole kansalliselle Elementtitunnukselle, GUID:lle ja verkkotunnukselle omaa GS1-sovellustunnusta, joten niiden sisällyttämisessä tiedonkantajaan on BETK-projektissa päätetty käytettävän sovellustunnuksia `(91) Company internal information`, `(92) Company internal information` ja `(99) Company internal information`.

> **Huom!** Verkkotunnuksen käsittely RFID-tunnisteissa on tämän ohjeen julkaisuhetkellä käsiteltävänä GS1:n kansainvälisessä standardinkehityksessä. Tuleva standardi ei välttämättä vastaa tässä esitettyä ratkaisua, mutta ohjeistus tullaan päivittämään standardin valmistuessa sen mukaisesti.

###### Taulukko 1. Tiedonkantajaan lisättävät tilauksesta suunniteltavien (ETO) rakennustuotteen minimitietovaatimukset.

| Sovellustunnus (AI) | Tieto               | Esimerkki                   |
|---------------------|---------------------|-----------------------------|
| (03)                | MTO GTIN-koodi      | `06400001000247`            |
| (242)               | MTO varianttinumero | `123456`                    |
| (21)                | Sarjanumero         | `12345678910`               |

###### Taulukko 2. Tiedonkantajaan lisättävät valinnaiset lisätiedot.

| Sovellustunnus (AI) | Tieto           | Esimerkki                                          |
|---------------------|-----------------|----------------------------------------------------|
| (91)                | Elementtitunnus | `V1001`                                            |
| (92)                | GUID            | `ba34cf17-0c4b-4c6f-9295-cae05aa74ad4`             |
| (99)                | Verkkotunnus    | `id.rt.fi`                                         |

## 3.2 GS1-yritystunniste

GS1-yritystunnus, eli GS1 Company Prefix, on yksilöllinen numerosarja, jonka GS1-organisaatio myöntää yrityksille maailmanlaajuisesti. GS1-yritystunnusta käytetään monissa standardoiduissa tunnistusmenetelmissä, kuten viivakoodeissa ja RFID-tunnisteissa, ja se on pohjana GTIN-, GLN- ja SSCC-koodien muodostamisessa.

Suomessa GS1-yritystunnisteita myöntää GS1 Finland ja sellaisen voi tilata GS1 Finlandin verkkokaupasta.

## 3.3 GTIN-koodin muodostaminen

GTIN-koodi alkaa GS1-yritystunnisteella, jonka pituus voi olla 7–11 numeroa. Tämän jälkeen seuraavat 1–6 numeroa voi määrittää itse, ja näissä suositellaan käytettäväksi juoksevaa numerointia. Koodin viimeinen, eli 13. numero, on tarkistusnumero, joka lasketaan 12 ensimmäisen numeron perusteella Modulo 10 -algoritmilla.

###### Taulukko 3. MTO GTIN-koodin rakenne

| GS1-sovellustunnus | GS1-yritystunniste — tuotekohtainen numero       | Tarkistusnumero |
|--------------------|--------------------------------------------------|-----------------|
| (03)               | <ins>0</ins> N1 N2 N3 N4 N5 N6 N7 N8 N9 N10 N11 N12 | N13         |

> **Huom!** GTIN-koodin pisin versio on 14-merkkiä pitkä ja tätä lyhyemmät GTIN-koodit täydennetään koodin eteen lisättävillä nollilla 14-merkkiä pitkiksi.

## 3.4 Variaatioiden yksilöinti

Betonielementtien variaatioiden yksilöinnissä GTIN-koodiin yhdistetään lisätunnisteena variaationumero (Made-to-Order variation number). Variaationumero mahdollistaa sen, että voidaan tietää joidenkin elementtien olevan keskenään samanlaisia.

Viivakoodeissa ja RFID-tunnisteissa käytetään sovellustunnusta `(242)` ilmaisemaan variaationumero. GS1-standardin mukaan variaationumero on numeerinen ja vaihtuvapituinen, enintään kuusi numeroa pitkä.

## 3.5 Sarjanumerointi

Yhdistämällä GTIN-koodiin (tai GTIN-koodin ja variaationumeron yhdistelmään) sarjanumerointi, voidaan yksilöidä ja erottaa toisistaan keskenään identtiset elementit. GS1-sovellustunnus `(21)` osoittaa, että tietokenttä sisältää sarjanumeron. GS1-standardin mukaan sarjanumero on aakkosnumeerinen ja enintään 20 merkkiä pitkä.

## 3.6 Elementtitunnus

Elementille määritetty tunnus, joka on ihmisen helposti luettavissa, ja voi sisältää tietoa esimerkiksi elementin tyypistä tai asennuskerroksesta. Elementtitunnuksen ei tarvitse olla globaalisti yksilöllinen. Käytetään GS1-sovellustunnusta `(91)`.

## 3.7 GUID

GUID, toiselta nimeltään UUID, on globaalisti yksilöllinen tunnuste, joka voidaan määrittää mallinnusohjelman toimesta tai muulla yksilöllisyyden varmistavalla tavalla. Käytetään GS1-sovellustunnusta `(92)`.

## 3.8 Verkkotunnus

Yhdistämällä verkkotunnus ja muita yksilöintitietoja voidaan hakea internetin välityksellä lisätietoja yksilöidystä tuotteesta URL-osoitteen avulla. Käytetään GS1-sovellustunnusta `(99)`.

### 3.8.1 GS1 Digital Link URL-osoitteen muodostaminen

BETK soveltamisohjeen mukaisesti GS1 Digital Link muodostetaan seuraavasti:

**Yksilöinnin Taso 1:** `https://<verkkotunnus>/03/<MTO GTIN>`

**Yksilöinnin Taso 2:** `https://<verkkotunnus>/03/<MTO GTIN>/242/<MTO varianttinumero>`

**Yksilöinnin Taso 3:** `https://<verkkotunnus>/03/<MTO GTIN>/242/<MTO varianttinumero>/21/<sarjanumero>`

**Taso 3 kun ei varianttinumeroa määritetty:** `https://<verkkotunnus>/03/<MTO GTIN>/21/<sarjanumero>`

Esimerkki: `https://id.rt.fi/03/06400001000247/21/12345678910`

### 3.8.2 IEC 61406 Identification Link muotoisen URL-osoitteen muodostaminen

GUID-tunnisteeseen perustuva IEC 61406 Identification Link standardin mukainen URL-osoite muodostetaan seuraavasti:

`https://<verkkotunnus>/<GUID>`

Esimerkki: `https://id.rt.fi/ba34cf17-0c4b-4c6f-9295-cae05aa74ad4`
