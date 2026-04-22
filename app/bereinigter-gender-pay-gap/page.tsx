import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Bereinigter Gender Pay Gap — Definition, Berechnung & rechtliche Bedeutung',
  description:
    'Der bereinigte Gender Pay Gap in Deutschland beträgt ca. 6% (Destatis 2025). Was bedeutet das? Wie wird er berechnet? Warum ist er rechtlich relevant? Fachanwalt erklärt.',
  path: '/bereinigter-gender-pay-gap',
});

const faqs = [
  {
    question: 'Was ist der bereinigte Gender Pay Gap?',
    answer:
      'Der bereinigte Gender Pay Gap misst den Gehaltsunterschied zwischen Männern und Frauen bei vergleichbarer Tätigkeit, Qualifikation, Berufserfahrung und Arbeitszeit. In Deutschland beträgt er ca. 6% (Statistisches Bundesamt, 2025). Er isoliert den Anteil der Lohndifferenz, der nicht durch strukturelle Faktoren erklärbar ist.',
  },
  {
    question: 'Wie wird der bereinigte Gender Pay Gap berechnet?',
    answer:
      'Der bereinigte GPG wird per Regressionsanalyse berechnet: Vom unbereinigten GPG (16%) werden die Effekte von Branche, Beruf, Qualifikation, Arbeitszeit, Betriebsgröße und Region herausgerechnet. Der verbleibende Unterschied (~6%) gilt als Indikator für mögliche Lohndiskriminierung.',
  },
  {
    question: 'Warum ist auch der unbereinigte GPG relevant?',
    answer:
      'Der unbereinigte GPG (16%) zeigt die gesamtgesellschaftliche Einkommenslücke zwischen Männern und Frauen. Er macht sichtbar, dass Frauen durch Berufswahl, Teilzeit und Karrierehindernisse insgesamt deutlich weniger verdienen. Die EU-Richtlinie 2023/970 adressiert beide Dimensionen: direkte Diskriminierung und strukturelle Benachteiligung.',
  },
  {
    question: 'Welche rechtliche Bedeutung hat der bereinigte GPG?',
    answer:
      'Für Arbeitgeber ist der bereinigte GPG entscheidend: Liegt er über 5%, ist ab 2026 eine gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht (Art. 9 EU-RL 2023/970). Für Arbeitnehmer ist er der Anknüpfungspunkt für Equal-Pay-Klagen — das BAG-Urteil Az. 8 AZR 300/24 bestätigt, dass schon ein Paarvergleich ausreicht.',
  },
  {
    question: 'In welchen Branchen ist der bereinigte GPG besonders hoch?',
    answer:
      'Der bereinigte GPG ist besonders hoch in Branchen mit hohen variablen Gehaltsbestandteilen: Finanzwesen, Versicherung und Beratung. Dort machen Boni und Provisionen einen großen Teil des Gehalts aus — und genau bei diesen Bestandteilen bestehen die größten geschlechtsspezifischen Unterschiede.',
  },
];

export default function BereinigterGenderPayGapPage() {
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

      <main>
        <header className="pt-[150px] pb-[80px] px-8 bg-cream max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">Wissen</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Bereinigter Gender Pay Gap — Definition, Berechnung & rechtliche Bedeutung
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Der bereinigte Gender Pay Gap in Deutschland beträgt ca. 6% (Statistisches Bundesamt, 2025).
              Er misst, was Frauen bei gleicher Arbeit, gleicher Qualifikation und gleicher Arbeitszeit weniger
              verdienen als Männer. Ab dem 7. Juni 2026 wird dieser Wert für Arbeitgeber zum entscheidenden
              Compliance-Maßstab: Liegt er über 5%, drohen Pflicht-Audits und Sanktionen.
            </p>
          </div>
        </header>

        {/* Vergleich unbereinigt vs. bereinigt */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              <FadeUp>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">16%</div>
                  <div className="text-[0.95rem] text-ink font-semibold mt-1">Unbereinigter GPG</div>
                  <div className="text-[0.85rem] text-ink-muted mt-2 leading-relaxed">
                    Vergleicht alle Bruttostundenlöhne von Männern und Frauen &mdash; ohne Berücksichtigung von Beruf, Branche, Qualifikation oder Arbeitszeit.
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">~6%</div>
                  <div className="text-[0.95rem] text-ink font-semibold mt-1">Bereinigter GPG</div>
                  <div className="text-[0.85rem] text-ink-muted mt-2 leading-relaxed">
                    Misst den Gehaltsunterschied bei vergleichbarer Tätigkeit, Qualifikation und Arbeitszeit &mdash; der &bdquo;reine&ldquo; Diskriminierungsindikator.
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Wie wird berechnet */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Wie wird der bereinigte Gender Pay Gap berechnet?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: '1. Ausgangspunkt: Unbereinigter GPG',
                  text: 'Der unbereinigte GPG (16%) ist der Bruttolohnunterschied aller Männer und Frauen. Er enthält strukturelle Faktoren wie Branchenwahl, Teilzeit und Hierarchieunterschiede.',
                },
                {
                  title: '2. Regressionsanalyse',
                  text: 'Per statistischer Regressionsanalyse werden die Effekte von Branche, Beruf, Qualifikation, Arbeitszeit, Betriebsgröße, Region und Berufserfahrung herausgerechnet.',
                },
                {
                  title: '3. Verbleibender Unterschied',
                  text: 'Der verbleibende Unterschied (~6%) kann nicht durch objektive Faktoren erklärt werden. Er gilt als Indikator für mögliche geschlechtsspezifische Lohndiskriminierung.',
                },
                {
                  title: '4. Rechtliche Relevanz',
                  text: 'Ab Juni 2026 ist die 5%-Schwelle entscheidend: Liegt der bereinigte GPG eines Unternehmens darüber, muss es mit dem Betriebsrat eine gemeinsame Entgeltbewertung durchführen (Art. 9 EU-RL 2023/970).',
                },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="bg-white border border-border-light rounded p-6 h-full">
                    <h3 className="font-serif text-[1.05rem] font-bold text-ink mb-2">{item.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Strukturelle Faktoren */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Was erklärt die Differenz zwischen unbereinigtem und bereinigtem GPG?
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6 max-w-[720px]">
              Der Unterschied von 16% (unbereinigt) zu ~6% (bereinigt) wird durch strukturelle Faktoren erklärt.
              Diese Faktoren sind jedoch selbst Ausdruck gesellschaftlicher Ungleichheit:
            </p>
            <div className="space-y-4">
              {[
                { factor: 'Branchenwahl', anteil: '~30%', text: 'Frauen arbeiten häufiger in schlechter bezahlten Branchen (Pflege, Erziehung, Einzelhandel).' },
                { factor: 'Teilzeitarbeit', anteil: '~25%', text: '48% der Frauen arbeiten in Teilzeit (vs. 12% der Männer). Teilzeit führt zu niedrigerem Stundenlohn und weniger Aufstiegschancen.' },
                { factor: 'Hierarchie', anteil: '~20%', text: 'Frauen sind in Führungspositionen unterrepräsentiert. Nur 29% der Führungskräfte in Deutschland sind weiblich.' },
                { factor: 'Berufserfahrung', anteil: '~15%', text: 'Karriereunterbrechungen durch Elternzeit und Care-Arbeit reduzieren die anrechenbare Berufserfahrung.' },
                { factor: 'Region', anteil: '~10%', text: 'In Westdeutschland ist der GPG deutlich höher als in Ostdeutschland (BW: 22% vs. Sachsen: 7%).' },
              ].map((item, i) => (
                <FadeUp key={item.factor} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-cream border border-border-light rounded p-5">
                    <div className="min-w-[60px] font-serif text-[1rem] font-bold text-gold pt-0.5">{item.anteil}</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">{item.factor}</div>
                      <div className="text-[0.88rem] text-ink-muted">{item.text}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Rechtliche Einordnung */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Rechtliche Bedeutung ab 2026
            </h2>
            <div className="bg-white border border-border-light rounded p-7 mb-6">
              <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-3">Für Arbeitgeber: Die 5%-Schwelle</h3>
              <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-3">
                Liegt der bereinigte Gender Pay Gap eines Unternehmens über 5% und kann nicht durch objektive,
                geschlechtsneutrale Kriterien erklärt werden, ist ab 2026 eine gemeinsame Entgeltbewertung
                mit dem Betriebsrat Pflicht (Art. 9 Abs. 4 EU-RL 2023/970).
              </p>
              <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                Unternehmen ab 250 Mitarbeitern müssen den bereinigten GPG ab 2027 jährlich berichten.
                Wird die 5%-Schwelle nicht innerhalb von 6 Monaten geschlossen oder erklärt,
                drohen Sanktionen und Bußgelder.
              </p>
            </div>
            <div className="bg-white border border-border-light rounded p-7">
              <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-3">Für Arbeitnehmer: Beweislastumkehr</h3>
              <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-3">
                Der bereinigte GPG ist der Anknüpfungspunkt für Equal-Pay-Klagen. Das BAG-Urteil Az. 8 AZR 300/24
                vom 23.10.2025 bestätigt: Ein einzelner Paarvergleich reicht aus, um die Vermutung geschlechtsspezifischer
                Diskriminierung auszulösen. Der Arbeitgeber muss dann beweisen, dass der Unterschied sachlich gerechtfertigt ist.
              </p>
              <p className="text-[0.88rem] text-ink-muted leading-relaxed">
                Betroffene haben Anspruch auf Entschädigung und Nachzahlung für bis zu 3 Jahre rückwirkend (Art. 21 EU-RL 2023/970).
              </p>
            </div>
          </div>
        </section>

        {/* CTA AN/AG */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <a href="/auskunftsrecht-checker" className="block bg-green-bg border border-green-bg rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Arbeitnehmer</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Auskunftsrecht prüfen</div>
              <div className="text-[0.88rem] text-ink-muted">Verdienen Sie weniger? Jetzt prüfen &rarr;</div>
            </a>
            <a href="/entgeltluecken-ampel" className="block bg-cream-dark border border-blue/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-blue mb-2">Arbeitgeber</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Ihren GPG berechnen</div>
              <div className="text-[0.88rem] text-ink-muted">Liegt Ihr Unternehmen über der 5%-Schwelle? &rarr;</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum bereinigten Gender Pay Gap
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>

        {/* Signatur */}
        <div className="px-8 py-4 max-md:px-6">
          <div className="max-w-content mx-auto text-[0.82rem] text-ink-muted">
            Verfasst von Fatih Bektas, Fachanwalt für Arbeitsrecht, APOS Legal Heidelberg.
            Zuletzt aktualisiert: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}.
          </div>
        </div>

        <ContactForm />
      </main>
    </>
  );
}
