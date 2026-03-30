import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Teilzeit und Gehaltsvergleich — Entgelttransparenz für Teilzeitbeschäftigte (${new Date().getFullYear()})`,
  description:
    'Teilzeitbeschäftigte haben volles Auskunftsrecht: § 4 TzBfG + Art. 7 EU-RL 2023/970. Pro-rata-Vergleich, Diskriminierungsverbot & Klagemöglichkeiten — Fachanwalt erklärt.',
  path: '/teilzeit-gehaltsvergleich',
});

const faqs = [
  {
    question: 'Haben Teilzeitbeschäftigte das gleiche Auskunftsrecht wie Vollzeitkräfte?',
    answer: 'Ja. Art. 7 EU-RL 2023/970 gilt unabhängig von der Arbeitszeit. Teilzeitbeschäftigte in Unternehmen ab 50 Mitarbeitern können ab dem 7. Juni 2026 Auskunft über das Durchschnittsentgelt vergleichbarer Positionen verlangen — aufgeschlüsselt nach Geschlecht. Der Vergleich erfolgt auf Pro-rata-Basis, also umgerechnet auf die gleiche Stundenzahl.',
  },
  {
    question: 'Was bedeutet das Diskriminierungsverbot nach § 4 TzBfG?',
    answer: '§ 4 Abs. 1 TzBfG verbietet die Schlechterstellung von Teilzeitbeschäftigten gegenüber vergleichbaren Vollzeitbeschäftigten — es sei denn, sachliche Gründe rechtfertigen die ungleiche Behandlung. Dies umfasst Grundgehalt, Zulagen, Boni, Beförderungschancen und betriebliche Altersvorsorge. Das Verbot gilt kumulativ mit dem Diskriminierungsschutz nach § 3 AGG und der EU-RL 2023/970.',
  },
  {
    question: 'Wie funktioniert der Pro-rata-Vergleich bei Teilzeit?',
    answer: 'Beim Pro-rata-Vergleich wird das Gehalt auf eine vergleichbare Stundenbasis umgerechnet. Beispiel: Eine Vollzeitkraft (40 Std.) verdient 4.000 € = 100 €/Std. (umgerechnet). Eine Teilzeitkraft (20 Std.) in vergleichbarer Position müsste dann mindestens 2.000 € verdienen. Liegt das Teilzeitgehalt darunter (z. B. 1.800 €), kann eine Diskriminierung vorliegen.',
  },
  {
    question: 'Betrifft Teilzeitdiskriminierung überwiegend Frauen?',
    answer: 'Ja. Laut Destatis arbeiten 48% der erwerbstätigen Frauen in Teilzeit, aber nur 12% der Männer. Dadurch hat Teilzeitdiskriminierung eine stark geschlechtsspezifische Dimension. Gerichte werten eine Benachteiligung von Teilzeitbeschäftigten daher häufig als mittelbare Geschlechtsdiskriminierung nach § 3 Abs. 2 AGG — was die Beweislastumkehr auslöst.',
  },
  {
    question: 'Kann ich Boni und Sonderzahlungen anteilig einfordern?',
    answer: 'Ja. Nach § 4 TzBfG und der ständigen BAG-Rechtsprechung haben Teilzeitbeschäftigte Anspruch auf anteilige (pro rata temporis) Gewährung aller Vergütungsbestandteile — einschließlich Boni, Weihnachtsgeld, Urlaubsgeld und Sonderzahlungen. Eine vollständige Nichtgewährung oder unterproportionale Kürzung ist nur bei Vorliegen sachlicher Gründe zulässig.',
  },
];

const kernpunkte = [
  {
    title: '§ 4 TzBfG: Diskriminierungsverbot',
    text: 'Teilzeitbeschäftigte dürfen nicht schlechter behandelt werden als vergleichbare Vollzeitkräfte — bei Gehalt, Zulagen, Boni, Beförderungen und betrieblicher Altersvorsorge. Ein sachlicher Grund muss nachgewiesen werden.',
  },
  {
    title: 'Art. 7 EU-RL: Volles Auskunftsrecht',
    text: 'Ab Juni 2026 können Teilzeitbeschäftigte Auskunft über Vergleichsgehälter verlangen. Der Arbeitgeber muss innerhalb von 2 Monaten antworten — unabhängig davon, ob die anfragende Person in Voll- oder Teilzeit arbeitet.',
  },
  {
    title: 'Mittelbare Diskriminierung',
    text: 'Da 48% der Frauen in Teilzeit arbeiten (vs. 12% der Männer, Destatis), wird Teilzeitbenachteiligung von Gerichten häufig als mittelbare Geschlechtsdiskriminierung nach § 3 Abs. 2 AGG gewertet.',
  },
  {
    title: 'Pro-rata-Grundsatz',
    text: 'Alle Vergütungsbestandteile müssen anteilig (pro rata temporis) gewährt werden. Eine unterproportionale Kürzung von Boni oder Sonderzahlungen ist ohne sachlichen Grund rechtswidrig.',
  },
];

export default function TeilzeitGehaltsvergleichPage() {
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
              { '@type': 'ListItem', position: 3, name: 'Teilzeit & Gehaltsvergleich', item: `${SEO_CONFIG.baseUrl}/teilzeit-gehaltsvergleich` },
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
              Teilzeit und Gehaltsvergleich — Entgelttransparenz für Teilzeitbeschäftigte
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Teilzeitbeschäftigte haben das gleiche Recht auf Entgelttransparenz wie
              Vollzeitkräfte. § 4 TzBfG verbietet die Schlechterstellung bei der Vergütung,
              Art. 7 der EU-RL 2023/970 garantiert das individuelle Auskunftsrecht unabhängig
              von der Arbeitszeit. Da 48% der Frauen in Teilzeit arbeiten (Destatis), hat
              Teilzeitdiskriminierung eine stark geschlechtsspezifische Dimension.
            </p>
          </div>
        </header>

        {/* Statistik-Karten */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              <FadeUp>
                <div className="bg-green-bg border border-green-bg rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-green">48%</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">der Frauen in Teilzeit</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">vs. 12% der Männer (Destatis)</div>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-green-bg border border-green-bg rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-green">§ 4</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">TzBfG Diskriminierungsverbot</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Gleichbehandlung bei Entgelt</div>
                </div>
              </FadeUp>
              <FadeUp delay={2}>
                <div className="bg-green-bg border border-green-bg rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-green">Art. 7</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">EU-RL 2023/970</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Auskunftsrecht ab 50 MA</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Kernpunkte */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Ihre Rechte als Teilzeitbeschäftigte:r
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {kernpunkte.map((k, i) => (
                <FadeUp key={k.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-6 h-full">
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{k.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{k.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Rechenbeispiel */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-border-light rounded p-8">
                <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.6rem)] font-bold leading-tight mb-4">
                  Rechenbeispiel: Pro-rata-Vergleich
                </h2>
                <div className="text-[0.95rem] text-ink-muted leading-relaxed space-y-3">
                  <p className="m-0">
                    <strong>Vollzeitkraft (40 Std.):</strong> 4.400 € brutto = 110 € pro Stunde (umgerechnet).
                  </p>
                  <p className="m-0">
                    <strong>Teilzeitkraft (20 Std., vergleichbare Position):</strong> Sollte 2.200 € verdienen
                    (20 Std. &times; 110 €). Tatsächliches Gehalt: 1.900 €.
                  </p>
                  <p className="m-0">
                    <strong>Monatliche Differenz:</strong> 300 €. <strong>Nachzahlung (3 Jahre):</strong> 300 € &times; 36
                    Monate = 10.800 €. Dazu Verzugszinsen und ggf. immaterielle Entschädigung nach Art. 21 EU-RL 2023/970.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Relevant für Teilzeitbeschäftigte</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das BAG hat bestätigt, dass ein <strong>Paarvergleich ausreicht</strong> — auch für
                  Teilzeitbeschäftigte. Wenn Ihr umgerechneter Stundenlohn unter dem einer
                  vergleichbaren Vollzeitkraft liegt, genügt dieser einzelne Vergleich, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Der Arbeitgeber muss dann
                  nachweisen, dass die Differenz sachlich gerechtfertigt ist.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu Teilzeit und Gehaltsvergleich
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
              Werden Sie als Teilzeitkraft benachteiligt?
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen kostenfrei, ob Ihr Gehalt dem Pro-rata-Grundsatz entspricht und ob Ihnen Nachzahlungen zustehen.
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
