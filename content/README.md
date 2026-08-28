# Sisältö

Muokkaa vain markdownia. Älä koske `manifest.json`-tiedostoihin (soveltamisohje ja peppol).

## Media (`content/media/`)

Jokainen `.md`-tiedosto on yksi juttu sivupalkissa.

1. GitHubissa: **Add file** tähän kansioon, tai Pages CMS → Media.
2. Tiedostonimi ilman ääkkösiä ja välilyöntejä, mieluiten päivämäärällä:

   `2026-09-01-kuukausikirje.md`

3. Tiedoston alkuun:

```yaml
---
title: Kuukausikirje syyskuu
date: 2026-09-01
---
```

4. Leipäteksti sen alle. Kuvat kansioon `content/media/images/` ja markdownissa `![kuvateksti](./images/tiedosto.png)`.

Tyhjä kansio = sivulla näkyy “Tulossa pian”. Uusi tiedosto ilmestyy listaan seuraavassa julkaisussa.

## Työryhmät (`content/tyoryhmat/`)

Neljä sivua, yksi tiedosto kukin. **Älä nimeä näitä tiedostoja uudelleen** — osoite katoaa.

| Tiedosto | Sivu |
|---|---|
| `betk.md` | BETK |
| `vakiointi.md` | Vakiointi |
| `rajapinta.md` | Rajapinta |
| `valutarvike.md` | Valutarvike |

Muokkaa vain `title` ja leipäteksti. Tyhjä leipäteksti = “Tulossa pian”. Älä lisää uusia tiedostoja tähän kansioon.

## Soveltamisohjeet ja Peppol

Vanha rakenne: numeroitu `.md` + `manifest.json`. Tiedoston nimen vaihto ilman manifest-päivitystä piilottaa osion.