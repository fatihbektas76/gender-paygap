export type BundeslandData = {
  slug: string;
  name: string;
  gpgProzent: number;
  arbGStadt: string;
  lagName: string;
  besonderheiten: string;
};

export const bundeslaender: BundeslandData[] = [
  {
    slug: 'baden-wuerttemberg',
    name: 'Baden-Württemberg',
    gpgProzent: 22,
    arbGStadt: 'Arbeitsgericht Stuttgart / Mannheim / Heidelberg',
    lagName: 'Landesarbeitsgericht Baden-Württemberg (Stuttgart)',
    besonderheiten: 'Starke Automobilindustrie und Maschinenbau mit überdurchschnittlichem GPG. Hohe Wirtschaftskraft, aber traditionelle Rollenverteilung in ländlichen Regionen.',
  },
  {
    slug: 'bayern',
    name: 'Bayern',
    gpgProzent: 20,
    arbGStadt: 'Arbeitsgericht München / Nürnberg',
    lagName: 'Landesarbeitsgericht München',
    besonderheiten: 'Niedrige Frauenerwerbsquote in Vollzeit trotz starkem Arbeitsmarkt. Großer Unterschied zwischen München (niedrigerer GPG) und ländlichen Regionen.',
  },
  {
    slug: 'nordrhein-westfalen',
    name: 'Nordrhein-Westfalen',
    gpgProzent: 17,
    arbGStadt: 'Arbeitsgericht Köln / Düsseldorf / Essen',
    lagName: 'Landesarbeitsgericht Düsseldorf / Hamm',
    besonderheiten: 'Großes Bundesland mit heterogener Wirtschaftsstruktur. Chemie- und Finanzstandorte (Köln, Düsseldorf) mit höherem GPG als Durchschnitt.',
  },
  {
    slug: 'hessen',
    name: 'Hessen',
    gpgProzent: 19,
    arbGStadt: 'Arbeitsgericht Frankfurt am Main / Wiesbaden',
    lagName: 'Landesarbeitsgericht Hessen (Frankfurt)',
    besonderheiten: 'Finanzmetropole Frankfurt treibt den GPG durch hohe variable Vergütungsanteile in der Banken- und Versicherungsbranche.',
  },
  {
    slug: 'berlin',
    name: 'Berlin',
    gpgProzent: 12,
    arbGStadt: 'Arbeitsgericht Berlin',
    lagName: 'Landesarbeitsgericht Berlin-Brandenburg',
    besonderheiten: 'Unterdurchschnittlicher GPG dank hohem Anteil öffentlicher Dienst und Startup-Kultur. Aber: wachsende Tech-Branche könnte den Gap vergrößern.',
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    gpgProzent: 16,
    arbGStadt: 'Arbeitsgericht Hamburg',
    lagName: 'Landesarbeitsgericht Hamburg',
    besonderheiten: 'Medien-, Logistik- und Handelsstandort. Hohe Gehälter, aber deutliche Unterschiede in den Branchen. Starke Gewerkschaftspräsenz.',
  },
  {
    slug: 'niedersachsen',
    name: 'Niedersachsen',
    gpgProzent: 18,
    arbGStadt: 'Arbeitsgericht Hannover / Braunschweig',
    lagName: 'Landesarbeitsgericht Niedersachsen (Hannover)',
    besonderheiten: 'Volkswagen-Standort mit hoher Tarifbindung. Automobilzulieferer und Agrarwirtschaft prägen die Gehaltslandschaft.',
  },
  {
    slug: 'sachsen',
    name: 'Sachsen',
    gpgProzent: 7,
    arbGStadt: 'Arbeitsgericht Leipzig / Dresden',
    lagName: 'Landesarbeitsgericht Sachsen (Chemnitz)',
    besonderheiten: 'Niedrigster GPG aller Bundesländer — historisch bedingt durch hohe Frauenerwerbsquote in Ostdeutschland. Generell niedrigeres Gehaltsniveau.',
  },
];

export function getBundeslandBySlug(slug: string): BundeslandData | undefined {
  return bundeslaender.find((b) => b.slug === slug);
}
