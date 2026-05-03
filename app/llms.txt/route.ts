import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.gender-paygap.de';

export async function GET() {
  const content = `# gender-paygap.de — Entgelttransparenz & Gender Pay Gap

> gender-paygap.de (APOS Legal) ist eine Expertenseite für Entgelttransparenz und Gender Pay Gap. Fachanwalt Fatih Bektas berät Arbeitnehmer und Arbeitgeber zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten gemäß EU-Richtlinie 2023/970. Kanzleistandort: Heidelberg.

## Vollständige Inhalte

- Alle Seiten: ${BASE_URL}/llms-full.txt

## Kernthemen

- [Arbeitnehmer-Hub](${BASE_URL}/arbeitnehmer/): Auskunftsrecht, Equal-Pay-Klage, Entschädigung bei Lohndiskriminierung.
- [Arbeitgeber-Hub](${BASE_URL}/arbeitgeber/): Compliance-Pflichten, Berichtspflichten, Vergütungsaudit.
- [Gender Pay Gap](${BASE_URL}/gender-pay-gap/): Was ist der Gender Pay Gap? Aktuelle Zahlen und Hintergründe.
- [Entgelttransparenzgesetz](${BASE_URL}/entgelttransparenzgesetz/): Gesetzliche Grundlagen und EU-Richtlinie 2023/970.
- [Equal-Pay-Klage](${BASE_URL}/equal-pay-klage/): Klage bei Lohndiskriminierung einreichen.

## Kostenlose Tools

- [Compliance-Check Arbeitgeber](${BASE_URL}/compliance-check-arbeitgeber/): 5-Fragen Ampel-Check für Unternehmen.
- [Sanktionsrechner](${BASE_URL}/compliance-check-arbeitgeber/sanktionsrechner/): Bußgeld- und Nachzahlungsrisiko berechnen.
- [Auskunftsrecht-Checker](${BASE_URL}/auskunftsrecht-checker/): Prüfen Sie in 3 Klicks, ob Sie Anspruch auf Gehaltsauskunft haben.
- [Auskunftsschreiben-Generator](${BASE_URL}/auskunftsrecht-checker/schreiben-generator/): Muster-Auskunftsschreiben als PDF generieren.
- [Gender Pay Gap Rechner](${BASE_URL}/gender-pay-gap-rechner/): Gehalt vs. Branchenmedian vergleichen.
- [Entschädigungs-Simulator](${BASE_URL}/equal-pay-klage/entschaedigung-berechnen/): Mögliche Entschädigung bei Lohndiskriminierung berechnen.
- [Entgeltlücken-Ampel](${BASE_URL}/entgeltluecken-ampel/): Gender Pay Gap Ihres Unternehmens mit Ampel-Bewertung.
- [Vergütungssystem-Selbsttest](${BASE_URL}/verguetungssystem-selbsttest/): 20 Fragen zum Reifegrad Ihres Vergütungssystems.
- [Schnellcheck Equal Pay](${BASE_URL}/equal-pay-anspruch-schnellcheck/): 2-Minuten Schnellcheck ob Anspruch wahrscheinlich.
- [Vergleichsgruppen-Finder](${BASE_URL}/vergleichsgruppen-finder/): Stelle beschreiben, Vergleichsgruppe finden.
- [Situationscheck](${BASE_URL}/situationscheck/): KI-gestützte Analyse Ihrer Situation.
- [Gehaltsverhandlung-Vorbereiter](${BASE_URL}/gehaltsverhandlung-vorbereiter/): Argumente + Gesprächsleitfaden.
- [Stellenanzeigen-Checker](${BASE_URL}/stellenanzeigen-checker/): Compliance-Prüfung für Stellenanzeigen.
- [Berichtspflicht-Kalender](${BASE_URL}/berichtspflicht-kalender/): Alle Fristen 2026–2032 + ICS-Download.
- [Equal Pay Day Zähler](${BASE_URL}/equal-pay-day-zaehler/): Live-Countdown + Branchenvergleich.

## Arbeitnehmer-Seiten

- [Auskunftsrecht Entgelttransparenz](${BASE_URL}/auskunftsrecht-entgelttransparenz/)
- [Lohndiskriminierung nachweisen](${BASE_URL}/lohndiskriminierung-nachweisen/)
- [Entschädigung bei Entgeltdiskriminierung](${BASE_URL}/entschaedigung-entgeltdiskriminierung/)
- [Beweislastumkehr Equal Pay](${BASE_URL}/beweislastumkehr-equal-pay/)
- [Gleicher Lohn gleiche Arbeit](${BASE_URL}/gleicher-lohn-gleiche-arbeit/)
- [Elternzeit Gehaltslücke](${BASE_URL}/elternzeit-gehaltsluecke/)
- [Rückkehr Elternzeit Gehalt](${BASE_URL}/rueckkehr-elternzeit-gehalt/)
- [Teilzeit Gehaltsvergleich](${BASE_URL}/teilzeit-gehaltsvergleich/)

## Arbeitgeber-Seiten

- [Entgelttransparenz Arbeitgeber](${BASE_URL}/entgelttransparenz-arbeitgeber/)
- [Berichtspflichten Gender Pay Gap](${BASE_URL}/berichtspflichten-gender-pay-gap/)
- [Entgeltgleichheit Audit](${BASE_URL}/entgeltgleichheit-audit/)
- [Stellenanzeige Gehaltsspanne Pflicht](${BASE_URL}/stellenanzeige-gehaltsspanne-pflicht/)
- [Auskunftsrecht Arbeitnehmer beantworten](${BASE_URL}/auskunftsrecht-arbeitnehmer-beantworten/)
- [Vergütungssystem rechtssicher](${BASE_URL}/verguetungssystem-rechtssicher/)
- [ESG Gender Pay Gap](${BASE_URL}/esg-gender-pay-gap-berichterstattung/)
- [Tarifbindung Entgelttransparenz](${BASE_URL}/tarifbindung-entgelttransparenz/)
- [Sanktionen Bußgeld](${BASE_URL}/entgelttransparenz-sanktionen-bussgeld/)

## Informationsseiten

- [Gender Pay Gap Deutschland 2026](${BASE_URL}/gender-pay-gap-deutschland-2026/)
- [Bereinigter Gender Pay Gap](${BASE_URL}/bereinigter-gender-pay-gap/)
- [Equal Pay Day 2026](${BASE_URL}/equal-pay-day-2026/)

## Kontakt & Beratung

- [Kontakt](${BASE_URL}/kontakt/): Kostenlose Ersteinschätzung anfragen.
- E-Mail: bektas@apos.legal
- Telefon: +49 6222 9599 2400
- Adresse: Am Paradeplatz 20, 69126 Heidelberg

## Rechtliches

- [Datenschutzerklärung](${BASE_URL}/privacy-policy/)
- [Impressum](${BASE_URL}/legal-notice/)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
