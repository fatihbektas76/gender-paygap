import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Entgeltlücken-Ampel — Gender Pay Gap Ihres Unternehmens prüfen (${new Date().getFullYear()})`,
  description: 'Berechnen Sie den Gender Pay Gap Ihres Unternehmens und erhalten Sie eine Ampel-Bewertung. Kostenloser Check mit Handlungsempfehlungen.',
  path: '/entgeltluecken-ampel',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
