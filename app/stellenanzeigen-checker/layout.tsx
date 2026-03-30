import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Stellenanzeigen-Checker — Ist Ihre Stellenanzeige EU-konform? (${new Date().getFullYear()})`,
  description:
    'Prüfen Sie Ihre Stellenanzeige auf Konformität mit der EU-Entgelttransparenzrichtlinie. KI-gestützte Analyse in Sekunden.',
  path: '/stellenanzeigen-checker',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
