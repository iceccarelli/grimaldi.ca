import Sparkline from '@/components/viz/Sparkline';
import StatusBadge from '@/components/cluster/StatusBadge';
import type { RegistryEntry } from '@/content/cluster';
import type { CommitActivity } from '@/lib/github';

/**
 * PulseBoard — small multiples: one 52-week commit sparkline per located repo.
 *
 * Read live from GitHub at build time. A repository whose statistics GitHub
 * has not computed yet, or that could not be reached, shows "no data" in the
 * sparkline's place — never a flat invented line. Commits are activity, not
 * outcome; the board exists so the operator can see where engineering time
 * goes while revenue is the KPI that counts. Server component.
 */
export default function PulseBoard({
  entries,
  activity,
}: {
  entries: RegistryEntry[];
  activity: Record<string, CommitActivity | null>;
}) {
  const rows = entries.filter((r) => r.repo);
  const withData = rows.filter((r) => activity[r.repo!]);
  const shared = Math.max(1, ...withData.map((r) => Math.max(...activity[r.repo!]!.weeks)));
  return (
    <div className="viz-pulse">
      <table className="cr-table viz-pulse-table">
        <caption>52-week commit activity per repository (live from GitHub, shared scale, peak {shared} commits/week)</caption>
        <thead>
          <tr>
            <th scope="col">Repository</th>
            <th scope="col">Status</th>
            <th scope="col">52 weeks</th>
            <th scope="col" className="num">Commits</th>
            <th scope="col" className="num">Latest week</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const a = activity[r.repo!];
            return (
              <tr key={r.slug}>
                <th scope="row" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <a href={`/cluster/registry/${r.slug}/`}>{r.name}</a>
                </th>
                <td><StatusBadge status={r.status} /></td>
                <td>
                  {a ? (
                    <Sparkline values={a.weeks} label={r.name} width={220} height={36} max={shared} />
                  ) : (
                    <span className="dim viz-nodata">no data from GitHub at build time</span>
                  )}
                </td>
                <td className="num">{a ? a.total : <span className="dim">—</span>}</td>
                <td className="num">{a ? a.weeks[a.weeks.length - 1] : <span className="dim">—</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="dim" style={{ fontSize: '.85rem', margin: '.5rem 0 0' }}>
        Activity is not outcome. The mandate rewards revenue, customers and deployments — not commits. This board only shows where the hours went.
      </p>
    </div>
  );
}
