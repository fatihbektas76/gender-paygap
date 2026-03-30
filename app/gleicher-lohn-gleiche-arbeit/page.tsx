import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Gleicher Lohn für gleiche Arbeit — Was das Gesetz vorschreibt (${new Date().getFullYear()})`,
  description:
    'Gleicher Lohn für gleiche oder gleichwertige Arbeit: Art. 4 EU-RL 2023/970 definiert die Bewertungskriterien. Fachanwalt erklärt Vergleichbarkeit, Praxisbeispiele & BAG-Urteil.',
  path: '/gleicher-lohn-gleiche-arbeit',
});

const faqs = [
  {
    question: 'Was bedeutet „gleiche oder gleichwertige Arbeit" nach EU-Recht?',
    answer: 'Art. 4 Abs. 1 der EU-Richtlinie 2023/970 definiert gleiche Arbeit als Tätigkeiten, die in Bezug auf Kompetenzen, Belastungen, Verantwortung und Arbeitsbedingungen identisch oder vergleichbar sind. Gleichwertige Arbeit liegt vor, wenn diese vier Kriterien in der Gesamtbewertung zu einem ähnlichen Ergebnis führen — auch wenn die konkreten Aufgaben unterschiedlich sind.',
  },
  {
    question: 'Wie wird die Vergleichbarkeit von Tätigkeiten geprüft?',
    answer: 'Die Prüfung erfolgt anhand objektiver, geschlechtsneutraler Kriterien gemäß Art. 4 Abs. 4 EU-RL 2023/970: (1) Kompetenzen — Ausbildung, Erfahrung, Fähigkeiten, (2) Belastungen — physische, psychische und emotionale Anforderungen, (3) Verantwortung — Entscheidungsbefugnis, Personal- und Budgetverantwortung, (4) Arbeitsbedingungen — Umgebung, Gefahren, Arbeitszeiten. Diese Bewertung muss nachvollziehbar und diskriminierungsfrei erfolgen.',
  },
  {
    question: 'Reicht ein Vergleich mit einer einzigen Kollegin oder einem Kollegen?',
    answer: 'Ja. Das BAG hat im Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein sogenannter Paarvergleich — also der Vergleich mit einer einzelnen Person in vergleichbarer Position — ausreicht, um eine Vermutung der Entgeltdiskriminierung zu begründen. Sie benötigen keine statistische Auswertung über die gesamte Belegschaft.',
  },
  {
    question: 'Was passiert, wenn mein Arbeitgeber die Vergleichbarkeit bestreitet?',
    answer: 'Wenn Sie einen Gehaltsunterschied nachweisen, greift die Beweislastumkehr nach Art. 18 EU-RL 2023/970: Der Arbeitgeber muss dann beweisen, dass die Tätigkeiten nicht vergleichbar sind oder dass der Gehaltsunterschied auf objektiven, geschlechtsneutralen Kriterien beruht. Kann er das nicht, wird Diskriminierung vermutet.',
  },
  {
    question: 'Gilt der Grundsatz auch bei unterschiedlichen Jobtiteln?',
    answer: 'Ja. Entscheidend ist nicht der Jobtitel, sondern die tatsächlich ausgeübte Tätigkeit. Eine „Sachbearbeiterin" und ein „Fachkoordinator" können gleiche oder gleichwertige Arbeit leisten, wenn Kompetenzen, Belastungen, Verantwortung und Arbeitsbedingungen vergleichbar sind. Gerade hier setzt Art. 4 EU-RL 2023/970 an, um Verschleierung durch unterschiedliche Bezeichnungen zu verhindern.',
  },
];

const kriterien = [
  {
    title: 'Kompetenzen',
    text: 'Ausbildung, Berufserfahrung, fachliche und soziale Fähigkeiten. Entscheidend ist, was die Tätigkeit erfordert — nicht der höchste Abschluss des Stelleninhabers.',
  },
  {
    title: 'Belastungen',
    text: 'Physische, psychische und emotionale Anforderungen. Dazu zählen Bildschirmarbeit, Kundenkontakt, Stressbelastung, körperliche Beanspruchung und Monotonie.',
  },
  {
    title: 'Verantwortung',
    text: 'Entscheidungsbefugnis, Budget- und Personalverantwortung, Auswirkungen von Fehlern. Hier muss geschlechtsneutral bewertet werden — Führung eines 10-Personen-Teams wiegt gleich, ob in der Pflege oder im Vertrieb.',
  },
  {
    title: 'Arbeitsbedingungen',
    text: 'Arbeitsumgebung, Gefahren, Arbeitszeiten, Reisetätigkeit, Erreichbarkeit. Diese Faktoren müssen objektiv und nicht stereotyp bewertet werden (Art. 4 Abs. 4 EU-RL).',
  },
];

const praxisbeispiele = [
  {
    title: 'Sachbearbeiterin vs. Fachkoordinator',
    text: 'Beide bearbeiten Kundenanfragen, verantworten ein Aufgabengebiet und berichten an die Teamleitung. Trotz unterschiedlicher Jobtitel liegt gleichwertige Arbeit vor — ein Gehaltsunterschied von 600 € monatlich ist nicht gerechtfertigt.',
  },
  {
    title: 'Pflegekraft vs. Techniker',
    text: 'Beide benötigen dreijährige Ausbildung, tragen Verantwortung für Menschen bzw. Anlagen, arbeiten im Schichtdienst. Nach EU-rechtlicher Bewertung kann Gleichwertigkeit vorliegen — trotz verschiedener Branchen.',
  },
  {
    title: 'Teamleiterin Marketing vs. Teamleiter Vertrieb',
    text: 'Vergleichbare Teamgröße, ähnliches Budget, gleiche Hierarchieebene. Brancheninterne Gehaltsunterschiede sind nur gerechtfertigt, wenn objektive und geschlechtsneutrale Gründe vorliegen (z. B. nachweisbar höherer Umsatzeinfluss).',
  },
];

export default function GleicherLohnGleicheArbeitPage() {
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
              { '@type': 'ListItem', position: 2, name: 'Arbeitnehmer', item: `${SEO_CONFIG.baseUrl}/arbeitnehmer` },
              { '@type': 'ListItem', position: 3, name: 'Gleicher Lohn für gleiche Arbeit', item: `${SEO_CONFIG.baseUrl}/gleicher-lohn-gleiche-arbeit` },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-green-bg max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Arbeitnehmer</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gleicher Lohn für gleiche Arbeit — Was das Gesetz vorschreibt
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Art. 4 der EU-Richtlinie 2023/970 verpflichtet Arbeitgeber, für gleiche oder gleichwertige
              Arbeit gleiches Entgelt zu zahlen — unabhängig vom Geschlecht. Nach Destatis liegt der
              bereinigte Gender Pay Gap bei ca. 6%, was bedeutet, dass Frauen bei vergleichbarer
              Tätigkeit immer noch weniger verdienen als Männer. Das BAG hat mit Az. 8 AZR 300/24
              bestätigt, dass bereits ein einzelner Gehaltsvergleich ausreicht, um eine Vermutung
              der Diskriminierung zu begründen.
            </p>
          </div>
        </header>

        {/* Bewertungskriterien */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-3">
              Die 4 Bewertungskriterien nach Art. 4 EU-RL 2023/970
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-8 max-w-[700px]">
              Die EU-Richtlinie definiert vier objektive, geschlechtsneutrale Kriterien, anhand derer
              geprüft wird, ob zwei Tätigkeiten als gleich oder gleichwertig gelten.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {kriterien.map((k, i) => (
                <FadeUp key={k.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-green-bg border border-green-bg rounded p-6 h-full">
                    <div className="w-8 h-8 rounded-full bg-green-bg text-green font-bold text-[0.9rem] flex items-center justify-center mb-3">{i + 1}</div>
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{k.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{k.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Praxisbeispiele */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Praxisbeispiele: Wann liegt gleichwertige Arbeit vor?
            </h2>
            <div className="space-y-5">
              {praxisbeispiele.map((p, i) => (
                <FadeUp key={p.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-6">
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{p.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{p.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um
                  eine Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine
                  statistische Auswertung der gesamten Belegschaft vorlegen — ein einziger Vergleich
                  mit einer Person in vergleichbarer Position genügt. Dies erleichtert die Durchsetzung
                  des Grundsatzes &bdquo;Gleicher Lohn für gleiche Arbeit&ldquo; erheblich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu gleichem Lohn für gleiche Arbeit
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
              Werden Sie für gleiche Arbeit schlechter bezahlt?
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen kostenfrei, ob Ihre Tätigkeit als gleichwertig gilt und ob Ihnen eine Nachzahlung zusteht.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-green hover:bg-green-bg hover:-translate-y-0.5"
            >
              Jetzt Ersteinschätzung anfordern &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
