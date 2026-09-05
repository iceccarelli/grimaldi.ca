import { llmsFull } from '@/lib/llms';

/** /llms-full.txt — the index plus the entire cluster state as Markdown. */
export const revalidate = 43200;

export function GET() {
  return new Response(llmsFull(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
