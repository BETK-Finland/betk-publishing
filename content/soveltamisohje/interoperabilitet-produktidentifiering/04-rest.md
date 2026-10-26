---
title: ""
order: 4
section: ""
---

**Genomförande av RFID-taggar**

För programmering av RFID-taggar är det bra att kontakta ett eller flera företag som specialiserat sig på identifieringslösningar. Företag som erbjuder identifieringslösningar finns samlade bland annat på GS1:s partnersida och på RFID Lab Finland ry:s webbplats.

### 4.1.1 Användning av RFID-taggsymbolen

När RFID-teknik används för automatisk igenkänning av produkter bör man säkerställa att RFID-taggsymbolen tas med på produktetiketterna och i produktionsritningarna. Symbolen ska följa standarden, vara lätt att känna igen och vara placerad så att den tydligt visar var RFID-taggarna finns och att de används.

###### Tabell 12. Allmän RFID-symbol (ISO 7000-3010).

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="4"><img width="150" alt="RFID-symbol" src="https://github.com/user-attachments/assets/5c9d4d49-e5d6-4bac-a66f-c77a9731fce9"/></td>
            <th>RFID-taggsymbol</th>
        </tr>
        <tr>
            <td>Som RFID-taggsymbol rekommenderas den fritt tillgängliga allmänna RFID-symbolen enligt standarden ISO 7000-3010. Användningen av symbolen ska uppfylla kraven i standarden ISO/IEC 29160:2020, särskilt när symbolen används för att visa var RFID-taggarna är placerade.</td>
        </tr>
        <tr>
            <th>Storlek</th>
        </tr>
        <tr>
            <td>RFID-taggsymbolen (ISO 7000-3010) bör vara minst (5 × 5) mm stor, och en fri zon på 1 mm bör lämnas runt den. När RFID-taggsymbolen återges med låg kontrast ska den vara tillräckligt stor för att lätt kunna kännas igen under normala användningsförhållanden.</td>
        </tr>
    </tbody>
</table>

**Tillämpning i betongelementens användningsmiljö**

RFID-märkningssymbolen ska placeras så att den syns tydligt för dem som försöker hitta eller läsa själva RFID-taggen. Användning av RFID-taggsymbolen rekommenderas i betongelementens produktionsritningar för att visa var RFID-taggarna finns (exempel i bilaga 1). Användningen av en RFID-tagg ska markeras med RFID-taggsymbolen, och den taggtyp som används samt placeringsuppgifterna läggs till i betongelementets produktdelsförteckning.

**Placering av RFID-taggen i den fysiska produkten**

Läsbarheten hos RFID-märkta objekt påverkas av flera faktorer, såsom RFID-chippet, RFID-antennen och inkapslingen (hela RFID-taggen). Dessutom har miljön där RFID-taggen läses en väsentlig inverkan på läsbarheten. En miljö med många metallföremål kan till exempel orsaka oönskade reflektioner av radiovågorna, vilket försvårar avläsningen eller gör att fel objekt läses.

På marknaden finns olika RFID-taggar som lämpar sig för olika användningsändamål. I betongelementens verksamhetsmiljö kan RFID-taggar användas ingjutna i betongelementen, på elementens yta eller som en del av en produktetikett som fästs på betongelementen. När taggen gjuts in i ett betongelement påverkas läsbarheten av materialet runt den, så den valda RFID-taggen ska kunna läsas genom den omgivande betongen från ett tillräckligt djup. En extern produktetikett som skapats med applikator ska innehålla en märkning om att en RFID-tagg används och en precisering av om taggen sitter i själva etiketten eller är ingjuten i elementet. Nyttan med RFID bygger på automatiserade läshändelser och den händelsedata som de genererar. Med en läshändelse avses förenklat att läsaren upptäcker en viss RFID-tagg.

## 4.2 Produktigenkänning med GS1 DataMatrix 2D-kod

GS1 DataMatrix är en tvådimensionell streckkod som utvecklats av GS1 och som kan skrivas ut som en kvadratisk eller rektangulär symbol bestående av enskilda punkter eller kvadrater. GS1 DataMatrix kan innehålla en större mängd data än en traditionell linjär streckkod. Den kan koda upp till 3 116 numeriska tecken eller 2 335 alfanumeriska tecken. Med GS1-applikationsidentifierare kan flera olika typer av uppgifter tas med i GS1 DataMatrix, till exempel de fastställda minimikraven på information för betongelement. För att läsa GS1 DataMatrix krävs en kamerabaserad skanner.

###### Tabell 13. Exempel på en GS1 DataMatrix-kod som innehåller minimikraven på information för betongelement

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="7"><img width="136" height="136" alt="GS1 DataMatrix-exempel" src="https://github.com/user-attachments/assets/c016151a-3fe8-458d-af28-9d74ecbf8f5b" /></td>
            <th colspan="2">Exemplets datainnehåll</th>
        </tr>
        <tr>
            <td><b>GS1-applikationsidentifierare (AI)</b></td>
            <td><b>Värde (exempel)</b></td>
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
            <td>(91) = Internal (elementbeteckning)</td>
            <td><code>V1001</code></td>
        </tr>
        <tr>
            <td>(92) = Internal (GUID)</td>
            <td><code>ba34cf17-0c4b-4c6f-9295-cae05aa74ad4</code></td>
        </tr>
    </tbody>
</table>

**GS1 DataMatrix-kodens storlek och kvalitet**

Streckkodens fysiska storlek varierar med den mängd data den innehåller. Streckkodens upplösning (X-dimension) ska vara minst 0,38 mm och högst 0,45 mm. Kvaliteten på de GS1 2D-streckkoder som används i märkningen ska uppfylla kraven i standarden ISO / IEC 15415. På så sätt kan man säkerställa att de är läsbara.

För utskrift av märkningarna är det bra att kontakta ett eller flera företag som specialiserat sig på identifieringslösningar. Företag som erbjuder identifieringslösningar finns samlade bland annat på GS1:s partnersida.

## 4.3 Produktigenkänning med QR-kod enligt standarden GS1 Digital Link

Om man utöver identifiering och igenkänning vill kommunicera med konsumenten/användaren via en smarttelefon eller motsvarande enhet kan en QR-kod enligt standarden GS1 Digital Link användas. Den skiljer sig från en vanlig QR-kod genom att dess datainnehåll är fastställt av GS1-standarden. Standarden säkerställer att koderna och deras data har en enhetlig struktur och därmed kan flyttas mellan olika system och aktörer samt läsas och tolkas med streckkodsläsare.

En QR-kod som innehåller en GS1 Digital Link URI har två användningsändamål:

> **1. Identifiering och igenkänning av produkten offline**
> Den kan användas utan nätverksanslutning för att identifiera och känna igen produkten med streckkodsläsare, precis som traditionella EAN-streckkoder. För identifieringen av produkten används det GTIN-nummer enligt GS1-standarden som tas med i QR-koden samt nödvändiga tilläggsuppgifter, såsom MTO-variantnummer och serienummer.

> **2. Innehåll som delas på nätet**
> Den kan användas som vilken QR-kod som helst, det vill säga för att leda användaren av en smarttelefon eller motsvarande enhet till innehåll på nätet. Olika applikationer kan genom avläsning av samma QR-kod även utföra andra funktioner och visa olika innehåll.

I en GS1 Digital Link URI används GS1-applikationsidentifierare för att ta med uppgifterna. I exemplet nedan har en GS1 Digital Link URI som innehåller de minimikrav på information som visas i tabellen bildats.

###### Tabell 14. Exemplets QR-kod innehåller uppgifterna i tabellen i formatet GS1 Digital Link URI: https://id.rt.fi/03/06400001000247/242/123456/21/12345678910

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="5"><img width="164" height="164" alt="Exempel på GS1 Digital Link QR-kod" src="https://github.com/user-attachments/assets/8203ce02-3c66-4b2c-b405-3cde32e4f885" /></td>
            <th colspan="2">Exemplets datainnehåll</th>
        </tr>
        <tr>
            <td><b>GS1-applikationsidentifierare (AI)</b></td>
            <td><b>Värde (exempel)</b></td>
        </tr>
        <tr>
            <td>(03) = MTO GTIN-nummer</td>
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

**Exempel på användningsändamål och rekommendationer för GS1 Digital Link QR-koder**

Exemplet är endast avsett att visa datainnehållets struktur. Det använder det fiktiva domännamnet id.rt.fi, så exempelkoden leder inte till något innehåll när den läses med en smarttelefonkamera.

Som utgångspunkt rekommenderas att den GS1 Digital Link URI som tas med i QR-koden inte ska vara URL-adressen till någon faktisk webbsida. Från denna adress rekommenderas en omdirigering till det innehåll som ska visas via koden.

I en GS1 Digital Link URI kan vilket domännamn som helst användas, eftersom det inte påverkar identifieringen och igenkänningen av produkten. Domännamnet avgör vart personen som skannar QR-koden leds på nätet. Det är därför möjligt att använda en tjänsteleverantörs domännamn i koden, men det är bra att vara medveten om att detta kan leda till så kallad inlåsning hos leverantören (vendor lock-in), där ett byte av tjänsteleverantör innebär en ändring av domännamnet och därmed även byte av de koder som tryckts på produkterna. Därför rekommenderas att företagets eget domännamn används i koden.

**Rekommenderat tillvägagångssätt: Användning av en underdomän för produktigenkänning**

Det rekommenderade tillvägagångssättet är att i QR-koden enligt standarden GS1 Digital Link använda en underdomän som skapas under det egentliga domännamnet och reserveras för produktidentifiering. En underdomän (subdomän) är en del som är fristående från det egentliga domännamnet och som används vid sidan av det för ett visst ändamål. Användning av en underdomän i QR-koden gör att URL-adresserna som används för produktidentifiering förblir beständiga och oberoende av strukturen på de egentliga webbsidorna.

**Exempel på användning av underdomän**

Underdomänen kan skapas utifrån antingen företagets domännamn eller domännamnen för dess olika varumärken.

Till exempel: `yritys-x.fi` → `id.yritys-x.fi` eller `brand-x.fi` → `id.brand-x.fi`

Ju kortare GS1 Digital Link URI:n är, desto mindre utrymme behöver QR-koden som innehåller den.

Användningen av standarden GS1 Digital Link beskrivs närmare i följande GS1-standarder:
- https://ref.gs1.org/standards/digital-link/uri-syntax/
- https://ref.gs1.org/standards/resolver/
