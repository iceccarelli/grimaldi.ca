import { roadmap, reports } from '@/content/cluster';
import { validationPeriod } from '@/lib/cluster';

/**
 * PeriodTimeline — the 90-day validation period as thirteen week slots.
 *
 * Elapsed weeks fill; the current week carries a marker; a week with a filed
 * CEO report shows a dot under its slot. An empty slot in the past is an
 * unfiled report, shown as such. Server component; recomputed twice a day
 * with the page that renders it.
 */
function isoWeek(d: Date): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((t.getTime() - y0.getTime()) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(wk).padStart(2, '0')}`;
}

export default function PeriodTimeline({ today = new Date().toISOString().slice(0, 10) }: { today?: string }) {
  const p = validationPeriod(today);
  const start = new Date(roadmap.start);
  const weeks = Math.ceil(p.total / 7);
  const W = 720;
  const H = 78;
  const left = 8;
  const right = 8;
  const slotW = (W - left - right) / weeks;
  const barY = 26;
  const barH = 16;
  const filedWeeks = new Set(reports.map((r) => r.week));
  const elapsedWeeks = Math.min(weeks, Math.floor(p.elapsed / 7));
  const todayX = left + (Math.min(p.elapsed, p.total) / p.total) * (W - left - right);

  return (
    <figure className="viz-fig">
      <svg className="viz viz--wide viz-timeline" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Validation period ${roadmap.start} to ${roadmap.end}: ${p.elapsed} of ${p.total} days elapsed, ${reports.length} of ${weeks} weekly reports filed`}>
        <title>{`Validation period · ${p.elapsed} of ${p.total} days elapsed · ${reports.length} of ${weeks} weekly reports filed`}</title>
        {Array.from({ length: weeks }, (_, i) => {
          const wkStart = new Date(start.getTime() + i * 7 * 86_400_000);
          const wk = isoWeek(wkStart);
          const filed = filedWeeks.has(wk);
          const past = i < elapsedWeeks;
          const x = left + i * slotW;
          return (
            <g key={i}>
              <title>{`Week ${i + 1} · ${wk} · from ${wkStart.toISOString().slice(0, 10)} · ${filed ? 'report filed' : past ? 'report not filed' : 'upcoming'}`}</title>
              <rect x={x + 1} y={barY} width={slotW - 2} height={barH} rx={3} className={past ? 'viz-fill' : 'viz-track-fill'} />
              {filed && <circle cx={x + slotW / 2} cy={barY + barH + 12} r={4} className="viz-dot" />}
              {!filed && past && <circle cx={x + slotW / 2} cy={barY + barH + 12} r={4} className="viz-hollow" />}
            </g>
          );
        })}
        <line x1={todayX} x2={todayX} y1={barY - 8} y2={barY + barH + 6} className="viz-marker" />
        <text x={Math.min(W - 60, Math.max(28, todayX))} y={barY - 12} textAnchor="middle" className="viz-label">
          {p.over ? 'period over' : `day ${p.elapsed}`}
        </text>
        <text x={left} y={H - 6} className="viz-label">{roadmap.start}</text>
        <text x={W - right} y={H - 6} textAnchor="end" className="viz-label">{roadmap.end}</text>
      </svg>
      <figcaption>
        {weeks} weekly slots · filled = elapsed · <span className="viz-key viz-key--dot" /> report filed · <span className="viz-key viz-key--hollow" /> report missing
      </figcaption>
    </figure>
  );
}
