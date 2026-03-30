import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `ESG und Gender Pay Gap — Berichterstattung für Unternehmen (${new Date().getFullYear()})`,
  description:
    'CSRD-Integration, ESG-Sozialstandards und Gender Pay Gap in der Nachhaltigkeitsberichterstattung — Art. 9 EU-RL 2023/970. Fachanwalt APOS Legal Heidelberg.',
  path: '/esg-gender-pay-gap-berichterstattung',
});

const faqs = [
  {
    question: 'Wie hängen CSRD und Entgelttransparenzrichtlinie zusammen?',
    answer:
      'Die Corporate Sustainability Reporting Directive (CSRD) verpflichtet berichtspflichtige Unternehmen, im Rahmen der ESRS S1 (Eigene Belegschaft) auch über den Gender Pay Gap zu berichten. Gleichzeitig verlangt Art. 9 der EU-Entgelttransparenzrichtlinie (2023/970) eigene GPG-Berichte. Beide Berichtspflichten überschneiden sich inhaltlich, haben aber unterschiedliche Detailtiefen und Fristen. Eine integrierte Datenerhebung spart doppelten Aufwand.',
  },
  {
    question: 'Was verlangt ESRS S1 konkret zum Gender Pay Gap?',
    answer:
      'ESRS S1 (European Sustainability Reporting Standard — Eigene Belegschaft) fordert die Offenlegung des bereinigten und unbereinigten Gender Pay Gap, die Vergütungspolitik einschließlich variabler Bestandteile, Maßnahmen zur Schließung des GPG sowie die Zielvorgaben und deren Erreichung. Diese Daten fließen in den Nachhaltigkeitsbericht ein und werden von Wirtschaftsprüfern kontrolliert.',
  },
  {
    question: 'Welche Rolle spielt der Gender Pay Gap für ESG-Ratings?',
    answer:
      'ESG-Rating-Agenturen wie MSCI, Sustainalytics und ISS bewerten den Gender Pay Gap als Schlüsselindikator im Sozialbereich (S). Ein hoher oder intransparenter GPG führt zu Abwertungen im ESG-Rating, was die Kapitalkosten erhöhen und institutionelle Investoren abschrecken kann. Umgekehrt signalisiert ein nachweislich geringer GPG gute Governance und kann zu günstigeren Finanzierungskonditionen führen.',
  },
  {
    question: 'Ab wann müssen wir nach CSRD berichten?',
    answer:
      'Die CSRD-Berichtspflicht wird stufenweise eingeführt: Große kapitalmarktorientierte Unternehmen ab 2024 (Bericht über Geschäftsjahr 2024), große nicht-kapitalmarktorientierte Unternehmen ab 2025, und börsennotierte KMU ab 2026. Die GPG-Berichtspflicht nach Art. 9 der Entgelttransparenzrichtlinie beginnt für Unternehmen ab 250 MA bereits 2027. Eine parallele Umsetzung ist empfehlenswert.',
  },
  {
    question: 'Wie unterstützt APOS Legal bei der ESG-GPG-Integration?',
    answer:
      'Wir kombinieren arbeitsrechtliche und ESG-Compliance: Aufbau einer einheitlichen Datenerhebung für CSRD und Entgelttransparenzrichtlinie, Definition der Kennzahlen (bereinigter/unbereinigter GPG, Medianentgelt je Vergleichsgruppe), rechtssichere Dokumentation, Begleitung bei Auskunftsanfragen und Vorbereitung auf die externe Prüfung. Die Ersteinschätzung ist kostenlos.',
  },
];

const zeitstrahl = [
  { jahr: '2024', text: 'CSRD-Berichtspflicht für große kapitalmarktorientierte Unternehmen (Bericht über GJ 2024)' },
  { jahr: '2025', text: 'CSRD-Berichtspflicht für große nicht-kapitalmarktorientierte Unternehmen' },
  { jahr: '06/2026', text: 'EU-Entgelttransparenzrichtlinie tritt in Kraft — Auskunftsrecht, Gehaltsspanne in Stellenanzeigen' },
  { jahr: '2026', text: 'CSRD-Berichtspflicht für börsennotierte KMU' },
  { jahr: '2027', text: 'Erster GPG-Bericht nach Art. 9 EU-RL für Unternehmen ab 250 MA' },
  { jahr: '2031', text: 'Erster GPG-Bericht für Unternehmen mit 100–249 MA' },
];

export default function EsgGenderPayGapBerichterstattungPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Start', item: SEO_CONFIG.baseUrl },
                  { '@type': 'ListItem', position: 2, name: 'Arbeitgeber', item: `${SEO_CONFIG.baseUrl}/arbeitgeber` },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'ESG & Gender Pay Gap',
                    item: `${SEO_CONFIG.baseUrl}/esg-gender-pay-gap-berichterstattung`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-cream-dark max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-gold transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitgeber" className="hover:text-gold transition-colors no-underline text-ink-muted">Arbeitgeber</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">ESG &amp; Gender Pay Gap</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-cream-dark max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">Arbeitgeber · ESG</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              ESG und Gender Pay Gap — Berichterstattung für Unternehmen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Der Gender Pay Gap ist ein zentraler Indikator in der ESG-Nachhaltigkeitsberichterstattung.
              Die CSRD verlangt über ESRS S1 die Offenlegung des GPG, während Art. 9 der EU-Entgelttransparenzrichtlinie
              (2023/970) eigene Berichtspflichten ab 2027 vorsieht.
              APOS Legal Heidelberg unterstützt Sie bei der integrierten Umsetzung beider Regelwerke.
            </p>
          </div>
        </header>

        {/* Warum ESG + GPG */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Warum der Gender Pay Gap ein ESG-Schlüsselindikator ist
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Institutionelle Investoren und ESG-Rating-Agenturen bewerten den Gender Pay Gap als Maßstab
                für soziale Nachhaltigkeit und gute Unternehmensführung. Ein hoher oder intransparenter GPG
                führt zu schlechteren ESG-Ratings bei MSCI, Sustainalytics und ISS — mit direkten Auswirkungen
                auf Kapitalkosten und Investorenentscheidungen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Gleichzeitig verschärfen zwei regulatorische Stränge die Anforderungen: Die CSRD mit dem
                Berichtsstandard ESRS S1 verlangt GPG-Daten im Nachhaltigkeitsbericht, und die
                EU-Entgelttransparenzrichtlinie (Art. 9) schreibt eigene GPG-Berichte vor. Unternehmen,
                die beide Pflichten integriert umsetzen, sparen Aufwand und vermeiden widersprüchliche Daten.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Zeitstrahl */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <h2 className="font-serif text-[1.5rem] font-bold mb-8">
              Zeitplan: CSRD und Entgelttransparenzrichtlinie
            </h2>
            <div className="space-y-4">
              {zeitstrahl.map((z, i) => (
                <FadeUp key={z.jahr} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-5 flex gap-5 items-start max-md:flex-col">
                    <div className="text-[1.1rem] font-extrabold text-blue min-w-[80px] whitespace-nowrap">{z.jahr}</div>
                    <p className="text-[0.92rem] text-ink-light leading-relaxed m-0">{z.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ESRS S1 Anforderungen */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                ESRS S1 — Was im Nachhaltigkeitsbericht zum GPG stehen muss
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Der European Sustainability Reporting Standard S1 (Eigene Belegschaft) definiert konkrete
                Offenlegungspflichten zum Gender Pay Gap. Die Daten werden von Wirtschaftsprüfern kontrolliert
                und sind öffentlich einsehbar.
              </p>
              <div className="space-y-3">
                {[
                  'Unbereinigter Gender Pay Gap (Gesamtunternehmen und je Kategorie)',
                  'Bereinigter Gender Pay Gap nach Vergleichsgruppen',
                  'Vergütungspolitik einschließlich variabler Bestandteile',
                  'Maßnahmen zur Reduzierung des GPG mit konkretem Zeitplan',
                  'Zielvorgaben und Stand der Zielerreichung',
                  'Anteil der Beschäftigten in Vergleichsgruppen mit GPG über 5%',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 min-w-[24px] rounded-full bg-cream-dark border border-blue/30 flex items-center justify-center text-blue text-[0.75rem] font-bold mt-0.5">
                      &#10003;
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">{item}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Investoren-Perspektive */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Was Investoren erwarten
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Institutionelle Investoren nutzen GPG-Daten als Proxy für Governance-Qualität und
                Humankapital-Management. Ein nachweislich geringer und rückläufiger GPG signalisiert
                effektives Talentmanagement und reduziert das Risiko von Klagen und Reputationsschäden.
              </p>
              <div className="bg-cream-dark border border-blue/20 rounded p-5">
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  <strong>Praxiseffekt:</strong> Studien zeigen, dass Unternehmen mit transparenter
                  Vergütung und geringem GPG im Durchschnitt niedrigere Kapitalkosten und eine höhere
                  Mitarbeiterbindung aufweisen. Die Integration von GPG-Daten in den ESG-Bericht ist
                  daher nicht nur Pflicht, sondern wirtschaftlicher Vorteil.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu ESG und Gender Pay Gap
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* Signatur */}
        <div className="px-8 pb-4 max-md:px-6">
          <div className="max-w-content mx-auto text-[0.82rem] text-ink-muted">
            Verfasst von Fatih Bektas, Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg.
            Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.
          </div>
        </div>

        <ContactForm />

        {/* CTA */}
        <section className="py-[70px] px-8 bg-blue text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              ESG-konforme GPG-Berichterstattung aufbauen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir integrieren Ihre Entgelttransparenz-Daten in die CSRD-Berichterstattung — rechtssicher und prüfungsfest.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
            >
              Jetzt Beratung anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
