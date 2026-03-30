import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Equal-Pay-Anspruch Schnellcheck — in 2 Minuten prüfen (${new Date().getFullYear()})`,
  description: 'Prüfen Sie in 4 Fragen, ob Sie einen Anspruch auf gleiche Bezahlung haben. Kostenloser Schnellcheck von APOS Legal Heidelberg.',
  path: '/equal-pay-anspruch-schnellcheck',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
