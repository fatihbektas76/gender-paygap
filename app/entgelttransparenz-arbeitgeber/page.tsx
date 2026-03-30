import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Entgelttransparenz für Arbeitgeber — Pflichten ab 2026 (${new Date().getFullYear()})`,
  description:
    'Alle Arbeitgeberpflichten aus der EU-Richtlinie 2023/970 im Überblick: Auskunftspflicht, Berichtspflicht, Stellenanzeigen, Entgeltbewertung. Fachanwalt für Arbeitsrecht erklärt.',
  path: '/entgelttransparenz-arbeitgeber',
});

const faqs = [
  {
    question: 'Welche Pflichten haben Arbeitgeber ab Juni 2026?',
    answer:
      'Ab dem 7. Juni 2026 müssen alle Arbeitgeber ab 50 Mitarbeitern individuelle Auskunftsanfragen innerhalb von 2 Monaten beantworten (Art. 7 EU-RL 2023/970). Zusätzlich müssen Gehaltsspannen in Stellenanzeigen angegeben werden (Art. 5). Unternehmen ab 250 MA müssen ab 2027 jährlich über den Gender Pay Gap berichten (Art. 9). Bei einem GPG über 5 % ist eine gemeinsame Entgeltbewertung mit den Arbeitnehmervertretern Pflicht (Art. 10).',
  },
  {
    question: 'Was passiert, wenn mein Unternehmen die Pflichten nicht erfüllt?',
    answer:
      'Art. 23 der EU-Richtlinie sieht „wirksame, verhältnismäßige und abschreckende" Sanktionen vor. Neben Bußgeldern drohen Schadensersatzansprüche betroffener Beschäftigter — einschließlich vollständiger Nachzahlung der Gehaltsdifferenz für bis zu 3 Jahre rückwirkend. Zusätzlich greift die Beweislastumkehr (Art. 18): Bei einer Gehaltsanfrage muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt.',
  },
  {
    question: 'Müssen auch kleine Unternehmen Entgelttransparenz herstellen?',
    answer:
      'Die Auskunftspflicht und Stellenanzeigen-Pflicht gelten ab 50 Mitarbeitern. Unternehmen unter 50 MA sind von der individuellen Auskunftspflicht befreit, müssen aber trotzdem die allgemeinen Diskriminierungsverbote einhalten und Gehaltsspannen bei Stellenanzeigen angeben. Die Berichtspflicht gilt erst ab 100 MA (ab 2031) bzw. 250 MA (ab 2027).',
  },
  {
    question: 'Was muss in den Entgelttransparenz-Bericht?',
    answer:
      'Der Bericht nach Art. 9 EU-RL muss enthalten: geschlechtsspezifischer Entgeltunterschied (Median und Mittelwert), GPG bei variablen Vergütungsbestandteilen, Anteil weiblicher/männlicher Beschäftigter je Entgeltquartil sowie den Anteil der Beschäftigten, die ergänzende oder variable Vergütungsbestandteile erhalten. Alle Daten müssen nach Vergütungsgruppen aufgeschlüsselt sein.',
  },
  {
    question: 'Wie bereite ich mein Unternehmen auf die Entgelttransparenz vor?',
    answer:
      'Beginnen Sie jetzt mit einem Compliance-Audit: (1) Vergütungsstrukturen analysieren und Vergleichsgruppen bilden, (2) Entgeltkriterien auf objektive, geschlechtsneutrale Faktoren prüfen, (3) Gehaltslücken identifizieren und Aktionsplan erstellen, (4) Prozesse für Auskunftsanfragen einrichten, (5) Stellenanzeigen anpassen. APOS Legal unterstützt Sie dabei — das Erstgespräch ist kostenlos.',
  },
];

const pflichten = [
  {
    titel: 'Auskunftspflicht (Art. 7)',
    text: 'Alle Arbeitgeber ab 50 MA müssen auf individuelle Anfrage das Gehaltsniveau vergleichbarer Positionen offenlegen — aufgeschlüsselt nach Geschlecht, innerhalb von 2 Monaten.',
  },
  {
    titel: 'Gehaltstransparenz bei Einstellung (Art. 5)',
    text: 'Bewerber:innen müssen vor dem Vorstellungsgespräch über das Einstiegsgehalt oder die Gehaltsspanne informiert werden. Fragen nach dem bisherigen Gehalt sind unzulässig.',
  },
  {
    titel: 'Berichtspflicht (Art. 9)',
    text: 'Unternehmen ab 250 MA berichten ab 2027 jährlich, ab 100 MA ab 2031 alle 3 Jahre über den geschlechtsspezifischen Entgeltunterschied an die zuständige Behörde.',
  },
  {
    titel: 'Gemeinsame Entgeltbewertung (Art. 10)',
    text: 'Liegt der Gender Pay Gap über 5 % und kann nicht objektiv gerechtfertigt werden, ist eine gemeinsame Entgeltbewertung mit Arbeitnehmervertretern Pflicht — mit Aktionsplan innerhalb von 6 Monaten.',
  },
  {
    titel: 'Objektive Entgeltkriterien (Art. 4)',
    text: 'Vergütungssysteme müssen auf objektiven, geschlechtsneutralen Kriterien basieren: Qualifikation, Belastung, Verantwortung und Arbeitsbedingungen. Intransparente Kriterien werden anfechtbar.',
  },
];

export default function EntgelttransparenzArbeitgeberPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Entgelttransparenz für Arbeitgeber', item: `${SEO_CONFIG.baseUrl}/entgelttransparenz-arbeitgeber` },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-accent-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">Arbeitgeber</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entgelttransparenz f&uuml;r Arbeitgeber &mdash; Pflichten ab 2026
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Ab dem 7. Juni 2026 m&uuml;ssen Arbeitgeber in Deutschland die EU-Entgelttransparenzrichtlinie 2023/970
              vollst&auml;ndig umsetzen. Die Richtlinie bringt f&uuml;nf zentrale Pflichten: Auskunftsrecht, Gehaltstransparenz
              bei Einstellung, Berichtspflichten, gemeinsame Entgeltbewertung bei einem Gap &uuml;ber 5&nbsp;% sowie objektive
              Entgeltkriterien. Verst&ouml;&szlig;e f&uuml;hren zu Bu&szlig;geldern und Schadensersatz.
            </p>
          </div>
        </header>

        {/* Pflichten-Überblick */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Die 5 zentralen Arbeitgeberpflichten der EU-Richtlinie
            </h2>
            <div className="space-y-5">
              {pflichten.map((p, i) => (
                <FadeUp key={p.titel} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-accent-50 border-l-4 border-accent rounded p-6">
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{p.titel}</h3>
                    <p className="text-[0.9rem] text-ink-muted leading-relaxed m-0">{p.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Fristen-Überblick */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Fristen und Schwellenwerte im Überblick
            </h2>
            <FadeUp>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink w-[140px]">Frist</th>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink w-[160px]">Unternehmensgröße</th>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink">Pflicht</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { frist: '7. Juni 2026', groesse: 'Alle Arbeitgeber', pflicht: 'Gehaltsspannen in Stellenanzeigen (Art. 5), Verbot der Gehaltsabfrage (Art. 5 Abs. 2)' },
                      { frist: '7. Juni 2026', groesse: 'Ab 50 MA', pflicht: 'Individuelles Auskunftsrecht beantworten (Art. 7), Frist: 2 Monate' },
                      { frist: '7. Juni 2027', groesse: 'Ab 250 MA', pflicht: 'Erster jährlicher Entgelttransparenzbericht (Art. 9)' },
                      { frist: '7. Juni 2031', groesse: 'Ab 100 MA', pflicht: 'Erster Entgelttransparenzbericht, danach alle 3 Jahre (Art. 9)' },
                      { frist: 'Bei GPG > 5 %', groesse: 'Berichtspflichtige', pflicht: 'Gemeinsame Entgeltbewertung + Aktionsplan binnen 6 Monaten (Art. 10)' },
                    ].map((row) => (
                      <tr key={row.frist + row.groesse}>
                        <td className="p-4 border border-border font-semibold text-ink whitespace-nowrap">{row.frist}</td>
                        <td className="p-4 border border-border text-ink whitespace-nowrap">{row.groesse}</td>
                        <td className="p-4 border border-border text-ink-light">{row.pflicht}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Sanktionen */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Risiken bei Nichteinhaltung
            </h2>
            <FadeUp>
              <div className="bg-accent-50 border border-accent/30 rounded p-7">
                <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                  Die EU-Richtlinie sieht erstmals <strong>echte Durchsetzungsmechanismen</strong> vor.
                  Art. 23 verlangt &bdquo;wirksame, verhältnismäßige und abschreckende&ldquo; Sanktionen:
                </p>
                <ul className="space-y-2 text-[0.9rem] text-ink-muted">
                  <li><strong>Bußgelder</strong> — Höhe wird vom nationalen Gesetzgeber festgelegt</li>
                  <li><strong>Schadensersatz</strong> — vollständige Nachzahlung der Gehaltsdifferenz, bis zu 3 Jahre rückwirkend (Art. 21)</li>
                  <li><strong>Beweislastumkehr</strong> — der Arbeitgeber muss Diskriminierungsfreiheit beweisen (Art. 18)</li>
                  <li><strong>Verbandsklagerecht</strong> — Gewerkschaften und Gleichstellungsstellen können klagen (Art. 15)</li>
                  <li><strong>Reputationsrisiko</strong> — Berichte werden teilweise öffentlich zugänglich</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Entgelttransparenz für Arbeitgeber
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
              Compliance-Check für Ihr Unternehmen — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Vergütungsstrukturen und machen Sie fit für die EU-Richtlinie 2026.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
