'use client';

import { useState } from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import SeoGeoBase from '@/components/SeoGeoBase';
import { SEO_CONFIG } from '@/lib/seo-config';

type DauerOption = '1-6' | '7-12' | '13-24' | '25-36' | 'ueber36';
type LeistungOption = 'Sehr gut' | 'Gut' | 'Befriedigend';
type GrundOption = 'Erfahrung' | 'Marktlage' | 'Leistung' | 'Keiner genannt';

const dauerLabels: Record<DauerOption, string> = {
  '1-6': '1\u20136 Monate',
  '7-12': '7\u201312 Monate',
  '13-24': '13\u201324 Monate',
  '25-36': '25\u201336 Monate',
  ueber36: 'Über 36 Monate',
};

const grundArgumente: Record<GrundOption, string> = {
  Erfahrung:
    'Erfahrung ist nur dann ein zulässiges Kriterium, wenn sie objektiv messbar und für die konkrete Tätigkeit relevant ist (Art. 4 Abs. 4 EU-RL 2023/970). Pauschale Verweise auf "mehr Erfahrung" ohne Bezug zur Tätigkeit genügen nicht. Der Arbeitgeber muss darlegen, welche konkreten Erfahrungen gehaltsrelevant sind und warum.',
  Marktlage:
    'Die "Marktlage" ist kein anerkanntes objektives Kriterium nach der EU-Entgelttransparenzrichtlinie. Art. 4 verlangt geschlechtsneutrale, objektive Kriterien wie Qualifikation, Belastung und Verantwortung. Ein Verweis auf Marktbedingungen kann eine geschlechtsspezifische Benachteiligung nicht rechtfertigen.',
  Leistung:
    'Leistungsbasierte Vergütung ist grundsätzlich zulässig, muss aber auf transparenten, geschlechtsneutralen Kriterien beruhen (Art. 4 Abs. 4 EU-RL 2023/970). Subjektive Leistungsbewertungen ohne dokumentierte Kriterien sind angreifbar. Wenn Ihre Leistungsbeurteilung gut oder sehr gut ist, spricht dies gegen eine leistungsbasierte Begründung der Gehaltsdifferenz.',
  'Keiner genannt':
    'Wenn der Arbeitgeber keinen Grund für die Entgeltdifferenz nennt, greift die Beweislastumkehr nach Art. 18 EU-RL 2023/970. Der Arbeitgeber muss beweisen, dass keine Entgeltdiskriminierung vorliegt. Das Fehlen einer Begründung stärkt Ihre Verhandlungsposition erheblich.',
};

const faqs = [
  {
    q: 'Wie nutze ich das Auskunftsrecht für eine Gehaltsverhandlung?',
    a: 'Nachdem Sie die Auskunft über den Median der Vergleichsgruppe erhalten haben, vergleichen Sie diesen mit Ihrem Gehalt. Liegt Ihr Gehalt unter dem Median, können Sie dies als sachliche Grundlage für eine Gehaltsverhandlung nutzen. Die Beweislastumkehr nach Art. 18 EU-RL 2023/970 bedeutet: Bei einer Entgeltdifferenz muss der Arbeitgeber beweisen, dass keine Diskriminierung vorliegt.',
  },
  {
    q: 'Welche Rolle spielt das BAG-Urteil vom 23.10.2025?',
    a: 'Das BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass ein Paarvergleich ausreicht, um eine Entgeltdiskriminierung glaubhaft zu machen. Sie müssen also nicht den Median einer ganzen Gruppe nachweisen — es genügt der Vergleich mit einer einzelnen Person in vergleichbarer Position. Das stärkt die Position von Arbeitnehmern erheblich.',
  },
  {
    q: 'Kann ich eine Nachzahlung für die Vergangenheit verlangen?',
    a: 'Ja. Nach Art. 21 EU-RL 2023/970 können Sie Entschädigung und Nachzahlung verlangen — rückwirkend für bis zu 3 Jahre. Der Anspruch umfasst die Differenz zum Vergleichsgehalt plus Zinsen plus ggf. immateriellen Schadensersatz. Die genaue Verjährungsfrist hängt von der nationalen Umsetzung ab.',
  },
];

function formatEuro(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GehaltsverhandlungVorbereiterPage() {
  const [gehalt, setGehalt] = useState('');
  const [vergleich, setVergleich] = useState('');
  const [dauer, setDauer] = useState<DauerOption | ''>('');
  const [leistung, setLeistung] = useState<LeistungOption | ''>('');
  const [grund, setGrund] = useState<GrundOption | ''>('');
  const [showResult, setShowResult] = useState(false);

  const gehaltNum = parseFloat(gehalt) || 0;
  const vergleichNum = parseFloat(vergleich) || 0;
  const differenz = vergleichNum - gehaltNum;
  const differenzProzent = gehaltNum > 0 ? ((differenz / gehaltNum) * 100).toFixed(1) : '0';

  const allFilled = gehaltNum > 0 && vergleichNum > 0 && dauer !== '' && leistung !== '' && grund !== '';

  function handleGenerate() {
    if (allFilled) {
      setShowResult(true);
      // Scroll to result on mobile
      setTimeout(() => {
        const el = document.getElementById('leitfaden-result');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function handleReset() {
    setGehalt('');
    setVergleich('');
    setDauer('');
    setLeistung('');
    setGrund('');
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main>
      <SeoGeoBase
        pageUrl={`${SEO_CONFIG.baseUrl}/gehaltsverhandlung-vorbereiter/`}
        pageTitle="Gehaltsverhandlung vorbereiten — Leitfaden nach Auskunftsrecht"
        pageDescription="Erstellen Sie einen strukturierten Gesprächsleitfaden für Ihre Gehaltsverhandlung auf Basis des Auskunftsrechts. Kostenlos."
        pageType="WebApplication"
        appName="Gehaltsverhandlungs-Vorbereiter"
        breadcrumbs={[
          { name: 'Start', url: `${SEO_CONFIG.baseUrl}/` },
          { name: 'Arbeitnehmer', url: `${SEO_CONFIG.baseUrl}/arbeitnehmer/` },
          {
            name: 'Gehaltsverhandlung vorbereiten',
            url: `${SEO_CONFIG.baseUrl}/gehaltsverhandlung-vorbereiter/`,
          },
        ]}
        isBasedOn={[
          {
            name: 'EU-Richtlinie 2023/970 zur Entgelttransparenz',
            url: 'https://eur-lex.europa.eu/eli/dir/2023/970/oj',
          },
          {
            name: 'BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025',
            url: 'https://www.bundesarbeitsgericht.de/',
          },
        ]}
        speakableSelectors={['#leitfaden-result']}
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
      <div className="bg-green-bg pt-[120px] pb-[50px] px-8 border-b border-border max-md:pt-[100px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <nav className="text-[0.84rem] text-ink-muted mb-6">
            <Link href="/" className="text-green no-underline hover:underline">
              Start
            </Link>
            <span className="mx-2">/</span>
            <Link href="/arbeitnehmer" className="text-green no-underline hover:underline">
              Arbeitnehmer
            </Link>
            <span className="mx-2">/</span>
            <span>Gehaltsverhandlung vorbereiten</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Gehaltsverhandlung vorbereiten &mdash; Leitfaden nach Auskunftsrecht
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Erstellen Sie einen strukturierten Gesprächsleitfaden für Ihre Gehaltsverhandlung
            auf Basis des Auskunftsrechts nach der EU-Entgelttransparenzrichtlinie 2023/970.
          </p>
          <div className="flex flex-wrap gap-5 mt-5 text-[0.88rem] text-ink-light">
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              5-Schritte-Leitfaden
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Kein Login
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="text-green" width="16" height="16" fill="none" viewBox="0 0 24 24">
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
              <strong>Gehaltsverhandlung nach Auskunftsrecht:</strong> Wenn Sie von Ihrem
              Arbeitgeber Auskunft über das Vergleichsgehalt erhalten haben und eine Differenz
              festgestellt wurde, steht Ihnen eine <strong>sachlich fundierte Verhandlungsgrundlage</strong> zur
              Verfügung. Dieser Leitfaden hilft Ihnen, das Gespräch strukturiert zu führen &mdash;
              gestützt auf <strong>Art. 7 EU-RL 2023/970</strong> und das{' '}
              <strong>BAG-Urteil Az. 8 AZR 300/24</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisite Note */}
      <section className="py-5 px-8 bg-green-bg border-b border-green/20 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[740px] flex gap-3 items-start">
            <svg
              className="text-green shrink-0 mt-0.5"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-[0.88rem] text-green leading-relaxed m-0">
              <strong>Voraussetzung:</strong> Sie haben bereits von Ihrem Arbeitgeber Auskunft
              über das Vergleichsgehalt (Median) erhalten. Falls nicht, nutzen Sie zuerst den{' '}
              <Link
                href="/auskunftsrecht-checker"
                className="text-green font-semibold no-underline hover:underline"
              >
                Auskunftsrecht-Checker
              </Link>{' '}
              und erstellen Sie ein{' '}
              <Link
                href="/auskunftsrecht-checker/schreiben-generator"
                className="text-green font-semibold no-underline hover:underline"
              >
                Muster-Auskunftsschreiben
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="max-w-[700px]">
            <h2 className="font-serif text-[1.2rem] font-bold mb-2">Ihre Daten eingeben</h2>
            <p className="text-[0.88rem] text-ink-muted mb-6">
              Alle Angaben bleiben in Ihrem Browser und werden nicht gespeichert.
            </p>

            <div className="space-y-5">
              {/* Gehalt */}
              <div className="bg-cream border border-border-light rounded p-5">
                <label
                  htmlFor="gehalt"
                  className="block text-[0.88rem] font-semibold text-ink mb-2"
                >
                  1. Mein aktuelles Bruttogehalt (EUR/Monat)
                </label>
                <input
                  id="gehalt"
                  type="number"
                  min="0"
                  step="100"
                  value={gehalt}
                  onChange={(e) => {
                    setGehalt(e.target.value);
                    setShowResult(false);
                  }}
                  placeholder="z.B. 4500"
                  className="w-full p-3 border border-border rounded-sm text-[0.92rem] text-ink font-sans bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
                />
              </div>

              {/* Vergleichsgehalt */}
              <div className="bg-cream border border-border-light rounded p-5">
                <label
                  htmlFor="vergleich"
                  className="block text-[0.88rem] font-semibold text-ink mb-2"
                >
                  2. Vergleichsgehalt laut Auskunft (EUR/Monat)
                </label>
                <input
                  id="vergleich"
                  type="number"
                  min="0"
                  step="100"
                  value={vergleich}
                  onChange={(e) => {
                    setVergleich(e.target.value);
                    setShowResult(false);
                  }}
                  placeholder="z.B. 5200"
                  className="w-full p-3 border border-border rounded-sm text-[0.92rem] text-ink font-sans bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
                />
              </div>

              {/* Dauer */}
              <div className="bg-cream border border-border-light rounded p-5">
                <label
                  htmlFor="dauer"
                  className="block text-[0.88rem] font-semibold text-ink mb-2"
                >
                  3. Differenz besteht seit
                </label>
                <select
                  id="dauer"
                  value={dauer}
                  onChange={(e) => {
                    setDauer(e.target.value as DauerOption);
                    setShowResult(false);
                  }}
                  className="w-full p-3 border border-border rounded-sm text-[0.92rem] text-ink font-sans bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
                >
                  <option value="">Bitte wählen</option>
                  <option value="1-6">1-6 Monate</option>
                  <option value="7-12">7-12 Monate</option>
                  <option value="13-24">13-24 Monate</option>
                  <option value="25-36">25-36 Monate</option>
                  <option value="ueber36">Über 36 Monate</option>
                </select>
              </div>

              {/* Leistung */}
              <div className="bg-cream border border-border-light rounded p-5">
                <label
                  htmlFor="leistung"
                  className="block text-[0.88rem] font-semibold text-ink mb-2"
                >
                  4. Meine Leistungsbeurteilung
                </label>
                <select
                  id="leistung"
                  value={leistung}
                  onChange={(e) => {
                    setLeistung(e.target.value as LeistungOption);
                    setShowResult(false);
                  }}
                  className="w-full p-3 border border-border rounded-sm text-[0.92rem] text-ink font-sans bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Sehr gut">Sehr gut</option>
                  <option value="Gut">Gut</option>
                  <option value="Befriedigend">Befriedigend</option>
                </select>
              </div>

              {/* Grund */}
              <div className="bg-cream border border-border-light rounded p-5">
                <label
                  htmlFor="grund"
                  className="block text-[0.88rem] font-semibold text-ink mb-2"
                >
                  5. Grund laut Arbeitgeber für die Gehaltsdifferenz
                </label>
                <select
                  id="grund"
                  value={grund}
                  onChange={(e) => {
                    setGrund(e.target.value as GrundOption);
                    setShowResult(false);
                  }}
                  className="w-full p-3 border border-border rounded-sm text-[0.92rem] text-ink font-sans bg-white focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-colors"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Erfahrung">Erfahrung</option>
                  <option value="Marktlage">Marktlage</option>
                  <option value="Leistung">Leistung</option>
                  <option value="Keiner genannt">Keiner genannt</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleGenerate}
              disabled={!allFilled}
              className={`w-full py-3.5 border-none rounded-sm font-sans text-base font-semibold cursor-pointer transition-all mt-6 ${
                allFilled
                  ? 'bg-green text-white hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]'
                  : 'bg-cream-dark text-ink-muted cursor-not-allowed'
              }`}
            >
              Gesprächsleitfaden erstellen
            </button>

            {/* Disclaimer */}
            <p className="text-[0.75rem] text-ink-muted mt-6 leading-relaxed">
              <strong>Hinweis:</strong> Dieses Tool dient ausschließlich der unverbindlichen
              Erstorientierung und ersetzt keine anwaltliche Beratung. Für eine verbindliche
              Einschätzung Ihres Falls wenden Sie sich bitte an einen{' '}
              <Link href="/kontakt" className="text-green no-underline hover:underline">
                Fachanwalt für Arbeitsrecht
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Result */}
      {showResult && allFilled && (
        <section id="leitfaden-result" className="py-[70px] px-8 bg-cream max-md:py-12 max-md:px-6">
          <div className="max-w-content mx-auto">
            <div className="max-w-[740px]">
              <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
                Ihr Leitfaden
              </div>
              <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-2">
                Gesprächsleitfaden für Ihre Gehaltsverhandlung
              </h2>
              <p className="text-[0.88rem] text-ink-muted mb-8">
                Differenz: <strong>{formatEuro(differenz)}/Monat</strong> ({differenzProzent}%)
                {dauer && <> &mdash; seit {dauerLabels[dauer as DauerOption]}</>}
              </p>

              {/* Section 1: Eröffnung */}
              <div className="bg-white border border-border-light rounded-sm p-6 mb-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-[0.85rem] font-bold shrink-0">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.05rem] font-bold mb-3">Eröffnung</h3>
                    <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                      &bdquo;Ich habe von meinem Auskunftsrecht gemäß Art. 7 der
                      EU-Entgelttransparenzrichtlinie 2023/970 Gebrauch gemacht und festgestellt,
                      dass ich <strong>{formatEuro(differenz)} weniger</strong> verdiene als der
                      Median meiner Vergleichsgruppe. Mein aktuelles Gehalt liegt bei{' '}
                      <strong>{formatEuro(gehaltNum)}</strong>, der Vergleichswert bei{' '}
                      <strong>{formatEuro(vergleichNum)}</strong>. Ich möchte dieses Gespräch
                      nutzen, um eine faire Anpassung zu besprechen.&ldquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Rechtliche Grundlage */}
              <div className="bg-white border border-border-light rounded-sm p-6 mb-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-[0.85rem] font-bold shrink-0">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.05rem] font-bold mb-3">
                      Rechtliche Grundlage
                    </h3>
                    <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                      &bdquo;Das BAG-Urteil Az. 8 AZR 300/24 vom 23.10.2025 bestätigt, dass
                      bereits ein Paarvergleich ausreicht, um eine Entgeltdiskriminierung glaubhaft
                      zu machen. Die Beweislastumkehr nach Art. 18 der EU-Richtlinie bedeutet: Bei
                      einer festgestellten Entgeltdifferenz muss der Arbeitgeber beweisen, dass
                      keine Diskriminierung vorliegt &mdash; nicht ich.&ldquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Argument gegen Arbeitgeber-Begründung */}
              <div className="bg-white border border-border-light rounded-sm p-6 mb-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-[0.85rem] font-bold shrink-0">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.05rem] font-bold mb-3">
                      Zum Argument &bdquo;{grund}&ldquo;
                    </h3>
                    <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                      {grundArgumente[grund as GrundOption]}
                    </p>
                    {leistung && (leistung === 'Sehr gut' || leistung === 'Gut') && grund === 'Leistung' && (
                      <p className="text-[0.92rem] text-ink leading-relaxed mt-3 mb-0">
                        <strong>Hinweis:</strong> Ihre Leistungsbeurteilung ist &bdquo;{leistung}&ldquo;.
                        Dies widerspricht einer leistungsbasierten Begründung der Gehaltsdifferenz.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 4: Zielgehalt */}
              <div className="bg-white border border-border-light rounded-sm p-6 mb-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-[0.85rem] font-bold shrink-0">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.05rem] font-bold mb-3">Zielgehalt</h3>
                    <div className="rounded-sm border-2 border-green p-5 bg-green-bg text-center mb-3">
                      <div className="text-[0.78rem] font-bold tracking-[0.14em] uppercase text-green mb-1">
                        Zielgehalt
                      </div>
                      <div className="font-serif text-[2rem] font-bold text-green">
                        {formatEuro(vergleichNum)}
                      </div>
                      <div className="text-[0.85rem] text-green">
                        brutto / Monat
                      </div>
                    </div>
                    <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                      &bdquo;Mein Zielgehalt orientiert sich am Median der Vergleichsgruppe von{' '}
                      <strong>{formatEuro(vergleichNum)}</strong>. Dies ist kein überzogener
                      Wunsch, sondern der faire Referenzwert, den die EU-Richtlinie als Maßstab
                      vorsieht.&ldquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Eskalation */}
              <div className="bg-white border border-border-light rounded-sm p-6 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-green text-white flex items-center justify-center text-[0.85rem] font-bold shrink-0">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[1.05rem] font-bold mb-3">
                      Falls keine Einigung
                    </h3>
                    <p className="text-[0.92rem] text-ink leading-relaxed m-0">
                      &bdquo;Ich hoffe auf eine einvernehmliche Lösung. Sollte keine Einigung
                      möglich sein, behalte ich mir vor, eine Klage nach Art. 21 EU-RL 2023/970
                      einzureichen. Die Entschädigung kann bis zu <strong>3 Jahre rückwirkend</strong>{' '}
                      geltend gemacht werden.
                      {dauer && (dauer === '25-36' || dauer === 'ueber36') && (
                        <> Bei einer Differenz seit {dauerLabels[dauer as DauerOption]} beträgt
                        die mögliche Nachforderung bis zu{' '}
                        <strong>
                          {formatEuro(differenz * (dauer === 'ueber36' ? 36 : 30))}
                        </strong>.
                        </>
                      )}
                      &ldquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="py-5 px-6 bg-white rounded-sm border-l-[3px] border-green">
                <p className="text-[0.95rem] text-ink mb-3">
                  <strong>
                    Antwort des Arbeitgebers anwaltlich prüfen lassen?
                  </strong>
                </p>
                <p className="text-[0.88rem] text-ink-muted leading-relaxed mb-4">
                  Ein Fachanwalt prüft die Reaktion Ihres Arbeitgebers, bewertet Ihre
                  Erfolgschancen und begleitet Sie bei der Durchsetzung Ihres Anspruchs.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-block py-3 px-6 bg-green text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-green hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(43,76,53,0.25)]"
                >
                  Antwort des Arbeitgebers anwaltlich prüfen lassen &rarr;
                </Link>
              </div>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="mt-6 text-[0.85rem] text-ink-muted bg-transparent border-none cursor-pointer hover:text-green transition-colors font-sans"
              >
                Neuen Leitfaden erstellen &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-[70px] px-8 bg-white max-md:py-12 max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-green mb-2.5">
            Häufige Fragen
          </div>
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
            Häufige Fragen zur Gehaltsverhandlung nach Auskunftsrecht
          </h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-green text-white text-center max-md:py-12 max-md:px-6">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Gehaltsanspruch durchsetzen &mdash; mit anwaltlicher Unterstützung
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Fachanwalt Fatih Bektas prüft Ihren Fall kostenlos und zeigt Ihnen,
            wie Sie Ihren Equal-Pay-Anspruch durchsetzen.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-white text-green hover:bg-green-bg hover:-translate-y-0.5"
          >
            Kostenlose Ersteinschätzung &rarr;
          </Link>
        </div>
      </section>

      {/* Disclaimer bottom */}
      <section className="py-6 px-8 bg-cream border-t border-border max-md:px-6">
        <div className="max-w-content mx-auto">
          <p className="text-[0.78rem] text-ink-muted leading-relaxed max-w-[740px]">
            <strong>Rechtlicher Hinweis:</strong> Dieser Gesprächsleitfaden dient der
            unverbindlichen Vorbereitung und stellt keine Rechtsberatung dar. Die Formulierungen
            sind Vorschläge und sollten an Ihre individuelle Situation angepasst werden. Alle
            Angaben basieren auf der EU-Entgelttransparenzrichtlinie 2023/970 und dem BAG-Urteil
            Az. 8 AZR 300/24. Für eine verbindliche Einschätzung wenden Sie sich bitte an
            einen Fachanwalt.
          </p>
        </div>
      </section>
    </main>
  );
}
