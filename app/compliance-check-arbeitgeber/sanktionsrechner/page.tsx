'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SEO_CONFIG } from '@/lib/seo-config';

function formatEuro(value: number): string {
  return value.toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  });
}

type RiskLevel = 'gruen' | 'gelb' | 'rot';

function getRiskLevel(gesamtrisiko: number): RiskLevel {
  if (gesamtrisiko < 500_000) return 'gruen';
  if (gesamtrisiko < 2_000_000) return 'gelb';
  return 'rot';
}

const riskConfig = {
  gruen: {
    label: 'Moderates Risiko',
    bgClass: 'bg-green-bg',
    borderClass: 'border-green',
    barClass: 'bg-green',
    textClass: 'text-green',
  },
  gelb: {
    label: 'Erhebliches Risiko',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-400',
    barClass: 'bg-amber-500',
    textClass: 'text-amber-700',
  },
  rot: {
    label: 'Hohes Risiko',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-400',
    barClass: 'bg-red-600',
    textClass: 'text-red-700',
  },
};

export default function SanktionsrechnerPage() {
  const [ma, setMa] = useState(200);
  const [gpg, setGpg] = useState(10);
  const [salary, setSalary] = useState(45000);
  const [anteil, setAnteil] = useState(45);

  const result = useMemo(() => {
    const frauen = Math.round((ma * anteil) / 100);
    const diffPerson = salary * (gpg / 100);
    const lueckeJahr = frauen * diffPerson;
    const nachzahlung3Jahre = lueckeJahr * 3;
    const zinsen = nachzahlung3Jahre * 0.05 * 1.5;
    const immateriell = frauen * 2500;
    const bussgeld = Math.min(ma * 500 + lueckeJahr * 0.1, 5_000_000);
    const gesamtrisiko = nachzahlung3Jahre + zinsen + immateriell;

    return {
      frauen,
      diffPerson,
      lueckeJahr,
      nachzahlung3Jahre,
      zinsen,
      immateriell,
      bussgeld,
      gesamtrisiko,
    };
  }, [ma, gpg, salary, anteil]);

  const riskLevel = getRiskLevel(result.gesamtrisiko);
  const config = riskConfig[riskLevel];

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
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Sanktionsrechner',
                item: `${SEO_CONFIG.baseUrl}/compliance-check-arbeitgeber/sanktionsrechner/`,
              },
            ],
          }),
        }}
      />

      {/* Schema.org WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Sanktionsrechner Entgelttransparenz',
            url: `${SEO_CONFIG.baseUrl}/compliance-check-arbeitgeber/sanktionsrechner/`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            author: {
              '@type': 'Organization',
              name: SEO_CONFIG.organization.name,
              url: SEO_CONFIG.baseUrl,
            },
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
            <Link
              href="/compliance-check-arbeitgeber"
              className="text-blue no-underline hover:underline"
            >
              Compliance-Check
            </Link>
            <span className="mx-2">/</span>
            <span>Sanktionsrechner</span>
          </nav>
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-2.5">
            Kostenloses Tool
          </div>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-[1.2] max-w-[700px]">
            Sanktionsrechner &mdash; Ihr finanzielles Risiko in Euro
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[580px] leading-relaxed mt-3">
            Berechnen Sie, welche Kosten bei Verstößen gegen die EU-Entgelttransparenzrichtlinie
            drohen: Nachzahlung, Bußgeld und Schadensersatz.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <section className="py-[70px] px-8 bg-white">
        <div className="max-w-content mx-auto">
          <div className="max-w-[700px]">
            <div className="bg-cream border border-border-light rounded p-6 sm:p-8">
              <h2 className="font-serif text-[1.2rem] font-bold mb-6">
                Ihre Unternehmensdaten
              </h2>

              <div className="space-y-7">
                {/* Slider 1: Mitarbeiterzahl */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Mitarbeiterzahl
                    </label>
                    <span className="text-[0.95rem] font-bold text-blue">
                      {ma.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={5000}
                    step={10}
                    value={ma}
                    onChange={(e) => setMa(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-cream-dark accent-blue"
                  />
                  <div className="flex justify-between text-[0.75rem] text-ink-muted mt-1">
                    <span>50</span>
                    <span>5.000</span>
                  </div>
                </div>

                {/* Slider 2: Gender Pay Gap */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Geschätzter Gender Pay Gap
                    </label>
                    <span className="text-[0.95rem] font-bold text-blue">{gpg} %</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={1}
                    value={gpg}
                    onChange={(e) => setGpg(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-cream-dark accent-blue"
                  />
                  <div className="flex justify-between text-[0.75rem] text-ink-muted mt-1">
                    <span>0 %</span>
                    <span>40 %</span>
                  </div>
                </div>

                {/* Slider 3: Durchschnittliches Jahresgehalt */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Durchschn. Jahresgehalt Frauen
                    </label>
                    <span className="text-[0.95rem] font-bold text-blue">
                      {formatEuro(salary)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30000}
                    max={120000}
                    step={1000}
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-cream-dark accent-blue"
                  />
                  <div className="flex justify-between text-[0.75rem] text-ink-muted mt-1">
                    <span>30.000 &euro;</span>
                    <span>120.000 &euro;</span>
                  </div>
                </div>

                {/* Slider 4: Anteil weiblicher Mitarbeiter */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="text-[0.84rem] font-semibold text-ink">
                      Anteil weiblicher Mitarbeiter
                    </label>
                    <span className="text-[0.95rem] font-bold text-blue">{anteil} %</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    step={1}
                    value={anteil}
                    onChange={(e) => setAnteil(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-cream-dark accent-blue"
                  />
                  <div className="flex justify-between text-[0.75rem] text-ink-muted mt-1">
                    <span>10 %</span>
                    <span>90 %</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-10">
              <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-6">
                Ihr Sanktionsrisiko
              </h2>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-cream border border-border-light rounded-sm p-5 text-center">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                    Jährliche Lohnlücke
                  </div>
                  <div className="font-serif text-[1.5rem] font-bold text-ink">
                    {formatEuro(result.lueckeJahr)}
                  </div>
                </div>
                <div className="bg-cream border border-border-light rounded-sm p-5 text-center">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                    3-Jahres-Nachzahlung
                  </div>
                  <div className="font-serif text-[1.5rem] font-bold text-ink">
                    {formatEuro(result.nachzahlung3Jahre)}
                  </div>
                </div>
                <div className="bg-cream border border-border-light rounded-sm p-5 text-center">
                  <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-ink-muted mb-2">
                    Max. Bußgeld
                  </div>
                  <div className="font-serif text-[1.5rem] font-bold text-ink">
                    {formatEuro(result.bussgeld)}
                  </div>
                </div>
              </div>

              {/* Risk Bar */}
              <div
                className={`rounded-sm border-2 p-6 ${config.borderClass} ${config.bgClass} mb-8`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[0.88rem] font-semibold ${config.textClass}`}>
                    {config.label}
                  </span>
                  <span className="font-serif text-[1.3rem] font-bold text-ink">
                    {formatEuro(result.gesamtrisiko)}
                  </span>
                </div>
                <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${config.barClass}`}
                    style={{
                      width: `${Math.min((result.gesamtrisiko / 10_000_000) * 100, 100)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[0.72rem] text-ink-muted mt-1.5">
                  <span>0 &euro;</span>
                  <span>10 Mio. &euro;</span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-cream border border-border-light rounded p-6 sm:p-8">
                <h3 className="font-serif text-[1.1rem] font-bold mb-5">
                  Detaillierte Aufstellung
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">Weibliche Mitarbeiter</span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {result.frauen.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">
                      Entgeltdifferenz pro Person / Jahr
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.diffPerson)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">Jährliche Lohnlücke gesamt</span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.lueckeJahr)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">
                      Nachzahlung (3 Jahre rückwirkend)
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.nachzahlung3Jahre)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">
                      Verzugszinsen (5% p.a., 1,5 Jahre Durchschnitt)
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.zinsen)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">
                      Immaterieller Schadensersatz (ca. 2.500 &euro; / Person)
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.immateriell)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-border">
                    <span className="text-[0.88rem] text-ink-light">
                      Max. Bußgeld (gedeckelt auf 5 Mio. &euro;)
                    </span>
                    <span className="text-[0.92rem] font-semibold text-ink">
                      {formatEuro(result.bussgeld)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-cream-dark rounded-sm px-3 mt-2">
                    <span className="text-[0.92rem] font-bold text-ink">Gesamtrisiko</span>
                    <span className="font-serif text-[1.2rem] font-bold text-blue">
                      {formatEuro(result.gesamtrisiko)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 py-6 px-6 bg-white rounded-sm border-l-[3px] border-blue">
                <p className="text-[1rem] text-ink mb-1">
                  <strong>
                    Ihr Gesamtrisiko liegt bei ca. {formatEuro(result.gesamtrisiko)}
                  </strong>
                </p>
                <p className="text-[0.88rem] text-ink-muted mb-4">
                  Vermeiden Sie Nachzahlungen und Bußgelder durch ein professionelles Compliance-Audit.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-block py-3 px-6 bg-blue text-white border-none rounded-sm font-sans text-[0.92rem] font-semibold no-underline transition-all hover:bg-blue"
                >
                  Audit anfragen &rarr;
                </Link>
              </div>

              {/* Link back to Compliance-Check */}
              <div className="mt-6 p-5 bg-cream border border-border-light rounded-sm">
                <p className="text-[0.92rem] text-ink mb-3">
                  <strong>Noch nicht geprüft, ob Sie vorbereitet sind?</strong>
                </p>
                <Link
                  href="/compliance-check-arbeitgeber"
                  className="text-blue font-semibold text-[0.92rem] no-underline hover:underline"
                >
                  Zum Compliance-Check &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[70px] px-8 bg-blue text-white text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-bold mb-4">
            Non-Compliance ist teurer als Compliance
          </h2>
          <p className="text-white/80 text-[1rem] leading-relaxed mb-6">
            Ein professionelles Audit kostet einen Bruchteil der möglichen Sanktionen.
            Wir machen Ihr Vergütungssystem rechtssicher.
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
            <strong>Rechtlicher Hinweis:</strong> Alle Berechnungen sind Schätzungen und ersetzen
            keine anwaltliche Beratung. Die tatsächlichen Sanktionen hängen von der konkreten
            Umsetzung der EU-Richtlinie 2023/970 in deutsches Recht, den individuellen
            Umständen Ihres Unternehmens und der Rechtsprechung ab.
          </p>
        </div>
      </section>
    </main>
  );
}
