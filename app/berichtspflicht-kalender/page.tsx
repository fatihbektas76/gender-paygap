'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

type CompanySize = '50-99' | '100-249' | '250-499' | '500+';

type Deadline = {
  datum: string;
  pflicht: string;
  details: string;
};

const companySizeLabels: Record<CompanySize, string> = {
  '50-99': '50–99 Mitarbeiter',
  '100-249': '100–249 Mitarbeiter',
  '250-499': '250–499 Mitarbeiter',
  '500+': '500+ Mitarbeiter',
};

const deadlines: Record<CompanySize, Deadline[]> = {
  '50-99': [
    { datum: '2026-06-07', pflicht: 'Auskunftsrecht auf Anfrage', details: 'Beschäftigte können Auskunft über Vergleichsgehälter verlangen. Antwortfrist: 2 Monate.' },
    { datum: '2026-06-07', pflicht: 'Kriterien-Offenlegung', details: 'Objektive Vergütungskriterien müssen auf Anfrage offengelegt werden.' },
    { datum: '2026-06-07', pflicht: 'Gehaltsspannen in Stellenanzeigen', details: 'Stellenanzeigen müssen Gehaltsspanne oder Einstiegsgehalt enthalten.' },
  ],
  '100-249': [
    { datum: '2026-06-07', pflicht: 'Auskunftsrecht auf Anfrage', details: 'Wie 50-99 MA.' },
    { datum: '2026-06-07', pflicht: 'Kriterien-Offenlegung', details: 'Wie 50-99 MA.' },
    { datum: '2026-06-07', pflicht: 'Gehaltsspannen in Stellenanzeigen', details: 'Wie 50-99 MA.' },
  ],
  '250-499': [
    { datum: '2026-06-07', pflicht: 'Vollständige Auskunftspflicht', details: 'Umfassende Auskunft über individuelle und aggregierte Entgeltdaten.' },
    { datum: '2027-06-07', pflicht: 'Erster Entgelttransparenz-Bericht', details: 'Bericht über GPG nach Entgeltgruppe, Boni, Sachleistungen.' },
    { datum: '2026-06-07', pflicht: 'Gehaltsspannen in Stellenanzeigen', details: 'Gehaltsspanne oder Einstiegsgehalt verpflichtend.' },
    { datum: '2030-06-07', pflicht: 'Zweiter Bericht', details: 'Aktualisierter Bericht alle 3 Jahre.' },
  ],
  '500+': [
    { datum: '2026-06-07', pflicht: 'Vollständige Auskunftspflicht', details: 'Umfassende Auskunft über individuelle und aggregierte Entgeltdaten.' },
    { datum: '2027-06-07', pflicht: 'Erster Entgelttransparenz-Bericht', details: 'Bericht über GPG nach Entgeltgruppe, Boni, Sachleistungen.' },
    { datum: '2026-06-07', pflicht: 'Gehaltsspannen in Stellenanzeigen', details: 'Gehaltsspanne oder Einstiegsgehalt verpflichtend.' },
    { datum: '2028-06-07', pflicht: 'Zweiter Bericht (jährlich ab 250+ MA)', details: 'Ab 250 MA: jährlicher Bericht, ab 500 MA: ebenfalls jährlich.' },
    { datum: '2030-06-07', pflicht: 'Vierter Bericht', details: 'Fortlaufende jährliche Berichterstattung.' },
    { datum: '2032-06-07', pflicht: 'Sechster Bericht', details: 'Langfristige Compliance sicherstellen.' },
  ],
};

function formatDateDE(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

function isInPast(dateStr: string): boolean {
  const now = new Date();
  const d = new Date(dateStr + 'T00:00:00');
  return d < now;
}

function isWithinSixMonths(dateStr: string): boolean {
  const now = new Date();
  const d = new Date(dateStr + 'T00:00:00');
  const sixMonths = new Date(now);
  sixMonths.setMonth(sixMonths.getMonth() + 6);
  return d >= now && d <= sixMonths;
}

function generateICS(items: Deadline[]): string {
  const events = items.map((item) => {
    const dateClean = item.datum.replace(/-/g, '');
    return [
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dateClean}`,
      `SUMMARY:Entgelttransparenz: ${item.pflicht}`,
      `DESCRIPTION:${item.details.replace(/\n/g, '\\n')}`,
      'END:VEVENT',
    ].join('\r\n');
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//APOS Legal//Berichtspflicht-Kalender//DE',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
}

const faqs = [
  {
    q: 'Welche Unternehmen müssen Entgelttransparenz-Berichte erstellen?',
    a: 'Nach der EU-Richtlinie 2023/970 müssen Unternehmen ab 250 Mitarbeitern ab dem 7. Juni 2027 jährlich berichten. Unternehmen mit 100–249 Mitarbeitern folgen ab 2031 (alle 3 Jahre). Unternehmen ab 50 Mitarbeitern müssen ab 2026 das individuelle Auskunftsrecht erfüllen und Gehaltsspannen in Stellenanzeigen angeben.',
  },
  {
    q: 'Was passiert, wenn mein Unternehmen eine Frist versäumt?',
    a: 'Verstöße gegen die Berichtspflichten können zu Bußgeldern durch die nationale Aufsichtsbehörde führen. Zusätzlich greift bei fehlendem Bericht die Beweislastumkehr (Art. 18 EU-RL 2023/970): Ihr Unternehmen muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt. Beschäftigte können individuelle Entschädigungsansprüche geltend machen.',
  },
  {
    q: 'Was muss in den Entgelttransparenz-Bericht?',
    a: 'Der Bericht muss enthalten: (1) Geschlechtsspezifischer Entgeltunterschied als Median und Mittelwert, (2) GPG bei variablen Vergütungsbestandteilen, (3) Anteil weiblicher/männlicher Beschäftigter je Entgeltquartil, (4) Aufschlüsselung nach Beschäftigtenkategorien. Bei einem nicht gerechtfertigten GPG über 5 % muss eine gemeinsame Entgeltbewertung mit dem Betriebsrat erfolgen.',
  },
];

export default function BerichtspflichtKalenderPage() {
  const [selectedSize, setSelectedSize] = useState<CompanySize | null>(null);

  const sortedDeadlines = useMemo(() => {
    if (!selectedSize) return [];
    return [...deadlines[selectedSize]].sort(
      (a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime(),
    );
  }, [selectedSize]);

  function handleDownloadICS() {
    if (!selectedSize) return;
    const icsContent = generateICS(deadlines[selectedSize]);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `berichtspflicht-${selectedSize}-ma.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/berichtspflicht-kalender/`}
        pageTitle="Berichtspflicht-Kalender — Alle Deadlines 2026–2032"
        pageDescription="Personalisierter Zeitplan aller Entgelttransparenz-Deadlines für Ihr Unternehmen. ICS-Download für Ihren Kalender."
        pageType="WebApplication"
        appName="Berichtspflicht-Kalender"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitgeber', url: `${SEO_CONFIG.baseUrl}/arbeitgeber/` },
          { name: 'Berichtspflicht-Kalender', url: `${SEO_CONFIG.baseUrl}/berichtspflicht-kalender/` },
        ]}
        speakableSelectors={['#direktantwort']}
        includeOrganization={false}
        includeRating={false}
      />

      {/* Schema.org - FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <div className="bg-accent-50 pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-accent-700 no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitgeber" className="text-accent-700 no-underline hover:underline">Arbeitgeber</Link>
            <span className="mx-2">/</span>
            <span>Berichtspflicht-Kalender</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Berichtspflicht-Kalender &mdash; Alle Deadlines 2026&ndash;2032
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Wählen Sie Ihre Unternehmensgröße und erhalten Sie einen personalisierten
            Zeitplan aller Entgelttransparenz-Pflichten &mdash; mit ICS-Download für
            Ihren Kalender.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-accent-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Personalisiert
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-accent-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              ICS-Download
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-accent-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kein Login
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Berichtspflichten planen</strong> bedeutet, alle Fristen der EU-Entgelttransparenzrichtlinie
              2023/970 im Blick zu behalten. Ab <strong>7. Juni 2026</strong> gelten Auskunftsrechte und
              Gehaltsspannen-Pflichten. Ab <strong>2027</strong> kommen Entgelttransparenz-Berichte hinzu.
              Die genauen Fristen hängen von Ihrer <strong>Unternehmensgröße</strong> ab.
            </p>
          </div>
        </div>
      </section>

      {/* Selector + Timeline */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
              Unternehmensgröße wählen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie viele Mitarbeiter hat Ihr Unternehmen?
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(Object.keys(companySizeLabels) as CompanySize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3.5 px-4 border rounded-sm font-sans text-[0.9rem] cursor-pointer transition-all ${
                    selectedSize === size
                      ? 'bg-accent-600 text-white border-accent-600'
                      : 'bg-white text-ink border-border hover:border-accent-400 hover:bg-accent-50'
                  }`}
                >
                  {companySizeLabels[size]}
                </button>
              ))}
            </div>

            {/* Timeline */}
            {selectedSize && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-[1.2rem] font-bold">
                    Ihre Deadlines ({companySizeLabels[selectedSize]})
                  </h3>
                  <button
                    onClick={handleDownloadICS}
                    className="inline-flex items-center gap-2 py-2.5 px-5 bg-accent-600 text-white border-none rounded-sm text-[0.88rem] font-semibold cursor-pointer transition-all hover:bg-accent-700 hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(37,99,235,0.2)]"
                  >
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    ICS herunterladen
                  </button>
                </div>

                {/* Vertical timeline */}
                <div className="relative pl-8 border-l-2 border-accent-200">
                  {sortedDeadlines.map((dl, i) => {
                    const past = isInPast(dl.datum);
                    const upcoming = isWithinSixMonths(dl.datum);
                    let dotColor = 'bg-accent-200';
                    let cardBorder = 'border-accent-100';
                    let cardBg = 'bg-white';
                    if (past) {
                      dotColor = 'bg-ink-muted';
                      cardBorder = 'border-slate-200';
                      cardBg = 'bg-slate-50';
                    } else if (upcoming) {
                      dotColor = 'bg-accent-700';
                      cardBorder = 'border-accent-400';
                      cardBg = 'bg-accent-50';
                    }

                    return (
                      <div key={`${dl.datum}-${i}`} className="relative mb-8 last:mb-0">
                        {/* Dot on the timeline */}
                        <div
                          className={`absolute -left-[25px] top-2 w-4 h-4 rounded-full border-2 border-white ${dotColor}`}
                        />

                        {/* Card */}
                        <div className={`border ${cardBorder} ${cardBg} rounded-sm p-5 ml-2`}>
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <div className={`text-[0.78rem] font-semibold mb-1 ${
                                past ? 'text-ink-muted' : upcoming ? 'text-accent-700' : 'text-accent-600'
                              }`}>
                                {formatDateDE(dl.datum)}
                                {past && (
                                  <span className="ml-2 text-[0.72rem] font-normal text-ink-muted">(vergangen)</span>
                                )}
                                {upcoming && (
                                  <span className="ml-2 text-[0.72rem] font-normal text-accent-600">(bevorstehend)</span>
                                )}
                              </div>
                              <h4 className={`font-serif text-[1rem] font-bold mb-1.5 ${
                                past ? 'text-ink-muted' : 'text-ink'
                              }`}>
                                {dl.pflicht}
                              </h4>
                              <p className={`text-[0.88rem] leading-relaxed m-0 ${
                                past ? 'text-ink-muted' : 'text-ink-light'
                              }`}>
                                {dl.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Prompt if no selection */}
            {!selectedSize && (
              <div className="mt-10 bg-slate-50 border border-border-light rounded p-8 text-center">
                <p className="text-[0.95rem] text-ink-muted">
                  Wählen Sie oben Ihre Unternehmensgröße, um Ihren personalisierten
                  Deadline-Kalender zu sehen.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zu Berichtspflichten
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-accent-700 text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Compliance sicherstellen &mdash; Beratung anfragen
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas berät Ihr Unternehmen zu allen Pflichten der
            EU-Entgelttransparenzrichtlinie &mdash; von der Auskunftspflicht bis zum
            Entgelttransparenz-Bericht.
          </p>
          <Link
            href="/kontakt"
            className="inline-block py-3.5 px-8 bg-white text-accent-700 border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-accent-50 hover:-translate-y-0.5"
          >
            Compliance-Beratung anfragen &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-[40px] px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <p className="text-[0.75rem] text-ink-muted leading-relaxed">
              <strong>Hinweis:</strong> Die dargestellten Fristen basieren auf der EU-Entgelttransparenzrichtlinie
              2023/970, die bis 7. Juni 2026 in nationales Recht umgesetzt werden muss. Die nationale
              Umsetzung kann abweichende oder zusätzliche Fristen vorsehen. Dieses Tool dient der
              Information und ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung
              wenden Sie sich an einen{' '}
              <Link href="/kontakt" className="text-accent-700 no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
