import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.gender-paygap.de';

export async function GET() {
  const content = `# gender-paygap.de — Entgelttransparenz & Gender Pay Gap

> gender-paygap.de (APOS Legal) ist eine Expertenseite für Entgelttransparenz und Gender Pay Gap. Fachanwalt Fatih Bektas berät Arbeitnehmer und Arbeitgeber zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten. Kanzleistandort: Heidelberg.

## Kernthemen

- [Arbeitnehmer-Hub](${BASE_URL}/arbeitnehmer): Auskunftsrecht, Equal-Pay-Klage, Entschädigung bei Lohndiskriminierung.
- [Arbeitgeber-Hub](${BASE_URL}/arbeitgeber): Compliance-Pflichten, Berichtspflichten, Vergütungsaudit.
- [Gender Pay Gap](${BASE_URL}/gender-pay-gap): Was ist der Gender Pay Gap? Aktuelle Zahlen und Hintergründe.
- [Entgelttransparenzgesetz](${BASE_URL}/entgelttransparenzgesetz): Gesetzliche Grundlagen und EU-Richtlinie 2023/970.
- [Equal-Pay-Klage](${BASE_URL}/equal-pay-klage): Klage bei Lohndiskriminierung einreichen.

## Kostenlose Tools

- [Compliance-Check Arbeitgeber](${BASE_URL}/compliance-check-arbeitgeber): 5-Fragen Ampel-Check für Unternehmen.
- [Auskunftsrecht-Checker](${BASE_URL}/auskunftsrecht-checker): Prüfen Sie in 3 Klicks, ob Sie Anspruch auf Gehaltsauskunft haben.
- [Sanktionsrechner](${BASE_URL}/compliance-check-arbeitgeber/sanktionsrechner): Bußgeld- und Nachzahlungsrisiko berechnen.
- [Gender Pay Gap Rechner](${BASE_URL}/gender-pay-gap-rechner): Gehalt vs. Branchenmedian vergleichen.
- [Situationscheck](${BASE_URL}/situationscheck): KI-gestützte Analyse Ihrer Situation.

## Informationsseiten

- [Gender Pay Gap Deutschland 2026](${BASE_URL}/gender-pay-gap-deutschland-2026): Aktuelle Zahlen und Entwicklung.
- [Bereinigter Gender Pay Gap](${BASE_URL}/bereinigter-gender-pay-gap): Unterschied zwischen bereinigtem und unbereinigtem GPG.
- [Equal Pay Day 2026](${BASE_URL}/equal-pay-day-2026): Hintergründe und Bedeutung.

## Kontakt & Beratung

- [Kontakt](${BASE_URL}/kontakt): Kostenlose Ersteinschätzung anfragen.
- [Telefontermin buchen](https://meet.brevo.com/fatih-bektas/erstberatung-per-telefon-gender-paygap): Kostenloses Erstgespräch per Telefon.
- E-Mail: bektas@apos.legal
- Telefon: +49 6222 9599 2400
- Adresse: Am Paradeplatz 20, 69126 Heidelberg

## Rechtliches

- [Datenschutzerklärung](${BASE_URL}/privacy-policy)
- [Impressum](${BASE_URL}/legal-notice)
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
