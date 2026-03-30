import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Entschädigung bei Entgeltdiskriminierung — bis zu 3 Jahre rückwirkend (${new Date().getFullYear()})`,
  description:
    'Entschädigung bei Entgeltdiskriminierung: Gehaltsdifferenz + Verzugszinsen + immaterielle Entschädigung. Bis zu 3 Jahre rückwirkend. Fachanwalt berechnet Ihren Anspruch.',
  path: '/entschaedigung-entgeltdiskriminierung',
});

const faqs = [
  {
    question: 'Wie weit reicht der Entschädigungsanspruch zurück?',
    answer: 'Nach Art. 21 EU-Richtlinie 2023/970 umfasst die Entschädigung die vollständige Gehaltsdifferenz für bis zu 3 Jahre rückwirkend. Die reguläre Verjährungsfrist nach § 195 BGB beträgt 3 Jahre, gerechnet ab dem Schluss des Jahres, in dem der Anspruch entstanden ist. Bei einer Gehaltsdifferenz von 500 €/Monat ergibt allein die Nachzahlung 18.000 €.',
  },
  {
    question: 'Welche Bestandteile hat die Entschädigung?',
    answer: 'Die Entschädigung besteht aus drei Komponenten: (1) vollständige Nachzahlung der Gehaltsdifferenz für bis zu 3 Jahre, (2) Verzugszinsen nach § 288 BGB (5 Prozentpunkte über dem Basiszinssatz ab Fälligkeit) und (3) immaterielle Entschädigung für die Diskriminierung selbst (§ 15 Abs. 2 AGG). Hinzu kommt der Anspruch auf zukünftige Gleichstellung.',
  },
  {
    question: 'Wie berechne ich meinen Entschädigungsanspruch?',
    answer: 'Grundlage ist die monatliche Gehaltsdifferenz zwischen Ihrem Gehalt und dem der Vergleichsperson. Diese wird mit der Anzahl der Monate (max. 36) multipliziert. Dazu kommen Verzugszinsen (aktuell 8,62 % p.a.) und immaterielle Entschädigung (typischerweise 3.000-6.000 €). Bei 400 € Differenz/Monat: 14.400 € + ca. 1.400 € Zinsen + 4.000 € immateriell = ca. 19.800 €.',
  },
  {
    question: 'Muss ich die Diskriminierung selbst beweisen?',
    answer: 'Nein. Dank der Beweislastumkehr nach Art. 18 EU-RL 2023/970 genügt es, eine Gehaltsdifferenz darzulegen. Das BAG hat mit Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein Paarvergleich ausreicht. Der Arbeitgeber muss dann nachweisen, dass die Differenz auf objektiven, geschlechtsneutralen Kriterien beruht.',
  },
  {
    question: 'Wann verjährt mein Entschädigungsanspruch?',
    answer: 'Die Verjährungsfrist beträgt 3 Jahre (§ 195 BGB), beginnend mit dem Schluss des Jahres der Kenntniserlangung. Zusätzlich müssen Sie den Entschädigungsanspruch nach § 15 Abs. 4 AGG innerhalb von 2 Monaten nach Kenntnis der Diskriminierung schriftlich geltend machen. Die Klagefrist nach § 61b ArbGG beträgt dann 3 Monate. Handeln Sie daher zeitnah.',
  },
];

export default function EntschaedigungEntgeltdiskriminierungPage() {
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
                    name: 'Entschädigung bei Entgeltdiskriminierung',
                    item: `${SEO_CONFIG.baseUrl}/entschaedigung-entgeltdiskriminierung`,
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
            <span className="text-ink">Entschädigung bei Entgeltdiskriminierung</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-green-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Arbeitnehmer · Entschädigung</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entschädigung bei Entgeltdiskriminierung — bis zu 3 Jahre rückwirkend
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Bei nachgewiesener Entgeltdiskriminierung haben Sie Anspruch auf die vollständige Gehaltsdifferenz
              für bis zu 3 Jahre rückwirkend, Verzugszinsen und eine immaterielle Entschädigung (Art. 21 EU-RL 2023/970).
              Bei 500 € monatlicher Differenz kann die Gesamtforderung schnell über 23.000 € betragen.
            </p>
          </div>
        </header>

        {/* Art. 21 Rechtsgrundlage */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 21 EU-RL 2023/970 — Ihr Anspruch auf vollständige Entschädigung
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die EU-Entgelttransparenzrichtlinie 2023/970 sieht in Art. 21 vor, dass Betroffene von
                Entgeltdiskriminierung <strong>vollständig entschädigt</strong> werden müssen. Dies umfasst
                nicht nur die Gehaltsnachzahlung, sondern auch Nebenleistungen wie Boni, Zulagen und
                betriebliche Altersvorsorge.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Laut Statistischem Bundesamt (Dezember 2025) verdienen Frauen in Deutschland im Median
                rund <strong>4.500 € pro Jahr weniger</strong> als Männer in vergleichbaren Positionen
                (bereinigter Gender Pay Gap: 6 %). Bei einer Betriebszugehörigkeit von 5 Jahren kann die
                rückwirkende Forderung (begrenzt auf 3 Jahre) schnell fünfstellige Beträge erreichen.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Die drei Komponenten der Entschädigung
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                <div className="bg-green-bg border border-green-bg rounded p-6">
                  <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Komponente 1</div>
                  <h3 className="font-serif text-[1.1rem] font-bold mb-2">Gehaltsdifferenz</h3>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                    Vollständige Nachzahlung der Differenz zwischen Ihrem Gehalt und dem der Vergleichsperson
                    — bis zu 36 Monate rückwirkend (Art. 21 EU-RL).
                  </p>
                </div>
                <div className="bg-cream border border-border-light rounded p-6">
                  <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">Komponente 2</div>
                  <h3 className="font-serif text-[1.1rem] font-bold mb-2">Verzugszinsen</h3>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                    5 Prozentpunkte über dem Basiszinssatz ab Fälligkeit jeder einzelnen Monatsrate
                    (§ 288 Abs. 1 BGB). Aktuell: ca. 8,62 % p.a.
                  </p>
                </div>
                <div className="bg-cream border border-border-light rounded p-6">
                  <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">Komponente 3</div>
                  <h3 className="font-serif text-[1.1rem] font-bold mb-2">Immaterielle Entschädigung</h3>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                    Ausgleich für die Diskriminierung selbst nach § 15 Abs. 2 AGG.
                    In der Praxis: typischerweise 3.000 bis 6.000 €.
                  </p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={2}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Berechnungsbeispiel: So hoch kann Ihre Entschädigung ausfallen
              </h2>
              <div className="bg-cream border border-border-light rounded p-6 mb-8">
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                  <strong>Ausgangslage:</strong> Frau M. verdient als Marketing-Managerin 4.200 € brutto/Monat.
                  Ihr männlicher Kollege in gleicher Position erhält 4.700 € brutto/Monat.
                  Differenz: <strong>500 €/Monat</strong>.
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-[0.95rem] text-ink-light">
                    <span>Gehaltsdifferenz (36 Monate)</span>
                    <span className="font-semibold">18.000 €</span>
                  </div>
                  <div className="flex justify-between text-[0.95rem] text-ink-light">
                    <span>Verzugszinsen (geschätzt, 8,62 % p.a.)</span>
                    <span className="font-semibold">ca. 1.800 €</span>
                  </div>
                  <div className="flex justify-between text-[0.95rem] text-ink-light">
                    <span>Immaterielle Entschädigung (§ 15 Abs. 2 AGG)</span>
                    <span className="font-semibold">ca. 4.000 €</span>
                  </div>
                  <div className="border-t border-border-light pt-2 flex justify-between text-[1.05rem] font-bold text-ink">
                    <span>Gesamtforderung</span>
                    <span className="text-green">ca. 23.800 €</span>
                  </div>
                </div>
                <p className="text-[0.85rem] text-ink-muted m-0">
                  Hinweis: Individuelle Berechnung durch Fachanwalt empfohlen. Zusätzlich Anspruch auf zukünftige Gehaltsanpassung.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Verjährung und Fristen — So sichern Sie Ihre Ansprüche
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Um Ihre Entschädigungsansprüche nicht zu verlieren, beachten Sie folgende Fristen:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>3 Jahre Verjährung</strong> für die Gehaltsnachzahlung (§ 195 BGB), ab Schluss des Jahres der Entstehung</li>
                <li className="text-[0.95rem] text-ink-light"><strong>2 Monate schriftliche Geltendmachung</strong> des Entschädigungsanspruchs nach § 15 Abs. 4 AGG, ab Kenntnis der Diskriminierung</li>
                <li className="text-[0.95rem] text-ink-light"><strong>3 Monate Klagefrist</strong> nach § 61b ArbGG, ab schriftlicher Geltendmachung</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Warten Sie nicht zu lange. Jeder Monat, der verstreicht, kann Ihren rückwirkenden Anspruch reduzieren.
                Das BAG hat mit <strong>Az. 8 AZR 300/24</strong> vom 23.10.2025 die Durchsetzung deutlich erleichtert:
                Ein Paarvergleich reicht als Nachweis aus.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Dies erleichtert die Durchsetzung von
                  Entschädigungsansprüchen erheblich — Sie brauchen keine unternehmensweite Statistik,
                  sondern nur den Vergleich mit einer Person in vergleichbarer Position.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Entschädigung bei Entgeltdiskriminierung
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
              Kostenlose Ersteinschätzung — Entschädigung berechnen lassen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir berechnen Ihren individuellen Entschädigungsanspruch und prüfen Ihre Erfolgsaussichten.
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
