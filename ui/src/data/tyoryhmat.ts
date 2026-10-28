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
    lead: "BETK kehittää informaation kulkua tilauksesta suunniteltavien rakennustuotteiden, ensisijaisesti betonielementtien, toimitusketjussa suunnittelusta ylläpitoon.",
  },
  {
    slug: "vakiointi",
    label: "Vakiointi",
    i18nKey: "wg.content",
    title: "Vakiointi",
    lead: "Vakiointi-työryhmä edistää betonielementtien yhtenäistä kuvaamista rakennuksen tietomallissa (BIM, IFC), jotta data on koneluettavaa ja koneymmärrettävää.",
  },
  {
    slug: "rajapinta",
    label: "Rajapinta",
    i18nKey: "wg.transfer",
    title: "Rajapinta",
    lead: "Rajapinta-työryhmä edistää toimitusketjun kokonaisarkkitehtuuria ja datan koneellista siirtoa yritysten välillä Peppol-sanomin ja GS1-tunnistein.",
  },
  {
    slug: "valutarvike",
    label: "Valutarvike",
    i18nKey: "wg.valutarvike",
    title: "Valutarvike",
    lead: "Valutarvike-työryhmä kehittää yhtenäistä tapaa nimetä ja kuvata betonielementeissä käytettäviä valutarvikkeita koneluettavasti koko toimitusketjussa.",
  },
];

export function workingGroupBySlug(slug: string | undefined): WorkingGroup | undefined {
  return workingGroups.find((group) => group.slug === slug);
}
