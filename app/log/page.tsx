import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Badge from '@/components/Badge';
import { EmptyState } from '@/components/Meta';
import SubscribeForm from '@/components/SubscribeForm';
import { currentSlot, publishedNotes } from '@/content/log';
import { minutesFor } from '@/content/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Log — weekly field notes',
  description:
    'Weekly field notes from high-voltage rail, grids and one shipped cell planner. One slot a week; an empty week is shown empty, not hidden.',
  alternates: { canonical: '/log/' },
};

export default function LogPage() {
  const slot = currentSlot();
  const notes = publishedNotes();

  return (
    <PageShell
      trail={[{ name: 'Log', path: '/log/' }]}
      kicker="Log · weekly"
      title="Field notes"
      standfirst="One note a week. Short, factual, from public physics and public artefacts — nothing from any operator. The slot is rendered whether or not it is filled."
    >
      {/* This week's slot */}
      {slot.filled ? (
        <div className="slot slot-filled">
          <span className="slot-k">This week · {slot.week}</span>
          <a href={`/log/${slot.note.slug}/`} className="slot-title">{slot.note.title} →</a>
        </div>
      ) : (
        <EmptyState
          title={`Week ${slot.week}: no note yet.`}
          body="The slot exists so that the absence is visible. When the note lands it replaces this box; until then nothing is faked to fill it."
          due={slot.due}
        />
      )}

      {/* All notes */}
      {notes.length > 0 ? (
        <ol className="note-list">
          {notes.map((n) => (
            <li key={n.slug}>
              <a href={`/log/${n.slug}/`}>
                <span className="note-date"><time dateTime={n.date}>{n.date}</time></span>
                <span className="note-main">
                  <b>{n.title}</b>
                  <span>{n.description}</span>
                </span>
                <span className="note-meta"><Badge kind={n.badge} /> {minutesFor(n.blocks)} min</span>
              </a>
            </li>
          ))}
        </ol>
      ) : (
        <p className="quiet">No notes published yet.</p>
      )}

      <div className="section-sub">
        <SubscribeForm compact />
      </div>
    </PageShell>
  );
}
