import { NextResponse } from 'next/server';
import { branchen } from '@/data/branchen';
import { bundeslaender } from '@/data/bundeslaender';
import { unternehmensgroessen } from '@/data/unternehmensgroesse';

const BASE_URL = 'https://www.gender-paygap.de';

const templateCSlugs = [
  'it', 'gesundheitswesen', 'bankwesen', 'einzelhandel', 'oeffentlicher-dienst',
  'produktion', 'bildung', 'pflege', 'versicherung', 'logistik', 'finanzwesen', 'chemie',
];

export async function GET() {
  const branchenSlugs = branchen.filter((b) => b.slug !== 'finanzwesen').map((b) => b.slug);

  const auskunftsrechtLinks = branchenSlugs
    .map((s) => `- [Auskunftsrecht ${s}](${BASE_URL}/auskunftsrecht-${s}/)`)
    .join('\n');

  const agBranchenLinks = branchenSlugs
    .map((s) => `- [Entgelttransparenz Arbeitgeber ${s}](${BASE_URL}/entgelttransparenz-arbeitgeber-${s}/)`)
    .join('\n');

  const gpgBranchenLinks = templateCSlugs
    .map((s) => `- [Gender Pay Gap ${s}](${BASE_URL}/gender-pay-gap-${s}/)`)
    .join('\n');

  const bundeslandLinks = bundeslaender
    .map((bl) => `- [Equal-Pay-Klage ${bl.name}](${BASE_URL}/equal-pay-klage-${bl.slug}/)`)
    .join('\n');

  const groesseLinks = unternehmensgroessen
    .map((g) => `- [Entgelttransparenz ${g.anzahl} Mitarbeiter](${BASE_URL}/entgelttransparenz-${g.slug}-mitarbeiter/)`)
    .join('\n');

  const content = `# gender-paygap.de — Vollständige Seitenübersicht

> Alle Seiten von gender-paygap.de (APOS Legal). Fachanwalt Fatih Bektas berät zu Entgelttransparenz, Equal Pay und Gender Pay Gap gemäß EU-Richtlinie 2023/970.

## Startseite & Hubs

- [Startseite](${BASE_URL}/): Entgelttransparenz & Gender Pay Gap — Fachanwalt Fatih Bektas.
- [Arbeitnehmer](${BASE_URL}/arbeitnehmer/): Ihre Rechte bei ungleicher Bezahlung.
- [Arbeitgeber](${BASE_URL}/arbeitgeber/): Entgelttransparenz-Compliance für Ihr Unternehmen.
- [Gender Pay Gap](${BASE_URL}/gender-pay-gap/): Was ist der Gender Pay Gap? Aktuelle Zahlen.
- [Entgelttransparenzgesetz](${BASE_URL}/entgelttransparenzgesetz/): EU-Richtlinie 2023/970 und deutsches Recht.
- [Equal-Pay-Klage](${BASE_URL}/equal-pay-klage/): Klage bei Lohndiskriminierung.

## Arbeitnehmer — Rechte & Durchsetzung

- [Auskunftsrecht Entgelttransparenz](${BASE_URL}/auskunftsrecht-entgelttransparenz/)
- [Lohndiskriminierung nachweisen](${BASE_URL}/lohndiskriminierung-nachweisen/)
- [Entschädigung Entgeltdiskriminierung](${BASE_URL}/entschaedigung-entgeltdiskriminierung/)
- [Beweislastumkehr Equal Pay](${BASE_URL}/beweislastumkehr-equal-pay/)
- [Gleicher Lohn gleiche Arbeit](${BASE_URL}/gleicher-lohn-gleiche-arbeit/)
- [Elternzeit Gehaltslücke](${BASE_URL}/elternzeit-gehaltsluecke/)
- [Rückkehr Elternzeit Gehalt](${BASE_URL}/rueckkehr-elternzeit-gehalt/)
- [Teilzeit Gehaltsvergleich](${BASE_URL}/teilzeit-gehaltsvergleich/)

## Arbeitgeber — Compliance & Audit

- [Entgelttransparenz Arbeitgeber](${BASE_URL}/entgelttransparenz-arbeitgeber/)
- [Berichtspflichten Gender Pay Gap](${BASE_URL}/berichtspflichten-gender-pay-gap/)
- [Entgeltgleichheit Audit](${BASE_URL}/entgeltgleichheit-audit/)
- [Stellenanzeige Gehaltsspanne Pflicht](${BASE_URL}/stellenanzeige-gehaltsspanne-pflicht/)
- [Auskunftsrecht Arbeitnehmer beantworten](${BASE_URL}/auskunftsrecht-arbeitnehmer-beantworten/)
- [Vergütungssystem rechtssicher](${BASE_URL}/verguetungssystem-rechtssicher/)
- [ESG Gender Pay Gap Berichterstattung](${BASE_URL}/esg-gender-pay-gap-berichterstattung/)
- [Tarifbindung Entgelttransparenz](${BASE_URL}/tarifbindung-entgelttransparenz/)
- [Sanktionen Bußgeld](${BASE_URL}/entgelttransparenz-sanktionen-bussgeld/)

## Informationsseiten

- [Gender Pay Gap Deutschland 2026](${BASE_URL}/gender-pay-gap-deutschland-2026/)
- [Bereinigter Gender Pay Gap](${BASE_URL}/bereinigter-gender-pay-gap/)
- [Equal Pay Day 2026](${BASE_URL}/equal-pay-day-2026/)

## Kostenlose Tools

- [Compliance-Check Arbeitgeber](${BASE_URL}/compliance-check-arbeitgeber/): 5-Fragen Ampel-Check.
- [Sanktionsrechner](${BASE_URL}/compliance-check-arbeitgeber/sanktionsrechner/): Bußgeld- und Nachzahlungsrisiko.
- [Auskunftsrecht-Checker](${BASE_URL}/auskunftsrecht-checker/): 3-Klick Anspruchsprüfer.
- [Auskunftsschreiben-Generator](${BASE_URL}/auskunftsrecht-checker/schreiben-generator/): Muster-Schreiben als PDF.
- [Entschädigungs-Simulator](${BASE_URL}/equal-pay-klage/entschaedigung-berechnen/): Entschädigung berechnen.
- [Gender Pay Gap Rechner](${BASE_URL}/gender-pay-gap-rechner/): Gehalt vs. Branchenmedian.
- [Entgeltlücken-Ampel](${BASE_URL}/entgeltluecken-ampel/): GPG-Berechnung mit Ampel.
- [Vergütungssystem-Selbsttest](${BASE_URL}/verguetungssystem-selbsttest/): 20 Fragen Reifegrad-Score.
- [Schnellcheck Equal Pay](${BASE_URL}/equal-pay-anspruch-schnellcheck/): 2-Minuten Schnellcheck.
- [Vergleichsgruppen-Finder](${BASE_URL}/vergleichsgruppen-finder/): Vergleichsgruppe ermitteln.
- [Situationscheck](${BASE_URL}/situationscheck/): KI-gestützte Analyse.
- [Gehaltsverhandlung-Vorbereiter](${BASE_URL}/gehaltsverhandlung-vorbereiter/): Argumente + Leitfaden.
- [Stellenanzeigen-Checker](${BASE_URL}/stellenanzeigen-checker/): Compliance-Prüfung.
- [Berichtspflicht-Kalender](${BASE_URL}/berichtspflicht-kalender/): Fristen 2026–2032 + ICS.
- [Equal Pay Day Zähler](${BASE_URL}/equal-pay-day-zaehler/): Live-Countdown.

## Auskunftsrecht nach Branche

${auskunftsrechtLinks}

## Entgelttransparenz Arbeitgeber nach Branche

${agBranchenLinks}

## Gender Pay Gap nach Branche

${gpgBranchenLinks}

## Equal-Pay-Klage nach Bundesland

${bundeslandLinks}

## Entgelttransparenz nach Unternehmensgröße

${groesseLinks}

## Kontakt

- [Kontaktformular](${BASE_URL}/kontakt/)
- E-Mail: bektas@apos.legal
- Telefon: +49 6222 9599 2400
- Adresse: Am Paradeplatz 20, 69126 Heidelberg
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
