'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Was ist eine Vergleichsgruppe im Sinne der EU-Entgelttransparenzrichtlinie?',
    a: 'Eine Vergleichsgruppe umfasst alle Beschäftigten, die gleiche oder gleichwertige Arbeit verrichten. Die Gleichwertigkeit wird nach Art. 4 EU-RL 2023/970 anhand von vier Kriterien bestimmt: Kompetenz, Verantwortung, Belastungen und Arbeitsbedingungen. Es kommt auf die tatsächlichen Aufgaben an, nicht auf die Stellenbezeichnung.',
  },
  {
    q: 'Warum reicht ein einzelner Paarvergleich aus?',
    a: 'Das Bundesarbeitsgericht hat in seinem Urteil 8 AZR 300/24 entschieden, dass bereits ein Vergleich mit einer einzigen Person des anderen Geschlechts ausreicht, um eine Diskriminierungsvermutung zu begründen. Der Arbeitgeber muss dann beweisen, dass der Gehaltsunterschied sachlich gerechtfertigt ist (Beweislastumkehr nach Art. 18 EU-RL).',
  },
  {
    q: 'Kann mein Arbeitgeber die Vergleichsgruppe anders definieren?',
    a: 'Der Arbeitgeber kann eine abweichende Vergleichsgruppe vorschlagen, muss aber nachweisen, dass die Kriterien aus Art. 4 EU-RL 2023/970 korrekt angewendet wurden. Geschlechtsspezifische Kriterien oder Kriterien, die ein Geschlecht systematisch benachteiligen, sind unzulässig. Im Streitfall entscheidet das Arbeitsgericht.',
  },
];

function parseResult(text: string): { section: string; content: string }[] {
  const sections: { section: string; content: string }[] = [];
  const labels = ['VERGLEICHSPOSITIONEN', 'BEGRÜNDUNG', 'KRITERIEN-ANALYSE', 'RECHTLICHE EINSCHÄTZUNG', 'HINWEIS'];

  const remaining = text;

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const nextLabel = labels[i + 1];
    const startIdx = remaining.indexOf(label);

    if (startIdx === -1) continue;

    const contentStart = remaining.indexOf(':', startIdx);
    if (contentStart === -1) continue;

    let contentEnd: number;
    if (nextLabel) {
      const nextIdx = remaining.indexOf(nextLabel, contentStart);
      contentEnd = nextIdx !== -1 ? nextIdx : remaining.length;
    } else {
      contentEnd = remaining.length;
    }

    const content = remaining.slice(contentStart + 1, contentEnd).trim();
    if (content) {
      sections.push({ section: label, content });
    }
  }

  return sections;
}

function getSectionIcon(section: string): string {
  switch (section) {
    case 'VERGLEICHSPOSITIONEN':
      return 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z';
    case 'BEGRÜNDUNG':
      return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    case 'KRITERIEN-ANALYSE':
      return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4';
    case 'RECHTLICHE EINSCHÄTZUNG':
      return 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3';
    case 'HINWEIS':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }
}

function getSectionTitle(section: string): string {
  switch (section) {
    case 'VERGLEICHSPOSITIONEN':
      return 'Vergleichspositionen';
    case 'BEGRÜNDUNG':
      return 'Begründung';
    case 'KRITERIEN-ANALYSE':
      return 'Kriterien-Analyse';
    case 'RECHTLICHE EINSCHÄTZUNG':
      return 'Rechtliche Einschätzung';
    case 'HINWEIS':
      return 'Hinweis';
    default:
      return section;
  }
}

export default function VergleichsgruppenFinderPage() {
  const [beschreibung, setBeschreibung] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (beschreibung.length < 20) {
      setError('Bitte beschreiben Sie Ihre Tätigkeit ausführlicher (mindestens 20 Zeichen).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/vergleichsgruppen/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ beschreibung }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
        return;
      }

      setResult(data.text);
    } catch {
      setError('Verbindungsfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setBeschreibung('');
    setResult(null);
    setError(null);
  }

  const parsedSections = result ? parseResult(result) : [];

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/vergleichsgruppen-finder/`}
        pageTitle="Vergleichsgruppen-Finder — Wer verdient das Gleiche wie Sie?"
        pageDescription="Finden Sie heraus, welche Positionen im Unternehmen als gleichwertig zu Ihrer Tätigkeit gelten. KI-gestützte Analyse nach Art. 4 EU-RL."
        pageType="WebApplication"
        appName="Vergleichsgruppen-Finder"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          { name: 'Vergleichsgruppen-Finder', url: `${SEO_CONFIG.baseUrl}/vergleichsgruppen-finder/` },
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
      <div className="bg-secondary-50 pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[100px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-secondary-700 no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitnehmer" className="text-secondary-700 no-underline hover:underline">Arbeitnehmer</Link>
            <span className="mx-2">/</span>
            <span>Vergleichsgruppen-Finder</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            KI-Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Vergleichsgruppen-Finder &mdash; Wer verdient das Gleiche wie Sie?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Beschreiben Sie Ihre Tätigkeit und finden Sie heraus, welche Positionen im
            Unternehmen als gleichwertig gelten &mdash; nach Art. 4 EU-RL 2023/970.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-secondary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              KI-gestützt
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-secondary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              4-Kriterien-Analyse
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-secondary-600" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kostenlos
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Vergleichsgruppen finden</strong> bedeutet: Sie ermitteln, welche Positionen
              im Unternehmen als <strong>gleichwertig</strong> zu Ihrer Tätigkeit gelten. Die EU-Richtlinie
              2023/970 definiert Gleichwertigkeit anhand von <strong>4 Kriterien</strong>: Kompetenz,
              Verantwortung, Belastungen und Arbeitsbedingungen. Das BAG bestätigt: Ein einzelner{' '}
              <strong>Paarvergleich</strong> reicht aus (Az. 8 AZR 300/24).
            </p>
          </div>
        </div>
      </section>

      {/* Vergleichsgruppen-Finder Tool */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[660px]">
            {!result ? (
              <div className="bg-secondary-50 border border-secondary/20 rounded p-8">
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  Beschreiben Sie Ihre Tätigkeit
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  Was tun Sie täglich? Welche Qualifikationen brauchen Sie? Wem berichten Sie?
                  Je detaillierter Ihre Beschreibung, desto genauer die Analyse.
                </p>

                {/* Textarea */}
                <textarea
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                  placeholder="z. B. Ich arbeite als Projektleiterin in der IT-Abteilung eines Konzerns mit 2.000 Mitarbeitern. Ich leite ein Team von 8 Entwicklern, berichte an den CTO und bin verantwortlich für Budget-Planung (ca. 1,5 Mio. Euro). Ich habe einen Master in Informatik und 10 Jahre Berufserfahrung..."
                  maxLength={3000}
                  rows={8}
                  className="w-full py-3 px-4 border border-secondary/30 rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none resize-y focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] placeholder:text-ink-muted"
                />
                <div className="flex justify-between items-center mt-1.5 mb-4">
                  <span className="text-[0.78rem] text-ink-muted">
                    {beschreibung.length}/3000 Zeichen
                  </span>
                  {beschreibung.length > 0 && beschreibung.length < 20 && (
                    <span className="text-[0.78rem] text-red-500">
                      Mindestens 20 Zeichen erforderlich
                    </span>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-4 py-3 px-4 bg-red-50 border border-red-200 rounded-sm text-[0.88rem] text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || beschreibung.length < 20}
                  className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all ${
                    loading || beschreibung.length < 20
                      ? 'bg-slate-200 text-ink-muted cursor-not-allowed'
                      : 'bg-secondary-600 text-white hover:bg-secondary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyse läuft...
                    </span>
                  ) : (
                    'Vergleichsgruppen finden'
                  )}
                </button>
              </div>
            ) : (
              <div className="ergebnis-box">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ihre Vergleichsgruppen-Analyse</h2>

                {/* Parsed sections */}
                {parsedSections.length > 0 ? (
                  <div className="space-y-4">
                    {parsedSections.map((s, i) => (
                      <div
                        key={i}
                        className={`rounded-sm border p-5 ${
                          s.section === 'HINWEIS'
                            ? 'bg-secondary-50 border-secondary/30'
                            : 'bg-white border-border'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            <svg className="text-secondary-600" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                              <path d={getSectionIcon(s.section)} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-serif text-[1rem] font-bold mb-2">
                              {getSectionTitle(s.section)}
                            </h3>
                            <div className="text-[0.9rem] text-ink-light leading-relaxed whitespace-pre-line">
                              {s.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Fallback: raw text */
                  <div className="bg-slate-50 border border-border-light rounded p-6">
                    <div className="text-[0.92rem] text-ink-light leading-relaxed whitespace-pre-line">
                      {result}
                    </div>
                  </div>
                )}

                {/* BAG Reference Card */}
                <div className="mt-6 py-5 px-6 bg-secondary-50 rounded-sm border-l-[3px] border-secondary">
                  <div className="flex items-start gap-3">
                    <svg className="text-secondary-700 shrink-0 mt-0.5" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <p className="text-[0.92rem] text-ink font-semibold mb-1">
                        BAG-Urteil 8 AZR 300/24
                      </p>
                      <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                        Das Bundesarbeitsgericht hat bestätigt: Ein einzelner Paarvergleich mit
                        einer Person des anderen Geschlechts reicht aus, um eine
                        Diskriminierungsvermutung zu begründen. Der Arbeitgeber muss dann
                        beweisen, dass der Gehaltsunterschied sachlich gerechtfertigt ist.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/kontakt"
                    className="block w-full py-3.5 bg-secondary-600 text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-secondary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]"
                  >
                    Klage-Chancen prüfen lassen &rarr;
                  </Link>
                  <Link
                    href="/auskunftsrecht-checker/schreiben-generator"
                    className="block w-full py-3.5 bg-white text-secondary-700 border-2 border-secondary-600 rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-secondary-50 hover:-translate-y-px"
                  >
                    Auskunftsschreiben erstellen &rarr;
                  </Link>
                </div>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  className="mt-5 text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none w-full text-center"
                >
                  Neue Analyse starten
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 py-4 px-5 bg-amber-50 border border-amber-200 rounded-sm">
              <p className="text-[0.82rem] text-ink-light leading-relaxed m-0">
                <strong>Hinweis:</strong> Keine anwaltliche Beratung &mdash; ersetzt nicht die persönliche
                Beratung durch einen Fachanwalt. Die KI-Analyse dient ausschließlich der unverbindlichen
                Erstorientierung. Für eine verbindliche Einschätzung wenden Sie sich an einen{' '}
                <Link href="/kontakt" className="text-secondary-700 no-underline hover:underline">
                  Fachanwalt für Arbeitsrecht
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Criteria Explanation */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              Die 4 Kriterien für gleichwertige Arbeit (Art. 4 EU-RL 2023/970)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="py-5 px-5 bg-white rounded-sm border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center mb-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1rem] font-bold mb-1">1. Kompetenz</h3>
                <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                  Ausbildung, Qualifikationen, Berufserfahrung und Fachkenntnisse,
                  die für die Tätigkeit erforderlich sind.
                </p>
              </div>
              <div className="py-5 px-5 bg-white rounded-sm border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center mb-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1rem] font-bold mb-1">2. Verantwortung</h3>
                <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                  Entscheidungsbefugnis, Personalverantwortung, Budgetverantwortung
                  und Haftung im Rahmen der Tätigkeit.
                </p>
              </div>
              <div className="py-5 px-5 bg-white rounded-sm border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center mb-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1rem] font-bold mb-1">3. Belastungen</h3>
                <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                  Physische, psychische und emotionale Anforderungen,
                  die mit der Tätigkeit verbunden sind.
                </p>
              </div>
              <div className="py-5 px-5 bg-white rounded-sm border border-border">
                <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-700 flex items-center justify-center mb-3">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-[1rem] font-bold mb-1">4. Arbeitsbedingungen</h3>
                <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                  Arbeitsumfeld, Arbeitszeiten, Schichtarbeit, Reisetätigkeit
                  und sonstige äußere Bedingungen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-secondary-700 text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Gleicher Lohn für gleichwertige Arbeit &mdash; wir setzen es durch
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihren Fall kostenlos und zeigt Ihnen,
            wie Sie Ihren Equal-Pay-Anspruch durchsetzen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block py-3.5 px-8 bg-white text-secondary-700 border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-secondary-50 hover:-translate-y-0.5"
          >
            Kostenlose Ersteinschätzung &rarr;
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Vergleichsgruppen-Finder
          </h2>
          <FaqAccordion items={faqs} />
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
                <a href="https://eur-lex.europa.eu/eli/dir/2023/970/oj" target="_blank" rel="noopener noreferrer" className="text-secondary-700 no-underline hover:underline">
                  EU-Richtlinie 2023/970 &mdash; Art. 4: Gleichwertige Arbeit &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.bundesarbeitsgericht.de/" target="_blank" rel="noopener noreferrer" className="text-secondary-700 no-underline hover:underline">
                  BAG-Urteil 8 AZR 300/24 &mdash; Paarvergleich &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/entgtranspg/" target="_blank" rel="noopener noreferrer" className="text-secondary-700 no-underline hover:underline">
                  Entgelttransparenzgesetz (EntgTranspG) &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Weitere Tools
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Noch unsicher? Lassen Sie Ihre Situation analysieren.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Unser KI-Situationscheck gibt Ihnen eine erste Einschätzung Ihrer Situation
            zur Entgelttransparenz &mdash; für Arbeitnehmer und Arbeitgeber.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/situationscheck"
              className="inline-block py-3.5 px-8 bg-primary-600 text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-primary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(99,102,241,0.25)]"
            >
              KI-Situationscheck &rarr;
            </Link>
            <Link
              href="/kontakt"
              className="inline-block py-3.5 px-8 bg-white text-secondary-700 border-2 border-secondary-600 rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-secondary-50 hover:-translate-y-px"
            >
              Kostenlose Ersteinschätzung &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
