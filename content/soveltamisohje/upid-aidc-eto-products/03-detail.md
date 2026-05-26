---
title: ""
order: 3
section: ""
---

## 3.4 Identification of product variations

In the identification of variations in precast concrete elements, a variation number (Made-to-Order variation number) is combined with the GTIN code as an additional identifier. The variation number allows for identifying elements that are identical to one another. In other words, when multiple elements with the same technical specifications are manufactured at once, they all share the same combination of GTIN code and variation number.

In barcodes and RFID tags, the Application Identifier `(242)` is used to express the variation number. According to the GS1 standard, the variation number is numeric, variable in length, and up to six digits long.

###### Table 4. Structure of the MTO Variation Number

| GS1 Application Identifier (AI) | Made-to-Order variation number |
|---------------------------------|--------------------------------|
| (242)                           | N1 — variable length — N6      |

## 3.5 Serial number

By combining a GTIN code (or a combination of a GTIN code and a variation number) with serial numbering, it is possible to uniquely identify and distinguish identical elements from one another. The GS1 Application Identifier `(21)` indicates that the data field contains the serial number. According to the GS1 standard, the serial number is alphanumeric and up to 20 characters long.

> **Note!** The selected RFID tag may impose restrictions on the length of the serial number and the use of alphabetic characters, so it is advisable to verify these limitations with the RFID solution provider.

###### Table 5. Structure of the Serial number

| GS1 Application Identifier (AI) | Serial number                  |
|---------------------------------|--------------------------------|
| (21)                            | X1 — variable length — X20     |

## 3.6 National element classification number

Manufacturers' Unique Product Identification (UPID) designated for a precast concrete element, which is easily readable by humans and may include information such as the element type or installation level. The national element classification number does not need to be globally unique.

###### Table 6. National element classification number structure

| GS1 Application Identifier (AI) | National element classification number |
|---------------------------------|----------------------------------------|
| (91)                            | X1 — variable length — X20             |

## 3.7 GUID

Globally Unique Identifier (GUID), also known as Universally Unique Identifier (UUID), is a globally unique alphanumeric code combination that can be assigned by modeling software or other means to ensure uniqueness.

###### Table 7. GUID code structure

| GS1 Application Identifier (AI) | GUID                                 |
|---------------------------------|--------------------------------------|
| (92)                            | xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx |

## 3.8 Domain Name

By combining a Domain Name with other identification information, additional details about a specific product can be retrieved over the internet using a URL, provided the information supplier has implemented this feature and continues to maintain its availability.

###### Table 8. Structure of a Domain Name. Note: In optical recognition (e.g., QR codes), the inclusion of this information follows the procedure outlined in the GS1 Digital Link URI Syntax 1.5.0 standard.

| GS1 Application Identifier (AI) | Domain Name                                                                        |
|---------------------------------|------------------------------------------------------------------------------------|
| (99)                            | &lt;subdomain.&gt;&lt;domain.toplevel-domain&gt;, where &lt;subdomain.&gt; appears 0…n times |

This document defines two methods for combining a Domain Name with other identification information to form a URL. The resulting URL conforms to the GS1 Digital Link standard or the IEC 61406 standard.

### 3.8.1 Generating a GS1 Digital Link URL

**GS1 Digital Link** is a GS1 standard for automatic identification and data capture (AIDC) that specifies how a domain name can be used to assign a URL to a product. However, GS1 has not yet defined how a domain name can be written into an RFID tag to specify GS1 Digital Link at an individual level. (This specification is under development at GS1, but for now, BETK follows its own method.)

According to the BETK application guideline, GS1 Digital Link is formed as follows:

**Identification Level 1:** `https://<Domain Name>/03/<MTO GTIN>`

**Identification Level 2:** `https://<Domain Name>/03/<MTO GTIN>/242/<MTO variant number>`

**Identification Level 3:** `https://<Domain Name>/03/<MTO GTIN>/242/<MTO variant number>/21/<serial number>`

**Level 3 without a variant number:** `https://<Domain Name>/03/<MTO GTIN>/21/<serial number>`

Example: `https://id.rt.fi/03/06400001000247/21/12345678910`

More details about the GS1 Digital Link standard can be found in Section 4.3 of this guideline.

### 3.8.2 Generation of the IEC 61406 Identification Link URL

Additionally, a URL based on a GUID identifier can be defined in accordance with the IEC 61406 Identification Link standard as follows:

`https://<Domain Name>/<GUID>`

Example: `https://id.rt.fi/ba34cf17-0c4b-4c6f-9295-cae05aa74ad4`
