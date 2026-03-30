import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Sanktionsrechner Entgelttransparenz — Ihr Risiko in Euro (${new Date().getFullYear()})`,
  description: 'Berechnen Sie Ihr finanzielles Risiko bei Verstößen gegen die EU-Entgelttransparenzrichtlinie. Nachzahlung, Bußgeld, Schadensersatz — in Zahlen.',
  path: '/compliance-check-arbeitgeber/sanktionsrechner',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
