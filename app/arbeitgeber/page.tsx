import type { Metadata } from 'next';
import { buildMetadata, SEO_CONFIG } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Entgelttransparenz-Compliance für Ihr Unternehmen (${new Date().getFullYear()})`,
  description:
    'Berichtspflichten, Vergütungsaudit, Equal-Pay-Richtlinie 2026 — APOS Legal Heidelberg. Fachanwalt für Arbeitsrecht macht Ihr Vergütungssystem rechtssicher.',
  path: '/arbeitgeber',
});

const topics = [
  { href: '/entgelttransparenz-arbeitgeber', title: 'Pflichten im Überblick', desc: 'Was die EU-Richtlinie ab 2026 von Ihrem Unternehmen verlangt.' },
  { href: '/berichtspflichten-gender-pay-gap', title: 'Berichtspflichten verstehen', desc: 'Wann Sie berichten müssen, was der Bericht enthalten muss, welche Fristen gelten.' },
  { href: '/entgeltgleichheit-audit', title: 'Vergütungssystem audit-ready machen', desc: 'Compliance-Audit: Wir prüfen Ihre Entgeltstrukturen auf Risiken.' },
  { href: '/stellenanzeige-gehaltsspanne-pflicht', title: 'Stellenanzeigen mit Gehaltsspanne', desc: 'Art. 5 EU-RL: Gehaltsspanne in jeder Stellenanzeige ab 2026 Pflicht.' },
  { href: '/auskunftsrecht-arbeitnehmer-beantworten', title: 'Auskunftsanfragen beantworten', desc: 'So reagieren Sie korrekt auf individuelle Auskunftsanfragen Ihrer Beschäftigten.' },
  { href: '/vergütungssystem-rechtssicher', title: 'Vergütungssystem rechtssicher', desc: 'Objektive, geschlechtsneutrale Kriterien für die Gehaltsfestlegung etablieren.' },
  { href: '/esg-gender-pay-gap-berichterstattung', title: 'ESG & Gender Pay Gap', desc: 'Integration in die CSRD-Nachhaltigkeitsberichterstattung.' },
  { href: '/tarifbindung-entgelttransparenz', title: 'Tarifbindung & Transparenz', desc: 'Was Tarifbindung für die Entgelttransparenzpflichten bedeutet.' },
  { href: '/entgelttransparenz-sanktionen-bussgeld', title: 'Sanktionen & Bußgelder', desc: 'Welche Strafen drohen bei Verstößen — und wie Sie sie vermeiden.' },
];

const pflichten = [
  { groesse: '< 50 MA', pflicht: 'Gehaltskriterien auf Anfrage offenlegen' },
  { groesse: '50–99 MA', pflicht: 'Gehaltskriterien offenlegen + individuelles Auskunftsrecht beantworten' },
  { groesse: '100–249 MA', pflicht: '+ Berichtspflicht ab 2031 (alle 3 Jahre)' },
  { groesse: '250+ MA', pflicht: '+ Berichtspflicht ab 2027 (jährlich) + Entgeltbewertung bei GPG > 5%' },
];

const faqs = [
  {
    question: 'Ab wann gelten die neuen Pflichten für Arbeitgeber?',
    answer: 'Die EU-Entgelttransparenzrichtlinie (2023/970) muss bis zum 7. Juni 2026 in nationales Recht umgesetzt werden. Ab diesem Datum gelten das individuelle Auskunftsrecht (alle Unternehmen ab 50 MA) und die Pflicht zur Gehaltstransparenz in Stellenanzeigen. Berichtspflichten gelten ab 2027 für Unternehmen ab 250 MA.',
  },
  {
    question: 'Was passiert bei einem Gender Pay Gap über 5%?',
    answer: 'Bei einem ausgewiesenen Entgeltunterschied von mehr als 5%, der nicht durch objektive und geschlechtsneutrale Kriterien gerechtfertigt werden kann, ist eine gemeinsame Entgeltbewertung mit den Arbeitnehmervertretern Pflicht (Art. 10 EU-RL). Innerhalb von 6 Monaten muss ein Aktionsplan erstellt werden.',
  },
  {
    question: 'Welche Bußgelder drohen bei Verstößen?',
    answer: 'Art. 23 der EU-Richtlinie sieht „wirksame, verhältnismäßige und abschreckende" Sanktionen vor. Die konkrete Höhe wird vom nationalen Gesetzgeber festgelegt. Darüber hinaus drohen Schadensersatzansprüche betroffener Beschäftigter, einschließlich Nachzahlungen für bis zu 3 Jahre rückwirkend.',
  },
  {
    question: 'Müssen wir in Stellenanzeigen ein Gehalt angeben?',
    answer: 'Ja. Art. 5 der EU-Richtlinie verpflichtet Arbeitgeber, Bewerber:innen vor dem Vorstellungsgespräch über die anfängliche Vergütung oder Gehaltsspanne zu informieren. Dies kann in der Stellenanzeige oder auf andere Weise vor dem Gespräch erfolgen.',
  },
  {
    question: 'Was kostet ein Compliance-Audit bei APOS Legal?',
    answer: 'Ein Erstgespräch und eine Risikoeinschätzung sind kostenlos. Der Umfang eines vollständigen Audits hängt von Unternehmensgröße und Komplexität der Vergütungsstrukturen ab. Wir erstellen Ihnen ein individuelles Angebot nach dem Erstgespräch.',
  },
];

export default function ArbeitgeberPage() {
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
        {/* Hero */}
        <header className="pt-[150px] pb-[80px] px-8 bg-accent-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">Arbeitgeber</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Entgelttransparenz-Compliance für Ihr Unternehmen
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[700px] leading-relaxed">
              Unternehmen mit mehr als 250 Mitarbeitern müssen ab 2027 erstmals über den geschlechtsspezifischen
              Entgeltunterschied berichten (Art. 9 EU-Richtlinie 2023/970). Bei einem Gap über 5% ist eine gemeinsame
              Entgeltbewertung mit dem Betriebsrat Pflicht. Verstöße können zu Schadensersatz und Bußgeldern führen.
            </p>
          </div>
        </header>

        {/* Pflichten-Tabelle */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              Pflichten nach Unternehmensgröße
            </h2>
            <FadeUp>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.92rem]">
                  <thead>
                    <tr>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink w-[180px]">Unternehmensgröße</th>
                      <th className="text-left p-4 bg-accent-50 border border-border font-semibold text-ink">Pflichten ab Juni 2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pflichten.map((p) => (
                      <tr key={p.groesse}>
                        <td className="p-4 border border-border font-semibold text-ink whitespace-nowrap">{p.groesse}</td>
                        <td className="p-4 border border-border text-ink-light">{p.pflicht}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Themen-Grid */}
        <section className="py-[90px] px-8 bg-slate-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Ihre Themen als Arbeitgeber
            </h2>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {topics.map((t, i) => (
                <FadeUp key={t.href} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <a
                    href={t.href}
                    className="block bg-white border border-border-light rounded p-6 no-underline transition-all hover:border-accent hover:shadow-[0_4px_16px_rgba(59,130,246,0.1)] hover:-translate-y-0.5 h-full"
                  >
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{t.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{t.desc}</p>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen für Arbeitgeber
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
              Compliance-Audit anfragen — kostenlose Ersteinschätzung
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen Ihre Vergütungsstrukturen und machen Sie fit für die EU-Richtlinie 2026.
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
