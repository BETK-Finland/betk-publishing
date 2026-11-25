---
title: Katetut sanomamääritykset (BIS)
order: 3
section: "3"
draft: false
---
Tämä soveltamisohje kattaa Peppol Logistics **Advanced Despatch Advice** **T120**-sanomamäärityksen, sekä vastaussanoman **Receipt Advice T128**.

Sanomalla ilmoitetaan vastaanottajalle tulevasta tai toteutuneesta toimituksesta. Advanced despatch advicellä on kaksi profiilia peppolissa. Advanced despatch advice only ei vaadi vastaanottosanomaa.

`cbc:DespatchAdviceTypeCode` `1` = ilmoitus lähetettävistä elementeistä (tai tavaroista)

`cbc:DespatchAdviceTypeCode` `2` = ilmoitus lähetetyistä elementeistä (tai tavaroista)

Lähettäjälle ilmoitetaan sanoman ja tavaroiden saapumissesta. Vastaus-sanomalla **Receipt Advice T128** 

`cbc:ReceiptAdviceTypeCode` `D` = Vastaus, että sanoma on vastaanotettu. Ei ole riippuvainen Advanced despatch advice sanoman tyypistä.

`cbc:ReceiptAdviceTypeCode` `S` = Kun tavarat on vastaanotettu ja tarkastettu. Sanoman voi lähettää useaan otteeseen.

<div class="bpmn-container" data-bpmn="03-prosessi.bpmn" role="img" aria-label="Prosessikaavio: Lähettäjä, Kuljetusliike ja Vastaanottaja / Työmaa (T120 ja T128)"></div>
