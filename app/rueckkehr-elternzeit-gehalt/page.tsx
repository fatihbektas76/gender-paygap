import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Rückkehr nach Elternzeit — Recht auf gleiches Gehalt (${new Date().getFullYear()})`,
  description:
    'Nach Elternzeit: § 15 Abs. 5 BEEG sichert Ihren gleichwertigen Arbeitsplatz. Gehaltsanpassungen, Diskriminierungsschutz & Klagemöglichkeiten — Fachanwalt erklärt.',
  path: '/rueckkehr-elternzeit-gehalt',
});

const faqs = [
  {
    question: 'Habe ich nach der Elternzeit Anspruch auf mein altes Gehalt?',
    answer: 'Ja. § 15 Abs. 5 BEEG garantiert Ihnen die Rückkehr auf einen gleichwertigen Arbeitsplatz mit mindestens gleichem Entgelt. Ihr Gehalt darf nicht geringer sein als vor der Elternzeit. Darüber hinaus müssen allgemeine Gehaltserhöhungen (z. B. Tariferhöhungen), die während Ihrer Abwesenheit gewährt wurden, bei Ihrer Rückkehr berücksichtigt werden.',
  },
  {
    question: 'Was passiert, wenn meine Stelle während der Elternzeit gestrichen wurde?',
    answer: 'Wird Ihre konkrete Stelle gestrichen, muss der Arbeitgeber Ihnen einen gleichwertigen Arbeitsplatz mit vergleichbarem Gehalt anbieten. Gleichwertig bedeutet: gleiche Hierarchieebene, vergleichbare Verantwortung, mindestens gleiches Entgelt. Eine Versetzung auf eine geringerwertige Position mit niedrigerem Gehalt verstößt gegen § 15 Abs. 5 BEEG und kann eine Entgeltdiskriminierung nach § 3 AGG darstellen.',
  },
  {
    question: 'Muss mein Arbeitgeber mir Gehaltserhöhungen gewähren, die während der Elternzeit stattfanden?',
    answer: 'Ja, soweit es sich um allgemeine Gehaltsanpassungen handelt — insbesondere Tariferhöhungen, betriebliche Gehaltsrunden oder strukturelle Anpassungen. Nach § 15 Abs. 5 BEEG und Art. 7 EU-RL 2023/970 dürfen Sie nicht schlechter gestellt werden als Kolleg:innen in vergleichbarer Position. Individuelle leistungsbezogene Zulagen können anders zu bewerten sein.',
  },
  {
    question: 'Wie gehe ich vor, wenn mein Gehalt nach der Rückkehr niedriger ist?',
    answer: 'Schritt 1: Nutzen Sie Ihr Auskunftsrecht nach Art. 7 EU-RL 2023/970 und fordern Sie Vergleichsgehälter an. Schritt 2: Dokumentieren Sie Ihr Gehalt vor und nach der Elternzeit. Schritt 3: Kontaktieren Sie einen Fachanwalt — das BAG-Urteil Az. 8 AZR 300/24 erleichtert Ihnen den Nachweis erheblich, da bereits ein Paarvergleich ausreicht.',
  },
  {
    question: 'Kann ich rückwirkend Gehaltsnachzahlungen verlangen?',
    answer: 'Ja. Nach Art. 21 EU-RL 2023/970 können Sie eine vollständige Nachzahlung der Gehaltsdifferenz für bis zu 3 Jahre rückwirkend fordern. Dazu kommen Verzugszinsen nach § 288 BGB und eine immaterielle Entschädigung. Bei einer monatlichen Differenz von 400 € kann die Gesamtforderung über 16.000 € betragen.',
  },
];

const schritte = [
  {
    num: '1',
    title: 'Auskunft anfordern',
    text: 'Fordern Sie vor oder unmittelbar nach der Rückkehr Auskunft über Vergleichsgehälter an (Art. 7 EU-RL 2023/970). Sie haben Anspruch auf das Durchschnittsentgelt vergleichbarer Positionen, aufgeschlüsselt nach Geschlecht.',
  },
  {
    num: '2',
    title: 'Gehaltsvergleich dokumentieren',
    text: 'Vergleichen Sie Ihr aktuelles Gehalt mit dem Gehalt vor der Elternzeit und mit den Vergleichsdaten. Berücksichtigen Sie Tariferhöhungen und allgemeine Gehaltsanpassungen, die während Ihrer Abwesenheit stattfanden.',
  },
  {
    num: '3',
    title: 'Diskriminierung geltend machen',
    text: 'Liegt eine Gehaltsdifferenz vor, greift die Beweislastumkehr nach Art. 18 EU-RL 2023/970: Der Arbeitgeber muss beweisen, dass die Differenz auf objektiven, geschlechtsneutralen Gründen beruht.',
  },
  {
    num: '4',
    title: 'Entschädigung einfordern',
    text: 'Sie haben Anspruch auf vollständige Nachzahlung (bis 3 Jahre rückwirkend), Verzugszinsen und immaterielle Entschädigung. Ein Fachanwalt kann Ihre Ansprüche berechnen und durchsetzen.',
  },
];

export default function RueckkehrElternzeitGehaltPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Rückkehr nach Elternzeit', item: `${SEO_CONFIG.baseUrl}/rueckkehr-elternzeit-gehalt` },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-secondary-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">Arbeitnehmer</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Rückkehr nach Elternzeit — Recht auf gleiches Gehalt
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              § 15 Abs. 5 BEEG sichert Ihnen nach der Elternzeit die Rückkehr auf einen gleichwertigen
              Arbeitsplatz mit mindestens gleichem Entgelt. Laut Destatis verdienen Mütter nach der
              Elternzeit im Durchschnitt 12–18% weniger als vor der Geburt. Die EU-Richtlinie 2023/970
              gibt Ihnen ab Juni 2026 wirksame Instrumente, um Gehaltskürzungen nach der Elternzeit
              anzufechten und Nachzahlungen einzufordern.
            </p>
          </div>
        </header>

        {/* Kernrechte */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-3">
              Was § 15 Abs. 5 BEEG Ihnen garantiert
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-8 max-w-[700px]">
              Das Bundeselterngeld- und Elternzeitgesetz schützt Ihren Arbeitsplatz und Ihr Gehalt
              während und nach der Elternzeit. Diese Rechte sind nicht verhandelbar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Gleichwertiger Arbeitsplatz',
                  text: 'Rückkehr auf eine Position mit gleicher Hierarchieebene, vergleichbarer Verantwortung und mindestens gleichem Entgelt. Eine Versetzung auf eine geringerwertige Stelle ist unzulässig.',
                },
                {
                  title: 'Gehaltsanpassungen inklusive',
                  text: 'Tariferhöhungen, allgemeine Gehaltsrunden und strukturelle Anpassungen, die während der Elternzeit gewährt wurden, müssen bei Rückkehr übernommen werden.',
                },
                {
                  title: 'Benachteiligungsverbot',
                  text: 'Elternzeit darf kein Grund für schlechtere Bezahlung, Zurückstufung oder Karrierenachteile sein. Verstöße sind nach § 3 AGG und Art. 25 EU-RL 2023/970 eigenständig einklagbar.',
                },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-secondary-50 border border-secondary/20 rounded p-6 h-full">
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Schritt-für-Schritt */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              In 4 Schritten zu Ihrem Recht
            </h2>
            <div className="space-y-4">
              {schritte.map((s, i) => (
                <FadeUp key={s.num} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-white rounded p-5 border border-border-light">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-700 font-bold text-[1rem] flex items-center justify-center shrink-0">{s.num}</div>
                    <div>
                      <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-1">{s.title}</h3>
                      <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{s.text}</p>
                    </div>
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
              <div className="bg-white border border-secondary/30 rounded p-8 border-l-[4px] border-l-secondary">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Ihr Vorteil bei der Rückkehr</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Wenn Sie nach der Elternzeit feststellen, dass Ihr Gehalt niedriger ist als das
                  eines Kollegen in vergleichbarer Position, reicht dieser <strong>einzelne
                  Vergleich</strong> als Vermutungsgrundlage. Der Arbeitgeber muss dann beweisen,
                  dass die Differenz nicht auf Ihrer Elternzeit oder Ihrem Geschlecht beruht.
                  Diese Beweislastumkehr stärkt Ihre Position als Rückkehrer:in erheblich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Rechenbeispiel */}
        <section className="py-[70px] px-8 bg-slate-50 max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-border-light rounded p-8">
                <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold leading-tight mb-4">
                  Rechenbeispiel: Was Ihnen zusteht
                </h2>
                <div className="text-[0.95rem] text-ink-muted leading-relaxed space-y-3">
                  <p className="m-0">
                    <strong>Situation:</strong> Gehalt vor Elternzeit: 4.200 € brutto. Während der Elternzeit erhielten
                    Kolleg:innen eine Tariferhöhung von 5%. Ihr Gehalt bei Rückkehr: 4.200 € (statt 4.410 €).
                  </p>
                  <p className="m-0">
                    <strong>Monatliche Differenz:</strong> 210 €. <strong>Nachzahlung (3 Jahre):</strong> 210 € &times; 36
                    Monate = 7.560 €. Dazu kommen Verzugszinsen (5 Prozentpunkte über Basiszinssatz) und
                    ggf. immaterielle Entschädigung nach Art. 21 EU-RL 2023/970.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Rückkehr nach Elternzeit
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
              Gehaltseinbußen nach der Elternzeit?
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen kostenfrei, ob Ihr Arbeitgeber Ihre Rechte nach § 15 BEEG verletzt hat.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-secondary-700 hover:bg-secondary-50 hover:-translate-y-0.5"
            >
              Jetzt Ansprüche prüfen lassen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
