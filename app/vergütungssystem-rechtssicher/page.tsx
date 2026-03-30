import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Vergütungssystem rechtssicher gestalten — Compliance-Leitfaden (${new Date().getFullYear()})`,
  description:
    'Objektive Entgeltkriterien, geschlechtsneutrale Vergleichsgruppen und Dokumentation — so machen Sie Ihr Vergütungssystem EU-RL-konform. Fachanwalt APOS Legal Heidelberg.',
  path: '/vergütungssystem-rechtssicher',
});

const faqs = [
  {
    question: 'Welche Kriterien gelten als objektiv und geschlechtsneutral?',
    answer:
      'Art. 4 Abs. 4 der EU-Entgelttransparenzrichtlinie (2023/970) nennt ausdrücklich Kompetenzen, Belastungen, Verantwortung und Arbeitsbedingungen als zulässige Bewertungsfaktoren. Entscheidend ist, dass die Kriterien für alle Geschlechter gleich angewandt werden und keine mittelbare Diskriminierung bewirken — etwa durch überproportionale Gewichtung von Vollzeitpräsenz.',
  },
  {
    question: 'Was ist eine geschlechtsneutrale Arbeitsplatzbewertung?',
    answer:
      'Eine geschlechtsneutrale Arbeitsplatzbewertung vergleicht Tätigkeiten anhand objektiver Kriterien, ohne dass das Geschlecht der typischen Stelleninhaber das Ergebnis beeinflusst. Art. 4 Abs. 2 EU-RL verlangt, dass gleiche oder gleichwertige Arbeit nach einheitlichen Maßstäben bewertet wird. Die Bewertung muss dokumentiert und auf Anfrage offengelegt werden.',
  },
  {
    question: 'Wie definiere ich korrekte Vergleichsgruppen?',
    answer:
      'Vergleichsgruppen umfassen Beschäftigte, die gleiche oder gleichwertige Arbeit verrichten. Maßgeblich sind Aufgabeninhalt, Qualifikationsanforderungen, Verantwortungsumfang und Arbeitsbedingungen (Art. 4 EU-RL). Die Vergleichsgruppen müssen groß genug sein, um statistische Aussagekraft zu haben, aber spezifisch genug, um tatsächlich vergleichbare Tätigkeiten abzubilden.',
  },
  {
    question: 'Welche Dokumentationspflichten bestehen?',
    answer:
      'Arbeitgeber müssen die verwendeten Entgeltkriterien, die Zuordnung zu Vergleichsgruppen und die Gewichtung einzelner Faktoren schriftlich dokumentieren. Diese Unterlagen müssen Beschäftigten auf Anfrage zugänglich gemacht werden (Art. 7 EU-RL). Eine lückenhafte Dokumentation führt zur Beweislastumkehr (Art. 18): Der Arbeitgeber muss dann nachweisen, dass keine Diskriminierung vorliegt.',
  },
  {
    question: 'Wie unterstützt APOS Legal bei der Umstellung des Vergütungssystems?',
    answer:
      'Wir analysieren Ihre bestehende Vergütungsstruktur, identifizieren diskriminierungsanfällige Kriterien, definieren rechtssichere Vergleichsgruppen und erstellen eine vollständige Dokumentation. Das Ergebnis ist ein audit-ready Entgeltsystem, das den Anforderungen der EU-RL 2023/970 entspricht. Die Ersteinschätzung ist kostenlos.',
  },
];

const schritte = [
  {
    nr: '01',
    title: 'Bestandsaufnahme der Entgeltstruktur',
    text: 'Analyse aller Gehaltsbestandteile: Grundgehalt, variable Vergütung, Zulagen, Sachbezüge, betriebliche Altersvorsorge. Identifikation aller Entgeltfaktoren und ihrer Gewichtung.',
  },
  {
    nr: '02',
    title: 'Vergleichsgruppen bilden',
    text: 'Zuordnung aller Positionen zu Vergleichsgruppen auf Basis von Tätigkeitsinhalt, Qualifikation, Verantwortung und Arbeitsbedingungen (Art. 4 Abs. 4 EU-RL).',
  },
  {
    nr: '03',
    title: 'Objektive Kriterien definieren',
    text: 'Festlegung geschlechtsneutraler Bewertungskriterien für jede Vergleichsgruppe. Ausschluss mittelbarer Diskriminierung — etwa durch übermäßige Gewichtung von Betriebszugehörigkeit oder Vollzeitpräsenz.',
  },
  {
    nr: '04',
    title: 'Gender Pay Gap berechnen',
    text: 'Berechnung des bereinigten GPG innerhalb jeder Vergleichsgruppe. Bei Abweichungen über 5%: Ursachenanalyse und Maßnahmenplan gemäß Art. 10 EU-RL.',
  },
  {
    nr: '05',
    title: 'Dokumentation und Compliance',
    text: 'Lückenlose Dokumentation aller Kriterien, Vergleichsgruppen und Entscheidungsgrundlagen. Vorbereitung auf Auskunftsanfragen (Art. 7) und Berichtspflichten (Art. 9).',
  },
];

export default function VerguetungssystemRechtssicherPage() {
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
                    name: 'Vergütungssystem rechtssicher',
                    item: `${SEO_CONFIG.baseUrl}/verg%C3%BCtungssystem-rechtssicher`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-accent-50 max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-primary transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitgeber" className="hover:text-primary transition-colors no-underline text-ink-muted">Arbeitgeber</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Vergütungssystem rechtssicher</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-accent-50 max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">Arbeitgeber · Compliance</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Vergütungssystem rechtssicher gestalten — Compliance-Leitfaden
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Die EU-Entgelttransparenzrichtlinie (2023/970) verlangt ab Juni 2026, dass Vergütungssysteme auf objektiven,
              geschlechtsneutralen Kriterien basieren (Art. 4 Abs. 4). Arbeitgeber müssen Vergleichsgruppen bilden,
              Entgeltkriterien dokumentieren und auf Anfrage offenlegen.
              APOS Legal Heidelberg unterstützt Sie bei der rechtskonformen Umstellung.
            </p>
          </div>
        </header>

        {/* Warum handeln */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Warum Ihr Vergütungssystem jetzt auf dem Prüfstand steht
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen ab 50 Mitarbeitern das Recht, Auskunft über
                die Entgeltkriterien und das Mediangehalt ihrer Vergleichsgruppe zu verlangen (Art. 7 EU-RL 2023/970).
                Können Sie diese Kriterien nicht nachvollziehbar darlegen, tritt die Beweislastumkehr ein (Art. 18):
                Sie müssen beweisen, dass keine Diskriminierung vorliegt.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Unternehmen ab 250 Mitarbeitern müssen zusätzlich ab 2027 jährlich über den Gender Pay Gap berichten (Art. 9).
                Liegt der bereinigte GPG in einer Vergütungskategorie über 5%, ist eine gemeinsame Entgeltbewertung mit dem
                Betriebsrat verpflichtend (Art. 10). Wer diese Pflichten nicht erfüllt, riskiert Bußgelder nach Art. 23 und
                Schadensersatzansprüche nach Art. 21.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* 5 Schritte */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <h2 className="font-serif text-[1.5rem] font-bold mb-8">
              In 5 Schritten zum rechtskonformen Vergütungssystem
            </h2>
            <div className="space-y-5">
              {schritte.map((s, i) => (
                <FadeUp key={s.nr} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-6 flex gap-5 max-md:flex-col">
                    <div className="text-[1.8rem] font-extrabold text-accent-700 leading-none min-w-[48px]">{s.nr}</div>
                    <div>
                      <h3 className="font-semibold text-[1rem] text-ink mb-1.5">{s.title}</h3>
                      <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">{s.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Objektive Kriterien */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Zulässige vs. problematische Entgeltkriterien
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink">Zulässig (Art. 4 Abs. 4 EU-RL)</th>
                      <th className="text-left p-4 bg-red-50 border border-border font-semibold text-ink">Problematisch / riskant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Fachliche Kompetenzen & Qualifikation', 'Verhandlungsgeschick als alleiniger Faktor'],
                      ['Belastung & Arbeitsbedingungen', 'Vollzeitpräsenz ohne sachlichen Grund'],
                      ['Verantwortungsumfang', 'Persönliche Beziehung zum Vorgesetzten'],
                      ['Berufserfahrung (tätigkeitsbezogen)', 'Unbegrenzte Anrechnung von Betriebszugehörigkeit'],
                      ['Arbeitsmarktlage (dokumentiert)', 'Pauschalgehälter ohne transparente Herleitung'],
                    ].map(([ok, risk], i) => (
                      <tr key={i}>
                        <td className="p-4 border border-border text-ink-light">{ok}</td>
                        <td className="p-4 border border-border text-ink-light">{risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Vergleichsgruppen */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Vergleichsgruppen korrekt bilden
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
                Die EU-Richtlinie definiert gleiche oder gleichwertige Arbeit über vier Dimensionen:
                Kompetenzen, Belastungen, Verantwortung und Arbeitsbedingungen (Art. 4 Abs. 4). Vergleichsgruppen
                müssen diese Dimensionen abbilden — nicht Jobtitel oder Hierarchiestufen.
              </p>
              <div className="bg-accent-50 border border-accent/20 rounded p-5 mb-4">
                <p className="text-[0.9rem] text-ink-light leading-relaxed m-0">
                  <strong>Praxisbeispiel:</strong> Eine Sachbearbeiterin in der Buchhaltung und ein Sachbearbeiter
                  in der Logistik können dieselbe Vergleichsgruppe bilden, wenn Anforderungsprofil, Verantwortungsumfang
                  und Arbeitsbedingungen vergleichbar sind — auch wenn die Jobtitel unterschiedlich lauten.
                </p>
              </div>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Der Vergleich ist nicht auf das eigene Unternehmen beschränkt: Art. 19 Abs. 1 EU-RL erlaubt auch
                einen hypothetischen Vergleich, wenn keine geeignete Vergleichsperson im Betrieb existiert.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Dokumentation */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-6">
                Dokumentation — was genau Sie vorhalten müssen
              </h2>
              <div className="space-y-3">
                {[
                  'Vollständige Liste aller Entgeltbestandteile (Grundgehalt, Boni, Zulagen, Sachbezüge, bAV)',
                  'Definition und Gewichtung jedes Bewertungskriteriums',
                  'Zuordnung jeder Position zu einer Vergleichsgruppe mit Begründung',
                  'Mediangehalt je Vergleichsgruppe, aufgeschlüsselt nach Geschlecht',
                  'Protokolle der Gehaltsentscheidungen bei Einstellung und Beförderung',
                  'Nachweis der regelmäßigen Überprüfung (mindestens alle 3 Jahre)',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 min-w-[24px] rounded-full bg-accent-50 border border-accent/30 flex items-center justify-center text-accent-700 text-[0.75rem] font-bold mt-0.5">
                      &#10003;
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed m-0">{item}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum rechtssicheren Vergütungssystem
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
              Vergütungssystem prüfen lassen — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir analysieren Ihre Entgeltstruktur und machen sie EU-RL-konform — bevor die Pflichten greifen.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
            >
              Jetzt Compliance-Audit anfragen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
