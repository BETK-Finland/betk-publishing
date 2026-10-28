---
title: Vakiointi
---
<div data-sov-lang="fi">

## Tehtävä

Vakiointi-työryhmä edistää tilauksesta suunniteltavien rakennustuotteiden, ensisijaisesti betonielementtien, yhtenäistä kuvaamista rakennuksen tietomallissa (BIM). Tavoitteena on, että suunnittelijan malliin kirjaama data on koneluettavaa ja sen merkitys koneymmärrettävä: vastaanottava ohjelma, esimerkiksi elementtitehtaan tuotannonohjausjärjestelmä, osaa lukea datan ja tulkita sen oikein ilman ihmisen apua. Työ ulottuu usealle yhteentoimivuuden tasolle, ja painopiste on syntaktisessa ja semanttisessa tasossa:

| Taso | Mitä työryhmä määrittää |
|---|---|
| Syntaktinen: data on koneluettavaa | Missä rakenteessa data on mallissa: ominaisuuksien nimet, tietotyypit (esimerkiksi luku, teksti tai kyllä/ei) ja yksiköt sekä ominaisuuksien ryhmittely ominaisuusjoukoiksi |
| Semanttinen: merkitys on koneymmärrettävä | Mitä data tarkoittaa: ominaisuuksien määritelmät, sallitut arvot, luokitukset ja pysyvät verkko-osoitteet (URI), joiden kautta ohjelma löytää määritelmän |
| Pragmaattinen: informaatio palvelee käyttötarkoitustaan | Mitä informaatiota tarjouslaskenta, valmistus, kuljetus ja asennus tarvitsevat ja missä vaiheessa |
| Organisatorinen: vastuut on sovittu | Kuka tuottaa minkäkin informaation ja miten määritykset sovitetaan yhteen BEC-mallinnusohjeen ja muiden toimialojen kanssa |
| Tekninen: määritys toimii ohjelmistoissa | Suunnitteluohjelmien IFC-vientiasetukset ja mallin automaattinen tarkastus IDS-tiedostolla |

## Tausta

Rakennuksen tietomalli (BIM, *Building Information Model*) on suunnitteluohjelmalla laadittu kolmiulotteinen malli, jossa jokainen rakennusosa, kuten seinäelementti, on objekti, jolla on luokka, geometria ja ominaisuuksia. Malli siirretään ohjelmasta toiseen avoimessa IFC-muodossa (*Industry Foundation Classes*, ISO 16739). IFC:n tietorakenne määrittelee rakennusosien luokat ja yleiset ominaisuudet kansainvälisesti yhteisellä tasolla. Luokat ja tyyppiarvot kertovat, että objekti on esimerkiksi seinä (*IfcWall*) tai laatta (*IfcSlab*), mutta ne eivät erottele betonielementtien tuotetyyppejä. Pelkästä IFC-luokasta ei siis selviä, onko laatta ontelolaatta vai kuorilaatta tai onko seinä kolmikerroksinen, lämmöneristetty sandwich-elementti. Juuri tätä informaatiota tarvitaan tarjouslaskennassa, hankinnassa ja valmistuksessa.

IFC sallii tarkemman kuvauksen: standardin omien ominaisuusjoukkojen (*property set*) rinnalle voidaan määritellä omia ominaisuuksia ja luokituksia. Niistä on hyötyä vain, jos koko ala käyttää samoja nimiä ja arvoja. Betonielementeille nämä pelisäännöt antaa Betoniteollisuus ry:n ylläpitämä [BEC-mallinnusohje](https://www.elementtisuunnittelu.fi/suunnitteluprosessi/mallintava-suunnittelu), jonka ensimmäinen versio julkaistiin vuonna 2012. Sen mukaan jokainen elementti mallinnetaan kokoonpanona, johon kuuluvat pääosa, muut osat, kuten sandwich-elementin kuoret ja eriste, sekä valutarvikkeet ja raudoitteet. IFC-mallissa elementti säilyy kokoonpanona (*IfcElementAssembly*), ja sen tiedot kirjataan kahteen ominaisuusjoukkoon: BEC (tunnukset, sijainti, mitat, tilavuus, paino ja elementtityyppikohtaiset tiedot) ja BEC-Työnkulku (suunnittelun, valmistuksen, toimituksen ja asennuksen tilat ja päivämäärät). Näin elementtitehdas saa määrät IFC-mallista ilman suunnitteluohjelman omaa tiedostoa (natiivimallia).

BEC on laadittu suunnittelun tarpeisiin, ja sen rajat tulevat vastaan, kun dataa käsitellään koneellisesti usean organisaation välillä. Ominaisuuksille ei ole määritelty sallittuja arvoja, joten kenttiin kirjoitetaan eri hankkeissa eri asioita, ja moni asia sovitaan hankekohtaisesti. Ihminen ymmärtää elementtitunnuksen V1-A, mutta ohjelma ei tiedä, mitä A tarkoittaa juuri tässä hankkeessa. BETK rakentuu BEC:n päälle: ominaisuudet määritellään elementtityypeittäin, niille annetaan sallitut arvot aina kun mahdollista, ja mukaan lisätään hankinnan ja asennuksen tarvitsemat ominaisuudet. Esimerkiksi ominaisuus Kokoonpanon tyyppi saa jonkin arvoista BETONIELEMENTTI, PAIKALLAVALU, PUUKOKOONPANO tai TERÄSKOKOONPANO, jolloin ohjelma erottaa betonielementit mallin muista rakenneosista ilman tulkintaa. Elementtitunnukset ja suunnittelijan työtavat säilyvät, ja BEC ja BETK kehitetään yhdeksi kansalliseksi tietosisällöksi.

## Toiminta-alue

Työryhmä täydentää IFC:tä kansallisella laajennuksella eli yhteisesti sovituilla määrityksillä betonielementeille. Määritykset kohdistuvat seuraaviin osiin:

| Kohde | Mitä työryhmä määrittää |
|---|---|
| Luokka ja tyyppiarvo (*PredefinedType*) | Mihin IFC-luokkaan kukin elementtityyppi viedään (esimerkiksi ontelolaatta laatan luokkaan *IfcSlab*) ja mitä IFC:n valmiita tyyppiarvoja käytetään |
| Kokoonpano (*IfcElementAssembly*) | Miten elementti viedään malliin kokoonpanona, johon kuuluvat betoniosat, raudoitus ja valutarvikkeet, ja kirjataanko kukin ominaisuus koko elementille vai sen osalle |
| Ominaisuusjoukot (*property set*) | Ominaisuudet, joita IFC:n omissa ominaisuusjoukoissa ei ole, kuten elementtityyppi. Kullekin ominaisuudelle määritetään nimi, määritelmä, tietotyyppi, yksikkö ja sallitut arvot |
| Luokitukset | Mihin tuoteryhmään elementti kuuluu sekä luokituksen vastaavuus BEC-ohjeeseen, talotekniikan kansalliseen vakiointiin ja kansainväliseen ETIM-tuoteluokitukseen |
| Tilarakenne | Miten elementin sijainti esitetään mallin hierarkiassa: rakennus, kerros ja lohko |
| Informaatiovaatimukset (IDS) | Mitä mallissa on oltava kussakin vaiheessa (tarjous, toteutus, valmistus, asennus). Vaatimukset kirjoitetaan IDS-tiedostoiksi (*Information Delivery Specification*), joilla ohjelma tarkastaa mallin automaattisesti |

Työryhmä ei määritä datan siirtoa organisaatioiden välillä (siitä vastaa [Rajapinta](/tyoryhmat/rajapinta)), ohjelmistojen toteutusta eikä muuta IFC-standardia. IFC:n puutteista tehdään muutosehdotuksia standardia ylläpitävälle buildingSMART Internationalille.

## Tuotokset

Määritykset julkaistaan avoimesti ja pysyvin verkko-osoittein (URI), jotta niihin voidaan viitata tietomallista ja ohjelmistot voivat hakea ne suoraan:

| Julkaisupaikka | Mitä siellä julkaistaan |
|---|---|
| [BETK-julkaisualusta](/) | [Ominaisuusmääritykset](/properties) ihmis- ja koneluettavassa muodossa, IDS-tiedostot, [soveltamisohjeet](/soveltamisohje/tarjousvaiheen-tietomaaritykset), [esimerkkimallit](/esimerkkimallit) ja IFC-vientiasetukset, [sanasto](/sanasto) sekä keskustelupaperit |
| [bSDD](https://search.bsdd.buildingsmart.org) (*buildingSMART Data Dictionary*) | Ominaisuudet, sallitut arvot ja luokitukset. bSDD on buildingSMARTin kansainvälinen verkkopalvelu, josta suunnitteluohjelmat voivat hakea määritykset suoraan |
| Suomi.fi-yhteentoimivuusalusta ([sanastot.suomi.fi](https://sanastot.suomi.fi), [koodistot.suomi.fi](https://koodistot.suomi.fi)) | Käsitteet määritelmineen (sanastot) ja sallittujen arvojen luettelot (koodistot) kansalliseen käyttöön, myös muille toimialoille ja julkishallinnolle |

## Toimintaperiaatteet

- IFC:n omia luokkia, tyyppiarvoja ja ominaisuuksia käytetään, kun ne riittävät. BETK-ominaisuus lisätään vain informaatiolle, jota IFC:ssä tai BEC:ssä ei ole.
- Ominaisuudelle annetaan sallittujen arvojen luettelo aina, kun mahdolliset arvot voidaan luetella etukäteen.
- Määritys julkaistaan, kun suunnitteluohjelma tuottaa sen, IFC-malli läpäisee IDS-tarkastuksen ja vastaanottava järjestelmä, esimerkiksi elementtitehtaan tuotannonohjaus, lukee datan.

## Yhteistyö

BETKin [Rajapinta](/tyoryhmat/rajapinta)- ja [Valutarvike](/tyoryhmat/valutarvike)-työryhmät · BEC-ohjetta ylläpitävä Betoniteollisuus ry ja BEC-ryhmä · talotekniikan kansallinen vakiointi · buildingSMART Finland · ETIM-tuoteluokitus · ruotsalainen rakennusalan standardointiyhteisö BEAst

## Osallistu toimintaan

Osallistuminen on maksutonta ja korvauksetonta, ja toiminnassa noudatetaan kilpailulainsäädäntöä. Palautetta ja muutosehdotuksia voi antaa julkaisualustan [GitHub-issueina](https://github.com/BETK-Finland/betk-publishing/issues).

</div>

<div data-sov-lang="sv">

## Uppdrag

Arbetsgruppen Standardisering (Vakiointi) främjar en enhetlig beskrivning av byggprodukter som konstrueras på beställning, i första hand betongelement, i byggnadens informationsmodell (BIM). Målet är att de data som konstruktören för in i modellen är maskinläsbara och att deras betydelse är maskintolkbar: det mottagande programmet, till exempel elementfabrikens produktionsstyrningssystem, kan läsa data och tolka dem rätt utan mänsklig hjälp. Arbetet omfattar flera interoperabilitetsnivåer, med tyngdpunkt på den syntaktiska och den semantiska nivån:

| Nivå | Vad arbetsgruppen fastställer |
|---|---|
| Syntaktisk: data är maskinläsbara | I vilken struktur data finns i modellen: egenskapernas namn, datatyper (till exempel tal, text eller ja/nej) och enheter samt grupperingen av egenskaper i egenskapsuppsättningar |
| Semantisk: betydelsen är maskintolkbar | Vad data betyder: egenskapernas definitioner, tillåtna värden, klassifikationer och permanenta webbadresser (URI) genom vilka programmet hittar definitionen |
| Pragmatisk: informationen tjänar sitt syfte | Vilken information anbudskalkylering, tillverkning, transport och montage behöver och i vilket skede |
| Organisatorisk: ansvaret är överenskommet | Vem som producerar vilken information och hur specifikationerna samordnas med BEC-modelleringsanvisningen och andra branscher |
| Teknisk: specifikationen fungerar i programvaran | Projekteringsprogrammens IFC-exportinställningar och automatisk kontroll av modellen med en IDS-fil |

## Bakgrund

Byggnadens informationsmodell (BIM, *Building Information Model*) är en tredimensionell modell som upprättas med ett projekteringsprogram. I modellen är varje byggdel, till exempel ett väggelement, ett objekt med klass, geometri och egenskaper. Modellen överförs mellan program i det öppna IFC-formatet (*Industry Foundation Classes*, ISO 16739). IFC:s datastruktur fastställer byggdelarnas klasser och allmänna egenskaper på en internationellt gemensam nivå. Klasserna och typvärdena anger att objektet till exempel är en vägg (*IfcWall*) eller en platta (*IfcSlab*), men de skiljer inte mellan produkttyper av betongelement. Av IFC-klassen ensam framgår alltså inte om plattan är ett håldäck eller ett plattbärlag, eller om väggen är ett tredelat, värmeisolerat sandwichelement. Det är just den informationen som behövs vid anbudskalkylering, inköp och tillverkning.

IFC tillåter en mer detaljerad beskrivning: vid sidan av standardens egna egenskapsuppsättningar (*property set*) kan egna egenskaper och klassifikationer definieras. De är till nytta endast om hela branschen använder samma namn och värden. För betongelement ges dessa spelregler av [BEC-modelleringsanvisningen](https://www.elementtisuunnittelu.fi/suunnitteluprosessi/mallintava-suunnittelu), som underhålls av Betoniteollisuus ry och vars första version publicerades 2012. Enligt den modelleras varje element som en sammansättning som består av en huvuddel, övriga delar, till exempel sandwichelementets skivor och isolering, samt ingjutningsdetaljer och armering. I IFC-modellen bevaras elementet som en sammansättning (*IfcElementAssembly*), och dess uppgifter förs in i två egenskapsuppsättningar: BEC (beteckningar, läge, mått, volym, vikt och elementtypspecifika uppgifter) och BEC-Työnkulku (status och datum för projektering, tillverkning, leverans och montage). På så sätt får elementfabriken mängderna ur IFC-modellen utan projekteringsprogrammets egen fil (den nativa modellen).

BEC har tagits fram för projekteringens behov, och dess begränsningar blir tydliga när data ska behandlas maskinellt mellan flera organisationer. Inga tillåtna värden har definierats för egenskaperna, så fälten fylls i olika i olika projekt, och mycket avtalas projektvis. En människa förstår elementbeteckningen V1-A, men programmet vet inte vad A betyder just i det projektet. BETK bygger vidare på BEC: egenskaperna definieras per elementtyp, de får tillåtna värden när det är möjligt, och de egenskaper som inköp och montage behöver läggs till. Till exempel får egenskapen Kokoonpanon tyyppi (sammansättningstyp) något av värdena BETONIELEMENTTI, PAIKALLAVALU, PUUKOKOONPANO eller TERÄSKOKOONPANO (betongelement, platsgjutet, träsammansättning, stålsammansättning), så att programmet utan tolkning kan skilja betongelementen från modellens övriga byggdelar. Elementbeteckningarna och konstruktörens arbetssätt består, och BEC och BETK utvecklas till ett gemensamt nationellt informationsinnehåll.

## Verksamhetsområde

Arbetsgruppen kompletterar IFC med ett nationellt tillägg, det vill säga gemensamt överenskomna specifikationer för betongelement. Specifikationerna gäller följande delar:

| Objekt | Vad arbetsgruppen fastställer |
|---|---|
| Klass och typvärde (*PredefinedType*) | Till vilken IFC-klass varje elementtyp förs (till exempel håldäck till plattklassen *IfcSlab*) och vilka av IFC:s färdiga typvärden som används |
| Sammansättning (*IfcElementAssembly*) | Hur elementet förs in i modellen som en sammansättning av betongdelar, armering och ingjutningsdetaljer, och om varje egenskap registreras för hela elementet eller för en del av det |
| Egenskapsuppsättningar (*property set*) | Egenskaper som saknas i IFC:s egna egenskapsuppsättningar, till exempel elementtyp. För varje egenskap fastställs namn, definition, datatyp, enhet och tillåtna värden |
| Klassifikationer | Vilken produktgrupp elementet hör till samt klassifikationens motsvarighet i BEC-anvisningen, den nationella standardiseringen inom installationsteknik och den internationella produktklassifikationen ETIM |
| Rumslig struktur | Hur elementets läge anges i modellens hierarki: byggnad, våningsplan och sektion |
| Informationskrav (IDS) | Vad modellen ska innehålla i varje skede (anbud, genomförande, tillverkning, montage). Kraven skrivs som IDS-filer (*Information Delivery Specification*) med vilka programmet kontrollerar modellen automatiskt |

Arbetsgruppen fastställer inte hur data överförs mellan organisationer (det ansvarar [Gränssnitt](/tyoryhmat/rajapinta) för), implementerar inte programvara och ändrar inte IFC-standarden. Brister i IFC lämnas som ändringsförslag till buildingSMART International, som underhåller standarden.

## Resultat

Specifikationerna publiceras öppet med permanenta webbadresser (URI), så att man kan hänvisa till dem från informationsmodellen och programvaran kan hämta dem direkt:

| Publiceringsplats | Vad som publiceras där |
|---|---|
| [BETK:s publiceringsplattform](/) | [Egenskapsspecifikationer](/properties) i människo- och maskinläsbar form, IDS-filer, [tillämpningsanvisningar](/soveltamisohje/tarjousvaiheen-tietomaaritykset), [exempelmodeller](/esimerkkimallit) och IFC-exportinställningar, [ordlista](/sanasto) samt diskussionsunderlag |
| [bSDD](https://search.bsdd.buildingsmart.org) (*buildingSMART Data Dictionary*) | Egenskaper, tillåtna värden och klassifikationer. bSDD är buildingSMARTs internationella webbtjänst, från vilken projekteringsprogram kan hämta specifikationerna direkt |
| Interoperabilitetsplattformen Suomi.fi ([sanastot.suomi.fi](https://sanastot.suomi.fi), [koodistot.suomi.fi](https://koodistot.suomi.fi)) | Begrepp med definitioner (terminologier) och förteckningar över tillåtna värden (kodlistor) för nationellt bruk, även för andra branscher och den offentliga förvaltningen |

## Verksamhetsprinciper

- IFC:s egna klasser, typvärden och egenskaper används när de räcker till. En BETK-egenskap läggs till endast för information som saknas i IFC och BEC.
- En egenskap får en förteckning över tillåtna värden alltid när de möjliga värdena kan räknas upp i förväg.
- En specifikation publiceras när projekteringsprogrammet kan producera den, IFC-modellen klarar IDS-kontrollen och det mottagande systemet, till exempel elementfabrikens produktionsstyrning, kan läsa data.

## Samarbete

BETK:s arbetsgrupper [Gränssnitt](/tyoryhmat/rajapinta) och [Ingjutningsdetaljer](/tyoryhmat/valutarvike) · Betoniteollisuus ry och BEC-gruppen, som underhåller BEC-anvisningen · den nationella standardiseringen inom installationsteknik · buildingSMART Finland · produktklassifikationen ETIM · BEAst, den svenska byggbranschens standardiseringsorganisation

## Delta i verksamheten

Deltagandet är avgiftsfritt och oavlönat, och verksamheten följer konkurrenslagstiftningen. Respons och ändringsförslag kan lämnas som [GitHub-ärenden (issues)](https://github.com/BETK-Finland/betk-publishing/issues) på publiceringsplattformen.

</div>

<div data-sov-lang="en">

## Purpose

The Standardisation (Vakiointi) working group promotes a consistent way of describing engineer-to-order construction products, primarily precast concrete elements, in the building information model (BIM). The aim is that the data the designer enters in the model is machine-readable and its meaning machine-interpretable: the receiving software, for example a precast plant's production control system, can read the data and interpret it correctly without human help. The work spans several interoperability levels, with the emphasis on the syntactic and semantic levels:

| Level | What the working group specifies |
|---|---|
| Syntactic: data is machine-readable | The structure of the data in the model: property names, data types (for example number, text or yes/no) and units, and how properties are grouped into property sets |
| Semantic: meaning is machine-interpretable | What the data means: property definitions, permitted values, classifications and persistent web addresses (URIs) through which software finds the definition |
| Pragmatic: information serves its purpose | What information cost estimating, manufacturing, transport and installation need, and at which stage |
| Organisational: responsibilities are agreed | Who produces which information, and how the specifications are aligned with the BEC modelling guideline and other sectors |
| Technical: the specification works in software | IFC export settings in design software and automatic checking of the model with an IDS file |

## Background

A building information model (BIM, *Building Information Model*) is a three-dimensional model created with design software, in which every building element, such as a wall element, is an object with a class, geometry and properties. The model is exchanged between programs in the open IFC format (*Industry Foundation Classes*, ISO 16739). The IFC data structure defines the classes and general properties of building elements at an internationally shared level. Classes and type values tell that an object is, for example, a wall (*IfcWall*) or a slab (*IfcSlab*), but they do not distinguish between precast product types. The IFC class alone therefore does not tell whether a slab is a hollow-core slab or a filigree slab, or whether a wall is a three-layer insulated sandwich element. This is exactly the information needed for cost estimating, procurement and manufacturing.

IFC allows a more detailed description: alongside the standard's own property sets (*property set*), custom properties and classifications can be defined. They are useful only if the whole industry uses the same names and values. For precast concrete elements, these rules are set by the [BEC modelling guideline](https://www.elementtisuunnittelu.fi/suunnitteluprosessi/mallintava-suunnittelu), maintained by Betoniteollisuus ry (the Finnish concrete industry association) and first published in 2012. Under BEC, each element is modelled as an assembly consisting of a main part, other parts such as the wythes and insulation of a sandwich element, and cast-in items and reinforcement. In the IFC model the element remains an assembly (*IfcElementAssembly*), and its data is recorded in two property sets: BEC (identifiers, location, dimensions, volume, weight and element-type-specific data) and BEC-Työnkulku (status and dates of design, manufacturing, delivery and installation). This lets a precast plant take quantities from the IFC model without the design software's own file (the native model).

BEC was written for the needs of design, and its limits show when data has to be processed automatically across several organisations. No permitted values have been defined for its properties, so fields are filled in differently from project to project, and many things are agreed per project. A person understands the element mark V1-A, but software cannot know what A means in this particular project. BETK builds on BEC: properties are defined per element type, given permitted values wherever possible, and supplemented with the properties that procurement and installation need. For example, the property Kokoonpanon tyyppi (assembly type) takes one of the values BETONIELEMENTTI, PAIKALLAVALU, PUUKOKOONPANO or TERÄSKOKOONPANO (precast concrete element, cast-in-place, timber assembly, steel assembly), so software can tell precast elements apart from the other structural parts of the model without interpretation. Element marks and designers' working methods stay the same, and BEC and BETK are developed into a single national information content.

## Scope

The working group extends IFC with a national extension, that is, jointly agreed specifications for precast concrete elements. The specifications cover the following:

| Item | What the working group specifies |
|---|---|
| Class and type value (*PredefinedType*) | Which IFC class each element type is mapped to (for example a hollow-core slab to the slab class *IfcSlab*) and which of IFC's predefined type values are used |
| Assembly (*IfcElementAssembly*) | How the element is brought into the model as an assembly of concrete parts, reinforcement and cast-in items, and whether each property is recorded for the whole element or for one of its parts |
| Property sets (*property set*) | Properties not found in IFC's own property sets, such as element type. Each property is given a name, definition, data type, unit and permitted values |
| Classifications | Which product group the element belongs to, and how the classification maps to the BEC guideline, the Finnish national standardisation for building services and the international ETIM product classification |
| Spatial structure | How the element's location is expressed in the model hierarchy: building, storey and section |
| Information requirements (IDS) | What the model must contain at each stage (tender, execution, manufacturing, installation). The requirements are written as IDS files (*Information Delivery Specification*), which software uses to check the model automatically |

The working group does not specify how data is transferred between organisations (the [Interface](/tyoryhmat/rajapinta) working group is responsible for that), does not implement software and does not change the IFC standard. Gaps in IFC are submitted as change proposals to buildingSMART International, which maintains the standard.

## Outputs

Specifications are published openly with persistent web addresses (URIs), so that they can be referenced from the information model and retrieved directly by software:

| Publication channel | What is published there |
|---|---|
| [BETK publishing platform](/) | [Property specifications](/properties) in human- and machine-readable form, IDS files, [implementation guidelines](/soveltamisohje/tarjousvaiheen-tietomaaritykset), [example models](/esimerkkimallit) and IFC export settings, the [glossary](/sanasto) and discussion papers |
| [bSDD](https://search.bsdd.buildingsmart.org) (*buildingSMART Data Dictionary*) | Properties, permitted values and classifications. bSDD is buildingSMART's international web service from which design software can retrieve the specifications directly |
| Finnish Interoperability Platform Suomi.fi ([sanastot.suomi.fi](https://sanastot.suomi.fi), [koodistot.suomi.fi](https://koodistot.suomi.fi)) | Concepts with definitions (terminologies) and lists of permitted values (code lists) for national use, including other sectors and public administration |

## Principles

- IFC's own classes, type values and properties are used when they are sufficient. A BETK property is added only for information that neither IFC nor BEC covers.
- A property is given a list of permitted values whenever the possible values can be listed in advance.
- A specification is published when design software can produce it, the IFC model passes the IDS check and the receiving system, for example a precast plant's production control, can read the data.

## Cooperation

BETK's [Interface](/tyoryhmat/rajapinta) and [Cast-in items](/tyoryhmat/valutarvike) working groups · Betoniteollisuus ry and the BEC group, which maintain the BEC guideline · Finnish national standardisation for building services · buildingSMART Finland · ETIM product classification · BEAst, the Swedish construction industry's standardisation organisation

## Get involved

Participation is free of charge and unpaid, and all activities comply with competition law. Feedback and change proposals can be submitted as [GitHub issues](https://github.com/BETK-Finland/betk-publishing/issues) on the publishing platform.

</div>
