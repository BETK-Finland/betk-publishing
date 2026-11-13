---
title: "Automatisk igenkänning och databärare"
order: 4
section: "4"
---

Utöver produktidentifieringen måste man välja den igenkänningsteknik och den databärare som möjliggör maskinell avläsning. Vid valet av igenkänningsteknik ska man beakta de krav som användningsändamålet och förhållandena ställer. I GS1-databärare avsedda för automatisk identifiering och datainsamling kan olika mängder data lagras för olika affärsprocesser och handelns krav. Data som kodats i GS1-databärare identifierar inte bara produkter entydigt på alla hierarkinivåer i produktidentifieringen, utan ger också tillgång till produktdata och synlighet i produkternas förflyttningar i leveranskedjan.

För att förmedla minimikraven på information för igenkänning av betongelement rekommenderar tillämpningsanvisningen att åtminstone en 2D-kod som bygger på optisk igenkänning läggs till på elementets produktetikett vid tillverkningen. I GS1-standarden är alternativen för detta GS1 DataMatrix-koden och QR-koden med datainnehåll enligt standarden GS1 Digital Link. Vid sidan av 2D-koden på elementets produktetikett kan även en maskinläsbar databärare som bygger på RFID-teknik användas, antingen på elementets produktetikett eller ingjuten i betongelementet.

<img width="600" alt="Maskinell produktigenkänning med GS1-databärare" src="https://github.com/user-attachments/assets/f1e26ff8-63e8-48e5-8808-ce45a36583b8" />

###### Bild 2. Maskinell produktigenkänning med GS1-databärare

Vid automatisk igenkänning av betongelement har en passiv fjärravläsbar tagg enligt standarden EPC/RFID Gen-2 UHF visat sig vara den effektivaste databäraren. Elementets identifieringsnummer kan läsas effektivt från den även på flera meters avstånd utan direkt siktlinje till själva taggen.

## 4.1 Produktigenkänning med passiv EPC/RFID Gen2 UHF-tagg

Denna anvisning bygger på radioprotokollet EPC / RFID Gen2, som definierar den fysiska dataöverföringen mellan RFID-chippet och RFID-läsaren med kommandon för att styra RFID-läsaren i förhållande till RFID-taggarna. EPC / RFID Gen2 är en ISO-standard och omfattar olika funktioner, såsom skydd och utökat användarminne.

GS1 har publicerat TDS (Tag Data Standard), som definierar hur identifieringsnycklar enligt GS1-standarden, såsom SGTIN, tas med i fjärravläsbara EPC Gen2 RFID-taggar. TDS-standarden är öppet tillgänglig för alla och används redan i dag allmänt för RFID-igenkänning inom olika branscher.

De uppgifter som krävs för produktigenkänning tas med i EPC Gen2 RFID-taggarna enligt TDS-standarden med hjälp av de GS1-applikationsidentifierare som behövs. För kodningen av uppgifterna används taggens EPC-minne (EPC memory) och vid behov användarminnet (User memory).

EPC-minnet är avsett att innehålla EPC-koden, det vill säga det identifieringsnummer enligt GS1-standarden som unikt identifierar det objekt som ska kännas igen. Vid identifiering av betongelement kodas elementets SGTIN i EPC-minnet. Detta möjliggör snabb avläsning av elementets unika identifieringsnummer.

Användarminnet används när RFID-taggen behöver innehålla mer information än vad som ryms i EPC-minnet. I BETK-projektet har man identifierat att det finns behov av att lägga till ytterligare information i taggen, såsom variantnummer (Made-to-Order Variation Number), den elementbeteckning som används vid klassificering av element och den GUID-identifierare som skapats av projekteringsprogrammet.
