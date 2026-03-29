import type { Metadata } from 'next';
import { SEO_CONFIG } from '@/lib/seo-config';
import Hero from '@/components/Hero';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: `Entgelttransparenz & Gender Pay Gap — Fachanwalt Fatih Bektas | gender-paygap.de`,
  description:
    'Arbeitnehmer und Arbeitgeber: Fachanwalt für Arbeitsrecht berät zu Auskunftsrecht, Equal-Pay-Klage und Compliance-Pflichten ab 2026. Kostenlose Ersteinschätzung. APOS Legal Heidelberg.',
  alternates: {
    canonical: 'https://www.gender-paygap.de/',
  },
  openGraph: {
    type: 'website',
    title: `Entgelttransparenz & Gender Pay Gap — Fachanwalt für Arbeitsrecht (${currentYear})`,
    description:
      'Auskunftsrecht prüfen, Equal-Pay-Klage, Compliance-Audit. Fachanwalt Fatih Bektas berät Arbeitnehmer und Arbeitgeber.',
    url: 'https://www.gender-paygap.de/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Entgelttransparenz & Gender Pay Gap — Fachanwalt (${currentYear})`,
    description: 'Auskunftsrecht, Equal-Pay-Klage, Compliance. Fachanwalt für Arbeitsrecht. APOS Legal Heidelberg.',
  },
};

const homeFaqs = [
  {
    q: 'Was ist der Gender Pay Gap in Deutschland?',
    a: 'Der unbereinigte Gender Pay Gap in Deutschland beträgt 16% (Statistisches Bundesamt, Dezember 2025). Das bedeutet: Frauen verdienen im Durchschnitt 16% weniger als Männer pro Stunde. Der bereinigte Pay Gap — also bei gleicher Qualifikation, Branche und Position — liegt bei ca. 6%. Beides ist durch die EU-Entgelttransparenzrichtlinie 2023/970 ab Juni 2026 adressiert.',
  },
  {
    q: 'Habe ich als Arbeitnehmer ein Auskunftsrecht gegenüber meinem Arbeitgeber?',
    a: 'Ja. Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen mit mehr als 50 Mitarbeitern das Recht, Auskunft über die durchschnittliche Vergütung von Beschäftigten in vergleichbaren Positionen zu verlangen — aufgeschlüsselt nach Geschlecht (Art. 7 EU-Richtlinie 2023/970). Der Arbeitgeber muss innerhalb von 2 Monaten antworten.',
  },
  {
    q: 'Was müssen Arbeitgeber ab Juni 2026 beachten?',
    a: 'Unternehmen ab 50 Mitarbeitern müssen individuelle Auskunftsanfragen beantworten. Ab 250 Mitarbeitern gilt zusätzlich eine jährliche Berichtspflicht über den geschlechtsspezifischen Entgeltunterschied (ab 2027). Bei einem Gap über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat verpflichtend. Stellenanzeigen müssen künftig eine Gehaltsspanne enthalten.',
  },
  {
    q: 'Kann ich wegen Lohndiskriminierung klagen?',
    a: 'Ja. Die EU-Richtlinie sieht eine Beweislastumkehr vor: Wenn ein Gehaltsunterschied festgestellt wird, muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt (Art. 18). Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein Paarvergleich ausreicht. Ansprüche bestehen rückwirkend für bis zu 3 Jahre.',
  },
  {
    q: 'Was kostet eine Erstberatung bei APOS Legal?',
    a: 'Die Ersteinschätzung Ihres Falls ist kostenlos — sowohl für Arbeitnehmer als auch für Arbeitgeber. Wir prüfen Ihre Situation und empfehlen konkrete nächste Schritte. Bei einer Beauftragung richten sich die Kosten nach dem RVG. Viele Arbeitnehmer haben eine Rechtsschutzversicherung, die die Kosten übernimmt.',
  },
];

export default function Home() {
  return (
    <>
      {/* Schema.org - LegalService + AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LegalService',
                '@id': SEO_CONFIG.organization.id,
                name: 'APOS Legal — Entgelttransparenz & Gender Pay Gap',
                url: 'https://www.gender-paygap.de',
                description: 'Fachanwalt für Arbeitsrecht berät Arbeitnehmer und Arbeitgeber zu Entgelttransparenz, Equal Pay und Gender Pay Gap.',
                areaServed: 'DE',
                serviceType: ['Entgelttransparenz', 'Equal Pay Beratung', 'Lohndiskriminierung', 'Compliance Audit'],
                provider: {
                  '@type': 'Attorney',
                  name: 'Fatih Bektas',
                  jobTitle: 'Fachanwalt für Arbeitsrecht',
                  worksFor: {
                    '@type': 'LegalService',
                    name: 'APOS Legal Rechtsanwaltsgesellschaft mbH & Co. KG',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Heidelberg',
                      addressCountry: 'DE',
                    },
                  },
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ...SEO_CONFIG.rating,
                },
                review: SEO_CONFIG.reviews,
              },
            ],
          }),
        }}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <main>
        <Hero />

        {/* Dringlichkeits-Banner */}
        <div className="bg-primary-700 text-white text-center py-3.5 px-6 text-[0.9rem] font-medium">
          Umsetzungsfrist EU-Entgelttransparenzrichtlinie: <strong>7. Juni 2026</strong> — Jetzt handeln, bevor Sanktionen drohen.
        </div>

        {/* Dual-Audience Karten */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
              {/* Arbeitnehmer-Karte */}
              <FadeUp>
                <div className="bg-secondary-50 border border-secondary/20 rounded p-8 h-full">
                  <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Arbeitnehmer</div>
                  <h2 className="font-serif text-[1.5rem] font-bold leading-tight mb-3">
                    Verdienen Sie weniger als Ihre Kollegen?
                  </h2>
                  <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-5">
                    Die neue EU-Richtlinie gibt Ihnen das Recht, Auskunft über Gehälter in Ihrer Vergleichsgruppe
                    zu verlangen. Wir setzen dieses Recht für Sie durch.
                  </p>
                  <ul className="list-none flex flex-col gap-2 mb-6">
                    <li><a href="/auskunftsrecht-entgelttransparenz" className="text-secondary-700 font-medium no-underline hover:underline text-[0.9rem]">Auskunftsrecht prüfen &rarr;</a></li>
                    <li><a href="/equal-pay-klage" className="text-secondary-700 font-medium no-underline hover:underline text-[0.9rem]">Equal-Pay-Klage &rarr;</a></li>
                    <li><a href="/lohndiskriminierung-nachweisen" className="text-secondary-700 font-medium no-underline hover:underline text-[0.9rem]">Lohndiskriminierung nachweisen &rarr;</a></li>
                  </ul>
                  <a
                    href="/arbeitnehmer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[0.9rem] font-semibold no-underline transition-all bg-secondary-600 text-white hover:bg-secondary-700"
                  >
                    Alle Arbeitnehmer-Themen &rarr;
                  </a>
                </div>
              </FadeUp>

              {/* Arbeitgeber-Karte */}
              <FadeUp delay={1}>
                <div className="bg-accent-50 border border-accent/20 rounded p-8 h-full">
                  <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2">Arbeitgeber</div>
                  <h2 className="font-serif text-[1.5rem] font-bold leading-tight mb-3">
                    Sind Ihre Vergütungsstrukturen compliant?
                  </h2>
                  <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-5">
                    Ab Juni 2026 drohen empfindliche Sanktionen bei Verstößen gegen die Entgelttransparenzpflichten.
                    Wir prüfen Ihre Strukturen und machen sie rechtssicher.
                  </p>
                  <ul className="list-none flex flex-col gap-2 mb-6">
                    <li><a href="/entgeltgleichheit-audit" className="text-accent-700 font-medium no-underline hover:underline text-[0.9rem]">Compliance-Audit &rarr;</a></li>
                    <li><a href="/berichtspflichten-gender-pay-gap" className="text-accent-700 font-medium no-underline hover:underline text-[0.9rem]">Berichtspflichten &rarr;</a></li>
                    <li><a href="/vergütungssystem-rechtssicher" className="text-accent-700 font-medium no-underline hover:underline text-[0.9rem]">Vergütungssystem prüfen &rarr;</a></li>
                  </ul>
                  <a
                    href="/arbeitgeber"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-sm text-[0.9rem] font-semibold no-underline transition-all bg-accent-600 text-white hover:bg-accent-700"
                  >
                    Alle Arbeitgeber-Themen &rarr;
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Trust-Sektion */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[0.85rem] text-ink-light">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                Fachanwalt für Arbeitsrecht
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                68 Bewertungen auf anwalt.de
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Ex-CEO / CFO / COO Erfahrung
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                APOS Legal Heidelberg
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Ersteinschätzung kostenlos
              </span>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">FAQ</div>
            <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-8">
              Häufige Fragen zu Entgelttransparenz & Equal Pay
            </h2>
            <FaqAccordion items={homeFaqs} />
          </div>
        </section>

        {/* Kontakt */}
        <ContactForm />

        {/* CTA */}
        <section className="py-[70px] px-8 bg-primary-700 text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Kostenlose Ersteinschätzung — für Arbeitnehmer und Arbeitgeber
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Schildern Sie uns Ihre Situation. Wir prüfen Ihren Fall und empfehlen konkrete nächste Schritte.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-primary-700 hover:bg-primary-50 hover:-translate-y-0.5"
              >
                Jetzt Kontakt aufnehmen &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
