import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { situation, audience } = await req.json();

    if (!situation || situation.length < 10 || situation.length > 2000) {
      return Response.json(
        { error: 'Bitte beschreiben Sie Ihre Situation ausführlicher (mindestens 10 Zeichen).' },
        { status: 400 },
      );
    }

    const systemPrompt =
      audience === 'an'
        ? `Du bist ein Assistent von APOS Legal Heidelberg. Analysiere die Situation eines Arbeitnehmers zur Entgelttransparenz (EU-RL 2023/970, BAG 8 AZR 300/24). Antworte auf Deutsch. Format: Einschätzung (3 Sätze) | Relevante Norm | Chancen/Risiken | 3 Nächste Schritte | Bewertung: STARK/MITTEL/SCHWACH`
        : `Du bist ein Assistent von APOS Legal Heidelberg. Analysiere die Compliance-Situation eines Arbeitgebers (EU-RL 2023/970). Antworte auf Deutsch. Format: Risikoeinschätzung | Relevante Pflicht | Handlungsbedarf | 3 Empfohlene Schritte | Risiko: HOCH/MITTEL/GERING`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: situation }],
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
