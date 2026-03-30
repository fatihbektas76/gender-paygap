import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `KI-Situationscheck — Ihre Situation analysieren lassen (${new Date().getFullYear()})`,
  description: 'KI-gestützte Ersteinschätzung Ihrer Situation zur Entgelttransparenz. Für Arbeitnehmer und Arbeitgeber. Kostenlos und vertraulich.',
  path: '/situationscheck',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
