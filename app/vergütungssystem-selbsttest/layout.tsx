import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Vergütungssystem-Selbsttest — 20 Fragen zur Compliance (${new Date().getFullYear()})`,
  description: 'Testen Sie in 20 Fragen, ob Ihr Vergütungssystem der EU-Entgelttransparenzrichtlinie standhält. Kostenloser Selbsttest von APOS Legal.',
  path: '/vergütungssystem-selbsttest',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
