import { REPO_STATUSES, type RepoStatus } from '@/content/cluster';

/**
 * StatusBars — registry entries per constitutional status.
 *
 * One series, one hue; bars ≤ 24px thick with a rounded data-end, square at
 * the baseline; the count sits at the tip in text ink. ARCHIVE is the only
 * status allowed a different colour, because it is a state, not a category.
 * Server component.
 */
export default function StatusBars({ counts }: { counts: Record<RepoStatus, number> }) {
  const W = 420;
  const rowH = 30;
  const H = REPO_STATUSES.length * rowH + 8;
  const labelW = 110;
  const max = Math.max(1, ...Object.values(counts));
  const barMaxW = W - labelW - 50;
  const barH = 14;
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <figure className="viz-fig">
      <svg className="viz viz-bars" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Registry by status: ${REPO_STATUSES.map((s) => `${s} ${counts[s]}`).join(', ')}`}>
        <title>{`Registry by status — ${REPO_STATUSES.map((s) => `${s} ${counts[s]}`).join(' · ')} · ${total} total`}</title>
        {REPO_STATUSES.map((s, i) => {
          const y = 6 + i * rowH;
          const w = (counts[s] / max) * barMaxW;
          return (
            <g key={s}>
              <title>{`${s}: ${counts[s]} of ${total}`}</title>
              <text x={labelW - 10} y={y + barH / 2 + 4} textAnchor="end" className="viz-label viz-label--mono">{s}</text>
              <line x1={labelW} x2={labelW} y1={y - 2} y2={y + barH + 2} className="viz-baseline" />
              {w > 0 && (
                <path
                  d={`M${labelW},${y} H${labelW + w - 4} a4,4 0 0 1 4,4 v${barH - 8} a4,4 0 0 1 -4,4 H${labelW} Z`}
                  className={s === 'ARCHIVE' ? 'viz-fill--kill' : 'viz-fill'}
                />
              )}
              <text x={labelW + w + 8} y={y + barH / 2 + 4} className="viz-num">{counts[s]}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
