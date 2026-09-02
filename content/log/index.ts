/**
 * The field-notes registry. One note per week is the contract; the slot is
 * rendered whether or not it is filled, so an empty week looks empty on
 * purpose rather than being hidden.
 *
 * Publishing a note is one file here plus one line in `allNotes`.
 */

import type { Note } from '../types';
import residual from './what-a-residual-is-for-on-a-traction-grid';

export const allNotes: Note[] = [residual];

export const publishedNotes = (): Note[] =>
  allNotes.filter((n) => n.status === 'published').sort((a, b) => b.date.localeCompare(a.date));

export const noteBySlug = (slug: string): Note | undefined => allNotes.find((n) => n.slug === slug);

/* ── The weekly slot ──────────────────────────────────────────────── */

/** ISO-8601 week: Monday 00:00 UTC → Sunday. */
export function isoWeek(d: Date): { year: number; week: number; monday: Date; sunday: Date } {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7; // Mon=1 … Sun=7
  const monday = new Date(t);
  monday.setUTCDate(t.getUTCDate() - day + 1);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const thursday = new Date(t);
  thursday.setUTCDate(t.getUTCDate() + 4 - day);
  const jan1 = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((thursday.getTime() - jan1.getTime()) / 86400000 + 1) / 7);
  return { year: thursday.getUTCFullYear(), week, monday, sunday };
}

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export type Slot =
  | { filled: true; note: Note; week: string }
  | { filled: false; week: string; due: string };

/**
 * The current week's slot, evaluated at build/revalidation time. Filled when
 * a published note is dated inside the current ISO week; otherwise the slot
 * reports its own due date (the Sunday) and nothing else.
 */
export function currentSlot(now: Date = new Date()): Slot {
  const { year, week, monday, sunday } = isoWeek(now);
  const label = `${year}-W${String(week).padStart(2, '0')}`;
  const from = isoDate(monday);
  const to = isoDate(sunday);
  const note = publishedNotes().find((n) => n.date >= from && n.date <= to);
  return note ? { filled: true, note, week: label } : { filled: false, week: label, due: to };
}
