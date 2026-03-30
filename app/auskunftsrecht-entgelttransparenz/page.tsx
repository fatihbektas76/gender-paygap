import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Auskunftsrecht nach dem Entgelttransparenzgesetz — Ihre Rechte ab 2026 (${new Date().getFullYear()})`,
  description:
    'Auskunftsrecht nach Art. 7 EU-RL 2023/970: So fordern Sie Gehaltstransparenz von Ihrem Arbeitgeber. 2-Monats-Frist, Beweislastumkehr, Fachanwalt berät.',
  path: '/auskunftsrecht-entgelttransparenz',
});

const faqs = [
  {
    question: 'Ab wann kann ich Auskunft über Vergleichsgehälter verlangen?',
    answer: 'Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen mit mehr als 50 Mitarbeitern das individuelle Auskunftsrecht nach Art. 7 EU-Richtlinie 2023/970. Sie können dann das durchschnittliche Entgelt für gleiche oder gleichwertige Arbeit — aufgeschlüsselt nach Geschlecht — von Ihrem Arbeitgeber verlangen. Bisher galt dies erst ab 200 Mitarbeitern (EntgTranspG 2017).',
  },
  {
    question: 'Wie stelle ich den Auskunftsantrag richtig?',
    answer: 'Stellen Sie den Antrag schriftlich oder per E-Mail an die Personalabteilung. Nennen Sie Ihre Position und fragen Sie nach dem durchschnittlichen Entgelt für vergleichbare Tätigkeiten, aufgeschlüsselt nach Geschlecht. Der Arbeitgeber muss auch die verwendeten Bewertungskriterien offenlegen. Ein Fachanwalt kann Ihnen ein rechtssicheres Musterschreiben erstellen.',
  },
  {
    question: 'Was passiert, wenn der Arbeitgeber nicht innerhalb von 2 Monaten antwortet?',
    answer: 'Antwortet der Arbeitgeber nicht innerhalb der 2-Monats-Frist (Art. 7 Abs. 4 EU-RL 2023/970), tritt automatisch die Beweislastumkehr nach Art. 18 ein. Das bedeutet: Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt — nicht Sie. Dies stärkt Ihre Position in einem möglichen Klageverfahren erheblich.',
  },
  {
    question: 'Kann ich wegen der Auskunftsanfrage gekündigt oder benachteiligt werden?',
    answer: 'Nein. Art. 25 der EU-Richtlinie 2023/970 enthält ein ausdrückliches Benachteiligungsverbot. Arbeitnehmer, die ihr Auskunftsrecht wahrnehmen, dürfen nicht gekündigt, versetzt oder anderweitig benachteiligt werden. Verstöße dagegen sind eigenständig einklagbar. Das BAG hat diesen Schutz mit Az. 8 AZR 300/24 vom 23.10.2025 bestätigt.',
  },
  {
    question: 'Welche Informationen muss der Arbeitgeber herausgeben?',
    answer: 'Der Arbeitgeber muss das durchschnittliche Entgeltniveau für vergleichbare Positionen nach Geschlecht, die Kriterien der Arbeitsbewertung und die Gehaltsstruktur offenlegen (Art. 7 Abs. 1 EU-RL). Die Auskunft muss verständlich, vollständig und in einem gängigen Format erfolgen. Unvollständige oder irreführende Auskünfte lösen ebenfalls die Beweislastumkehr aus.',
  },
];

export default function AuskunftsrechtEntgelttransparenzPage() {
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
                    name: 'Auskunftsrecht Entgelttransparenz',
                    item: `${SEO_CONFIG.baseUrl}/auskunftsrecht-entgelttransparenz`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-secondary-50 max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-primary transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitnehmer" className="hover:text-primary transition-colors no-underline text-ink-muted">Arbeitnehmer</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Auskunftsrecht Entgelttransparenz</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-secondary-50 max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">Arbeitnehmer · Auskunftsrecht</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Auskunftsrecht nach dem Entgelttransparenzgesetz — Ihre Rechte ab 2026
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen mit mehr als 50 Mitarbeitern das Recht, Auskunft
              über Vergleichsgehälter zu verlangen (Art. 7 EU-Richtlinie 2023/970). Der Arbeitgeber muss innerhalb
              von 2 Monaten antworten — andernfalls greift automatisch die Beweislastumkehr nach Art. 18.
            </p>
          </div>
        </header>

        {/* Rechtsgrundlage */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 7 EU-Richtlinie 2023/970 — Ihr individuelles Auskunftsrecht
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die EU-Entgelttransparenzrichtlinie 2023/970 erweitert das bisherige deutsche Entgelttransparenzgesetz (EntgTranspG)
                erheblich. Der <strong>Schwellenwert sinkt von 200 auf 50 Mitarbeiter</strong> — damit erfasst das Auskunftsrecht
                rund 45.000 zusätzliche Unternehmen in Deutschland (Destatis, Unternehmensregister 2024).
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Konkret haben Sie das Recht auf Auskunft über das <strong>durchschnittliche Entgeltniveau</strong> für gleiche oder
                gleichwertige Arbeit, aufgeschlüsselt nach Geschlecht, sowie die <strong>Kriterien der Arbeitsbewertung</strong>,
                die der Vergütung zugrunde liegen. Laut Statistischem Bundesamt (Dezember 2025) beträgt der unbereinigte Gender
                Pay Gap in Deutschland 16 % — der bereinigte Gap liegt bei rund 6 %.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                So stellen Sie den Auskunftsantrag
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { nr: '1', title: 'Antrag schriftlich formulieren', text: 'Stellen Sie den Auskunftsantrag schriftlich oder per E-Mail an die Personalabteilung. Nennen Sie Ihre Berufsbezeichnung und fragen Sie nach dem durchschnittlichen Entgelt für vergleichbare Positionen — aufgeschlüsselt nach Geschlecht.' },
                  { nr: '2', title: '2-Monats-Frist läuft', text: 'Der Arbeitgeber muss innerhalb von 2 Monaten vollständig antworten (Art. 7 Abs. 4 EU-RL 2023/970). Die Auskunft muss das Durchschnittsentgelt nach Geschlecht und die verwendeten Bewertungskriterien enthalten.' },
                  { nr: '3', title: 'Auskunft prüfen lassen', text: 'Zeigt die Auskunft eine Gehaltslücke? Ein Fachanwalt kann prüfen, ob ein Entgeltdiskriminierungsanspruch besteht und welche Entschädigung möglich ist — rückwirkend für bis zu 3 Jahre.' },
                ].map((step) => (
                  <div key={step.nr} className="flex gap-4">
                    <div className="w-9 h-9 min-w-[36px] rounded-full bg-secondary-50 border border-secondary/30 flex items-center justify-center text-secondary-700 font-bold text-[0.85rem]">
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

            <FadeUp delay={2}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Was passiert, wenn der Arbeitgeber nicht antwortet?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Verweigert der Arbeitgeber die Auskunft oder antwortet nicht innerhalb der 2-Monats-Frist, greift
                die <strong>Beweislastumkehr nach Art. 18 EU-RL 2023/970</strong>. Das bedeutet:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Der Arbeitgeber muss beweisen</strong>, dass keine Entgeltdiskriminierung vorliegt — nicht Sie</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Unvollständige Auskünfte</strong> werden wie Nichtbeantwortung behandelt</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Klage beim Arbeitsgericht</strong> mit deutlich verbesserten Erfolgsaussichten</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Das BAG hat mit Urteil <strong>Az. 8 AZR 300/24</strong> vom 23.10.2025 bestätigt, dass bereits ein
                Paarvergleich — der Vergleich mit einer einzelnen Person in vergleichbarer Position — ausreicht,
                um eine Vermutung der Entgeltdiskriminierung zu begründen. Sie brauchen keine Statistik über die gesamte Belegschaft.
              </p>
            </FadeUp>

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Beweislastumkehr nach Art. 18 — Ihr entscheidender Vorteil
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die Beweislastumkehr nach Art. 18 EU-RL 2023/970 ist das stärkste Instrument für Arbeitnehmer.
                Sie greift in folgenden Fällen:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light">Arbeitgeber beantwortet den Auskunftsantrag nicht fristgerecht</li>
                <li className="text-[0.95rem] text-ink-light">Arbeitgeber gibt unvollständige oder irreführende Auskünfte</li>
                <li className="text-[0.95rem] text-ink-light">Aus der Auskunft ergibt sich eine Gehaltsdifferenz zum Nachteil eines Geschlechts</li>
                <li className="text-[0.95rem] text-ink-light">Arbeitgeber verstößt gegen Berichtspflichten (Art. 9 EU-RL)</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                In all diesen Fällen muss <strong>der Arbeitgeber beweisen</strong>, dass die Gehaltsunterschiede
                auf objektiven, geschlechtsneutralen Kriterien beruhen. Diese Umkehr der Beweislast verbessert Ihre
                Erfolgsaussichten vor dem Arbeitsgericht deutlich und erhöht den Druck auf Arbeitgeber, proaktiv
                für gleiche Bezahlung zu sorgen.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-secondary/30 rounded p-8 border-l-[4px] border-l-secondary">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat klargestellt: Ein <strong>Paarvergleich reicht aus</strong>, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine Statistik über die gesamte
                  Belegschaft vorlegen — der Vergleich mit einer einzelnen Person in vergleichbarer Position genügt.
                  Dies erleichtert die Durchsetzung des Auskunftsrechts erheblich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Auskunftsrecht
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
        <section className="py-[70px] px-8 bg-secondary-700 text-white text-center max-md:py-12 max-md:px-6">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
              Kostenlose Ersteinschätzung — Auskunftsrecht durchsetzen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen, ob Sie Anspruch auf Auskunft, Nachzahlung oder Entschädigung haben.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-secondary-700 hover:bg-secondary-50 hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
