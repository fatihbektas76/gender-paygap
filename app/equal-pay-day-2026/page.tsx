import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Equal Pay Day 2026 — Datum, Bedeutung & rechtliche Möglichkeiten',
  description:
    'Equal Pay Day 2026: Am 7. März markiert der Equal Pay Day die 66 Tage, die Frauen rechnerisch umsonst arbeiten. Was bedeutet das? Welche Rechte haben Sie? Fachanwalt erklärt.',
  path: '/equal-pay-day-2026',
});

const faqs = [
  {
    question: 'Wann ist der Equal Pay Day 2026?',
    answer:
      'Der Equal Pay Day 2026 fällt auf den 7. März 2026. Er markiert den Tag, bis zu dem Frauen rechnerisch unbezahlt arbeiten, während Männer bereits seit dem 1. Januar bezahlt werden. Bei einem Gender Pay Gap von 16% entspricht das 66 Tagen.',
  },
  {
    question: 'Wie wird der Equal Pay Day berechnet?',
    answer:
      'Der Equal Pay Day ergibt sich aus dem aktuellen Gender Pay Gap: 365 Tage x 16% (GPG) = 58,4 Tage ab Jahresbeginn. In der Praxis wird der Tag symbolisch auf den nächsten Werktag gelegt. Je höher der GPG, desto später im Jahr liegt der Equal Pay Day.',
  },
  {
    question: 'Was hat sich 2026 für Frauen beim Gehalt geändert?',
    answer:
      'Am 7. Juni 2026 tritt die EU-Entgelttransparenzrichtlinie 2023/970 in Kraft. Sie gibt Frauen erstmals wirksame Instrumente: Auskunftsrecht über Vergleichsgehälter ab 50 MA, Beweislastumkehr bei Gehaltsdifferenzen und Anspruch auf Entschädigung für bis zu 3 Jahre rückwirkend.',
  },
  {
    question: 'Was können Frauen tun, die weniger verdienen als ihre Kollegen?',
    answer:
      'Ab dem 7. Juni 2026: (1) Auskunftsrecht nutzen und Vergleichsgehälter anfragen (Art. 7 EU-RL 2023/970), (2) Bei Differenz: Gehaltsverhandlung mit rechtlicher Grundlage führen, (3) Bei Ablehnung: Equal-Pay-Klage einreichen. Das BAG-Urteil Az. 8 AZR 300/24 stärkt die Position von Klägerinnen erheblich.',
  },
  {
    question: 'Gibt es den Equal Pay Day auch nach Branchen?',
    answer:
      'Ja, der Equal Pay Day variiert stark nach Branche. In der Versicherungsbranche (GPG 28%) wäre der Equal Pay Day erst am 12. April, im öffentlichen Dienst (GPG 10%) schon am 6. Februar. Branchenspezifische Daten zeigen: Tarifbindung senkt den Gender Pay Gap deutlich.',
  },
];

const branchenEPD = [
  { name: 'Versicherung', gpg: 28, tage: 102, epd: '12. April' },
  { name: 'Bankwesen', gpg: 26, tage: 95, epd: '5. April' },
  { name: 'Beratung', gpg: 24, tage: 88, epd: '29. März' },
  { name: 'Automobil', gpg: 23, tage: 84, epd: '25. März' },
  { name: 'Gesundheitswesen', gpg: 22, tage: 80, epd: '22. März' },
  { name: 'Einzelhandel', gpg: 19, tage: 69, epd: '11. März' },
  { name: 'IT & Software', gpg: 14, tage: 51, epd: '21. Februar' },
  { name: 'Öffentl. Dienst', gpg: 10, tage: 37, epd: '6. Februar' },
];

export default function EqualPayDay2026Page() {
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
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">Aktionstag</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Equal Pay Day 2026 — 66 Tage unbezahlte Arbeit
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[720px] leading-relaxed">
              Der Equal Pay Day 2026 fällt auf den 7. März. Er markiert symbolisch den Tag, bis zu dem Frauen
              in Deutschland rechnerisch unbezahlt arbeiten. Bei einem Gender Pay Gap von 16% (Statistisches
              Bundesamt, 2025) sind das 66 Tage. 2026 wird ein Wendepunkt: Am 7. Juni tritt die
              EU-Entgelttransparenzrichtlinie in Kraft.
            </p>
          </div>
        </header>

        {/* Große Statistik-Karten */}
        <section className="py-[70px] px-8 bg-white max-md:py-[50px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
              <FadeUp>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">7. März</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Equal Pay Day 2026</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Aktionstag für Lohngleichheit</div>
                </div>
              </FadeUp>
              <FadeUp delay={1}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">66 Tage</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">Unbezahlte Arbeit</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">So lange arbeiten Frauen &bdquo;umsonst&ldquo;</div>
                </div>
              </FadeUp>
              <FadeUp delay={2}>
                <div className="bg-gold-bg border border-gold/20 rounded p-7 text-center">
                  <div className="font-serif text-[2.5rem] font-bold text-gold">7. Juni</div>
                  <div className="text-[0.9rem] text-ink-muted mt-1">EU-Richtlinie tritt in Kraft</div>
                  <div className="text-[0.78rem] text-ink-muted mt-0.5">Neue Rechte für Beschäftigte</div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Was ist der Equal Pay Day */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Was ist der Equal Pay Day?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Symbolischer Aktionstag',
                  text: 'Der Equal Pay Day markiert den Tag im Jahr, bis zu dem Frauen rechnerisch umsonst arbeiten, während Männer bereits seit dem 1. Januar bezahlt werden. Er wird jährlich vom Business and Professional Women (BPW) Netzwerk organisiert.',
                },
                {
                  title: 'Berechnung',
                  text: 'Der Equal Pay Day errechnet sich aus dem Gender Pay Gap: Bei 16% GPG arbeiten Frauen 66 Tage (365 x 0,16) ohne Bezahlung. Der Tag fällt 2026 auf den 7. März. Je kleiner der GPG, desto früher der Equal Pay Day.',
                },
                {
                  title: 'Historische Entwicklung',
                  text: 'Der Equal Pay Day hat sich in Deutschland nur langsam verschoben: 2010 lag er am 26. März (23% GPG), 2020 am 17. März (18% GPG), 2026 am 7. März (16% GPG). In 16 Jahren hat sich der GPG um nur 7 Prozentpunkte verringert.',
                },
                {
                  title: '2026 als Wendepunkt',
                  text: 'Der Equal Pay Day 2026 ist besonders bedeutsam: Nur 3 Monate später, am 7. Juni, tritt die EU-Entgelttransparenzrichtlinie in Kraft. Erstmals erhalten Beschäftigte wirksame rechtliche Instrumente gegen Lohndiskriminierung.',
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

        {/* Equal Pay Day nach Branche */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-2">
              Equal Pay Day nach Branche
            </h2>
            <p className="text-[0.9rem] text-ink-muted mb-8">
              Je höher der Gender Pay Gap in einer Branche, desto später der branchenspezifische Equal Pay Day.
            </p>
            <div className="space-y-3">
              {branchenEPD.map((b) => (
                <FadeUp key={b.name}>
                  <div className="flex items-center gap-4 bg-cream border border-border-light rounded p-4">
                    <div className="w-[140px] text-[0.88rem] text-ink font-medium shrink-0 max-md:w-[110px] max-md:text-[0.8rem]">{b.name}</div>
                    <div className="flex-1">
                      <div className="bg-cream-dark rounded-full h-6 overflow-hidden">
                        <div
                          className={`${b.gpg > 22 ? 'bg-red-500' : b.gpg > 18 ? 'bg-orange-400' : b.gpg > 12 ? 'bg-yellow-400' : 'bg-green-500'} h-full rounded-full flex items-center justify-end pr-2.5`}
                          style={{ width: `${Math.max(b.gpg * 3, 20)}%` }}
                        >
                          <span className="text-white text-[0.75rem] font-bold">{b.gpg}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-[100px] text-right text-[0.85rem] text-ink font-semibold max-md:min-w-[80px] max-md:text-[0.78rem]">
                      {b.epd}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
            <p className="text-[0.82rem] text-ink-muted mt-6">
              Quelle: Berechnung auf Basis der Destatis-Daten 2025. Der branchenspezifische Equal Pay Day zeigt:
              Tarifgebundene Branchen (öffentlicher Dienst, Bildung) haben deutlich frühere Termine.
            </p>
          </div>
        </section>

        {/* Was sich 2026 ändert */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-6">
              2026: Vom Aktionstag zur Rechtsdurchsetzung
            </h2>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed mb-6 max-w-[720px]">
              Der Equal Pay Day 2026 markiert nicht nur symbolisch die Lohnlücke. Drei Monate nach dem
              Aktionstag tritt am 7. Juni 2026 die EU-Entgelttransparenzrichtlinie in Kraft und gibt
              Beschäftigten erstmals wirksame Instrumente:
            </p>
            <div className="space-y-4">
              {[
                { title: 'Auskunftsrecht ab 50 Mitarbeitern', text: 'Arbeitnehmer:innen können Vergleichsgehälter anfragen. Der Arbeitgeber muss innerhalb von 2 Monaten antworten (Art. 7 EU-RL 2023/970).' },
                { title: 'Beweislastumkehr', text: 'Bei Gehaltsdifferenzen muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt. Das BAG-Urteil Az. 8 AZR 300/24 bestätigt: Ein Paarvergleich reicht aus.' },
                { title: 'Entschädigung rückwirkend', text: 'Betroffene können Nachzahlung und Entschädigung für bis zu 3 Jahre rückwirkend verlangen (Art. 21 EU-RL 2023/970).' },
                { title: 'Gehaltsspannen in Stellenanzeigen', text: 'Arbeitgeber müssen die Gehaltsspanne vor dem Vorstellungsgespräch mitteilen (Art. 5 EU-RL). Stellenanzeigen ohne Gehalt werden rechtswidrig.' },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="flex gap-5 items-start bg-white rounded p-5 border border-border-light">
                    <div className="min-w-[28px] h-7 w-7 rounded-full bg-gold-bg text-gold font-bold text-[0.85rem] flex items-center justify-center mt-0.5">{i + 1}</div>
                    <div>
                      <div className="font-semibold text-ink text-[0.95rem] mb-1">{item.title}</div>
                      <div className="text-[0.88rem] text-ink-muted">{item.text}</div>
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
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Ihre Rechte bei Lohndiskriminierung</div>
              <div className="text-[0.88rem] text-ink-muted">Auskunftsrecht nutzen, Klage prüfen &rarr;</div>
            </a>
            <a href="/arbeitgeber" className="block bg-cream-dark border border-blue/20 rounded p-7 no-underline transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-blue mb-2">Arbeitgeber</div>
              <div className="font-serif text-[1.2rem] font-bold text-ink mb-2">Vor dem 7. Juni compliant werden</div>
              <div className="text-[0.88rem] text-ink-muted">Compliance-Check, Audit, Beratung &rarr;</div>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen zum Equal Pay Day 2026
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
