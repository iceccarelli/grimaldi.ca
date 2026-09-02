import Badge from './Badge';
import { NOW_UPDATED, nowLines } from '@/content/now';

/** The /now facts, as a strip. Same data on / and /now. */
export default function NowStrip({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={compact ? 'now-strip compact' : 'now-strip'} aria-label={`Now — ${NOW_UPDATED}`}>
      {nowLines.map((l) => (
        <div className="now-row" key={l.label}>
          <dt>{l.label}</dt>
          <dd>
            {l.href ? <a href={l.href} {...(l.href.startsWith('http') ? { rel: 'noopener noreferrer' } : {})}>{l.text}</a> : l.text}
            {l.badge && <> <Badge kind={l.badge} /></>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
