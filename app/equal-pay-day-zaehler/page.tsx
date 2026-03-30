'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import { branchen } from '@/data/branchen';

const nationalGPG = 16;

function calcEqualPayDay(gpgProzent: number): { date: Date; days: number } {
  const year = new Date().getFullYear() + 1;
  const days = Math.round(365 * gpgProzent / 100);
  const equalPayDay = new Date(year, 0, 1);
  equalPayDay.setDate(equalPayDay.getDate() + days - 1);
  return { date: equalPayDay, days };
}

function formatDateDE(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}

const faqs = [
  {
    q: 'Was ist der Equal Pay Day?',
    a: 'Der Equal Pay Day markiert symbolisch den Tag, bis zu dem Frauen im neuen Jahr unbezahlt arbeiten, während Männer ab dem 1. Januar Gehalt erhalten. Er basiert auf dem prozentualen Gehaltsunterschied (Gender Pay Gap) zwischen Frauen und Männern. In Deutschland liegt der unbereinigte GPG bei ca. 16 %, was etwa 58 Tagen im Jahr entspricht.',
  },
  {
    q: 'Wie wird der Equal Pay Day berechnet?',
    a: 'Die Berechnung ist einfach: 365 Tage x (Gender Pay Gap in Prozent / 100) = Anzahl der Tage, die Frauen „gratis" arbeiten. Diese Tage werden ab dem 1. Januar gezählt. Bei einem GPG von 16 % sind das rund 58 Tage — der Equal Pay Day fällt dann auf Ende Februar / Anfang März.',
  },
  {
    q: 'Unterscheidet sich der Equal Pay Day nach Branche?',
    a: 'Ja, erheblich. Im Öffentlichen Dienst (GPG ca. 10 %) fällt der Equal Pay Day deutlich früher als etwa in der Versicherungswirtschaft (GPG ca. 28 %), wo Frauen mehr als 100 Tage unbezahlt arbeiten. Die EU-Entgelttransparenzrichtlinie 2023/970 soll diese Unterschiede durch Berichtspflichten und das individuelle Auskunftsrecht ab 2026 sichtbar machen.',
  },
];

export default function EqualPayDayZaehlerPage() {
  const [selectedBranche, setSelectedBranche] = useState<string>('');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const nationalResult = useMemo(() => calcEqualPayDay(nationalGPG), []);
  const branchenResult = useMemo(() => {
    if (!selectedBranche) return null;
    const b = branchen.find((br) => br.slug === selectedBranche);
    if (!b) return null;
    return { ...calcEqualPayDay(b.gpgProzent), name: b.name, gpg: b.gpgProzent };
  }, [selectedBranche]);

  // Countdown to next Equal Pay Day
  useEffect(() => {
    function update() {
      const now = new Date();
      const target = nationalResult.date;
      let diff = target.getTime() - now.getTime();
      if (diff < 0) {
        // If past this year's EPD, calculate for next year
        const nextTarget = calcEqualPayDay(nationalGPG);
        nextTarget.date.setFullYear(nextTarget.date.getFullYear() + 1);
        diff = nextTarget.date.getTime() - now.getTime();
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [nationalResult.date]);

  // Sort branches by GPG for the bar chart
  const sortedBranchen = useMemo(
    () => [...branchen].sort((a, b) => b.gpgProzent - a.gpgProzent),
    [],
  );
  const maxGPG = sortedBranchen[0]?.gpgProzent || 28;

  const shareText = `Frauen arbeiten ${nationalResult.days} Tage im Jahr unbezahlt. #EqualPayDay #GenderPayGap`;
  const shareUrl = `${SEO_CONFIG.baseUrl}/equal-pay-day-zaehler/`;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/equal-pay-day-zaehler/`}
        pageTitle="Equal Pay Day Zähler — Wie lange arbeiten Frauen gratis?"
        pageDescription="Live-Animation: So viele Tage arbeiten Frauen in Deutschland unbezahlt. Equal Pay Day berechnen — auch nach Branche."
        pageType="WebApplication"
        appName="Equal Pay Day Zähler"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Equal Pay Day Zähler', url: `${SEO_CONFIG.baseUrl}/equal-pay-day-zaehler/` },
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
      <div className="bg-primary-50 pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-primary-700 no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <span>Equal Pay Day Zähler</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Equal Pay Day Zähler &mdash; Wie lange arbeiten Frauen gratis?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Frauen in Deutschland arbeiten jedes Jahr Dutzende Tage unbezahlt.
            Berechnen Sie den Equal Pay Day &mdash; national und für Ihre Branche.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-primary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Live-Countdown
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-primary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {branchen.length} Branchen
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-primary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
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
              <strong>Equal Pay Day berechnen</strong> bedeutet, den Tag im Jahr zu bestimmen, bis zu dem Frauen
              im Vergleich zu Männern unbezahlt arbeiten. Bei einem Gender Pay Gap von{' '}
              <strong>{nationalGPG} %</strong> in Deutschland sind das{' '}
              <strong>{nationalResult.days} Tage</strong> &mdash; der Equal Pay Day{' '}
              {nationalResult.date.getFullYear()} fällt auf den{' '}
              <strong>{formatDateDE(nationalResult.date)}</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Hero Result */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="bg-primary-50 border-2 border-primary-200 rounded p-8 text-center">
              <p className="text-[0.85rem] text-primary-700 font-semibold uppercase tracking-wider mb-3">
                Deutschland &mdash; Gender Pay Gap {nationalGPG} %
              </p>
              <p className="font-serif text-[clamp(1.4rem,3.5vw,2rem)] font-bold leading-[1.25] text-ink mb-2">
                Frauen arbeiten bis zum{' '}
                <span className="text-primary-700">{formatDateDE(nationalResult.date)}</span> gratis.
              </p>
              <p className="text-[1.15rem] text-ink-light">
                Das sind <span className="font-bold text-primary-700">{nationalResult.days} Tage</span> unbezahlte
                Arbeit im Jahr.
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-8 bg-slate-50 border border-border-light rounded p-6 text-center">
              <p className="text-[0.85rem] text-ink-muted font-semibold mb-4">
                Noch bis zum nächsten Equal Pay Day:
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {[
                  { value: countdown.days, label: 'Tage' },
                  { value: countdown.hours, label: 'Stunden' },
                  { value: countdown.minutes, label: 'Minuten' },
                  { value: countdown.seconds, label: 'Sekunden' },
                ].map((item) => (
                  <div key={item.label} className="bg-white border border-border rounded-sm px-5 py-3 min-w-[80px]">
                    <div className="font-serif text-[1.6rem] font-bold text-primary-700">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-[0.75rem] text-ink-muted mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Selection */}
      <section className="py-[70px] px-8 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">
              Individuell berechnen
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Branche auswählen &mdash; individueller Equal Pay Day
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-6">
              Der Gender Pay Gap variiert stark nach Branche. Wählen Sie Ihre Branche,
              um Ihren individuellen Equal Pay Day zu berechnen.
            </p>

            <select
              value={selectedBranche}
              onChange={(e) => setSelectedBranche(e.target.value)}
              className="w-full py-3.5 px-4 bg-white border border-border rounded-sm font-sans text-[0.95rem] text-ink cursor-pointer appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23555\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
            >
              <option value="">Branche auswählen...</option>
              {branchen.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name} (GPG: {b.gpgProzent} %)
                </option>
              ))}
            </select>

            {branchenResult && (
              <div className="mt-6 bg-white border-2 border-primary-200 rounded p-6 text-center">
                <p className="text-[0.85rem] text-primary-700 font-semibold mb-2">
                  {branchenResult.name} &mdash; Gender Pay Gap {branchenResult.gpg} %
                </p>
                <p className="font-serif text-[1.3rem] font-bold text-ink mb-1">
                  Equal Pay Day:{' '}
                  <span className="text-primary-700">{formatDateDE(branchenResult.date)}</span>
                </p>
                <p className="text-[1rem] text-ink-light">
                  <span className="font-bold text-primary-700">{branchenResult.days} Tage</span> unbezahlte Arbeit im Jahr
                </p>
              </div>
            )}

            {/* Branch Comparison Bar Chart */}
            <div className="mt-10">
              <h3 className="font-serif text-[1.1rem] font-bold mb-4">
                Vergleich: Unbezahlte Tage nach Branche
              </h3>
              <div className="space-y-2.5">
                {sortedBranchen.map((b) => {
                  const { days } = calcEqualPayDay(b.gpgProzent);
                  const widthPct = (b.gpgProzent / maxGPG) * 100;
                  const isSelected = b.slug === selectedBranche;
                  return (
                    <div key={b.slug} className="flex items-center gap-3">
                      <div className="w-[160px] shrink-0 text-[0.82rem] text-ink-light text-right truncate">
                        {b.name}
                      </div>
                      <div className="flex-1 bg-slate-200 rounded-sm h-6 relative overflow-hidden">
                        <div
                          className={`h-full rounded-sm transition-all duration-500 ${
                            isSelected ? 'bg-primary-600' : 'bg-primary-300'
                          }`}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                      <div className={`w-[72px] shrink-0 text-[0.82rem] font-semibold ${
                        isSelected ? 'text-primary-700' : 'text-ink-muted'
                      }`}>
                        {days} Tage
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-[50px] px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] text-center">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">
              Teilen
            </div>
            <h2 className="font-serif text-[1.3rem] font-bold mb-4">
              Auf den Gender Pay Gap aufmerksam machen
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#0A66C2] text-white rounded-sm text-[0.88rem] font-semibold no-underline transition-all hover:opacity-90"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#25D366] text-white rounded-sm text-[0.88rem] font-semibold no-underline transition-all hover:opacity-90"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-[#1DA1F2] text-white rounded-sm text-[0.88rem] font-semibold no-underline transition-all hover:opacity-90"
              >
                X / Twitter
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent('Equal Pay Day — ' + nationalResult.days + ' Tage unbezahlte Arbeit')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`}
                className="inline-flex items-center gap-2 py-2.5 px-5 bg-ink text-white rounded-sm text-[0.88rem] font-semibold no-underline transition-all hover:opacity-90"
              >
                E-Mail
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-primary-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Equal Pay Day
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-primary-700 text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Verdacht auf Gehaltsungleichheit? Prüfen Sie Ihr Auskunftsrecht.
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Ab Juni 2026 können Sie von Ihrem Arbeitgeber Auskunft über Vergleichsgehälter
            verlangen. Finden Sie heraus, ob Sie berechtigt sind.
          </p>
          <Link
            href="/auskunftsrecht-checker"
            className="inline-block py-3.5 px-8 bg-white text-primary-700 border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-primary-50 hover:-translate-y-0.5"
          >
            Auskunftsrecht nutzen &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-[40px] px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <p className="text-[0.75rem] text-ink-muted leading-relaxed">
              <strong>Hinweis:</strong> Die Berechnungen basieren auf dem unbereinigten Gender Pay Gap
              (Statistisches Bundesamt). Der Equal Pay Day ist ein symbolisches Datum und keine exakte
              Berechnung individueller Gehaltsunterschiede. Dieses Tool dient der Information und ersetzt
              keine anwaltliche Beratung. Für eine verbindliche Einschätzung Ihres Falls wenden Sie sich
              an einen{' '}
              <Link href="/kontakt" className="text-primary-700 no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
