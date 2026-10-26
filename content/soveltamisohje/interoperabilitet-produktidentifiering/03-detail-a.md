---
title: ""
order: 3
section: ""
---

## 3.1 Användning av GS1-applikationsidentifierare för identifiering av ETO-produkter

GS1-applikationsidentifierare (AI = Application Identifiers) är numeriska prefix som används i streckkoder och EPC/RFID-taggar för att ange dataelementens betydelse och format. Med GS1-applikationsidentifierare kan olika dataelement särskiljas från varandra i streckkoder eller i en EPC/RFID-tagg. GS1-standarden omfattar över 100 applikationsidentifierare. En förteckning över alla GS1-applikationsidentifierare finns på GS1:s webbplats: https://ref.gs1.org/ai/

Följande GS1-applikationsidentifierare har identifierats som nödvändiga för minimikraven på information vid identifiering av betongelement: `(03) MTO GTIN`, `(242) Made-to-Order variation number` och `(21) Serial number`.

GS1-standarden har ingen egen applikationsidentifierare för den nationella elementbeteckningen, GUID eller domännamn. I BETK-projektet har man därför beslutat att använda applikationsidentifierarna `(91) Company internal information`, `(92) Company internal information` och `(99) Company internal information` för att ta med dem i databäraren.

> **Obs!** Hanteringen av domännamn i RFID-taggar behandlas vid tidpunkten för publiceringen av denna anvisning i GS1:s internationella standardutveckling. Den kommande standarden motsvarar inte nödvändigtvis lösningen som presenteras här, men anvisningen kommer att uppdateras i enlighet med standarden när den blir klar.

## 3.2 GS1-företagsprefix

GS1-företagsprefixet (GS1 Company Prefix) är en unik nummerserie som GS1-organisationen tilldelar företag över hela världen. GS1-företagsprefixet används i många standardiserade identifieringsmetoder, såsom streckkoder och RFID-taggar, och det är grunden för att bilda GTIN-, GLN- och SSCC-nummer.

I Finland tilldelas GS1-företagsprefix av GS1 Finland, och ett sådant kan beställas i GS1 Finlands webbutik.

## 3.3 Uppbyggnad av GTIN-numret

GTIN-numret börjar med GS1-företagsprefixet, som kan vara 7–11 siffror långt. De därpå följande 1–6 siffrorna kan företaget bestämma själv, och här rekommenderas löpande numrering. Numrets sista, det vill säga 13:e, siffra är en kontrollsiffra som beräknas utifrån de 12 första siffrorna med Modulo 10-algoritmen.
