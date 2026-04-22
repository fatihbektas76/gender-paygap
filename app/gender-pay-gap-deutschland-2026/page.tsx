import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Gender Pay Gap Deutschland 2026 — aktuelle Zahlen, Gesetz & Rechtslage',
  description:
    'Gender Pay Gap in Deutschland 2026: 16% unbereinigt (Destatis). Neue EU-Richtlinie ab 7. Juni 2026 mit Auskunftsrecht, Berichtspflichten und Sanktionen. Fachanwalt erklärt.',
  path: '/gender-pay-gap-deutschland-2026',
});

const faqs = [
  {
    question: 'Wie hoch ist der Gender Pay Gap in Deutschland 2026?',
    answer:
      'Der unbereinigte Gender Pay Gap in Deutschland beträgt 16% (Statistisches Bundesamt, Dezember 2025). Frauen verdienen im Durchschnitt 4,31 Euro weniger pro Stunde als Männer. Der bereinigte GPG liegt bei ca. 6% bei vergleichbarer Tätigkeit, Qualifikation und Arbeitszeit.',
  },
  {
    question: 'Was ändert sich 2026 beim Gender Pay Gap?',
    answer:
      'Am 7. Juni 2026 tritt die EU-Entgelttransparenzrichtlinie 2023/970 in Kraft. Sie bringt: Auskunftsrecht ab 50 Mitarbeitern (statt bisher 200), Gehaltsspannen in Stellenanzeigen, Beweislastumkehr bei Gehaltsdifferenzen und wirksame Sanktionen bei Verstößen.',
  },
  {
    question: 'In welchem Bundesland ist der Gender Pay Gap am höchsten?',
    answer:
      'Baden-Württemberg hat mit 22% den höchsten Gender Pay Gap in Deutschland, gefolgt von Bayern (21%) und Hessen (20%). Die ostdeutschen Bundesländer liegen deutlich niedriger: Sachsen bei 7%, Berlin bei 9%. Dies hängt u.a. mit der unterschiedlichen Branchenstruktur zusammen.',
  },
  {
    question: 'Kann ich als Arbeitnehmer 2026 Auskunft über Gehälter verlangen?',
    answer:
      'Ja. Ab dem 7. Juni 2026 haben alle Beschäftigten in Unternehmen ab 50 Mitarbeitern das Recht, Auskunft über das durchschnittliche Entgelt ihrer Vergleichsgruppe zu verlangen (Art. 7 EU-RL 2023/970). Der Arbeitgeber muss innerhalb von zwei Monaten antworten.',
  },
  {
    question: 'Was droht Arbeitgebern bei Verstößen gegen die Entgelttransparenz?',
    answer:
      'Arbeitgebern drohen ab 2026 empfindliche Sanktionen: Schadensersatz und Nachzahlung für bis zu 3 Jahre rückwirkend (Art. 21 EU-RL), Bußgelder bei Nichtberichterstattung (Art. 23 EU-RL) und die Beweislastumkehr. Bei einem GPG über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht.',
  },
];

const bundeslaenderGPG = [
  { name: 'Baden-Württemberg', gpg: 22, color: 'bg-red-500' },
  { name: 'Bayern', gpg: 21, color: 'bg-red-400' },
  { name: 'Hessen', gpg: 20, color: 'bg-orange-500' },
  { name: 'Hamburg', gpg: 18, color: 'bg-orange-400' },
  { name: 'Nordrhein-Westfalen', gpg: 17, color: 'bg-yellow-500' },
  { name: 'Niedersachsen', gpg: 16, color: 'bg-yellow-400' },
  { name: 'Berlin', gpg: 9, color: 'bg-green-400' },
  { name: 'Sachsen', gpg: 7, color: 'bg-green-600' },
];

export default function GenderPayGapDeutschland2026Page() {
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
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">Aktuelle Zahlen</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Gender Pay Gap Deutschland 2026 — aktuelle Zahlen & neue Rechtslage
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Der Gender Pay Gap in Deutschland beträgt 16% unbereinigt und ca. 6% bereinigt (Statistisches Bundesamt, Dezember 2025).
              Mit der EU-Entgelttransparenzrichtlinie 2023/970 treten am 7. Juni 2026 erstmals wirksame Instrumente gegen
              Lohndiskriminierung in Kraft: erweitertes Auskunftsrecht, Berichtspflichten und Sanktionen.
            </p>
          </div>
        </header>

        {/* Statistik-Karten */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
              <FadeUp>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">16%</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Unbereinigter GPG</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Destatis 2025</div>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">~6%</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Bereinigter GPG</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Vergleichbare Arbeit</div>
                </div>
              </FadeUp>
              <FadeUp delay={2}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">4,31 &euro;</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Weniger pro Stunde</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Bruttostundenverdienst</div>
                </div>
              </FadeUp>
              <FadeUp delay={3}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">7. Juni</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">EU-Richtlinie 2026</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Umsetzungsfrist</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Was sich 2026 ändert */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Was sich 2026 ändert: Die EU-Entgelttransparenzrichtlinie
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Auskunftsrecht ab 50 Mitarbeitern',
                  text: 'Bisher galt das Auskunftsrecht erst ab 200 Mitarbeitern (EntgTranspG 2017). Ab dem 7. Juni 2026 können Beschäftigte in Unternehmen ab 50 MA Auskunft über Vergleichsgehälter verlangen (Art. 7 EU-RL 2023/970).',
                },
                {
                  title: 'Gehaltsspannen in Stellenanzeigen',
                  text: 'Arbeitgeber müssen Bewerber:innen vor dem Vorstellungsgespräch über die Gehaltsspanne der ausgeschriebenen Position informieren (Art. 5 EU-RL). Stellenanzeigen ohne Gehaltsangabe werden ab 2026 rechtswidrig.',
                },
                {
                  title: 'Beweislastumkehr zugunsten der Beschäftigten',
                  text: 'Bei festgestellten Gehaltsunterschieden muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt (Art. 18 EU-RL). Das BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt: Ein Paarvergleich reicht aus.',
                },
                {
                  title: 'Berichtspflichten und Sanktionen',
                  text: 'Unternehmen ab 250 MA müssen ab 2027 jährlich über den GPG berichten (Art. 9 EU-RL). Bei einem GPG über 5% ist eine gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht. Verstöße führen zu Bußgeldern (Art. 23 EU-RL).',
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

        {/* GPG nach Bundesland */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-2">
              Gender Pay Gap nach Bundesland
            </h2>
            <p className="text-[0.9rem] text-ink-muted mb-8">Quelle: Statistisches Bundesamt (Destatis), 2025</p>
            <div className="space-y-3">
              {bundeslaenderGPG.map((b) => (
                <div key={b.name} className="flex items-center gap-4">
                  <div className="w-[180px] text-[0.88rem] text-ink font-medium shrink-0 max-md:w-[130px] max-md:text-[0.8rem]">{b.name}</div>
                  <div className="flex-1 bg-cream-dark rounded-full h-6 overflow-hidden">
                    <div
                      className={`${b.color} h-full rounded-full flex items-center justify-end pr-2.5`}
                      style={{ width: `${Math.max(b.gpg * 3.5, 20)}%` }}
                    >
                      <span className="text-white text-[0.75rem] font-bold">{b.gpg}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[0.82rem] text-ink-muted mt-6">
              Der deutliche Ost-West-Unterschied erklärt sich durch die höhere Erwerbsbeteiligung von Frauen in den ostdeutschen Bundesländern
              und die unterschiedliche Branchenstruktur. In Baden-Württemberg mit seiner starken Industrie ist der GPG am höchsten.
            </p>
          </div>
        </section>

        {/* Zeitstrahl */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Zeitstrahl: Entgelttransparenz in Deutschland
            </h2>
            <div className="space-y-4">
              {[
                { year: '2017', event: 'Entgelttransparenzgesetz (EntgTranspG) tritt in Kraft', detail: 'Auskunftsrecht ab 200 MA, kaum Sanktionen, geringe Nutzung' },
                { year: '2023', event: 'EU-Richtlinie 2023/970 verabschiedet', detail: 'Deutlich verschärfte Regelung mit Beweislastumkehr und echten Sanktionen' },
                { year: 'Okt. 2025', event: 'BAG-Urteil Az. 8 AZR 300/24', detail: 'Paarvergleich reicht für Vermutung der Diskriminierung aus — Meilenstein-Urteil' },
                { year: '7.6.2026', event: 'EU-Richtlinie wird nationales Recht', detail: 'Auskunftsrecht ab 50 MA, Gehaltsspannen Pflicht, Beweislastumkehr' },
                { year: '2027', event: 'Erste Berichtspflicht (250+ MA)', detail: 'Jährliche Berichte über geschlechtsspezifische Entgeltunterschiede' },
                { year: '2031', event: 'Berichtspflicht für 100+ MA', detail: 'Bericht alle 3 Jahre an die zuständige Behörde' },
              ].map((t, i) => (
                <FadeUp key={t.year} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-white rounded p-5 border border-border-light">
                    <div className="min-w-[100px] font-serif text-[1rem] font-bold text-gold pt-0.5">{t.year}</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">{t.event}</div>
                      <div className="text-[0.88rem] text-ink-muted">{t.detail}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* CTA AN/AG */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <a href="/arbeitnehmer" className="block bg-green-bg border border-green-bg rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-green mb-2">Arbeitnehmer</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Ihre Rechte ab Juni 2026</div>
              <div className="text-[0.88rem] text-ink-muted">Auskunftsrecht, Klage, Entschädigung &rarr;</div>
            </a>
            <a href="/arbeitgeber" className="block bg-cream-dark border border-blue/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-blue mb-2">Arbeitgeber</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Compliance-Pflichten ab 2026</div>
              <div className="text-[0.88rem] text-ink-muted">Berichtspflichten, Audit, Sanktionen &rarr;</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Gender Pay Gap 2026
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
