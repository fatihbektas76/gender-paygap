// Medianjahresverdienste nach Branche und Geschlecht (Destatis 2025)
// Wird von Tool 7 (Gender Pay Gap Rechner / Branchenvergleich) verwendet

export type GehaltBenchmark = {
  frauen: number;
  maenner: number;
};

export const gehaltBenchmarks: Record<string, GehaltBenchmark> = {
  it:                    { frauen: 62000, maenner: 72000 },
  gesundheitswesen:      { frauen: 38000, maenner: 48000 },
  bankwesen:             { frauen: 44000, maenner: 60000 },
  einzelhandel:          { frauen: 28000, maenner: 35000 },
  'oeffentlicher-dienst': { frauen: 40000, maenner: 44000 },
  produktion:            { frauen: 32000, maenner: 40000 },
  bildung:               { frauen: 42000, maenner: 48000 },
  pflege:                { frauen: 34000, maenner: 38000 },
  versicherung:          { frauen: 40000, maenner: 54000 },
  logistik:              { frauen: 29000, maenner: 35000 },
  finanzwesen:           { frauen: 48000, maenner: 65000 },
  chemie:                { frauen: 45000, maenner: 57000 },
  automobil:             { frauen: 42000, maenner: 55000 },
  medien:                { frauen: 36000, maenner: 43000 },
  beratung:              { frauen: 52000, maenner: 70000 },
  handel:                { frauen: 30000, maenner: 37000 },
};

export function getBenchmarkByBranche(slug: string): GehaltBenchmark | undefined {
  return gehaltBenchmarks[slug];
}
