---
title: ""
order: 3
section: ""
---

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
