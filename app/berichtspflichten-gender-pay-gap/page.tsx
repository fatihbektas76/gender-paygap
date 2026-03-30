import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Berichtspflichten zum Gender Pay Gap — Was Unternehmen wissen müssen (${new Date().getFullYear()})`,
  description:
    'Art. 9 EU-RL 2023/970: Berichtspflichten für Unternehmen ab 250 MA (2027) und 100 MA (2031). Inhalte, Fristen und gemeinsame Entgeltbewertung bei GPG > 5 %. Fachanwalt erklärt.',
  path: '/berichtspflichten-gender-pay-gap',
});

const faqs = [
  {
    question: 'Welche Unternehmen müssen über den Gender Pay Gap berichten?',
    answer:
      'Unternehmen ab 250 Mitarbeitern müssen ab dem 7. Juni 2027 jährlich berichten. Unternehmen mit 100 bis 249 Mitarbeitern sind ab dem 7. Juni 2031 berichtspflichtig — dann alle 3 Jahre (Art. 9 Abs. 2 und 3 EU-RL 2023/970). Unternehmen unter 100 MA sind von der Berichtspflicht ausgenommen, müssen aber das Auskunftsrecht erfüllen.',
  },
  {
    question: 'Was muss der Entgelttransparenzbericht enthalten?',
    answer:
      'Art. 9 Abs. 1 EU-RL verlangt: (1) geschlechtsspezifischer Entgeltunterschied als Median und Mittelwert, (2) GPG bei variablen und ergänzenden Vergütungsbestandteilen, (3) Anteil weiblicher/männlicher Beschäftigter je Entgeltquartil, (4) GPG aufgeschlüsselt nach Beschäftigtenkategorien und (5) Anteil der Beschäftigten mit Zugang zu variablen Bestandteilen.',
  },
  {
    question: 'Was passiert bei einem Gender Pay Gap über 5 %?',
    answer:
      'Wenn der Bericht einen nicht objektiv gerechtfertigten GPG von über 5 % in einer Vergütungskategorie ausweist, muss der Arbeitgeber innerhalb von 6 Monaten eine gemeinsame Entgeltbewertung mit den Arbeitnehmervertretern durchführen (Art. 10 EU-RL). Daraus muss ein Aktionsplan zur Beseitigung des Gaps hervorgehen.',
  },
  {
    question: 'An wen wird der Bericht übermittelt?',
    answer:
      'Der Bericht wird an die vom nationalen Gesetzgeber benannte zuständige Überwachungsbehörde übermittelt (Art. 29 EU-RL). Zusätzlich müssen die Informationen den Arbeitnehmervertretern zugänglich gemacht werden. Art. 9 Abs. 9 sieht vor, dass bestimmte Daten auch öffentlich zugänglich sein können.',
  },
  {
    question: 'Wie bereite ich den ersten Bericht vor?',
    answer:
      'Beginnen Sie 12 bis 18 Monate vor der Frist: (1) Vergütungsdaten bereinigen und nach Beschäftigtenkategorien strukturieren, (2) Vergleichsgruppen definieren (gleiche oder gleichwertige Arbeit), (3) variable Bestandteile erfassen, (4) GPG pro Kategorie berechnen, (5) bei Gap > 5 % sofort Maßnahmen einleiten. Ein Fachanwalt kann die rechtssichere Aufbereitung begleiten.',
  },
];

const berichtsInhalte = [
  { nr: '1', titel: 'Entgeltunterschied (Mittelwert & Median)', beschreibung: 'Durchschnittliche und mediane Gehaltsdifferenz zwischen weiblichen und männlichen Beschäftigten — jeweils für Grundgehalt und Gesamtvergütung.' },
  { nr: '2', titel: 'Variable Vergütungsbestandteile', beschreibung: 'GPG bei Boni, Prämien, Sachleistungen und sonstigen variablen Vergütungsbestandteilen (Art. 9 Abs. 1 lit. b).' },
  { nr: '3', titel: 'Entgeltquartile', beschreibung: 'Anteil weiblicher und männlicher Beschäftigter in jedem Entgeltquartil (unteres, untere Mitte, obere Mitte, oberes Quartil).' },
  { nr: '4', titel: 'Aufschlüsselung nach Kategorien', beschreibung: 'Alle oben genannten Daten müssen zusätzlich nach Beschäftigtenkategorien (Vergütungsgruppen) aufgeschlüsselt werden.' },
  { nr: '5', titel: 'Zugang zu variablen Bestandteilen', beschreibung: 'Anteil der weiblichen und männlichen Beschäftigten, die ergänzende oder variable Vergütungsbestandteile erhalten.' },
];

export default function BerichtspflichtenPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Start', item: SEO_CONFIG.baseUrl },
              { '@type': 'ListItem', position: 2, name: 'Arbeitgeber', item: `${SEO_CONFIG.baseUrl}/arbeitgeber` },
              { '@type': 'ListItem', position: 3, name: 'Berichtspflichten zum Gender Pay Gap', item: `${SEO_CONFIG.baseUrl}/berichtspflichten-gender-pay-gap` },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-cream-dark max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">Arbeitgeber</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Berichtspflichten zum Gender Pay Gap &mdash; Was Unternehmen wissen m&uuml;ssen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Unternehmen ab 250 Mitarbeitern m&uuml;ssen ab Juni 2027 erstmals j&auml;hrlich &uuml;ber den
              geschlechtsspezifischen Entgeltunterschied berichten (Art. 9 EU-Richtlinie 2023/970). Unternehmen
              ab 100 MA folgen ab 2031 mit einem Dreijahresrhythmus. Weist der Bericht einen nicht gerechtfertigten
              Gender Pay Gap von &uuml;ber 5&nbsp;% aus, ist eine gemeinsame Entgeltbewertung mit Arbeitnehmervertretern
              Pflicht (Art. 10).
            </p>
          </div>
        </header>

        {/* Fristen */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Fristen nach Unternehmensgröße
            </h2>
            <FadeUp>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[160px]">Unternehmensgröße</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[160px]">Erster Bericht</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[140px]">Rhythmus</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink">Rechtsgrundlage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { groesse: '250+ MA', frist: '7. Juni 2027', rhythmus: 'Jährlich', basis: 'Art. 9 Abs. 2 EU-RL 2023/970' },
                      { groesse: '150–249 MA', frist: '7. Juni 2027', rhythmus: 'Alle 3 Jahre', basis: 'Art. 9 Abs. 3 EU-RL 2023/970' },
                      { groesse: '100–149 MA', frist: '7. Juni 2031', rhythmus: 'Alle 3 Jahre', basis: 'Art. 9 Abs. 3 EU-RL 2023/970' },
                      { groesse: '< 100 MA', frist: 'Keine Pflicht', rhythmus: '—', basis: 'Freiwillige Berichterstattung möglich' },
                    ].map((row) => (
                      <tr key={row.groesse}>
                        <td className="p-4 border border-border font-semibold text-ink whitespace-nowrap">{row.groesse}</td>
                        <td className="p-4 border border-border text-ink">{row.frist}</td>
                        <td className="p-4 border border-border text-ink">{row.rhythmus}</td>
                        <td className="p-4 border border-border text-ink-light">{row.basis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Berichtsinhalte */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Was der Bericht enthalten muss (Art. 9 EU-RL)
            </h2>
            <div className="space-y-5">
              {berichtsInhalte.map((item, i) => (
                <FadeUp key={item.nr} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border-l-4 border-blue rounded p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-cream-dark text-blue font-bold text-[0.9rem] flex items-center justify-center shrink-0">{item.nr}</div>
                      <div>
                        <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-1">{item.titel}</h3>
                        <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{item.beschreibung}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Art. 10 — Gemeinsame Entgeltbewertung */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Gemeinsame Entgeltbewertung bei GPG &gt; 5 % (Art. 10)
            </h2>
            <FadeUp>
              <div className="bg-cream-dark border border-blue/30 rounded p-7">
                <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                  Wenn der Bericht in einer Vergütungskategorie einen <strong>Gender Pay Gap von mehr als 5 %</strong> ausweist,
                  der nicht durch objektive, geschlechtsneutrale Kriterien gerechtfertigt werden kann, greift Art. 10 der EU-Richtlinie:
                </p>
                <ul className="space-y-2 text-[0.9rem] text-ink-muted">
                  <li><strong>Gemeinsame Bewertung</strong> — Arbeitgeber und Arbeitnehmervertreter analysieren die Ursachen des Gaps</li>
                  <li><strong>6-Monats-Frist</strong> — innerhalb von 6 Monaten muss die Bewertung abgeschlossen sein</li>
                  <li><strong>Aktionsplan</strong> — konkrete Maßnahmen zur Beseitigung ungerechtfertigter Unterschiede</li>
                  <li><strong>Anpassung der Vergütung</strong> — identifizierte Diskriminierung muss korrigiert werden</li>
                  <li><strong>Übermittlung an Behörde</strong> — die Ergebnisse der Bewertung gehen an die Überwachungsbehörde</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu den Berichtspflichten
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
              Ersten Bericht vorbereiten — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir unterstützen Sie bei der Datenaufbereitung, Kategorienbildung und rechtssicheren Berichterstattung.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
