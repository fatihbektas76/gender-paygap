import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Beweislastumkehr bei Equal Pay — Der Arbeitgeber muss beweisen (${new Date().getFullYear()})`,
  description:
    'Beweislastumkehr nach Art. 18 EU-RL 2023/970: Der Arbeitgeber muss beweisen, dass keine Diskriminierung vorliegt. BAG Az. 8 AZR 300/24. Fachanwalt berät.',
  path: '/beweislastumkehr-equal-pay',
});

const faqs = [
  {
    question: 'Was bedeutet Beweislastumkehr bei Equal Pay?',
    answer: 'Beweislastumkehr bedeutet, dass nicht Sie als Arbeitnehmer die Diskriminierung beweisen müssen, sondern der Arbeitgeber beweisen muss, dass keine Diskriminierung vorliegt (Art. 18 EU-RL 2023/970). Sobald Sie eine Gehaltsdifferenz zum anderen Geschlecht darlegen, wird die Diskriminierung vermutet — der Arbeitgeber muss diese Vermutung widerlegen.',
  },
  {
    question: 'Wann greift die Beweislastumkehr?',
    answer: 'Die Beweislastumkehr greift in vier Fällen: (1) Sie legen eine Gehaltsdifferenz zu einer Vergleichsperson des anderen Geschlechts dar, (2) der Arbeitgeber beantwortet Ihren Auskunftsantrag nicht fristgerecht, (3) der Arbeitgeber gibt unvollständige Auskünfte, (4) der Arbeitgeber verstößt gegen seine Berichtspflichten nach Art. 9 EU-RL 2023/970.',
  },
  {
    question: 'Was muss der Arbeitgeber konkret beweisen?',
    answer: 'Der Arbeitgeber muss nachweisen, dass die Gehaltsdifferenz auf objektiven, geschlechtsneutralen Kriterien beruht — z. B. Berufserfahrung, fachliche Qualifikation, nachweisbare Leistungsunterschiede oder Marktbedingungen. Pauschale Verweise auf „Verhandlungsgeschick" oder „unterschiedliche Gehaltsentwicklung" reichen nach der Rechtsprechung des BAG nicht aus.',
  },
  {
    question: 'Wie hat das BAG die Beweislastumkehr gestärkt?',
    answer: 'Mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 hat das BAG klargestellt, dass bereits ein Paarvergleich — der Vergleich mit einer einzelnen Person des anderen Geschlechts in vergleichbarer Position — ausreicht, um die Beweislastumkehr auszulösen. Eine unternehmensweite Statistik ist nicht erforderlich.',
  },
  {
    question: 'Kann der Arbeitgeber die Vermutung der Diskriminierung widerlegen?',
    answer: 'Ja, aber nur mit konkreten Nachweisen. Der Arbeitgeber muss objektive Kriterien darlegen und beweisen, die den Gehaltsunterschied vollständig erklären. In der Praxis gelingt dies selten, wenn keine transparente Vergütungsstruktur vorliegt. Das Fehlen einer Vergütungsordnung spricht eher gegen den Arbeitgeber.',
  },
];

export default function BeweislastumkehrEqualPayPage() {
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
                    name: 'Beweislastumkehr bei Equal Pay',
                    item: `${SEO_CONFIG.baseUrl}/beweislastumkehr-equal-pay`,
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
            <span className="text-ink">Beweislastumkehr bei Equal Pay</span>
          </nav>
        </div>

        {/* Hero */}
        <header className="pt-6 pb-[80px] px-8 bg-green-bg max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">Arbeitnehmer · Beweislastumkehr</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Beweislastumkehr bei Equal Pay — Der Arbeitgeber muss beweisen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[750px] leading-relaxed mb-0">
              Die Beweislastumkehr nach Art. 18 EU-Richtlinie 2023/970 ist der entscheidende Durchsetzungsmechanismus
              für Equal Pay. Nicht Sie müssen die Diskriminierung beweisen — der Arbeitgeber muss beweisen, dass keine vorliegt.
              Das BAG hat mit Az. 8 AZR 300/24 bestätigt: Ein Paarvergleich genügt, um die Beweislastumkehr auszulösen.
            </p>
          </div>
        </header>

        {/* Art. 18 im Detail */}
        <section className="py-[60px] px-8 bg-white max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto max-w-[800px]">
            <FadeUp>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Art. 18 EU-RL 2023/970 — Die Beweislastumkehr erklärt
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Art. 18 der EU-Entgelttransparenzrichtlinie 2023/970 kehrt die Beweislast in Entgeltdiskriminierungsfällen
                um. <strong>Bisher</strong> mussten Arbeitnehmer die vollständige Beweislast tragen — in der Praxis eine
                kaum überwindbare Hürde, da Gehaltsdaten selten zugänglich waren. <strong>Ab Juni 2026</strong> müssen
                Sie lediglich eine Gehaltsdifferenz darlegen.
              </p>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Laut Statistischem Bundesamt (Dezember 2025) beträgt der bereinigte Gender Pay Gap in Deutschland
                rund <strong>6 %</strong> — also die Gehaltsdifferenz bei gleicher Qualifikation, Branche und
                Position. Bei einem Medianeinkommen von 43.800 € (Frauen) gegenüber 52.200 € (Männer, unbereinigt)
                ist die Diskriminierung statistisch messbar. Die Beweislastumkehr macht diese Zahlen justiziabel.
              </p>
            </FadeUp>

            <FadeUp delay={1}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Wann greift die Beweislastumkehr?
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die Beweislastumkehr nach Art. 18 EU-RL greift in folgenden Konstellationen:
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { nr: '1', title: 'Gehaltsdifferenz dargelegt', text: 'Sie weisen nach, dass Sie weniger verdienen als eine Vergleichsperson des anderen Geschlechts in gleicher oder gleichwertiger Position. Ein Paarvergleich reicht aus (BAG Az. 8 AZR 300/24).' },
                  { nr: '2', title: 'Auskunft nicht fristgerecht erteilt', text: 'Der Arbeitgeber beantwortet Ihren Auskunftsantrag nach Art. 7 EU-RL nicht innerhalb der 2-Monats-Frist. Die Nichtbeantwortung allein löst die Beweislastumkehr aus.' },
                  { nr: '3', title: 'Unvollständige oder irreführende Auskunft', text: 'Der Arbeitgeber erteilt eine Auskunft, die nicht die gesetzlichen Anforderungen erfüllt — z. B. ohne Aufschlüsselung nach Geschlecht oder ohne Bewertungskriterien.' },
                  { nr: '4', title: 'Verstoß gegen Berichtspflichten', text: 'Der Arbeitgeber kommt seinen Berichtspflichten nach Art. 9 EU-RL nicht nach. Auch dies begründet die Vermutung einer Diskriminierung.' },
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
                BAG Az. 8 AZR 300/24 — Paarvergleich genügt
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Das Bundesarbeitsgericht hat am 23.10.2025 mit dem Urteil <strong>Az. 8 AZR 300/24</strong>
                eine wegweisende Entscheidung für die Beweislastumkehr getroffen. Der Leitsatz:
              </p>
              <div className="bg-cream border border-border-light rounded p-6 mb-8">
                <p className="text-[0.95rem] text-ink-light leading-relaxed italic mb-3">
                  „Ein Paarvergleich — der Vergleich des Entgelts einer Person mit dem Entgelt einer Person
                  des anderen Geschlechts, die gleiche oder gleichwertige Arbeit verrichtet — ist ausreichend,
                  um eine Vermutung der unmittelbaren Entgeltdiskriminierung zu begründen.&ldquo;
                </p>
                <p className="text-[0.88rem] text-ink-muted mb-0">
                  BAG, Urteil vom 23.10.2025 — Az. 8 AZR 300/24
                </p>
              </div>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-8">
                Das bedeutet: Sie brauchen <strong>keine unternehmensweite Gehaltsstatistik</strong>. Es
                genügt, wenn Sie darlegen, dass eine Kollegin oder ein Kollege des anderen Geschlechts in
                vergleichbarer Position mehr verdient als Sie. Der Arbeitgeber muss dann objektive Gründe
                für die Differenz nachweisen.
              </p>
            </FadeUp>

            <FadeUp delay={3}>
              <h2 className="font-serif text-[1.5rem] font-bold mb-4">
                Praktische Auswirkungen für Arbeitnehmer
              </h2>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-3">
                Die Beweislastumkehr verändert die Dynamik von Equal-Pay-Verfahren grundlegend:
              </p>
              <ul className="list-disc pl-6 mb-3 space-y-1.5">
                <li className="text-[0.95rem] text-ink-light"><strong>Deutlich höhere Erfolgsquote:</strong> In Rechtsordnungen mit Beweislastumkehr werden Equal-Pay-Klagen signifikant häufiger zugunsten der Kläger entschieden</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Außergerichtliche Einigungen:</strong> Arbeitgeber sind eher bereit, Gehaltsdifferenzen außergerichtlich zu korrigieren, wenn sie die Beweislast tragen</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Präventivwirkung:</strong> Unternehmen werden proaktiv transparente Vergütungssysteme einführen, um Klagen zu vermeiden</li>
                <li className="text-[0.95rem] text-ink-light"><strong>Stärkere Verhandlungsposition:</strong> Bereits die Androhung einer Klage mit Beweislastumkehr kann zu Gehaltsanpassungen führen</li>
              </ul>
              <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                Die Kombination aus Auskunftsrecht (Art. 7), Beweislastumkehr (Art. 18) und Entschädigungsanspruch
                (Art. 21) gibt Arbeitnehmern erstmals wirksame Instrumente zur Durchsetzung von Equal Pay.
                Fachanwalt Fatih Bektas berät Sie zur optimalen Strategie.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* BAG-Urteil Highlight */}
        <section className="py-[60px] px-8 bg-cream max-md:py-10 max-md:px-6">
          <div className="max-w-content mx-auto">
            <FadeUp>
              <div className="bg-white border border-green/30 rounded p-8 border-l-[4px] border-l-green">
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Wegweisendes Urteil</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 vom 23.10.2025</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Das Bundesarbeitsgericht hat bestätigt: Ein <strong>Paarvergleich reicht aus</strong>, um die
                  Beweislastumkehr auszulösen. Der Arbeitgeber konnte nicht nachweisen, dass objektive Gründe
                  die Gehaltsdifferenz rechtfertigten. Dieses Urteil stellt klar, dass Arbeitnehmer keine
                  umfassende Statistik benötigen — ein einziger Vergleich genügt.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Beweislastumkehr bei Equal Pay
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
              Kostenlose Ersteinschätzung — Beweislastumkehr nutzen
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen, ob die Beweislastumkehr in Ihrem Fall greift und welche Ansprüche Sie haben.
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
