import { feedItems, jsonFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(jsonFeed(feedItems()), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
