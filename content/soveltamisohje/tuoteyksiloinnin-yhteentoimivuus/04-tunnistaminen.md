---
title: "Automaattinen tunnistaminen ja tiedonkantajat"
order: 4
section: "4"
---

Tuoteyksilöinnin lisäksi on valittava käytettävä tunnistusteknologia ja tiedonkantaja, jotka mahdollistavat niiden koneellisen luennan. Tunnistusteknologian valinnassa tulee huomioida käyttötarkoituksen ja olosuhteiden asettamat vaatimukset. Automaattiseen tunnistamiseen ja tiedonkeruuseen tarkoitettuihin GS1-tietokantajiin voidaan tallentaa erilaisia tietomääriä eri liiketoimintaprosesseja ja kaupankäynnin vaatimuksia varten. GS1-tietokantajiin koodatut tiedot eivät ainoastaan yksilöi tuotteita yksiselitteisesti kaikilla Tuoteyksilöinnin hierarkia tasoilla, vaan ne tarjoavat myös pääsyn tuotetietoihin ja näkyvyyden tuotteiden liikkeisiin toimitusketjussa.

Betonielementtien tuotetunnistamisen minimitietovaatimusten välittämisessä soveltamisohje suosittelee vähintään optiseen tunnistamiseen perustuvan 2D-koodin lisäämistä elementin tuote-etikettiin valmistuksen yhteydessä. GS1-standardissa vaihtoehdot tähän ovat GS1 DataMatrix -koodi sekä QR-koodi GS1 Digital Link -standardin mukaisella tietosisällöllä. Elementin tuote-etiketissä käytettävän 2D-koodin rinnalla, voidaan käyttää myös RFID-teknologiaan perustuvaa koneluettavaa tiedonkantajaa, joko elementin tuote-etiketissä tai betonielementtiin valettuna.

<img width="600" alt="Koneellinen tuotetunnistaminen GS1-tiedonkantajien avulla" src="https://github.com/user-attachments/assets/f1e26ff8-63e8-48e5-8808-ce45a36583b8" />

###### Kuva 2. Koneellinen tuotetunnistaminen GS1-tiedonkantajien avulla

Betonielementtien automaattisessa tunnistamisessa tehokkaimmaksi tiedonkantajaksi on havaittu EPC/RFID Gen-2 UHF -standardiin perustuva passiivinen etäluettava tunniste, josta elementin tunnistenumero voidaan lukea tehokkaasti myös useampien metrien päästä ilman suoraa näköyhteyttä itse tunnisteeseen.

## 4.1 Tuotetunnistus passiivisella EPC/RFID Gen2 UHF -tunnisteella

Tämä ohje perustuu EPC / RFID Gen2 Radio -protokollaan, joka määrittelee fyysisen tiedonsiirron RFID-sirun ja RFID-lukijan välillä käskyillä RFID-lukijan ohjaamiseksi suhteessa RFID-tunnisteisiin. EPC / RFID Gen2 on ISO-standardi ja kattaa erilaisia toiminnallisuuksia, kuten suojauksen ja laajennetun käyttäjämuistin.

GS1 on julkaissut TDS:n (Tag Data Standard), joka määrittelee miten GS1-standardin mukaiset yksilöintiavaimet, kuten SGTIN sisällytetään etäluettaviin EPC Gen2 RFID -tunnisteisiin. TDS-standardi on avoimesti kaikkien käytettävissä ja se onkin jo nykyisin laajasti käytössä RFID-tunnistamisessa eri toimialoilla.

Tuotetunnistuksessa vaadittavat tiedot sisällytetään EPC Gen2 RFID -tunnisteisiin TDS-standardin mukaisesti, tarvittavia GS1-sovellustunnuksia hyödyntäen. Tietojen koodaamiseen käytetään tunnisteen EPC-muistia (EPC memory) ja tarvittavilta osin käyttäjämuistia (User memory).

EPC-muisti on suunniteltu sisältämään EPC-koodi, eli tunnistettavan asian yksilöivä GS1-standardin mukainen tunnistenumero. Betonielementtien yksilöinnissä EPC-muistiin koodataan elementin SGTIN-koodi. Tämä mahdollistaa elementin yksilöivän tunnistenumeron nopean lukemisen.

Käyttäjämuistia käytetään, kun RFID-tunnisteelle on tarve saada enemmän tietoa kuin EPC-muistiin mahtuu. BETK-projektissa on tunnistettu, että tunnisteeseen on tarve sijoittaa lisätietoa kuten variaationumero (Made-to-Order Variation Number), elementtien luokittelussa käytettävä elementtitunnus ja suunnitteluohjelmiston luoma GUID-tunniste.

###### Taulukko 9. Käytössä olevat EPC-binäärikoodausjärjestelmät ja niiden rajoitukset. Sovellettava menetelmä määräytyy numeeristen tai alfanumeeristen merkkien määrätarpeen mukaan.

<html>
<table>
    <thead>
        <tr>
           <th>EPC järjestelmä</th>
           <th>EPC-binaarikoodausjärjestelmä</th>
           <th>EPC + suodatin-bittimäärä</th>
           <th>Sisältää suodatinarvon</th>
           <th>Sarjanumerorajoitus</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">sgtin</td>
            <td>sgtin-96</td>
            <td>96</td>
            <td>Kyllä</td>
            <td>Vain numerot; ei alkavia nollia, desimaaliluvun arvo alle 2³⁸ (eli desimaaliluku enintään 274 877 906 943).</td>
        </tr>
        <tr>
            <td>sgtin-198</td>
            <td>198</td>
            <td>Kyllä</td>
            <td>Kaikki GS1 General Specifications -määritysten sallimat arvot (enintään 20 aakkosnumeerista merkkiä).</td>
        </tr>
    </tbody>
</table>
</html>

###### Taulukko 10. Sovellettava menetelmä SGTIN-96. Standardissa TDS 2.1. (EPC Tag Data Standard) löytyy myös muita sovellusmenetelmiä mm. SGTIN-198, joita voidaan käyttää, mikäli on tarve esimerkiksi pidemmälle (tai numeroiden lisäksi myös kirjaimia sisältävälle) sarjanumerolle.

<html>
<table>
    <thead>
        <tr>
         <th colspan="3">SGTIN-96 tietosisältö</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>EPC SGTIN-96</b></td>
            <td><b>Arvo</b></td>
            <td><b>Kommentti</b></td>
        </tr>
        <tr>
            <td>Otsikko (Header)</td>
            <td><code>48</code></td>
            <td>Numero SGTIN-96:lle</td>
        </tr>
        <tr>
            <td>Filter-arvo (Filter value)</td>
            <td><code>0</code></td>
            <td>0 = Soveltuva arvo tuotteelle, jota ei lueta kassapisteellä</td>
        </tr>
        <tr>
            <td rowspan="6">Partition-arvo</td>
            <td rowspan="6"><code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>5</code> tai <code>6</code></td>
            <td>1 = 11-numeroinen GS1-yritystunniste ja 2 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
            <td>2 = 10-numeroinen GS1-yritystunniste ja 3 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
            <td>3 = 9-numeroinen GS1-yritystunniste ja 4 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
            <td>4 = 8-numeroinen GS1-yritystunniste ja 5 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
            <td>5 = 7-numeroinen GS1-yritystunniste ja 6 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
            <td>6 = 6-numeroinen GS1-yritystunniste ja 7 numeroa tuotenimikkeelle + laajennustunnukselle</td>
        </tr>
        <tr>
          <td>GS1-yritystunniste (GS1 GCP)</td>
          <td><code>N…11</code></td>
          <td>GS1-yritystunniste: 6, 7, 8, 9, 10 tai 11 numeroa</td>
        </tr>
        <tr>
          <td>Tuotenimikkeen numero</td>
          <td><code>N…7</code></td>
          <td>Riippuen GS1-yritystunnisteen pituudesta 1–7 numeroa</td>
        </tr>
        <tr>
          <td>Sarjanumero</td>
          <td><code>N…12</code></td>
          <td>Enintään 12 numeroa (suurin sallittu arvo = 274 877 906 943). Sarjanumeron ei tarvitse olla tasan 12 numeroa. Etunolla ei ole sallittu.</td>
        </tr>
    </tbody>
</table>
</html>

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

###### Taulukko 11. Mahdolliset lisätiedot betonielementtien käyttötapauksessa

<html>
<table>
    <thead>
        <tr>
            <th>GS1-sovellustunnus (AI)</th>
            <th>Selite</th>
            <th>Arvo (esimerkki)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>(91) Internal</td>
            <td>Elementtitunnus</td>
            <td><code>V1001</code></td>
        </tr>
        <tr>
            <td>(92) Internal</td>
            <td>GUID</td>
            <td><code>ba34cf17-0c4b-4c6f-9295-cae05aa74ad4</code></td>
        </tr>
        <tr>
            <td>(99) Internal</td>
            <td>Verkkotunnus</td>
            <td><code>id.rt.fi</code></td>
        </tr>
    </tbody>
</table>
</html>

**RFID-tunnisteiden toteuttaminen**

RFID-tunnisteiden ohjelmointia varten on hyvä olla yhteydessä tunnistamisen ratkaisuihin erikoistuneeseen yritykseen tai yrityksiin. Tunnistamisen ratkaisuja tarjoavia yrityksiä on koottu mm. GS1:n kumppanisivulle ja RFID Lab Finlandin ry:n sivulle.

### 4.1.1 RFID-tunniste symbolin käyttö

RFID-teknologiaa käytettäessä tuotteiden automaattiseen tunnistamiseen on syytä varmistaa, että RFID-tunniste symboli sisällytetään tuote-etiketteihin sekä tuotantosuunnitelmiin. Symbolin tulee olla standardin mukainen, helposti tunnistettavissa ja sijoitettu niin, että se osoittaa selkeästi RFID-tunnisteiden sijainnin ja käytön.

###### Taulukko 12. Yleinen RFID-symboli (ISO 7000-3010).

<html>
<table>
    <tbody>
        <tr>
            <td rowspan="4"><img width="150" alt="RFID-symbol" src="https://github.com/user-attachments/assets/5c9d4d49-e5d6-4bac-a66f-c77a9731fce9"/></td>
            <th>RFID-tunniste symboli</th>
        </tr>
        <tr>
            <td>RFID-tunnistesymbolina suositellaan käytettäväksi ISO 7000-3010 -standardin mukaista, vapaasti saatavilla olevaa yleistä RFID-symbolia. Symbolin käytön tulee täyttää ISO/IEC 29160:2020-standardin vaatimukset, erityisesti silloin kun symbolia hyödynnetään osoittamaan RFID-tunnisteiden sijaintia.</td>
        </tr>
        <tr>
            <th>Koko</th>
        </tr>
        <tr>
            <td>RFID-tunniste symbolin (ISO 7000-3010) tulisi olla vähintään (5 × 5) mm:n kokoinen, ja tämän ympärille tulisi jättää 1 mm:n vapaa alue. Kun RFID-tunniste symboli esitetään matalakontrastisena, sen on oltava riittävän suuri, jotta se on helposti tunnistettavissa tavanomaisissa käyttöolosuhteissa.</td>
        </tr>
    </tbody>
</table>
</html>

**Soveltaminen betonielementtien käyttöympäristössä**

RFID-merkintä symboli on sijoitettava siten, että se näkyy helposti niille, jotka yrittävät etsiä tai lukea varsinaista RFID-tunnistetta. RFID-tunnistesymbolin käyttöä suositellaan betonielementtien tuotantosuunnitelmissa osoittamaan RFID-tunnisteiden sijaintia (esimerkki kuvattu liitteessä 1). RFID-tunnisteen käyttö tulee merkitä RFID-tunniste symbolin avulla, ja käytettävä tunnistetyyppi sekä sijaintitiedot lisätään osaksi betonielementin tuoteosaluetteloa.

**RFID-tunnisteen sijoittaminen fyysiseen tuotteeseen**

RFID-merkittyjen objektien luettavuuteen vaikuttavat useat tekijät, kuten RFID-siru, RFID-antenni ja kotelointi (koko RFID-tunniste). Lisäksi ympäristö, jossa RFID-tunniste luetaan, vaikuttaa olennaisesti luettavuuteen. Ympäristö, jossa on paljon metalliesineitä, voi esimerkiksi aiheuttaa ei-toivottuja heijastuksia radioaaltoihin, jolloin luenta vaikeutuu tai luetaan väärä kohde.

Markkinoilla on erilaisia RFID-tunnisteita, jotka soveltuvat eri käyttötarkoituksiin. RFID-tunnisteita voidaan käyttää betonielementtien toimintaympäristössä betonielementtien sisään valettuna, elementtien pinnalla, tai osana betonielementteihin kiinnitettävää tuote-etikettiä. Betonielementtiin valettaessa, RFID-tunnisteen luettavuuteen vaikuttaa sen ympärillä oleva materiaali, joten valittavan RFID-tunnisteiden tulee olla sellainen, että se on luettavissa sitä ympäröivän betonin läpi riittävästä syvyydestä. Ulkoisessa aplikaattorilla muodostetussa tuoteetiketissä tulee olla merkintä RFID-tunnisteen käytöstä sekä tarkennus siitä, sijaitseeko tunniste itse lapussa vai valettuna elementin sisällä. RFID:n käytön hyödyt perustuvat automatisoituihin lukutapahtumiin ja niistä syntyvään tapahtumatietoon. Lukutapahtumalla tarkoitetaan yksinkertaistettuna sitä, että lukijalaite havaitsee tietyn RFID-tunnisteen.

## 4.2 Tuotetunnistus GS1 DataMatrix 2D-koodilla

GS1 DataMatrix on GS1:n kehittämä kaksiulotteinen viivakoodi, joka voidaan tulostaa yksittäisistä pisteistä tai neliöistä koostuvana neliön tai suorakaiteen muotoisena symbolina. GS1 DataMatrix voi sisältää perinteistä lineaarista viivakoodia suuremman määrän tietoa. Siihen on mahdollista koodata jopa 3116 numeerista merkkiä tai 2335 alfanumeerista merkkiä. GS1 sovellustunnusten avulla GS1 DataMatrixiin voidaan sisällyttää useita erityyppisiä tietoja, kuten esimerkiksi määritetyt betonielementtien minimitietovaatimukset. GS1 DataMatrixin lukeminen vaatii kamerapohjaisen skannerin.

###### Taulukko 13. Esimerkki betonielementtien minimitietovaatimukset sisältävästä GS1 DataMatrix -koodista

<html>
<table>
    <tbody>
        <tr>
            <td rowspan="7"><img width="136" height="136" alt="GS1 DataMatrix esimerkki" src="https://github.com/user-attachments/assets/c016151a-3fe8-458d-af28-9d74ecbf8f5b" /></td>
            <th colspan="2">Esimerkin tietosisältö</th>
        </tr>
        <tr>
            <td><b>GS1-sovellustunnus (AI)</b></td>
            <td><b>Arvo (esimerkki)</b></td>
        </tr>
        <tr>
            <td>(03) = MTO GTIN</td>
            <td><code>06400001000247</code></td>
        </tr>
        <tr>
            <td>(242) = MTO variation number</td>
            <td><code>123456</code></td>
        </tr>
        <tr>
            <td>(21) = Serial number</td>
            <td><code>12345678910</code></td>
        </tr>
        <tr>
            <td>(91) = Internal (elementtitunnus)</td>
            <td><code>V1001</code></td>
        </tr>
        <tr>
            <td>(92) = Internal (GUID)</td>
            <td><code>ba34cf17-0c4b-4c6f-9295-cae05aa74ad4</code></td>
        </tr>
    </tbody>
</table>
</html>

**GS1 DataMatrix -tunnisteen koko ja laatu**

Viivakoodin fyysinen koko vaihtelee sen sisältämän tiedon määrän mukaan. Viivakoodin resoluution (X-dimensio) on oltava vähintään 0,38 mm ja enintään 0,45 mm. Merkinnöissä käytettävien GS1 2D-viivakoodien laadun tulee täyttää ISO / IEC 15415 -standardin vaatimukset. Näin voidaan varmistua niiden luettavuudesta.

Merkintöjen tulostamista varten on hyvä olla yhteydessä tunnistamisen ratkaisuihin erikoistuneeseen yritykseen tai yrityksiin. Tunnistamisen ratkaisuja tarjoavia yrityksiä on koottu mm. GS1:n kumppanisivulle.

## 4.3 Tuotetunnistus GS1 Digital Link -standardin mukaisella QR-koodilla

Mikäli tunnisteen avulla halutaan yksilöinnin ja tunnistamisen lisäksi viestiä kuluttajalle/käyttäjälle älypuhelimen tai muun vastaavan laitteen kautta, voidaan tunnisteena käyttää GS1 Digital Link -standardin mukaista QR-koodia. Tavallisesta QR-koodista tämä eroaa siten, että sen tietosisältö on GS1-standardin määrittämä. Standardi varmistaa, että koodit ja niiden sisältämät tiedot ovat rakenteeltaan yhdenmukaisia ja siten liikuteltavia eri järjestelmien ja toimijoiden välillä sekä luettavissa ja tulkittavissa viivakoodinlukijoilla.

GS1 Digital Link URI:n sisältävä QR-koodi palvelee kahta käyttötarkoitusta:

> **1. Tuotteen yksilöinti ja tunnistaminen offline-tilassa**
> Sitä voidaan käyttää ilman verkkoyhteyttä tuotteen yksilöimiseen ja tunnistamiseen viivakoodinlukijoilla, aivan kuten perinteisiä EAN-viivakoodeja. Tuotteen yksilöinnissä käytetään QR-koodiin sisällytettävää GS1-standardin mukaista GTIN-koodia ja tarvittavia lisätietoja, kuten MTO varianttinumeroa ja sarjanumeroa.

> **2. Verkossa jaettava tietosisältö**
> Sitä voidaan käyttää kuten mitä tahansa QR-koodia, eli ohjaamaan älypuhelimen tai muun vastaavan laitteen käyttäjä verkossa olevaan sisältöön. Erilaiset sovellukset voivat suorittaa saman QR-koodin lukemisen kautta myös muita toimintoja ja näyttää erilaista sisältöä.

GS1 Digital Link URI:ssa käytetään GS1-sovellustunnuksia tietojen sisällyttämiseen. Alla olevassa esimerkissä on muodostettu taulukossa esitetyt minimitietovaatimukset sisältävä GS1 Digital Link URI.

###### Taulukko 14. Esimerkin QR-koodi sisältää taulukossa esitetyt tiedot GS1 Digital Link URI -muodossa: https://id.rt.fi/03/06400001000247/242/123456/21/12345678910

<html>
<table>
    <tbody>
        <tr>
            <td rowspan="5"><img width="164" height="164" alt="GS1 Digital Link QR-koodi esimerkki" src="https://github.com/user-attachments/assets/8203ce02-3c66-4b2c-b405-3cde32e4f885" /></td>
            <th colspan="2">Esimerkin tietosisältö</th>
        </tr>
        <tr>
            <td><b>GS1-sovellustunnukset (AI)</b></td>
            <td><b>Arvo (esimerkki)</b></td>
        </tr>
        <tr>
            <td>(03) = MTO GTIN-koodi</td>
            <td><code>06400001000247</code></td>
        </tr>
        <tr>
            <td>(242) = MTO variation number</td>
            <td><code>123456</code></td>
        </tr>
        <tr>
            <td>(21) = Serial number</td>
            <td><code>12345678910</code></td>
        </tr>
    </tbody>
</table>
</html>

**Esimerkki GS1 Digital Link QR-koodien käyttötarkoituksesta ja suosituksista**

Esimerkin tarkoitus on ainoastaan esitellä tietosisällön rakennetta. Siinä on käytetty kuvitteellista verkkotunnusta id.rt.fi, joten älypuhelimen kameralla luettaessa esimerkkikoodi ei ohjaudu mihinkään sisältöön.

Lähtökohtaisesti suositellaan, että QR-koodiin sisällytetyn GS1 Digital Link URI:n ei tulisi olla minkään varsinaisen verkkosivun URL-osoite. Tästä osoitteesta suositellaan tekemään uudelleenohjaus siihen sisältöön, joka koodin kautta halutaan näyttää.

GS1 Digital Link URI:ssa voidaan käyttää mitä tahansa verkkotunnusta, koska se ei vaikuta tuotteen yksilöintiin ja tunnistamiseen. Verkkotunnus määrittää, minne QR-koodin skannaava henkilö ohjataan verkossa. Koodissa on siten mahdollista käyttää myös palveluntarjoajan verkkotunnusta, mutta on hyvä tiedostaa, että tästä voi seurata ns. vendor lock-in -tilanne, jolloin palveluntarjoajan vaihtaminen vaatii verkkotunnuksen muutoksen myötä myös tuotteisiin painettujen koodien vaihtamisen. Siksi on suositeltavaa käyttää koodissa yrityksen omaa verkkotunnusta.

**Suositeltu lähestymistapa: Tuotteen tunnistamiseen käytettävän aladomainin käyttö**

Suositeltu toimintapa on käyttää GS1 Digital Link -standardin mukaisessa QR-koodissa varsinaisen verkkotunnuksen alle luotavaa, tuotteiden yksilöintitarpeisiin varattua aliverkkotunnusta. Aliverkkotunnus (alidomain) on varsinaisesta verkkotunnuksesta irrallinen osio, jota käytetään varsinaisen verkkotunnuksen rinnalla johonkin tiettyyn käyttötarkoitukseen. Aliverkkotunnuksen käyttö QR-koodissa mahdollistaa tuoteyksilöinnissä käytettävien URL-osoitteiden pysyvyyden ja riippumattomuuden varsinaisten verkkosivujen rakenteesta.

**Esimerkkejä aliverkkotunnuksen käytöstä**

Aliverkkotunnus voidaan tehdä joko yrityksen verkkotunnuksen tai sen eri brändien verkkotunnusten perusteella.

Esimerkiksi: `yritys-x.fi` → `id.yritys-x.fi` tai `brand-x.fi` → `id.brand-x.fi`

Mitä lyhyempi GS1 Digital Link URI on, sitä pienempään tilaan sen sisältävä QR-koodi mahtuu.

GS1 Digital Link -standardin käyttöä on kuvattu tarkemmin seuraavissa GS1-standardeissa:
- https://ref.gs1.org/standards/digital-link/uri-syntax/
- https://ref.gs1.org/standards/resolver/
