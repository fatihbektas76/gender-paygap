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
    title: `Gender Pay Gap in ${bl.name} — aktuelle Zahlen & Rechtslage (${new Date().getFullYear()})`,
    description: `Gender Pay Gap in ${bl.name}: ${bl.gpgProzent}%. Aktuelle Statistiken, Ursachen und Ihre Rechte nach EU-Richtlinie 2023/970. Fachanwalt berät. APOS Legal Heidelberg.`,
    path: `/gender-pay-gap-${bl.slug}`,
  });
}

const deutschlandGPG = 16;

export default function GenderPayGapBundeslandPage({ params }: Props) {
  const bl = getBundeslandBySlug(params.bundesland);
  if (!bl) notFound();

  const tageDifferenz = Math.round((bl.gpgProzent / 100) * 365);
  const differenzZuDE = bl.gpgProzent - deutschlandGPG;

  const faqs = [
    {
      question: `Wie hoch ist der Gender Pay Gap in ${bl.name}?`,
      answer: `Der unbereinigte Gender Pay Gap in ${bl.name} beträgt ${bl.gpgProzent}% (Statistisches Bundesamt, Dezember 2025). Das liegt ${differenzZuDE > 0 ? `${differenzZuDE} Prozentpunkte über` : differenzZuDE < 0 ? `${Math.abs(differenzZuDE)} Prozentpunkte unter` : 'genau auf'} dem Bundesdurchschnitt von ${deutschlandGPG}%. ${bl.besonderheiten}`,
    },
    {
      question: `Was sind die Ursachen des Gender Pay Gap in ${bl.name}?`,
      answer: `${bl.besonderheiten} Zusätzliche Faktoren sind die regionale Branchenstruktur, der Anteil von Frauen in Vollzeitbeschäftigung und die Tarifbindung. Der bereinigte Gender Pay Gap — bei gleicher Qualifikation, Position und Branche — ist geringer als der unbereinigte Wert.`,
    },
    {
      question: `Welche Rechte habe ich als Arbeitnehmer:in in ${bl.name}?`,
      answer: `Ab dem 7. Juni 2026 haben Beschäftigte in ${bl.name} das Recht, Auskunft über die durchschnittliche Vergütung vergleichbarer Positionen zu verlangen (Art. 7 EU-RL 2023/970). Bei nachgewiesener Entgeltdiskriminierung können Sie Entschädigung für bis zu 3 Jahre rückwirkend geltend machen. Das BAG hat mit Urteil Az. 8 AZR 300/24 bestätigt, dass ein einzelner Paarvergleich ausreicht.`,
    },
    {
      question: `Welches Arbeitsgericht ist in ${bl.name} zuständig?`,
      answer: `Für Equal-Pay-Klagen in ${bl.name} ist das ${bl.arbGStadt} zuständig. Die Berufungsinstanz ist das ${bl.lagName}. Die örtliche Zuständigkeit richtet sich nach dem Sitz des Arbeitgebers oder dem Arbeitsort.`,
    },
    {
      question: `Was können Arbeitgeber in ${bl.name} jetzt tun?`,
      answer: `Arbeitgeber sollten ihre Vergütungsstrukturen auf geschlechtsspezifische Unterschiede analysieren, objektive Entgeltkriterien dokumentieren und sich auf Auskunftsanfragen vorbereiten. Bei einem GPG über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht (Art. 10 EU-RL). APOS Legal bietet ein kostenloses Compliance-Audit als Ersteinschätzung.`,
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
                    name: bl.name,
                    item: `${SEO_CONFIG.baseUrl}/gender-pay-gap-${bl.slug}`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-gold-bg max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-gold transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/gender-pay-gap" className="hover:text-gold transition-colors no-underline text-ink-muted">Gender Pay Gap</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">{bl.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-gold-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">Gender Pay Gap · {bl.name}</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gender Pay Gap in {bl.name} — aktuelle Zahlen &amp; Rechtslage {new Date().getFullYear()}
            </h1>
            <p id="direktantwort" className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Der unbereinigte Gender Pay Gap in {bl.name} beträgt <strong>{bl.gpgProzent}%</strong> (Statistisches Bundesamt, Dezember 2025).
              Das {differenzZuDE > 0 ? `liegt ${differenzZuDE} Prozentpunkte über` : differenzZuDE < 0 ? `liegt ${Math.abs(differenzZuDE)} Prozentpunkte unter` : 'entspricht'} dem Bundesdurchschnitt von {deutschlandGPG}%.
              Die EU-Entgelttransparenzrichtlinie 2023/970 gibt Beschäftigten ab Juni 2026 neue Rechte.
            </p>
          </div>
        </header>

        {/* Statistik-Karten */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                <div className="bg-gold-bg border border-gold/20 rounded p-6 text-center">
                  <div className="text-[2.5rem] font-extrabold text-gold">{bl.gpgProzent}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Gender Pay Gap</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">{bl.name} · Destatis 2025</div>
                </div>
                <div className="bg-cream border border-border-light rounded p-6 text-center">
                  <div className="text-[2.2rem] font-extrabold text-ink">{deutschlandGPG}%</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Bundesdurchschnitt</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">Deutschland · Destatis 2025</div>
                </div>
                <div className="bg-gold-bg border border-gold/20 rounded p-6 text-center">
                  <div className="text-[2.2rem] font-extrabold text-gold">{tageDifferenz}</div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Tage unbezahlt</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">Equal Pay Day</div>
                </div>
                <div className="bg-cream border border-border-light rounded p-6 text-center">
                  <div className={`text-[2.2rem] font-extrabold ${differenzZuDE > 0 ? 'text-red-600' : differenzZuDE < 0 ? 'text-green' : 'text-ink'}`}>
                    {differenzZuDE > 0 ? '+' : ''}{differenzZuDE}
                  </div>
                  <div className="text-[0.85rem] text-ink-muted mt-1">Pp. vs. Bund</div>
                  <div className="text-[0.75rem] text-ink-muted mt-0.5">{differenzZuDE > 0 ? 'Über' : differenzZuDE < 0 ? 'Unter' : 'Auf'} Durchschnitt</div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Regionale Besonderheiten */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Regionale Besonderheiten in {bl.name}
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                {bl.besonderheiten}
              </p>
              <div className="bg-white border border-border-light rounded p-6 mt-4">
                <h3 className="font-semibold text-[0.95rem] mb-3">Zuständige Gerichte für Equal-Pay-Klagen</h3>
                <div className="space-y-2 text-[0.9rem] text-ink-light leading-relaxed">
                  <p className="m-0"><strong>Arbeitsgericht:</strong> {bl.arbGStadt}</p>
                  <p className="m-0"><strong>Berufungsinstanz:</strong> {bl.lagName}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Rechtliche Konsequenzen — Dual Audience */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Was bedeutet der Gender Pay Gap in {bl.name} für Sie?
              </h2>

              <div className="grid grid-cols-2 gap-5 mb-6 max-md:grid-cols-1">
                {/* AN-Karte */}
                <div className="bg-green-bg border border-green-bg rounded p-6 border-t-[3px] border-t-green">
                  <h3 className="font-serif text-[1.1rem] font-bold text-green mb-3">Für Arbeitnehmer</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-[0.9rem] text-ink-light leading-relaxed">
                    <li>Auskunftsrecht ab 7. Juni 2026 (Art. 7 EU-RL)</li>
                    <li>Entschädigung bis zu 3 Jahre rückwirkend</li>
                    <li>Beweislastumkehr — Arbeitgeber muss Nichtdiskriminierung beweisen</li>
                    <li>Ein Paarvergleich reicht (BAG Az. 8 AZR 300/24)</li>
                  </ul>
                  <div className="flex gap-3 mt-4">
                    <a href="/arbeitnehmer" className="text-[0.85rem] font-semibold text-green no-underline hover:underline">
                      Arbeitnehmer-Hub &rarr;
                    </a>
                    <a href={`/equal-pay-klage-${bl.slug}`} className="text-[0.85rem] font-semibold text-green no-underline hover:underline">
                      Klage in {bl.name} &rarr;
                    </a>
                  </div>
                </div>

                {/* AG-Karte */}
                <div className="bg-cream-dark border border-blue/20 rounded p-6 border-t-[3px] border-t-blue">
                  <h3 className="font-serif text-[1.1rem] font-bold text-blue mb-3">Für Arbeitgeber</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-[0.9rem] text-ink-light leading-relaxed">
                    <li>Auskunftspflicht ab Juni 2026</li>
                    <li>Berichtspflicht ab 2027 (250+ MA)</li>
                    <li>Gehaltsspanne in Stellenanzeigen (Art. 5)</li>
                    <li>Bußgelder bei Verstößen (Art. 23 EU-RL)</li>
                  </ul>
                  <div className="flex gap-3 mt-4">
                    <a href="/arbeitgeber" className="text-[0.85rem] font-semibold text-blue no-underline hover:underline">
                      Arbeitgeber-Hub &rarr;
                    </a>
                    <a href="/compliance-check-arbeitgeber" className="text-[0.85rem] font-semibold text-blue no-underline hover:underline">
                      Compliance-Check &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil */}
        <section className="py-[40px] px-8 bg-cream max-md:py-8 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <div className="bg-white border border-gold/30 rounded p-8 border-l-[4px] border-l-gold">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-gold mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.2rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.92rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine Statistik über die
                  gesamte Belegschaft vorlegen — ein einziger Vergleich mit einer Person in vergleichbarer
                  Position genügt. Dies gilt auch für Verfahren vor dem {bl.arbGStadt}.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Gender Pay Gap in {bl.name}
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
        <section className="py-[70px] px-8 bg-gold text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Gender Pay Gap in {bl.name} — wir beraten Sie
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Ob Arbeitnehmer oder Arbeitgeber — Fachanwalt Fatih Bektas berät Sie zu Ihren Rechten und Pflichten.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-gold hover:bg-gold-bg hover:-translate-y-0.5"
            >
              Kostenlose Ersteinschätzung &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
