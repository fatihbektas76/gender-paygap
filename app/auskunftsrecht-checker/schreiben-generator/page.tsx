'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    q: 'Muss ich das Schreiben per Post oder per E-Mail senden?',
    a: 'Beides ist grundsätzlich möglich. Wir empfehlen jedoch den Versand per Einschreiben mit Rückschein, damit Sie den Zugang des Schreibens nachweisen können. Alternativ können Sie es persönlich bei der Personalabteilung abgeben und sich den Erhalt quittieren lassen.',
  },
  {
    q: 'Was muss der Arbeitgeber antworten?',
    a: 'Der Arbeitgeber muss Ihnen innerhalb von 2 Monaten (Art. 7 Abs. 3 EU-RL 2023/970) das durchschnittliche Entgeltniveau mitteilen — aufgeschlüsselt nach Geschlecht — für Beschäftigte, die gleiche oder gleichwertige Arbeit verrichten. Dazu gehören alle Entgeltbestandteile: Grundgehalt, Boni, Sachleistungen und sonstige Vergütung.',
  },
  {
    q: 'Was kann ich tun, wenn der Arbeitgeber nicht antwortet?',
    a: 'Bei Nichtbeantwortung innerhalb der 2-Monats-Frist tritt die Beweislastumkehr ein (Art. 18 EU-RL). Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt. Sie können zudem gerichtlich die Auskunft erzwingen und Schadensersatz verlangen.',
  },
];

function formatDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatEintrittsDatum(dateStr: string): string {
  if (!dateStr) return '[Datum]';
  const d = new Date(dateStr);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function SchreibenGeneratorPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [arbeitgeber, setArbeitgeber] = useState('');
  const [stelle, setStelle] = useState('');
  const [eintrittsDatum, setEintrittsDatum] = useState('');
  const [stadt, setStadt] = useState('');
  const [copied, setCopied] = useState(false);

  const heute = formatDatum(new Date());

  function generateLetter(): string {
    const n = name || '[Ihr Name]';
    const s = stadt || '[Stadt]';
    const ag = arbeitgeber || '[Arbeitgeber]';
    const st = stelle || '[Stellenbezeichnung]';
    const ed = eintrittsDatum ? formatEintrittsDatum(eintrittsDatum) : '[Datum]';

    return `${n}
${s}, den ${heute}

An die Personalabteilung
${ag}

Auskunftsverlangen gemäß Art. 7 EU-Richtlinie 2023/970 / § EntgTranspG

Sehr geehrte Damen und Herren,

ich bin seit dem ${ed} in Ihrem Unternehmen als ${st} tätig und bitte Sie hiermit um Auskunft gemäß Art. 7 der EU-Entgelttransparenzrichtlinie (Richtlinie 2023/970/EU) in Verbindung mit dem Entgelttransparenzgesetz (EntgTranspG).

Ich bitte um Mitteilung:

1. Nach welchen objektiven und geschlechtsneutralen Kriterien wird mein Entgelt festgelegt und weiterentwickelt (Art. 6 und 7 Abs. 1 lit. a der Richtlinie)?

2. Wie hoch ist das durchschnittliche Entgeltniveau (aufgeschlüsselt nach Geschlecht) für Beschäftigte, die gleiche oder gleichwertige Arbeit wie ich verrichten (Art. 7 Abs. 1 lit. b der Richtlinie)?

Bitte teilen Sie mir alle Entgeltbestandteile mit, einschließlich Grundgehalt, Boni, Sachleistungen und sonstiger Vergütungsbestandteile.

Gemäß Art. 7 Abs. 3 der Richtlinie 2023/970/EU bitte ich um Beantwortung innerhalb von zwei Monaten nach Zugang dieses Schreibens.

Ich weise darauf hin, dass gemäß Art. 18 der Richtlinie bei Vergütungsunterschieden auf Grundlage des Geschlechts eine Beweislastumkehr zu Ihren Lasten eintritt.

Mit freundlichen Grüßen,
${n}`;
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generateLetter());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateLetter();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }

  const isFormValid = name.trim() && arbeitgeber.trim() && stelle.trim() && eintrittsDatum && stadt.trim();

  const inputClass =
    'w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-secondary focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)] placeholder:text-ink-muted';

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/auskunftsrecht-checker/schreiben-generator/`}
        pageTitle="Muster-Auskunftsschreiben Generator — Auskunftsantrag erstellen"
        pageDescription="Erstellen Sie kostenlos ein rechtssicheres Auskunftsschreiben nach Art. 7 EU-Entgelttransparenzrichtlinie. Sofort als Text kopierbar."
        pageType="WebApplication"
        appName="Muster-Auskunftsschreiben Generator"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          { name: 'Auskunftsrecht-Checker', url: `${SEO_CONFIG.baseUrl}/auskunftsrecht-checker/` },
          { name: 'Schreiben-Generator', url: `${SEO_CONFIG.baseUrl}/auskunftsrecht-checker/schreiben-generator/` },
        ]}
        speakableSelectors={['.letter-preview']}
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
      <div className="bg-secondary-50 pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-secondary-700 no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitnehmer" className="text-secondary-700 no-underline hover:underline">Arbeitnehmer</Link>
            <span className="mx-2">/</span>
            <Link href="/auskunftsrecht-checker" className="text-secondary-700 no-underline hover:underline">Auskunftsrecht-Checker</Link>
            <span className="mx-2">/</span>
            <span>Schreiben-Generator</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Muster-Auskunftsschreiben erstellen &mdash; Auskunftsantrag nach Art. 7 EU-RL
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Erstellen Sie kostenlos ein rechtssicheres Auskunftsschreiben nach der
            EU-Entgelttransparenzrichtlinie. Einfach Daten eingeben, Vorschau prüfen
            und in die Zwischenablage kopieren.
          </p>
        </div>
      </div>

      {/* Generator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[
                { num: 1, label: 'Daten eingeben' },
                { num: 2, label: 'Vorschau' },
                { num: 3, label: 'Kopieren' },
              ].map((s, i) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-bold transition-colors ${
                        s.num === step
                          ? 'bg-secondary-600 text-white'
                          : s.num < step
                            ? 'bg-secondary-100 text-secondary-700'
                            : 'bg-slate-100 text-ink-muted'
                      }`}
                    >
                      {s.num < step ? (
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        s.num
                      )}
                    </div>
                    <span className={`text-[0.78rem] ${s.num === step ? 'text-secondary-700 font-semibold' : 'text-ink-muted'} max-sm:hidden`}>
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`w-8 h-0.5 ${s.num < step ? 'bg-secondary-300' : 'bg-slate-200'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Form */}
            {step === 1 && (
              <div className="bg-slate-50 border border-border-light rounded p-8">
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  Ihre Daten eingeben
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-6">
                  Diese Angaben werden in das Muster-Schreiben eingefügt. Ihre Daten werden
                  nicht gespeichert oder übertragen.
                </p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Ihr Name <span className="text-secondary-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="z. B. Maria Müller"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Name des Arbeitgebers <span className="text-secondary-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={arbeitgeber}
                      onChange={(e) => setArbeitgeber(e.target.value)}
                      placeholder="z. B. Muster GmbH"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Ihre Stellenbezeichnung <span className="text-secondary-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={stelle}
                      onChange={(e) => setStelle(e.target.value)}
                      placeholder="z. B. Projektmanagerin"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Im Unternehmen seit <span className="text-secondary-700">*</span>
                    </label>
                    <input
                      type="date"
                      value={eintrittsDatum}
                      onChange={(e) => setEintrittsDatum(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                      Stadt <span className="text-secondary-700">*</span>
                    </label>
                    <input
                      type="text"
                      value={stadt}
                      onChange={(e) => setStadt(e.target.value)}
                      placeholder="z. B. Berlin"
                      className={inputClass}
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isFormValid}
                    className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 ${
                      isFormValid
                        ? 'bg-secondary-600 text-white hover:bg-secondary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]'
                        : 'bg-slate-200 text-ink-muted cursor-not-allowed'
                    }`}
                  >
                    Vorschau anzeigen &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Preview */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-[1.2rem] font-bold mb-4">
                  Vorschau Ihres Auskunftsschreibens
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  Prüfen Sie den Text und kopieren Sie ihn anschließend in die Zwischenablage.
                </p>

                {/* Letter card */}
                <div className="letter-preview bg-white border border-border rounded p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <div className="font-sans text-[0.9rem] text-ink leading-relaxed whitespace-pre-line">
                    {generateLetter()}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-6 bg-white text-ink border border-border rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-slate-50"
                  >
                    &larr; Zurück bearbeiten
                  </button>
                  <button
                    onClick={() => {
                      copyToClipboard();
                      setStep(3);
                    }}
                    className="flex-1 py-3.5 bg-secondary-600 text-white border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all hover:bg-secondary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]"
                  >
                    In Zwischenablage kopieren &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Copied + CTA */}
            {step === 3 && (
              <div>
                {/* Success message */}
                <div className="rounded-sm border-2 border-secondary p-6 bg-secondary-50 text-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="text-secondary-700" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-[1.3rem] font-bold mb-2">
                    {copied ? 'In Zwischenablage kopiert!' : 'Schreiben erstellt!'}
                  </h2>
                  <p className="text-[0.92rem] text-ink-muted leading-relaxed">
                    Fügen Sie den Text in ein Word-Dokument oder eine E-Mail ein und senden
                    Sie es an die Personalabteilung Ihres Arbeitgebers.
                  </p>
                </div>

                {/* Letter preview (collapsed) */}
                <details className="mb-6 border border-border rounded-sm overflow-hidden">
                  <summary className="py-3 px-5 bg-slate-50 text-[0.88rem] font-semibold cursor-pointer">
                    Schreiben nochmals anzeigen
                  </summary>
                  <div className="letter-preview p-6 font-sans text-[0.88rem] text-ink leading-relaxed whitespace-pre-line">
                    {generateLetter()}
                  </div>
                </details>

                {/* Copy again button */}
                <button
                  onClick={copyToClipboard}
                  className="w-full py-3 bg-white text-secondary-700 border-2 border-secondary-600 rounded-sm font-sans text-[0.92rem] font-semibold cursor-pointer transition-all hover:bg-secondary-50 mb-6"
                >
                  {copied ? 'Kopiert!' : 'Erneut in Zwischenablage kopieren'}
                </button>

                {/* CTA */}
                <div className="py-6 px-6 bg-slate-50 rounded-sm border-l-[3px] border-secondary">
                  <h3 className="font-serif text-[1.1rem] font-bold mb-2">
                    Antwort des Arbeitgebers prüfen lassen
                  </h3>
                  <p className="text-[0.92rem] text-ink-muted leading-relaxed mb-4">
                    Wenn Ihr Arbeitgeber antwortet, prüfen wir kostenlos, ob die Auskunft
                    vollständig ist und ob sich daraus Ansprüche ergeben.
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-block py-3 px-6 bg-secondary-600 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-secondary-700"
                  >
                    Antwort des Arbeitgebers prüfen lassen &rarr;
                  </Link>
                </div>

                {/* Start over */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      setStep(1);
                      setName('');
                      setArbeitgeber('');
                      setStelle('');
                      setEintrittsDatum('');
                      setStadt('');
                    }}
                    className="text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none"
                  >
                    Neues Schreiben erstellen
                  </button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 py-4 px-5 bg-amber-50 border border-amber-200 rounded-sm">
              <p className="text-[0.82rem] text-ink-light leading-relaxed m-0">
                <strong>Hinweis:</strong> Dieses Muster dient der Orientierung und ersetzt keine
                anwaltliche Beratung. Die Rechtslage kann je nach Unternehmensgröße, Branche und
                individuellem Fall abweichen. Für eine verbindliche Einschätzung wenden Sie sich
                an einen{' '}
                <Link href="/kontakt" className="text-secondary-700 no-underline hover:underline">
                  Fachanwalt für Arbeitsrecht
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips section */}
      <section className="py-[70px] px-8 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
              Praxishinweis
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
              So senden Sie Ihr Auskunftsschreiben richtig
            </h2>
            <div className="space-y-5">
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-100 text-secondary-700 font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">Per Einschreiben mit Rückschein senden</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      So können Sie den Zugang des Schreibens nachweisen. Die 2-Monats-Frist beginnt ab Zugang.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-100 text-secondary-700 font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">Frist im Kalender notieren</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      Der Arbeitgeber hat 2 Monate Zeit zu antworten. Notieren Sie sich das Fristende.
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-4 px-5 bg-white rounded-sm border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-secondary-100 text-secondary-700 font-bold text-[0.8rem] flex items-center justify-center mt-0.5 shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-[0.92rem] text-ink font-semibold mb-1">Antwort prüfen lassen</p>
                    <p className="text-[0.85rem] text-ink-muted leading-relaxed m-0">
                      Wenn die Antwort kommt, lassen Sie diese von einem Fachanwalt prüfen &mdash;
                      insbesondere auf Vollständigkeit und mögliche Entgeltdiskriminierung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-secondary-700 text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Schreiben verschickt? Wir prüfen die Antwort.
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft kostenlos, ob die Auskunft Ihres Arbeitgebers
            vollständig ist und ob sich Ansprüche auf Nachzahlung ergeben.
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
      <section className="py-[70px] px-8 bg-slate-50">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Auskunftsschreiben
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Weitere Tools
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Noch nicht sicher? Prüfen Sie zuerst Ihren Anspruch.
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Mit unserem Auskunftsrecht-Checker erfahren Sie in 3 Klicks,
            ob Sie Anspruch auf Gehaltsauskunft haben.
          </p>
          <Link
            href="/auskunftsrecht-checker"
            className="inline-block py-3.5 px-8 bg-secondary-600 text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-secondary-700 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]"
          >
            Auskunftsrecht-Checker starten &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
