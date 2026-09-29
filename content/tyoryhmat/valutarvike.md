---
title: Valutarvike
---

Valutarvike-työryhmä kehittää yhtenäistä tapaa nimetä ja kuvata betonielementeissä käytettäviä valutarvikkeita. Tavoitteena on, että sama tieto on yksiselitteisesti tunnistettavissa ja koneluettavissa koko toimitusketjussa: suunnittelussa, hankinnassa, elementtivalmistuksessa ja työmaalla. Ryhmä toimii osana Rakennusteollisuus RT:n luotsaamaa [BETK-työryhmää](/tyoryhmat/betk) ja jatkaa [Vakiointi-työryhmän](/tyoryhmat/vakiointi) työtä tuotetasolla.

## Taustaa

Valutarvikkeet ovat elementtiin valettavia tai sen valmistuksessa käytettäviä tuotteita, kuten ansaita, peruspultteja, pilarikenkiä, nostolenkkejä, kiinnityslevyjä ja kannakkeita. Yhdessä elementissä niitä voi olla kymmeniä. Jokainen niistä pitää suunnitella, laskea, tilata, varastoida ja tarvittaessa jäljittää.

Alalla ei ole yhteistä nimikkeistöä valutarvikkeille. Valmistajat, elementtitehtaat ja suunnittelutoimistot käyttävät kukin omia nimiään ja ryhmittelyjään, joten sama tuote kulkee eri järjestelmissä eri nimillä. Siksi rakennuksen tietomallista (BIM-mallista) saatava tieto ei siirry sellaisenaan elementtitehtaan toiminnanohjausjärjestelmään (ERP). Tuotteet joudutaan kohdistamaan tehtaan nimikkeisiin käsin projekti kerrallaan.

Valutarvikkeita ei myöskään voi käsitellä samalla tavalla kuin talotekniikan tuoteosia. Talotekniikassa suunnittelija voi mallintaa geneerisen tuoteosan, jonka tarkka tuote valitaan vasta hankinnassa. Betonielementtisuunnittelussa taas valitaan yleensä heti tietyn valmistajan tuote, koska elementin mitoitus ja raudoitus tehdään juuri sen tuotteen ohjeiden mukaan. Siksi yhteisen nimikkeistön on toimittava sekä yleisellä tasolla (mikä tuote on) että valmistajakohtaisella tasolla (mikä tilattava tuote se on).

## Tavoite

Tavoitteena on vakioitu, avoin nimikkeistö ja tietosisältö valutarvikkeille, jotta:

- suunnitelmista voidaan laskea valutarvikkeiden määrät koneellisesti,
- tieto siirtyy suunnittelusta hankintaan ja valmistukseen ilman käsin tehtävää kohdistusta,
- tilaukset voidaan välittää sähköisinä [Peppol-sanomina](/peppol) tuotetarkkuudella,
- tuotteet voidaan yksilöidä ja jäljittää [tuoteyksilöinnin](/soveltamisohje/tuoteyksiloinnin-yhteentoimivuus) keinoin, ja
- tuotetieto on liitettävissä myöhemmin esimerkiksi ympäristö- ja tuotepassitietoon.

## Kehitteillä oleva lähestymistapa

Lähestymistapa on vielä kehitteillä, ja sitä tarkennetaan työryhmässä ja kommentointiryhmässä.

**Yleisnimi kertoo, mikä tuote on.** Työ nojaa [talotekniikan kansalliseen vakiointikokonaisuuteen](https://www.tietomallintaja.fi/tate-mallinnus/), jossa jokaiselle tuoteosalle on vakioitu yleisnimi ja jonka koodistot on julkaistu [koodistot.suomi.fi](https://koodistot.suomi.fi/)-palvelussa. Periaatteena on, että yksi yleisnimi tarkoittaa aina yhtä asiaa ja kuvaa tuotetta, ei sen käyttötarkoitusta. Käyttötarkoitus (esimerkiksi liittääkö kiinnityslevy kaksi elementtiä vai kiinnittääkö se laitteen) määräytyy rakennesuunnittelun kautta, eikä sitä voi päätellä tuotteesta itsestään. Yleisnimet ryhmitellään pääryhmiin, mutta ryhmittely on vain apuväline tiedon tuottajalle.

**Valmistajan nimet ovat synonyymejä.** Valmistajakohtaiset tuotenimet säilyvät, ja ne liitetään yleisnimeen synonyymeiksi. Malli on peräisin [ETIM-luokitusjärjestelmästä](https://www.etim-international.com/), jossa samankaltaiset eri valmistajien tuotteet kootaan yhden luokan alle ja tunnistetaan synonyymien avulla.

**Nimikkeistö kootaan todellisista tuotteista.** Nimikkeistöä ei rakenneta ylhäältä otsikkotasolta. Ensin kootaan kaikki tilattavissa olevat valutarvikkeet riveittäin valmistajien tuoteluetteloista ja elementtitehtaiden varastonimikkeistöistä, ja sitten niille muodostetaan yleisnimet ja ryhmittely. Samalla selvitetään, mitkä ominaisuudet kukin tuote tarvitsee, jotta se voidaan tilata yksiselitteisesti (esimerkiksi koko, pituus, materiaali tai kierretyyppi).

**Tunnistus nyt ja tavoitetilassa.** Pitkän aikavälin tavoitteena on, että yleisnimet ja ominaisuudet on julkaistu tietomäärityspalvelussa pysyvin tunnistein (URI). Suunnitteluohjelmien kirjastokomponentit viittaisivat näihin tunnisteisiin, jolloin tieto siirtyy IFC-mallin mukana yksiselitteisesti. Koska olemassa olevissa komponenteissa tällaisia viittauksia ei vielä ole, kehitetään rinnalle siirtymävaiheen ratkaisua. Siinä yleisnimi päätellään komponentin nykyisistä tiedoista, kuten suunnitteluohjelman luokkanumerosta ja tuotenimestä.

**Tietosisältö tarkastetaan koneellisesti.** Yleisnimikohtaiset tietovaatimukset on tarkoitus kuvata [IDS-muodossa](https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/) (buildingSMART Information Delivery Specification). Näin sekä suunnitelmien että valmistajien tuoteaineistojen tietosisällön voi tarkastaa automaattisesti.

## Tilanne

Työ käynnistyi keväällä 2026. Ensimmäisessä vaiheessa koottiin alustava pääryhmä- ja yleisnimijaottelu, jota on sittemmin yksinkertaistettu kaksitasoiseksi (pääryhmä ja yleisnimi). Parhaillaan kootaan valmistajien ja elementtitehtaiden tuoteaineistoja yhteiseen luetteloon, ja lisäksi kehitetään työkaluja, joilla valmistajat voivat täydentää ja tarkastaa omat tuotetietonsa. ETIM-yhteensopivuus sekä rajaus paikallavalurakenteisiin ja valmistuksen apuaineisiin ovat vielä selvitettävinä.

Valmistuneet määritykset julkaistaan BETK:n [ominaisuuskirjastossa](/properties) ja [sanastossa](/sanasto).

## Keskeiset käsitteet

- **Valutarvike:** elementtiin valettava tai sen valmistuksessa käytettävä tuote, joka ei ole betonia tai raudoitusta.
- **Komponentti:** suunnitteluohjelman kirjasto-objekti, jolla valutarvike mallinnetaan. Sama valutarvike voi olla mallinnettu eri komponenteilla.
- **Yleisnimi:** vakioitu nimi, joka kertoo yksiselitteisesti, mikä tuote on, valmistajasta riippumatta.
- **Pääryhmä:** yleisnimien ryhmittely, joka helpottaa nimikkeistön käyttöä mutta ei kanna itsenäistä merkitystä.
- **Synonyymi:** valmistajakohtainen tai vakiintunut vaihtoehtoinen nimi, joka ohjaa yleisnimeen.
- **Ominaisuus:** tuotteen yksittäinen tieto (esim. pituus tai materiaali), jolle määritetään tarvittaessa sallitut arvot.
- **Rakennuksen tietomalli (BIM-malli):** suunnitteluohjelmassa tehty rakennuksen malli. **IFC-malli** on sen avoimessa IFC-muodossa siirrettävä versio.
- **Tietomäärityspalvelu:** julkinen palvelu, jossa nimikkeet ja ominaisuudet julkaistaan pysyvin tunnistein, esimerkiksi koodistot.suomi.fi tai buildingSMART Data Dictionary (bSDD).

## Osallistuminen

Ryhmässä on mukana elementtivalmistajien, valutarvikevalmistajien, rakennesuunnittelun ja tutkimuksen edustajia. Työryhmä valmistelee aineiston, ja laajempi kommentointiryhmä kommentoi sitä noin kerran kuukaudessa. Osallistuminen on maksutonta, ja toiminnassa noudatetaan kilpailulainsäädäntöä.
