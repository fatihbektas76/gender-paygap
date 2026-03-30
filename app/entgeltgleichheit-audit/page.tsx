import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Entgeltgleichheit-Audit — Vergütungsstrukturen prüfen und absichern (${new Date().getFullYear()})`,
  description:
    'Compliance-Audit für Entgeltgleichheit: Vergütungsstrukturen analysieren, Vergleichsgruppen bilden, Gender Pay Gap identifizieren. Fachanwalt für Arbeitsrecht macht Ihr Unternehmen audit-ready.',
  path: '/entgeltgleichheit-audit',
});

const faqs = [
  {
    question: 'Was ist ein Entgeltgleichheit-Audit?',
    answer:
      'Ein Entgeltgleichheit-Audit ist eine systematische Überprüfung Ihrer Vergütungsstrukturen auf geschlechtsbezogene Entgeltunterschiede. Es umfasst die Bildung von Vergleichsgruppen (gleiche oder gleichwertige Arbeit nach Art. 4 EU-RL 2023/970), die Analyse der Entgeltkriterien auf Geschlechtsneutralität sowie die Berechnung des Gender Pay Gap pro Vergütungskategorie.',
  },
  {
    question: 'Warum sollten wir ein Audit durchführen, bevor die Pflicht greift?',
    answer:
      'Ein proaktives Audit gibt Ihnen Zeit, ungerechtfertigte Gehaltsunterschiede zu korrigieren, bevor die Berichtspflicht greift (2027 für 250+ MA). Sie vermeiden so die Pflicht zur gemeinsamen Entgeltbewertung nach Art. 10 (bei GPG > 5 %), reduzieren das Risiko von Schadensersatzansprüchen und stärken Ihre Arbeitgebermarke.',
  },
  {
    question: 'Wie werden Vergleichsgruppen gebildet?',
    answer:
      'Art. 4 Abs. 4 EU-RL definiert vier Kriterien: Qualifikation, Belastung, Verantwortung und Arbeitsbedingungen. Beschäftigte werden in Gruppen zusammengefasst, die gleiche oder gleichwertige Arbeit leisten. Dabei zählen tatsächliche Aufgaben — nicht nur Stellenbezeichnungen. In tarifgebundenen Unternehmen können Entgeltgruppen als Ausgangspunkt dienen.',
  },
  {
    question: 'Was kostet ein Compliance-Audit?',
    answer:
      'Die Kosten hängen von Unternehmensgröße, Vergütungskomplexität und Datenqualität ab. Ein Erstgespräch und eine Risikoeinschätzung sind bei APOS Legal kostenlos. Typische Audits für mittelständische Unternehmen (100–500 MA) dauern 4 bis 8 Wochen und werden pauschal abgerechnet.',
  },
  {
    question: 'Welche Daten werden für das Audit benötigt?',
    answer:
      'Benötigt werden: (1) Gehaltsabrechnungsdaten aller Beschäftigten (Grundgehalt + variable Bestandteile), (2) Stellenbeschreibungen und Eingruppierungen, (3) Dienstalter, Qualifikationen und Berufserfahrung, (4) Arbeitszeiten und Arbeitszeitmodelle, (5) bei Tarifbindung die einschlägigen Tarifverträge. Alle Daten werden DSGVO-konform verarbeitet.',
  },
];

const auditSchritte = [
  { schritt: '1', titel: 'Datenerhebung', text: 'Zusammenstellung aller vergütungsrelevanten Daten: Grundgehalt, variable Vergütung, Sachleistungen, Stellenprofile und Eingruppierungen.' },
  { schritt: '2', titel: 'Vergleichsgruppenbildung', text: 'Zusammenfassung von Beschäftigten mit gleicher oder gleichwertiger Arbeit nach den vier EU-Kriterien: Qualifikation, Belastung, Verantwortung, Arbeitsbedingungen.' },
  { schritt: '3', titel: 'Gap-Analyse', text: 'Berechnung des geschlechtsspezifischen Entgeltunterschieds pro Vergleichsgruppe — als Median, Mittelwert und aufgeschlüsselt nach Vergütungsbestandteilen.' },
  { schritt: '4', titel: 'Ursachenprüfung', text: 'Analyse, ob identifizierte Gaps durch objektive, geschlechtsneutrale Faktoren gerechtfertigt sind (z. B. Berufserfahrung, Leistung, Marktbedingungen).' },
  { schritt: '5', titel: 'Maßnahmenplan', text: 'Erstellung eines konkreten Aktionsplans: Gehaltsanpassungen, Prozessänderungen, Dokumentation und Monitoring — mit Zeitplan und Verantwortlichkeiten.' },
];

export default function EntgeltgleichheitAuditPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Entgeltgleichheit-Audit', item: `${SEO_CONFIG.baseUrl}/entgeltgleichheit-audit` },
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
              Entgeltgleichheit-Audit &mdash; Verg&uuml;tungsstrukturen pr&uuml;fen und absichern
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Ein Entgeltgleichheit-Audit deckt geschlechtsbezogene Gehaltsl&uuml;cken auf, bevor die EU-Richtlinie
              2023/970 sie sichtbar macht. Unternehmen, die jetzt handeln, vermeiden die Pflicht zur gemeinsamen
              Entgeltbewertung bei einem Gap &uuml;ber 5&nbsp;% (Art. 10), senken das Risiko von Schadensersatzanspr&uuml;chen
              und st&auml;rken ihre Position als fairer Arbeitgeber.
            </p>
          </div>
        </header>

        {/* Audit-Schritte */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              So läuft ein Entgeltgleichheit-Audit ab
            </h2>
            <div className="space-y-5">
              {auditSchritte.map((s, i) => (
                <FadeUp key={s.schritt} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-cream-dark border-l-4 border-blue rounded p-6">
                    <div className="w-10 h-10 rounded-full bg-blue text-white font-bold text-[1rem] flex items-center justify-center shrink-0">
                      {s.schritt}
                    </div>
                    <div>
                      <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-1">{s.titel}</h3>
                      <p className="text-[0.9rem] text-ink-muted leading-relaxed m-0">{s.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Entgeltkriterien */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Objektive Entgeltkriterien nach Art. 4 EU-RL
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-8 max-w-[700px]">
              Die EU-Richtlinie verlangt, dass Vergütungssysteme auf objektiven, geschlechtsneutralen Kriterien
              basieren. Art. 4 Abs. 4 nennt vier Kernkriterien, die bei der Vergleichsgruppenbildung herangezogen werden:
            </p>
            <FadeUp>
              <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
                {[
                  { titel: 'Qualifikation', text: 'Formale Bildungsabschlüsse, Zertifizierungen und berufsspezifische Kenntnisse.' },
                  { titel: 'Belastung', text: 'Physische und psychische Anforderungen der Tätigkeit, Arbeitsumfeld und Stressfaktoren.' },
                  { titel: 'Verantwortung', text: 'Personal- und Budgetverantwortung, Entscheidungsbefugnisse und Tragweite der Aufgaben.' },
                  { titel: 'Arbeitsbedingungen', text: 'Schichtarbeit, Reisetätigkeit, Gefahren und besondere Umgebungsbedingungen.' },
                ].map((k, i) => (
                  <FadeUp key={k.titel} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                    <div className="bg-white border border-border-light rounded p-6 h-full">
                      <h3 className="font-serif text-[1.05rem] font-bold text-blue mb-2">{k.titel}</h3>
                      <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{k.text}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Vorteile proaktiver Compliance */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Warum proaktive Compliance sich rechnet
            </h2>
            <FadeUp>
              <div className="bg-cream-dark border border-blue/30 rounded p-7">
                <ul className="space-y-3 text-[0.9rem] text-ink-muted">
                  <li><strong>Sanktionsvermeidung:</strong> Bußgelder und Schadensersatz nach Art. 21, 23 EU-RL lassen sich durch frühzeitige Korrektur verhindern.</li>
                  <li><strong>Art. 10 umgehen:</strong> Wer den GPG unter 5 % senkt, vermeidet die aufwändige gemeinsame Entgeltbewertung mit Arbeitnehmervertretern.</li>
                  <li><strong>Beweislastumkehr absichern:</strong> Dokumentierte, objektive Entgeltkriterien stärken die Verteidigungsposition bei Klagen (Art. 18).</li>
                  <li><strong>Employer Branding:</strong> Gehaltstransparenz und nachgewiesene Fairness steigern die Attraktivität am Arbeitsmarkt.</li>
                  <li><strong>ESG-Compliance:</strong> Entgeltdaten fließen in die CSRD-Nachhaltigkeitsberichterstattung ein — ein frühes Audit bereitet auch darauf vor.</li>
                </ul>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Entgeltgleichheit-Audit
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
              Vergütungs-Audit anfragen — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir analysieren Ihre Entgeltstrukturen und identifizieren Handlungsbedarf vor der Berichtspflicht.
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
