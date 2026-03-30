'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

/* ───── Questions ───── */
const questions = [
  {
    text: 'Arbeiten Sie im selben Unternehmen wie eine Person des anderen Geschlechts mit ähnlicher Tätigkeit?',
    options: ['Ja', 'Nein', 'Weiß nicht'],
  },
  {
    text: 'Verdienen Sie vermutlich weniger?',
    options: ['Ja', 'Nein', 'Weiß nicht'],
  },
  {
    text: 'Seit wann ungefähr?',
    options: ['Unter 1 Jahr', '1–3 Jahre', 'Über 3 Jahre'],
  },
  {
    text: 'Hat Ihr Unternehmen mehr als 50 Mitarbeiter?',
    options: ['Ja', 'Nein', 'Weiß nicht'],
  },
];

/* ───── FAQs ───── */
const faqs = [
  {
    q: 'Wann habe ich einen Equal-Pay-Anspruch?',
    a: 'Ein Equal-Pay-Anspruch besteht, wenn Sie für gleiche oder gleichwertige Arbeit weniger Gehalt erhalten als eine Person des anderen Geschlechts im selben Unternehmen. Entscheidend sind die tatsächlichen Aufgaben, nicht die Stellenbezeichnung. Nach Art. 4 EU-RL 2023/970 müssen Qualifikation, Verantwortung, Belastung und Arbeitsbedingungen verglichen werden.',
  },
  {
    q: 'Muss ich beweisen, dass ich weniger verdiene?',
    a: 'Nein. Nach der Beweislastumkehr (Art. 18 EU-RL 2023/970) reicht es, wenn Sie Indizien für eine Entgeltdiskriminierung vorbringen — etwa durch ein Auskunftsverlangen nach Art. 7. Das BAG hat bestätigt, dass bereits ein Paarvergleich mit einer Person des anderen Geschlechts ausreicht (Az. 8 AZR 300/24). Der Arbeitgeber muss dann beweisen, dass die Gehaltsunterschiede sachlich gerechtfertigt sind.',
  },
  {
    q: 'Was kann ich als Nächstes tun, wenn der Schnellcheck positiv ausfällt?',
    a: 'Nutzen Sie Ihr Auskunftsrecht nach Art. 7 EU-RL 2023/970 und fordern Sie von Ihrem Arbeitgeber die durchschnittliche Vergütung einer Vergleichsgruppe an. Ein Fachanwalt für Arbeitsrecht kann die Antwort einordnen und bei Bedarf eine Entschädigung oder Gehaltsnachzahlung durchsetzen — bis zu drei Jahre rückwirkend.',
  },
];

/* ───── Result Types ───── */
type ResultVariant = 'strong' | 'mixed' | 'weak';

function getResult(answers: string[]): ResultVariant {
  const jaCount = answers.filter((a) => a === 'Ja').length;
  const neinOrWeissNicht = answers.filter((a) => a === 'Nein' || a === 'Weiß nicht').length;

  // Q1=Ja, Q2=Ja → strong indicators
  if (answers[0] === 'Ja' && answers[1] === 'Ja' && jaCount >= 3) return 'strong';
  if (neinOrWeissNicht >= 3) return 'weak';
  return 'mixed';
}

/* ───── Component ───── */
export default function EqualPaySchnellcheckPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  const result = showResult ? getResult(answers) : null;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/equal-pay-anspruch-schnellcheck/`}
        pageTitle="Equal-Pay-Anspruch Schnellcheck"
        pageDescription="Prüfen Sie in 4 Fragen, ob Sie einen Anspruch auf gleiche Bezahlung haben. Kostenloser Schnellcheck von APOS Legal Heidelberg."
        pageType="WebApplication"
        appName="Equal-Pay-Anspruch Schnellcheck"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          { name: 'Equal-Pay-Schnellcheck', url: `${SEO_CONFIG.baseUrl}/equal-pay-anspruch-schnellcheck/` },
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
            <span>Equal-Pay-Schnellcheck</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Equal-Pay-Anspruch Schnellcheck &mdash; in 2 Minuten prüfen
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Beantworten Sie 4 Fragen und erhalten Sie eine erste Einschätzung, ob Sie einen Anspruch
            auf gleiche Bezahlung haben.
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Equal-Pay-Anspruch prüfen:</strong> Nach der EU-Entgelttransparenzrichtlinie 2023/970 haben
              Beschäftigte das Recht auf <strong>gleichen Lohn für gleiche oder gleichwertige Arbeit</strong>.
              Das BAG hat bestätigt: Ein <strong>Paarvergleich</strong> mit einer Person des anderen Geschlechts
              reicht aus (Az. 8 AZR 300/24).
            </p>
          </div>
        </div>
      </section>

      {/* Schnellcheck */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            {!showResult ? (
              <div className="bg-secondary-50 border border-secondary/20 rounded p-8">
                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {questions.map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.85rem] font-bold transition-colors ${
                          i < step
                            ? 'bg-secondary-600 text-white'
                            : i === step
                              ? 'bg-secondary-700 text-white'
                              : 'bg-white border border-secondary/30 text-ink-muted'
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < questions.length - 1 && (
                        <div
                          className={`w-6 h-0.5 ${
                            i < step ? 'bg-secondary-600' : 'bg-secondary/20'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2">
                  Frage {step + 1} von {questions.length}
                </div>

                <h2 className="font-serif text-[1.2rem] font-bold mb-6 leading-snug">
                  {questions[step].text}
                </h2>

                <div className="space-y-3">
                  {questions[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full py-3.5 px-5 bg-white border border-secondary/30 rounded-sm font-sans text-[0.95rem] text-ink cursor-pointer transition-all text-left hover:border-secondary-600 hover:bg-secondary-50 hover:shadow-[0_2px_8px_rgba(22,163,74,0.1)]"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={() => {
                      setStep(step - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="mt-4 text-[0.85rem] text-ink-muted bg-transparent border-none cursor-pointer hover:text-secondary-700 transition-colors font-sans"
                  >
                    &larr; Zurück
                  </button>
                )}
              </div>
            ) : (
              <div className="ergebnis-box">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ergebnis</h2>

                {result === 'strong' && (
                  <div className="rounded-sm border-2 border-secondary bg-secondary-50 p-6 text-center">
                    <div className="inline-block py-1.5 px-4 bg-secondary-600 text-white rounded-sm text-[0.85rem] font-semibold mb-4">
                      Starke Anzeichen für einen Equal-Pay-Anspruch
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed">
                      <strong>Nächster Schritt:</strong> Nutzen Sie Ihr Auskunftsrecht nach Art. 7 EU-RL 2023/970.
                      Das BAG hat bestätigt: Ein Paarvergleich reicht aus (Az. 8 AZR 300/24).
                    </p>
                  </div>
                )}

                {result === 'mixed' && (
                  <div className="rounded-sm border-2 border-yellow-400 bg-yellow-50 p-6 text-center">
                    <div className="inline-block py-1.5 px-4 bg-yellow-500 text-white rounded-sm text-[0.85rem] font-semibold mb-4">
                      Möglicher Anspruch &mdash; Ersteinschätzung empfohlen
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed">
                      Ihre Situation deutet auf einen möglichen Anspruch hin.
                      Eine Ersteinschätzung durch einen Fachanwalt klärt die Details.
                    </p>
                  </div>
                )}

                {result === 'weak' && (
                  <div className="rounded-sm border-2 border-gray-300 bg-slate-50 p-6 text-center">
                    <div className="inline-block py-1.5 px-4 bg-gray-500 text-white rounded-sm text-[0.85rem] font-semibold mb-4">
                      Kein eindeutiger Anspruch erkennbar
                    </div>
                    <p className="text-[0.95rem] text-ink-light leading-relaxed">
                      Auf Basis Ihrer Angaben ist kein eindeutiger Anspruch erkennbar &mdash; das heißt aber nicht,
                      dass keiner besteht. Eine Prüfung lohnt sich trotzdem.
                    </p>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/auskunftsrecht-checker/schreiben-generator"
                    className="inline-flex items-center justify-center py-3.5 px-6 bg-secondary-700 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-secondary-800 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(22,163,74,0.25)]"
                  >
                    Auskunftsschreiben erstellen &rarr;
                  </Link>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center py-3.5 px-6 bg-white text-secondary-700 border-2 border-secondary-700 rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-secondary-50 hover:-translate-y-px"
                  >
                    Kostenlose Ersteinschätzung &rarr;
                  </Link>
                </div>

                {/* Summary */}
                <div className="mt-6 bg-slate-50 rounded-sm border border-border p-5">
                  <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">
                    Ihre Antworten
                  </div>
                  <ul className="space-y-2 text-[0.88rem] text-ink-muted list-none">
                    {questions.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-semibold text-ink min-w-[24px]">{i + 1}.</span>
                        <span>{q.text} &mdash; <strong>{answers[i]}</strong></span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reset */}
                <button
                  onClick={reset}
                  className="mt-4 text-[0.85rem] text-ink-muted bg-transparent border-none cursor-pointer hover:text-secondary-700 transition-colors font-sans"
                >
                  Schnellcheck wiederholen &rarr;
                </button>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[0.75rem] text-ink-muted mt-6 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und
              ersetzt keine anwaltliche Beratung. Für eine verbindliche Einschätzung Ihres Falls wenden Sie sich
              bitte an einen{' '}
              <Link href="/kontakt" className="text-secondary-700 no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-secondary-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Equal-Pay-Anspruch
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-secondary-700 text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Gleicher Lohn ist Ihr Recht &mdash; wir setzen es durch
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Fachanwalt für Arbeitsrecht mit Erfahrung in Equal-Pay-Verfahren.
            Kostenlose Ersteinschätzung innerhalb von 24 Stunden.
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
