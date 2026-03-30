import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import { getBrancheBySlug } from '@/data/branchen';
import { gehaltBenchmarks } from '@/data/gehalt-benchmark';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

// Template C: 12 branches (exclude handel, automobil, beratung, medien from full set)
const templateCSlugs = [
  'it', 'gesundheitswesen', 'bankwesen', 'einzelhandel', 'oeffentlicher-dienst',
  'produktion', 'bildung', 'pflege', 'versicherung', 'logistik', 'finanzwesen', 'chemie',
];

export function generateStaticParams() {
  return templateCSlugs.map((slug) => ({ branche: slug }));
}

type Props = { params: { branche: string } };

export function generateMetadata({ params }: Props): Metadata {
  const b = getBrancheBySlug(params.branche);
  if (!b) return {};
  return buildMetadata({
    title: `Gender Pay Gap in ${b.nameGenitiv} — aktuelle Zahlen & Rechtslage (${new Date().getFullYear()})`,
    description: `Gender Pay Gap in ${b.nameGenitiv}: ${b.gpgProzent}%. Aktuelle Statistiken, Ursachen und Ihre Rechte. Fachanwalt Fatih Bektas berät. APOS Legal Heidelberg.`,
    path: `/gender-pay-gap-${b.slug}`,
  });
}

export default function GenderPayGapBranchePage({ params }: Props) {
  const b = getBrancheBySlug(params.branche);
  if (!b) notFound();

  const benchmark = gehaltBenchmarks[b.slug];
  const differenz = benchmark ? benchmark.maenner - benchmark.frauen : null;
  const differenzMonat = differenz ? Math.round(differenz / 12) : null;
  const tageDifferenz = Math.round((b.gpgProzent / 100) * 365);

  const faqs = [
    {
      question: `Wie hoch ist der Gender Pay Gap in ${b.nameGenitiv}?`,
      answer: `Der unbereinigte Gender Pay Gap in ${b.nameGenitiv} beträgt ${b.gpgProzent}% (Statistisches Bundesamt, Dezember 2025). ${benchmark ? `Im Median verdienen Frauen ${benchmark.frauen.toLocaleString('de-DE')} € und Männer ${benchmark.maenner.toLocaleString('de-DE')} € pro Jahr.` : ''} ${b.besonderheiten}`,
    },
    {
      question: `Was sind die Hauptursachen für den Gender Pay Gap in ${b.nameGenitiv}?`,
      answer: `Die Ursachen in ${b.nameGenitiv} sind vielfältig: ${b.besonderheiten} Zusätzlich spielen vertikale Segregation (Frauen in niedrigeren Positionen), Teilzeitquoten und Verhandlungsnachteile eine Rolle.`,
    },
    {
      question: `Was kann ich als Arbeitnehmer:in gegen den Gender Pay Gap tun?`,
      answer: `Ab dem 7. Juni 2026 können Sie als Beschäftigte:r in ${b.nameGenitiv} Auskunft über das durchschnittliche Entgelt für vergleichbare Positionen verlangen (Art. 7 EU-RL 2023/970). Bei nachgewiesener Lohndiskriminierung können Sie Entschädigung für bis zu 3 Jahre rückwirkend geltend machen.`,
    },
    {
      question: `Welche Pflichten haben Arbeitgeber in ${b.nameGenitiv}?`,
      answer: `Arbeitgeber in ${b.nameGenitiv} müssen ab Juni 2026 das Auskunftsrecht ihrer Beschäftigten erfüllen. Unternehmen mit mehr als 250 Mitarbeitern müssen ab 2027 über den GPG berichten. Bei einem Gap über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat verpflichtend (Art. 10 EU-RL 2023/970).`,
    },
    {
      question: `Gibt es branchenspezifische Besonderheiten in ${b.nameGenitiv}?`,
      answer: `Ja. ${b.besonderheiten} Typische Arbeitgeber in ${b.nameGenitiv} sind ${b.typArbeitgeber}. Bei Fragen zum Auskunftsrecht ist in der Regel das ${b.arbGZustaendig} zuständig.`,
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
                  { '@type': 'ListItem', position: 2, name: 'Gender Pay Gap', item: `${SEO_CONFIG.baseUrl}/gender-pay-gap` },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: `${b.name}`,
                    item: `${SEO_CONFIG.baseUrl}/gender-pay-gap-${b.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-primary-50 max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-primary transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/gender-pay-gap" className="hover:text-primary transition-colors no-underline text-ink-muted">Gender Pay Gap</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{b.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-primary-50 max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">Gender Pay Gap · {b.name}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gender Pay Gap in {b.nameGenitiv} — aktuelle Zahlen &amp; Rechtslage {new Date().getFullYear()}
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Der unbereinigte Gender Pay Gap in {b.nameGenitiv} beträgt <strong>{b.gpgProzent}%</strong> (Statistisches Bundesamt, Dezember 2025).
              {differenzMonat && <> Das bedeutet: Frauen verdienen im Durchschnitt <strong>{differenzMonat.toLocaleString('de-DE')} € weniger pro Monat</strong> als ihre männlichen Kollegen.</>}
              {' '}Die EU-Entgelttransparenzrichtlinie gibt Ihnen ab Juni 2026 neue Rechte.
            </p>
          </div>
        </header>

        {/* Statistik-Karten */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                <div className="bg-primary-50 border border-primary/20 rounded p-6 text-center">
                  <div className="text-[2.5rem] font-extrabold text-primary-700">{b.gpgProzent}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Gender Pay Gap</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">{b.name}</div>
                </div>
                {benchmark && (
                  <>
                    <div className="bg-slate-50 border border-border-light rounded p-6 text-center">
                      <div className="text-[2.2rem] font-extrabold text-ink">{(benchmark.frauen / 1000).toFixed(0)}k €</div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Median Frauen/Jahr</div>
                    </div>
                    <div className="bg-slate-50 border border-border-light rounded p-6 text-center">
                      <div className="text-[2.2rem] font-extrabold text-ink">{(benchmark.maenner / 1000).toFixed(0)}k €</div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Median Männer/Jahr</div>
                    </div>
                  </>
                )}
                <div className="bg-primary-50 border border-primary/20 rounded p-6 text-center">
                  <div className="text-[2.2rem] font-extrabold text-primary-700">{tageDifferenz}</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Tage unbezahlt</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">Equal Pay Day</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Ursachen */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Ursachen des Gender Pay Gap in {b.nameGenitiv}
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                {b.besonderheiten}
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Betroffene Berufsgruppen in {b.nameGenitiv}:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-1.5">
                {b.typBerufe.map((beruf) => (
                  <li key={beruf} className="text-[0.95rem] text-ink-light leading-relaxed">{beruf}</li>
                ))}
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Typische Arbeitgeber: {b.typArbeitgeber}. Das zuständige Arbeitsgericht für Equal-Pay-Klagen ist
                in der Regel das {b.arbGZustaendig}.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Rechtliche Konsequenzen */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Rechtliche Konsequenzen — was bedeutet das für Sie?
              </h2>

              <div className="grid grid-cols-2 gap-5 mb-6 max-md:grid-cols-1">
                {/* AN-Karte */}
                <div className="bg-secondary-50 border border-secondary/20 rounded p-6 border-t-[3px] border-t-secondary">
                  <h3 className="font-serif text-[1.1rem] font-bold text-secondary-700 mb-3">Für Arbeitnehmer</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-[0.9rem] text-ink-light leading-relaxed">
                    <li>Auskunftsrecht ab 7. Juni 2026 (Art. 7 EU-RL)</li>
                    <li>Entschädigung bis zu 3 Jahre rückwirkend</li>
                    <li>Beweislastumkehr zu Ihrem Vorteil (Art. 18)</li>
                    <li>Paarvergleich reicht aus (BAG Az. 8 AZR 300/24)</li>
                  </ul>
                  <a href="/arbeitnehmer" className="inline-block mt-4 text-[0.9rem] font-semibold text-secondary-700 no-underline hover:text-secondary transition-colors">
                    Rechte als Arbeitnehmer &rarr;
                  </a>
                </div>

                {/* AG-Karte */}
                <div className="bg-accent-50 border border-accent/20 rounded p-6 border-t-[3px] border-t-accent">
                  <h3 className="font-serif text-[1.1rem] font-bold text-accent-700 mb-3">Für Arbeitgeber</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-[0.9rem] text-ink-light leading-relaxed">
                    <li>Auskunftspflicht ab Juni 2026</li>
                    <li>Berichtspflicht ab 2027 (250+ MA)</li>
                    <li>Gehaltsspanne in Stellenanzeigen (Art. 5)</li>
                    <li>Bußgelder bei Verstößen (Art. 23)</li>
                  </ul>
                  <a href="/arbeitgeber" className="inline-block mt-4 text-[0.9rem] font-semibold text-accent-700 no-underline hover:text-accent transition-colors">
                    Pflichten als Arbeitgeber &rarr;
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Gender Pay Gap in {b.nameGenitiv}
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
        <section className="py-[70px] px-8 bg-primary-700 text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Gender Pay Gap in {b.nameGenitiv} — Handeln Sie jetzt
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Ob als Arbeitnehmer oder Arbeitgeber — wir beraten Sie zu Ihren Rechten und Pflichten.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-primary-700 hover:bg-primary-50 hover:-translate-y-0.5"
            >
              Kostenlose Ersteinschätzung &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
