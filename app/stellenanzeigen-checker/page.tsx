'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

interface CheckItem {
  id: string;
  label: string;
  pflicht: string;
  erfuellt: boolean;
  kommentar: string;
}

interface AnalyseResult {
  checks: CheckItem[];
  gesamtbewertung: 'gruen' | 'gelb' | 'rot';
  zusammenfassung: string;
}

const faqs = [
  {
    q: 'Was muss ab Juni 2026 in Stellenanzeigen stehen?',
    a: 'Ab dem 7. Juni 2026 müssen alle Stellenanzeigen in der EU eine Gehaltsspanne oder ein Einstiegsgehalt enthalten (Art. 5 Abs. 1 EU-RL 2023/970). Die Angabe muss vor dem Vorstellungsgespräch erfolgen und darf nicht erst auf Nachfrage mitgeteilt werden. Zusätzlich müssen die Kriterien für die Gehaltsfestlegung transparent und geschlechtsneutral sein.',
  },
  {
    q: 'Welche Formulierungen in Stellenanzeigen sind diskriminierend?',
    a: 'Formulierungen wie "junges Team", "Muttersprachler", "belastbar" oder geschlechtsspezifische Berufsbezeichnungen ohne Genderstern können als mittelbar diskriminierend gelten. Die EU-Richtlinie verlangt geschlechtsneutrale Stellenausschreibungen. Auch überzogene Anforderungen an Berufserfahrung oder Verfügbarkeit können Frauen benachteiligen.',
  },
  {
    q: 'Welche Strafen drohen bei nicht-konformen Stellenanzeigen?',
    a: 'Die EU-Entgelttransparenzrichtlinie sieht "wirksame, verhältnismäßige und abschreckende" Sanktionen vor (Art. 23). Die konkrete Höhe legt der nationale Gesetzgeber fest. Zusätzlich können Bewerber Schadensersatz und Entschädigung nach dem AGG verlangen, wenn eine Stellenanzeige diskriminierend formuliert ist.',
  },
];

const ampelConfig = {
  gruen: {
    label: 'EU-konform',
    bgClass: 'bg-green-bg',
    borderClass: 'border-green',
    badgeClass: 'bg-green text-white',
  },
  gelb: {
    label: 'Nachbesserung empfohlen',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-500 text-white',
  },
  rot: {
    label: 'Nicht konform',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-400',
    badgeClass: 'bg-red-600 text-white',
  },
};

export default function StellenanzeigenCheckerPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (text.length < 30) {
      setError('Bitte fügen Sie den vollständigen Text einer Stellenanzeige ein (mindestens 30 Zeichen).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/stellenanzeigen-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || 'Analyse konnte nicht durchgeführt werden.');
        return;
      }

      setResult(data);
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  }

  const config = result ? ampelConfig[result.gesamtbewertung] : null;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/stellenanzeigen-checker/`}
        pageTitle="Stellenanzeigen-Checker — Ist Ihre Stellenanzeige EU-konform?"
        pageDescription="Prüfen Sie Ihre Stellenanzeige auf Konformität mit der EU-Entgelttransparenzrichtlinie. KI-gestützte Analyse in Sekunden."
        pageType="WebApplication"
        appName="Stellenanzeigen-Checker"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitgeber', url: `${SEO_CONFIG.baseUrl}/arbeitgeber/` },
          { name: 'Stellenanzeigen-Checker', url: `${SEO_CONFIG.baseUrl}/stellenanzeigen-checker/` },
        ]}
        isBasedOn={[
          {
            name: 'EU-Richtlinie 2023/970 zur Entgelttransparenz',
            url: 'https://eur-lex.europa.eu/eli/dir/2023/970/oj',
          },
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
      <div className="bg-cream-dark pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[100px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-blue no-underline hover:underline">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitgeber" className="text-blue no-underline hover:underline">
              Arbeitgeber
            </Link>
            <span className="mx-2">/</span>
            <span>Stellenanzeigen-Checker</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Stellenanzeigen-Checker &mdash; Ist Ihre Stellenanzeige EU-konform?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Prüfen Sie Ihre Stellenanzeige auf Konformität mit der EU-Entgelttransparenzrichtlinie
            2023/970. KI-gestützte Analyse in Sekunden.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-blue" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              4 Kriterien
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-blue" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              KI-gestützt
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-blue" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Sofort-Ergebnis
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Stellenanzeigen prüfen:</strong> Ab <strong>Juni 2026</strong> müssen alle
              Stellenanzeigen in der EU eine <strong>Gehaltsspanne</strong> enthalten (Art. 5 EU-RL
              2023/970). Zusätzlich müssen Formulierungen <strong>geschlechtsneutral</strong> sein und
              die <strong>Entgeltkriterien transparent</strong> dargestellt werden. Dieser Checker
              prüft Ihre Stellenanzeige anhand der vier zentralen Kriterien der Richtlinie.
            </p>
          </div>
        </div>
      </section>

      {/* Checker */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[700px]">
            <h2 className="font-serif text-[1.2rem] font-bold mb-2">
              Stellenanzeige prüfen
            </h2>
            <p className="text-[0.88rem] text-ink-muted mb-5">
              Fügen Sie den vollständigen Text Ihrer Stellenanzeige ein. Die KI analysiert ihn
              anhand von 4 Kriterien der EU-Entgelttransparenzrichtlinie.
            </p>

            <div className="bg-slate-50 border border-border-light rounded p-6 sm:p-8">
              <label
                htmlFor="stellenanzeige-text"
                className="block text-[0.88rem] font-semibold text-ink mb-2"
              >
                Text der Stellenanzeige
              </label>
              <textarea
                id="stellenanzeige-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Fügen Sie den Text Ihrer Stellenanzeige ein..."
                rows={12}
                maxLength={5000}
                className="w-full p-4 border border-border rounded-sm text-[0.92rem] text-ink leading-relaxed font-sans resize-y bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[0.78rem] text-ink-muted">
                  {text.length} / 5.000 Zeichen
                </span>
                {text.length > 0 && text.length < 30 && (
                  <span className="text-[0.78rem] text-amber-600">
                    Mindestens 30 Zeichen erforderlich
                  </span>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || text.length < 30}
                className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-5 ${
                  loading || text.length < 30
                    ? 'bg-slate-200 text-ink-muted cursor-not-allowed'
                    : 'bg-blue text-white hover:bg-blue hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyse läuft...
                  </span>
                ) : (
                  'Stellenanzeige prüfen'
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-sm text-[0.88rem] text-red-700">
                {error}
              </div>
            )}

            {/* Result */}
            {result && config && (
              <div className="ergebnis-box mt-8">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Analyse-Ergebnis</h2>

                {/* Ampel Badge */}
                <div
                  className={`rounded-sm border-2 p-6 text-center mb-6 ${config.borderClass} ${config.bgClass}`}
                >
                  <div
                    className={`inline-block py-2 px-5 rounded-sm text-[0.9rem] font-semibold ${config.badgeClass}`}
                  >
                    {config.label}
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-6">
                  {result.checks.map((check) => (
                    <div
                      key={check.id}
                      className="flex gap-3 p-4 bg-slate-50 border border-border-light rounded-sm"
                    >
                      <span
                        className={`text-[1.3rem] font-bold shrink-0 mt-0.5 ${
                          check.erfuellt ? 'text-green' : 'text-red-600'
                        }`}
                      >
                        {check.erfuellt ? '\u2713' : '\u2717'}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[0.92rem] font-semibold text-ink">
                            {check.label}
                          </span>
                          <span className="text-[0.72rem] font-bold tracking-wider uppercase py-0.5 px-2 rounded-sm bg-cream-dark text-blue">
                            Pflicht: {check.pflicht}
                          </span>
                        </div>
                        <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                          {check.kommentar}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zusammenfassung */}
                <div className="p-5 bg-white border border-border-light rounded-sm mb-6">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                    Zusammenfassung
                  </div>
                  <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                    {result.zusammenfassung}
                  </p>
                </div>

                {/* CTA */}
                <div className="py-5 px-6 bg-cream-dark rounded-sm border-l-[3px] border-blue">
                  <p className="text-[0.95rem] text-ink mb-3">
                    <strong>
                      Alle Stellenanzeigen auf einmal prüfen lassen?
                    </strong>
                  </p>
                  <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">
                    Wir prüfen Ihr gesamtes Stellenanzeigen-Portfolio auf EU-Konformität und
                    erstellen ein rechtssicheres Template für künftige Ausschreibungen.
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-block py-3 px-6 bg-blue text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-blue hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]"
                  >
                    Stellenanzeigen-Paket prüfen lassen &rarr;
                  </Link>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setResult(null);
                    setText('');
                  }}
                  className="mt-5 text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none w-full text-center font-sans"
                >
                  Neue Stellenanzeige prüfen
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[0.75rem] text-ink-muted mt-6 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
              Erstorientierung und ersetzt keine anwaltliche Beratung. Die KI-Analyse kann
              Fehler enthalten. Für eine verbindliche Einschätzung wenden Sie sich bitte an
              einen{' '}
              <Link href="/kontakt" className="text-blue no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zu Stellenanzeigen und Entgelttransparenz
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-blue text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Stellenanzeigen rechtssicher gestalten &mdash; bevor die Pflicht greift
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Wir prüfen Ihre Stellenanzeigen, erstellen konforme Templates und schulen
            Ihr HR-Team zur EU-Entgelttransparenzrichtlinie.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer bottom */}
      <section className="py-6 px-8 bg-slate-50 border-t border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <p className="text-[0.78rem] text-ink-muted leading-relaxed max-w-[740px]">
            <strong>Rechtlicher Hinweis:</strong> Dieser Stellenanzeigen-Checker dient der
            unverbindlichen Erstorientierung. Die KI-gestützte Analyse stellt keine
            Rechtsberatung dar und ersetzt keine individuelle anwaltliche Prüfung. Alle
            Angaben basieren auf der EU-Entgelttransparenzrichtlinie 2023/970 und dem
            aktuellen Stand der deutschen Umsetzungsgesetzgebung.
          </p>
        </div>
      </section>
    </main>
  );
}
