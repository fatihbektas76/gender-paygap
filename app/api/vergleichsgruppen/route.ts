import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { beschreibung } = await req.json();

    if (!beschreibung || beschreibung.length < 20 || beschreibung.length > 3000) {
      return Response.json(
        { error: 'Bitte beschreiben Sie Ihre Tätigkeit ausführlicher (mindestens 20 Zeichen).' },
        { status: 400 },
      );
    }

    const systemPrompt = `Du bist ein Assistent von APOS Legal Heidelberg, spezialisiert auf Entgelttransparenz und Equal Pay. Analysiere die beschriebene Tätigkeit anhand der 4 Kriterien aus Art. 4 EU-Richtlinie 2023/970:
1. Kompetenz
2. Verantwortung
3. Belastungen
4. Arbeitsbedingungen

Antworte auf Deutsch im folgenden Format:
VERGLEICHSPOSITIONEN: [Liste von 3-5 potenziellen Vergleichspositionen im Unternehmen]
BEGRÜNDUNG: [Warum diese Positionen als gleichwertig gelten]
KRITERIEN-ANALYSE: [Kurze Analyse der 4 Kriterien]
RECHTLICHE EINSCHÄTZUNG: [1-2 Sätze zur rechtlichen Einordnung]
HINWEIS: Das BAG-Urteil 8 AZR 300/24 bestätigt: Ein einzelner Paarvergleich reicht aus, um eine Diskriminierungsvermutung zu begründen.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages: [{ role: 'user', content: beschreibung }],
    });

    const textBlock = message.content.find((c) => c.type === 'text');
    return Response.json({ text: textBlock?.text || '' });
  } catch {
    return Response.json(
      { error: 'Analyse konnte nicht durchgeführt werden. Bitte versuchen Sie es später erneut.' },
      { status: 500 },
    );
  }
}
