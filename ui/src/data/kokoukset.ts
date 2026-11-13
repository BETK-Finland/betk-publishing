// Työryhmien kokoukset. Ajat ovat Suomen aikaa (Europe/Helsinki) sellaisina
// kuin ne ovat Teams-sarjoissa. Lisää uudet päivät listan loppuun.
export type MeetingGroup = "vakiointi" | "rajapinta";

export type Meeting = {
  group: MeetingGroup;
  title: string;
  date: string; // YYYY-MM-DD
  start: string; // HH.MM
  end: string; // HH.MM
};

const series: Record<MeetingGroup, { title: string; start: string; end: string; dates: string[] }> = {
  vakiointi: {
    title: "VAKIOINTI-teemaryhmän kokous",
    start: "13.00",
    end: "14.30",
    dates: ["2026-08-28", "2026-09-25", "2026-10-23", "2026-11-20", "2026-12-18", "2027-01-15", "2027-02-12"],
  },
  rajapinta: {
    title: "Rajapinta-työryhmän kokous",
    start: "13.30",
    end: "15.00",
    dates: ["2026-09-18", "2026-10-16", "2026-11-13", "2026-12-11", "2027-01-08", "2027-02-05"],
  },
};

export const meetings: Meeting[] = (Object.keys(series) as MeetingGroup[])
  .flatMap((group) =>
    series[group].dates.map((date) => ({
      group,
      title: series[group].title,
      date,
      start: series[group].start,
      end: series[group].end,
    })),
  )
  .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));

// Suomen UTC-poikkeama päivälle: kesäaika maaliskuun viimeisestä sunnuntaista
// lokakuun viimeiseen sunnuntaihin (UTC+3), muuten UTC+2.
function lastSunday(year: number, month: number): number {
  const last = new Date(Date.UTC(year, month + 1, 0));
  return last.getUTCDate() - last.getUTCDay();
}

export function helsinkiOffset(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const month = m - 1;
  let summer = month > 2 && month < 9;
  if (month === 2) summer = d >= lastSunday(y, 2);
  if (month === 9) summer = d < lastSunday(y, 9);
  return summer ? "UTC+3" : "UTC+2";
}
