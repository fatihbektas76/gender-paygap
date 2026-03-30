import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Gehaltsspanne in Stellenanzeigen — Pflicht ab 2026 (${new Date().getFullYear()})`,
  description:
    'Art. 5 EU-RL 2023/970: Arbeitgeber müssen ab Juni 2026 Gehaltsspannen in Stellenanzeigen angeben. Einstiegsgehalt oder Spanne, Fragen nach Vorgehalt verboten. Fachanwalt erklärt.',
  path: '/stellenanzeige-gehaltsspanne-pflicht',
});

const faqs = [
  {
    question: 'Muss das Gehalt direkt in der Stellenanzeige stehen?',
    answer:
      'Art. 5 Abs. 1 EU-RL 2023/970 verlangt, dass Bewerber:innen vor dem Vorstellungsgespräch über das anfängliche Entgelt oder die Entgeltspanne informiert werden. Dies kann direkt in der Stellenanzeige geschehen oder auf andere Weise vor dem Gespräch mitgeteilt werden. Die Angabe in der Stellenanzeige ist der sicherste Weg, die Pflicht zu erfüllen.',
  },
  {
    question: 'Was genau muss offengelegt werden — Gehalt oder Spanne?',
    answer:
      'Arbeitgeber können wählen: Sie geben entweder das anfängliche Entgelt (Einstiegsgehalt) oder eine Entgeltspanne an. Die Spanne muss auf objektiven, geschlechtsneutralen Kriterien basieren. Ein realistischer Korridor (z. B. 48.000–56.000 EUR brutto p.a.) erfüllt die Anforderung. Zu breite Spannen (z. B. 30.000–80.000 EUR) könnten als Umgehung gewertet werden.',
  },
  {
    question: 'Darf ich Bewerber nach dem bisherigen Gehalt fragen?',
    answer:
      'Nein. Art. 5 Abs. 2 EU-RL verbietet es Arbeitgebern ausdrücklich, Bewerber:innen nach ihrer aktuellen oder früheren Vergütung zu fragen — sei es im Bewerbungsgespräch, im Bewerbungsformular oder über Dritte. Dieser „Salary History Ban" soll verhindern, dass bestehende Gehaltsungleichheiten fortgeschrieben werden.',
  },
  {
    question: 'Was passiert bei Verstößen gegen die Gehaltstransparenz-Pflicht?',
    answer:
      'Art. 23 EU-RL sieht „wirksame, verhältnismäßige und abschreckende" Sanktionen vor. Die konkrete Höhe wird vom nationalen Gesetzgeber festgelegt. Bewerber:innen, die wegen mangelnder Transparenz benachteiligt wurden, können Schadensersatz fordern. Zudem stärkt die Beweislastumkehr (Art. 18) die Position der Bewerber:innen bei Klagen.',
  },
  {
    question: 'Gilt die Pflicht auch für interne Stellenausschreibungen?',
    answer:
      'Art. 5 EU-RL bezieht sich auf „Stellenbewerber" und das Bewerbungsverfahren insgesamt. Die Gehaltstransparenz-Pflicht gilt daher auch für interne Ausschreibungen. Bestehende Beschäftigte haben zusätzlich das individuelle Auskunftsrecht nach Art. 7. Die Kombination beider Regelungen schafft vollständige Transparenz.',
  },
];

const dosAndDonts = {
  dos: [
    'Gehaltsspanne (z. B. „52.000–62.000 EUR brutto/Jahr") direkt in der Stellenanzeige angeben',
    'Objektive Kriterien benennen, die die Position innerhalb der Spanne bestimmen (Erfahrung, Qualifikation)',
    'Variable Bestandteile (Bonus, Sachleistungen) separat aufführen, wenn vorhanden',
    'Alle bestehenden Stellenanzeigen bis Juni 2026 aktualisieren',
    'Recruiter und HR-Abteilung zum Salary History Ban schulen',
  ],
  donts: [
    'Bewerber:innen nach aktuellem oder früherem Gehalt fragen (Art. 5 Abs. 2)',
    'Unrealistisch breite Spannen angeben (z. B. 30.000–100.000 EUR)',
    '„Gehalt nach Vereinbarung" oder „marktübliche Vergütung" als Ersatz verwenden',
    'Gehaltstransparenz nur für externe, nicht für interne Ausschreibungen umsetzen',
    'Die Pflicht auf „nach dem Gespräch" verschieben — die Info muss vor dem Gespräch vorliegen',
  ],
};

export default function StellenanzeigenGehaltsspannePage() {
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
              { '@type': 'ListItem', position: 3, name: 'Gehaltsspanne in Stellenanzeigen', item: `${SEO_CONFIG.baseUrl}/stellenanzeige-gehaltsspanne-pflicht` },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-accent-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">Arbeitgeber</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gehaltsspanne in Stellenanzeigen &mdash; Pflicht ab 2026
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Ab dem 7. Juni 2026 m&uuml;ssen Arbeitgeber Bewerber:innen vor dem Vorstellungsgespr&auml;ch &uuml;ber
              das Einstiegsgehalt oder die Gehaltsspanne informieren (Art. 5 EU-Richtlinie 2023/970). Gleichzeitig
              wird es verboten, Bewerber:innen nach ihrem bisherigen Gehalt zu fragen. Verst&ouml;&szlig;e k&ouml;nnen
              zu Bu&szlig;geldern und Schadensersatzanspr&uuml;chen f&uuml;hren.
            </p>
          </div>
        </header>

        {/* Art. 5 im Detail */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Was Art. 5 EU-RL 2023/970 verlangt
            </h2>
            <FadeUp>
              <div className="bg-accent-50 border border-accent/30 rounded p-7 mb-8">
                <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                  Art. 5 enth&auml;lt drei zentrale Verpflichtungen f&uuml;r Arbeitgeber im Bewerbungsverfahren:
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-accent-700 text-white font-bold text-[0.85rem] flex items-center justify-center shrink-0">1</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">Gehaltstransparenz vor dem Gespräch (Abs. 1)</div>
                      <div className="text-[0.88rem] text-ink-muted">Bewerber:innen müssen über das anfängliche Entgelt oder die Entgeltspanne informiert werden — in der Stellenanzeige oder auf andere Weise vor dem Vorstellungsgespräch.</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-accent-700 text-white font-bold text-[0.85rem] flex items-center justify-center shrink-0">2</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">Salary History Ban (Abs. 2)</div>
                      <div className="text-[0.88rem] text-ink-muted">Es ist verboten, Bewerber:innen nach ihrer aktuellen oder früheren Vergütung zu fragen — direkt oder über Dritte.</div>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-accent-700 text-white font-bold text-[0.85rem] flex items-center justify-center shrink-0">3</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">Geschlechtsneutrale Gestaltung (Abs. 3)</div>
                      <div className="text-[0.88rem] text-ink-muted">Stellenanzeigen und Stellenbezeichnungen müssen geschlechtsneutral formuliert sein. Das Einstellungsverfahren darf keine Diskriminierung begründen.</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Dos & Don'ts */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Stellenanzeigen richtig gestalten
            </h2>
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FadeUp>
                <div className="bg-white border border-border-light rounded p-6 h-full">
                  <h3 className="font-serif text-[1.1rem] font-bold text-accent-700 mb-4">So machen Sie es richtig</h3>
                  <ul className="space-y-3 text-[0.88rem] text-ink-muted">
                    {dosAndDonts.dos.map((item) => (
                      <li key={item} className="flex gap-2 items-start">
                        <span className="text-accent-700 font-bold mt-0.5 shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-white border border-red-200 rounded p-6 h-full">
                  <h3 className="font-serif text-[1.1rem] font-bold text-red-700 mb-4">Das sollten Sie vermeiden</h3>
                  <ul className="space-y-3 text-[0.88rem] text-ink-muted">
                    {dosAndDonts.donts.map((item) => (
                      <li key={item} className="flex gap-2 items-start">
                        <span className="text-red-600 font-bold mt-0.5 shrink-0">&minus;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Beispiel */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Beispiel: Konforme Gehaltsangabe in der Stellenanzeige
            </h2>
            <FadeUp>
              <div className="bg-accent-50 border-l-4 border-accent rounded p-6">
                <div className="text-[0.85rem] text-accent-700 font-bold uppercase tracking-wider mb-3">Muster-Formulierung</div>
                <p className="text-[0.95rem] text-ink leading-relaxed mb-2">
                  <strong>Vergütung:</strong> Das Jahresgehalt für diese Position liegt zwischen 52.000 und 62.000 EUR brutto.
                  Die Einordnung innerhalb der Spanne richtet sich nach Berufserfahrung und einschlägiger Qualifikation.
                </p>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">
                  Zusätzlich: 13. Monatsgehalt, betriebliche Altersvorsorge und leistungsabhängiger Bonus (bis zu 10 % des Jahresgehalts).
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zur Gehaltsspanne in Stellenanzeigen
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
              Stellenanzeigen prüfen lassen — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Stellenanzeigen auf Konformität mit Art. 5 EU-RL und schulen Ihr HR-Team.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
            >
              Jetzt Kontakt aufnehmen &rarr;
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
