'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

type Audience = 'an' | 'ag';

const anExamples = [
  'Ich verdiene weniger als mein männlicher Kollege in gleicher Position',
  'Mein Arbeitgeber hat meine Gehaltsauskunft abgelehnt',
  'Nach der Elternzeit wurde mein Gehalt nicht angepasst',
  'Ich bin Teilzeit und verdiene pro Stunde weniger als Vollzeitkräfte',
];

const agExamples = [
  'Wir haben 300 Mitarbeiter und noch keinen GPG-Bericht',
  'Unsere Stellenanzeigen enthalten keine Gehaltsspannen',
  'Ein Mitarbeiter hat eine Gehaltsauskunft beantragt',
  'Unser GPG liegt bei 8% — was müssen wir tun?',
];

const faqs = [
  {
    q: 'Was passiert mit meinen Daten?',
    a: 'Ihre Eingaben werden ausschließlich zur Erstellung der KI-Analyse an unseren Server gesendet und dort verarbeitet. Es werden keine Daten gespeichert oder an Dritte weitergegeben. Die Analyse erfolgt anonym und ohne Login.',
  },
  {
    q: 'Wie genau ist die KI-Analyse?',
    a: 'Die KI-Analyse liefert eine erste Orientierung auf Basis der EU-Entgelttransparenzrichtlinie 2023/970 und aktueller BAG-Rechtsprechung. Sie ersetzt keine anwaltliche Beratung, kann aber helfen, die eigene Situation besser einzuordnen und die richtigen nächsten Schritte zu identifizieren.',
  },
  {
    q: 'Kann ich die Analyse als Beweis verwenden?',
    a: 'Nein. Die KI-Analyse ist eine unverbindliche Ersteinschätzung und hat keine Beweiskraft vor Gericht. Für eine rechtlich belastbare Einschätzung wenden Sie sich an einen Fachanwalt für Arbeitsrecht, der Ihren konkreten Fall prüft.',
  },
];

function extractVerdict(text: string, audience: Audience): string | null {
  if (audience === 'an') {
    if (text.includes('STARK')) return 'STARK';
    if (text.includes('MITTEL')) return 'MITTEL';
    if (text.includes('SCHWACH')) return 'SCHWACH';
  } else {
    if (text.includes('HOCH')) return 'HOCH';
    if (text.includes('MITTEL')) return 'MITTEL';
    if (text.includes('GERING')) return 'GERING';
  }
  return null;
}

function getVerdictColor(verdict: string): { bg: string; border: string; badge: string } {
  switch (verdict) {
    case 'STARK':
    case 'GERING':
      return { bg: 'bg-green-bg', border: 'border-green', badge: 'bg-green' };
    case 'MITTEL':
      return { bg: 'bg-amber-50', border: 'border-amber-400', badge: 'bg-amber-500' };
    case 'SCHWACH':
    case 'HOCH':
      return { bg: 'bg-red-50', border: 'border-red-400', badge: 'bg-red-500' };
    default:
      return { bg: 'bg-slate-50', border: 'border-border', badge: 'bg-slate-500' };
  }
}

function getVerdictLabel(verdict: string, audience: Audience): string {
  if (audience === 'an') {
    switch (verdict) {
      case 'STARK':
        return 'Starke Position';
      case 'MITTEL':
        return 'Mittlere Position';
      case 'SCHWACH':
        return 'Schwache Position';
      default:
        return verdict;
    }
  } else {
    switch (verdict) {
      case 'HOCH':
        return 'Hohes Risiko';
      case 'MITTEL':
        return 'Mittleres Risiko';
      case 'GERING':
        return 'Geringes Risiko';
      default:
        return verdict;
    }
  }
}

export default function SituationscheckPage() {
  const [audience, setAudience] = useState<Audience>('an');
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (situation.length < 10) {
      setError('Bitte beschreiben Sie Ihre Situation ausführlicher (mindestens 10 Zeichen).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/situationscheck/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation, audience }),
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
    setSituation('');
    setResult(null);
    setError(null);
  }

  const examples = audience === 'an' ? anExamples : agExamples;
  const verdict = result ? extractVerdict(result, audience) : null;
  const verdictColors = verdict ? getVerdictColor(verdict) : null;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/situationscheck/`}
        pageTitle="KI-Situationscheck — Ihre Situation analysieren lassen"
        pageDescription="KI-gestützte Ersteinschätzung Ihrer Situation zur Entgelttransparenz. Für Arbeitnehmer und Arbeitgeber. Kostenlos und vertraulich."
        pageType="WebApplication"
        appName="KI-Situationscheck"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Situationscheck', url: `${SEO_CONFIG.baseUrl}/situationscheck/` },
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
      <div className="bg-gold-bg pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[100px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-gold no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <span>Situationscheck</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            KI-Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            KI-Situationscheck &mdash; Ihre Situation analysieren lassen
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Beschreiben Sie Ihre Situation und erhalten Sie eine KI-gestützte Ersteinschätzung
            auf Basis der EU-Entgelttransparenzrichtlinie 2023/970.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              KI-gestützt
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kein Login
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-gold" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Vertraulich
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>KI-Situationscheck</strong> bedeutet: Sie beschreiben Ihre Situation zur
              Entgelttransparenz und erhalten eine sofortige KI-Analyse auf Basis der{' '}
              <strong>EU-Richtlinie 2023/970</strong> und aktueller{' '}
              <strong>BAG-Rechtsprechung</strong> (Az. 8 AZR 300/24). Für Arbeitnehmer und Arbeitgeber.
            </p>
          </div>
        </div>
      </section>

      {/* Situationscheck Tool */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[660px]">
            {/* Audience Tabs */}
            <div className="flex mb-8 border border-border rounded-sm overflow-hidden">
              <button
                onClick={() => {
                  setAudience('an');
                  handleReset();
                }}
                className={`flex-1 py-3.5 px-4 font-sans text-[0.92rem] font-semibold cursor-pointer transition-all border-none ${
                  audience === 'an'
                    ? 'bg-green text-white'
                    : 'bg-white text-ink-muted hover:bg-slate-50'
                }`}
              >
                Ich bin Arbeitnehmer
              </button>
              <button
                onClick={() => {
                  setAudience('ag');
                  handleReset();
                }}
                className={`flex-1 py-3.5 px-4 font-sans text-[0.92rem] font-semibold cursor-pointer transition-all border-none ${
                  audience === 'ag'
                    ? 'bg-blue text-white'
                    : 'bg-white text-ink-muted hover:bg-slate-50'
                }`}
              >
                Ich bin Arbeitgeber
              </button>
            </div>

            {!result ? (
              <div className={`border rounded p-8 ${audience === 'an' ? 'bg-green-bg border-green-bg' : 'bg-cream-dark border-blue/20'}`}>
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  {audience === 'an'
                    ? 'Beschreiben Sie Ihre Situation'
                    : 'Beschreiben Sie Ihre Compliance-Situation'}
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  {audience === 'an'
                    ? 'Was ist passiert? Worum geht es bei Ihrem Gehalt?'
                    : 'Wo stehen Sie bei der Umsetzung der Entgelttransparenz?'}
                </p>

                {/* Example chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => setSituation(ex)}
                      className={`py-1.5 px-3 text-[0.8rem] rounded-sm border cursor-pointer transition-all font-sans ${
                        audience === 'an'
                          ? 'bg-white border-green/30 text-green hover:bg-green-bg hover:border-green'
                          : 'bg-white border-blue/30 text-blue hover:bg-cream-dark hover:border-blue'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder={
                    audience === 'an'
                      ? 'z. B. Ich arbeite seit 5 Jahren als Projektleiterin und habe erfahren, dass mein männlicher Kollege in derselben Position 15% mehr verdient...'
                      : 'z. B. Wir haben 250 Mitarbeiter, noch keinen Gender-Pay-Gap-Bericht und wissen nicht, welche Pflichten ab Juni 2026 auf uns zukommen...'
                  }
                  maxLength={2000}
                  rows={6}
                  className={`w-full py-3 px-4 border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none resize-y placeholder:text-ink-muted ${
                    audience === 'an'
                      ? 'border-green/30 focus:border-green focus:shadow-[0_0_0_3px_rgba(43,76,53,0.1)]'
                      : 'border-blue/30 focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,90,128,0.1)]'
                  }`}
                />
                <div className="flex justify-between items-center mt-1.5 mb-4">
                  <span className="text-[0.78rem] text-ink-muted">
                    {situation.length}/2000 Zeichen
                  </span>
                  {situation.length > 0 && situation.length < 10 && (
                    <span className="text-[0.78rem] text-red-500">
                      Mindestens 10 Zeichen erforderlich
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
                  disabled={loading || situation.length < 10}
                  className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all ${
                    loading || situation.length < 10
                      ? 'bg-slate-200 text-ink-muted cursor-not-allowed'
                      : audience === 'an'
                        ? 'bg-green text-white hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]'
                        : 'bg-blue text-white hover:bg-blue hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]'
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
                    'Analyse starten'
                  )}
                </button>
              </div>
            ) : (
              <div className="ergebnis-box">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ihre Analyse</h2>

                {/* Verdict badge */}
                {verdict && verdictColors && (
                  <div className={`rounded-sm border-2 ${verdictColors.border} ${verdictColors.bg} p-4 mb-5 text-center`}>
                    <div className={`inline-block py-1.5 px-4 ${verdictColors.badge} text-white rounded-sm text-[0.85rem] font-semibold`}>
                      {getVerdictLabel(verdict, audience)}
                    </div>
                  </div>
                )}

                {/* AI Response */}
                <div className="bg-slate-50 border border-border-light rounded p-6">
                  <div className="text-[0.92rem] text-ink-light leading-relaxed whitespace-pre-line">
                    {result}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/kontakt"
                    className={`block w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:-translate-y-px ${
                      audience === 'an'
                        ? 'bg-green text-white hover:bg-green hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]'
                        : 'bg-blue text-white hover:bg-blue hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]'
                    }`}
                  >
                    Kostenlose Ersteinschätzung anfragen &rarr;
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
                <Link href="/kontakt" className="text-gold no-underline hover:underline">
                  Fachanwalt für Arbeitsrecht
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
              So funktioniert es
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              In 3 Schritten zur Ersteinschätzung
            </h2>
            <div className="space-y-5">
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gold-bg text-gold font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">Situation beschreiben</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      Wählen Sie Ihre Rolle (Arbeitnehmer oder Arbeitgeber) und beschreiben Sie Ihre Situation
                      zur Entgelttransparenz in eigenen Worten.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gold-bg text-gold font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">KI-Analyse erhalten</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      Unsere KI analysiert Ihre Situation auf Basis der EU-Richtlinie 2023/970
                      und aktueller Rechtsprechung des Bundesarbeitsgerichts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gold-bg text-gold font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">Nächste Schritte kennen</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      Sie erhalten konkrete Handlungsempfehlungen und eine Bewertung Ihrer Situation &mdash;
                      mit der Option, einen Fachanwalt zu kontaktieren.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-gold text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Entgeltdiskriminierung? Wir helfen &mdash; Arbeitnehmern und Arbeitgebern.
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihren Fall kostenlos und zeigt Ihnen
            die besten Handlungsoptionen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block py-3.5 px-8 bg-white text-gold border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-bg hover:-translate-y-0.5"
          >
            Kostenlose Ersteinschätzung &rarr;
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum KI-Situationscheck
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
                <a href="https://eur-lex.europa.eu/eli/dir/2023/970/oj" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  EU-Richtlinie 2023/970 &mdash; Entgelttransparenzrichtlinie &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/entgtranspg/" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  Entgelttransparenzgesetz (EntgTranspG) &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.bundesarbeitsgericht.de/" target="_blank" rel="noopener noreferrer" className="text-gold no-underline hover:underline">
                  BAG-Urteil 8 AZR 300/24 &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
            Weitere Tools
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Noch mehr Tools zur Entgelttransparenz
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Finden Sie heraus, welche Vergleichspositionen in Ihrem Unternehmen relevant sind &mdash;
            mit unserem KI-gestützten Vergleichsgruppen-Finder.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/vergleichsgruppen-finder"
              className="inline-block py-3.5 px-8 bg-green text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]"
            >
              Vergleichsgruppen-Finder &rarr;
            </Link>
            <Link
              href="/kontakt"
              className="inline-block py-3.5 px-8 bg-white text-gold border-2 border-gold rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-gold-bg hover:-translate-y-px"
            >
              Kostenlose Ersteinschätzung &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
