import FadeUp from './FadeUp';

const tools = [
  {
    title: 'Auskunftsrecht-Checker',
    desc: 'Prüfen Sie in 3 Klicks, ob Sie ein Auskunftsrecht gegenüber Ihrem Arbeitgeber haben — und generieren Sie ein fertiges Auskunftsschreiben.',
    href: '/auskunftsrecht-checker',
    delay: 0,
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Compliance-Check Arbeitgeber',
    desc: 'In 5 Fragen erfahren Sie, ob Ihr Unternehmen die Entgelttransparenz-Pflichten erfüllt. Ampel-Ergebnis mit konkretem Handlungsplan.',
    href: '/compliance-check-arbeitgeber',
    delay: 1,
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Equal-Pay-Schnellcheck',
    desc: 'In 2 Minuten erfahren Sie, ob Sie einen Anspruch auf gleiche Bezahlung haben. 4 einfache Fragen — sofortige Einschätzung.',
    href: '/equal-pay-anspruch-schnellcheck',
    delay: 2,
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l3 3" />
      </svg>
    ),
  },
  {
    title: 'Gender Pay Gap Rechner',
    desc: 'Vergleichen Sie Ihr Gehalt mit dem Branchenmedian — aufgeschlüsselt nach Geschlecht. Basierend auf Destatis-Daten 2025.',
    href: '/gender-pay-gap-rechner',
    delay: 3,
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

export default function Tools() {
  return (
    <section className="py-[90px] px-8 bg-cream max-md:py-[60px] max-md:px-6" id="tools">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
          Kostenlose Tools
        </div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-[1.25] mb-3.5 max-md:text-2xl">
          Ihre Situation einschätzen — bevor Sie einen Anwalt beauftragen
        </h2>
        <div className="grid gap-3.5 mt-9 max-w-[700px]">
          {tools.map((tool) => (
            <FadeUp key={tool.title} delay={tool.delay}>
              <a
                href={tool.href}
                className="bg-white border border-border-light rounded py-6 px-7 flex items-center gap-[18px] transition-all no-underline text-inherit hover:border-gold hover:translate-x-1 group"
              >
                <div className="w-11 h-11 min-w-[44px] rounded-[10px] bg-gold-bg border border-gold/[0.12] flex items-center justify-center text-gold">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[0.98rem] font-bold mb-[3px]">
                    {tool.title}{' '}
                    <span className="inline-block text-[0.62rem] font-bold text-green bg-green-bg rounded-[3px] px-[7px] py-[2px] tracking-wider uppercase ml-2 align-middle">
                      Neu
                    </span>
                  </h3>
                  <p className="text-[0.84rem] text-ink-muted leading-relaxed">{tool.desc}</p>
                </div>
                <span className="text-ink-muted text-[1.2rem] transition-transform group-hover:translate-x-1 group-hover:text-gold">
                  &rarr;
                </span>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
