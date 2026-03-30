'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

const faqs = [
  {
    question: 'Was ist der Unterschied zwischen unbereinigtem und bereinigtem GPG?',
    answer:
      'Der unbereinigte Gender Pay Gap vergleicht die durchschnittlichen Bruttoverdienste von Männern und Frauen ohne Berücksichtigung struktureller Unterschiede. Der bereinigte GPG rechnet Faktoren wie Teilzeitquote, Branche, Berufserfahrung und Hierarchieebene heraus. Statistisch sind rund 40% des unbereinigten GPG durch solche Strukturfaktoren erklärbar — der Rest ist die tatsächliche, nicht gerechtfertigte Entgeltlücke.',
  },
  {
    question: 'Ab welchem GPG besteht Handlungsbedarf?',
    answer:
      'Nach Art. 9 der EU-Entgelttransparenzrichtlinie 2023/970 ist ein bereinigter Gender Pay Gap von mehr als 5% die kritische Schwelle. Kann dieser Unterschied nicht durch objektive, geschlechtsneutrale Kriterien gerechtfertigt werden, ist eine gemeinsame Entgeltbewertung mit den Arbeitnehmervertretern verpflichtend. Für Unternehmen ab 250 Mitarbeitern gilt diese Pflicht ab 2027.',
  },
  {
    question: 'Was bedeutet die Entgeltbewertung mit dem Betriebsrat?',
    answer:
      'Art. 10 der EU-Richtlinie 2023/970 verpflichtet Arbeitgeber bei einem bereinigten GPG über 5% zur gemeinsamen Entgeltbewertung mit den Arbeitnehmervertretern (Betriebsrat). Dabei werden die Vergütungsstrukturen analysiert, Ursachen identifiziert und innerhalb von 6 Monaten ein Aktionsplan mit konkreten Maßnahmen zur Beseitigung der Entgeltunterschiede erstellt.',
  },
];

type Ampel = 'gruen' | 'gelb' | 'rot';

const ampelConfig = {
  gruen: {
    label: 'Grün',
    sublabel: 'Bereinigter GPG unter 2%',
    bgClass: 'bg-green-bg',
    borderClass: 'border-green',
    badgeClass: 'bg-green text-white',
    textClass: 'text-green',
    dotColor: 'bg-green',
  },
  gelb: {
    label: 'Gelb',
    sublabel: 'Bereinigter GPG zwischen 2% und 5%',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-400',
    badgeClass: 'bg-amber-500 text-white',
    textClass: 'text-amber-700',
    dotColor: 'bg-amber-500',
  },
  rot: {
    label: 'Rot',
    sublabel: 'Bereinigter GPG über 5%',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-400',
    badgeClass: 'bg-red-600 text-white',
    textClass: 'text-red-700',
    dotColor: 'bg-red-600',
  },
};

export default function EntgeltlueckenAmpelPage() {
  const [mitarbeiterGesamt, setMitarbeiterGesamt] = useState('');
  const [mitarbeiterWeiblich, setMitarbeiterWeiblich] = useState('');
  const [gehaltM, setGehaltM] = useState('');
  const [gehaltF, setGehaltF] = useState('');
  const [variableBestandteile, setVariableBestandteile] = useState<boolean | null>(null);
  const [tarifgebunden, setTarifgebunden] = useState<boolean | null>(null);
  const [result, setResult] = useState<{
    unbereinigterGPG: number;
    bereinigtGPG: number;
    risiko: Ampel;
  } | null>(null);

  function calculate() {
    const gM = parseFloat(gehaltM) || 0;
    const gF = parseFloat(gehaltF) || 0;

    if (gM <= 0) return;

    const unbereinigterGPG = ((gM - gF) / gM) * 100;
    // Bereinigung: Strukturfaktoren schätzen (Teilzeit, Hierarchie)
    const bereinigtGPG = unbereinigterGPG * 0.6; // Faustregel: ~40% strukturell erklärbar
    const risiko: Ampel = bereinigtGPG < 2 ? 'gruen' : bereinigtGPG < 5 ? 'gelb' : 'rot';

    setResult({
      unbereinigterGPG: Math.round(unbereinigterGPG * 100) / 100,
      bereinigtGPG: Math.round(bereinigtGPG * 100) / 100,
      risiko,
    });
  }

  const allFilled =
    mitarbeiterGesamt !== '' &&
    mitarbeiterWeiblich !== '' &&
    gehaltM !== '' &&
    gehaltF !== '' &&
    variableBestandteile !== null &&
    tarifgebunden !== null;

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/entgeltluecken-ampel/`}
        pageTitle="Entgeltlücken-Ampel — Gender Pay Gap prüfen"
        pageDescription="Berechnen Sie den Gender Pay Gap Ihres Unternehmens und erhalten Sie eine Ampel-Bewertung mit Handlungsempfehlungen."
        pageType="WebApplication"
        appName="Entgeltlücken-Ampel"
        appCategory="Legal Tool"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitgeber', url: `${SEO_CONFIG.baseUrl}/arbeitgeber/` },
          { name: 'Entgeltlücken-Ampel', url: `${SEO_CONFIG.baseUrl}/entgeltluecken-ampel/` },
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
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />

      {/* Header */}
      <div className="bg-cream-dark pt-[120px] pb-[50px] px-8 border-b border-border">
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
            <span>Entgeltlücken-Ampel</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Entgeltlücken-Ampel &mdash; Gender Pay Gap Ihres Unternehmens prüfen
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie den unbereinigten und bereinigten Gender Pay Gap Ihres Unternehmens
            und erhalten Sie eine Ampel-Bewertung mit konkreten Handlungsempfehlungen.
          </p>
        </div>
      </div>

      {/* Direktantwort-Block (GEO) */}
      <section className="py-6 px-8 bg-white border-b border-border">
        <div className="max-w-content mx-auto">
          <div id="direktantwort" className="max-w-[740px] text-[0.95rem] text-ink-light leading-relaxed">
            <p className="m-0">
              Die <strong>Entgeltlücken-Ampel</strong> berechnet den Gender Pay Gap Ihres
              Unternehmens in zwei Stufen: den <strong>unbereinigten GPG</strong> (reiner
              Gehaltsvergleich) und den <strong>bereinigten GPG</strong> (nach Abzug
              struktureller Faktoren wie Teilzeit und Hierarchie). Ab einem bereinigten
              GPG von <strong>5%</strong> ist eine gemeinsame Entgeltbewertung mit dem
              Betriebsrat Pflicht (Art. 9 EU-RL 2023/970).
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[600px]">
            <div className="bg-cream border border-border-light rounded p-8">
              <h2 className="font-serif text-[1.2rem] font-bold mb-5">
                Unternehmensdaten eingeben
              </h2>
              <div className="space-y-5">
                {/* 1. Anzahl Mitarbeiter gesamt */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Anzahl Mitarbeiter gesamt
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={mitarbeiterGesamt}
                    onChange={(e) => setMitarbeiterGesamt(e.target.value)}
                    placeholder="z. B. 250"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,90,128,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                {/* 2. Anzahl weiblicher Mitarbeiter */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    Anzahl weiblicher Mitarbeiter
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={mitarbeiterWeiblich}
                    onChange={(e) => setMitarbeiterWeiblich(e.target.value)}
                    placeholder="z. B. 120"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,90,128,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                {/* 3. Ø Jahresgehalt Männer */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    &Oslash; Jahresgehalt Männer in &euro;
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={gehaltM}
                    onChange={(e) => setGehaltM(e.target.value)}
                    placeholder="z. B. 55000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,90,128,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                {/* 4. Ø Jahresgehalt Frauen */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-1.5">
                    &Oslash; Jahresgehalt Frauen in &euro;
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={gehaltF}
                    onChange={(e) => setGehaltF(e.target.value)}
                    placeholder="z. B. 48000"
                    className="w-full py-3 px-4 border border-border rounded-sm font-sans text-[0.92rem] text-ink bg-white transition-all outline-none focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,90,128,0.1)] placeholder:text-ink-muted"
                  />
                </div>

                {/* 5. Variable Gehaltsbestandteile */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-2.5">
                    Haben Sie variable Gehaltsbestandteile?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setVariableBestandteile(true)}
                      className={`flex-1 py-2.5 rounded-sm font-sans text-[0.92rem] font-semibold border transition-all cursor-pointer ${
                        variableBestandteile === true
                          ? 'bg-blue text-white border-blue'
                          : 'bg-white text-ink border-border hover:border-blue/50'
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      type="button"
                      onClick={() => setVariableBestandteile(false)}
                      className={`flex-1 py-2.5 rounded-sm font-sans text-[0.92rem] font-semibold border transition-all cursor-pointer ${
                        variableBestandteile === false
                          ? 'bg-blue text-white border-blue'
                          : 'bg-white text-ink border-border hover:border-blue/50'
                      }`}
                    >
                      Nein
                    </button>
                  </div>
                </div>

                {/* 6. Tarifgebunden */}
                <div>
                  <label className="block text-[0.84rem] font-semibold text-ink mb-2.5">
                    Sind Sie tarifgebunden?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setTarifgebunden(true)}
                      className={`flex-1 py-2.5 rounded-sm font-sans text-[0.92rem] font-semibold border transition-all cursor-pointer ${
                        tarifgebunden === true
                          ? 'bg-blue text-white border-blue'
                          : 'bg-white text-ink border-border hover:border-blue/50'
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      type="button"
                      onClick={() => setTarifgebunden(false)}
                      className={`flex-1 py-2.5 rounded-sm font-sans text-[0.92rem] font-semibold border transition-all cursor-pointer ${
                        tarifgebunden === false
                          ? 'bg-blue text-white border-blue'
                          : 'bg-white text-ink border-border hover:border-blue/50'
                      }`}
                    >
                      Nein
                    </button>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  disabled={!allFilled}
                  className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-2 ${
                    allFilled
                      ? 'bg-blue text-white hover:bg-blue hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]'
                      : 'bg-cream-dark text-ink-muted cursor-not-allowed'
                  }`}
                >
                  Gender Pay Gap berechnen
                </button>
              </div>
              <p className="text-[0.75rem] text-ink-muted mt-4 leading-relaxed">
                <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
                Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche
                Einschätzung wenden Sie sich bitte an einen{' '}
                <Link href="/kontakt" className="text-blue no-underline hover:underline">
                  Fachanwalt für Arbeitsrecht
                </Link>
                .
              </p>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 ergebnis-box">
                <h2 className="font-serif text-[1.4rem] font-bold mb-5">Ergebnis</h2>

                {/* Traffic Light Visual */}
                <div
                  className={`rounded-sm border-2 p-8 text-center ${ampelConfig[result.risiko].borderClass} ${ampelConfig[result.risiko].bgClass}`}
                >
                  {/* Ampel Visual */}
                  <div className="inline-flex flex-col items-center gap-2 bg-gray-800 rounded-[20px] p-3 mb-5">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        result.risiko === 'rot' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'bg-gray-600'
                      }`}
                    />
                    <div
                      className={`w-10 h-10 rounded-full ${
                        result.risiko === 'gelb' ? 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]' : 'bg-gray-600'
                      }`}
                    />
                    <div
                      className={`w-10 h-10 rounded-full ${
                        result.risiko === 'gruen' ? 'bg-green-500 shadow-[0_0_12px_rgba(43,76,53,0.6)]' : 'bg-gray-600'
                      }`}
                    />
                  </div>

                  <div
                    className={`inline-block py-2 px-5 rounded-sm text-[0.9rem] font-semibold mb-4 ${ampelConfig[result.risiko].badgeClass}`}
                  >
                    {ampelConfig[result.risiko].label}
                  </div>

                  {/* GPG Values */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-left">
                    <div className="bg-white/80 rounded-sm p-4">
                      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                        Unbereinigter GPG
                      </div>
                      <div className="font-serif text-[1.8rem] font-bold">
                        {result.unbereinigterGPG.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%
                      </div>
                    </div>
                    <div className="bg-white/80 rounded-sm p-4">
                      <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-1">
                        Bereinigter GPG (geschätzt)
                      </div>
                      <div className={`font-serif text-[1.8rem] font-bold ${ampelConfig[result.risiko].textClass}`}>
                        {result.bereinigtGPG.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning for GPG >= 5% */}
                {result.bereinigtGPG >= 5 && (
                  <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-sm">
                    <p className="text-[0.92rem] text-red-700 leading-relaxed m-0">
                      <strong>Achtung:</strong> Bei einem bereinigten GPG über 5% ist eine
                      gemeinsame Entgeltbewertung mit dem Betriebsrat Pflicht
                      (Art.&nbsp;9 EU-RL 2023/970).
                    </p>
                  </div>
                )}

                {/* Context: Tarifbindung */}
                {tarifgebunden && (
                  <div className="mt-4 p-4 bg-cream-dark border border-blue/30 rounded-sm">
                    <p className="text-[0.92rem] text-blue leading-relaxed m-0">
                      <strong>Tarifbindung:</strong> Tarifbindung reduziert das Risiko,
                      schließt es aber nicht aus. Auch tarifgebundene Unternehmen müssen
                      sicherstellen, dass übertarifliche Zulagen und Eingruppierungen
                      geschlechtsneutral erfolgen.
                    </p>
                  </div>
                )}

                {/* Context: Variable Gehaltsbestandteile */}
                {variableBestandteile && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-sm">
                    <p className="text-[0.92rem] text-amber-800 leading-relaxed m-0">
                      <strong>Variable Gehaltsbestandteile:</strong> Variable
                      Gehaltsbestandteile erhöhen das Risiko &mdash; sie sind oft
                      intransparent und diskriminierungsanfällig. Prüfen Sie, ob Boni,
                      Provisionen und Zulagen geschlechtsneutral vergeben werden.
                    </p>
                  </div>
                )}

                {/* Handlungsempfehlung */}
                <div className="mt-6 py-5 px-6 bg-cream rounded-sm border-l-[3px] border-blue">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2">
                    Handlungsempfehlung
                  </div>
                  {result.risiko === 'gruen' && (
                    <>
                      <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                        Ihr bereinigter GPG liegt unter 2%. Gut aufgestellt &mdash;
                        dokumentieren Sie Ihre Vergütungskriterien für den Fall einer
                        Auskunftsanfrage.
                      </p>
                      <Link
                        href="/kontakt"
                        className="inline-block py-3 px-6 bg-blue text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-blue"
                      >
                        Audit zur Absicherung anfragen &rarr;
                      </Link>
                    </>
                  )}
                  {result.risiko === 'gelb' && (
                    <>
                      <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                        Ihr bereinigter GPG liegt zwischen 2% und 5%. Handeln Sie jetzt:
                        Analysieren Sie die Ursachen und dokumentieren Sie objektive
                        Rechtfertigungen.
                      </p>
                      <Link
                        href="/kontakt"
                        className="inline-block py-3 px-6 bg-blue text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-blue"
                      >
                        Audit anfragen &mdash; bevor es teuer wird &rarr;
                      </Link>
                    </>
                  )}
                  {result.risiko === 'rot' && (
                    <>
                      <p className="text-[0.95rem] text-ink leading-relaxed mb-4">
                        Ihr bereinigter GPG liegt über 5%. Dringender Handlungsbedarf
                        &mdash; eine gemeinsame Entgeltbewertung ist ab 2027 verpflichtend.
                        Gleichzeitig steigt das Klagerisiko erheblich.
                      </p>
                      <Link
                        href="/kontakt"
                        className="inline-block py-3 px-6 bg-blue text-white border-none rounded-sm font-sans text-[0.92rem] font-bold no-underline transition-all hover:bg-blue hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,90,128,0.25)]"
                      >
                        Sofort Compliance-Audit anfragen &rarr;
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-[70px] px-8 bg-cream">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px]">
            <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
              Hintergrund
            </div>
            <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-5">
              Wie wird der Gender Pay Gap berechnet?
            </h2>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Der <strong>unbereinigte Gender Pay Gap</strong> vergleicht die
              durchschnittlichen Bruttoverdienste von Männern und Frauen direkt. Die Formel:
            </p>
            <div className="bg-white border border-border-light rounded-sm p-5 mb-5 text-center">
              <code className="text-[0.95rem] text-ink font-mono">
                Unbereinigter GPG = (Gehalt Männer &minus; Gehalt Frauen) / Gehalt Männer &times; 100
              </code>
            </div>
            <p className="text-[0.95rem] text-ink-light leading-relaxed mb-4">
              Der <strong>bereinigte GPG</strong> berücksichtigt strukturelle Faktoren wie
              Teilzeitquote, Hierarchieebene und Berufserfahrung. Statistisch sind rund 40%
              des unbereinigten GPG durch solche Strukturfaktoren erklärbar. Dieses Tool
              verwendet einen Bereinigungsfaktor von 0,6 als Durchschnittswert.
            </p>
            <p className="text-[0.95rem] text-ink-light leading-relaxed">
              Die EU-Entgelttransparenzrichtlinie 2023/970 setzt bei einem bereinigten GPG
              von <strong>5%</strong> die kritische Schwelle. Kann dieser Unterschied nicht
              durch objektive, geschlechtsneutrale Kriterien gerechtfertigt werden, greift
              die Pflicht zur gemeinsamen Entgeltbewertung mit dem Betriebsrat (Art. 10).
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zur Entgeltlücken-Ampel
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-blue text-white text-center">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-blue hover:bg-cream-dark hover:-translate-y-0.5"
          >
            Jetzt Kontakt aufnehmen &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 px-8 bg-cream border-t border-border">
        <div className="max-w-content mx-auto">
          <p className="text-[0.78rem] text-ink-muted leading-relaxed max-w-[740px]">
            <strong>Rechtlicher Hinweis:</strong> Alle Berechnungen sind Schätzungen und
            ersetzen keine anwaltliche Beratung. Der Bereinigungsfaktor von 0,6 ist ein
            statistischer Durchschnittswert &mdash; die tatsächliche Bereinigung hängt von
            unternehmensspezifischen Faktoren ab. Für eine exakte Analyse Ihres Gender Pay
            Gap wenden Sie sich an einen{' '}
            <Link href="/kontakt" className="text-blue no-underline hover:underline">
              Fachanwalt für Arbeitsrecht
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
