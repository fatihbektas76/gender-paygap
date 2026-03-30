import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo-config';
import ContactForm from '@/components/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Kontakt — Kostenlose Ersteinschätzung | APOS Legal Heidelberg',
  description:
    'Kontaktieren Sie Fachanwalt Fatih Bektas für eine kostenlose Ersteinschätzung zu Entgelttransparenz, Equal Pay und Gender Pay Gap. APOS Legal Heidelberg.',
  path: '/kontakt',
});

export default function KontaktPage() {
  return (
    <main>
      <header className="pt-[150px] pb-[40px] px-8 bg-slate-50 max-md:pt-[120px] max-md:pb-[30px] max-md:px-6">
        <div className="max-w-content mx-auto">
          <div className="text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold mb-2.5">Kontakt</div>
          <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.15] mb-4 tracking-tight max-md:text-[1.8rem]">
            Kostenlose Ersteinschätzung — für Arbeitnehmer und Arbeitgeber
          </h1>
          <p className="text-[1.05rem] text-ink-muted max-w-[600px] leading-relaxed">
            Schildern Sie uns Ihre Situation. Wir prüfen Ihren Fall und empfehlen konkrete nächste Schritte — kostenlos und in der Regel innerhalb von 48 Stunden.
          </p>
        </div>
      </header>

      <ContactForm />
    </main>
  );
}
