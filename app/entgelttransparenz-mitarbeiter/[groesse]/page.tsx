import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import { unternehmensgroessen, getGroesseBySlug } from '@/data/unternehmensgroesse';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export function generateStaticParams() {
  return unternehmensgroessen.map((g) => ({ groesse: g.slug }));
}

type Props = { params: { groesse: string } };

export function generateMetadata({ params }: Props): Metadata {
  const g = getGroesseBySlug(params.groesse);
  if (!g) return {};
  return buildMetadata({
    title: `Entgelttransparenz für Unternehmen mit ${g.bereich} — Pflichten ab 2026 (${new Date().getFullYear()})`,
    description: `Welche Pflichten gelten ab 2026 für Unternehmen mit ${g.bereich}? Fachanwalt klärt Berichtspflichten & Auskunftsrecht. APOS Legal Heidelberg.`,
    path: `/entgelttransparenz-${g.slug}-mitarbeiter`,
  });
}

export default function EntgelttransparenzGroessePage({ params }: Props) {
  const g = getGroesseBySlug(params.groesse);
  if (!g) notFound();

  const faqs = [
    {
      question: `Welche Pflichten gelten für Unternehmen mit ${g.bereich}?`,
      answer: `Unternehmen mit ${g.schwellenwert}n müssen ab dem ${g.auskunftsrechtAb} das individuelle Auskunftsrecht ihrer Beschäftigten erfüllen (Art. 7 EU-Richtlinie 2023/970). ${g.berichtspflichtAb ? `Zusätzlich greift die Berichtspflicht ab ${g.berichtspflichtAb} (Art. 9 EU-RL).` : 'Eine Berichtspflicht besteht für diese Unternehmensgröße nicht.'} ${g.besonderheit}`,
    },
    {
      question: `Ab wann gilt das Auskunftsrecht für meine Beschäftigten?`,
      answer: `Das individuelle Auskunftsrecht gilt ab dem ${g.auskunftsrechtAb}. Ihre Beschäftigten können dann Auskunft über das durchschnittliche Entgelt für vergleichbare Positionen verlangen — aufgeschlüsselt nach Geschlecht. Sie müssen innerhalb von 2 Monaten antworten.`,
    },
    {
      question: `Welche Bußgelder drohen bei Verstößen?`,
      answer: g.bussgeldRisiko,
    },
    {
      question: `Brauche ich als Unternehmen mit ${g.bereich} eine Berichtspflicht?`,
      answer: g.berichtspflichtAb
        ? `Ja. Unternehmen mit ${g.schwellenwert}n müssen ab ${g.berichtspflichtAb} über den geschlechtsspezifischen Entgeltunterschied berichten. Bei einem Gap über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat verpflichtend (Art. 10 EU-RL 2023/970).`
        : `Nein. Für Unternehmen mit ${g.bereich} besteht keine Berichtspflicht. Aber: Das Auskunftsrecht gilt ab ${g.auskunftsrechtAb}, und Sie müssen auf individuelle Anfragen innerhalb von 2 Monaten reagieren.`,
    },
    {
      question: `Wie bereite ich mein Unternehmen auf die Entgelttransparenz vor?`,
      answer: `Beginnen Sie jetzt mit der Analyse Ihrer Vergütungsstrukturen: Identifizieren Sie Vergleichsgruppen, dokumentieren Sie Ihre Entgeltkriterien, und prüfen Sie, ob systematische Gehaltslücken bestehen. APOS Legal bietet ein Compliance-Audit speziell für Unternehmen mit ${g.bereich} an.`,
    },
  ];

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
                    name: `${g.bereich}`,
                    item: `${SEO_CONFIG.baseUrl}/entgelttransparenz-${g.slug}-mitarbeiter`,
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
            <span className="text-ink">{g.bereich}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-cream-dark max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">Arbeitgeber · {g.bereich}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entgelttransparenz für Unternehmen mit {g.bereich}
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Unternehmen mit {g.schwellenwert}n müssen ab dem {g.auskunftsrechtAb} das individuelle Auskunftsrecht
              ihrer Beschäftigten erfüllen (Art. 7 EU-Richtlinie 2023/970).
              {g.berichtspflichtAb && <> Die Berichtspflicht greift ab {g.berichtspflichtAb} (Art. 9 EU-RL).</>}
              {' '}APOS Legal Heidelberg berät Sie zur rechtzeitigen Compliance.
            </p>
          </div>
        </header>

        {/* Pflichten-Checkliste */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Ihre Pflichten als Arbeitgeber mit {g.bereich}
              </h2>
              <div className="space-y-3 mb-8">
                {g.pflichten.map((pflicht, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 min-w-[24px] rounded-full bg-cream-dark border border-blue/30 flex items-center justify-center text-blue text-[0.75rem] font-bold mt-0.5">
                      &#10003;
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">{pflicht}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Zeitplan */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Zeitplan: Was wann gilt
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="min-w-[90px] text-[0.85rem] font-bold text-blue">Juni 2026</div>
                  <div className="text-[0.95rem] text-ink-light leading-relaxed">
                    <strong>Auskunftsrecht</strong> — Alle Beschäftigten können Auskunft über Vergleichsgehälter verlangen. Antwortfrist: 2 Monate.
                  </div>
                </div>
                {g.berichtspflichtAb && (
                  <div className="flex gap-4 items-start">
                    <div className="min-w-[90px] text-[0.85rem] font-bold text-blue">{g.berichtspflichtAb}</div>
                    <div className="text-[0.95rem] text-ink-light leading-relaxed">
                      <strong>Berichtspflicht</strong> — Erster Bericht über den Gender Pay Gap fällig. Bei GPG &gt; 5%: gemeinsame Entgeltbewertung mit Betriebsrat.
                    </div>
                  </div>
                )}
                <div className="flex gap-4 items-start">
                  <div className="min-w-[90px] text-[0.85rem] font-bold text-blue">Laufend</div>
                  <div className="text-[0.95rem] text-ink-light leading-relaxed">
                    <strong>Stellenanzeigen</strong> — Müssen Gehaltsspanne oder Einstiegsgehalt enthalten (Art. 5 EU-RL 2023/970).
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Risiken */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Risiken bei Verstößen
              </h2>
              <div className="bg-red-50 border border-red-200 rounded p-6 border-l-[4px] border-l-red-500">
                <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">
                  {g.bussgeldRisiko}
                </p>
              </div>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mt-4 mb-0">
                {g.besonderheit}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen für Unternehmen mit {g.bereich}
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
              Compliance-Audit für Unternehmen mit {g.bereich}
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Vergütungsstrukturen und machen Sie rechtzeitig compliant.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
            >
              Jetzt Compliance-Audit anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
