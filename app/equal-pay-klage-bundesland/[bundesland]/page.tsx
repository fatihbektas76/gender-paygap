import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import { bundeslaender, getBundeslandBySlug } from '@/data/bundeslaender';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export function generateStaticParams() {
  return bundeslaender.map((bl) => ({ bundesland: bl.slug }));
}

type Props = { params: { bundesland: string } };

export function generateMetadata({ params }: Props): Metadata {
  const bl = getBundeslandBySlug(params.bundesland);
  if (!bl) return {};
  return buildMetadata({
    title: `Equal-Pay-Klage in ${bl.name} — Fachanwalt berät Sie (${new Date().getFullYear()})`,
    description: `Gender Pay Gap in ${bl.name}: ${bl.gpgProzent}%. Fachanwalt Fatih Bektas berät zur Equal-Pay-Klage beim ${bl.arbGStadt}. Kostenlose Ersteinschätzung.`,
    path: `/equal-pay-klage-${bl.slug}`,
  });
}

export default function EqualPayKlageBundeslandPage({ params }: Props) {
  const bl = getBundeslandBySlug(params.bundesland);
  if (!bl) notFound();

  const faqs = [
    {
      question: `Wie hoch ist der Gender Pay Gap in ${bl.name}?`,
      answer: `Der unbereinigte Gender Pay Gap in ${bl.name} beträgt ${bl.gpgProzent}% (Statistisches Bundesamt, Dezember 2025). ${bl.besonderheiten}`,
    },
    {
      question: `Welches Arbeitsgericht ist in ${bl.name} zuständig?`,
      answer: `Für Equal-Pay-Klagen in ${bl.name} ist in der Regel das ${bl.arbGStadt} zuständig. In der Berufungsinstanz entscheidet das ${bl.lagName}. Die örtliche Zuständigkeit richtet sich nach dem Sitz des Arbeitgebers oder dem Arbeitsort.`,
    },
    {
      question: `Wie läuft eine Equal-Pay-Klage in ${bl.name} ab?`,
      answer: `Der Ablauf folgt dem arbeitsgerichtlichen Verfahren: 1. Auskunftsantrag an den Arbeitgeber (2 Monate Frist). 2. Bei Gehaltslücke: außergerichtliche Geltendmachung. 3. Klage beim ${bl.arbGStadt} auf Nachzahlung und Entschädigung. 4. Güteverhandlung (meist innerhalb von 4-6 Wochen). 5. Kammertermin falls keine Einigung.`,
    },
    {
      question: `Was kostet eine Equal-Pay-Klage?`,
      answer: `Im arbeitsgerichtlichen Verfahren trägt jede Partei in der ersten Instanz ihre eigenen Anwaltskosten — unabhängig vom Ausgang. Die Gerichtskosten sind gering. Viele Rechtsschutzversicherungen decken arbeitsrechtliche Verfahren ab. APOS Legal bietet eine kostenlose Ersteinschätzung an.`,
    },
    {
      question: `Welche Beweise brauche ich für eine Equal-Pay-Klage in ${bl.name}?`,
      answer: `Dank der Beweislastumkehr (Art. 18 EU-RL 2023/970) müssen Sie nur eine Vermutung der Diskriminierung begründen. Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein Paarvergleich — der Vergleich mit einer einzigen Person in vergleichbarer Position — ausreicht. Der Arbeitgeber muss dann beweisen, dass keine Diskriminierung vorliegt.`,
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
                    name: `Equal-Pay-Klage ${bl.name}`,
                    item: `${SEO_CONFIG.baseUrl}/equal-pay-klage-${bl.slug}`,
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
            <span className="text-ink">Equal-Pay-Klage {bl.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-green-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Equal-Pay-Klage · {bl.name}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Equal-Pay-Klage in {bl.name} — Fachanwalt berät Sie
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Der Gender Pay Gap in {bl.name} beträgt {bl.gpgProzent}% (Statistisches Bundesamt, Dezember 2025).
              Wenn Sie weniger verdienen als Kollegen in vergleichbaren Positionen, haben Sie Anspruch auf
              Nachzahlung und Entschädigung. Fachanwalt Fatih Bektas vertritt Sie vor dem {bl.arbGStadt}.
            </p>
          </div>
        </header>

        {/* Statistik + Gericht */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                <div className="bg-green-bg border border-green-bg rounded p-6 text-center">
                  <div className="text-[2.5rem] font-extrabold text-green">{bl.gpgProzent}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Gender Pay Gap</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">{bl.name} · Destatis 2025</div>
                </div>
                <div className="bg-cream border border-border-light rounded p-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-ink-muted mb-2">Zuständiges Arbeitsgericht</div>
                  <div className="text-[1.1rem] font-bold text-ink">{bl.arbGStadt}</div>
                </div>
                <div className="bg-cream border border-border-light rounded p-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-ink-muted mb-2">Berufungsinstanz</div>
                  <div className="text-[1.1rem] font-bold text-ink">{bl.lagName}</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Besonderheiten */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Lokale Besonderheiten in {bl.name}
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                {bl.besonderheiten}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Verfahrensablauf */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Verfahrensablauf einer Equal-Pay-Klage in {bl.name}
              </h2>
              <div className="space-y-4">
                {[
                  { nr: '1', title: 'Auskunftsantrag stellen', text: `Verlangen Sie schriftlich Auskunft über das Durchschnittsentgelt für vergleichbare Positionen (Art. 7 EU-RL 2023/970). Ihr Arbeitgeber hat 2 Monate Zeit zu antworten.` },
                  { nr: '2', title: 'Ergebnis prüfen', text: 'Zeigt die Auskunft eine Gehaltslücke? Bereits ein Paarvergleich mit einer einzelnen Vergleichsperson reicht aus, um eine Diskriminierungsvermutung zu begründen (BAG Az. 8 AZR 300/24).' },
                  { nr: '3', title: 'Außergerichtliche Geltendmachung', text: 'Fordern Sie Ihren Arbeitgeber schriftlich zur Nachzahlung und zukünftigen Gleichbehandlung auf. Viele Fälle werden in dieser Phase bereits gelöst.' },
                  { nr: '4', title: `Klage beim ${bl.arbGStadt}`, text: `Bei Nichteinigung reichen Sie Klage beim zuständigen ${bl.arbGStadt} ein. Die Güteverhandlung findet meist innerhalb von 4–6 Wochen statt.` },
                  { nr: '5', title: 'Kammertermin und Urteil', text: `Falls in der Güteverhandlung keine Einigung erzielt wird, folgt der Kammertermin. In der Berufung entscheidet das ${bl.lagName}. Dank Beweislastumkehr muss der Arbeitgeber die Nichtdiskriminierung beweisen.` },
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
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[40px] px-8 bg-cream max-md:py-8 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.2rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine Statistik über die
                  gesamte Belegschaft vorlegen — ein einziger Vergleich mit einer Person in vergleichbarer
                  Position genügt. Dies gilt auch für Klagen vor dem {bl.arbGStadt}.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Equal-Pay-Klage in {bl.name}
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
              Equal-Pay-Klage in {bl.name} prüfen lassen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Fachanwalt Fatih Bektas prüft Ihren Anspruch und vertritt Sie vor dem {bl.arbGStadt}.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-green hover:bg-green-bg hover:-translate-y-0.5"
            >
              Jetzt Klage prüfen lassen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
