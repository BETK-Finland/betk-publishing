---
title: Vakiointi
---

Vakiointi-työryhmä vakioi tilauksesta suunniteltavien (ETO) rakennustuotteiden, ensisijaisesti betonielementtien, toimitusketjussa tuotettavat ja jaettavat tietosisällöt. Kyse on tietomallien (data models) vakioinnista: työryhmä määrittää, mitä tuoteryhmäkohtaista ominaisuustietoa suunnitteluvaiheessa tuotetaan, missä muodossa ja millä sallituilla arvoilla. Tavoitteena on, että tieto on rakenteista, koneluettavaa ja merkitykseltään yksiselitteistä, jolloin kaikki toimitusketjun osapuolet voivat hyödyntää sitä. Työ kohdistuu erityisesti suunnitteluvaiheessa syntyvään tietoon, koska sen varaan rakentuvat tarjous, tilaus, valmistus ja työmaatoiminnot.
 
Työryhmä on osa Rakennusteollisuus RT:n koordinoimaa [BETK-kehityskokonaisuutta](/tyoryhmat/betk), jonka työryhmät ratkaisevat yhdessä toimitusketjun tiedonvirtauksen pullonkauloja. Ratkaisut haetaan ensisijaisesti olemassa olevista standardeista, niistä laaditaan soveltamisohjeet toimialan käyttöön, ja ne testataan ja pilotoidaan ennen laajempaa käyttöönottoa. [Rajapinta-työryhmä](/tyoryhmat/rajapinta) vastaa siitä, miten vakioitu tieto siirretään osapuolten välillä, ja [Valutarvike-työryhmä](/tyoryhmat/valutarvike) vakioi elementteihin valettavien osien nimikkeistöä.
 
## Taustaa
 
Elementtitoimitusketjussa rakennesuunnittelijan laatimaa rakennuksen tietomallia (BIM-mallia) käyttävät rakennusliike ja elementtivalmistaja muun muassa määrä- ja tarjouslaskentaan, valmistuksen suunnitteluun ja asennuksen aikataulutukseen. Mallinnusta ohjaa alalla laajasti käytetty [betonielementtien tietomallinnusohje BEC2012](https://www.elementtisuunnittelu.fi/suunnitteluprosessi/mallintava-suunnittelu).
 
BEC-ohjeistus ei kuitenkaan yksin mahdollista koneluettavaa tiedonsiirtoa. Moni asia sovitaan hankekohtaisesti, eikä ominaisuuksille ole määritetty sallittuja arvoja. Tieto on mallissa, mutta sen tulkitseminen edellyttää ihmistä. Esimerkiksi tiililaattapintaisten sandwich-elementtien tunnistaminen mallista ei onnistu automaattisesti, jos pintakäsittely on merkitty hankekohtaisella lisäkirjaimella elementtityyppitunnukseen. Myöskään IFC-standardin omat luokat, kuten seinä tai laatta, eivät erottele elementtejä riittävän tarkasti määrä- ja kustannuslaskentaa varten.
 
## Tavoite: tieto kulkee suunnittelusta koko toimitusketjuun
 
Elementtitoimitusketju on verkosto. Siinä rakennesuunnittelija, rakennusliike, elementtivalmistaja, tarviketoimittajat, kuljetus ja asennus muodostavat jokaiseen hankkeeseen uuden kokoonpanon. Vakioinnin tavoitteena on, että suunnittelussa kerran tuotettu tieto kulkee tämän verkoston läpi ilman uudelleenkirjausta ja käsin tehtävää tulkintaa, riippumatta siitä, kuka tiedon tuottaa ja kenen järjestelmä sen vastaanottaa.
 
Tavoitetilassa tieto kulkee seuraavasti:
 
1. **Suunnittelu.** Suunnitteluohjelmasta tuotettu IFC-malli sisältää vakioidun tietosisällön, ja sen vaatimustenmukaisuus voidaan tarkastaa koneellisesti [IDS-määrityksellä](https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/).
2. **Hankinta.** Tuotteet voidaan ryhmitellä tarkasti vakioitujen koodistojen ja sallittujen arvojen avulla, ja ne voidaan kohdistaa osapuolten toiminnanohjausjärjestelmien (ERP) nimikkeisiin ilman käsityötä.
3. **Tilaus ja toimitus.** Peppol-verkossa välitettävät sähköiset sanomat (Peppol BIS, UBL) kantavat toimitusketjulle olennaiset tiedot vakioidussa muodossa [rakennusalan ETO-tuotteiden Peppol-soveltamisohjeen](https://www.valtiokonttori.fi/en/maaraykset-ja-ohjeet/peppol-implementation-guide-for-the-construction-industry-to-engineer-to-order-construction-products/) mukaisesti. Ks. myös [Peppol](/peppol).
4. **Tunnistaminen.** Jokainen elementti voidaan yksilöidä ja tunnistaa koneellisesti GS1-standardien avulla [tuoteyksilöinnin soveltamisohjeen](/soveltamisohje/tuoteyksiloinnin-yhteentoimivuus) mukaisesti.
5. **Seuranta.** Valmistuksen, kuljetuksen ja asennuksen vaiheista syntyy tapahtumatietoa (GS1 EPCIS), jonka avulla elementin kulkua voi seurata.
6. **Sijainti ja status.** Toimitusketjun status ja sijainti voidaan kytkeä sekä suunnitelmaan että fyysiseen paikkaan pysyvällä sijaintitunnisteella (GLN). Ks. osio [Sijaintitieto](#sijaintitieto).
7. **Tuotetieto elinkaaren ajan.** Yksilöivän tunnisteen kautta voidaan hakea tuotetietoa myöhemmin, esimerkiksi tulevaisuuden digitaalisen tuotepassin (DPP) vaatimusten mukaisesti.
Työryhmät vastaavat ketjusta eri osin. Vakiointi-työryhmä määrittää tietosisällön, ja [Rajapinta-työryhmä](/tyoryhmat/rajapinta) määrittää sanomat ja tapahtumatiedon, joilla tieto siirretään. Ketju toimii vain, jos tietosisältö on sama joka vaiheessa.
 
Kun toimitusketjun eri vaiheista kertyy rakenteista ja yhteismitallista dataa, sitä voidaan myös analysoida. Toimitusketjun kehityksessä kansainvälisesti tavoiteltu kehityspolku kulkee vaiheittain: ensin näkyvyys siihen, missä tilassa kukin tuote ja toimitus on, sitten ennustaminen, kuten toimitusaikojen ja poikkeamien ennakointi, ja lopulta toimitusketjun ohjaus ja optimointi datan perusteella. Samaa kokonaisuutta kutsutaan usein toimitusketjun digitaaliseksi kaksoseksi. Yksikään näistä vaiheista ei ole mahdollinen ilman vakioitua tietosisältöä, joten vakiointi on niiden yhteinen perusta.
 
Tietosisällön määrittelyssä erotetaan toisistaan tuotteen pysyvät ominaisuudet, hankekohtaiset tiedot, prosessi- ja statustiedot sekä toimitus- ja asennusvaiheen tiedot.
 
## Tulokset
 
Työryhmän keskeiset tulokset on julkaistu BETK:n julkaisualustalla:
 
- [Ominaisuudet](/properties) ja [ominaisuusryhmät](/propertysets): vakioidut, elementtityyppikohtaisesti ryhmitellyt ominaisuudet sallittuine arvoineen. Julkaisualustalla näkyy kokeellisesti myös ominaisuutta vastaava kenttä suunnitteluohjelmassa.
- [Soveltamisohje tarjousvaiheen tietomäärityksistä](/soveltamisohje/tarjousvaiheen-tietomaaritykset): miten elementtityyppi, pintakäsittely, raudoitus ja muut tarjouslaskennan tarvitsemat tiedot esitetään. Elementtityypin tunnistus perustuu alalla vakiintuneisiin [elementtityyppitunnuksiin](https://www.elementtisuunnittelu.fi/runkorakenteet/elementtitunnukset).
- [Esimerkkimallit](/esimerkkimallit): Tekla Structures -malli ja siitä tuotettu IFC-malli, jotka osoittavat ratkaisun toimivan nykyisillä ohjelmistoilla.
- [Soveltamisohje tuoteyksilöinnistä](/soveltamisohje/tuoteyksiloinnin-yhteentoimivuus): miten fyysinen elementti yksilöidään ja kytketään sitä koneellisesti koskevaan tietoon GS1-standardien avulla.
## BEC ja BETK yhdeksi kokonaisuudeksi
 
BETK ei juurikaan muuta suunnittelijan nykyistä työskentelyä, piirustuspohjia tai elementtitunnusten muodostamista. Merkittävimmät muutokset ovat, että elementtityyppi esitetään omana vakioituna tietonaan ja että IFC-malliin kirjoitettavat ominaisuudet nimetään ja ryhmitellään uudelleen. IFC-mallia lukevat laskenta-, tarkastus- ja toiminnanohjausjärjestelmät voivat sen sijaan vaatia päivityksiä.
 
BEC-ohjeistuksen ylläpitäjät ja BETK ovat yhdessä linjanneet, että pitkällä aikavälillä käyttäjälle ei muodostu kahta rinnakkaista tietosisältöä, vaan kehitys etenee yhtenä valtakunnallisena kokonaisuutena. Tavoitteena on viedä yhteensovitettu tietosisältö Tekla Structuresin suomalaiseen ympäristöön seuraavan pääversion yhteydessä, arviolta vuonna 2027. Sitä ennen aineistoa voi pilotoida vapaaehtoisesti, ja käynnissä olevissa hankkeissa voi siirtymäaikana jatkaa nykyisellä BEC-ratkaisulla.
 
## Sijaintitieto
 
Sijaintitieto on yksi työryhmän ajankohtaisimmista aiheista. Kerros- ja lohkotiedot ovat suunnittelijoiden malleissa usein puutteellisia tai eri tavoin kirjoitettuja. Esimerkiksi kirjoitusasun erot voivat synnyttää malliin ylimääräisiä kerroksia, eikä lohkoa voi esittää IFC-mallissa yhtä yksiselitteisesti kuin rakennusta tai kerrosta. Siksi sijaintitieto ei siirry luotettavasti suunnittelusta tilaukseen, toimitukseen ja asennukseen, ja asennuslohkot ja toimitusten kohdistukset muodostetaan usein käsin työmaakohtaisissa järjestelmissä. Sijaintitiedon on oltava sekä ihmisluettavaa, esimerkiksi kollietiketissä ja asennusohjeessa, että koneluettavaa järjestelmien välisessä tiedonsiirrossa.
 
Havainnot ja kehityssuunnat on koottu keskustelupaperiin [Huomioita sijaintitiedosta betonielementtien toimitusketjussa](https://github.com/BETK-Finland/BETK_Documents_FI/blob/main/04_keskustelupaperit/BETK%20keskustelupaperi%3A%20Huomioita%20sijaintitiedosta%20betonielementtien%20toimitusketjussa.md) (luonnos). Paperi ehdottaa sijaintitiedon välittämistä hierarkkisena rakenteena (rakennus, lohko, kerros, asennuslohko, porras, tila) sähköisissä tilaus- ja toimitussanomissa. Vertailukohtana käytetään ruotsalaista BEAst Label -kollietikettiä, jossa sama kohdetieto kulkee sekä etiketissä että sähköisessä sanomassa.
 
Jatkotyössä tarkastellaan, voitaisiinko sovituille sijainneille antaa pysyvä, merkityksetön sijaintitunniste, GS1:n GLN (Global Location Number). Silloin sama avain kulkisi toimitusketjun läpi tekstimuotoisten kerros- ja lohkonimien sijaan:
 
1. suunnittelussa IFC-mallin tiloilla, kerroksilla tai lohkoilla,
2. tilauksessa toimituspaikkana Peppol-sanomassa,
3. kuljetuksessa kollietiketissä,
4. työmaalla vastaanotto- ja asennustapahtumissa, ja
5. käytön aikana kiinteistön ylläpitojärjestelmässä.
GLN ei korvaisi elementin tarkkaa koordinaattisijaintia vaan täydentäisi sitä. Koordinaatti kertoo, missä elementti on geometrisesti, ja GLN kertoo, mihin sovittuun sijaintiin se kuuluu. GS1-tunnisteille on määritetty yhteiset ominaisuudet buildingSMARTin [bSDD-palvelussa](https://search.bsdd.buildingsmart.org) (hakusana "GS1 identifiers"), ja niiden olemassaolon ja muodon voi tarkastaa IFC-mallista IDS-määrityksellä. Aiheesta on kerrottu lisää GS1:n ja buildingSMART Internationalin [webinaarissa](https://www.youtube.com/watch?v=PRN_Yn57rsk).
 
Aihetta viedään eteenpäin pienryhmässä syksyllä 2026 yhdessä [Rajapinta-työryhmän](/tyoryhmat/rajapinta) kanssa. Pienryhmä käsittelee samalla suunnittelun, valmistuksen, logistiikan ja asennuksen statustietojen välittämistä GS1 EPCIS -tapahtumatietona. Keskustelupaperi päivitetään työn pohjalta.
 
## Kehitteillä
 
Syksyn 2026 painopisteet ovat seuraavat:
 
- **Nimeämisen yhtenäistäminen.** Mittaominaisuuksien (pituus, leveys, korkeus, paksuus) nimeämistä yhtenäistetään eri elementtityyppien kesken ja yhdessä talotekniikan kansallisen vakioinnin kanssa, koska IFC ei tarjoa tähän yksiselitteistä ratkaisua.
- **Tietosisällön täydentäminen.** Raudoitus-, materiaali-, nosto-, käsittely- ja asennustietojen esitystapaa tarkennetaan. Lisäksi selvitetään uudelleenkäytettävien elementtien tietotarpeita, kuten elementin alkuperän esittämistä.
- **Koneellinen tarkastus.** Selvitetään, miten BETK-tietovaatimukset voidaan kuvata [IDS-muodossa](https://www.buildingsmart.org/standards/bsi-standards/information-delivery-specification-ids/), jotta mallien tietosisällön voi tarkastaa automaattisesti. Ensimmäisissä testeissä esimerkkimalleilla todettiin, että vaatimukset on määriteltävä suunnittelu- ja toteutusvaiheittain, jotta tarkastus tuottaa olennaisia havaintoja eikä turhia virheilmoituksia.
- **Julkaisualustan kehitys.** Julkaisualustalle kehitetään versionhallintaa ja muutosprosessia, ohjelmistokohtaisia kenttävastaavuuksia sekä export-asetusten jakelua pilotteja varten.
## Palaute ja osallistuminen
 
Havaitut puutteet ja kehitysehdotukset kirjataan julkaisualustan [GitHub-issueiksi](https://github.com/BETK-Finland/betk-publishing/issues), ja työryhmä käsittelee ne kokouksissaan. Muutokset näkyvät [muutoslokissa](/muutokset).
 
Työryhmä kokoontuu Teamsissa kerran kuukaudessa, ja pienryhmiä perustetaan tarpeen mukaan. Mukana on rakennesuunnittelijoiden, elementtivalmistajien, rakennusliikkeiden, ohjelmistotoimittajien ja tutkimuksen edustajia. Työtä tehdään yhteistyössä BEC-ohjeistuksen ylläpitäjien, talotekniikan vakiointityön ja pohjoismaisten vastaavien toimijoiden, kuten ruotsalaisen BEAstin, kanssa. Osallistuminen on maksutonta, ja toiminnassa noudatetaan kilpailulainsäädäntöä.
 
## Keskeiset käsitteet
 
- **Ominaisuus:** yksittäinen tieto, kuten elementtityyppi tai pintakäsittely, jolle on määritetty nimi, tietotyyppi ja tarvittaessa sallitut arvot.
- **Ominaisuusryhmä:** ominaisuuksien kokonaisuus, joka kirjoitetaan IFC-malliin (property set).
- **Sallittu arvo:** ennalta määritetty vaihtoehto, jota ominaisuudelle voi käyttää vapaan tekstin sijaan. Sallitut arvot tekevät tiedosta koneluettavaa.
- **Elementtityyppi:** vakioitu tieto siitä, minkä tyyppinen elementti on (esim. sandwich-seinä tai ontelolaatta). Elementtityyppi on eri asia kuin hankekohtainen elementtitunnus.
- **Tietomalli (data model):** kuvaus siitä, mitä tietoja jostakin asiasta esitetään ja missä rakenteessa. BETKissä sana tarkoittaa sekä rakennuksen tietomallin ominaisuuksia että esimerkiksi sähköisten sanomien ja tunnisteiden tietorakenteita.
- **Rakennuksen tietomalli (BIM-malli):** suunnitteluohjelmassa tehty rakennuksen malli. **IFC-malli** on sen avoimessa IFC-muodossa siirrettävä versio.
- **GLN (Global Location Number):** GS1:n 13-numeroinen sijaintitunniste. Se on merkityksetön eli ei sisällä itse kerros- tai lohkotietoa, vaan tiedot liitetään tunnisteeseen erikseen. Siksi tunniste pysyy samana, vaikka nimet ja järjestelmät muuttuvat.
- **IDS:** buildingSMARTin standardi tietovaatimusten koneluettavaan kuvaamiseen ja IFC-mallien automaattiseen tarkastamiseen.
Lisää termejä löytyy [sanastosta](/sanasto).
 
