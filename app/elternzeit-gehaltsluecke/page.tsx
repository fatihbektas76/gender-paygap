import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Elternzeit und Gehaltslücke — Ihre Rechte als Elternteil (${new Date().getFullYear()})`,
  description:
    'Elternzeit und Gender Pay Gap: § 15 BEEG schützt Ihr Gehalt, Art. 7 EU-RL 2023/970 gibt Auskunftsrecht. Fachanwalt erklärt Diskriminierungsschutz für Eltern.',
  path: '/elternzeit-gehaltsluecke',
});

const faqs = [
  {
    question: 'Darf mein Gehalt nach der Elternzeit niedriger sein als vorher?',
    answer: 'Nein. Nach § 15 Abs. 5 BEEG haben Sie das Recht, nach der Elternzeit auf einen gleichwertigen Arbeitsplatz mit mindestens gleichem Entgelt zurückzukehren. Gehaltserhöhungen, die während Ihrer Abwesenheit gewährt wurden (z. B. Tariferhöhungen oder allgemeine Anpassungen), müssen ebenfalls berücksichtigt werden. Ein niedrigeres Gehalt nach Rückkehr kann Entgeltdiskriminierung darstellen.',
  },
  {
    question: 'Wie wirkt sich Elternzeit auf den Gender Pay Gap aus?',
    answer: 'Elternzeit ist einer der Haupttreiber des Gender Pay Gap. Laut Destatis beträgt der unbereinigte GPG 16%. Studien zeigen, dass Mütter nach der Elternzeit im Durchschnitt 12–18% weniger verdienen als vor der Geburt (sog. Motherhood Penalty), während Väter keine vergleichbare Einbuße erleiden. Die EU-RL 2023/970 adressiert dies durch das Verbot, Elternzeit als Benachteiligungsgrund zu nutzen.',
  },
  {
    question: 'Kann ich während der Elternzeit Auskunft über Vergleichsgehälter verlangen?',
    answer: 'Ja. Das Auskunftsrecht nach Art. 7 EU-RL 2023/970 steht allen Beschäftigten zu — auch während der Elternzeit. Sie bleiben Arbeitnehmer:in und können jederzeit Auskunft über das Durchschnittsentgelt vergleichbarer Positionen verlangen. Der Arbeitgeber muss innerhalb von 2 Monaten antworten.',
  },
  {
    question: 'Was ist der „Motherhood Penalty" und ist er rechtlich relevant?',
    answer: 'Der Motherhood Penalty beschreibt die systematische Gehaltseinbuße von Müttern: Studien beziffern den Effekt auf 12–18% weniger Einkommen nach dem ersten Kind. Rechtlich ist dies relevant, weil eine Benachteiligung wegen Mutterschaft eine Geschlechtsdiskriminierung nach § 3 AGG darstellt. Die EU-RL 2023/970 verschärft die Durchsetzung durch Beweislastumkehr (Art. 18).',
  },
  {
    question: 'Mein Arbeitgeber hat meine Stelle während der Elternzeit umstrukturiert. Was kann ich tun?',
    answer: 'Eine Umstrukturierung darf nicht dazu führen, dass Sie bei Rückkehr auf einer geringerwertigen oder schlechter bezahlten Position landen. § 15 Abs. 5 BEEG garantiert Ihnen einen gleichwertigen Arbeitsplatz. Wird dies verweigert, können Sie Klage einreichen. Das BAG hat mit Az. 8 AZR 300/24 die Beweisanforderungen für Diskriminierungsklagen deutlich gesenkt.',
  },
];

const auswirkungen = [
  {
    title: 'Motherhood Penalty',
    stat: '12–18%',
    text: 'Mütter verdienen nach dem ersten Kind im Durchschnitt 12–18% weniger als zuvor. Väter erleben keinen vergleichbaren Effekt — im Gegenteil: Studien zeigen einen leichten „Fatherhood Bonus".',
  },
  {
    title: 'Karriereverzögerung',
    stat: '4–7 Jahre',
    text: 'Elternzeit-bedingte Unterbrechungen verzögern Beförderungen um durchschnittlich 4–7 Jahre. Dies betrifft überwiegend Frauen, die 87% der Elternzeit in Anspruch nehmen (Destatis).',
  },
  {
    title: 'Teilzeitfalle',
    stat: '48%',
    text: '48% der erwerbstätigen Frauen arbeiten in Teilzeit (vs. 12% der Männer). Häufig beginnt die Teilzeit nach der Elternzeit und verfestigt sich dauerhaft — mit gravierenden Auswirkungen auf Gehalt und Rente.',
  },
];

export default function ElternzeitGehaltslueckePage() {
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
              { '@type': 'ListItem', position: 3, name: 'Elternzeit & Gehaltslücke', item: `${SEO_CONFIG.baseUrl}/elternzeit-gehaltsluecke` },
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
              Elternzeit und Gehaltslücke — Ihre Rechte als Elternteil
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Elternzeit ist einer der Haupttreiber des Gender Pay Gap: Mütter verdienen nach dem
              ersten Kind im Durchschnitt 12–18% weniger (Destatis). § 15 BEEG schützt Ihren
              Arbeitsplatz und Ihr Gehalt. Art. 7 der EU-RL 2023/970 gibt Ihnen ab Juni 2026
              zudem ein Auskunftsrecht über Vergleichsgehälter — auch während der Elternzeit.
            </p>
          </div>
        </header>

        {/* Auswirkungen in Zahlen */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Elternzeit und Gehalt: Die Zahlen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {auswirkungen.map((a, i) => (
                <FadeUp key={a.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-secondary-50 border border-secondary/20 rounded p-7 h-full">
                    <div className="font-serif text-[2rem] font-bold text-secondary-700 mb-1">{a.stat}</div>
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{a.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{a.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Ihre Rechte */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Ihre Rechte als Elternteil
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  num: '1',
                  title: 'Rückkehr auf gleichwertigen Arbeitsplatz',
                  text: '§ 15 Abs. 5 BEEG garantiert Ihnen nach der Elternzeit die Rückkehr auf einen gleichwertigen Arbeitsplatz mit mindestens gleichem Entgelt. Gehaltsanpassungen während Ihrer Abwesenheit müssen berücksichtigt werden.',
                },
                {
                  num: '2',
                  title: 'Auskunftsrecht auch in Elternzeit',
                  text: 'Art. 7 EU-RL 2023/970 gibt allen Beschäftigten — auch in Elternzeit — das Recht auf Auskunft über Vergleichsgehälter. Nutzen Sie die Elternzeit, um Gehaltsunterschiede aufzudecken und vor der Rückkehr zu verhandeln.',
                },
                {
                  num: '3',
                  title: 'Diskriminierungsverbot',
                  text: 'Eine Benachteiligung wegen Schwangerschaft oder Elternzeit ist nach § 3 AGG und Art. 7 EU-RL 2023/970 verboten. Dies umfasst Gehaltskürzungen, Versetzungen auf geringerwertige Positionen und ausbleibende Gehaltserhöhungen.',
                },
                {
                  num: '4',
                  title: 'Beweislastumkehr nutzen',
                  text: 'Art. 18 EU-RL 2023/970 kehrt die Beweislast um: Können Sie einen Gehaltsunterschied nach der Elternzeit belegen, muss der Arbeitgeber beweisen, dass dies nicht diskriminierend ist. Das BAG (Az. 8 AZR 300/24) hat die Hürden dafür weiter gesenkt.',
                },
              ].map((item, i) => (
                <FadeUp key={item.num} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-6 h-full">
                    <div className="w-8 h-8 rounded-full bg-secondary-100 text-secondary-700 font-bold text-[0.9rem] flex items-center justify-center mb-3">{item.num}</div>
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{item.text}</p>
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
                <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Für Eltern besonders relevant</div>
                <h3 className="font-serif text-[1.3rem] font-bold mb-3">BAG Az. 8 AZR 300/24 — Paarvergleich genügt</h3>
                <p className="text-[0.95rem] text-ink-light leading-relaxed mb-0">
                  Wenn Sie nach der Elternzeit feststellen, dass ein Kollege in vergleichbarer Position
                  mehr verdient, reicht dieser <strong>einzelne Vergleich</strong> bereits aus, um eine
                  Vermutung der Entgeltdiskriminierung zu begründen. Sie müssen keine umfassende
                  Gehaltsstatistik vorlegen — das hat das Bundesarbeitsgericht am 23.10.2025 klargestellt.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zu Elternzeit und Gehaltslücke
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
              Weniger Gehalt nach der Elternzeit?
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen kostenfrei, ob Ihnen eine Nachzahlung oder Entschädigung zusteht.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-secondary-700 hover:bg-secondary-50 hover:-translate-y-0.5"
            >
              Jetzt Ersteinschätzung anfordern &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
