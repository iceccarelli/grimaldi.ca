/**
 * github.ts — live metadata for public repositories: the proof engines and
 * the Operations cluster registry.
 *
 * The eleven chapter repositories are the strongest verifiable claim on this
 * site, and the registry's last-push dates are the cluster's pulse. Rather
 * than restating either in hand-written copy that goes stale, the pages read
 * GitHub at build/revalidation time, so pushing a better README description
 * to a repository improves grimaldi.ca with no site change.
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

/**
 * Live metadata for any public repository, `owner/name`. Shared by the proof
 * engines and the cluster registry. Same failure policy: null, never invented.
 */
export type RepoMeta = {
  fullName: string;
  url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  /** Date of the last push, YYYY-MM-DD. */
  updated: string | null;
  stars: number | null;
  openIssues: number | null;
  license: string | null;
  archived: boolean | null;
  enriched: boolean;
};

export async function repoMeta(fullName: string): Promise<RepoMeta> {
  const base: RepoMeta = {
    fullName,
    url: `https://github.com/${fullName}`,
    description: null,
    language: null,
    topics: [],
    updated: null,
    stars: null,
    openIssues: null,
    license: null,
    archived: null,
    enriched: false,
  };

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
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
    const license = d.license as Record<string, unknown> | null | undefined;
    return {
      ...base,
      description: typeof d.description === 'string' ? d.description : null,
      language: typeof d.language === 'string' ? d.language : null,
      topics: Array.isArray(d.topics) ? (d.topics as string[]).slice(0, 6) : [],
      updated: typeof d.pushed_at === 'string' ? d.pushed_at.slice(0, 10) : null,
      stars: typeof d.stargazers_count === 'number' ? d.stargazers_count : null,
      openIssues: typeof d.open_issues_count === 'number' ? d.open_issues_count : null,
      license: license && typeof license.spdx_id === 'string' && license.spdx_id !== 'NOASSERTION' ? license.spdx_id : null,
      archived: typeof d.archived === 'boolean' ? d.archived : null,
      enriched: true,
    };
  } catch {
    return base;
  }
}

async function fetchOne(n: number): Promise<ProofEngine> {
  const repo = REPO(n);
  const m = await repoMeta(`${OWNER}/${repo}`);
  return {
    chapter: n,
    repo,
    url: m.url,
    description: m.description,
    language: m.language,
    topics: m.topics,
    updated: m.updated,
    stars: m.stars,
    enriched: m.enriched,
  };
}

export async function proofEngines(): Promise<ProofEngine[]> {
  return Promise.all(Array.from({ length: CHAPTER_COUNT }, (_, i) => fetchOne(i + 1)));
}

/**
 * Weekly commit counts for the last 52 weeks — the repository's pulse.
 *
 * GitHub computes these statistics lazily and answers 202 with an empty body
 * on the first request; the next revalidation gets the data. Until then, and
 * whenever the API is unreachable, the answer is null and the sparkline is
 * simply not drawn. A flat line of invented zeros would be a lie about a live
 * repository; an absent line is the truth about an unreachable API.
 */
export type CommitActivity = {
  fullName: string;
  /** Oldest → newest, 52 entries, commits per week. */
  weeks: number[];
  total: number;
  /** ISO date of the most recent week bucket start. */
  latestWeek: string;
};

export async function commitActivity(fullName: string): Promise<CommitActivity | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/stats/commit_activity`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'grimaldi.ca',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 43200 },
    });
    if (res.status !== 200) return null;
    const d = (await res.json()) as unknown;
    if (!Array.isArray(d) || d.length === 0) return null;
    const rows = d
      .filter((w): w is { week: number; total: number } => typeof w === 'object' && w !== null && typeof (w as { total?: unknown }).total === 'number' && typeof (w as { week?: unknown }).week === 'number')
      .sort((a, b) => a.week - b.week)
      .slice(-52);
    if (rows.length === 0) return null;
    return {
      fullName,
      weeks: rows.map((w) => w.total),
      total: rows.reduce((n, w) => n + w.total, 0),
      latestWeek: new Date(rows[rows.length - 1].week * 1000).toISOString().slice(0, 10),
    };
  } catch {
    return null;
  }
}

/** Commit activity for every located registry repository, keyed by `owner/name`. Missing = null. */
export async function registryActivity(fullNames: (string | null)[]): Promise<Record<string, CommitActivity | null>> {
  const names = fullNames.filter((n): n is string => typeof n === 'string');
  const rows = await Promise.all(names.map(commitActivity));
  return Object.fromEntries(names.map((n, i) => [n, rows[i]]));
}

/** Metadata for every located registry repository, keyed by `owner/name`. */
export async function registryMeta(fullNames: (string | null)[]): Promise<Record<string, RepoMeta>> {
  const names = fullNames.filter((n): n is string => typeof n === 'string');
  const metas = await Promise.all(names.map(repoMeta));
  return Object.fromEntries(metas.map((m) => [m.fullName, m]));
}
