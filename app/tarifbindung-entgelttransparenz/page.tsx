import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Tarifbindung und Entgelttransparenz — Was Tarifunternehmen beachten müssen (${new Date().getFullYear()})`,
  description:
    'Tarifvertrag schützt nicht vollständig vor EU-Entgelttransparenzpflichten. TVöD, TV-L, außertarifliche Beschäftigte — Fachanwalt erklärt Pflichten. APOS Legal Heidelberg.',
  path: '/tarifbindung-entgelttransparenz',
});

const faqs = [
  {
    question: 'Schützt ein Tarifvertrag vor den Pflichten der Entgelttransparenzrichtlinie?',
    answer:
      'Nein, ein Tarifvertrag schützt nicht vollständig. Zwar gelten Tarifverträge nach Art. 4 Abs. 5 der EU-Entgelttransparenzrichtlinie (2023/970) grundsätzlich als geschlechtsneutrale Entgeltsysteme, sofern sie ordnungsgemäß ausgehandelt wurden. Allerdings bleiben die Auskunftspflicht (Art. 7), die Berichtspflicht (Art. 9) und die Pflicht zur Gehaltsspanne in Stellenanzeigen (Art. 5) auch für tarifgebundene Unternehmen bestehen.',
  },
  {
    question: 'Welche Pflichten gelten speziell für außertarifliche (AT) Beschäftigte?',
    answer:
      'Außertarifliche Beschäftigte fallen nicht unter die Tarifvermutung des Art. 4 Abs. 5. Für sie gelten alle Pflichten der EU-Richtlinie uneingeschränkt: objektive Entgeltkriterien, Vergleichsgruppenbildung, Auskunftsrecht und ggf. Entgeltbewertung bei GPG über 5%. Da AT-Gehälter oft individuell verhandelt werden, ist das Diskriminierungsrisiko hier besonders hoch.',
  },
  {
    question: 'Was bedeutet die Richtlinie für TVöD- und TV-L-gebundene Arbeitgeber?',
    answer:
      'TVöD und TV-L basieren auf Entgeltgruppen und Erfahrungsstufen, die grundsätzlich geschlechtsneutral sind. Dennoch müssen öffentliche Arbeitgeber die Auskunftspflicht erfüllen (Art. 7), in Stellenanzeigen die Eingruppierung und Gehaltsspanne angeben (Art. 5) und bei mehr als 250 MA ab 2027 über den GPG berichten (Art. 9). Zulagen, Leistungsprämien und Funktionszulagen unterliegen der vollen Transparenzpflicht.',
  },
  {
    question: 'Wie werden tarifliche Zulagen und Leistungsprämien bewertet?',
    answer:
      'Tarifliche Zulagen (z. B. Schichtzulagen, Funktionszulagen) und Leistungsprämien nach § 18 TVöD sind separate Entgeltbestandteile, die der vollen Transparenzpflicht unterliegen. Wenn diese Zulagen geschlechtsspezifisch ungleich verteilt werden — etwa weil bestimmte Funktionszulagen überwiegend an Männer gehen —, kann dies zu einem meldepflichtigen GPG führen.',
  },
  {
    question: 'Wie unterstützt APOS Legal tarifgebundene Arbeitgeber?',
    answer:
      'Wir analysieren die Schnittstelle zwischen Tarifvertrag und EU-Richtlinie: Prüfung der tariflichen Eingruppierung auf versteckte Diskriminierungsrisiken, Bewertung der AT-Vergütung, Vorbereitung auf Auskunftsanfragen, Aufbau des GPG-Berichtswesens und Schulung der Personalabteilung. Die Ersteinschätzung ist kostenlos.',
  },
];

export default function TarifbindungEntgelttransparenzPage() {
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
                    name: 'Tarifbindung & Entgelttransparenz',
                    item: `${SEO_CONFIG.baseUrl}/tarifbindung-entgelttransparenz`,
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
            <span className="text-ink">Tarifbindung &amp; Entgelttransparenz</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-cream-dark max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">Arbeitgeber · Tarifrecht</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Tarifbindung und Entgelttransparenz — Was Tarifunternehmen beachten müssen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Ein Tarifvertrag schützt nicht vollständig vor den Pflichten der EU-Entgelttransparenzrichtlinie (2023/970).
              Auskunftspflicht (Art. 7), Berichtspflicht (Art. 9) und Gehaltsspanne in Stellenanzeigen (Art. 5) gelten
              auch für tarifgebundene Unternehmen — besonders kritisch sind außertarifliche Beschäftigte.
              APOS Legal Heidelberg berät zu den Schnittstellen zwischen Tarifrecht und EU-Richtlinie.
            </p>
          </div>
        </header>

        {/* Tarifvermutung */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Die Tarifvermutung — und ihre Grenzen
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Art. 4 Abs. 5 der EU-Entgelttransparenzrichtlinie erkennt Tarifverträge grundsätzlich als
                geschlechtsneutrale Entgeltsysteme an, sofern sie von den Sozialpartnern ordnungsgemäß
                ausgehandelt wurden. Diese Vermutung erstreckt sich auf die tariflichen Entgeltgruppen
                und Stufensysteme.
              </p>
              <div className="bg-red-50 border border-red-200 rounded p-5 border-l-[4px] border-l-red-500 mb-4">
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  <strong>Achtung:</strong> Die Tarifvermutung befreit nicht von der Auskunftspflicht (Art. 7),
                  der Berichtspflicht (Art. 9), der Pflicht zur Gehaltsspanne in Stellenanzeigen (Art. 5) und
                  der Entgeltbewertung bei GPG über 5% (Art. 10). Zudem gilt sie nicht für außertarifliche
                  Gehaltsbestandteile und AT-Beschäftigte.
                </p>
              </div>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                In der Praxis bedeutet das: Auch tarifgebundene Unternehmen müssen ihre Vergütungsstrukturen
                analysieren, den GPG berechnen und Transparenzpflichten aktiv umsetzen — insbesondere bei
                Zulagen, Leistungsprämien und außertariflichen Vergütungen.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* TVöD / TV-L */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                TVöD und TV-L — Besonderheiten im öffentlichen Dienst
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Das Entgeltgruppensystem des TVöD und TV-L basiert auf tätigkeitsbezogenen Merkmalen und
                Erfahrungsstufen. Dies entspricht grundsätzlich den Anforderungen der EU-Richtlinie an
                objektive, geschlechtsneutrale Kriterien. Dennoch bestehen spezifische Pflichten:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  { title: 'Stellenanzeigen (Art. 5)', text: 'Angabe der Entgeltgruppe und der sich daraus ergebenden Gehaltsspanne — auch bei internen Ausschreibungen.' },
                  { title: 'Auskunftsrecht (Art. 7)', text: 'Beschäftigte können das Medianentgelt ihrer Vergleichsgruppe und die Eingruppierungskriterien erfragen. Frist: 2 Monate.' },
                  { title: 'Zulagen & Prämien', text: 'Leistungsprämien (§ 18 TVöD), Funktionszulagen und Erschwerniszuschläge unterliegen der vollen Transparenzpflicht und können den GPG beeinflussen.' },
                  { title: 'Berichtspflicht (Art. 9)', text: 'Öffentliche Arbeitgeber mit 250+ MA müssen ab 2027 über den GPG berichten — einschließlich aller Zulagen und Prämien.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-border-light rounded p-5">
                    <h3 className="font-semibold text-[0.95rem] text-ink mb-1.5">{item.title}</h3>
                    <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">{item.text}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* AT-Beschäftigte */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Außertarifliche Beschäftigte — das größte Risiko
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Außertarifliche (AT) Beschäftigte fallen nicht unter die Tarifvermutung des Art. 4 Abs. 5.
                Für sie gelten sämtliche Pflichten der EU-Richtlinie uneingeschränkt. Da AT-Gehälter
                häufig individuell verhandelt werden, ist das Diskriminierungsrisiko hier besonders hoch.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[200px]">Aspekt</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink">Tarifbeschäftigte</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink">AT-Beschäftigte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Entgeltkriterien', 'Tarifvermutung (Art. 4 Abs. 5)', 'Volle Nachweispflicht'],
                      ['Gehaltsfindung', 'Eingruppierung nach Tarifvertrag', 'Individuelle Verhandlung'],
                      ['GPG-Risiko', 'Gering (bei korrekter Eingruppierung)', 'Hoch (fehlende Standardisierung)'],
                      ['Vergleichsgruppe', 'Entgeltgruppe + Stufe', 'Muss eigens definiert werden'],
                      ['Auskunftsrecht', 'Gilt uneingeschränkt', 'Gilt uneingeschränkt'],
                    ].map(([aspekt, tarif, at], i) => (
                      <tr key={i}>
                        <td className="p-4 border border-border font-semibold text-ink">{aspekt}</td>
                        <td className="p-4 border border-border text-ink-light">{tarif}</td>
                        <td className="p-4 border border-border text-ink-light">{at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Handlungsempfehlungen */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Was tarifgebundene Arbeitgeber jetzt tun müssen
              </h2>
              <div className="space-y-3">
                {[
                  'Zulagen, Prämien und Funktionszulagen auf geschlechtsspezifische Verteilung prüfen',
                  'Für AT-Beschäftigte objektive Entgeltkriterien und Vergleichsgruppen definieren',
                  'Gehaltsspanne in allen Stellenanzeigen angeben (auch interne Ausschreibungen)',
                  'Prozess für Auskunftsanfragen etablieren — 2-Monats-Frist beachten',
                  'GPG für tarifliche und außertarifliche Beschäftigte getrennt berechnen',
                  'Bei GPG über 5% in AT-Bereich: Sofort Maßnahmenplan erstellen',
                  'Personalabteilung zu Schnittstelle Tarifvertrag/EU-RL schulen',
                  'Berichtspflicht ab 2027 vorbereiten (bei 250+ MA)',
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

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu Tarifbindung und Entgelttransparenz
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
              Tarifvertrag + EU-Richtlinie — Compliance sicherstellen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen die Schnittstelle zwischen Ihrem Tarifvertrag und der EU-Entgelttransparenzrichtlinie.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
            >
              Jetzt Ersteinschätzung anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
