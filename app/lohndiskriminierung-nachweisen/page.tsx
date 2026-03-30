import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Lohndiskriminierung nachweisen — Beweislastumkehr nutzen (${new Date().getFullYear()})`,
  description:
    'Lohndiskriminierung nachweisen mit Beweislastumkehr nach Art. 18 EU-RL 2023/970. Paarvergleich, Auskunftsrecht als Beweismittel. Fachanwalt berät.',
  path: '/lohndiskriminierung-nachweisen',
});

const faqs = [
  {
    question: 'Was ist eine Lohndiskriminierung im rechtlichen Sinne?',
    answer: 'Lohndiskriminierung liegt vor, wenn Beschäftigte aufgrund ihres Geschlechts für gleiche oder gleichwertige Arbeit unterschiedlich vergütet werden, ohne dass objektive, geschlechtsneutrale Gründe vorliegen (Art. 4 EU-RL 2023/970). Der unbereinigte Gender Pay Gap in Deutschland beträgt 16 % (Destatis, Dezember 2025) — der bereinigte Gap liegt bei ca. 6 %, was auf direkte Diskriminierung hindeutet.',
  },
  {
    question: 'Wie funktioniert die Beweislastumkehr nach Art. 18 EU-RL?',
    answer: 'Sobald Sie eine Gehaltsdifferenz zwischen sich und einer Vergleichsperson des anderen Geschlechts nachweisen, wird vermutet, dass eine Diskriminierung vorliegt. Der Arbeitgeber muss dann beweisen, dass die Differenz auf objektiven, geschlechtsneutralen Kriterien beruht (Art. 18 EU-RL 2023/970). Gelingt ihm das nicht, ist die Diskriminierung bewiesen.',
  },
  {
    question: 'Reicht ein Vergleich mit einer einzelnen Person (Paarvergleich)?',
    answer: 'Ja. Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 ausdrücklich bestätigt, dass ein Paarvergleich ausreicht, um eine Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine Statistik über die gesamte Belegschaft vorlegen — der Vergleich mit einer Person in vergleichbarer Position genügt.',
  },
  {
    question: 'Wie kann ich das Auskunftsrecht als Beweismittel nutzen?',
    answer: 'Das Auskunftsrecht nach Art. 7 EU-RL 2023/970 ist Ihr wichtigstes Beweismittel. Fordern Sie Auskunft über das durchschnittliche Entgelt für vergleichbare Positionen nach Geschlecht an. Zeigt die Auskunft eine Differenz, begründet dies die Vermutung einer Diskriminierung. Verweigert der Arbeitgeber die Auskunft, greift die Beweislastumkehr automatisch.',
  },
  {
    question: 'Welche Statistiken und Quellen kann ich zusätzlich heranziehen?',
    answer: 'Neben dem individuellen Auskunftsrecht können Sie auf Daten des Statistischen Bundesamts (Verdienststrukturerhebung), Gehaltsberichte der Branche, interne Berichtspflichten des Arbeitgebers (Art. 9 EU-RL) sowie Stellenanzeigen mit Gehaltsspannen (Art. 5 EU-RL) zurückgreifen. All diese Quellen können die Vermutung der Diskriminierung stützen.',
  },
];

export default function LohndiskriminierungNachweisenPage() {
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
                    name: 'Lohndiskriminierung nachweisen',
                    item: `${SEO_CONFIG.baseUrl}/lohndiskriminierung-nachweisen`,
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
            <span className="text-ink">Lohndiskriminierung nachweisen</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-secondary-50 max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">Arbeitnehmer · Beweisführung</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Lohndiskriminierung nachweisen — Beweislastumkehr nutzen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Dank der Beweislastumkehr nach Art. 18 EU-Richtlinie 2023/970 müssen nicht Sie die Diskriminierung beweisen,
              sondern der Arbeitgeber muss beweisen, dass keine vorliegt. Das BAG hat mit Az. 8 AZR 300/24 bestätigt:
              Bereits ein Paarvergleich mit einer einzigen Vergleichsperson genügt als Nachweis.
            </p>
          </div>
        </header>

        {/* Art. 18 Beweislastumkehr */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 18 EU-RL 2023/970 — Die Beweislastumkehr im Detail
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die Beweislastumkehr nach Art. 18 EU-Richtlinie 2023/970 ist der wichtigste Durchsetzungsmechanismus
                für Arbeitnehmer. <strong>Bisher</strong> mussten Beschäftigte die Diskriminierung vollständig beweisen —
                ein Nachweis, der in der Praxis kaum zu führen war. <strong>Ab Juni 2026</strong> genügt es, eine
                Gehaltsdifferenz darzulegen. Der Arbeitgeber muss dann objektive Gründe nachweisen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Laut Statistischem Bundesamt (Verdienststrukturerhebung 2025) beträgt der unbereinigte Gender Pay Gap
                in Deutschland <strong>16 %</strong>. Der bereinigte Gap — also die Gehaltsdifferenz bei gleicher
                Qualifikation, Branche und Position — liegt bei rund <strong>6 %</strong>. Diese 6 % gelten als
                nicht erklärbare Lücke und können auf direkte Diskriminierung hindeuten.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Der Paarvergleich — BAG Az. 8 AZR 300/24
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Das Bundesarbeitsgericht hat am 23.10.2025 mit Urteil <strong>Az. 8 AZR 300/24</strong> eine
                wegweisende Entscheidung getroffen: Ein Paarvergleich — also der Vergleich Ihres Gehalts mit
                dem einer einzelnen Person des anderen Geschlechts in vergleichbarer Position — reicht aus,
                um eine Vermutung der Entgeltdiskriminierung zu begründen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Das bedeutet konkret: Sie müssen <strong>keine Statistik</strong> über die gesamte Belegschaft
                vorlegen. Ein einziger Vergleich mit einem Kollegen oder einer Kollegin in ähnlicher Position
                mit anderem Geschlecht genügt. Der Arbeitgeber muss dann beweisen, dass die Gehaltsdifferenz
                auf objektiven Kriterien wie Berufserfahrung, Qualifikation oder Leistung beruht.
              </p>
            </FadeUp>

            <FadeUp delay={2}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Das Auskunftsrecht als Beweismittel nutzen
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Das Auskunftsrecht nach Art. 7 EU-RL 2023/970 ist Ihr wichtigstes Werkzeug zur Beweisführung.
                So setzen Sie es strategisch ein:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { nr: '1', title: 'Auskunft anfordern', text: 'Verlangen Sie schriftlich Auskunft über das durchschnittliche Entgelt für vergleichbare Positionen — aufgeschlüsselt nach Geschlecht. Der Arbeitgeber hat 2 Monate Zeit.' },
                  { nr: '2', title: 'Auskunft auswerten', text: 'Zeigt die Auskunft eine Gehaltsdifferenz zuungunsten Ihres Geschlechts? Dann begründet dies die Vermutung einer Diskriminierung und löst die Beweislastumkehr aus.' },
                  { nr: '3', title: 'Nichtbeantwortung dokumentieren', text: 'Verweigert oder ignoriert der Arbeitgeber Ihre Anfrage, greift die Beweislastumkehr automatisch (Art. 18 EU-RL). Dokumentieren Sie den Antrag und die fehlende Antwort.' },
                  { nr: '4', title: 'Ergänzende Beweise sammeln', text: 'Stellenanzeigen mit Gehaltsspannen, Branchenstatistiken (Destatis) und Aussagen von Kollegen können Ihre Position zusätzlich stärken.' },
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

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Statistische Nachweise und Branchendaten
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Neben dem Paarvergleich können auch statistische Daten die Vermutung einer Diskriminierung
                stützen. Relevante Quellen sind:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Verdienststrukturerhebung</strong> des Statistischen Bundesamts (aktuell: Dezember 2025)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Berichtspflichten des Arbeitgebers</strong> nach Art. 9 EU-RL (ab 250 MA: 2027, ab 100 MA: 2031)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Stellenanzeigen</strong> mit Gehaltsspannen (Art. 5 EU-RL — Pflicht ab Juni 2026)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Tarifverträge</strong> und betriebliche Vergütungsordnungen</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Ein Fachanwalt kann diese Daten zusammenführen und eine schlüssige Beweiskette aufbauen,
                die dem Arbeitgeber die Widerlegung der Diskriminierungsvermutung deutlich erschwert.
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
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um eine Vermutung
                  der Entgeltdiskriminierung zu begründen. Der Arbeitgeber konnte im konkreten Fall nicht nachweisen,
                  dass die Gehaltsdifferenz auf objektiven Kriterien beruhte. Dieses Urteil ist ein Meilenstein
                  für die Durchsetzung von Equal Pay in Deutschland.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Beweisführung bei Lohndiskriminierung
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
              Kostenlose Ersteinschätzung — Lohndiskriminierung prüfen lassen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen, ob eine Gehaltsdiskriminierung vorliegt und welche Ansprüche Sie haben.
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
