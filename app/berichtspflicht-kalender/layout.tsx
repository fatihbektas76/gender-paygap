import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Berichtspflicht-Kalender — Alle Deadlines 2026–2032 (${new Date().getFullYear()})`,
  description: 'Personalisierter Zeitplan aller Entgelttransparenz-Deadlines für Ihr Unternehmen. ICS-Download für Ihren Kalender.',
  path: '/berichtspflicht-kalender',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
