import FadeUp from './FadeUp';

export default function Hero() {
  return (
    <header className="pt-[150px] pb-[100px] px-8 bg-slate-50 text-center relative overflow-hidden max-md:pt-[120px] max-md:pb-[70px] max-md:px-6" role="banner">
      <div className="absolute -top-[40%] -right-[15%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.07)_0%,transparent_70%)] z-[2]" />
      <div className="max-w-[800px] mx-auto relative z-[3]">
        <div className="font-serif text-[1.1rem] text-primary-700 font-semibold mb-1.5">
          Fachanwalt für Arbeitsrecht{' '}
          <span className="inline-block text-[0.68rem] font-bold text-primary-700 bg-primary-50 border-[1.5px] border-primary/20 rounded px-2.5 py-[3px] tracking-wider uppercase ml-2.5 align-middle">
            Kostenlose Ersteinschätzung
          </span>
        </div>
        <h1 className="font-serif text-[clamp(2.1rem,4.5vw,3.2rem)] font-extrabold leading-[1.15] mt-[18px] mb-[22px] tracking-tight max-md:text-[1.9rem]">
          Ihr Recht auf gleiche Bezahlung.
          <br />
          Ihr Schutz vor Lohndiskriminierung.
        </h1>
        <p className="text-[1.12rem] text-ink-muted max-w-[660px] mx-auto mb-6 leading-relaxed">
          Die EU-Entgelttransparenzrichtlinie gibt Arbeitnehmern neue Rechte und Arbeitgebern neue Pflichten.
          Fachanwalt Fatih Bektas berät beide Seiten.
        </p>
        <div className="flex items-center justify-center gap-x-5 gap-y-1.5 flex-wrap mb-8 text-[0.82rem] text-ink-light">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-secondary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Fachanwalt seit 2011
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-secondary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Ersteinschätzung kostenlos
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-secondary-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Ex-CEO / CFO Erfahrung
          </span>
        </div>

        {/* Dual-CTA: Arbeitnehmer (grün) + Arbeitgeber (blau) */}
        <div className="flex gap-3.5 justify-center flex-wrap max-md:flex-col max-md:items-center">
          <a
            href="/arbeitnehmer"
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-secondary-600 text-white hover:bg-secondary-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(34,197,94,0.25)] max-md:w-full max-md:justify-center"
          >
            Mein Auskunftsrecht prüfen &rarr;
          </a>
          <a
            href="/arbeitgeber"
            className="inline-flex items-center gap-2 px-[30px] py-3.5 rounded-sm text-[0.95rem] font-semibold no-underline transition-all bg-accent-600 text-white hover:bg-accent-700 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(59,130,246,0.25)] max-md:w-full max-md:justify-center"
          >
            Compliance-Check starten &rarr;
          </a>
        </div>

        <FadeUp className="flex gap-10 justify-center mt-12 pt-9 border-t border-border max-md:gap-5 max-md:flex-wrap">
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-primary-700">16%</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Gender Pay Gap DE</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-primary-700">Juni 2026</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">EU-Richtlinie greift</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-primary-700">20+</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">Jahre Erfahrung</div>
          </div>
          <div>
            <div className="font-serif text-[1.6rem] font-bold text-primary-700">4.9 &#9733;</div>
            <div className="text-[0.82rem] text-ink-muted mt-0.5">68 Bewertungen</div>
          </div>
        </FadeUp>
      </div>
    </header>
  );
}
