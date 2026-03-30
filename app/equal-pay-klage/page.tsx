import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Equal-Pay-Klage — Gleichen Lohn vor Gericht durchsetzen (${new Date().getFullYear()})`,
  description:
    'Equal-Pay-Klage einreichen: Verfahrensablauf, Klagefrist, Kosten und Erfolgsaussichten. BAG Az. 8 AZR 300/24 stärkt Ihre Position. Fachanwalt berät.',
  path: '/equal-pay-klage',
});

const faqs = [
  {
    question: 'Wann sollte ich eine Equal-Pay-Klage einreichen?',
    answer: 'Eine Equal-Pay-Klage ist sinnvoll, wenn die Auskunft nach Art. 7 EU-RL 2023/970 eine Gehaltsdifferenz aufzeigt und der Arbeitgeber keine Anpassung vornimmt. Auch bei Verweigerung der Auskunft können Sie klagen — dann greift die Beweislastumkehr nach Art. 18 EU-RL. Die reguläre Verjährungsfrist beträgt 3 Jahre (§ 195 BGB), ab Kenntnis der Diskriminierung.',
  },
  {
    question: 'Wie läuft ein Equal-Pay-Verfahren vor dem Arbeitsgericht ab?',
    answer: 'Das Verfahren beginnt mit der Klageschrift beim zuständigen Arbeitsgericht. Nach Zustellung erfolgt eine Güteverhandlung (ca. 2-4 Wochen). Scheitert die Güteverhandlung, folgt der Kammertermin (ca. 3-6 Monate). In der ersten Instanz besteht kein Anwaltszwang, die anwaltliche Vertretung ist aber dringend empfohlen. Berufung ist beim LAG möglich.',
  },
  {
    question: 'Was kostet eine Equal-Pay-Klage?',
    answer: 'Die Gerichtskosten richten sich nach dem Streitwert (= Gehaltsdifferenz). Bei einem Streitwert von 20.000 € betragen die Gerichtskosten ca. 588 €. In der ersten Instanz vor dem Arbeitsgericht trägt jede Partei ihre Anwaltskosten selbst — unabhängig vom Ausgang. Viele Rechtsschutzversicherungen decken Equal-Pay-Klagen ab.',
  },
  {
    question: 'Reicht ein Vergleich mit einer einzelnen Person als Beweis?',
    answer: 'Ja. Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 klargestellt, dass ein Paarvergleich — der Vergleich mit einer einzelnen Person des anderen Geschlechts in vergleichbarer Position — ausreicht, um eine Vermutung der Entgeltdiskriminierung zu begründen. Eine Statistik über die gesamte Belegschaft ist nicht erforderlich.',
  },
  {
    question: 'Welche Entschädigung kann ich bei einer Equal-Pay-Klage erhalten?',
    answer: 'Die Klage kann auf die vollständige Gehaltsdifferenz für bis zu 3 Jahre rückwirkend (Art. 21 EU-RL 2023/970), Verzugszinsen nach § 288 BGB (5 Prozentpunkte über Basiszins), immaterielle Entschädigung (§ 15 Abs. 2 AGG) sowie zukünftige Gleichstellung gerichtet werden. Bei 500 € monatlicher Differenz liegt die Gesamtforderung schnell über 20.000 €.',
  },
];

export default function EqualPayKlagePage() {
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
                    name: 'Equal-Pay-Klage',
                    item: `${SEO_CONFIG.baseUrl}/equal-pay-klage`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <main>
        {/* Breadcrumb */}
        <div className="pt-[130px] px-8 bg-green-bg max-md:pt-[110px] max-md:px-6">
          <nav className="max-w-content mx-auto text-[0.8rem] text-ink-muted">
            <a href="/" className="hover:text-gold transition-colors no-underline text-ink-muted">Start</a>
            <span className="mx-1.5">/</span>
            <a href="/arbeitnehmer" className="hover:text-gold transition-colors no-underline text-ink-muted">Arbeitnehmer</a>
            <span className="mx-1.5">/</span>
            <span className="text-ink">Equal-Pay-Klage</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-green-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Arbeitnehmer · Klage</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Equal-Pay-Klage — Gleichen Lohn vor Gericht durchsetzen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Eine Equal-Pay-Klage ist der effektivste Weg, geschlechtsbezogene Gehaltsunterschiede durchzusetzen,
              wenn der Arbeitgeber nicht freiwillig korrigiert. Mit der Beweislastumkehr nach Art. 18 EU-RL 2023/970
              muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt — nicht Sie.
            </p>
          </div>
        </header>

        {/* Wann klagen */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Wann ist eine Equal-Pay-Klage sinnvoll?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Eine Klage kommt in Betracht, wenn der Arbeitgeber trotz nachgewiesener Gehaltsdifferenz keine Anpassung
                vornimmt. Der unbereinigte Gender Pay Gap in Deutschland beträgt 16 %, der bereinigte rund 6 %
                (Statistisches Bundesamt, Dezember 2025). Das bedeutet: Frauen verdienen im Median
                ca. <strong>4.500 € pro Jahr weniger</strong> als Männer in vergleichbaren Positionen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Typische Klagegründe sind: Auskunft zeigt Gehaltslücke, Arbeitgeber verweigert die Auskunft,
                oder Arbeitgeber gibt unvollständige Informationen heraus. In allen drei Fällen stehen Ihre Chancen
                gut — insbesondere durch die Beweislastumkehr nach Art. 18 EU-RL 2023/970.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Verfahrensablauf einer Equal-Pay-Klage
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { nr: '1', title: 'Auskunftsantrag stellen', text: 'Zunächst fordern Sie Auskunft über Vergleichsgehälter nach Art. 7 EU-RL 2023/970 an. Der Arbeitgeber hat 2 Monate Zeit zur Beantwortung. Diese Auskunft bildet die Grundlage für Ihre Klage.' },
                  { nr: '2', title: 'Außergerichtliche Aufforderung', text: 'Ergibt die Auskunft eine Gehaltslücke, fordern Sie den Arbeitgeber schriftlich zur Gehaltsanpassung und Nachzahlung auf. Setzen Sie eine Frist von 2-4 Wochen.' },
                  { nr: '3', title: 'Klageschrift einreichen', text: 'Bleibt die Aufforderung erfolglos, wird beim zuständigen Arbeitsgericht Klage eingereicht. Die Klage richtet sich auf Nachzahlung, immaterielle Entschädigung und zukünftige Gleichbehandlung.' },
                  { nr: '4', title: 'Güteverhandlung', text: 'Das Gericht terminiert zunächst eine Güteverhandlung (ca. 2-4 Wochen nach Klageerhebung). Über 60 % der arbeitsrechtlichen Verfahren enden hier mit einem Vergleich.' },
                  { nr: '5', title: 'Kammertermin oder Vergleich', text: 'Scheitert die Güteverhandlung, folgt der Kammertermin mit Beweisaufnahme (ca. 3-6 Monate). Das Gericht prüft, ob der Arbeitgeber die Vermutung der Diskriminierung widerlegen kann.' },
                ].map((step) => (
                  <div key={step.nr} className="flex gap-4">
                    <div className="w-9 h-9 min-w-[36px] rounded-full bg-green-bg border border-green/30 flex items-center justify-center text-green font-bold text-[0.85rem]">
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
                Klagefrist und Verjährung
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die reguläre Verjährungsfrist für Entgeltansprüche beträgt <strong>3 Jahre</strong> (§ 195 BGB),
                gerechnet ab dem Schluss des Jahres, in dem der Anspruch entstanden ist. Zusätzlich müssen Sie
                die Entschädigungsansprüche nach § 15 Abs. 4 AGG innerhalb von <strong>2 Monaten</strong> nach
                Kenntnis der Diskriminierung schriftlich geltend machen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Wichtig: Die Klagefrist nach § 61b ArbGG beträgt <strong>3 Monate</strong> nach schriftlicher
                Geltendmachung. Handeln Sie daher zeitnah, wenn Sie von einer Gehaltsdiskriminierung erfahren.
              </p>
            </FadeUp>

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Kosten einer Equal-Pay-Klage
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die Gerichtskosten richten sich nach dem Streitwert. Bei einer Gehaltsdifferenz von 500 € pro
                Monat und 3 Jahren Rückforderung beträgt der Streitwert 18.000 € — die Gerichtskosten liegen
                dann bei rund <strong>534 €</strong>.
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Erste Instanz:</strong> Jede Partei trägt ihre Anwaltskosten selbst (§ 12a ArbGG)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Gerichtskosten:</strong> Werden nach dem GKG berechnet, Vorschuss ist nicht erforderlich</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Rechtsschutzversicherung:</strong> Arbeitsrechtsschutz deckt Equal-Pay-Klagen in der Regel ab</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Prozesskostenhilfe:</strong> Bei geringem Einkommen möglich (§ 11a ArbGG)</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Das finanzielle Risiko ist überschaubar — der potenzielle Anspruch (Nachzahlung + Entschädigung)
                übersteigt die Kosten in der Regel deutlich.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 — Paarvergleich genügt</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat am 23.10.2025 bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um
                  eine Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen nicht die gesamte Belegschaft
                  statistisch auswerten — der Vergleich mit einer einzelnen Person des anderen Geschlechts in
                  vergleichbarer Position genügt. Dieses Urteil stärkt die Position von Klägern in Equal-Pay-Verfahren erheblich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Entschädigungsansprüche */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Entschädigungsansprüche bei Erfolg
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Bei erfolgreicher Equal-Pay-Klage können Sie folgende Ansprüche durchsetzen:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Gehaltsdifferenz rückwirkend:</strong> Bis zu 3 Jahre (Art. 21 EU-RL 2023/970)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Verzugszinsen:</strong> 5 Prozentpunkte über Basiszins ab Fälligkeit (§ 288 BGB)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Immaterielle Entschädigung:</strong> Für die Diskriminierung selbst (§ 15 Abs. 2 AGG)</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Zukünftige Gleichstellung:</strong> Anpassung der Vergütung auf das Vergleichsniveau</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Rechenbeispiel: Bei 500 € monatlicher Gehaltsdifferenz ergibt sich eine Nachzahlung von 18.000 €
                (36 Monate), plus Verzugszinsen von ca. 1.800 €, plus immaterielle Entschädigung von typischerweise
                3.000-6.000 €. Die Gesamtforderung kann so <strong>über 23.000 €</strong> betragen.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Equal-Pay-Klage
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
              Kostenlose Ersteinschätzung — Equal-Pay-Klage prüfen lassen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Erfolgsaussichten und berechnen Ihren möglichen Entschädigungsanspruch.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-green hover:bg-green-bg hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
