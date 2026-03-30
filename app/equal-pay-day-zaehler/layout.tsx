import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Equal Pay Day Zähler — Wie lange arbeiten Frauen gratis? (${new Date().getFullYear()})`,
  description: 'Live-Animation: So viele Tage arbeiten Frauen in Deutschland unbezahlt. Equal Pay Day berechnen — auch nach Branche.',
  path: '/equal-pay-day-zaehler',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
