export type WorkingGroup = {
  slug: string;
  label: string;
  i18nKey?: string;
  title: string;
  lead: string;
};

// Nav and routes. Page body is content/tyoryhmat/<slug>.md — do not glob that
// folder for the menu, or a stray file becomes a nav item.
export const workingGroups: WorkingGroup[] = [
  {
    slug: "betk",
    label: "BETK",
    title: "BETK-työryhmä",
    lead: "Tulossa pian.",
  },
  {
    slug: "vakiointi",
    label: "Vakiointi",
    i18nKey: "wg.content",
    title: "Vakiointi",
    lead: "Tulossa pian.",
  },
  {
    slug: "rajapinta",
    label: "Rajapinta",
    i18nKey: "wg.transfer",
    title: "Rajapinta",
    lead: "Tulossa pian.",
  },
  {
    slug: "valutarvike",
    label: "Valutarvike",
    i18nKey: "wg.valutarvike",
    title: "Valutarvike",
    lead: "Tulossa pian.",
  },
];

export function workingGroupBySlug(slug: string | undefined): WorkingGroup | undefined {
  return workingGroups.find((group) => group.slug === slug);
}
