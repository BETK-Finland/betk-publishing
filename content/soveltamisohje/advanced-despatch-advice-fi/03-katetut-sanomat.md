---
title: "Katetut sanomamääritykset (BIS)"
order: 3
section: "3"
draft: true
---

Tämä soveltamisohje kattaa Peppol Logistics **Advanced Despatch Advice** **T120**-sanomamäärityksen. 

Sanomalla ilmoitetaan vastaanottajalle tulevasta tai toteutuneesta toimituksesta. Advanced despatch advicellä on kaksi profiilia peppolissa. Advanced despatch advice only ei vaadi vastaanottosanomaa.

`cbc:DespatchAdviceTypeCode` `1` = ilmoitus lähetettävistä elementeistä (tai tavaroista)

`cbc:DespatchAdviceTypeCode` `2` = ilmoitus lähetetyistä elementeistä (tai tavaroista)

Lähettäjälle ilmoitetaan sanoman ja tavaroiden saapumissesta. Vastaus-sanomalla **Receipt Advice T128** 

`cbc:ReceiptAdviceTypeCode` `D` = Vastaus, että sanoma on vastaanotettu. Ei ole riippuvainen Advanced despatch advice sanoman tyypistä.

`cbc:ReceiptAdviceTypeCode` `S` = Kun tavarat on vastaanotettu ja tarkastettu. Sanoman voi lähettää useaan otteeseen.

> **TODO:** Lisää prosessikaavio lähettäjän, Peppol-verkoston ja työmaan rooleista.
