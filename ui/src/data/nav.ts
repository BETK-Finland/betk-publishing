import { listDocs } from "./soveltamisohje-loader";
import { workingGroups } from "./tyoryhmat";

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
  {
    label: "Työryhmät",
    i18nKey: "nav.workingGroups",
    children: workingGroups.map((group) => ({
      href: withBase(`tyoryhmat/${group.slug}`),
      label: group.label,
      i18nKey: group.i18nKey,
    })),
  },
];

export const filesNav: NavLink = {
  href: withBase("esimerkkimallit"),
  label: "Esimerkkimallit",
  i18nKey: "nav.examples",
};

export const isNavLink = (item: NavItem): item is NavLink => "href" in item;
