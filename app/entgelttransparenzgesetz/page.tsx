import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Entgelttransparenzgesetz & EU-Richtlinie 2023/970 — Überblick (${new Date().getFullYear()})`,
  description:
    'Das Entgelttransparenzgesetz (EntgTranspG) und die EU-Richtlinie 2023/970: Was gilt ab 2026? Fachanwalt erklärt Auskunftsrecht, Berichtspflichten und Sanktionen.',
  path: '/entgelttransparenzgesetz',
});

const faqs = [
  {
    question: 'Was ist das Entgelttransparenzgesetz (EntgTranspG)?',
    answer: 'Das Entgelttransparenzgesetz von 2017 war Deutschlands erster Versuch, Gehaltstransparenz gesetzlich zu verankern. Es gewährt Beschäftigten in Unternehmen ab 200 Mitarbeitern ein individuelles Auskunftsrecht. Die EU-Richtlinie 2023/970 geht ab Juni 2026 deutlich weiter: Schwellenwert sinkt auf 50 MA, Berichtspflichten kommen hinzu, Beweislastumkehr gilt.',
  },
  {
    question: 'Wann tritt die EU-Entgelttransparenzrichtlinie in Kraft?',
    answer: 'Die EU-Richtlinie 2023/970 muss bis zum 7. Juni 2026 in nationales Recht umgesetzt werden. Ab diesem Datum gelten das erweiterte Auskunftsrecht, die Pflicht zur Gehaltstransparenz in Stellenanzeigen und die Beweislastumkehr. Berichtspflichten für Unternehmen ab 250 MA beginnen 2027.',
  },
  {
    question: 'Was ändert sich gegenüber dem bisherigen deutschen Gesetz?',
    answer: 'Die wichtigsten Verschärfungen: (1) Schwellenwert sinkt von 200 auf 50 Mitarbeiter, (2) Beweislastumkehr zugunsten der Beschäftigten bei Gehaltsdifferenzen, (3) verpflichtende Berichtspflichten ab 100 MA, (4) Gehaltsspannen in Stellenanzeigen werden Pflicht, (5) wirksame Sanktionen und Bußgelder bei Verstößen.',
  },
  {
    question: 'Gilt die EU-Richtlinie auch für den öffentlichen Dienst?',
    answer: 'Ja. Die EU-Richtlinie 2023/970 gilt für alle Arbeitgeber — privatwirtschaftlich und öffentlich-rechtlich. Der öffentliche Dienst mit seiner Tarifbindung (TVöD/TV-L) hat zwar strukturell geringere Pay Gaps, muss aber ebenfalls Auskunft erteilen und berichten.',
  },
  {
    question: 'Was ist der Unterschied zwischen unbereinigtem und bereinigtem GPG?',
    answer: 'Der unbereinigte Gender Pay Gap (16% in DE) vergleicht alle Gehälter ohne Berücksichtigung von Position, Branche oder Arbeitszeit. Der bereinigte GPG (~6%) berücksichtigt diese Faktoren und misst den „reinen" Diskriminierungsanteil. Die EU-Richtlinie adressiert beide: strukturelle Ursachen und direkte Diskriminierung.',
  },
];

const timeline = [
  { year: '2017', event: 'Entgelttransparenzgesetz (EntgTranspG) tritt in Deutschland in Kraft', detail: 'Auskunftsrecht ab 200 MA, keine Sanktionen' },
  { year: '2023', event: 'EU-Richtlinie 2023/970 verabschiedet (10. Mai 2023)', detail: 'Deutlich verschärfte Regelung mit Beweislastumkehr und Sanktionen' },
  { year: '2025', event: 'BAG-Urteil 8 AZR 300/24 (23. Oktober 2025)', detail: 'Paarvergleich reicht für Vermutung der Diskriminierung' },
  { year: '7. Juni 2026', event: 'Umsetzungsfrist EU-Richtlinie', detail: 'Auskunftsrecht ab 50 MA, Gehaltsspannen in Stellenanzeigen, Beweislastumkehr' },
  { year: '2027', event: 'Erste Berichtspflicht für Unternehmen ab 250 MA', detail: 'Jährlicher Bericht über geschlechtsspezifische Entgeltunterschiede' },
  { year: '2031', event: 'Berichtspflicht für Unternehmen ab 100 MA', detail: 'Bericht alle 3 Jahre an zuständige Behörde' },
];

export default function EntgelttransparenzgesetzPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <main>
        <header className="pt-[150px] pb-[80px] px-8 bg-slate-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">Das Gesetz</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entgelttransparenzgesetz & EU-Richtlinie 2023/970
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Das deutsche Entgelttransparenzgesetz von 2017 wird durch die EU-Richtlinie 2023/970 ab dem
              7. Juni 2026 grundlegend verschärft. Die Richtlinie bringt echte Durchsetzungsmechanismen:
              Beweislastumkehr, verpflichtende Berichtspflichten und wirksame Sanktionen bei Verstößen.
            </p>
          </div>
        </header>

        {/* Kernpunkte */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Die 5 wichtigsten Neuerungen ab 2026
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { num: '1', title: 'Auskunftsrecht ab 50 Mitarbeitern', text: 'Statt bisher 200 MA können ab 2026 alle Beschäftigten in Unternehmen ab 50 MA Auskunft über Vergleichsgehälter verlangen (Art. 7 EU-RL).' },
                { num: '2', title: 'Gehaltsspannen in Stellenanzeigen', text: 'Arbeitgeber müssen Bewerber:innen vor dem Vorstellungsgespräch über die Gehaltsspanne informieren (Art. 5 EU-RL).' },
                { num: '3', title: 'Beweislastumkehr', text: 'Bei festgestellten Gehaltsunterschieden muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt — nicht der Arbeitnehmer (Art. 18 EU-RL).' },
                { num: '4', title: 'Verpflichtende Berichtspflichten', text: 'Unternehmen ab 250 MA müssen ab 2027 jährlich über den GPG berichten. Ab 2031 gilt dies auch für Unternehmen ab 100 MA (Art. 9 EU-RL).' },
                { num: '5', title: 'Wirksame Sanktionen', text: 'Erstmals drohen echte Bußgelder und Schadensersatzansprüche. Betroffene können Entschädigung für bis zu 3 Jahre rückwirkend fordern (Art. 21, 23 EU-RL).' },
              ].map((item, i) => (
                <FadeUp key={item.num} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-slate-50 border border-border-light rounded p-6 h-full">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-bold text-[0.9rem] flex items-center justify-center mb-3">{item.num}</div>
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Zeitstrahl */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Zeitstrahl: Vom EntgTranspG zur EU-Richtlinie
            </h2>
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <FadeUp key={t.year} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-white rounded p-5 border border-border-light">
                    <div className="min-w-[100px] font-serif text-[1rem] font-bold text-primary-700 pt-0.5">{t.year}</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">{t.event}</div>
                      <div className="text-[0.88rem] text-ink-muted">{t.detail}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Vergleich AN vs AG */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <a href="/arbeitnehmer" className="block bg-secondary-50 border border-secondary/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Arbeitnehmer</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Was bedeutet das Gesetz für mich?</div>
              <div className="text-[0.88rem] text-ink-muted">Auskunftsrecht, Klage, Entschädigung &rarr;</div>
            </a>
            <a href="/arbeitgeber" className="block bg-accent-50 border border-accent/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2">Arbeitgeber</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Welche Pflichten hat mein Unternehmen?</div>
              <div className="text-[0.88rem] text-ink-muted">Compliance, Berichtspflichten, Audit &rarr;</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Entgelttransparenzgesetz
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* Signatur */}
        <div className="px-8 py-4 max-md:px-6">
          <div className="max-w-content mx-auto text-[0.82rem] text-ink-muted">
            Verfasst von Fatih Bektas, Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg.
            Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.
          </div>
        </div>

        <ContactForm />
      </main>
    </>
  );
}
