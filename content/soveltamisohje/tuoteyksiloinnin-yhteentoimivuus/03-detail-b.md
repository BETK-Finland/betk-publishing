---
title: ""
order: 3
section: ""
---

> **Huom!** GTIN-koodin pisin versio on 14-merkkiä pitkä ja tätä lyhyemmät GTIN-koodit täydennetään koodin eteen lisättävillä nollilla 14-merkkiä pitkiksi. GTIN-koodi ei voi olla tätä pidempi.

## 3.4 Variaatioiden yksilöinti

Betonielementtien variaatioiden yksilöinnissä GTIN-koodiin yhdistetään lisätunnisteena variaationumero (Made-to-Order variation number). Variaationumero mahdollistaa sen, että voidaan tietää joidenkin elementtien olevan keskenään samanlaisia. Toisin sanoen, kun monta elementtiä, joilla on samat tekniset tiedot, valmistetaan kerralla, niillä kaikilla on sama GTIN-koodin ja variaationumeron yhdistelmä.

Viivakoodeissa ja RFID-tunnisteissa käytetään sovellustunnusta `(242)` ilmaisemaan variaationumero. GS1-standardin mukaan variaationumero on numeerinen ja vaihtuvapituinen, enintään kuusi numeroa pitkä.

###### Taulukko 4. MTO-Varianttinumero-koodin rakenne

| GS1-sovellustunnus | Made-to-Order variation number      |
|--------------------|-------------------------------------|
| (242)              | N1 — vaihtuva pituus — N6           |

## 3.5 Sarjanumerointi

Yhdistämällä GTIN-koodiin (tai GTIN-koodin ja variaationumeron yhdistelmään) sarjanumerointi, voidaan yksilöidä ja erottaa toisistaan keskenään identtiset elementit. GS1-sovellustunnus `(21)` osoittaa, että tietokenttä sisältää sarjanumeron. GS1-standardin mukaan sarjanumero on aakkosnumeerinen ja enintään 20 merkkiä pitkä.

> **Huom!** Valittu RFID-tunniste voi asettaa rajoituksia sarjanumeron pituudelle ja aakkosten käytölle, joten asia on hyvä tarkistaa RFID-ratkaisutoimittajalta.

###### Taulukko 5. Sarjanumero-koodin rakenne

| GS1-sovellustunnus | Serial number                       |
|--------------------|-------------------------------------|
| (21)               | X1 — vaihtuva pituus — X20          |

## 3.6 Elementtitunnus

Elementille määritetty tunnus, joka on ihmisen helposti luettavissa, ja voi sisältää tietoa esimerkiksi elementin tyypistä tai asennuskerroksesta. Elementtitunnuksen ei tarvitse olla globaalisti yksilöllinen.

###### Taulukko 6. Elementtitunnuksen rakenne

| GS1-sovellustunnus | Elementtitunnus                     |
|--------------------|-------------------------------------|
| (91)               | X1 — vaihtuva pituus — X20          |

## 3.7 GUID

GUID, toiselta nimeltään UUID, on globaalisti yksilöllinen tunnuste, joka voidaan määrittää mallinnusohjelman toimesta tai muulla yksilöllisyyden varmistavalla tavalla.

###### Taulukko 7. GUID-koodin rakenne

| GS1-sovellustunnus | GUID                                 |
|--------------------|--------------------------------------|
| (92)               | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## 3.8 Verkkotunnus

Yhdistämällä verkkotunnus ja muita yksilöintitietoja voidaan hakea internetin välityksellä lisätietoja yksilöidystä tuotteesta URL-osoitteen avulla, mikäli tietojen toimittaja on toteuttanut ominaisuuden ja pitää sitä edelleen toiminnassa.

###### Taulukko 8. Verkkotunnuksen rakenne

| GS1-sovellustunnus | Verkkotunnus                                                                    |
|--------------------|---------------------------------------------------------------------------------|
| (99)               | &lt;alitunnus.&gt;&lt;tunnus.ylätunnus&gt;, jossa &lt;alitunnus.&gt; toistuu 0…n kertaa |

> **Huom!** Optisessa tunnistamisessa (esim. QR-koodi) tämän tiedon sisällyttämisessä käytetään GS1 Digital Link URI syntax 1.5.0 -standardin mukaista menettelyä.

Tässä dokumentissa määritellään kaksi tapaa yhdistää verkkotunnus muihin yksilöintitietoihin URL-osoitteen muodostamiseksi. Tuloksena muodostuu GS1 Digital Link -standardin tai IEC 61406 -standardin mukainen URL-osoite.

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
