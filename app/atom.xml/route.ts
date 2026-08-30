import { atom, feedItems } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return new Response(atom(feedItems()), {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
}
