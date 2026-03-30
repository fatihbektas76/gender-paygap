import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import { branchen, getBrancheBySlug } from '@/data/branchen';
import { gehaltBenchmarks } from '@/data/gehalt-benchmark';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

// Template E: 15 branches (all except finanzwesen)
export function generateStaticParams() {
  return branchen
    .filter((b) => b.slug !== 'finanzwesen')
    .map((b) => ({ branche: b.slug }));
}

type Props = { params: { branche: string } };

export function generateMetadata({ params }: Props): Metadata {
  const b = getBrancheBySlug(params.branche);
  if (!b) return {};
  return buildMetadata({
    title: `Entgelttransparenz-Pflichten für Arbeitgeber in ${b.nameGenitiv} (${new Date().getFullYear()})`,
    description: `Was müssen Unternehmen in ${b.nameGenitiv} ab 2026 beachten? Fachanwalt erklärt Berichtspflichten & Compliance. APOS Legal Heidelberg.`,
    path: `/entgelttransparenz-arbeitgeber-${b.slug}`,
  });
}

export default function EntgelttransparenzArbeitgeberBranchePage({ params }: Props) {
  const b = getBrancheBySlug(params.branche);
  if (!b) notFound();

  const benchmark = gehaltBenchmarks[b.slug];
  const differenz = benchmark ? benchmark.maenner - benchmark.frauen : null;

  const faqs = [
    {
      question: `Welche Entgelttransparenz-Pflichten gelten für Arbeitgeber in ${b.nameGenitiv}?`,
      answer: `Arbeitgeber in ${b.nameGenitiv} müssen ab dem 7. Juni 2026 das Auskunftsrecht ihrer Beschäftigten erfüllen (Art. 7 EU-RL 2023/970). Unternehmen mit mehr als 250 Mitarbeitern müssen ab 2027 über den Gender Pay Gap berichten. Stellenanzeigen müssen eine Gehaltsspanne enthalten (Art. 5).`,
    },
    {
      question: `Wie hoch ist der Gender Pay Gap in ${b.nameGenitiv}?`,
      answer: `Der unbereinigte Gender Pay Gap in ${b.nameGenitiv} beträgt ${b.gpgProzent}% (Statistisches Bundesamt, Dezember 2025). ${b.besonderheiten} Bei einem bereinigten Gap über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat verpflichtend.`,
    },
    {
      question: `Welche Strafen drohen bei Verstößen?`,
      answer: `Bei Verstößen gegen die Entgelttransparenzpflichten drohen Bußgelder gemäß Art. 23 EU-RL 2023/970, Schadensersatzansprüche der Beschäftigten (einschließlich Nachzahlung und immaterieller Entschädigung) sowie Sammelklagen durch Gewerkschaften oder Verbände. Die Beweislastumkehr (Art. 18) stärkt die Position der Beschäftigten.`,
    },
    {
      question: `Was sind typische Compliance-Fallen in ${b.nameGenitiv}?`,
      answer: `${b.besonderheiten} Häufige Fehler: Unvollständige Dokumentation der Entgeltkriterien, fehlende Gehaltsspanne in Stellenanzeigen, verspätete Beantwortung von Auskunftsanfragen und mangelnde Einbindung des Betriebsrats bei der Entgeltbewertung.`,
    },
    {
      question: `Wie kann APOS Legal meinem Unternehmen helfen?`,
      answer: `APOS Legal bietet ein branchenspezifisches Compliance-Audit für Unternehmen in ${b.nameGenitiv}: Analyse der Vergütungsstrukturen, Identifikation von Risiken, Aufbau eines audit-ready Entgeltsystems, Schulung der Personalabteilung und Begleitung bei Auskunftsanfragen. Die Ersteinschätzung ist kostenlos.`,
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
                    name: `Entgelttransparenz ${b.name}`,
                    item: `${SEO_CONFIG.baseUrl}/entgelttransparenz-arbeitgeber-${b.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-accent-50 max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-primary transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitgeber" className="hover:text-primary transition-colors no-underline text-ink-muted">Arbeitgeber</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Entgelttransparenz {b.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-accent-50 max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">Arbeitgeber · {b.name}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entgelttransparenz-Pflichten für Arbeitgeber in {b.nameGenitiv}
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Arbeitgeber in {b.nameGenitiv} müssen ab dem 7. Juni 2026 Auskunft über Gehaltskriterien geben.
              In {b.nameGenitiv} beträgt der Gender Pay Gap {b.gpgProzent}% — bei über 5% ist eine gemeinsame
              Entgeltbewertung mit dem Betriebsrat Pflicht (Art. 9 EU-RL 2023/970).
              APOS Legal Heidelberg unterstützt Sie bei der Compliance.
            </p>
          </div>
        </header>

        {/* Statistik */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                <div className="bg-accent-50 border border-accent/20 rounded p-6 text-center">
                  <div className="text-[2.5rem] font-extrabold text-accent-700">{b.gpgProzent}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Gender Pay Gap in {b.nameGenitiv}</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">Destatis 2025</div>
                </div>
                {benchmark && differenz && (
                  <>
                    <div className="bg-slate-50 border border-border-light rounded p-6 text-center">
                      <div className="text-[2.2rem] font-extrabold text-ink">{differenz.toLocaleString('de-DE')} €</div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Gehaltsdifferenz pro Jahr</div>
                      <div className="text-[0.75rem] text-ink-muted mt-0.5">Median, {b.name}</div>
                    </div>
                    <div className={`border rounded p-6 text-center ${b.gpgProzent > 5 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                      <div className={`text-[2.2rem] font-extrabold ${b.gpgProzent > 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {b.gpgProzent > 5 ? 'Ja' : 'Nein'}
                      </div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Entgeltbewertung Pflicht?</div>
                      <div className="text-[0.75rem] text-ink-muted mt-0.5">(ab 5% GPG, Art. 10 EU-RL)</div>
                    </div>
                  </>
                )}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Branchenspezifische Vergütungsstrukturen */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Typische Vergütungsstrukturen in {b.nameGenitiv}
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                {b.besonderheiten}
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Betroffene Berufsgruppen, die häufig Auskunftsanfragen stellen:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1.5">
                {b.typBerufe.map((beruf) => (
                  <li key={beruf} className="text-[0.95rem] text-ink-light leading-relaxed">{beruf}</li>
                ))}
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Typische Arbeitgeber: {b.typArbeitgeber}.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Compliance-Fallen */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Häufige Compliance-Fallen in {b.nameGenitiv}
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'Unvollständige Entgeltkriterien', text: 'Die verwendeten Bewertungskriterien für die Vergütung müssen dokumentiert und auf Anfrage offengelegt werden. Viele Unternehmen haben keine systematische Dokumentation.' },
                  { title: 'Fehlende Gehaltsspanne in Stellenanzeigen', text: 'Ab Juni 2026 müssen Stellenanzeigen eine Gehaltsspanne oder das Einstiegsgehalt enthalten (Art. 5 EU-RL 2023/970). Verstöße können abgemahnt werden.' },
                  { title: 'Verspätete Auskunft', text: 'Auskunftsanfragen müssen innerhalb von 2 Monaten beantwortet werden. Bei Fristversäumnis tritt automatisch die Beweislastumkehr ein — der Arbeitgeber muss dann beweisen, dass keine Diskriminierung vorliegt.' },
                  { title: 'Kein Einbezug des Betriebsrats', text: 'Bei einem bereinigten GPG über 5% ist die gemeinsame Entgeltbewertung mit dem Betriebsrat verpflichtend. Eine einseitige Bewertung genügt nicht.' },
                ].map((item, i) => (
                  <div key={i} className="bg-red-50/50 border border-red-100 rounded p-5">
                    <h3 className="font-semibold text-[0.95rem] text-ink mb-1.5">{item.title}</h3>
                    <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">{item.text}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Checkliste */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Was Sie als Arbeitgeber in {b.nameGenitiv} jetzt tun müssen
              </h2>
              <div className="space-y-3">
                {[
                  'Vergütungsstrukturen analysieren und dokumentieren',
                  'Vergleichsgruppen für alle Positionen definieren',
                  'Gehaltskriterien objektiv und nachvollziehbar festlegen',
                  'Gehaltsspannen für alle offenen Stellen vorbereiten',
                  'Prozess für Auskunftsanfragen etablieren (2-Monats-Frist)',
                  'Betriebsrat frühzeitig einbinden',
                  'GPG berechnen und ggf. Maßnahmenplan erstellen',
                  'Personalabteilung zu Entgelttransparenz schulen',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 min-w-[24px] rounded-full bg-accent-50 border border-accent/30 flex items-center justify-center text-accent-700 text-[0.75rem] font-bold mt-0.5">
                      &#10003;
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">{item}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Risiken */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Risiken bei Nichthandeln
              </h2>
              <div className="bg-red-50 border border-red-200 rounded p-6 border-l-[4px] border-l-red-500">
                <ul className="list-disc pl-5 space-y-2 text-[0.95rem] text-ink-light leading-relaxed m-0">
                  <li><strong>Bußgelder</strong> gemäß Art. 23 EU-RL 2023/970 bei Verstößen gegen Berichts- und Auskunftspflichten</li>
                  <li><strong>Schadensersatzansprüche</strong> einzelner Beschäftigter — bis zu 3 Jahre rückwirkend (Art. 21)</li>
                  <li><strong>Sammelklagen</strong> durch Gewerkschaften oder Beschäftigtenverbände</li>
                  <li><strong>Beweislastumkehr</strong> — bei Verstößen müssen Sie die Nichtdiskriminierung beweisen (Art. 18)</li>
                  <li><strong>Reputationsschaden</strong> durch öffentliche Berichterstattung über GPG-Berichte</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Entgelttransparenz in {b.nameGenitiv}
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
        <section className="py-[70px] px-8 bg-accent-700 text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Compliance-Audit für {b.typArbeitgeber}
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Vergütungsstrukturen und machen Sie rechtzeitig compliant — speziell für {b.nameGenitiv}.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
            >
              Jetzt Compliance-Audit anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
