import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Gender Pay Gap Rechner — Gehalt vergleichen (${new Date().getFullYear()})`,
  description: 'Vergleichen Sie Ihr Gehalt mit dem Branchenmedian nach Geschlecht. Daten: Statistisches Bundesamt 2025. Kostenloser Gehaltsvergleich.',
  path: '/gender-pay-gap-rechner',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
