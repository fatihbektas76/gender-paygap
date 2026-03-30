import Link from 'next/link';

const topBranchen = [
  { name: 'IT & Software', slug: 'it' },
  { name: 'Gesundheitswesen', slug: 'gesundheitswesen' },
  { name: 'Bankwesen', slug: 'bankwesen' },
  { name: 'Einzelhandel', slug: 'einzelhandel' },
  { name: 'Öffentlicher Dienst', slug: 'oeffentlicher-dienst' },
  { name: 'Produktion', slug: 'produktion' },
  { name: 'Bildung', slug: 'bildung' },
  { name: 'Pflege', slug: 'pflege' },
  { name: 'Versicherung', slug: 'versicherung' },
  { name: 'Logistik', slug: 'logistik' },
  { name: 'Chemie', slug: 'chemie' },
  { name: 'Automobil', slug: 'automobil' },
];

export default function StandortTeaser() {
  return (
    <section className="py-[70px] px-8 bg-cream max-md:py-[50px] max-md:px-6">
      <div className="max-w-content mx-auto">
        <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">
          Nach Branche
        </div>
        <h2 className="font-serif text-[clamp(1.4rem,3vw,1.9rem)] font-bold leading-[1.25] mb-3">
          Entgelttransparenz in Ihrer Branche
        </h2>
        <p className="text-[1rem] text-ink-muted max-w-[600px] leading-relaxed mb-8">
          Der Gender Pay Gap unterscheidet sich stark nach Branche.
          Finden Sie branchenspezifische Informationen zu Ihren Rechten und Pflichten.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {topBranchen.map((branche) => (
            <Link
              key={branche.slug}
              href={`/gender-pay-gap-${branche.slug}`}
              className="bg-white border border-border rounded-sm py-3 px-4 text-[0.88rem] font-medium text-ink no-underline transition-all hover:border-gold hover:text-gold hover:bg-gold-bg"
            >
              {branche.name}
            </Link>
          ))}
        </div>

        <Link
          href="/arbeitnehmer"
          className="inline-flex items-center gap-2 text-[0.92rem] font-semibold text-gold no-underline hover:underline"
        >
          Alle Branchen anzeigen &rarr;
        </Link>
      </div>
    </section>
  );
}
