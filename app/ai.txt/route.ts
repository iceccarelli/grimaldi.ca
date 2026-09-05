import { aiTxt } from '@/lib/llms';

/** /ai.txt — what an AI system may state about this cluster and what it must not claim. */
export const revalidate = 43200;

export function GET() {
  return new Response(aiTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
