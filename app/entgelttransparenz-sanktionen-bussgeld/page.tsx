import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Sanktionen und Bußgelder bei Entgelttransparenz-Verstößen (${new Date().getFullYear()})`,
  description:
    'Art. 23 EU-RL: Bußgelder, Art. 21: Schadensersatz, Art. 18: Beweislastumkehr, Sammelklagen — konkrete Risiken für Arbeitgeber. Fachanwalt APOS Legal Heidelberg.',
  path: '/entgelttransparenz-sanktionen-bussgeld',
});

const faqs = [
  {
    question: 'Welche Bußgelder drohen bei Verstößen gegen die Entgelttransparenzrichtlinie?',
    answer:
      'Art. 23 der EU-Entgelttransparenzrichtlinie (2023/970) verlangt „wirksame, verhältnismäßige und abschreckende" Sanktionen. Die konkrete Bußgeldhöhe wird vom nationalen Gesetzgeber festgelegt. Orientierungswerte aus anderen EU-Staaten liegen bei bis zu 250.000 Euro je Verstoß. Wiederholte Verstöße führen zu deutlich höheren Sanktionen. Hinzu kommen Schadensersatzansprüche der betroffenen Beschäftigten.',
  },
  {
    question: 'Was umfasst der Schadensersatz nach Art. 21 der EU-Richtlinie?',
    answer:
      'Art. 21 gewährt betroffenen Beschäftigten einen vollständigen Schadensersatzanspruch: Nachzahlung der Entgeltdifferenz (rückwirkend für bis zu 3 Jahre), entgangene Boni und variable Vergütung, immaterielle Entschädigung (Schmerzensgeld) sowie Zinsen und Verfahrenskosten. Der Schadensersatz muss „vollständig und tatsächlich" sein und eine „abschreckende Wirkung" haben.',
  },
  {
    question: 'Wie funktioniert die Beweislastumkehr nach Art. 18?',
    answer:
      'Sobald eine Beschäftigte Tatsachen vorträgt, die eine Entgeltdiskriminierung vermuten lassen, kehrt sich die Beweislast um (Art. 18). Der Arbeitgeber muss dann beweisen, dass keine Diskriminierung vorliegt. Die Beweislastumkehr tritt auch automatisch ein, wenn der Arbeitgeber seine Transparenzpflichten nicht erfüllt — etwa bei verspäteter Auskunft oder fehlenden GPG-Berichten.',
  },
  {
    question: 'Können Gewerkschaften Sammelklagen einreichen?',
    answer:
      'Ja. Art. 15 Abs. 3 der EU-Richtlinie ermöglicht es Gewerkschaften, Betriebsräten und Gleichbehandlungsstellen, Verfahren im Namen oder zur Unterstützung mehrerer betroffener Beschäftigter einzuleiten. Durch die EU-Verbandsklagerichtlinie (2020/1828) können zudem qualifizierte Einrichtungen Sammelklagen erheben. Das Kumulationsrisiko für Arbeitgeber ist erheblich.',
  },
  {
    question: 'Wie kann APOS Legal das Sanktionsrisiko minimieren?',
    answer:
      'Wir führen ein präventives Compliance-Audit durch: Identifikation aller Risikobereiche, Aufbau rechtssicherer Entgeltstrukturen, Vorbereitung auf Auskunftsanfragen und Berichtspflichten, Schulung der Verantwortlichen. Bei bereits eingegangenen Auskunftsanfragen oder Klagen vertreten wir Sie vor Gericht. Die Ersteinschätzung ist kostenlos.',
  },
];

const risiken = [
  {
    titel: 'Bußgelder (Art. 23 EU-RL)',
    betrag: 'bis 250.000+ Euro',
    detail: 'Wirksame, verhältnismäßige und abschreckende Sanktionen bei Verstößen gegen Auskunfts-, Berichts- und Transparenzpflichten. Wiederholungstäter werden härter sanktioniert.',
  },
  {
    titel: 'Schadensersatz (Art. 21 EU-RL)',
    betrag: '3 Jahre rückwirkend',
    detail: 'Nachzahlung der Entgeltdifferenz, entgangene Boni, immaterielle Entschädigung, Zinsen. Pro betroffener Person können schnell 20.000–80.000 Euro zusammenkommen.',
  },
  {
    titel: 'Sammelklagen (Art. 15 Abs. 3)',
    betrag: 'Kumulationsrisiko',
    detail: 'Gewerkschaften und Verbände können Verfahren für mehrere Beschäftigte gleichzeitig einleiten. Bei 50 betroffenen Beschäftigten mit je 30.000 Euro Schaden: 1,5 Mio. Euro Gesamtrisiko.',
  },
  {
    titel: 'Beweislastumkehr (Art. 18)',
    betrag: 'Prozessrisiko',
    detail: 'Bei Pflichtverletzung muss der Arbeitgeber die Nichtdiskriminierung beweisen — ein erheblicher Nachteil im Verfahren, der häufig zu Vergleichen führt.',
  },
];

export default function EntgelttransparenzSanktionenBussgeldPage() {
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
                    name: 'Sanktionen & Bußgelder',
                    item: `${SEO_CONFIG.baseUrl}/entgelttransparenz-sanktionen-bussgeld`,
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
            <span className="text-ink">Sanktionen &amp; Bußgelder</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-cream-dark max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">Arbeitgeber · Sanktionen</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Sanktionen und Bußgelder bei Entgelttransparenz-Verstößen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Die EU-Entgelttransparenzrichtlinie (2023/970) sieht bei Verstößen &bdquo;wirksame, verhältnismäßige und
              abschreckende&ldquo; Sanktionen vor (Art. 23). Hinzu kommen Schadensersatzansprüche nach Art. 21, eine
              automatische Beweislastumkehr nach Art. 18 und die Möglichkeit von Sammelklagen nach Art. 15.
              APOS Legal Heidelberg berät zur Risikovermeidung und vertritt Sie bei Verfahren.
            </p>
          </div>
        </header>

        {/* Risiko-Übersicht */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[1.5rem] font-bold mb-8">
              Die vier Sanktionssäulen der EU-Richtlinie
            </h2>
            <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {risiken.map((r, i) => (
                <FadeUp key={r.titel} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-red-50/50 border border-red-100 rounded p-6 h-full">
                    <div className="text-[0.75rem] font-bold tracking-[0.1em] uppercase text-red-600 mb-2">{r.betrag}</div>
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{r.titel}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{r.detail}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Art. 23 Bußgelder */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 23 EU-RL — Bußgelder bei Pflichtverletzungen
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Art. 23 der EU-Richtlinie 2023/970 verpflichtet die Mitgliedstaaten, &bdquo;wirksame, verhältnismäßige
                und abschreckende&ldquo; Sanktionen festzulegen. Die konkrete Umsetzung erfolgt durch den nationalen
                Gesetzgeber. Aus den bisherigen Entwürfen und Erfahrungen anderer EU-Staaten ergeben sich
                Orientierungswerte:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink">Verstoß</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[180px]">Erwartbares Bußgeld</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Fehlende Gehaltsspanne in Stellenanzeige (Art. 5)', '5.000–50.000 Euro'],
                      ['Verspätete/verweigerte Auskunft (Art. 7)', '10.000–100.000 Euro'],
                      ['Fehlender GPG-Bericht (Art. 9)', '50.000–250.000 Euro'],
                      ['Keine Entgeltbewertung bei GPG > 5% (Art. 10)', '50.000–250.000 Euro'],
                      ['Vergeltungsmaßnahmen gegen Beschäftigte (Art. 25)', '25.000–150.000 Euro'],
                    ].map(([verstoss, strafe], i) => (
                      <tr key={i}>
                        <td className="p-4 border border-border text-ink-light">{verstoss}</td>
                        <td className="p-4 border border-border font-semibold text-red-600">{strafe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-3 mb-0">
                Orientierungswerte basierend auf EU-Vergleichsstaaten und Gesetzgebungsentwürfen. Die endgültigen
                Beträge werden vom deutschen Gesetzgeber festgelegt.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Art. 21 Schadensersatz */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 21 EU-RL — Schadensersatz für betroffene Beschäftigte
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Art. 21 der EU-Richtlinie gewährt Beschäftigten, die von Entgeltdiskriminierung betroffen sind,
                einen Anspruch auf vollständigen Schadensersatz. Dieser muss &bdquo;tatsächlich und wirksam&ldquo; sein und
                eine &bdquo;abschreckende Wirkung&ldquo; haben.
              </p>
              <div className="space-y-3">
                {[
                  { posten: 'Entgeltdifferenz', detail: 'Nachzahlung der Differenz zum Mediangehalt der Vergleichsgruppe — rückwirkend für bis zu 3 Jahre' },
                  { posten: 'Variable Vergütung', detail: 'Entgangene Boni, Provisionen, Zulagen und sonstige Gehaltsbestandteile' },
                  { posten: 'Immaterielle Entschädigung', detail: 'Schmerzensgeld für erlittene Diskriminierung — in der Praxis 3.000–15.000 Euro' },
                  { posten: 'Zinsen', detail: 'Verzugszinsen auf die Nachzahlung ab dem Zeitpunkt der Diskriminierung' },
                  { posten: 'Verfahrenskosten', detail: 'Der Arbeitgeber trägt die Kosten des Verfahrens bei Obsiegen der Beschäftigten' },
                ].map((p, i) => (
                  <div key={i} className="bg-cream border border-border-light rounded p-5 flex gap-4 max-md:flex-col">
                    <div className="font-semibold text-[0.92rem] text-ink min-w-[160px]">{p.posten}</div>
                    <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">{p.detail}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Art. 18 Beweislastumkehr */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 18 EU-RL — Automatische Beweislastumkehr
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Die Beweislastumkehr ist das schärfste prozessuale Instrument der EU-Richtlinie. Sie tritt
                in zwei Fällen ein:
              </p>
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 mb-4">
                <div className="bg-white border border-border-light rounded p-5">
                  <h3 className="font-semibold text-[0.95rem] text-ink mb-2">Vermutung durch Tatsachenvortrag</h3>
                  <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                    Legt eine Beschäftigte Tatsachen vor, die eine Diskriminierung vermuten lassen (z. B.
                    Gehaltsunterschied zur Vergleichsgruppe), muss der Arbeitgeber das Gegenteil beweisen.
                  </p>
                </div>
                <div className="bg-white border border-border-light rounded p-5">
                  <h3 className="font-semibold text-[0.95rem] text-ink mb-2">Automatisch bei Pflichtverletzung</h3>
                  <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                    Hat der Arbeitgeber seine Transparenzpflichten nicht erfüllt (verspätete Auskunft, fehlender
                    Bericht, keine Gehaltsspanne), tritt die Beweislastumkehr automatisch ein — ohne weiteren
                    Tatsachenvortrag.
                  </p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-5 border-l-[4px] border-l-red-500">
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  <strong>Praxisbedeutung:</strong> In der Praxis führt die Beweislastumkehr dazu, dass
                  Arbeitgeber ohne lückenlose Dokumentation kaum eine Chance haben, den Diskriminierungsvorwurf
                  zu entkräften. Die meisten Verfahren enden dann mit einem kostspieligen Vergleich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Rechenbeispiel */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Rechenbeispiel: Gesamtrisiko für ein Unternehmen mit 500 MA
              </h2>
              <div className="bg-cream-dark border border-blue/20 rounded p-6">
                <div className="space-y-3 text-[0.92rem] text-ink-light leading-relaxed">
                  <div className="flex justify-between border-b border-blue/10 pb-2">
                    <span>Bußgeld (fehlender GPG-Bericht + fehlende Gehaltsspannen)</span>
                    <span className="font-semibold text-ink whitespace-nowrap ml-4">ca. 150.000 Euro</span>
                  </div>
                  <div className="flex justify-between border-b border-blue/10 pb-2">
                    <span>Schadensersatz (30 betroffene Beschäftigte, je 25.000 Euro im Schnitt)</span>
                    <span className="font-semibold text-ink whitespace-nowrap ml-4">ca. 750.000 Euro</span>
                  </div>
                  <div className="flex justify-between border-b border-blue/10 pb-2">
                    <span>Anwalts- und Verfahrenskosten</span>
                    <span className="font-semibold text-ink whitespace-nowrap ml-4">ca. 100.000 Euro</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold text-ink">Gesamtrisiko</span>
                    <span className="font-extrabold text-red-600 text-[1.1rem] whitespace-nowrap ml-4">ca. 1.000.000 Euro</span>
                  </div>
                </div>
              </div>
              <p className="text-[0.82rem] text-ink-muted mt-3 mb-0">
                Modellrechnung auf Basis von Orientierungswerten. Das tatsächliche Risiko hängt von Unternehmensgröße,
                Branche und Art der Verstöße ab.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu Sanktionen und Bußgeldern
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
              Sanktionsrisiko minimieren — jetzt Compliance prüfen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir identifizieren Ihre Risikobereiche und machen Sie rechtzeitig compliant — bevor Bußgelder und Klagen drohen.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
            >
              Jetzt Risikoanalyse anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
