import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * Everything on this site is meant to be found — by search engines and by the
 * AI crawlers that answer "best software for X workflow". The documented AI
 * user agents are named explicitly and allowed, so a default-deny rule added
 * later can never silently exclude them. Only the write endpoints are closed.
 */
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'Google-Extended', 'Applebot-Extended',
  'PerplexityBot', 'Perplexity-User',
  'CCBot', 'cohere-ai', 'Meta-ExternalAgent', 'Amazonbot', 'Bytespider', 'DuckAssistBot', 'YouBot',
];

const DISALLOW = ['/api/contact/', '/api/subscribe/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
