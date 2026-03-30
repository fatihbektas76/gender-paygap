'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';
import { branchen } from '@/data/branchen';
import { gehaltBenchmarks } from '@/data/gehalt-benchmark';

const faqs = [
  {
    q: 'Woher stammen die Gehaltsdaten im Rechner?',
    a: 'Die Mediandaten basieren auf Auswertungen des Statistischen Bundesamtes (Destatis) zu Bruttojahresverdiensten nach Branche und Geschlecht, Stand Dezember 2025. Es handelt sich um Medianwerte — die Hälfte der Beschäftigten verdient mehr, die andere Hälfte weniger.',
  },
  {
    q: 'Was bedeutet es, wenn mein Gehalt unter dem Branchenmedian liegt?',
    a: 'Ein Gehalt unterhalb des Branchenmedians ist nicht automatisch ein Zeichen für Diskriminierung. Faktoren wie Berufserfahrung, Qualifikation, Region und Unternehmensgröße spielen eine Rolle. Liegt Ihr Gehalt jedoch deutlich unter dem Median für Ihr Geschlecht, kann dies ein Indiz für strukturelle Benachteiligung sein — insbesondere wenn vergleichbare Kolleg:innen des anderen Geschlechts mehr verdienen.',
  },
  {
    q: 'Was kann ich tun, wenn der Vergleich eine Gehaltslücke zeigt?',
    a: 'Nutzen Sie Ihr Auskunftsrecht nach Art. 7 EU-RL 2023/970 (Entgelttransparenz-Richtlinie). In Unternehmen ab 100 Beschäftigten können Sie die Medianvergütung für Ihre Vergleichsgruppe erfragen. Ergibt sich eine nicht erklärbare Differenz, besteht möglicherweise ein Anspruch auf Gehaltsanpassung und Nachzahlung.',
  },
];

export default function GenderPayGapRechnerPage() {
  const [gehalt, setGehalt] = useState(55000);
  const [brancheSlug, setBrancheSlug] = useState(branchen[0].slug);
  const [geschlecht, setGeschlecht] = useState<'frau' | 'mann' | 'divers'>('frau');
  const [result, setResult] = useState<{
    meinGehalt: number;
    medianFrauen: number;
    medianMaenner: number;
    brancheName: string;
    diffProzent: number;
    unterMedianFrauen: boolean;
    isFrau: boolean;
  } | null>(null);

  function calculate() {
    const benchmark = gehaltBenchmarks[brancheSlug];
    if (!benchmark) return;

    const branche = branchen.find((b) => b.slug === brancheSlug);
    if (!branche) return;

    const median = geschlecht === 'mann' ? benchmark.maenner : benchmark.frauen;
    const diffProzent = ((gehalt - median) / median) * 100;

    setResult({
      meinGehalt: gehalt,
      medianFrauen: benchmark.frauen,
      medianMaenner: benchmark.maenner,
      brancheName: branche.name,
      diffProzent: Math.round(diffProzent * 10) / 10,
      unterMedianFrauen: gehalt < benchmark.frauen,
      isFrau: geschlecht === 'frau',
    });
  }

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const maxBar = result
    ? Math.max(result.meinGehalt, result.medianFrauen, result.medianMaenner)
    : 1;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/gender-pay-gap-rechner/`}
        pageTitle="Gender Pay Gap Rechner — Gehalt vergleichen"
        pageDescription="Vergleichen Sie Ihr Gehalt mit dem Branchenmedian nach Geschlecht. Daten: Statistisches Bundesamt 2025. Kostenloser Gehaltsvergleich."
        pageType="WebApplication"
        appName="Gender Pay Gap Rechner"
        isBasedOn={[
          {
            name: 'Statistisches Bundesamt – Gender Pay Gap',
            url: 'https://www.destatis.de/DE/Themen/Arbeit/Verdienste/Verdienste-GenderPayGap/_inhalt.html',
          },
        ]}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Gender Pay Gap', url: `${SEO_CONFIG.baseUrl}/gender-pay-gap/` },
          { name: 'Rechner', url: `${SEO_CONFIG.baseUrl}/gender-pay-gap-rechner/` },
        ]}
        speakableSelectors={['.ergebnis-box']}
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

      {/* Header */}
      <div className="bg-cream pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[110px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/gender-pay-gap" className="text-gold no-underline hover:underline">Gender Pay Gap</Link>
            <span className="mx-2">/</span>
            <span>Rechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Gender Pay Gap Rechner &mdash; Gehalt im Branchenvergleich
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Vergleichen Sie Ihr Bruttogehalt mit dem Branchenmedian nach Geschlecht.
            Basierend auf Daten des Statistischen Bundesamtes (Destatis).
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              Der <strong>Gender Pay Gap Rechner</strong> vergleicht Ihr Jahresbruttogehalt mit dem
              <strong> Branchenmedian</strong> für Frauen und Männer. Sie sehen auf einen Blick,
              ob Ihr Gehalt über oder unter dem Durchschnitt liegt &mdash; und wie groß die
              geschlechtsspezifische Gehaltslücke in Ihrer Branche ist.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <h2 className="font-serif text-[1.2rem] font-bold mb-5">Ihre Angaben</h2>
              <div className="space-y-5">
                {/* Bruttogehalt Slider */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Mein Bruttogehalt (&euro;/Jahr)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="20000"
                      max="150000"
                      step="1000"
                      value={gehalt}
                      onChange={(e) => setGehalt(parseInt(e.target.value, 10))}
                      className="flex-1 accent-gold"
                    />
                    <span className="text-[1rem] font-semibold text-ink min-w-[90px] text-right">
                      {fmt(gehalt)} &euro;
                    </span>
                  </div>
                  <div className="flex justify-between text-[0.72rem] text-ink-muted mt-1">
                    <span>20.000 &euro;</span>
                    <span>150.000 &euro;</span>
                  </div>
                </div>

                {/* Branche */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Branche
                  </label>
                  <select
                    value={brancheSlug}
                    onChange={(e) => setBrancheSlug(e.target.value)}
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    {branchen.map((b) => (
                      <option key={b.slug} value={b.slug}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Geschlecht */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Geschlecht
                  </label>
                  <select
                    value={geschlecht}
                    onChange={(e) => setGeschlecht(e.target.value as 'frau' | 'mann' | 'divers')}
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(166,139,75,0.1)]"
                  >
                    <option value="frau">Frau</option>
                    <option value="mann">Mann</option>
                    <option value="divers">Divers</option>
                  </select>
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-3.5 bg-gold text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-[#7A6530] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(166,139,75,0.25)]"
                >
                  Gehalt vergleichen
                </button>
              </div>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                Alle Berechnungen sind Schätzungen basierend auf Destatis-Mediandaten und ersetzen keine anwaltliche Beratung.
              </p>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 ergebnis-box">
                {/* Hauptergebnis */}
                <div className="rounded-sm border-2 border-gold bg-cream p-6 text-center mb-6">
                  <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-2 text-ink-muted">
                    Vergleich zum Median in {result.brancheName}
                  </div>
                  <div className="font-serif text-[2rem] font-bold text-gold mb-2">
                    {result.diffProzent > 0 ? '+' : ''}{result.diffProzent} %
                  </div>
                  <div className="text-[0.9rem] text-ink-muted">
                    Sie verdienen{' '}
                    <strong>
                      {result.diffProzent > 0
                        ? `${result.diffProzent} % mehr`
                        : result.diffProzent < 0
                          ? `${Math.abs(result.diffProzent)} % weniger`
                          : 'genau so viel'}
                    </strong>{' '}
                    als der Median für {geschlecht === 'mann' ? 'Männer' : 'Frauen'} in {result.brancheName}.
                  </div>
                </div>

                {/* Warning */}
                {result.unterMedianFrauen && result.isFrau && (
                  <div className="bg-amber-50 border border-amber-300 rounded-sm p-4 mb-6 text-[0.9rem] text-amber-900 leading-relaxed">
                    <strong>Achtung:</strong> Ihr Gehalt liegt unter dem Branchenmedian für Frauen &mdash;
                    das könnte auf Lohndiskriminierung hindeuten. Prüfen Sie Ihr{' '}
                    <Link href="/auskunftsrecht-checker" className="text-amber-900 underline hover:no-underline">
                      Auskunftsrecht
                    </Link>.
                  </div>
                )}

                {/* Visual Bars */}
                <div className="space-y-4 mb-6">
                  {/* Mein Gehalt */}
                  <div>
                    <div className="flex justify-between text-[0.82rem] mb-1">
                      <span className="font-semibold text-ink">Mein Gehalt</span>
                      <span className="text-ink-muted">{fmt(result.meinGehalt)} &euro;</span>
                    </div>
                    <div className="h-8 bg-cream-dark rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-gold rounded-sm transition-all duration-500"
                        style={{ width: `${(result.meinGehalt / maxBar) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Median Frauen */}
                  <div>
                    <div className="flex justify-between text-[0.82rem] mb-1">
                      <span className="font-semibold text-ink">Median Frauen</span>
                      <span className="text-ink-muted">{fmt(result.medianFrauen)} &euro;</span>
                    </div>
                    <div className="h-8 bg-cream-dark rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-pink-500 rounded-sm transition-all duration-500"
                        style={{ width: `${(result.medianFrauen / maxBar) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Median Männer */}
                  <div>
                    <div className="flex justify-between text-[0.82rem] mb-1">
                      <span className="font-semibold text-ink">Median Männer</span>
                      <span className="text-ink-muted">{fmt(result.medianMaenner)} &euro;</span>
                    </div>
                    <div className="h-8 bg-cream-dark rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-sm transition-all duration-500"
                        style={{ width: `${(result.medianMaenner / maxBar) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Data badge */}
                <div className="bg-cream border border-border rounded-sm px-4 py-3 mb-8 text-[0.82rem] text-ink-muted inline-block">
                  Daten: Statistisches Bundesamt, Dezember 2025
                </div>

                {/* CTA */}
                <div className="mt-4 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-gold">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Gehaltslücke entdeckt? Nutzen Sie Ihr Auskunftsrecht.</strong>
                  </p>
                  <Link
                    href="/auskunftsrecht-checker"
                    className="inline-block py-3 px-6 bg-gold text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-[#7A6530]"
                  >
                    Auskunftsrecht nutzen &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Erklärung */}
      <section className="py-[70px] px-8 bg-cream max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was zeigt der Gender Pay Gap Rechner?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Der Rechner vergleicht Ihr Jahresbruttogehalt mit dem <strong>Branchenmedian</strong> nach
              Geschlecht. Der Median teilt alle Gehälter in zwei Hälften &mdash; 50 % verdienen mehr,
              50 % weniger. Anders als der Durchschnitt wird der Median nicht durch einzelne Extremwerte verzerrt.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Der <strong>unbereinigte Gender Pay Gap</strong> in Deutschland beträgt 16 %, der
              <strong> bereinigte Gap</strong> rund 6 % (Destatis, Dezember 2025). Der bereinigte Gap
              berücksichtigt Faktoren wie Branche, Qualifikation und Arbeitszeit &mdash; und zeigt die
              Gehaltslücke bei vergleichbarer Tätigkeit.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Zeigt der Vergleich eine deutliche Abweichung, kann das Auskunftsrecht nach
              Art. 7 EU-RL 2023/970 Klarheit schaffen. Ab 2026 müssen Unternehmen ab 100 Beschäftigten
              die Medianvergütung nach Geschlecht offenlegen.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Gehaltsvergleich
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-gold text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
            Gehaltslücke schließen &mdash; Auskunftsrecht nutzen
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Prüfen Sie kostenlos, ob Sie einen Auskunftsanspruch haben.
            Die Entgelttransparenz-Richtlinie stärkt Ihre Position.
          </p>
          <Link
            href="/auskunftsrecht-checker"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-gold hover:bg-cream hover:-translate-y-0.5"
          >
            Auskunftsrecht prüfen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
