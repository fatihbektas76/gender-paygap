import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Gehaltsverhandlung vorbereiten — Leitfaden nach Auskunftsrecht (${new Date().getFullYear()})`,
  description:
    'Erstellen Sie einen strukturierten Gesprächsleitfaden für Ihre Gehaltsverhandlung auf Basis des Auskunftsrechts. Kostenlos.',
  path: '/gehaltsverhandlung-vorbereiter',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
