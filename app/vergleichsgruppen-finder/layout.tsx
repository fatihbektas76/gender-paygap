import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Vergleichsgruppen-Finder — Wer verdient das Gleiche wie Sie? (${new Date().getFullYear()})`,
  description: 'Finden Sie heraus, welche Positionen im Unternehmen als gleichwertig zu Ihrer Tätigkeit gelten. KI-gestützte Analyse nach Art. 4 EU-RL.',
  path: '/vergleichsgruppen-finder',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
