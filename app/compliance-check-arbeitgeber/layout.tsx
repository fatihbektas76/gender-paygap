import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Compliance-Check Entgelttransparenz — Sind Sie vorbereitet? (${new Date().getFullYear()})`,
  description: 'In 5 Fragen prüfen: Ist Ihr Unternehmen auf die EU-Entgelttransparenzrichtlinie 2023/970 vorbereitet? Kostenloser Ampel-Check von APOS Legal.',
  path: '/compliance-check-arbeitgeber',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
