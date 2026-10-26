import { listDocs, fallbackLangs } from "./soveltamisohje-loader";

const base = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return trimmed ? `${base}${trimmed}` : base;
}

export type NavLink = {
  href: string;
  label: string;
  i18nKey?: string;
  lang?: string;
  /** Guides only: other site languages this guide is listed under (no translation yet). */
  fallback?: string;
};

export type NavItem =
  | NavLink
  | {
      label: string;
      i18nKey?: string;
      children: NavLink[];
    };

const guides: NavLink[] = listDocs()
  .slice()
  .sort((a, b) => {
    const aEn = (a.manifest.lang ?? "fi") === "en" ? 1 : 0;
    const bEn = (b.manifest.lang ?? "fi") === "en" ? 1 : 0;
    return aEn - bEn;
  })
  .map((doc) => ({
    href: withBase(`soveltamisohje/${doc.slug}`),
    label: doc.manifest.nav_title,
    lang: doc.manifest.lang ?? "fi",
    fallback: fallbackLangs(doc.slug).join(" "),
  }));

export const headlines: NavItem[] = [
  {
    label: "Soveltamisohjeet",
    i18nKey: "nav.documents",
    children: guides,
  },
  { href: withBase("media"), label: "Media", i18nKey: "nav.media" },
  {
    label: "Aineisto",
    i18nKey: "nav.resources",
    children: [
      { href: withBase("properties"), label: "Ominaisuudet", i18nKey: "nav.properties" },
      { href: withBase("sanasto"), label: "Sanasto", i18nKey: "nav.glossary" },
      { href: withBase("peppol"), label: "Peppol", i18nKey: "nav.peppol" },
    ],
  },
  { href: withBase("tyoryhmat/betk"), label: "Työryhmät", i18nKey: "nav.workingGroups" },
];

export const filesNav: NavLink = {
  href: withBase("esimerkkimallit"),
  label: "Tiedostot",
  i18nKey: "nav.examples",
};

export const logNav: NavLink = {
  href: withBase("muutokset"),
  label: "Muutosloki",
  i18nKey: "footer.changelog",
};

export const isNavLink = (item: NavItem): item is NavLink => "href" in item;
