/**
 * The topic registry. Publishing a new explainer is two lines: a file in this
 * directory and an entry here. Everything downstream — routes, sitemap, feeds,
 * the machine index, the home page shelf — reads from this list.
 */

import type { Topic } from '../types';
import itOt from './it-ot-convergence-railway-traction-power';
import inertia from './grid-inertia-and-the-50-hz-constraint';

export const allTopics: Topic[] = [inertia, itOt];

/** Only reviewed work is exposed to crawlers, feeds and agents. */
export const publishedTopics = (): Topic[] =>
  allTopics
    .filter((t) => t.status === 'published')
    .sort((a, b) => b.updated.localeCompare(a.updated));

export const topicBySlug = (slug: string): Topic | undefined =>
  allTopics.find((t) => t.slug === slug);
