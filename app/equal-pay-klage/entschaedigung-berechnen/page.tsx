'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Wie berechnet sich die Nachzahlung bei Lohndiskriminierung?',
    a: 'Die Nachzahlung umfasst die Gehaltsdifferenz für bis zu 3 Jahre rückwirkend (Art. 21 EU-RL 2023/970). Berechnet wird die monatliche Differenz multipliziert mit 13 Monatsgehältern (inkl. Urlaubsgeld) und der Anzahl der Jahre. Die reguläre Verjährungsfrist beträgt 3 Jahre nach § 195 BGB.',
  },
  {
    q: 'Was ist immaterieller Schadensersatz bei Entgeltdiskriminierung?',
    a: 'Neben der reinen Gehaltsnachzahlung steht Ihnen nach § 15 Abs. 2 AGG eine immaterielle Entschädigung für die erlittene Diskriminierung zu. Die Höhe richtet sich nach der Schwere und Dauer der Diskriminierung. Bei Equal-Pay-Fällen liegt sie typischerweise zwischen 1.000 und 6.000 Euro.',
  },
  {
    q: 'Bekomme ich auch Zinsen auf die Nachzahlung?',
    a: 'Ja. Nach § 288 BGB stehen Ihnen Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz zu. Die Zinsen laufen ab dem Zeitpunkt, zu dem die jeweilige Gehaltszahlung fällig war. Bei mehrjährigen Rückforderungen summieren sich die Zinsen erheblich.',
  },
];

export default function EntschaedigungBerechnenPage() {
  const [meins, setMeins] = useState('');
  const [vergleichInput, setVergleichInput] = useState('');
  const [unbekannt, setUnbekannt] = useState(false);
  const [jahre, setJahre] = useState('1');
  const [betriebszugehoerigkeit, setBetriebszugehoerigkeit] = useState('');
  const [result, setResult] = useState<{
    nachzahlung: number;
    zinsen: number;
    immateriell: number;
    gesamt: number;
    monatsDiff: number;
  } | null>(null);

  function calculate() {
    const meinGehalt = parseFloat(meins) || 0;
    if (meinGehalt <= 0) return;

    const vergleich = unbekannt
      ? Math.round(meinGehalt * 1.1)
      : parseFloat(vergleichInput) || 0;
    if (vergleich <= meinGehalt) return;

    const jahreVal = Math.min(parseInt(jahre, 10) || 1, 3);

    const monatsDiff = vergleich - meinGehalt;
    const jaehrlicheDiff = monatsDiff * 13; // inkl. Urlaubsgeld
    const nachzahlung = jaehrlicheDiff * Math.min(jahreVal, 3);
    const zinsen = nachzahlung * 0.05 * (jahreVal / 2);
    const immateriell = monatsDiff > 500 ? 5000 : monatsDiff > 200 ? 2500 : 1000;
    const gesamt = nachzahlung + zinsen + immateriell;

    setResult({ nachzahlung, zinsen, immateriell, gesamt, monatsDiff });
  }

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/equal-pay-klage/entschaedigung-berechnen/`}
        pageTitle="Entschädigung bei Lohndiskriminierung berechnen — Simulator"
        pageDescription="Berechnen Sie Ihre mögliche Entschädigung bei Entgeltdiskriminierung. Nachzahlung, Zinsen, immaterieller Schadensersatz — konkret in Euro."
        pageType="WebApplication"
        appName="Entschädigungs-Simulator bei Lohndiskriminierung"
        isBasedOn={[
          {
            name: 'EU-Entgelttransparenz-Richtlinie 2023/970 Art. 21',
            url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023L0970',
          },
          {
            name: 'AGG § 15 – Entschädigung und Schadensersatz',
            url: 'https://www.gesetze-im-internet.de/agg/__15.html',
          },
        ]}
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          { name: 'Equal-Pay-Klage', url: `${SEO_CONFIG.baseUrl}/equal-pay-klage/` },
          { name: 'Entschädigung berechnen', url: `${SEO_CONFIG.baseUrl}/equal-pay-klage/entschaedigung-berechnen/` },
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
      <div className="bg-secondary-50 pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[110px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-secondary no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitnehmer" className="text-secondary no-underline hover:underline">Arbeitnehmer</Link>
            <span className="mx-2">/</span>
            <Link href="/equal-pay-klage" className="text-secondary no-underline hover:underline">Equal-Pay-Klage</Link>
            <span className="mx-2">/</span>
            <span>Entschädigung berechnen</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Arbeitnehmer &middot; Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Entschädigung bei Lohndiskriminierung berechnen
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie Ihre mögliche Entschädigung bei Entgeltdiskriminierung &mdash;
            Nachzahlung, Verzugszinsen und immaterieller Schadensersatz, konkret in Euro.
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Entschädigung bei Lohndiskriminierung</strong> setzt sich aus drei Komponenten zusammen:
              der <strong>Gehaltsnachzahlung</strong> für bis zu 3 Jahre (Art. 21 EU-RL 2023/970),
              <strong> Verzugszinsen</strong> nach &sect; 288 BGB und
              <strong> immateriellem Schadensersatz</strong> nach &sect; 15 Abs. 2 AGG.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-secondary-50 border border-secondary/20 rounded p-8">
              <h2 className="font-serif text-[1.2rem] font-bold mb-5">Ihre Angaben</h2>
              <div className="space-y-5">
                {/* Mein Bruttogehalt */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Mein Bruttogehalt (&euro;/Monat)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={meins}
                    onChange={(e) => setMeins(e.target.value)}
                    placeholder="z. B. 3.500"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                {/* Vergleichsgehalt */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Gehalt der Vergleichsperson (&euro;/Monat)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={vergleichInput}
                    onChange={(e) => setVergleichInput(e.target.value)}
                    placeholder="z. B. 4.200"
                    disabled={unbekannt}
                    className={`w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] placeholder:text-ink-muted ${
                      unbekannt ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                  <label className="flex items-center gap-2 mt-2 text-[0.82rem] text-ink-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={unbekannt}
                      onChange={(e) => setUnbekannt(e.target.checked)}
                      className="accent-secondary"
                    />
                    Ich kenne es nicht (Schätzung: 110 % meines Gehalts)
                  </label>
                </div>

                {/* Dauer der Differenz */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Seit wann besteht die Differenz?
                  </label>
                  <select
                    value={jahre}
                    onChange={(e) => setJahre(e.target.value)}
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]"
                  >
                    <option value="1">1 Jahr</option>
                    <option value="2">2 Jahre</option>
                    <option value="3">3 Jahre (Verjährungsgrenze)</option>
                  </select>
                  <p className="text-[0.78rem] text-ink-muted mt-1">
                    Max. 3 Jahre rückwirkend (Verjährung nach &sect; 195 BGB)
                  </p>
                </div>

                {/* Betriebszugehörigkeit */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Betriebszugehörigkeit (Jahre)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={betriebszugehoerigkeit}
                    onChange={(e) => setBetriebszugehoerigkeit(e.target.value)}
                    placeholder="z. B. 5"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-3.5 bg-secondary-700 text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 hover:bg-secondary-800 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]"
                >
                  Entschädigung berechnen
                </button>
              </div>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und ersetzt keine anwaltliche Beratung. Die tatsächliche Entschädigung hängt von den konkreten Umständen Ihres Falls ab.
              </p>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 ergebnis-box">
                {/* Hauptergebnis */}
                <div className="rounded-sm border-2 border-secondary bg-secondary-50 p-6 text-center mb-6">
                  <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-2 text-ink-muted">
                    Mögliche Entschädigung
                  </div>
                  <div className="font-serif text-[2.4rem] font-bold text-secondary-700 mb-2">
                    ca. {fmt(result.gesamt)} &euro;
                  </div>
                  <div className="text-[0.85rem] text-ink-muted">
                    bei {fmt(result.monatsDiff)} &euro; monatlicher Gehaltsdifferenz
                  </div>
                </div>

                {/* Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white border border-border rounded p-5 text-center">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                      Nachzahlung
                    </div>
                    <div className="font-serif text-[1.4rem] font-bold text-ink">
                      {fmt(result.nachzahlung)} &euro;
                    </div>
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      bis 3 Jahre rückwirkend
                    </div>
                  </div>
                  <div className="bg-white border border-border rounded p-5 text-center">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                      Verzugszinsen
                    </div>
                    <div className="font-serif text-[1.4rem] font-bold text-ink">
                      {fmt(result.zinsen)} &euro;
                    </div>
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      5 % p.a. nach &sect; 288 BGB
                    </div>
                  </div>
                  <div className="bg-white border border-border rounded p-5 text-center">
                    <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                      Immat. Schadensersatz
                    </div>
                    <div className="font-serif text-[1.4rem] font-bold text-ink">
                      {fmt(result.immateriell)} &euro;
                    </div>
                    <div className="text-[0.78rem] text-ink-muted mt-1">
                      &sect; 15 Abs. 2 AGG
                    </div>
                  </div>
                </div>

                {/* Rechtsgrundlage Badge */}
                <div className="bg-secondary-50 border border-secondary/30 rounded-sm px-4 py-3 mb-8 text-[0.82rem] text-secondary-700 inline-block">
                  Grundlage: Art. 21 EU-RL 2023/970 + BAG Az. 8 AZR 300/24
                </div>

                {/* CTA */}
                <div className="mt-4 py-5 px-6 bg-secondary-50 rounded-sm border-l-[3px] border-secondary">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>Möchten Sie wissen, wie hoch Ihre Erfolgsaussichten sind?</strong>
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-block py-3 px-6 bg-secondary-700 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-secondary-800"
                  >
                    Klage-Chancen prüfen lassen &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Erklärung */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie setzt sich die Entschädigung zusammen?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Bei erfolgreicher Equal-Pay-Klage erhalten Sie drei Entschädigungskomponenten.
              Die <strong>Gehaltsnachzahlung</strong> umfasst die Differenz für bis zu 3 Jahre
              rückwirkend (Art. 21 EU-RL 2023/970), berechnet mit 13 Monatsgehältern (inkl. Urlaubsgeld).
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Auf die Nachzahlung fallen <strong>Verzugszinsen</strong> an (5 Prozentpunkte über
              Basiszinssatz, &sect; 288 BGB). Zusätzlich steht Ihnen eine <strong>immaterielle
              Entschädigung</strong> nach &sect; 15 Abs. 2 AGG zu &mdash; ein Ausgleich für die
              erlittene Diskriminierung. Das BAG hat mit Az. 8 AZR 300/24 bestätigt, dass bereits
              ein Paarvergleich die Vermutung der Diskriminierung begründet.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              <strong>Wichtig:</strong> Der Simulator gibt eine konservative Schätzung. In der
              Praxis können Zulagen, Boni und betriebliche Altersvorsorge die Gesamtforderung
              erheblich steigern.
            </p>
          </div>
        </div>
      </section>

      {/* Quellenblock */}
      <section className="py-10 px-8 bg-white border-t border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a href="https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023L0970" target="_blank" rel="noopener noreferrer" className="text-secondary no-underline hover:underline">
                  EU-Richtlinie 2023/970 Art. 21 &mdash; Entschädigung bei Entgeltdiskriminierung &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/agg/__15.html" target="_blank" rel="noopener noreferrer" className="text-secondary no-underline hover:underline">
                  &sect; 15 AGG &mdash; Entschädigung und Schadensersatz &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/bgb/__288.html" target="_blank" rel="noopener noreferrer" className="text-secondary no-underline hover:underline">
                  &sect; 288 BGB &mdash; Verzugszinsen &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-10 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zur Entschädigung bei Lohndiskriminierung
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-secondary-700 text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-bold mb-4">
            Kostenlose Ersteinschätzung &mdash; Entschädigung prüfen lassen
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Wir prüfen Ihre Erfolgsaussichten und berechnen Ihren konkreten Entschädigungsanspruch.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-secondary-700 hover:bg-secondary-50 hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
