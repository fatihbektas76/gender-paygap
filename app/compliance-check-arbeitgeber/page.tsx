'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import { SEO_CONFIG } from '@/lib/seo-config';

const questions = [
  {
    id: 'mitarbeiter',
    text: 'Wie viele Mitarbeiter hat Ihr Unternehmen?',
    options: ['< 50', '50–99', '100–249', '250–499', '500+'],
    scores: [0, 1, 1, 2, 2],
    recommendations: {
      good: 'Ihre Unternehmensgröße bringt bereits Berichtspflichten mit sich — gut, dass Sie vorbereitet sind.',
      warn: 'Ab 50 Mitarbeitern gelten individuelle Auskunftsrechte. Prüfen Sie Ihre Prozesse.',
      bad: 'Auch Unternehmen unter 50 Mitarbeitern sollten sich auf die Entgelttransparenz vorbereiten — das Auskunftsrecht kann durch Betriebsvereinbarungen erweitert werden.',
    },
  },
  {
    id: 'stellenanzeigen',
    text: 'Enthalten Ihre Stellenanzeigen transparente Gehaltsspannen?',
    options: ['Ja', 'Nein', 'Teilweise'],
    scores: [2, 0, 1],
    recommendations: {
      good: 'Sehr gut — Gehaltsspannen in Stellenanzeigen sind ab Juni 2026 Pflicht (Art. 5 EU-RL).',
      warn: 'Nur teilweise umgesetzt: Stellen Sie sicher, dass alle Stellenanzeigen eine Gehaltsspanne enthalten.',
      bad: 'Dringend handeln: Ab Juni 2026 müssen alle Stellenanzeigen eine Gehaltsspanne enthalten (Art. 5 EU-RL 2023/970).',
    },
  },
  {
    id: 'kriterien',
    text: 'Haben Sie dokumentierte, objektive Kriterien für die Gehaltsfestlegung?',
    options: ['Ja', 'Nein', 'In Arbeit'],
    scores: [2, 0, 1],
    recommendations: {
      good: 'Dokumentierte Vergütungskriterien sind die Grundlage für eine rechtssichere Entgeltstruktur.',
      warn: 'Sie arbeiten daran — beschleunigen Sie den Prozess, um vor Juni 2026 fertig zu sein.',
      bad: 'Ohne dokumentierte Kriterien können Sie Entgeltunterschiede nicht rechtfertigen. Die Beweislastumkehr (Art. 18) wird zum Risiko.',
    },
  },
  {
    id: 'gpg',
    text: 'Wissen Sie, wie hoch Ihr Gender Pay Gap ist?',
    options: ['Ja, unter 5%', 'Ja, über 5%', 'Nein'],
    scores: [2, 1, 0],
    recommendations: {
      good: 'Ein GPG unter 5% ist die kritische Schwelle — Sie liegen im sicheren Bereich.',
      warn: 'Ein GPG über 5% löst eine Pflicht zur gemeinsamen Entgeltbewertung mit dem Betriebsrat aus (Art. 10 EU-RL).',
      bad: 'Ohne Kenntnis Ihres GPG können Sie weder berichten noch handeln. Eine Analyse ist der erste Schritt.',
    },
  },
  {
    id: 'pruefung',
    text: 'Haben Sie Ihr Vergütungssystem in den letzten 2 Jahren geprüft?',
    options: ['Ja', 'Nein'],
    scores: [2, 0],
    recommendations: {
      good: 'Regelmäßige Prüfungen zeigen, dass Sie Compliance ernst nehmen.',
      warn: '',
      bad: 'Ohne regelmäßige Prüfung wissen Sie nicht, ob sich Entgeltunterschiede eingeschlichen haben. Ein Audit schafft Klarheit.',
    },
  },
];

const faqs = [
  {
    question: 'Was prüft der Compliance-Check?',
    answer:
      'Der Check prüft in 5 Fragen, ob Ihr Unternehmen auf die Pflichten der EU-Entgelttransparenzrichtlinie 2023/970 vorbereitet ist: Gehaltsspannen in Stellenanzeigen, dokumentierte Vergütungskriterien, Kenntnis des eigenen Gender Pay Gap und regelmäßige Überprüfung.',
  },
  {
    question: 'Ab wann gelten die neuen Pflichten?',
    answer:
      'Das individuelle Auskunftsrecht gilt ab dem 7. Juni 2026 für alle Unternehmen mit mehr als 50 Mitarbeitern. Die Berichtspflicht beginnt 2027 für Unternehmen ab 250 Mitarbeitern.',
  },
  {
    question: 'Was passiert bei Verstößen?',
    answer:
      'Verstöße gegen die Entgelttransparenzrichtlinie können zu Bußgeldern, Nachzahlungsansprüchen und Schadensersatzforderungen führen. Die Beweislastumkehr (Art. 18 EU-RL) bedeutet: Ihr Unternehmen muss beweisen, dass keine Diskriminierung vorliegt.',
  },
];

type Ampel = 'gruen' | 'gelb' | 'rot';

function getAmpel(score: number): Ampel {
  if (score >= 8) return 'gruen';
  if (score >= 5) return 'gelb';
  return 'rot';
}

const ampelConfig = {
  gruen: {
    label: 'Gut aufgestellt',
    sublabel: 'Kleiner Feinschliff nötig',
    bgClass: 'bg-secondary-50',
    borderClass: 'border-secondary',
    badgeClass: 'bg-secondary text-white',
    textClass: 'text-secondary-700',
  },
  gelb: {
    label: 'Handlungsbedarf',
    sublabel: 'In 2\u20133 Bereichen — jetzt handeln',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-500 text-white',
    textClass: 'text-amber-700',
  },
  rot: {
    label: 'Dringender Handlungsbedarf',
    sublabel: 'Risiko erheblich',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-400',
    badgeClass: 'bg-red-600 text-white',
    textClass: 'text-red-700',
  },
};

export default function ComplianceCheckPage() {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => selectedOptions[q.id] !== undefined);
  const totalScore = questions.reduce((sum, q) => {
    const idx = selectedOptions[q.id];
    return sum + (idx !== undefined ? q.scores[idx] : 0);
  }, 0);
  const ampel = getAmpel(totalScore);
  const config = ampelConfig[ampel];

  function handleSelect(questionId: string, optionIndex: number) {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (submitted) setSubmitted(false);
  }

  function handleSubmit() {
    if (allAnswered) setSubmitted(true);
  }

  function getScore(q: typeof questions[number]): number | undefined {
    const idx = selectedOptions[q.id];
    if (idx === undefined) return undefined;
    return q.scores[idx];
  }

  function getRecommendation(q: typeof questions[number]): string {
    const score = getScore(q);
    if (score === undefined) return '';
    if (score >= 2) return q.recommendations.good;
    if (score === 1) return q.recommendations.warn;
    return q.recommendations.bad;
  }

  return (
    <main>
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Start',
                item: `${SEO_CONFIG.baseUrl}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Arbeitgeber',
                item: `${SEO_CONFIG.baseUrl}/arbeitgeber/`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Compliance-Check',
                item: `${SEO_CONFIG.baseUrl}/compliance-check-arbeitgeber/`,
              },
            ],
          }),
        }}
      />

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="bg-accent-50 pt-[120px] pb-[50px] px-8 border-b border-border">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-accent no-underline hover:underline">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitgeber" className="text-accent no-underline hover:underline">
              Arbeitgeber
            </Link>
            <span className="mx-2">/</span>
            <span>Compliance-Check</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Compliance-Check Entgelttransparenz &mdash; Sind Sie vorbereitet?
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            In 5 Fragen prüfen Sie, ob Ihr Unternehmen auf die Pflichten der
            EU-Entgelttransparenzrichtlinie 2023/970 vorbereitet ist. Ergebnis sofort als Ampel-Check.
          </p>
        </div>
      </div>

      {/* Check */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[700px]">
            <div className="space-y-8">
              {questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="bg-slate-50 border border-border-light rounded p-6 sm:p-8"
                >
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2">
                    Frage {qIdx + 1} von {questions.length}
                  </div>
                  <h2 className="font-serif text-[1.1rem] font-bold mb-4">{q.text}</h2>
                  <div className="space-y-2.5">
                    {q.options.map((option, oIdx) => {
                      const isSelected = selectedOptions[q.id] === oIdx;
                      return (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-accent bg-accent-50'
                              : 'border-border bg-white hover:border-accent/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={oIdx}
                            checked={isSelected}
                            onChange={() => handleSelect(q.id, oIdx)}
                            className="w-4 h-4 accent-accent-600"
                          />
                          <span className="text-[0.92rem] text-ink">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-8 ${
                allAnswered
                  ? 'bg-accent-700 text-white hover:bg-accent-800 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(59,130,246,0.25)]'
                  : 'bg-slate-200 text-ink-muted cursor-not-allowed'
              }`}
            >
              Compliance-Check auswerten
            </button>

            <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
              Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche
              Einschätzung wenden Sie sich bitte an einen{' '}
              <Link href="/kontakt" className="text-accent no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Result */}
      {submitted && (
        <section className="py-[70px] px-8 bg-slate-50">
          <div className="max-w-content mx-auto">
            <div className="max-w-[700px]">
              <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
                Ihr Ergebnis
              </h2>

              {/* Ampel Score Card */}
              <div
                className={`rounded-sm border-2 p-8 text-center ${config.borderClass} ${config.bgClass}`}
              >
                <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase mb-2 text-ink-muted">
                  Compliance-Score
                </div>
                <div className="font-serif text-[2.5rem] font-bold mb-3">
                  {totalScore} / 10
                </div>
                <div
                  className={`inline-block py-2 px-5 rounded-sm text-[0.9rem] font-semibold mb-2 ${config.badgeClass}`}
                >
                  {config.label}
                </div>
                <p className={`text-[0.95rem] font-medium ${config.textClass}`}>
                  {config.sublabel}
                </p>
              </div>

              {/* Individual Recommendations */}
              <div className="mt-8 space-y-4">
                <h3 className="font-serif text-[1.15rem] font-bold">
                  Individuelle Empfehlungen
                </h3>
                {questions.map((q) => {
                  const score = getScore(q) ?? 0;
                  const recommendation = getRecommendation(q);
                  const icon =
                    score >= 2 ? '\u2713' : score === 1 ? '\u26A0' : '\u2717';
                  const iconColor =
                    score >= 2
                      ? 'text-secondary-600'
                      : score === 1
                        ? 'text-amber-600'
                        : 'text-red-600';
                  return (
                    <div
                      key={q.id}
                      className="flex gap-3 p-4 bg-white border border-border-light rounded-sm"
                    >
                      <span className={`text-[1.2rem] font-bold ${iconColor} shrink-0 mt-0.5`}>
                        {icon}
                      </span>
                      <div>
                        <div className="text-[0.88rem] font-semibold text-ink mb-1">
                          {q.text}
                        </div>
                        <div className="text-[0.85rem] text-ink-muted leading-relaxed">
                          {recommendation}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA based on result */}
              <div className="mt-8 py-6 px-6 bg-white rounded-sm border-l-[3px] border-accent">
                {ampel === 'gruen' ? (
                  <>
                    <p className="text-[0.95rem] text-ink mb-3">
                      <strong>
                        Sie sind gut aufgestellt. Ein Audit sichert Ihre Position ab und
                        dokumentiert Ihre Compliance.
                      </strong>
                    </p>
                    <Link
                      href="/kontakt"
                      className="inline-block py-3 px-6 bg-accent-700 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-accent-800"
                    >
                      Audit zur Absicherung anfragen &rarr;
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-[0.95rem] text-ink mb-3">
                      <strong>
                        {ampel === 'rot'
                          ? 'Dringender Handlungsbedarf: Ohne Vorbereitung riskieren Sie Bußgelder, Nachzahlungen und Reputationsschäden.'
                          : 'Handlungsbedarf erkannt: Schließen Sie die Lücken, bevor die Richtlinie in Kraft tritt.'}
                      </strong>
                    </p>
                    <Link
                      href="/kontakt"
                      className="inline-block py-3 px-6 bg-accent-700 text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-accent-800"
                    >
                      Beratungstermin buchen &rarr;
                    </Link>
                  </>
                )}
              </div>

              {/* Link to Sanktionsrechner */}
              <div className="mt-6 p-5 bg-white border border-border-light rounded-sm">
                <p className="text-[0.92rem] text-ink mb-3">
                  <strong>Was kostet Non-Compliance in Euro?</strong>
                </p>
                <Link
                  href="/compliance-check-arbeitgeber/sanktionsrechner"
                  className="text-accent font-semibold text-[0.92rem] no-underline hover:underline"
                >
                  Berechnen Sie Ihr Sanktionsrisiko &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-accent-700 mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zum Compliance-Check
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-accent-700 text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Compliance-Audit anfragen &mdash; kostenlose Ersteinschätzung
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Wir prüfen Ihre Vergütungsstrukturen und machen Sie fit für die
            EU-Entgelttransparenzrichtlinie 2026.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-accent-700 hover:bg-accent-50 hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-8 bg-slate-50 border-t border-border">
        <div className="max-w-content mx-auto">
          <p className="text-[0.78rem] text-ink-muted leading-relaxed max-w-[740px]">
            <strong>Rechtlicher Hinweis:</strong> Dieser Compliance-Check dient der unverbindlichen
            Erstorientierung. Die Ergebnisse stellen keine Rechtsberatung dar und ersetzen keine
            individuelle anwaltliche Prüfung. Alle Angaben basieren auf der EU-Entgelttransparenzrichtlinie
            2023/970 und dem aktuellen Stand der deutschen Umsetzungsgesetzgebung.
          </p>
        </div>
      </section>
    </main>
  );
}
