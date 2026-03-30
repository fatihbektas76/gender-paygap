import { buildMetadata } from '@/lib/seo-config';

export const metadata = buildMetadata({
  title: `Entschädigung bei Lohndiskriminierung berechnen — Simulator (${new Date().getFullYear()})`,
  description: 'Berechnen Sie Ihre mögliche Entschädigung bei Entgeltdiskriminierung. Nachzahlung, Zinsen, immaterieller Schadensersatz — konkret in Euro.',
  path: '/equal-pay-klage/entschaedigung-berechnen',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
