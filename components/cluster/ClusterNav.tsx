/**
 * Sub-navigation of the control room. One list, rendered on every /cluster/*
 * page and on the home. Text links; the current page is marked with
 * aria-current, not with colour alone. Server component.
 */
export const CLUSTER_SECTIONS: { href: string; label: string; what: string }[] = [
  { href: '/cluster/', label: 'Architecture', what: 'the three clusters, the target architecture, the constitution' },
  { href: '/cluster/mandate/', label: 'Mandate', what: 'the sixteen sections Agent 3 executes' },
  { href: '/cluster/registry/', label: 'Registry', what: 'every repository, its status, its gate' },
  { href: '/cluster/kpi/', label: 'KPIs', what: 'revenue first; measured or not yet measured' },
  { href: '/cluster/workflows/', label: 'Workflows', what: 'where businesses lose money, ranked by evidence' },
  { href: '/cluster/roadmap/', label: 'Roadmap', what: 'the 90-day objective, counted from the evidence log' },
  { href: '/cluster/decisions/', label: 'Decisions', what: 'decision log and kill list' },
  { href: '/cluster/reports/', label: 'Reports', what: 'weekly CEO reports' },
  { href: '/cluster/agents/', label: 'Agents', what: 'agentic workflows and their permissions' },
  { href: '/cluster/contracts/', label: 'Contracts', what: 'versioned cross-cluster interfaces' },
  { href: '/cluster/intelligence/', label: 'Intelligence', what: 'the web-intelligence watchlist' },
];

export default function ClusterNav({ current }: { current: string }) {
  return (
    <nav className="cr-nav" aria-label="Control room sections">
      <ul>
        {CLUSTER_SECTIONS.map((s) => (
          <li key={s.href}>
            <a href={s.href} aria-current={s.href === current ? 'page' : undefined}>{s.label}</a>
          </li>
        ))}
        <li>
          <a href="/api/cluster/" className="url">/api/cluster/</a>
        </li>
      </ul>
    </nav>
  );
}
