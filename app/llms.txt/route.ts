import { llmsIndex } from '@/lib/llms';

/** /llms.txt — generated from the typed cluster content; rebuilt twice a day. */
export const revalidate = 43200;

export function GET() {
  return new Response(llmsIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
  });
}
