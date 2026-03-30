import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Gender Pay Gap in Deutschland — Fakten, Ursachen & Rechtslage (${new Date().getFullYear()})`,
  description:
    'Gender Pay Gap in Deutschland: 16% unbereinigt, 6% bereinigt (Destatis 2025). Was sind die Ursachen? Welche Rechte haben Betroffene? Fachanwalt erklärt.',
  path: '/gender-pay-gap',
});

const faqs = [
  {
    question: 'Wie hoch ist der Gender Pay Gap in Deutschland 2025?',
    answer: 'Der unbereinigte Gender Pay Gap in Deutschland beträgt 16% (Statistisches Bundesamt, Dezember 2025). Frauen verdienen im Durchschnitt 4,31 € weniger pro Stunde als Männer. Regional variiert der GPG stark: Baden-Württemberg 22%, Sachsen 7%.',
  },
  {
    question: 'Was ist der Unterschied zwischen unbereinigtem und bereinigtem Gender Pay Gap?',
    answer: 'Der unbereinigte GPG (16%) vergleicht die Bruttostundenlöhne aller Männer und Frauen — ohne Berücksichtigung von Beruf, Branche, Qualifikation oder Arbeitszeit. Der bereinigte GPG (~6%) berücksichtigt diese Faktoren und misst, was Frauen bei „gleicher Arbeit" weniger verdienen. Beide Werte sind rechtlich relevant.',
  },
  {
    question: 'In welcher Branche ist der Gender Pay Gap am höchsten?',
    answer: 'Die größten Pay Gaps bestehen in der Versicherungsbranche (28%), im Bankwesen und Finanzwesen (je 26%) sowie in der Beratungsbranche (24%). Am niedrigsten ist der GPG im öffentlichen Dienst (10%), in der Pflege (13%) und in der Bildung (14%) — Branchen mit hoher Tarifbindung.',
  },
  {
    question: 'Warum gibt es einen Gender Pay Gap?',
    answer: 'Die Ursachen sind vielschichtig: (1) Horizontale Segregation — Frauen arbeiten häufiger in schlechter bezahlten Branchen, (2) Vertikale Segregation — Frauen sind in Führungspositionen unterrepräsentiert, (3) Teilzeitfalle — Frauen arbeiten häufiger in Teilzeit, (4) Care-Arbeit — unbezahlte Sorgearbeit wird überwiegend von Frauen geleistet, (5) Direkte Diskriminierung — vergleichbare Arbeit wird unterschiedlich vergütet.',
  },
  {
    question: 'Was kann ich rechtlich gegen Lohndiskriminierung tun?',
    answer: 'Ab dem 7. Juni 2026 können Sie in Unternehmen ab 50 Mitarbeitern Auskunft über Vergleichsgehälter verlangen (Art. 7 EU-RL 2023/970). Bei festgestellter Diskriminierung gilt die Beweislastumkehr: Der Arbeitgeber muss beweisen, dass keine Diskriminierung vorliegt. Sie haben Anspruch auf Entschädigung für bis zu 3 Jahre rückwirkend.',
  },
];

const branchenHighlights = [
  { name: 'Versicherung', gpg: 28, color: 'bg-red-500' },
  { name: 'Bankwesen', gpg: 26, color: 'bg-red-400' },
  { name: 'Beratung', gpg: 24, color: 'bg-orange-500' },
  { name: 'Automobil', gpg: 23, color: 'bg-orange-400' },
  { name: 'Gesundheitswesen', gpg: 22, color: 'bg-orange-400' },
  { name: 'Chemie', gpg: 21, color: 'bg-yellow-500' },
  { name: 'Produktion', gpg: 20, color: 'bg-yellow-500' },
  { name: 'Einzelhandel', gpg: 19, color: 'bg-yellow-400' },
  { name: 'Logistik', gpg: 18, color: 'bg-yellow-400' },
  { name: 'Medien', gpg: 17, color: 'bg-green-400' },
  { name: 'IT & Software', gpg: 14, color: 'bg-green-400' },
  { name: 'Bildung', gpg: 14, color: 'bg-green-400' },
  { name: 'Pflege', gpg: 13, color: 'bg-green-500' },
  { name: 'Öffentl. Dienst', gpg: 10, color: 'bg-green-600' },
];

export default function GenderPayGapPage() {
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
        <header className="pt-[150px] pb-[80px] px-8 bg-slate-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">Wissen</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gender Pay Gap in Deutschland — Fakten, Ursachen & Rechtslage {new Date().getFullYear()}
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Der Gender Pay Gap in Deutschland beträgt 16% (Statistisches Bundesamt, Dezember 2025). Frauen verdienen
              im Durchschnitt 4,31 € weniger pro Stunde als Männer. Die EU-Entgelttransparenzrichtlinie 2023/970
              gibt Betroffenen ab Juni 2026 erstmals wirksame rechtliche Instrumente an die Hand.
            </p>
          </div>
        </header>

        {/* Große Statistik-Karten */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              <FadeUp>
                <div className="bg-primary-50 border border-primary/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-primary-700">16%</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Unbereinigter GPG</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Destatis, Dezember 2025</div>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-primary-50 border border-primary/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-primary-700">~6%</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Bereinigter GPG</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Bei vergleichbarer Arbeit</div>
                </div>
              </FadeUp>
              <FadeUp delay={2}>
                <div className="bg-primary-50 border border-primary/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-primary-700">66 Tage</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Equal Pay Day 2026</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">So lange arbeiten Frauen &bdquo;umsonst&ldquo;</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Ursachen */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Warum gibt es einen Gender Pay Gap?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { title: 'Horizontale Segregation', text: 'Frauen arbeiten häufiger in schlechter bezahlten Branchen und Berufen — Pflege, Erziehung, Einzelhandel statt IT, Finanzen, Maschinenbau.' },
                { title: 'Vertikale Segregation', text: 'In Führungspositionen sind Frauen systematisch unterrepräsentiert. Der „Glass Ceiling Effect" limitiert Karrierechancen und damit Verdienstmöglichkeiten.' },
                { title: 'Teilzeitfalle', text: '48% der erwerbstätigen Frauen arbeiten in Teilzeit (vs. 12% der Männer). Teilzeitarbeit führt nicht nur zu geringerem Einkommen, sondern auch zu geringeren Aufstiegschancen.' },
                { title: 'Care-Arbeit', text: 'Unbezahlte Sorgearbeit (Kinderbetreuung, Pflege) wird überwiegend von Frauen geleistet. Dies führt zu Karriereunterbrechungen und reduzierter Arbeitszeit.' },
                { title: 'Verhandlungslücke', text: 'Studien zeigen, dass Frauen seltener Gehaltserhöhungen verhandeln — und wenn, geringere Erhöhungen erhalten. Gehaltstransparenz kann diese Lücke schließen.' },
                { title: 'Direkte Diskriminierung', text: 'In einigen Fällen werden Frauen für vergleichbare Arbeit schlicht schlechter bezahlt. Genau hier setzt die EU-Richtlinie mit Beweislastumkehr und Sanktionen an.' },
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

        {/* GPG nach Branche */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-2">
              Gender Pay Gap nach Branche
            </h2>
            <p className="text-[0.9rem] text-ink-muted mb-8">Quelle: Statistisches Bundesamt (Destatis), 2025</p>
            <div className="space-y-3">
              {branchenHighlights.map((b) => (
                <div key={b.name} className="flex items-center gap-4">
                  <div className="w-[140px] text-[0.88rem] text-ink font-medium shrink-0 max-md:w-[110px] max-md:text-[0.8rem]">{b.name}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                    <div
                      className={`${b.color} h-full rounded-full flex items-center justify-end pr-2.5`}
                      style={{ width: `${Math.max(b.gpg * 3, 20)}%` }}
                    >
                      <span className="text-white text-[0.75rem] font-bold">{b.gpg}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA zu AN/AG */}
        <section className="py-[70px] px-8 bg-slate-50 max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <a href="/arbeitnehmer" className="block bg-secondary-50 border border-secondary/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">Arbeitnehmer</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Ihre Rechte bei Lohndiskriminierung</div>
              <div className="text-[0.88rem] text-ink-muted">Auskunftsrecht, Klage, Entschädigung &rarr;</div>
            </a>
            <a href="/arbeitgeber" className="block bg-accent-50 border border-accent/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2">Arbeitgeber</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Compliance-Pflichten verstehen</div>
              <div className="text-[0.88rem] text-ink-muted">Berichtspflichten, Audit, Sanktionen &rarr;</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Gender Pay Gap
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
