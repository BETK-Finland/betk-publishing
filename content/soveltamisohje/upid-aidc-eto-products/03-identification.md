---
title: "SGTIN product identification of construction products"
order: 3
section: "3"
---

Unique Product Identification (UPID) is a prerequisite for the digitalization of the supply chain, regardless of the manufacturing logic of the products. For precast concrete elements, product identification has been designed to scale by leveraging an open, product-group-independent, and international standard. The GTIN code, compliant with GS1 standards, is a widely used solution for product identification across various industries. Its application was selected as the foundation for identifying Engineer-To-Order (ETO) products, such as precast concrete elements, within this project.

Traditionally, GTIN codes have been used to identify Make-To-Stock (MTS) products, where all identical items are assigned the same GTIN. By combining a GTIN code with a serial number, a unique identifier is created that allows identical products to be distinguished from one another. This combination is known as the SGTIN (Serialized Global Trade Item Number).

Precast concrete elements are inherently Make-To-Order (MTO) and Engineer-To-Order (ETO) products, meaning their identification using GTIN codes differs fundamentally from that of Make-To-Stock (MTS) products. While it is possible to assign a unique GTIN code to each individual precast element, the BETK working group has opted to use the GS1 standard with a three-level identification model (as shown in Figure 1). In this model the GTIN code identifies a specific base product type from a specific manufacturer. The Made-To-Order (MTO) variant number distinguishes a particular variant of the base product. The serial number uniquely identifies identical units of the same variant.

Thus, a GTIN alone does not uniquely identify a specific product but rather represents a general category of possible product variations that may be manufactured based on the order.

<img width="600" alt="Hierarchical levels of product identification" src="https://github.com/user-attachments/assets/1ba4cb85-e65f-4708-8440-5bc8bcf5e26a" />

###### Figure 1. Hierarchical levels of product identification for more precise identification

## 3.1 Using GS1 application identifiers to identify ETO products

GS1 Application Identifiers (AI) are numeric prefixes used in barcodes and EPC/RFID tags to define the meaning and format of data elements. The use of AIs enables the differentiation of various data elements within barcodes or EPC/RFID tags. The GS1 standard includes over 100 application identifiers. A comprehensive list of all GS1 Application Identifiers is available on the GS1 website: https://ref.gs1.org/ai/

The following GS1 Application Identifiers (AIs) have been identified as necessary to meet the minimum data requirements for the identification of precast concrete elements:

- `(03) MTO GTIN` — Global Trade Item Number – identifies the base product type.
- `(242) Made-to-Order Variation Number` — Distinguishes a specific variant of the base product.
- `(21) Serial Number` — Uniquely identifies individual units of the same variant.

The GS1 standard does not currently provide specific GS1 Application Identifiers (AIs) for the National Element Classification number, GUID, or Domain Name. Therefore, the BETK project has decided to use the following application identifiers for including this data in information carriers:

- `(91) Company Internal Information`
- `(92) Company Internal Information`
- `(99) Company Internal Information`

GS1 AIs starting with the digit 9 are reserved for company-specific or internal use and should only be applied when there is no official GS1 Application Identifier defined for the particular data element. This approach ensures flexibility while adhering to GS1 standards for data structuring.

> **Note!** At the time of this guideline's publication, the handling of domain names in RFID tags is under review within GS1's international standard development process. The forthcoming standard may differ from the solution presented here, and this guidance will be updated accordingly once the standard is finalized.

> **Note!** For optical recognition (e.g., QR codes), the inclusion of this information follows the procedure outlined in the GS1 Digital Link URI Syntax 1.5.0 standard.

###### Table 1. Minimum data requirements to be included in the information carrier (2D DataMatrix Barcode or EPC/RFID Tag)

| GS1 Application Identifier (AI)      | Example                            |
|--------------------------------------|------------------------------------|
| (03) MTO GTIN                        | `06400001000247`                   |
| (242) Made-To-Order variation number | `123456`                           |
| (21) Serial number                   | `12345678910`                      |

###### Table 2. Optional identification data to be included in the data carrier. Note: for optical recognition (e.g., QR codes), the domain name follows the GS1 Digital Link URI Syntax 1.5.0 standard.

| GS1 Application Identifier (AI) | Definition                        | Example                                     |
|----------------------------------|-----------------------------------|---------------------------------------------|
| (91)                             | National element classification   | `V1001`                                     |
| (92)                             | GUID                              | `ba34cf17-0c4b-4c6f-9295-cae05aa74ad4`      |
| (99)                             | Domain Name                       | `id.rt.fi`                                  |

## 3.2 GS1 Company Prefix

The GS1 Company Prefix is a unique numeric sequence assigned to companies globally by the GS1 organization. This prefix is specific to each company and cannot be used by any other entity or for generating other numeric sequences. The GS1 Company Prefix is utilized in many standardized identification methods, such as barcodes and RFID tags, and serves as the basis for creating GTIN, GLN, and SSCC codes.

In Finland, GS1 Company Prefixes are issued by GS1 Finland, and they can be ordered from the GS1 Finland online store. When selecting the appropriate GS1 Company Prefix, it is important to consider the number of GTIN codes needed.

## 3.3 GTIN code generation

Creating GTIN codes requires a company to have a GS1 Company Prefix (GCP). GTIN codes enable the unique identification of products at the base product level.

A GTIN code begins with the GS1 Company Prefix, which can range from 7 to 11 digits in length for prefixes issued by GS1 Finland. Following the company prefix, 1 to 6 digits can be defined by the company, where the use of sequential numbering is recommended. The last digit, the 13th digit, is a check digit calculated using the first 12 digits with the Modulo 10 algorithm.

###### Table 3. Structure of a MTO GTIN Code

| GS1 Application Identifier (AI) | GS1 Company Prefix — Item number                                    | Check digit |
|----------------------------------|---------------------------------------------------------------------|-------------|
| (03)                             | <ins>0</ins> N1 N2 N3 N4 N5 N6 N7 N8 N9 N10 N11 N12               | N13         |

In barcodes and RFID tags, the Application Identifier (AI) used to express the GTIN is `(03)`. GS1's international standard development is currently addressing the identification of Make-To-Order (MTO) and Engineer-To-Order (ETO) products. This guideline will be updated accordingly once the standard is finalized.

> **Note!** The longest version of a GTIN is 14 characters. GTINs shorter than 14 characters are padded with leading zeros to reach the 14-character length. A GTIN cannot exceed 14 characters.
