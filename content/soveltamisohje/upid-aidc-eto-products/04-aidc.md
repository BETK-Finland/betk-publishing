---
title: "Automatic identification and data capture"
order: 4
section: "4"
---

In addition to Unique Product Identification (UPID), suitable Automatic Identification and Data Capture (AIDC) technology must be selected to enable machine readability and facilitate the digitalization of supply chain management. When selecting AIDC technology, the requirements set by the intended use and environmental conditions must be considered. GS1 Data Carriers for automatic identification and data capture (AIDC) can store varying amounts of information to meet the needs of different business processes and trade requirements. The data encoded into GS1 data carriers not only uniquely identify products at all levels of the Product Identification Hierarchy but also provide access to product information and visibility into product movements within the supply chain.

To convey the minimum data requirements for the product identification of precast concrete elements, the implementation guideline recommends at least adding a 2D code based on optical recognition to the product label during manufacturing. According to the GS1 standard, the options for this are a GS1 DataMatrix code or a QR code with data content compliant with the GS1 Digital Link standard. Alongside the 2D code used on the product label, machine-readable data carriers based on RFID technology can also be utilized, either on the product label or embedded into the precast concrete element.

<img width="600" alt="Automatic identification and data capture via GS1 Data Carriers" src="https://github.com/user-attachments/assets/ae613273-30f1-420a-a237-4efdf57d800e" />

###### Figure 2. Automatic identification and data capture via GS1 Data Carriers

The most efficient AIDC carrier for precast concrete elements has been found to be a passive EPC/RFID Gen-2 UHF tag, which enables the identification number of the element to be read effectively from several meters away without a direct line of sight to the tag itself.

## 4.1 EPC/RFID Gen2 UHF tag

This implementation guideline is based on the EPC/RFID Gen2 Radio Protocol, which defines the physical data transmission between an RFID chip and an RFID reader, using commands to control the RFID reader's interaction with RFID tags. The EPC/RFID Gen2 protocol is an ISO standard and includes various functionalities, such as security features and extended user memory.

GS1 has published the TDS (Tag Data Standard), which specifies how GS1 identification keys, such as SGTIN, are incorporated into EPC Gen2 RFID tags for remote reading. The TDS standard is openly available to everyone and is already widely used for RFID identification across various industries.

In product identification, the required data is embedded into EPC Gen2 RFID tags in accordance with the TDS standard, using the necessary GS1 Application Identifiers (AIs). Data encoding utilizes the tag's EPC memory and, as needed, the User memory.

The EPC memory is designed to store the EPC code, which is a unique identifier for the item based on the GS1 standard. In the identification of precast concrete elements, the SGTIN code of the element is encoded in the EPC memory. This enables the quick reading of the element's unique identification number.

User memory is used when additional information is required on the RFID tag beyond what the EPC memory can accommodate. In the BETK project, it has been identified that additional data, such as the Made-to-Order Variation Number, the element identifier used for classifying elements, and the GUID created by the design software, needs to be included in the tag.

###### Table 9. EPC Binary Encoding Schemes and Their Restrictions. The applicable method is determined by the required number of numeric or alphanumeric characters.

<table class="sov-values-table">
    <thead>
        <tr>
            <th>EPC Scheme</th>
            <th>EPC-binary Coding Scheme</th>
            <th>EPC + Filter Bit Count</th>
            <th>Includes Filter Value</th>
            <th>Serial number limitation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">sgtin</td>
            <td>sgtin-96</td>
            <td>96</td>
            <td>Yes</td>
            <td>Numeric-only; no leading zeros; decimal value must be less than 2³⁸ (i.e., at most 274,877,906,943).</td>
        </tr>
        <tr>
            <td>sgtin-198</td>
            <td>198</td>
            <td>Yes</td>
            <td>All values permitted by GS1 General Specifications (up to 20 alphanumeric characters).</td>
        </tr>
    </tbody>
</table>

###### Table 10. Applicable Method: SGTIN-96. The SGTIN-96 encoding method is commonly used. The TDS 2.1 also includes SGTIN-198, which can be used for longer or alphanumeric serial numbers.

<table class="sov-values-table">
    <thead>
        <tr>
            <th colspan="3">Data structure SGTIN-96</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>EPC SGTIN-96</b></td>
            <td><b>Value</b></td>
            <td><b>Comment</b></td>
        </tr>
        <tr>
            <td>Header</td>
            <td><code>48</code></td>
            <td>Number for SGTIN-96</td>
        </tr>
        <tr>
            <td>Filter value</td>
            <td><code>0</code></td>
            <td>0 = Applicable Value for a Product Not Scanned at Point-of-Sale</td>
        </tr>
        <tr>
            <td rowspan="6">Partition</td>
            <td rowspan="6"><code>1</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>5</code> or <code>6</code></td>
            <td>1 = GS1 GCP of 11 digits and 2 digits in item number + indicator</td>
        </tr>
        <tr><td>2 = GS1 GCP of 10 digits and 3 digits in item number + indicator</td></tr>
        <tr><td>3 = GS1 GCP of 9 digits and 4 digits in item number + indicator</td></tr>
        <tr><td>4 = GS1 GCP of 8 digits and 5 digits in item number + indicator</td></tr>
        <tr><td>5 = GS1 GCP of 7 digits and 6 digits in item number + indicator</td></tr>
        <tr><td>6 = GS1 GCP of 6 digits and 7 digits in item number + indicator</td></tr>
        <tr>
            <td>GS1 Company Prefix (GS1 GCP)</td>
            <td><code>N…11</code></td>
            <td>GS1 GCP: 6, 7, 8, 9, 10 or 11 digits</td>
        </tr>
        <tr>
            <td>Item number</td>
            <td><code>N…7</code></td>
            <td>Depending on the number of digits in GS1 GCP. 1–7 digits</td>
        </tr>
        <tr>
            <td>Serial number</td>
            <td><code>N…12</code></td>
            <td>Up to 12 digits (highest allowable value = 274,877,906,943). Leading zeros not allowed.</td>
        </tr>
    </tbody>
</table>

**Example of data string in an EPC / Gen2 RFID chip**

RFID Tag EPC Memory Bank Contents (hexadecimal): `301586A004000602DFDC1C3E`

EPC Tag URI: `urn:epc:tag:sgtin-96:0.6400001.000024.12345678910`

**Data Structure Breakdown**

**1. URN Prefix**
Value: `urn:epc:id` — Specifies that this is a Uniform Resource Identifier (URI).

**2. EPC Scheme**
Value: `sgtin-96` — Indicates the GS1 Identification Key used (SGTIN with 96-bit encoding).

**3. Filter Value**
Value: `0` — Filter value indicating "product not scanned at the point-of-sale."

**4. GS1 Company Prefix**
Value: `6400001` — Identifies the company issuing the product.

**5. Indicator and Item Reference Number**
Value: `000024` — Combines the indicator digit and the item reference number.

**6. Serial Number**
Value: `12345678910` — Uniquely identifies the specific instance of the product.

> **Partition Value** — Determines where the separator `( . )` is placed to divide the GS1 Company Prefix and the Item Reference Number. The last separator `( . )` in the URI distinguishes the GTIN from the serial number.

> **Check Digit** — Not included in the EPC code stored in the RFID tag.

**User Memory Section**

Additional information can be stored in the User Memory of the RFID chip as Application Identifiers (AIs):

###### Table 11. Additional information for use with concrete elements

<table class="sov-values-table">
    <thead>
        <tr>
            <th>GS1 Application Identifier (AI)</th>
            <th>Definition</th>
            <th>Value (example)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>(91) Internal</td>
            <td>Element classification</td>
            <td><code>V1001</code></td>
        </tr>
        <tr>
            <td>(92) Internal</td>
            <td>GUID</td>
            <td><code>ba34cf17-0c4b-4c6f-9295-cae05aa74ad4</code></td>
        </tr>
        <tr>
            <td>(99) Internal</td>
            <td>Domain name</td>
            <td><code>id.rt.fi</code></td>
        </tr>
    </tbody>
</table>

**Implementing RFID Tags**

For programming RFID tags, it is recommended to collaborate with companies specializing in identification solutions. A list of such solution providers can be found on the GS1 Partner Page and the RFID Lab Finland Association website.
