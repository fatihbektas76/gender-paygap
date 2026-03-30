import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Auskunftsanfragen von Arbeitnehmern korrekt beantworten (${new Date().getFullYear()})`,
  description:
    'Art. 7 EU-RL 2023/970: Arbeitgeber müssen Auskunftsanfragen innerhalb von 2 Monaten beantworten. Welche Informationen, Konsequenzen bei Verstoß, Beweislastumkehr. Fachanwalt erklärt.',
  path: '/auskunftsrecht-arbeitnehmer-beantworten',
});

const faqs = [
  {
    question: 'Wie lange habe ich als Arbeitgeber Zeit, eine Auskunftsanfrage zu beantworten?',
    answer:
      'Art. 7 Abs. 4 EU-RL 2023/970 setzt eine Frist von 2 Monaten ab Eingang der Anfrage. Innerhalb dieser Frist muss der Arbeitgeber die vollständigen Informationen schriftlich übermitteln. Eine verspätete oder unvollständige Antwort kann die Beweislastumkehr auslösen (Art. 18) und Schadensersatzansprüche begründen.',
  },
  {
    question: 'Welche Informationen muss ich dem Arbeitnehmer geben?',
    answer:
      'Nach Art. 7 Abs. 1 EU-RL müssen Sie offenlegen: (1) das individuelle Entgeltniveau der anfragenden Person, (2) die durchschnittlichen Entgeltniveaus — aufgeschlüsselt nach Geschlecht — für Beschäftigte, die gleiche oder gleichwertige Arbeit verrichten, sowie (3) die Kriterien, die zur Bestimmung des Entgelts und der Laufbahnentwicklung verwendet werden.',
  },
  {
    question: 'Was passiert, wenn ich die Auskunft verweigere oder zu spät antworte?',
    answer:
      'Bei Nichtbeantwortung oder verspäteter Antwort greift die Beweislastumkehr nach Art. 18 EU-RL: Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt — nicht der Arbeitnehmer. Zusätzlich drohen Sanktionen nach Art. 23 (Bußgelder) und der Arbeitnehmer kann Schadensersatz nach Art. 21 fordern.',
  },
  {
    question: 'Darf ich den Arbeitnehmer darauf hinweisen, die Information vertraulich zu behandeln?',
    answer:
      'Art. 7 Abs. 6 EU-RL stellt klar: Arbeitnehmer dürfen ihr Entgelt offenlegen, um das Recht auf gleiches Entgelt durchzusetzen. Vertraulichkeitsklauseln in Arbeitsverträgen, die dies verhindern, sind nach der Richtlinie unwirksam. Sie dürfen den Arbeitnehmer nicht zu Vertraulichkeit verpflichten.',
  },
  {
    question: 'Ab welcher Unternehmensgröße gilt die Auskunftspflicht?',
    answer:
      'Die EU-Richtlinie sieht das individuelle Auskunftsrecht ab 50 Mitarbeitern vor (Art. 7 Abs. 3). Das bisherige deutsche EntgTranspG hatte die Schwelle bei 200 MA. Mit der Umsetzung der EU-RL bis Juni 2026 sinkt der Schwellenwert auf 50 MA. Arbeitnehmer in kleineren Unternehmen können sich auf das allgemeine Gleichbehandlungsrecht berufen.',
  },
];

const pflichtInhalte = [
  {
    titel: 'Individuelles Entgeltniveau',
    text: 'Die anfragende Person erfährt ihr eigenes Gehaltsniveau — einschließlich aller Vergütungsbestandteile (Grundgehalt, Boni, Sachleistungen).',
    basis: 'Art. 7 Abs. 1 lit. a',
  },
  {
    titel: 'Vergleichs-Entgeltniveaus nach Geschlecht',
    text: 'Durchschnittliche Entgeltniveaus — aufgeschlüsselt nach Geschlecht — für Beschäftigte, die gleiche oder gleichwertige Arbeit verrichten.',
    basis: 'Art. 7 Abs. 1 lit. b',
  },
  {
    titel: 'Entgeltkriterien',
    text: 'Die Kriterien, die zur Bestimmung des Entgelts und der beruflichen Entwicklung herangezogen werden. Diese müssen objektiv und geschlechtsneutral sein.',
    basis: 'Art. 7 Abs. 1 lit. c',
  },
];

export default function AuskunftsrechtBeantwortenPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Auskunftsanfragen beantworten', item: `${SEO_CONFIG.baseUrl}/auskunftsrecht-arbeitnehmer-beantworten` },
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
              Auskunftsanfragen von Arbeitnehmern korrekt beantworten
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Arbeitgeber ab 50 Mitarbeitern m&uuml;ssen individuelle Auskunftsanfragen nach Art. 7 der EU-Richtlinie
              2023/970 innerhalb von 2 Monaten schriftlich beantworten. Die Auskunft umfasst das individuelle Entgeltniveau,
              geschlechteraufgeschl&uuml;sselte Vergleichswerte und die verwendeten Entgeltkriterien. Versp&auml;tete oder
              falsche Ausk&uuml;nfte l&ouml;sen die Beweislastumkehr aus &mdash; der Arbeitgeber muss dann Diskriminierungsfreiheit beweisen.
            </p>
          </div>
        </header>

        {/* Pflichtinhalte */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Diese Informationen müssen Sie offenlegen
            </h2>
            <div className="space-y-5">
              {pflichtInhalte.map((item, i) => (
                <FadeUp key={item.titel} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-cream-dark border-l-4 border-blue rounded p-6">
                    <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                      <h3 className="font-serif text-[1.1rem] font-bold text-ink">{item.titel}</h3>
                      <span className="text-[0.75rem] font-mono bg-blue text-white px-2 py-0.5 rounded shrink-0">{item.basis}</span>
                    </div>
                    <p className="text-[0.9rem] text-ink-muted leading-relaxed m-0">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Fristen & Prozess */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Fristen und Ablauf der Auskunftserteilung
            </h2>
            <FadeUp>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[180px]">Schritt</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink w-[120px]">Frist</th>
                      <th className="text-left p-4 bg-cream-dark border border-border font-semibold text-ink">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { schritt: 'Eingang der Anfrage', frist: 'Tag 0', details: 'Schriftliche Anfrage des Arbeitnehmers (Art. 7 Abs. 2). Kann auch über Betriebsrat oder Gleichstellungsbeauftragten erfolgen.' },
                      { schritt: 'Eingangsbestätigung', frist: 'Zeitnah', details: 'Empfehlung: Eingang schriftlich bestätigen und den Arbeitnehmer über das Format und die voraussichtliche Bearbeitungszeit informieren.' },
                      { schritt: 'Datenaufbereitung', frist: '1–6 Wochen', details: 'Vergleichsgruppe identifizieren, Gehaltsdaten aufschlüsseln, Entgeltkriterien zusammenstellen.' },
                      { schritt: 'Schriftliche Auskunft', frist: 'Spätestens 2 Monate', details: 'Vollständige, schriftliche Auskunft an den Arbeitnehmer (Art. 7 Abs. 4). Bei unvollständiger Auskunft: Nachbesserungspflicht.' },
                      { schritt: 'Jährlicher Hinweis', frist: 'Jährlich', details: 'Arbeitgeber müssen alle Beschäftigten jährlich über ihr Auskunftsrecht informieren (Art. 7 Abs. 3).' },
                    ].map((row) => (
                      <tr key={row.schritt}>
                        <td className="p-4 border border-border font-semibold text-ink">{row.schritt}</td>
                        <td className="p-4 border border-border text-blue font-semibold whitespace-nowrap">{row.frist}</td>
                        <td className="p-4 border border-border text-ink-light">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Konsequenzen */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Konsequenzen bei Verstoß — Beweislastumkehr und Schadensersatz
            </h2>
            <FadeUp>
              <div className="bg-cream-dark border border-blue/30 rounded p-7">
                <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                  Die EU-Richtlinie sieht <strong>schwerwiegende Konsequenzen</strong> vor, wenn Arbeitgeber das
                  Auskunftsrecht nicht korrekt erfüllen:
                </p>
                <ul className="space-y-3 text-[0.9rem] text-ink-muted">
                  <li><strong>Beweislastumkehr (Art. 18):</strong> Bei verspäteter, unvollständiger oder falscher Auskunft muss der Arbeitgeber beweisen, dass keine Entgeltdiskriminierung vorliegt. Die Vermutung spricht für den Arbeitnehmer.</li>
                  <li><strong>Schadensersatz (Art. 21):</strong> Betroffene Arbeitnehmer können vollständige Nachzahlung der Gehaltsdifferenz fordern — bis zu 3 Jahre rückwirkend, zuzüglich Zinsen und Nebenkosten.</li>
                  <li><strong>Bußgelder (Art. 23):</strong> Der nationale Gesetzgeber muss &bdquo;wirksame, verhältnismäßige und abschreckende&ldquo; Sanktionen festlegen.</li>
                  <li><strong>Verbandsklagerecht (Art. 15):</strong> Gewerkschaften und Gleichstellungsstellen können im Namen betroffener Beschäftigter klagen.</li>
                  <li><strong>Vertraulichkeitsklauseln unwirksam (Art. 7 Abs. 6):</strong> Arbeitnehmer dürfen ihr Gehalt offenlegen — Geheimhaltungsklauseln sind insoweit nichtig.</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Beantwortung von Auskunftsanfragen
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
              Auskunftsprozess einrichten — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir helfen Ihnen, den Auskunftsprozess rechtssicher aufzusetzen und Ihre HR-Abteilung zu schulen.
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
