import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import FadeUp from '@/components/FadeUp';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: `Ihre Rechte bei ungleicher Bezahlung — Fachanwalt berät (${new Date().getFullYear()})`,
  description:
    'Auskunftsrecht, Equal-Pay-Klage, Entschädigung — Fachanwalt Fatih Bektas berät Sie. EU-Richtlinie 2023/970 gibt Ihnen neue Rechte ab Juni 2026.',
  path: '/arbeitnehmer',
});

const topics = [
  { href: '/auskunftsrecht-entgelttransparenz', title: 'Auskunftsrecht geltend machen', desc: 'Erfahren Sie, wie Sie Auskunft über Vergleichsgehälter verlangen können.' },
  { href: '/equal-pay-klage', title: 'Equal-Pay-Klage einreichen', desc: 'Klage bei Gehaltsungleichheit — Ablauf, Kosten, Erfolgsaussichten.' },
  { href: '/lohndiskriminierung-nachweisen', title: 'Lohndiskriminierung nachweisen', desc: 'Beweislastumkehr nach Art. 18 EU-RL: So nutzen Sie Ihren Vorteil.' },
  { href: '/entschaedigung-entgeltdiskriminierung', title: 'Entschädigung berechnen', desc: 'Bis zu 3 Jahre rückwirkend: Anspruch auf Nachzahlung + immaterielle Entschädigung.' },
  { href: '/beweislastumkehr-equal-pay', title: 'Beweislastumkehr nutzen', desc: 'Der Arbeitgeber muss beweisen, dass er nicht diskriminiert — nicht Sie.' },
  { href: '/gleicher-lohn-gleiche-arbeit', title: 'Gleicher Lohn für gleiche Arbeit', desc: 'Was „gleiche oder gleichwertige Arbeit" rechtlich bedeutet.' },
  { href: '/elternzeit-gehaltsluecke', title: 'Elternzeit & Gehaltslücke', desc: 'Wie sich Elternzeit auf die Vergütung auswirkt und was Sie tun können.' },
  { href: '/rueckkehr-elternzeit-gehalt', title: 'Rückkehr nach Elternzeit', desc: 'Ihr Recht auf gleichwertige Position und Vergütung nach der Elternzeit.' },
  { href: '/teilzeit-gehaltsvergleich', title: 'Teilzeit & Gehaltsvergleich', desc: 'Teilzeitbeschäftigte haben gleiche Rechte auf Entgelttransparenz.' },
];

const faqs = [
  {
    question: 'Ab wann gilt das Auskunftsrecht für Arbeitnehmer?',
    answer: 'Das individuelle Auskunftsrecht gilt ab dem 7. Juni 2026 für alle Beschäftigten in Unternehmen mit mehr als 50 Mitarbeitern (Art. 7 EU-Richtlinie 2023/970). Sie können dann Auskunft über das durchschnittliche Entgelt für vergleichbare Positionen verlangen — aufgeschlüsselt nach Geschlecht.',
  },
  {
    question: 'Was kann ich tun, wenn mein Arbeitgeber nicht antwortet?',
    answer: 'Der Arbeitgeber muss innerhalb von 2 Monaten antworten. Bei Nichtbeantwortung tritt automatisch die Beweislastumkehr ein (Art. 18 EU-RL): Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt. Sie können zudem Klage einreichen.',
  },
  {
    question: 'Wie hoch kann meine Entschädigung ausfallen?',
    answer: 'Die Entschädigung umfasst die vollständige Gehaltsdifferenz für bis zu 3 Jahre rückwirkend (Art. 21 EU-RL), Verzugszinsen nach § 288 BGB sowie eine immaterielle Entschädigung. Bei einem Gehaltsunterschied von 500 €/Monat kann die Gesamtforderung schnell über 20.000 € liegen.',
  },
  {
    question: 'Reicht ein einzelner Gehaltsvergleich als Beweis?',
    answer: 'Ja. Das BAG hat mit Urteil Az. 8 AZR 300/24 vom 23.10.2025 klargestellt, dass ein Paarvergleich — also der Vergleich mit einer einzelnen Vergleichsperson — ausreicht, um eine Vermutung der Entgeltdiskriminierung zu begründen.',
  },
  {
    question: 'Muss ich Angst vor Nachteilen im Job haben?',
    answer: 'Nein. Die EU-Richtlinie enthält ein ausdrückliches Benachteiligungsverbot (Art. 25). Arbeitnehmer, die ihr Auskunftsrecht wahrnehmen oder Klage einreichen, dürfen nicht benachteiligt werden. Verstöße dagegen sind eigenständig einklagbar.',
  },
];

export default function ArbeitnehmerPage() {
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
        <header className="pt-[150px] pb-[80px] px-8 bg-secondary-50 max-md:pt-[120px] max-md:pb-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">Arbeitnehmer</div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-5 tracking-tight max-md:text-[1.8rem]">
              Ihre Rechte bei ungleicher Bezahlung
            </h1>
            <p className="text-[1.1rem] text-ink-muted max-w-[700px] leading-relaxed mb-0">
              Arbeitnehmer haben ab dem 7. Juni 2026 das Recht, von Arbeitgebern mit mehr als 50 Mitarbeitern
              Auskunft über Gehaltskriterien und Vergleichsgehälter zu verlangen (Art. 7 EU-Richtlinie 2023/970).
              Bei nachgewiesener Lohndiskriminierung haben Sie Anspruch auf Entschädigung für mindestens 3 Jahre rückwirkend.
            </p>
          </div>
        </header>

        {/* Themen-Grid */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Ihre Themen als Arbeitnehmer
            </h2>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {topics.map((t, i) => (
                <FadeUp key={t.href} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <a
                    href={t.href}
                    className="block bg-white border border-border-light rounded p-6 no-underline transition-all hover:border-secondary hover:shadow-[0_4px_16px_rgba(34,197,94,0.1)] hover:-translate-y-0.5 h-full"
                  >
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{t.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{t.desc}</p>
                  </a>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-[90px] px-8 bg-secondary-50 max-md:py-[60px] max-md:px-6">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-3">
              Interaktive Tools für Arbeitnehmer
            </h2>
            <p className="text-[0.95rem] text-ink-muted mb-8 max-w-[650px]">
              Prüfen Sie Ihre Ansprüche direkt online — kostenlos und ohne Registrierung.
            </p>
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              {[
                { href: '/auskunftsrecht-checker', title: 'Auskunftsrecht prüfen', desc: 'Prüfen Sie in 3 Schritten, ob Sie Anspruch auf Gehaltsauskunft haben.' },
                { href: '/auskunftsrecht-checker/schreiben-generator', title: 'Auskunftsschreiben erstellen', desc: 'Generieren Sie ein Muster-Auskunftsschreiben an Ihren Arbeitgeber.' },
                { href: '/equal-pay-anspruch-schnellcheck', title: 'Equal-Pay-Schnellcheck', desc: '4 Fragen — erfahren Sie, ob Sie einen Equal-Pay-Anspruch haben.' },
                { href: '/equal-pay-klage/entschaedigung-berechnen', title: 'Entschädigung berechnen', desc: 'Berechnen Sie Ihre mögliche Nachzahlung + Schadensersatz.' },
                { href: '/gehaltsverhandlung-vorbereiter', title: 'Gehaltsverhandlung vorbereiten', desc: 'Rechtlich fundierter Gesprächsleitfaden für die Gehaltsverhandlung.' },
                { href: '/vergleichsgruppen-finder', title: 'Vergleichsgruppen-Finder', desc: 'KI-gestützt: Finden Sie Ihre Vergleichspositionen nach EU-Kriterien.' },
                { href: '/gender-pay-gap-rechner', title: 'Gender Pay Gap Rechner', desc: 'Vergleichen Sie Ihr Gehalt mit dem Branchenmedian.' },
                { href: '/equal-pay-day-zaehler', title: 'Equal Pay Day Zähler', desc: 'Live-Countdown zum Equal Pay Day — national und nach Branche.' },
                { href: '/situationscheck', title: 'KI-Situationscheck', desc: 'Beschreiben Sie Ihre Situation und erhalten Sie eine Ersteinschätzung.' },
              ].map((t, i) => (
                <FadeUp key={t.href} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <a
                    href={t.href}
                    className="block bg-white border border-border-light rounded p-6 no-underline transition-all hover:border-secondary hover:shadow-[0_4px_16px_rgba(34,197,94,0.1)] hover:-translate-y-0.5 h-full"
                  >
                    <h3 className="font-serif text-[1.1rem] font-bold text-ink mb-2">{t.title}</h3>
                    <p className="text-[0.88rem] text-ink-muted leading-relaxed m-0">{t.desc}</p>
                  </a>
                </FadeUp>
              ))}
            </div>
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
                  der Entgeltdiskriminierung zu begründen. Sie müssen keine Statistik über die gesamte Belegschaft vorlegen —
                  ein einziger Vergleich mit einer Person in vergleichbarer Position genügt.
                  Dies stärkt Ihre Position als Arbeitnehmer:in erheblich.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[90px] px-8 bg-white max-md:py-[60px] max-md:px-6" id="faq">
          <div className="max-w-content mx-auto">
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight mb-8">
              Häufige Fragen für Arbeitnehmer
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
              Kostenlose Ersteinschätzung für Arbeitnehmer
            </h2>
            <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
              Wir prüfen, ob Sie Anspruch auf Auskunft, Nachzahlung oder Entschädigung haben.
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
