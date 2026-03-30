'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

type CompanySize = 'unter50' | '50-199' | '200-499' | '500+';
type Tenure = 'unter6' | '6-24' | 'ueber2';
type Situation = 'weniger' | 'einordnen' | 'abgelehnt';

type ResultType = 'anspruch' | 'kein-anspruch' | 'noch-nicht';

const faqs = [
  {
    q: 'Was ist das Auskunftsrecht nach der EU-Entgelttransparenzrichtlinie?',
    a: 'Das Auskunftsrecht nach Art. 7 der EU-Richtlinie 2023/970 gibt Arbeitnehmern das Recht, von ihrem Arbeitgeber Auskunft über das durchschnittliche Entgeltniveau zu verlangen — aufgeschlüsselt nach Geschlecht und für Beschäftigte, die gleiche oder gleichwertige Arbeit verrichten. Der Arbeitgeber muss innerhalb von 2 Monaten antworten.',
  },
  {
    q: 'Ab wann gilt das Auskunftsrecht in Deutschland?',
    a: 'Die EU-Entgelttransparenzrichtlinie muss bis zum 7. Juni 2026 in nationales Recht umgesetzt werden. Das erweiterte Auskunftsrecht gilt dann für Unternehmen ab 50 Mitarbeitern. Bereits jetzt besteht ein eingeschränktes Auskunftsrecht nach dem Entgelttransparenzgesetz (EntgTranspG) für Unternehmen ab 200 Mitarbeitern.',
  },
  {
    q: 'Was passiert, wenn mein Arbeitgeber nicht antwortet?',
    a: 'Antwortet der Arbeitgeber nicht innerhalb von 2 Monaten, tritt automatisch die Beweislastumkehr ein (Art. 18 EU-RL 2023/970). Das bedeutet: Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt — nicht Sie. Sie können zudem Klage einreichen und Entschädigung verlangen.',
  },
  {
    q: 'Kann mein Arbeitgeber mich benachteiligen, wenn ich Auskunft verlange?',
    a: 'Nein. Die EU-Richtlinie enthält ein ausdrückliches Benachteiligungsverbot (Art. 25). Arbeitnehmer, die ihr Auskunftsrecht wahrnehmen, dürfen weder gekündigt noch anderweitig benachteiligt werden. Verstöße dagegen sind eigenständig einklagbar.',
  },
];

function getResult(size: CompanySize, tenure: Tenure): ResultType {
  if (tenure === 'unter6') return 'noch-nicht';
  if (size === 'unter50') return 'kein-anspruch';
  return 'anspruch';
}

export default function AuskunftsrechtCheckerPage() {
  const [step, setStep] = useState(1);
  const [companySize, setCompanySize] = useState<CompanySize | null>(null);
  const [tenure, setTenure] = useState<Tenure | null>(null);
  const [, setSituation] = useState<Situation | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);

  function handleCompanySize(size: CompanySize) {
    setCompanySize(size);
    setStep(2);
  }

  function handleTenure(t: Tenure) {
    setTenure(t);
    setStep(3);
  }

  function handleSituation(s: Situation) {
    setSituation(s);
    if (companySize && tenure) {
      setResult(getResult(companySize, tenure));
    }
    setStep(4);
  }

  function restart() {
    setStep(1);
    setCompanySize(null);
    setTenure(null);
    setSituation(null);
    setResult(null);
  }

  const optionBtnClass =
    'w-full text-left py-4 px-5 bg-white border border-border rounded-sm font-sans text-[0.95rem] text-ink cursor-pointer transition-all hover:border-green hover:bg-green-bg hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(43,76,53,0.1)]';

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/auskunftsrecht-checker/`}
        pageTitle="Auskunftsrecht-Checker — Haben Sie Anspruch auf Gehaltsauskunft?"
        pageDescription="In 3 Klicks prüfen: Haben Sie Anspruch auf Gehaltsauskunft nach der EU-Entgelttransparenzrichtlinie? Kostenloser Check von APOS Legal."
        pageType="WebApplication"
        appName="Auskunftsrecht-Checker"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          { name: 'Auskunftsrecht-Checker', url: `${SEO_CONFIG.baseUrl}/auskunftsrecht-checker/` },
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
      <div className="bg-green-bg pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-green no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitnehmer" className="text-green no-underline hover:underline">Arbeitnehmer</Link>
            <span className="mx-2">/</span>
            <span>Auskunftsrecht-Checker</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Auskunftsrecht-Checker &mdash; Haben Sie Anspruch auf Gehaltsauskunft?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Prüfen Sie in 3 Klicks, ob Ihr Arbeitgeber Ihnen Auskunft über Vergleichsgehälter
            geben muss &mdash; nach der EU-Entgelttransparenzrichtlinie 2023/970.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              3 Fragen
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Kein Login
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sofort-Ergebnis
            </span>
          </div>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Auskunftsrecht prüfen</strong> bedeutet festzustellen, ob Sie von Ihrem Arbeitgeber
              Auskunft über Vergleichsgehälter verlangen können. Ab <strong>Juni 2026</strong> haben
              Beschäftigte in Unternehmen ab <strong>50 Mitarbeitern</strong> das Recht auf Gehaltsauskunft
              nach <strong>Art. 7 EU-Richtlinie 2023/970</strong>. Der Arbeitgeber muss innerhalb von
              <strong> 2 Monaten</strong> antworten.
            </p>
          </div>
        </div>
      </section>

      {/* Checker */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            {/* Step indicator */}
            {step <= 3 && (
              <div className="flex items-center gap-3 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-bold transition-colors ${
                        s === step
                          ? 'bg-green text-white'
                          : s < step
                            ? 'bg-green-bg text-green'
                            : 'bg-cream-dark text-ink-muted'
                      }`}
                    >
                      {s < step ? (
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        s
                      )}
                    </div>
                    {s < 3 && (
                      <div className={`w-12 h-0.5 ${s < step ? 'bg-green-bg' : 'bg-cream-dark'}`} />
                    )}
                  </div>
                ))}
                <span className="text-[0.82rem] text-ink-muted ml-2">
                  Schritt {step}/3
                </span>
              </div>
            )}

            {/* Step 1: Company size */}
            {step === 1 && (
              <div className="bg-cream border border-border-light rounded p-8">
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  Wie viele Mitarbeiter hat Ihr Unternehmen?
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  Die Unternehmensgröße bestimmt, ob das Auskunftsrecht gilt.
                </p>
                <div className="space-y-3">
                  <button onClick={() => handleCompanySize('unter50')} className={optionBtnClass}>
                    Unter 50 Mitarbeiter
                  </button>
                  <button onClick={() => handleCompanySize('50-199')} className={optionBtnClass}>
                    50&ndash;199 Mitarbeiter
                  </button>
                  <button onClick={() => handleCompanySize('200-499')} className={optionBtnClass}>
                    200&ndash;499 Mitarbeiter
                  </button>
                  <button onClick={() => handleCompanySize('500+')} className={optionBtnClass}>
                    500+ Mitarbeiter
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Tenure */}
            {step === 2 && (
              <div className="bg-cream border border-border-light rounded p-8">
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  Wie lange sind Sie im Unternehmen?
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  Das Auskunftsrecht setzt eine Mindest-Betriebszugehörigkeit voraus.
                </p>
                <div className="space-y-3">
                  <button onClick={() => handleTenure('unter6')} className={optionBtnClass}>
                    Unter 6 Monate
                  </button>
                  <button onClick={() => handleTenure('6-24')} className={optionBtnClass}>
                    6&ndash;24 Monate
                  </button>
                  <button onClick={() => handleTenure('ueber2')} className={optionBtnClass}>
                    Über 2 Jahre
                  </button>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* Step 3: Situation */}
            {step === 3 && (
              <div className="bg-cream border border-border-light rounded p-8">
                <h2 className="font-serif text-[1.2rem] font-bold mb-2">
                  Was beschreibt Ihre Situation am besten?
                </h2>
                <p className="text-[0.88rem] text-ink-muted mb-5">
                  Ihre Antwort hilft uns, Ihnen die passende Empfehlung zu geben.
                </p>
                <div className="space-y-3">
                  <button onClick={() => handleSituation('weniger')} className={optionBtnClass}>
                    Ich verdiene vermutlich weniger
                  </button>
                  <button onClick={() => handleSituation('einordnen')} className={optionBtnClass}>
                    Ich möchte mein Gehalt einordnen
                  </button>
                  <button onClick={() => handleSituation('abgelehnt')} className={optionBtnClass}>
                    Ich wurde bei einer Auskunftsanfrage abgelehnt
                  </button>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-4 text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none"
                >
                  &larr; Zurück
                </button>
              </div>
            )}

            {/* Result */}
            {step === 4 && result && (
              <div className="ergebnis-box">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ihr Ergebnis</h2>

                {result === 'anspruch' && (
                  <div className="rounded-sm border-2 border-green p-6 bg-green-bg">
                    <div className="text-center mb-4">
                      <div className="inline-block py-1.5 px-4 bg-green text-white rounded-sm text-[0.85rem] font-semibold">
                        Sie haben Anspruch auf Auskunft
                      </div>
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed text-center">
                      Ihr Arbeitgeber muss innerhalb von <strong>2 Monaten</strong> antworten
                      (Art. 7 EU-RL 2023/970). Sie haben das Recht auf Auskunft über das durchschnittliche
                      Entgeltniveau &mdash; aufgeschlüsselt nach Geschlecht &mdash; für Beschäftigte,
                      die gleiche oder gleichwertige Arbeit verrichten.
                    </p>
                  </div>
                )}

                {result === 'kein-anspruch' && (
                  <div className="rounded-sm border-2 border-amber-400 p-6 bg-amber-50">
                    <div className="text-center mb-4">
                      <div className="inline-block py-1.5 px-4 bg-amber-500 text-white rounded-sm text-[0.85rem] font-semibold">
                        Kein Auskunftsanspruch &mdash; aber Equal-Pay-Klage möglich
                      </div>
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed text-center">
                      Ihr Arbeitgeber ist aktuell noch nicht zur Auskunft verpflichtet &mdash; aber
                      das ändert sich ab Juni 2026. Eine <Link href="/equal-pay-klage" className="text-green no-underline hover:underline font-semibold">Equal-Pay-Klage</Link> ist
                      dennoch möglich, wenn Sie Anhaltspunkte für Entgeltdiskriminierung haben.
                    </p>
                  </div>
                )}

                {result === 'noch-nicht' && (
                  <div className="rounded-sm border-2 border-amber-400 p-6 bg-amber-50">
                    <div className="text-center mb-4">
                      <div className="inline-block py-1.5 px-4 bg-amber-500 text-white rounded-sm text-[0.85rem] font-semibold">
                        Noch nicht berechtigt
                      </div>
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed text-center">
                      Das Auskunftsrecht gilt ab <strong>6 Monaten Betriebszugehörigkeit</strong>.
                      Warten Sie noch etwas und stellen Sie dann Ihren Antrag. In der Zwischenzeit
                      können Sie sich bereits mit einem Muster-Auskunftsschreiben vorbereiten.
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/auskunftsrecht-checker/schreiben-generator"
                    className="block w-full py-3.5 bg-green text-white border-none rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]"
                  >
                    Muster-Auskunftsschreiben erstellen &rarr;
                  </Link>
                  <Link
                    href="/kontakt"
                    className="block w-full py-3.5 bg-white text-green border-2 border-green rounded-sm font-sans text-base font-semibold no-underline text-center transition-all hover:bg-green-bg hover:-translate-y-px"
                  >
                    Kostenlose Ersteinschätzung &rarr;
                  </Link>
                </div>

                {/* Restart */}
                <button
                  onClick={restart}
                  className="mt-5 text-[0.84rem] text-ink-muted underline cursor-pointer bg-transparent border-none w-full text-center"
                >
                  Erneut prüfen
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[0.75rem] text-ink-muted mt-6 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
              Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche
              Einschätzung Ihres Falls wenden Sie sich bitte an einen{' '}
              <Link href="/kontakt" className="text-green no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Was ist das Auskunftsrecht nach der EU-Entgelttransparenzrichtlinie?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Die EU-Richtlinie 2023/970 zur Entgelttransparenz gibt Arbeitnehmern erstmals ein
              umfassendes <strong>individuelles Auskunftsrecht</strong>. Beschäftigte können von ihrem
              Arbeitgeber verlangen, das <strong>durchschnittliche Entgeltniveau</strong> für vergleichbare
              Positionen offenzulegen &mdash; aufgeschlüsselt nach Geschlecht.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Der Arbeitgeber muss nach Art. 7 der Richtlinie innerhalb von <strong>2 Monaten</strong> antworten
              und dabei alle Entgeltbestandteile offenlegen: Grundgehalt, Boni, Sachleistungen und sonstige
              Vergütungsbestandteile. Das Auskunftsrecht gilt ab einer Betriebszugehörigkeit von 6 Monaten
              und für Unternehmen ab 50 Mitarbeitern.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Reagiert der Arbeitgeber nicht oder nur unvollständig, greift die <strong>Beweislastumkehr</strong> nach
              Art. 18: Der Arbeitgeber muss dann beweisen, dass keine Entgeltdiskriminierung vorliegt. Ein{' '}
              <Link href="/auskunftsrecht-entgelttransparenz" className="text-green no-underline hover:underline">
                Benachteiligungsverbot
              </Link>{' '}
              schützt Beschäftigte vor Repressalien.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[60px] px-8 bg-green text-white text-center">
        <div className="max-w-content mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Verdacht auf Gehaltsungleichheit? Wir helfen.
          </h2>
          <p className="text-[1rem] text-white/70 max-w-[520px] mx-auto mb-6">
            Fachanwalt Fatih Bektas prüft Ihren Fall kostenlos und zeigt Ihnen,
            wie Sie Ihr Auskunftsrecht durchsetzen.
          </p>
          <Link
            href="/kontakt"
            className="inline-block py-3.5 px-8 bg-white text-green border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-green-bg hover:-translate-y-0.5"
          >
            Kostenlose Ersteinschätzung &rarr;
          </Link>
        </div>
      </section>

      {/* Quellenblock */}
      <section className="py-10 px-8 bg-white border-t border-border">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
              Rechtsgrundlagen &amp; Quellen
            </div>
            <ul className="list-none space-y-2 text-[0.88rem]">
              <li>
                <a href="https://eur-lex.europa.eu/eli/dir/2023/970/oj" target="_blank" rel="noopener noreferrer" className="text-green no-underline hover:underline">
                  EU-Richtlinie 2023/970 &mdash; Entgelttransparenzrichtlinie &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.gesetze-im-internet.de/entgtranspg/" target="_blank" rel="noopener noreferrer" className="text-green no-underline hover:underline">
                  Entgelttransparenzgesetz (EntgTranspG) &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.antidiskriminierungsstelle.de/" target="_blank" rel="noopener noreferrer" className="text-green no-underline hover:underline">
                  Antidiskriminierungsstelle des Bundes &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Auskunftsrecht
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA final */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto text-center">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
            Jetzt handeln
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-3">
            Auskunftsrecht nutzen &mdash; Gehaltsungleichheit aufdecken
          </h2>
          <p className="text-[1rem] text-ink-muted max-w-[520px] mx-auto mb-6">
            Erstellen Sie jetzt Ihr Muster-Auskunftsschreiben oder lassen Sie sich
            von einem Fachanwalt beraten.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auskunftsrecht-checker/schreiben-generator"
              className="inline-block py-3.5 px-8 bg-green text-white border-none rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]"
            >
              Muster-Schreiben erstellen &rarr;
            </Link>
            <Link
              href="/kontakt"
              className="inline-block py-3.5 px-8 bg-white text-green border-2 border-green rounded-sm font-sans text-base font-semibold no-underline transition-all hover:bg-green-bg hover:-translate-y-px"
            >
              Kostenlose Ersteinschätzung &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
