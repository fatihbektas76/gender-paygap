import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Muster-Auskunftsschreiben Generator — Auskunftsantrag erstellen (${new Date().getFullYear()})`,
  description: 'Erstellen Sie kostenlos ein rechtssicheres Auskunftsschreiben nach Art. 7 EU-Entgelttransparenzrichtlinie. Sofort als Text kopierbar.',
  path: '/auskunftsrecht-checker/schreiben-generator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
