---
title: BETK
---
<div data-sov-lang="fi">

## Tehtävä

BETK-kehityskokonaisuus kehittää tiedonkulkua tilauksesta suunniteltavien ja valmistettavien (engineer-to-order, ETO) rakennustuotteiden toimitusketjussa. Tavoitteena on, että tieto siirtyy suunnittelusta valmistukseen, logistiikkaan, työmaalle ja ylläpitoon ilman uudelleenkirjausta tai käsin tehtävää tulkintaa. Kokonaisuutta koordinoi Rakennusteollisuus RT. Ensisijainen sovellusalue ovat betonielementit.

## Tausta

ETO-tuotteiden toimitusketju kootaan jokaiseen hankkeeseen erikseen. Rakennesuunnittelija, rakennusliike, elementtivalmistaja, tarviketoimittajat sekä kuljetus ja asennus käyttävät kukin omia järjestelmiään. Jos yhteisestä tietosisällöstä ja tiedonsiirron tavasta ei ole sovittu, tieto katkeaa jokaisessa osapuolten välisessä rajapinnassa. BETK:n lähtökohta on, että toimitusketjun tiedon perusrakenteet eivät ole yritysten välistä kilpailukenttää. Ne ovat toimialan yhteistä infrastruktuuria.

## Työryhmät

Yhteentoimivuus edellyttää sopimista kahdella tasolla. Ensimmäinen taso koskee sitä, mitä tieto tarkoittaa ja missä muodossa se esitetään. Toinen taso koskee sitä, miten tieto siirretään järjestelmästä toiseen. Työ on jaettu työryhmiin näiden tasojen mukaan.

| Työryhmä | Vetäjä | Yhteentoimivuuden taso | Vastuualue |
|---|---|---|---|
| [Vakiointi](/tyoryhmat/vakiointi) | Antti Pekkala | Semanttinen ja syntaktinen | Tietomallipohjaisen suunnittelutiedon sisällöt: ominaisuudet, sallitut arvot, käsitteet ja tietomallit |
| [Rajapinta](/tyoryhmat/rajapinta) | Tom Partanen | Teknologinen | Tiedonsiirto osapuolten välillä: sanomat, tunnisteet ja tapahtumatieto |
| [Valutarvike](/tyoryhmat/valutarvike) | Eetu Lahtinen | Semanttinen ja syntaktinen (tuotetaso) | Elementteihin valettavien osien nimikkeistö ja tietosisältö |

Työryhmät voivat perustaa rajattuja pienryhmiä. Pienryhmät käsittelevät aiheita, jotka koskevat useampaa työryhmää tai vaativat tiivistä valmistelua.

## Toimintaperiaatteet

- **Standardit ensin.** Ratkaisut perustuvat ensisijaisesti avoimiin kansainvälisiin standardeihin. Esimerkkejä ovat IFC tietomallien siirtoon ohjelmistojen välillä, GS1 tuotteiden yksilöiviin tunnisteisiin ja Peppol yritysten väliseen sähköiseen asiointiin. Uutta standardia ei luoda, jos olemassa olevaa voidaan soveltaa.
- **Soveltamisohjeet.** Soveltamisohjeet kuvaavat, miten standardeja käytetään toimialalla. Ne kertovat, mitä tietoja ETO-tuotteiden toimitusketjussa esitetään ja miten.
- **Pilotointi ennen julkaisua.** Määritykset testataan todellisissa hankkeissa ja järjestelmissä ennen laajempaa käyttöönottoa.
- **Pohjoismainen yhteensopivuus.** Kansallisia erillisratkaisuja vältetään, kun pohjoismaisessa yhteistyössä löytyy yhteinen toimintatapa.
- **Avoimuus.** Määritykset julkaistaan avoimesti kaikkien käyttöön. Kuka tahansa voi toteuttaa ne omassa ohjelmistossaan.

## Tulosten hyväksyminen ja ylläpito

Työryhmät valmistelevat määritykset ja soveltamisohjeet. Työryhmien vetäjät ja projektipäälliköt hyväksyvät ne julkaistaviksi, tarvittaessa ohjausryhmän käsittelyn jälkeen. Julkaisualustalla luonnokset, julkaistut versiot ja arkistoidut versiot pidetään erillään. Julkaistujen määritysten muutokset käsitellään hallitusti ja kirjataan [muutoslokiin](/muutokset). Näin jokaisessa hankkeessa voidaan todeta, mitä versiota on sovellettu.

## Osallistuminen

Toimintaan voivat osallistua rakennusliikkeet, rakennustuote- ja tarviketoimittajat, suunnittelijat, ohjelmisto- ja teknologiatoimittajat, viranomaiset ja tutkimuslaitokset. Osallistuminen on maksutonta, eikä siitä makseta korvausta. Toiminnassa noudatetaan kilpailulainsäädäntöä. Palautetta ja muutosehdotuksia voi antaa julkaisualustan kautta.

</div>

<div data-sov-lang="sv">

## Uppdrag

Utvecklingshelheten BETK utvecklar informationsflödet i leveranskedjan för byggprodukter som konstrueras och tillverkas på beställning (engineer-to-order, ETO). Målet är att information ska flöda från projektering till tillverkning, logistik, byggarbetsplats och förvaltning utan att behöva matas in på nytt eller tolkas manuellt. Helheten koordineras av Byggnadsindustrin RT. Det primära tillämpningsområdet är betongelement.

## Bakgrund

Leveranskedjan för ETO-produkter sätts samman på nytt för varje projekt. Konstruktören, byggföretaget, elementtillverkaren, materialleverantörerna samt transport och montage använder alla sina egna system. Om parterna inte har kommit överens om gemensamt informationsinnehåll och ett gemensamt sätt att överföra information, bryts informationsflödet i varje gränssnitt mellan dem. BETK utgår från att leveranskedjans grundläggande informationsstrukturer inte är en konkurrensarena för enskilda företag. De är branschens gemensamma infrastruktur.

## Arbetsgrupper

Interoperabilitet kräver överenskommelser på två nivåer. Den första nivån gäller vad informationen betyder och i vilken form den presenteras. Den andra nivån gäller hur informationen överförs från ett system till ett annat. Arbetet är fördelat på arbetsgrupper enligt dessa nivåer.

| Arbetsgrupp | Ledare | Interoperabilitetsnivå | Ansvarsområde |
|---|---|---|---|
| [Standardisering (Vakiointi)](/tyoryhmat/vakiointi) | Antti Pekkala | Semantisk och syntaktisk | Informationsinnehållet i modellbaserad projekteringsinformation: egenskaper, tillåtna värden, begrepp och informationsmodeller |
| [Gränssnitt (Rajapinta)](/tyoryhmat/rajapinta) | Tom Partanen | Teknologisk | Informationsöverföring mellan parterna: meddelanden, identifierare och händelseinformation |
| [Ingjutningsdetaljer (Valutarvike)](/tyoryhmat/valutarvike) | Eetu Lahtinen | Semantisk och syntaktisk (produktnivå) | Nomenklatur och informationsinnehåll för detaljer som gjuts in i element |

Arbetsgrupperna kan bilda avgränsade mindre grupper. De mindre grupperna behandlar frågor som berör flera arbetsgrupper eller som kräver intensiv beredning.

## Verksamhetsprinciper

- **Standarder först.** Lösningarna bygger i första hand på öppna internationella standarder. Exempel är IFC för överföring av informationsmodeller mellan program, GS1 för unika produktidentifierare och Peppol för elektronisk handel mellan företag. En ny standard skapas inte om en befintlig kan tillämpas.
- **Tillämpningsanvisningar.** Tillämpningsanvisningarna beskriver hur standarderna används i branschen. De anger vilken information som presenteras i leveranskedjan för ETO-produkter och hur.
- **Pilotering före publicering.** Specifikationerna testas i verkliga projekt och system innan de tas i bredare bruk.
- **Nordisk kompatibilitet.** Separata nationella lösningar undviks när det finns ett gemensamt arbetssätt i det nordiska samarbetet.
- **Öppenhet.** Specifikationerna publiceras öppet för alla att använda. Vem som helst kan implementera dem i sin egen programvara.

## Godkännande och underhåll av resultat

Arbetsgrupperna bereder specifikationer och tillämpningsanvisningar. Arbetsgruppernas ledare och projektledarna godkänner dem för publicering, vid behov efter behandling i styrgruppen. På publiceringsplattformen hålls utkast, publicerade versioner och arkiverade versioner åtskilda. Ändringar i publicerade specifikationer hanteras kontrollerat och förs in i [ändringsloggen](/muutokset). På så sätt kan man i varje projekt fastställa vilken version som har tillämpats.

## Deltagande

Byggföretag, leverantörer av byggprodukter och material, projektörer, program- och teknikleverantörer, myndigheter och forskningsinstitut kan delta i verksamheten. Deltagandet är avgiftsfritt och oavlönat. Verksamheten följer konkurrenslagstiftningen. Respons och ändringsförslag kan lämnas via publiceringsplattformen.

</div>

<div data-sov-lang="en">

## Purpose

The BETK development programme improves the flow of information in the supply chain for engineer-to-order (ETO) construction products. The goal is for information to move from design to manufacturing, logistics, the construction site and maintenance without re-entry or manual interpretation. The programme is coordinated by the Confederation of Finnish Construction Industries RT. Its primary area of application is precast concrete elements.

## Background

The supply chain for ETO products is assembled anew for every project. The structural designer, main contractor, precast manufacturer, component suppliers, transport and installation each use their own systems. When the parties have not agreed on shared information content and a shared way of exchanging it, information breaks down at every interface between them. BETK's starting point is that the basic information structures of the supply chain are not a field for competition between individual companies. They are shared infrastructure for the whole industry.

## Working groups

Interoperability requires agreement at two levels. The first level is what the data means and in what form it is presented. The second level is how the data is transferred from one system to another. The work is divided among working groups according to these levels.

| Working group | Lead | Interoperability level | Scope |
|---|---|---|---|
| [Standardisation (Vakiointi)](/tyoryhmat/vakiointi) | Antti Pekkala | Semantic and syntactic | Content of model-based design information: properties, permitted values, concepts and information models |
| [Interface (Rajapinta)](/tyoryhmat/rajapinta) | Tom Partanen | Technological | Data exchange between parties: messages, identifiers and event data |
| [Cast-in items (Valutarvike)](/tyoryhmat/valutarvike) | Eetu Lahtinen | Semantic and syntactic (product level) | Nomenclature and information content of items cast into precast elements |

The working groups can set up focused subgroups. Subgroups handle topics that concern more than one working group or that require intensive preparation.

## Principles

- **Standards first.** Solutions are based primarily on open international standards. Examples include IFC for exchanging information models between software, GS1 for unique product identifiers and Peppol for electronic business between companies. BETK does not create a new standard where an existing one can be applied.
- **Implementation guidelines.** Implementation guidelines describe how the standards are used in the industry. They specify what information is presented in the ETO supply chain and how.
- **Piloting before publication.** Specifications are tested in real projects and systems before wider adoption.
- **Nordic compatibility.** Separate national solutions are avoided where Nordic cooperation offers a common approach.
- **Openness.** Specifications are published openly for anyone to use. Anyone can implement them in their own software.

## Approval and maintenance of results

The working groups prepare specifications and implementation guidelines. The working group leads and project managers approve them for publication, after review by the steering group where needed. The publishing platform keeps drafts, published versions and archived versions separate. Changes to published specifications go through a controlled process and are recorded in the [changelog](/muutokset). This makes it possible to establish in any project which version was applied.

## Participation

Participation is open to contractors, construction product and component suppliers, designers, software and technology providers, public authorities and research institutions. Participation is free of charge and unpaid. All activities comply with competition law. Feedback and change proposals can be submitted through the publishing platform.

</div>
