import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Auskunftsrecht-Checker — Haben Sie Anspruch auf Gehaltsauskunft? (${new Date().getFullYear()})`,
  description: 'In 3 Klicks prüfen: Haben Sie Anspruch auf Gehaltsauskunft nach der EU-Entgelttransparenzrichtlinie? Kostenloser Check von APOS Legal.',
  path: '/auskunftsrecht-checker',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
