---
title: ""
order: 3
section: ""
---

> **Obs!** Den längsta versionen av GTIN-numret är 14 tecken lång, och kortare GTIN-nummer fylls ut till 14 tecken med nollor framför numret. Ett GTIN-nummer kan inte vara längre än så.

## 3.4 Identifiering av varianter

Vid identifiering av betongelementvarianter kombineras GTIN-numret med ett variantnummer (Made-to-Order variation number) som tilläggsidentifierare. Variantnumret gör det möjligt att veta att vissa element är likadana. Med andra ord: när många element med samma tekniska data tillverkas på en gång har de alla samma kombination av GTIN-nummer och variantnummer.

I streckkoder och RFID-taggar används applikationsidentifieraren `(242)` för att ange variantnumret. Enligt GS1-standarden är variantnumret numeriskt och har variabel längd, högst sex siffror.

###### Tabell 4. Uppbyggnad av MTO-variantnumret

| GS1-applikationsidentifierare | Made-to-Order variation number |
|-------------------------------|--------------------------------|
| (242)                         | N1 — variabel längd — N6       |

## 3.5 Serienumrering

Genom att kombinera GTIN-numret (eller kombinationen av GTIN-nummer och variantnummer) med serienumrering kan sinsemellan identiska element identifieras och särskiljas. GS1-applikationsidentifieraren `(21)` anger att datafältet innehåller ett serienummer. Enligt GS1-standarden är serienumret alfanumeriskt och högst 20 tecken långt.

> **Obs!** Den valda RFID-taggen kan begränsa serienumrets längd och användningen av bokstäver, så det är bra att kontrollera detta med leverantören av RFID-lösningen.

###### Tabell 5. Uppbyggnad av serienumret

| GS1-applikationsidentifierare | Serial number                  |
|-------------------------------|--------------------------------|
| (21)                          | X1 — variabel längd — X20      |

## 3.6 Elementbeteckning

En beteckning som tilldelats elementet, som är lätt för människor att läsa och kan innehålla information om till exempel elementets typ eller monteringsvåning. Elementbeteckningen behöver inte vara globalt unik.

###### Tabell 6. Uppbyggnad av elementbeteckningen

| GS1-applikationsidentifierare | Elementbeteckning              |
|-------------------------------|--------------------------------|
| (91)                          | X1 — variabel längd — X20      |

## 3.7 GUID

GUID, även kallad UUID, är en globalt unik identifierare som kan tilldelas av modelleringsprogrammet eller på annat sätt som säkerställer unikhet.

###### Tabell 7. Uppbyggnad av GUID

| GS1-applikationsidentifierare | GUID                                 |
|-------------------------------|--------------------------------------|
| (92)                          | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## 3.8 Domännamn

Genom att kombinera domännamnet med andra identifieringsuppgifter kan ytterligare information om den identifierade produkten hämtas via internet med hjälp av en URL-adress, förutsatt att informationsleverantören har genomfört funktionen och fortsätter att hålla den i drift.

###### Tabell 8. Uppbyggnad av domännamnet

| GS1-applikationsidentifierare | Domännamn                                                                          |
|-------------------------------|------------------------------------------------------------------------------------|
| (99)                          | &lt;underdomän.&gt;&lt;domän.toppdomän&gt;, där &lt;underdomän.&gt; upprepas 0…n gånger |

> **Obs!** Vid optisk igenkänning (t.ex. QR-kod) tas denna uppgift med enligt förfarandet i standarden GS1 Digital Link URI syntax 1.5.0.

I detta dokument definieras två sätt att kombinera domännamnet med andra identifieringsuppgifter för att bilda en URL-adress. Resultatet är en URL-adress enligt standarden GS1 Digital Link eller standarden IEC 61406.

### 3.8.1 Bildande av en GS1 Digital Link-URL

Enligt BETK:s tillämpningsanvisning bildas GS1 Digital Link enligt följande:

**Identifieringsnivå 1:** `https://<domännamn>/03/<MTO GTIN>`

**Identifieringsnivå 2:** `https://<domännamn>/03/<MTO GTIN>/242/<MTO-variantnummer>`

**Identifieringsnivå 3:** `https://<domännamn>/03/<MTO GTIN>/242/<MTO-variantnummer>/21/<serienummer>`

**Nivå 3 när inget variantnummer har angetts:** `https://<domännamn>/03/<MTO GTIN>/21/<serienummer>`

Exempel: `https://id.rt.fi/03/06400001000247/21/12345678910`

### 3.8.2 Bildande av en URL i formatet IEC 61406 Identification Link

En URL-adress enligt standarden IEC 61406 Identification Link som bygger på GUID-identifieraren bildas enligt följande:

`https://<domännamn>/<GUID>`

Exempel: `https://id.rt.fi/ba34cf17-0c4b-4c6f-9295-cae05aa74ad4`
