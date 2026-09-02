import Badge from './Badge';
import type { Badge as BadgeKind, Pointer } from '@/content/types';

/** Kicker line under a page title: badge · date · reading time. */
export function MetaLine({ badge, parts }: { badge?: BadgeKind; parts: (string | undefined)[] }) {
  return (
    <p className="meta-line">
      {badge && <Badge kind={badge} />}
      {parts.filter(Boolean).map((p, i) => <span key={i}>{p}</span>)}
    </p>
  );
}

/** One line, one verb, back to the domain that owns the artefact. */
export function ArtefactLine({ pointer, verb = 'Open' }: { pointer: Pointer; verb?: string }) {
  const external = pointer.href.startsWith('http');
  return (
    <p className="artefact-line">
      <span className="artefact-owner">{pointer.owner}</span>
      <a href={pointer.href} {...(external ? { rel: 'noopener noreferrer' } : {})}>
        {verb}: {pointer.label} →
      </a>
    </p>
  );
}

/** The designed empty state. Says what is missing and when it is due; never fakes. */
export function EmptyState({ title, body, due }: { title: string; body: string; due?: string }) {
  return (
    <div className="empty" role="note">
      <Badge kind="WEEKLY SLOT EMPTY" />
      <h2>{title}</h2>
      <p>{body}</p>
      {due && <p className="empty-due">Next due: <time dateTime={due}>{due}</time></p>}
    </div>
  );
}
