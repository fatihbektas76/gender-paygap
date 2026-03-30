'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

/* ───── Categories & Questions ───── */
interface Category {
  title: string;
  ref: string;
  questions: string[];
}

const categories: Category[] = [
  {
    title: 'Transparenz (Art. 6 EU-RL)',
    ref: 'transparenz',
    questions: [
      'Haben Sie schriftlich dokumentierte Vergütungsrichtlinien?',
      'Kennen alle Mitarbeiter die Kriterien für ihre Gehaltseinstufung?',
      'Sind Beförderungskriterien geschlechtsneutral formuliert?',
      'Enthalten Ihre Stellenanzeigen Gehaltsspannen?',
      'Informieren Sie Mitarbeiter jährlich über ihr Auskunftsrecht?',
    ],
  },
  {
    title: 'Gleichwertigkeit (Art. 4 EU-RL)',
    ref: 'gleichwertigkeit',
    questions: [
      'Haben Sie eine Stellenbewertung nach objektiven Kriterien?',
      'Werden Kompetenzen, Verantwortung, Belastung und Arbeitsbedingungen bewertet?',
      'Sind „typisch weibliche" Tätigkeiten gleichwertig zu „typisch männlichen" eingestuft?',
      'Ist Teilzeitarbeit bei der Gehaltseinstufung neutral behandelt?',
      'Gibt es keine unbewussten Vorurteile bei der Stellenbewertung?',
    ],
  },
  {
    title: 'Reporting (Art. 9 EU-RL)',
    ref: 'reporting',
    questions: [
      'Wissen Sie, wie hoch Ihr unbereinigter Gender Pay Gap ist?',
      'Haben Sie Ihren bereinigten GPG berechnet?',
      'Haben Sie Daten über GPG nach Abteilung / Hierarchieebene?',
      'Können Sie den GPG objektiv erklären (nicht-diskriminierend)?',
      'Sind Sie auf die Berichtspflicht 2027 vorbereitet?',
    ],
  },
  {
    title: 'Prozesse (Art. 7, 10 EU-RL)',
    ref: 'prozesse',
    questions: [
      'Haben Sie einen Prozess für Auskunftsanfragen?',
      'Antworten Sie auf Auskunftsanfragen innerhalb von 2 Monaten?',
      'Gibt es bei Ihnen eine Beschwerdestelle für Entgeltdiskriminierung?',
      'Schulen Sie HR und Führungskräfte zu Entgeltgleichheit?',
      'Haben Sie den Betriebsrat in die Vergütungsstrategie eingebunden?',
    ],
  },
];

const totalQuestions = categories.reduce((sum, c) => sum + c.questions.length, 0);

/* ───── FAQs ───── */
const faqs = [
  {
    q: 'Was prüft der Vergütungssystem-Selbsttest?',
    a: 'Der Test prüft 20 zentrale Anforderungen der EU-Entgelttransparenzrichtlinie 2023/970 in vier Bereichen: Transparenz (Art. 6), Gleichwertigkeit (Art. 4), Reporting (Art. 9) und Prozesse (Art. 7, 10). Er gibt Ihnen einen Überblick, wie gut Ihr Unternehmen auf die Pflichten ab 2026/2027 vorbereitet ist.',
  },
  {
    q: 'Ist das Ergebnis rechtlich bindend?',
    a: 'Nein. Der Selbsttest dient der unverbindlichen Erstorientierung. Er ersetzt kein vollständiges Compliance-Audit durch einen Fachanwalt. Die Ergebnisse helfen Ihnen jedoch, Schwachstellen zu identifizieren und Prioritäten für die Umsetzung zu setzen.',
  },
  {
    q: 'Was passiert, wenn wir schlecht abschneiden?',
    a: 'Ein niedriger Score bedeutet nicht, dass sofort Bußgelder drohen — die Berichtspflichten greifen stufenweise ab 2027. Aber: Je früher Sie Lücken schließen, desto günstiger ist die Umsetzung. Ein Fachanwalt kann die kritischen Bereiche priorisieren und einen realistischen Fahrplan erstellen.',
  },
];

/* ───── Result calculation ───── */
type ResultLevel = 'green' | 'yellow' | 'red';

function getResultLevel(score: number): ResultLevel {
  if (score >= 16) return 'green';
  if (score >= 10) return 'yellow';
  return 'red';
}

/* ───── Component ───── */
export default function VergütungssystemSelbsttestPage() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(questionIndex: number, value: boolean) {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
  }

  function handleSubmit() {
    // Check if all questions answered
    const allAnswered = Array.from({ length: totalQuestions }, (_, i) => i).every(
      (i) => answers[i] !== undefined && answers[i] !== null
    );
    if (!allAnswered) return;
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Calculate scores
  const score = Object.values(answers).filter((v) => v === true).length;
  const resultLevel = getResultLevel(score);

  // Per-category scores
  let globalIndex = 0;
  const categoryScores = categories.map((cat) => {
    let catScore = 0;
    const neinQuestions: string[] = [];
    cat.questions.forEach((q, qi) => {
      const idx = globalIndex + qi;
      if (answers[idx] === true) catScore++;
      if (answers[idx] === false) neinQuestions.push(q);
    });
    globalIndex += cat.questions.length;
    return { title: cat.title, score: catScore, total: cat.questions.length, neinQuestions };
  });

  // Count answered questions
  const answeredCount = Object.values(answers).filter((v) => v !== undefined && v !== null).length;
  const allAnswered = answeredCount === totalQuestions;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/vergütungssystem-selbsttest/`}
        pageTitle="Vergütungssystem-Selbsttest"
        pageDescription="Testen Sie in 20 Fragen, ob Ihr Vergütungssystem der EU-Entgelttransparenzrichtlinie standhält. Kostenloser Selbsttest von APOS Legal."
        pageType="WebApplication"
        appName="Vergütungssystem-Selbsttest"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitgeber', url: `${SEO_CONFIG.baseUrl}/arbeitgeber/` },
          { name: 'Vergütungssystem-Selbsttest', url: `${SEO_CONFIG.baseUrl}/vergütungssystem-selbsttest/` },
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
      <div className="bg-accent-50 pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[100px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-accent-700 no-underline hover:underline">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitgeber" className="text-accent-700 no-underline hover:underline">Arbeitgeber</Link>
            <span className="mx-2">/</span>
            <span>Vergütungssystem-Selbsttest</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Vergütungssystem-Selbsttest &mdash; 20 Fragen zur Compliance
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Prüfen Sie in 20 Ja/Nein-Fragen, ob Ihr Vergütungssystem den Anforderungen der
            EU-Entgelttransparenzrichtlinie 2023/970 standhält.
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              <strong>Vergütungssystem prüfen:</strong> Die EU-Entgelttransparenzrichtlinie 2023/970 verlangt von
              Unternehmen <strong>objektive, geschlechtsneutrale Vergütungskriterien</strong>, Auskunftspflichten
              und regelmäßige Berichterstattung. Dieser Selbsttest deckt die vier zentralen Bereiche ab:
              Transparenz, Gleichwertigkeit, Reporting und Prozesse.
            </p>
          </div>
        </div>
      </section>

      {showResult ? (
        /* ───── RESULT VIEW ───── */
        <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px] ergebnis-box">
              <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ergebnis</h2>

              {/* Overall Score Badge */}
              <div
                className={`rounded-sm border-2 p-6 text-center mb-8 ${
                  resultLevel === 'green'
                    ? 'border-secondary bg-secondary-50'
                    : resultLevel === 'yellow'
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-red-400 bg-red-50'
                }`}
              >
                <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-2 text-ink-muted">
                  Gesamtergebnis
                </div>
                <div className="font-serif text-[2.5rem] font-bold mb-2">
                  {score}/{totalQuestions}
                </div>
                <div
                  className={`inline-block py-1.5 px-4 text-white rounded-sm text-[0.85rem] font-semibold mb-3 ${
                    resultLevel === 'green'
                      ? 'bg-secondary-600'
                      : resultLevel === 'yellow'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                >
                  {resultLevel === 'green' && 'Gut aufgestellt — kleiner Feinschliff'}
                  {resultLevel === 'yellow' && 'Handlungsbedarf in mehreren Bereichen'}
                  {resultLevel === 'red' && 'Dringend: Strukturelle Lücken mit hohem Haftungsrisiko'}
                </div>
                <p className="text-[0.92rem] text-ink-light leading-relaxed max-w-[560px] mx-auto">
                  {resultLevel === 'green' &&
                    'Ihr Vergütungssystem erfüllt die wesentlichen Anforderungen der EU-Richtlinie. Schließen Sie die verbleibenden Lücken, um vollständig audit-ready zu sein.'}
                  {resultLevel === 'yellow' &&
                    'Mehrere Bereiche zeigen Handlungsbedarf. Priorisieren Sie die Umsetzung, um bis zur Berichtspflicht 2027 vorbereitet zu sein.'}
                  {resultLevel === 'red' &&
                    'Ihr Vergütungssystem weist erhebliche Lücken auf, die ein hohes Haftungsrisiko bergen. Handeln Sie jetzt, um Bußgelder und Schadensersatzansprüche zu vermeiden.'}
                </p>
              </div>

              {/* Per-Category Breakdown */}
              <h3 className="font-serif text-[1.1rem] font-bold mb-4">Ergebnis nach Kategorie</h3>
              <div className="space-y-4 mb-8">
                {categoryScores.map((cat) => (
                  <div key={cat.title} className="bg-accent-50 border border-accent/20 rounded p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-serif text-[0.95rem] font-bold text-ink">{cat.title}</h4>
                      <span
                        className={`text-[0.85rem] font-bold ${
                          cat.score === cat.total
                            ? 'text-secondary-700'
                            : cat.score >= cat.total * 0.6
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {cat.score}/{cat.total}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-accent-100 rounded-full overflow-hidden mb-3">
                      <div
                        className={`h-full rounded-full transition-all ${
                          cat.score === cat.total
                            ? 'bg-secondary-500'
                            : cat.score >= cat.total * 0.6
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                        }`}
                        style={{ width: `${(cat.score / cat.total) * 100}%` }}
                      />
                    </div>

                    {/* Nein questions as action items */}
                    {cat.neinQuestions.length > 0 && (
                      <div className="mt-2">
                        <div className="text-[0.78rem] font-semibold text-ink-muted uppercase tracking-wider mb-1.5">
                          Handlungsbedarf:
                        </div>
                        <ul className="space-y-1.5">
                          {cat.neinQuestions.map((q, i) => (
                            <li key={i} className="flex gap-2 text-[0.85rem] text-ink-muted">
                              <span className="text-red-500 shrink-0 mt-0.5">&times;</span>
                              <span>{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="py-5 px-6 bg-accent-50 rounded-sm border-l-[3px] border-accent">
                <p className="text-[0.95rem] text-ink mb-3">
                  <strong>Vollständiges Audit anfragen &mdash; wir schließen die Lücken</strong>
                </p>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">
                  Ein Fachanwalt analysiert Ihre Vergütungsstrukturen im Detail, priorisiert die Maßnahmen
                  und erstellt einen konkreten Fahrplan für die EU-Compliance.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-block py-3 px-6 bg-accent-700 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-accent-800 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)]"
                >
                  Audit anfragen &rarr;
                </Link>
              </div>

              {/* Reset */}
              <button
                onClick={reset}
                className="mt-6 text-[0.85rem] text-ink-muted bg-transparent border-none cursor-pointer hover:text-accent-700 transition-colors font-sans"
              >
                Selbsttest wiederholen &rarr;
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* ───── QUESTION VIEW ───── */
        <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              {/* Progress indicator */}
              <div className="mb-8 bg-accent-50 rounded-sm p-4 flex items-center justify-between">
                <span className="text-[0.85rem] text-ink-muted font-semibold">
                  Beantwortet: {answeredCount} / {totalQuestions}
                </span>
                <div className="w-48 h-2 bg-accent-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-600 rounded-full transition-all"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {(() => {
                let qIndex = 0;
                return categories.map((cat) => {
                  const startIndex = qIndex;
                  const categoryBlock = (
                    <div key={cat.ref} className="mb-10">
                      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2">
                        {cat.title}
                      </div>
                      <div className="space-y-4">
                        {cat.questions.map((q, qi) => {
                          const idx = startIndex + qi;
                          return (
                            <div
                              key={idx}
                              className="bg-slate-50 border border-border-light rounded p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                            >
                              <div className="flex gap-3 items-start flex-1">
                                <span className="text-[0.85rem] font-bold text-accent-700 min-w-[28px] mt-0.5">
                                  {idx + 1}.
                                </span>
                                <span className="text-[0.92rem] text-ink leading-relaxed">{q}</span>
                              </div>
                              <div className="flex gap-2 shrink-0 sm:ml-4">
                                <button
                                  onClick={() => handleAnswer(idx, true)}
                                  className={`py-2 px-5 rounded-sm text-[0.85rem] font-semibold cursor-pointer transition-all border ${
                                    answers[idx] === true
                                      ? 'bg-accent-700 text-white border-accent-700'
                                      : 'bg-white text-ink border-border hover:border-accent-600 hover:text-accent-700'
                                  }`}
                                >
                                  Ja
                                </button>
                                <button
                                  onClick={() => handleAnswer(idx, false)}
                                  className={`py-2 px-5 rounded-sm text-[0.85rem] font-semibold cursor-pointer transition-all border ${
                                    answers[idx] === false
                                      ? 'bg-red-500 text-white border-red-500'
                                      : 'bg-white text-ink border-border hover:border-red-400 hover:text-red-600'
                                  }`}
                                >
                                  Nein
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                  qIndex += cat.questions.length;
                  return categoryBlock;
                });
              })()}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`w-full py-3.5 rounded-sm font-sans text-base font-semibold cursor-pointer transition-all border-none ${
                  allAnswered
                    ? 'bg-accent-700 text-white hover:bg-accent-800 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(37,99,235,0.25)]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {allAnswered
                  ? 'Ergebnis anzeigen'
                  : `Noch ${totalQuestions - answeredCount} Frage${totalQuestions - answeredCount === 1 ? '' : 'n'} offen`}
              </button>

              {/* Disclaimer */}
              <p className="text-[0.75rem] text-ink-muted mt-6 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen Erstorientierung und
                ersetzt kein vollständiges Compliance-Audit. Für eine verbindliche Einschätzung wenden Sie sich
                bitte an einen{' '}
                <Link href="/kontakt" className="text-accent-700 no-underline hover:underline">
                  Fachanwalt für Arbeitsrecht
                </Link>.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-slate-50 max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Vergütungssystem-Selbsttest
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-accent-700 text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Compliance sichern &mdash; bevor die Berichtspflicht greift
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Wir analysieren Ihr Vergütungssystem, schließen Lücken und machen Sie audit-ready
            für die EU-Entgelttransparenzrichtlinie.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
