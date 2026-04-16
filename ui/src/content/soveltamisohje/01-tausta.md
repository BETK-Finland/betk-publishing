---
title: "Tausta"
order: 1
section: "1"
---

TÄMÄ ON MUUTOS.Tällä hetkellä rakennushankkeen tietomallit ovat yleinen osa hankkeen tarjouspyyntöjä ja niiden määrä- ja kustannuslaskentaa. Suunnittelijoiden tekemiä tietomalleja käyttävät rakennusliikkeet ja elementtitoimittajat mm. määrä- ja tarjouslaskennassa, hankkeen toteutuksen suunnittelussa ja aikatauluttamisessa jne. [BEC2012-hankkeessa](https://www.elementtisuunnittelu.fi/suunnitteluprosessi/mallintava-suunnittelu) luodut vakioidut tietokentät, mallinnusohje ja mallinnustyökalut ovat alalla yleisesti käytössä. BEC-ohjeistus ei kuitenkaan mahdollista koneluettavaa tiedonsiirtoa, koska usea asia on BEC-ohjeistuksessa määritetty hankekohtaisesti sovittavaksi eikä tietokentille ole ohjeistettu sallittuja arvoja. Tiedot ovat saatavissa tietomalleista mutta edellyttää ihmisen taitoa lukea tietomallia ja samalla myös muita hankkeen suunnitelmadokumentteja. Esimerkkinä tällaisesta käyttötapauksesta on esim. kuinka tunnistetaan tiililaattapintaiset SW-elementit hankkeen tietomallista ja voidaan erotella tietomallin muista elementeistä. Usein hankkeissa käytetään hankekohtaisesti sovittuna elementtityyppitunnuksessa myös pintakäsittelyä tai sijaintia tarkentavia numero- tai kirjainyhdistelyitä, kuten esim. `V1-A`. Nämä johtavat siihen, että elementtityyppejä ei voida tunnistaa koneluettavasti hankkeesta toiseen. Tällä hetkellä tunnistaminen ei onnistu automaattisesti. Soveltamisohjeessa kuvattu ratkaisu elementtityyppien tunnistamiseen pohjautuu alalla yleisesti käytettyihin [elementtityyppitunnuksiin](https://www.elementtisuunnittelu.fi/runkorakenteet/elementtitunnukset), esim. `V`, `R` ja `S` jne. Näitä tietoja täydennetään mm. vakioiduilla pintakäsittely tiedoilla.

IFC-tietomallistandardissa rakenneosien tunnistamiseksi objekteille voidaan määrittää IFC-luokkia, kuten esimerkiksi *ifcwall*. Useilla IFC-luokilla on lisäksi *PredefinedType*-ominaisuus, joka tarkentaa luokan tyyppiä. Esimerkiksi *ifcwall*-luokka voi sisältää *PredefinedType*-arvoja, kuten `ELEMENTEDWALL` tai `SOLIDWALL`. Standardissa määriteltyjen luokitteluiden tarkkuustaso riittää karkeaan luokitteluun, mutta ei mahdollista riittävän tarkkaa tunnistamista määrä- ja kustannuslaskentaa varten. Tämän vuoksi tarvitaan lisäattribuutteja, jotta tietomallin avulla saavutetaan vaadittava tarkkuustaso. Ohjeessa kuvattu ratkaisusta on tehty myös esimerkki malli Tekla Structures-ohjelmassa ja mallista IFC-tiedosto, eli ratkaisu on myös toteuttamiskelpoinen nykyisillä ohjelmistoilla.

Tämä soveltamisohje on tehty osana Rakennusteollisuus RT:n tuotetiedon ja toimitusketjun digitalisoinnin kehityshanketta, BETK-työryhmän toimesta. Kehityshankkeen ensisijainen tavoite on edistää rakennusalan tuotteiden toimitusketjun hallinnan menetelmien siirtymistä manuaalisesta ja rakenteettomasta tiedonvaihdosta täysin rakenteelliseen ja koneluettavaan tiedonvaihtoon. Asiakirja on jatkuvasti päivittyvä ja sitä kehitetään edelleen Rakennusteollisuus RT:n kehityshankkeen havaintojen perusteella. Tätä ohjetta täydentävät muut BETK-hankkeen julkaisut:

- BETK Soveltamisohje: Tuoteyksilöinti ja -tunnistaminen
- Excel-taulukko muuttujista
- Esimerkki malli IFC-muodossa
- Soveltamisohje GS1 EPCIS (tapahtumatieto) käytöstä [syksyllä tehdään]
- Keskustelupaperi sijaintitiedoista rakennushankkeessa
- Huomioita sijaintiedosta betonielementtien toimitusketjussa
