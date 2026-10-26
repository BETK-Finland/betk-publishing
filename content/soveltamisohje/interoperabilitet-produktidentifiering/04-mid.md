---
title: ""
order: 4
section: ""
---

**Exempel på datainnehåll i en EPC / Gen2 RFID-tagg:**

RFID Tag EPC Memory Bank Contents (hexadecimal): `301586A004000602DFDC1C3E`

EPC Tag URI: `urn:epc:tag:sgtin-96:0.6400001.000024.12345678910`

**Datastrukturens delar**

**1. URN-prefix**
Värde: `urn:epc:id`
Beskrivning: Anger att identifieraren följer EPC URI-standarden. Detta prefix är en del av ramverket Uniform Resource Identifier (URI).

**2. EPC-schema**
Värde: `sgtin-96`
Beskrivning: Anger kodningssättet och typen av GS1-identifieringsnyckel. I detta fall är det fråga om ett Serialized Global Trade Item Number (SGTIN) som är binärkodat med 96 bitar.

**3. Filtervärde**
Värde: `0`
Beskrivning: Anger filterinställningen. Värdet 0 innebär att produkten inte har filtrerats utifrån skanning vid försäljningsstället, vilket tyder på allmän användning.

**4. GS1-företagsprefix**
Värde: `6400001`
Beskrivning: Identifierar det företag som har gett ut produkten. Detta är en globalt unik identifierare som tilldelats av GS1.

**5. Indikatorsiffra och artikelreferens**
Värde: `000024`
Beskrivning: Kombinerar indikatorsiffran och produktnumret.

**6. Serienummer**
Värde: `12345678910`
Beskrivning: Identifierar varje enskild instans av produkten. Detta möjliggör spårning per produkt.

> **Partitionsparameter**
> Anger var skiljetecknet `( . )` placeras mellan GS1-företagsprefixet och produktnumret. Partitionsparametern beror på GS1-företagsprefixets längd. Det sista skiljetecknet `( . )` i URI:n skiljer GTIN-numret (Global Trade Item Number) från serienumret.

> **Kontrollsiffra**
> Används för felkontroll i GTIN-nummer. Kontrollsiffran tas dock inte med i EPC-koden i RFID-taggen, eftersom den inte behövs vid RFID-behandling.

**Användarminne**

Övrig tilläggsinformation placeras i RFID-chippets användarminne (User memory) på följande sätt:
