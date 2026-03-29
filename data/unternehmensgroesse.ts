export type GroesseData = {
  slug: string;
  anzahl: string;
  schwellenwert: string;
  bereich: string;
  pflichten: string[];
  berichtspflichtAb: string | null;
  auskunftsrechtAb: string;
  besonderheit: string;
  bussgeldRisiko: string;
};

export const unternehmensgroessen: GroesseData[] = [
  {
    slug: '50',
    anzahl: '50',
    schwellenwert: 'mehr als 50 Mitarbeiter',
    bereich: '50–99 Mitarbeiter',
    pflichten: [
      'Offenlegung der Gehaltskriterien auf Anfrage (Art. 6 EU-RL 2023/970)',
      'Beantwortung individueller Auskunftsanfragen innerhalb von 2 Monaten (Art. 7)',
      'Dokumentation der Entgeltkriterien und -strukturen',
      'Information über das Auskunftsrecht bei Einstellung und jährlich',
    ],
    berichtspflichtAb: null,
    auskunftsrechtAb: '7. Juni 2026',
    besonderheit: 'Keine Berichtspflicht, aber volles Auskunftsrecht der Beschäftigten. Viele Unternehmen dieser Größe unterschätzen den Aufwand der Auskunftsbearbeitung.',
    bussgeldRisiko: 'Schadensersatzansprüche einzelner Arbeitnehmer:innen bei Nichtbeantwortung oder Falschauskunft. Beweislastumkehr bei Verstößen.',
  },
  {
    slug: '100',
    anzahl: '100',
    schwellenwert: 'mehr als 100 Mitarbeiter',
    bereich: '100–249 Mitarbeiter',
    pflichten: [
      'Alle Pflichten wie bei 50+ Mitarbeitern',
      'Berichtspflicht über den Gender Pay Gap ab 7. Juni 2031 (Art. 9 Abs. 2 EU-RL)',
      'Bericht alle 3 Jahre an die zuständige Behörde',
      'Veröffentlichung des Berichts für Beschäftigte und Öffentlichkeit',
      'Gemeinsame Entgeltbewertung bei GPG > 5% (Art. 10)',
    ],
    berichtspflichtAb: '2031',
    auskunftsrechtAb: '7. Juni 2026',
    besonderheit: 'Die Berichtspflicht greift erst 2031, aber die Vorbereitung sollte jetzt beginnen. Datenerhebung und Systemanpassung brauchen Vorlauf.',
    bussgeldRisiko: 'Bußgelder bei verspäteter oder falscher Berichterstattung. Schadensersatz bei Lohndiskriminierung mit automatischer Beweislastumkehr.',
  },
  {
    slug: '250',
    anzahl: '250',
    schwellenwert: 'mehr als 250 Mitarbeiter',
    bereich: '250–499 Mitarbeiter',
    pflichten: [
      'Alle Pflichten wie bei 100+ Mitarbeitern',
      'Berichtspflicht ab 7. Juni 2027 — erster Bericht fällig (Art. 9 Abs. 1 EU-RL)',
      'Bericht jährlich ab zweitem Berichtszyklus',
      'Verpflichtende gemeinsame Entgeltbewertung mit Betriebsrat bei GPG > 5%',
      'Maßnahmenplan bei festgestellter Lücke > 5%',
      'Stellenanzeigen müssen Gehaltsspanne oder Einstiegsgehalt enthalten (Art. 5)',
    ],
    berichtspflichtAb: '2027',
    auskunftsrechtAb: '7. Juni 2026',
    besonderheit: 'Erster Berichtszeitraum endet Juni 2027. Unternehmen müssen jetzt Daten erheben und Vergütungsstrukturen analysieren. Bei GPG > 5% ist ein Aktionsplan Pflicht.',
    bussgeldRisiko: 'Hohe Bußgelder gemäß Art. 23 EU-RL. Sammelklagen durch Beschäftigte oder Gewerkschaften möglich. Reputationsschaden bei öffentlicher Berichterstattung.',
  },
  {
    slug: '500',
    anzahl: '500',
    schwellenwert: 'mehr als 500 Mitarbeiter',
    bereich: '500–999 Mitarbeiter',
    pflichten: [
      'Alle Pflichten wie bei 250+ Mitarbeitern',
      'Jährliche Berichtspflicht ab erstem Bericht 2027',
      'Erweiterte Transparenz bei Vergütungssystemen',
      'Integration in ESG-Berichterstattung (CSRD) bei kapitalmarktorientierten Unternehmen',
      'Verpflichtende Schulung der Personalabteilung zu Entgelttransparenz',
    ],
    berichtspflichtAb: '2027',
    auskunftsrechtAb: '7. Juni 2026',
    besonderheit: 'Größere Unternehmen stehen unter stärkerer öffentlicher Beobachtung. Der GPG-Bericht wird oft von Medien und Gewerkschaften analysiert.',
    bussgeldRisiko: 'Erhebliche Bußgelder und Nachzahlungsrisiken aufgrund der Mitarbeiterzahl. Sammelklagen und Verbandsklagerecht der Gewerkschaften.',
  },
  {
    slug: '1000',
    anzahl: '1000',
    schwellenwert: 'mehr als 1.000 Mitarbeiter',
    bereich: '1.000+ Mitarbeiter',
    pflichten: [
      'Alle Pflichten wie bei 500+ Mitarbeitern',
      'Jährliche Berichtspflicht ab 2027',
      'Besondere Aufsichtspflichten bei internationalen Konzernstrukturen',
      'Integration in CSRD-Nachhaltigkeitsberichterstattung (Sozialstandards)',
      'Erweiterte Betriebsratsrechte bei Vergütungstransparenz',
      'Verpflichtung zur Offenlegung der Vergütungsspreizung (CEO-to-Worker Pay Ratio)',
    ],
    berichtspflichtAb: '2027',
    auskunftsrechtAb: '7. Juni 2026',
    besonderheit: 'Konzerne müssen internationale Vergütungsstrukturen harmonisieren. Die EU-Richtlinie gilt für alle EU-Standorte — ein konzernweiter Ansatz ist wirtschaftlicher.',
    bussgeldRisiko: 'Maximale Bußgelder bis zu 5 Mio. €. Konzernweite Nachzahlungsrisiken bei systematischer Diskriminierung in Millionenhöhe. Aktionärsklagen bei ESG-Verstößen.',
  },
];

export function getGroesseBySlug(slug: string): GroesseData | undefined {
  return unternehmensgroessen.find((g) => g.slug === slug);
}
