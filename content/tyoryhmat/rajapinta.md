---
title: Rajapinta
---
<div data-sov-lang="fi">

## Tehtävä

Rajapinta-työryhmä edistää toimialan toimitusketjuun kohdistuvan kokonaisarkkitehtuurin rakentamista sekä datan koneellista siirtoa yritykseltä toiselle: rakennusliikkeeltä valmistajalle, valmistajalta kuljetukseen ja kuljetuksesta työmaalle. Kokonaisarkkitehtuuri kuvaa, mitä informaatiota toimitusketjun kussakin vaiheessa syntyy, kuka sen tuottaa ja kenelle se siirtyy sekä millä sanomilla, tunnisteilla ja järjestelmillä siirto tehdään. Tavoitteena on, että esimerkiksi tilaus, toimitusilmoitus tai vastaanottoilmoitus kulkee järjestelmästä toiseen ilman, että kenenkään tarvitsee kirjoittaa sitä uudelleen, riippumatta siitä, mitä järjestelmää kukin osapuoli käyttää.

Työryhmän painopiste on teknisessä ja organisatorisessa yhteentoimivuudessa: järjestelmät pystyvät vaihtamaan dataa, ja osapuolet ovat sopineet, kuka lähettää minkäkin sanoman ja missä vaiheessa. Työryhmä huolehtii siitä, että [Vakioinnin](/tyoryhmat/vakiointi) määrittämä informaatio säilyy siirrossa muuttumattomana.

## Tausta

Toimitusketjun informaatio liikkuu nyt pääosin sähköposteina, taulukoina ja PDF-tiedostoina. Vastaanottaja kirjoittaa sen omaan järjestelmäänsä käsin, ja jokainen virhe kopioituu eteenpäin. Kahden yrityksen väliset räätälöidyt liittymät eivät ratkaise ongelmaa, koska rakennushankkeen osapuolet vaihtuvat hankkeesta toiseen.

Ratkaisuun tarvitaan kolme asiaa. Ensimmäinen on yhteinen verkko, jonka kautta kuka tahansa voi lähettää ja vastaanottaa dataa. Toinen on sovitut sanomat eli vakiomuotoiset sähköiset asiakirjat. Kolmas on tunnisteet, jotka kertovat yksiselitteisesti, mitä tuotetta, toimitusta tai paikkaa data koskee.

Kun data on vakioitua, sen voi siirtää koneellisesti sanomina. BETK käyttää yritysten väliseen sanomaliikenteeseen Peppol-verkkoa. Peppol kehitettiin EU:n hankkeessa julkisten hankintojen sähköistä asiointia varten, ja laajimmin se on otettu käyttöön verkkolaskuissa. Verkon kautta voidaan välittää myös tarjouspyyntöjä, tuoteluetteloita, tilauksia, tilausvahvistuksia, toimitusilmoituksia ja vastaanottoilmoituksia. Periaate on ”liity kerran, tavoita kaikki”: yritys liittyy verkkoon yhden palveluntarjoajan eli liityntäpisteen (*access point*) kautta ja voi sen jälkeen vaihtaa sanomia kaikkien verkkoon liittyneiden kanssa ilman kumppanikohtaisia liittymiä. Vastaanottajan osoite ja sen vastaanottamat sanomatyypit löytyvät verkon osoitepalvelusta, ja sanomien rakenne noudattaa Peppol-määrityksiä (Peppol BIS), jotka perustuvat kansainväliseen UBL-standardiin.

Sanoma sopii tilanteisiin, joissa data lähetetään tietylle vastaanottajalle, kuten tilaukseen tai toimitusilmoitukseen. Osa datasta, kuten tuotetiedot, tapahtumatieto ja EU:n digitaalinen tuotepassi, on luontevampaa jakaa haettavaksi: data pysyy tuottajallaan, ja sen käyttöoikeuksista sovitaan yhteisillä säännöillä. Tällaista jakamisen mallia kutsutaan data-avaruudeksi (*data space*). Siksi kokonaisarkkitehtuuri kuvaa molemmat tavat ja sen, mikä data kulkee kummallakin.

## Toiminta-alue

Työryhmä määrittää, miten data kulkee. Työ jakautuu kuuteen osaan:

1. **Kokonaisarkkitehtuuri.** Toimitusketjun kuvaus julkishallinnon kokonaisarkkitehtuurimenetelmän JHS 179 näkökulmista: toiminta, tieto, tietojärjestelmät ja teknologia suunnittelusta ylläpitoon. Kuvaus kertoo myös, mikä data kulkee sanomina ja mikä jaetaan haettavaksi, ja miten tiedonsiirto vastaa EU:n vaatimuksiin, kuten digitaaliseen tuotepassiin ja sähköisiin rahtikuljetustietoihin (eFTI).
2. **Sanomat.** Mitkä Peppol-sanomien kentät täytetään betonielementtitoimituksessa ja mihin kohtaan sanomaa sijoitetaan rakentamisen erityisinformaatio, kuten kuormausjärjestys tai asennussijainti.
3. **Informaation liittäminen sanomaan.** Miten Vakioinnin määrittämät ominaisuudet ja tuoteluokat kulkevat sanomassa ja miten sanoman rivi viittaa tietomallin elementtiin.
4. **Tunnisteet.** Jokainen elementti, kuljetuserä ja paikka tarvitsee tunnisteen, joka on sama kaikissa järjestelmissä. Tunnisteet perustuvat GS1-standardeihin, joiden varaan myös kaupan viivakoodit rakentuvat. Työryhmä määrittää, miten tunnisteita käytetään sanomissa, kollietiketeissä sekä elementtiin kiinnitettävissä RFID-tunnisteissa ja DataMatrix-koodeissa.
5. **Tapahtumatieto.** Kun elementti valmistuu, lastataan, saapuu työmaalle tai asennetaan, siitä syntyy tapahtuma. Työryhmä määrittää, miten tapahtumat kirjataan dataksi ja jaetaan osapuolille, jotta jokainen tietää, missä vaiheessa toimitus on. Tapahtumat kuvataan GS1:n EPCIS-standardin mukaisesti.
6. **Tarkastus ja esimerkit.** Sanomien tarkastussäännöt, testatut esimerkkisanomat ja esitysmuoto, jolla koneluettava sanoma näytetään ihmiselle luettavana asiakirjana.

Työryhmä ei:

- määritä, mitä data merkitsee tai mitkä arvot ovat sallittuja. Siitä vastaa [Vakiointi](/tyoryhmat/vakiointi).
- rakenna yksittäisen yrityksen tai ohjelmiston liittymiä.
- ylläpidä Peppol-verkkoa. Siitä vastaavat Suomen Peppol-viranomainen ja kansainvälinen OpenPeppol-järjestö.
- käsittele kaupallisia ehtoja, kuten hintoja, sopimuksia tai reklamaatioita.

## Tuotokset

| Tuotos | Mitä se on | Missä |
|---|---|---|
| Kokonaisarkkitehtuurikuvaus | Toimitusketjun toiminta, informaatiovirrat, vastuut ja järjestelmät suunnittelusta ylläpitoon | Julkaisualusta |
| Sanomien soveltamisohjeet | Ohje siitä, miten Peppol-sanomia käytetään tilauksesta valmistettavien tuotteiden toimituksissa | Peppol-viranomaisen sivusto, [Peppol](/peppol) |
| Esimerkkisanomat | Testatut esimerkit ja niiden luettava esitysmuoto toteuttajien avuksi | GitHub, julkaisualusta |
| Tunnistamisen soveltamisohje | Ohje GS1-tunnisteiden muodostamiseen ja kiinnittämiseen elementtiin | [Tuoteyksilöinti](/soveltamisohje/tuoteyksiloinnin-yhteentoimivuus) |
| Tapahtumatiedon määritys | Mitkä tapahtumat kirjataan ja miten ne kuvataan EPCIS-muodossa | Julkaisualusta |
| Pilottiraportit | Havainnot todellisista toimituksista | Julkaisualusta |

## Toimintaperiaatteet

Työryhmä käyttää olemassa olevia standardeja eikä tee omia sanomamuotoja. Ensin selvitetään, mitä informaatiota prosessin seuraava vaihe tarvitsee, ja vasta sitten valitaan sanoma. Lähtökohtana ovat Ruotsissa ja muissa Pohjoismaissa jo käytössä olevat mallit, jotta maiden väliset toimitukset toimivat samoin säännöin. Ohje julkaistaan, kun sen mukaisia sanomia on lähetetty ja vastaanotettu onnistuneesti todellisten yritysten järjestelmissä.

## Yhteistyö

- **BETK:n muut työryhmät:** [Vakiointi](/tyoryhmat/vakiointi) määrittää sanomissa kulkevan informaation, ja [Valutarvike](/tyoryhmat/valutarvike) valutarvikkeiden nimet.
- **Suomen Peppol-viranomainen:** julkaisee rakennusalan soveltamisohjeet.
- **OpenPeppol ja GS1:** kansainvälisten sanoma- ja tunnistestandardien ylläpitäjät.
- **Pohjoismaat:** ruotsalainen BEAst ja pohjoismainen rakennusalan Peppol-foorumi.
- **Muut toimialat:** talotekniikan Peppol-työ, jotta rakennusalalla on yhteiset käytännöt materiaalista riippumatta.
- **Rakennetun ympäristön digitalisaation (RYD) hankeohjelma ja Rakennustietosäätiö:** toimialan tiekartta ja toimitusketjun kokonaisarkkitehtuurin viitekehys.

## Osallistu toimintaan

Osallistuminen on maksutonta ja korvauksetonta, ja toiminnassa noudatetaan kilpailulainsäädäntöä. Palautetta ja muutosehdotuksia voi antaa julkaisualustan [GitHub-issueina](https://github.com/BETK-Finland/betk-publishing/issues).

</div>

<div data-sov-lang="sv">

## Uppdrag

Arbetsgruppen Gränssnitt (Rajapinta) främjar uppbyggnaden av en helhetsarkitektur för branschens leveranskedja samt maskinell överföring av data från ett företag till ett annat: från byggföretaget till tillverkaren, från tillverkaren till transporten och från transporten till byggarbetsplatsen. Helhetsarkitekturen beskriver vilken information som uppstår i varje skede av leveranskedjan, vem som producerar den och till vem den överförs, samt med vilka meddelanden, identifierare och system överföringen sker. Målet är att till exempel en order, en leveransavisering eller ett mottagningsbesked går från ett system till ett annat utan att någon behöver skriva in det på nytt, oavsett vilket system respektive part använder.

Arbetsgruppens tyngdpunkt ligger på teknisk och organisatorisk interoperabilitet: systemen kan utbyta data, och parterna har kommit överens om vem som skickar vilket meddelande och i vilket skede. Arbetsgruppen ser till att den information som [Standardisering](/tyoryhmat/vakiointi) fastställer förblir oförändrad vid överföringen.

## Bakgrund

Informationen i leveranskedjan rör sig i dag främst som e-post, kalkylblad och PDF-filer. Mottagaren för in den i sitt eget system för hand, och varje fel kopieras vidare. Skräddarsydda kopplingar mellan två företag löser inte problemet, eftersom parterna i ett byggprojekt byts från projekt till projekt.

Lösningen kräver tre saker. Den första är ett gemensamt nätverk genom vilket vem som helst kan skicka och ta emot data. Den andra är överenskomna meddelanden, det vill säga elektroniska dokument i standardformat. Den tredje är identifierare som entydigt anger vilken produkt, leverans eller plats data gäller.

När data är standardiserade kan de överföras maskinellt som meddelanden. BETK använder Peppol-nätverket för meddelandetrafiken mellan företag. Peppol utvecklades i ett EU-projekt för elektronisk hantering av offentlig upphandling, och mest används det för e-fakturor. Via nätverket kan man också förmedla anbudsförfrågningar, produktkataloger, order, orderbekräftelser, leveransaviseringar och mottagningsbesked. Principen är ”anslut en gång, nå alla”: företaget ansluter sig till nätverket via en tjänsteleverantör, en så kallad accesspunkt (*access point*), och kan därefter utbyta meddelanden med alla anslutna utan partnerspecifika kopplingar. Mottagarens adress och de meddelandetyper den kan ta emot finns i nätverkets adresstjänst, och meddelandenas struktur följer Peppol-specifikationerna (Peppol BIS), som bygger på den internationella standarden UBL.

Ett meddelande passar när data skickas till en viss mottagare, till exempel en order eller en leveransavisering. En del data, till exempel produktinformation, händelseinformation och EU:s digitala produktpass, är det naturligare att dela så att de kan hämtas: data stannar hos den som producerar dem, och rätten att använda dem regleras med gemensamma regler. En sådan delningsmodell kallas dataområde (*data space*). Därför beskriver helhetsarkitekturen båda sätten och vilka data som går vilken väg.

## Verksamhetsområde

Arbetsgruppen fastställer hur data överförs. Arbetet är indelat i sex delar:

1. **Helhetsarkitektur.** En beskrivning av leveranskedjan ur perspektiven i den offentliga förvaltningens metod för helhetsarkitektur JHS 179: verksamhet, information, informationssystem och teknologi, från projektering till förvaltning. Beskrivningen visar också vilka data som går som meddelanden och vilka som delas för hämtning, och hur dataöverföringen uppfyller EU:s krav, till exempel på digitalt produktpass och elektronisk godstransportinformation (eFTI).
2. **Meddelanden.** Vilka fält i Peppol-meddelandena som fylls i vid leverans av betongelement och var i meddelandet byggspecifik information placeras, till exempel lastordning eller monteringsplats.
3. **Koppling av information till meddelandet.** Hur de egenskaper och produktklasser som Standardisering fastställer förs med i meddelandet och hur en rad i meddelandet hänvisar till ett element i informationsmodellen.
4. **Identifierare.** Varje element, sändning och plats behöver en identifierare som är densamma i alla system. Identifierarna bygger på GS1-standarderna, som även handelns streckkoder bygger på. Arbetsgruppen fastställer hur identifierarna används i meddelanden och på kollietiketter samt i RFID-taggar och DataMatrix-koder som fästs på elementet.
5. **Händelseinformation.** När ett element blir färdigt, lastas, anländer till byggarbetsplatsen eller monteras uppstår en händelse. Arbetsgruppen fastställer hur händelserna registreras som data och delas med parterna, så att alla vet i vilket skede leveransen är. Händelserna beskrivs enligt GS1:s standard EPCIS.
6. **Kontroll och exempel.** Kontrollregler för meddelandena, testade exempelmeddelanden och en presentationsform som visar det maskinläsbara meddelandet som ett läsbart dokument.

Arbetsgruppen

- fastställer inte vad data betyder eller vilka värden som är tillåtna. Det ansvarar [Standardisering](/tyoryhmat/vakiointi) för.
- bygger inte kopplingar för enskilda företag eller program.
- underhåller inte Peppol-nätverket. Det ansvarar den finska Peppol-myndigheten och den internationella organisationen OpenPeppol för.
- behandlar inte kommersiella villkor, som priser, avtal eller reklamationer.

## Resultat

| Resultat | Vad det är | Var |
|---|---|---|
| Beskrivning av helhetsarkitekturen | Leveranskedjans verksamhet, informationsflöden, ansvar och system från projektering till förvaltning | Publiceringsplattformen |
| Tillämpningsanvisningar för meddelanden | Anvisning om hur Peppol-meddelanden används vid leverans av produkter som tillverkas på beställning | Peppol-myndighetens webbplats, [Peppol](/peppol) |
| Exempelmeddelanden | Testade exempel och deras läsbara presentationsform som stöd för implementerare | GitHub, publiceringsplattformen |
| Tillämpningsanvisning för identifiering | Anvisning om hur GS1-identifierare bildas och fästs på elementet | [Produktidentifiering](/soveltamisohje/interoperabilitet-produktidentifiering) |
| Specifikation av händelseinformation | Vilka händelser som registreras och hur de beskrivs i EPCIS-format | Publiceringsplattformen |
| Pilotrapporter | Iakttagelser från verkliga leveranser | Publiceringsplattformen |

## Verksamhetsprinciper

Arbetsgruppen använder befintliga standarder och skapar inga egna meddelandeformat. Först utreds vilken information nästa skede i processen behöver, och först därefter väljs meddelandet. Utgångspunkten är modeller som redan används i Sverige och övriga Norden, så att leveranser mellan länderna följer samma regler. En anvisning publiceras när meddelanden enligt den har skickats och tagits emot i verkliga företags system.

## Samarbete

- **BETK:s övriga arbetsgrupper:** [Standardisering](/tyoryhmat/vakiointi) fastställer den information som förs i meddelandena, och [Ingjutningsdetaljer](/tyoryhmat/valutarvike) namnen på ingjutningsdetaljer.
- **Den finska Peppol-myndigheten:** publicerar tillämpningsanvisningar för byggbranschen.
- **OpenPeppol och GS1:** förvaltar de internationella standarderna för meddelanden och identifierare.
- **Norden:** svenska BEAst och det nordiska Peppol-forumet för byggbranschen.
- **Andra branscher:** Peppol-arbetet inom installationsteknik, så att byggbranschen har gemensamma rutiner oberoende av material.
- **Programmet för digitalisering av den byggda miljön (RYD) och Rakennustietosäätiö RTS:** branschens färdplan och referensramen för leveranskedjans helhetsarkitektur.

## Delta i verksamheten

Deltagandet är avgiftsfritt och oavlönat, och verksamheten följer konkurrenslagstiftningen. Respons och ändringsförslag kan lämnas som [GitHub-ärenden (issues)](https://github.com/BETK-Finland/betk-publishing/issues) på publiceringsplattformen.

</div>

<div data-sov-lang="en">

## Purpose

The Interface (Rajapinta) working group promotes the development of an enterprise architecture for the industry's supply chain and the automated transfer of data from one company to another: from main contractor to manufacturer, from manufacturer to transport, and from transport to the construction site. The enterprise architecture describes what information is created at each stage of the supply chain, who produces it and to whom it is passed on, and which messages, identifiers and systems are used for the transfer. The aim is that, for example, an order, a despatch advice or a receipt advice moves from one system to another without anyone having to re-enter it, regardless of which system each party uses.

The working group focuses on technical and organisational interoperability: systems can exchange data, and the parties have agreed who sends which message and at which stage. The working group ensures that the information specified by [Standardisation](/tyoryhmat/vakiointi) remains unchanged in transfer.

## Background

Supply chain information still moves mainly as emails, spreadsheets and PDF files. The recipient re-enters it into their own system by hand, and every error is copied forward. Custom integrations between two companies do not solve the problem, because the parties to a construction project change from one project to the next.

The solution needs three things. The first is a common network through which anyone can send and receive data. The second is agreed messages, that is, electronic documents in a standard format. The third is identifiers that state unambiguously which product, delivery or location the data concerns.

Once data is standardised, it can be transferred automatically as messages. BETK uses the Peppol network for message exchange between companies. Peppol was developed in an EU project for electronic public procurement, and it is most widely used for e-invoicing. The network can also carry calls for tenders, catalogues, orders, order responses, despatch advices and receipt advices. The principle is "connect once, connect to all": a company joins the network through one service provider, an access point, and can then exchange messages with everyone on the network without partner-specific integrations. The recipient's address and the message types it can receive are found in the network's address service, and the message structure follows the Peppol specifications (Peppol BIS), which are based on the international UBL standard.

A message suits situations where data is sent to a specific recipient, such as an order or a despatch advice. Some data, such as product data, event data and the EU digital product passport, is better shared for retrieval: the data stays with its producer, and the right to use it is governed by common rules. This model of sharing is called a data space. The enterprise architecture therefore describes both approaches and which data moves which way.

## Scope

The working group specifies how data moves. The work is divided into six parts:

1. **Enterprise architecture.** A description of the supply chain from the viewpoints of JHS 179, the Finnish public administration's enterprise architecture method: business, information, information systems and technology, from design to maintenance. The description also shows which data moves as messages and which is shared for retrieval, and how data exchange meets EU requirements such as the digital product passport and electronic freight transport information (eFTI).
2. **Messages.** Which Peppol message fields are filled in for a precast element delivery, and where in the message construction-specific information, such as loading order or installation location, is placed.
3. **Linking information to the message.** How the properties and product classes specified by Standardisation are carried in the message, and how a message line refers to an element in the information model.
4. **Identifiers.** Every element, shipment and location needs an identifier that is the same in every system. The identifiers are based on GS1 standards, which also underpin retail barcodes. The working group specifies how identifiers are used in messages, on package labels and in RFID tags and DataMatrix codes attached to the element.
5. **Event data.** When an element is completed, loaded, arrives on site or is installed, an event occurs. The working group specifies how events are recorded as data and shared with the parties so that everyone knows what stage the delivery is at. Events are described according to the GS1 EPCIS standard.
6. **Validation and examples.** Validation rules for messages, tested example messages and a presentation format that displays a machine-readable message as a human-readable document.

The working group does not:

- specify what data means or which values are permitted. [Standardisation](/tyoryhmat/vakiointi) is responsible for that.
- build integrations for individual companies or software.
- operate the Peppol network. The Finnish Peppol Authority and the international OpenPeppol association are responsible for it.
- handle commercial terms such as prices, contracts or claims.

## Outputs

| Output | What it is | Where |
|---|---|---|
| Enterprise architecture description | The supply chain's business, information flows, responsibilities and systems from design to maintenance | Publishing platform |
| Message implementation guidelines | Guidance on using Peppol messages for deliveries of engineer-to-order products | Peppol Authority website, [Peppol](/peppol) |
| Example messages | Tested examples and their readable presentation to support implementers | GitHub, publishing platform |
| Identification implementation guideline | Guidance on creating GS1 identifiers and attaching them to the element | [Product identification](/soveltamisohje/upid-aidc-eto-products) |
| Event data specification | Which events are recorded and how they are described in EPCIS format | Publishing platform |
| Pilot reports | Findings from real deliveries | Publishing platform |

## Principles

The working group uses existing standards and does not create its own message formats. It first establishes what information the next stage of the process needs, and only then chooses the message. The starting point is models already in use in Sweden and the other Nordic countries, so that cross-border deliveries follow the same rules. A guideline is published once messages that follow it have been successfully sent and received in real companies' systems.

## Cooperation

- **Other BETK working groups:** [Standardisation](/tyoryhmat/vakiointi) specifies the information carried in messages, and [Cast-in items](/tyoryhmat/valutarvike) the names of cast-in items.
- **Finnish Peppol Authority:** publishes implementation guidelines for the construction industry.
- **OpenPeppol and GS1:** maintain the international standards for messages and identifiers.
- **Nordic countries:** Swedish BEAst and the Nordic construction industry Peppol forum.
- **Other sectors:** Peppol work in building services, so that construction has common practices regardless of material.
- **Built Environment Digitalisation (RYD) programme and Rakennustietosäätiö RTS:** the industry roadmap and the reference framework for supply chain enterprise architecture.

## Get involved

Participation is free of charge and unpaid, and all activities comply with competition law. Feedback and change proposals can be submitted as [GitHub issues](https://github.com/BETK-Finland/betk-publishing/issues) on the publishing platform.

</div>
