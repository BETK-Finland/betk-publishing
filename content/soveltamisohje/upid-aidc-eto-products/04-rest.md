---
title: ""
order: 4
section: ""
---

### 4.1.1 Use of RFID symbol

When using RFID technology for automatic product identification, it is essential to ensure that the RFID tag symbol is included on product labels and production plans. The symbol must comply with standards, be easily recognizable, and be positioned in a way that clearly indicates the location and use of RFID tags.

###### Table 12. General RFID symbol (ISO 7000-3010).

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="4"><img width="150" alt="RFID-symbol" src="https://github.com/user-attachments/assets/5c9d4d49-e5d6-4bac-a66f-c77a9731fce9"/></td>
            <th>RFID symbol</th>
        </tr>
        <tr>
            <td>The ISO 7000-3010 standard's freely available general RFID symbol is recommended for use as the RFID tag symbol. The use of this symbol must comply with the requirements of the ISO/IEC 29160:2020 standard, especially when the symbol is used to indicate the location of RFID tags.</td>
        </tr>
        <tr>
            <th>Size</th>
        </tr>
        <tr>
            <td>The RFID tag symbol (ISO 7000-3010) should have a minimum size of 5 × 5 mm, with a 1 mm clear zone surrounding it. When the RFID tag symbol is presented in low contrast, it must be sufficiently large to ensure it is easily recognizable under typical operating conditions.</td>
        </tr>
    </tbody>
</table>

**Utilizing RFID Symbols on Precast Concrete Elements**

The RFID symbol must be positioned so that it is easily visible to those trying to locate or read the actual RFID tag. The use of an RFID symbol is recommended in precast concrete production drawings to indicate the location of RFID tags (example illustrated in Annex 1). The use of the RFID tag shall be indicated by the RFID tag symbol and the type of tag used and the location information shall be included in the product catalogue of the precast concrete element.

**Placing the RFID Tag to the Physical Product**

The readability of RFID tagged objects is affected by several factors, such as the RFID chip, the RFID antenna and the encapsulation (the whole RFID tag). The environment in which the RFID tag is read has a significant impact on readability. For example, an environment with many metal objects can detune and reflect RFID signals, while liquids tend to absorb them, both of which can interfere with the performance of RFID systems.

There are different types of RFID tags on the market, suitable for different uses. RFID tags can be used in a precast concrete environment, embedded in the precast concrete, on the surface of the precast concrete, or as part of a product label to be attached to precast concrete. When cast into a precast concrete element, the readability of the RFID tag is affected by the material surrounding it, so the RFID tag chosen should be such that it can be read through the surrounding concrete to a sufficient depth. The product label formed by the external applicator should include a note on the use of the RFID tag and a specification as to whether the tag is located on the tab itself or cast inside the element. The benefits of using RFID are based on automated reading events and the resulting transaction path.

## 4.2 GS1 DataMatrix barcode

GS1 DataMatrix is a two-dimensional barcode developed by GS1 that can be printed as a square or rectangular symbol consisting of individual dots or squares. The GS1 DataMatrix can contain a larger amount of data than a traditional linear barcode. Up to 3116 numeric characters or 2335 alphanumeric characters can be encoded. GS1 application codes allow the GS1 DataMatrix to include many different types of data, such as minimum data requirements for specified concrete elements. A camera-based scanner is required to read the GS1 DataMatrix.

###### Table 13. Example of a GS1 DataMatrix code containing the minimum data requirements for precast concrete elements

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="7"><img width="136" height="136" alt="GS1 DataMatrix example" src="https://github.com/user-attachments/assets/67511dcd-ef67-4e45-9f03-7c345cfb4c06" /></td>
            <th colspan="2">Example information content</th>
        </tr>
        <tr>
            <td><b>GS1 Application Identifier (AI)</b></td>
            <td><b>Value (example)</b></td>
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
            <td>(91) = Internal (element classification)</td>
            <td><code>V1001</code></td>
        </tr>
        <tr>
            <td>(92) = Internal (GUID)</td>
            <td><code>ba34cf17-0c4b-4c6f-9295-cae05aa74ad4</code></td>
        </tr>
    </tbody>
</table>

**GS1 DataMatrix size and quality**

The physical size of a barcode varies according to the amount of data it contains. The resolution (X-dimension) of the barcode shall be a minimum of 0.38 mm and a maximum of 0.45 mm. The quality of the GS1 2D barcodes used for marking shall meet the requirements of ISO/IEC 15415. This will ensure their legibility.

It is advisable to contact a company or companies specialising in identification solutions for the printing of the markings. Companies offering identification solutions are listed on the GS1 partner page.

## 4.3 GS1 Digital Link QR code

If the tag is intended to not only enable identification and carry data but also communicate with the consumer/user via a smartphone or similar device, a QR code compliant with the GS1 Digital Link standard can be used. Unlike a regular QR code, the data content of this code is defined by the GS1 standard. The standard ensures that the codes and the information they contain are structurally consistent, making them interoperable across different systems and stakeholders, as well as readable and interpretable by barcode scanners.

A QR code containing a GS1 Digital Link URI serves two purposes:

> **1. Offline Product Identification and data capture**
> It can be used without an internet connection to identify and data capture the product via barcode scanners, just like traditional EAN barcodes. The product is identified using the GTIN code included in the QR code, along with additional required information such as the MTO variation number and serial number.

> **2. Online Interaction**
> It can be used like any other QR code to direct the user of a smartphone or similar device to online content. Various applications can also perform other actions and display different content based on the same QR code scan.

The GS1 Digital Link URI incorporates GS1 Application Identifiers for embedding data. The example below shows a GS1 Digital Link URI formed to include the minimum data requirements presented in the table.

###### Table 14. The QR code in the example contains the information shown in the table in GS1 Digital Link URI format: https://id.rt.fi/03/06400001000247/242/123456/21/12345678910

<table class="sov-values-table">
    <tbody>
        <tr>
            <td rowspan="5"><img width="164" height="164" alt="GS1 Digital Link QR code example" src="https://github.com/user-attachments/assets/12c8158b-8280-4ef5-85b1-40d42f631083" /></td>
            <th colspan="2">Example information content</th>
        </tr>
        <tr>
            <td><b>GS1 Application Identifier (AI)</b></td>
            <td><b>Value (example)</b></td>
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
    </tbody>
</table>

**Example Purpose and Recommendations for GS1 Digital Link QR Codes**

The purpose of the example is solely to demonstrate the structure of the data content. It uses a fictional Domain Name `id.rt.fi`, so when scanned with a smartphone camera, the example code does not direct to any actual content.

As a general recommendation, the GS1 Digital Link URI included in the QR code should not point directly to a live webpage's URL. Instead, it is recommended to set up a redirection from this address to the desired content to be displayed through the code.

The Domain Name in a GS1 Digital Link URI can be any Domain Name, as it does not affect the product's identification or recognition. The Domain Name determines where the person scanning the QR code will be directed online. Therefore, it is possible to use the Domain Name of a service provider in the code. However, it is important to be aware that this may lead to a vendor lock-in situation, where changing the service provider would require replacing the codes printed on the products due to the change in the Domain Name.

**Recommended Approach: Using a Subdomain for Product Identification**

It is recommended to use the company's own Domain Name in the QR code. A preferred practice is to create a dedicated Subdomain under the main Domain Name for product identification purposes. A Subdomain is a separate section of the main Domain Name, used alongside the main domain for specific purposes. Using a Subdomain in QR codes ensures the permanence and independence of the URLs used for product identification from the structure of the main website.

**Examples of Subdomain Usage**

The Subdomain can be based on the company's main domain or its various brand domains.

For example: `company-x.fi` → `id.company-x.fi` or `brand-x.fi` → `id.brand-x.fi`

The shorter the GS1 Digital Link URI, the smaller the QR code containing it can be.

The use of the GS1 Digital Link standard is described in greater detail in the following GS1 standards:
- https://ref.gs1.org/standards/digital-link/uri-syntax/
- https://ref.gs1.org/standards/resolver/
