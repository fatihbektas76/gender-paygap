import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || text.length < 30 || text.length > 5000) {
      return Response.json(
        {
          error:
            'Bitte fügen Sie den vollständigen Text einer Stellenanzeige ein (mindestens 30 Zeichen).',
        },
        { status: 400 }
      );
    }

    const systemPrompt = `Du bist ein Assistent von APOS Legal Heidelberg, spezialisiert auf Entgelttransparenz. Prüfe die folgende Stellenanzeige anhand von 4 Kriterien der EU-Entgelttransparenzrichtlinie 2023/970.

Antworte ausschließlich im folgenden JSON-Format:
{
  "checks": [
    { "id": "gehalt", "label": "Gehaltsspanne angegeben", "pflicht": "ab Juni 2026", "erfuellt": true/false, "kommentar": "..." },
    { "id": "neutral", "label": "Geschlechtsneutrale Formulierung", "pflicht": "sofort", "erfuellt": true/false, "kommentar": "..." },
    { "id": "kriterien", "label": "Entgeltkriterien transparent", "pflicht": "ab Juni 2026", "erfuellt": true/false, "kommentar": "..." },
    { "id": "diskrim", "label": "Keine mittelbar diskriminierenden Anforderungen", "pflicht": "sofort", "erfuellt": true/false, "kommentar": "..." }
  ],
  "gesamtbewertung": "gruen/gelb/rot",
  "zusammenfassung": "..."
}`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages: [{ role: 'user', content: text }],
    });

    const textBlock = message.content.find((c) => c.type === 'text');
    try {
      const parsed = JSON.parse(textBlock?.text || '{}');
      return Response.json(parsed);
    } catch {
      return Response.json(
        { error: 'Analyse konnte nicht verarbeitet werden.' },
        { status: 500 }
      );
    }
  } catch {
    return Response.json(
      { error: 'Analyse konnte nicht durchgeführt werden.' },
      { status: 500 }
    );
  }
}
