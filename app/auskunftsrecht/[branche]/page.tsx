import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import { branchen, getBrancheBySlug } from '@/data/branchen';
import { gehaltBenchmarks } from '@/data/gehalt-benchmark';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export function generateStaticParams() {
  // exclude 'finanzwesen' — only 15 branches for Template A (finanzwesen overlaps with bankwesen)
  return branchen
    .filter((b) => b.slug !== 'finanzwesen')
    .map((b) => ({ branche: b.slug }));
}

type Props = { params: { branche: string } };

export function generateMetadata({ params }: Props): Metadata {
  const b = getBrancheBySlug(params.branche);
  if (!b) return {};
  return buildMetadata({
    title: `Auskunftsrecht in ${b.nameGenitiv} — Equal Pay prüfen lassen (${new Date().getFullYear()})`,
    description: `Gender Pay Gap in ${b.nameGenitiv}: ${b.gpgProzent}%. Fachanwalt klärt Ihr Auskunftsrecht und hilft bei Equal-Pay-Klage. Kostenlose Ersteinschätzung. APOS Legal.`,
    path: `/auskunftsrecht-${b.slug}`,
  });
}

export default function AuskunftsrechtBranchePage({ params }: Props) {
  const b = getBrancheBySlug(params.branche);
  if (!b) notFound();

  const benchmark = gehaltBenchmarks[b.slug];
  const differenz = benchmark ? benchmark.maenner - benchmark.frauen : null;

  const faqs = [
    {
      question: `Habe ich als Beschäftigte:r in ${b.nameGenitiv} ein Auskunftsrecht?`,
      answer: `Ja. Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen mit mehr als 50 Mitarbeitern das Recht auf Auskunft über das durchschnittliche Entgelt für gleiche oder gleichwertige Arbeit — aufgeschlüsselt nach Geschlecht (Art. 7 EU-Richtlinie 2023/970). Das gilt auch für ${b.typBerufe[0]} und andere Berufsgruppen in ${b.nameGenitiv}.`,
    },
    {
      question: `Wie hoch ist der Gender Pay Gap in ${b.nameGenitiv}?`,
      answer: `Der unbereinigte Gender Pay Gap in ${b.nameGenitiv} beträgt durchschnittlich ${b.gpgProzent}% (Statistisches Bundesamt, Dezember 2025). ${b.besonderheiten}`,
    },
    {
      question: `Wie stelle ich einen Auskunftsantrag bei meinem Arbeitgeber?`,
      answer: `Der Auskunftsantrag kann schriftlich oder per E-Mail gestellt werden. Der Arbeitgeber muss innerhalb von 2 Monaten antworten (Art. 7 Abs. 4 EU-RL). Antworten müssen das durchschnittliche Entgelt nach Geschlecht und die verwendeten Bewertungskriterien enthalten. Bei Nichtbeantwortung tritt automatisch die Beweislastumkehr ein.`,
    },
    {
      question: `Was passiert, wenn mein Arbeitgeber die Auskunft verweigert?`,
      answer: `Bei Nichtbeantwortung oder unvollständiger Auskunft greift die Beweislastumkehr (Art. 18 EU-RL 2023/970): Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt. Zusätzlich können Sie Klage beim zuständigen ${b.arbGZustaendig} einreichen.`,
    },
    {
      question: `Kann ich wegen der Auskunftsanfrage benachteiligt werden?`,
      answer: `Nein. Die EU-Richtlinie enthält ein ausdrückliches Benachteiligungsverbot (Art. 25). Arbeitnehmer, die ihr Auskunftsrecht wahrnehmen, dürfen nicht gekündigt, versetzt oder anderweitig benachteiligt werden. Das BAG hat dies mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt.`,
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
                  { '@type': 'ListItem', position: 2, name: 'Arbeitnehmer', item: `${SEO_CONFIG.baseUrl}/arbeitnehmer` },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: `Auskunftsrecht ${b.name}`,
                    item: `${SEO_CONFIG.baseUrl}/auskunftsrecht-${b.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-green-bg max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-gold transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitnehmer" className="hover:text-gold transition-colors no-underline text-ink-muted">Arbeitnehmer</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Auskunftsrecht {b.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-green-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Auskunftsrecht · {b.name}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Auskunftsrecht in {b.nameGenitiv} — Equal Pay prüfen lassen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Beschäftigte in {b.nameGenitiv} haben ab dem 7. Juni 2026 das Recht, von Arbeitgebern Auskunft über das
              durchschnittliche Entgelt für gleiche oder gleichwertige Arbeit zu verlangen — aufgeschlüsselt nach Geschlecht.
              In {b.nameGenitiv} beträgt der Gender Pay Gap durchschnittlich {b.gpgProzent}% (Statistisches Bundesamt, Dezember 2025).
              Fachanwalt Fatih Bektas berät Sie zu Ihren Möglichkeiten.
            </p>
          </div>
        </header>

        {/* Statistik-Karte */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                <div className="bg-green-bg border border-green-bg rounded p-6 text-center">
                  <div className="text-[2.5rem] font-extrabold text-green">{b.gpgProzent}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Gender Pay Gap in {b.nameGenitiv}</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">Destatis 2025</div>
                </div>
                {benchmark && (
                  <>
                    <div className="bg-cream border border-border-light rounded p-6 text-center">
                      <div className="text-[2.5rem] font-extrabold text-ink">{(benchmark.frauen / 1000).toFixed(0)}k €</div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Median Jahresgehalt Frauen</div>
                      <div className="text-[0.75rem] text-ink-muted mt-0.5">{b.name} · Destatis 2025</div>
                    </div>
                    <div className="bg-cream border border-border-light rounded p-6 text-center">
                      <div className="text-[2.5rem] font-extrabold text-ink">{(benchmark.maenner / 1000).toFixed(0)}k €</div>
                      <div className="text-[0.85rem] text-ink-muted mt-1">Median Jahresgehalt Männer</div>
                      <div className="text-[0.75rem] text-ink-muted mt-0.5">{b.name} · Destatis 2025</div>
                    </div>
                  </>
                )}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Content-Abschnitte */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Wie hoch ist der Gender Pay Gap in {b.nameGenitiv}?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Der unbereinigte Gender Pay Gap in {b.nameGenitiv} liegt bei <strong>{b.gpgProzent}%</strong> (Statistisches Bundesamt, Dezember 2025).
                {differenz && (
                  <> Das bedeutet: Frauen verdienen im Median <strong>{differenz.toLocaleString('de-DE')} € pro Jahr weniger</strong> als
                  ihre männlichen Kollegen in vergleichbaren Positionen.</>
                )}
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                {b.besonderheiten}
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Welche Berufsgruppen sind betroffen?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                In {b.nameGenitiv} betrifft die Gehaltslücke besonders folgende Berufsgruppen:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-1.5">
                {b.typBerufe.map((beruf) => (
                  <li key={beruf} className="text-[0.95rem] text-ink-light leading-relaxed">{beruf}</li>
                ))}
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Typische Arbeitgeber in dieser Branche sind {b.typArbeitgeber}. All diese Unternehmen
                müssen ab Juni 2026 das Auskunftsrecht ihrer Beschäftigten erfüllen, sofern sie mehr als 50 Mitarbeiter beschäftigen.
              </p>
            </FadeUp>

            <FadeUp delay={2}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Wie stelle ich einen Auskunftsantrag?
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { nr: '1', title: 'Antrag schriftlich stellen', text: 'Formulieren Sie Ihren Auskunftsantrag schriftlich oder per E-Mail an die Personalabteilung. Nennen Sie Ihre Berufsbezeichnung und fragen Sie nach dem durchschnittlichen Entgelt für vergleichbare Positionen — aufgeschlüsselt nach Geschlecht.' },
                  { nr: '2', title: 'Frist abwarten (2 Monate)', text: 'Der Arbeitgeber muss innerhalb von 2 Monaten antworten (Art. 7 Abs. 4 EU-RL 2023/970). Die Auskunft muss das Durchschnittsentgelt nach Geschlecht und die verwendeten Bewertungskriterien enthalten.' },
                  { nr: '3', title: 'Ergebnis prüfen lassen', text: 'Zeigt die Auskunft eine Gehaltslücke? Ein Fachanwalt kann prüfen, ob ein Entgeltdiskriminierungsanspruch besteht und welche Entschädigung möglich ist.' },
                ].map((step) => (
                  <div key={step.nr} className="flex gap-4">
                    <div className="w-9 h-9 min-w-[36px] rounded-full bg-green-bg border border-green/30 flex items-center justify-center text-green font-bold text-[0.85rem]">
                      {step.nr}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[0.95rem] mb-1">{step.title}</h3>
                      <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Was passiert nach dem Auskunftsantrag?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Ergibt die Auskunft eine Gehaltslücke, bestehen folgende Möglichkeiten:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Gehaltsanpassung verlangen</strong> — fordern Sie Ihren Arbeitgeber auf, die Diskriminierung zu beseitigen</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Entschädigung geltend machen</strong> — bis zu 3 Jahre rückwirkend (Art. 21 EU-RL 2023/970)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Klage einreichen</strong> — beim zuständigen Arbeitsgericht, mit Beweislastumkehr zu Ihrem Vorteil</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass bereits ein <strong>Paarvergleich</strong> — der
                Vergleich mit einer einzelnen Person in vergleichbarer Position — ausreicht, um eine Vermutung der Entgeltdiskriminierung
                zu begründen.
              </p>
            </FadeUp>

            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Klage beim {b.arbGZustaendig} einreichen
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Für Beschäftigte in {b.nameGenitiv} ist in der Regel das <strong>{b.arbGZustaendig}</strong> zuständig.
                Die Klage kann auf Nachzahlung der Gehaltsdifferenz, immaterielle Entschädigung und
                zukünftige Gleichbehandlung gerichtet werden.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Fachanwalt Fatih Bektas von APOS Legal Heidelberg unterstützt Sie bei der Durchsetzung Ihres Auskunftsrechts
                und bei der Vorbereitung einer Equal-Pay-Klage — von der Ersteinschätzung bis zum Gerichtsverfahren.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Auskunftsrecht in {b.nameGenitiv}
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
        <section className="py-[70px] px-8 bg-green text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Kostenlose Ersteinschätzung — Auskunftsrecht in {b.nameGenitiv}
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen, ob Sie Anspruch auf Auskunft, Nachzahlung oder Entschädigung haben.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-green hover:bg-green-bg hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
