/**
 * github.ts — live metadata for the public proof-engine repositories.
 *
 * The eleven chapter repositories are the strongest verifiable claim on this
 * site. Rather than restating them in hand-written copy that goes stale, the
 * page reads GitHub at build/revalidation time, so pushing a better README
 * description to a proof engine improves grimaldi.ca with no site change.
 *
 * Failure policy: GitHub is a nice-to-have, never a dependency. If the API is
 * unreachable, rate-limited or slow, every repo degrades to its known-good
 * name and URL and the page renders identically minus the enrichment. The
 * build must never fail because a third party had a bad minute.
 *
 * Auth: unauthenticated requests are limited to 60/hour per IP. Eleven calls
 * per revalidation window is comfortably inside that. Set GITHUB_TOKEN in the
 * Vercel project to raise the ceiling if the window is ever tightened.
 */

export type ProofEngine = {
  chapter: number;
  repo: string;
  url: string;
  /** Null whenever GitHub could not be reached — never invented. */
  description: string | null;
  language: string | null;
  topics: string[];
  updated: string | null;
  stars: number | null;
  /** True when the enrichment above came back from the API this build. */
  enriched: boolean;
};

const OWNER = 'iceccarelli';
const REPO = (n: number) => `Renewables_Migration_Chapter${n}_Proof_Engine`;
export const CHAPTER_COUNT = 11;

async function fetchOne(n: number): Promise<ProofEngine> {
  const repo = REPO(n);
  const base: ProofEngine = {
    chapter: n,
    repo,
    url: `https://github.com/${OWNER}/${repo}`,
    description: null,
    language: null,
    topics: [],
    updated: null,
    stars: null,
    enriched: false,
  };

  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'grimaldi.ca',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      // Revalidate twice a day: the repos change far more slowly than that,
      // and it keeps the site well inside the unauthenticated rate limit.
      next: { revalidate: 43200 },
    });
    if (!res.ok) return base;
    const d = (await res.json()) as Record<string, unknown>;
    return {
      ...base,
      description: typeof d.description === 'string' ? d.description : null,
      language: typeof d.language === 'string' ? d.language : null,
      topics: Array.isArray(d.topics) ? (d.topics as string[]).slice(0, 6) : [],
      updated: typeof d.pushed_at === 'string' ? d.pushed_at.slice(0, 10) : null,
      stars: typeof d.stargazers_count === 'number' ? d.stargazers_count : null,
      enriched: true,
    };
  } catch {
    return base;
  }
}

export async function proofEngines(): Promise<ProofEngine[]> {
  return Promise.all(Array.from({ length: CHAPTER_COUNT }, (_, i) => fetchOne(i + 1)));
}
