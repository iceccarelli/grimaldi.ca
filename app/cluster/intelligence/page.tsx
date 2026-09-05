import type { Metadata } from 'next';
import ClusterHeader from '@/components/cluster/ClusterHeader';
import { watchlist } from '@/content/cluster';

export const metadata: Metadata = {
  title: 'Intelligence',
  description:
    'The web-intelligence watchlist of the Operations cluster: competitors (ServiceTitan, Jobber, Housecall Pro), categories, communities and signals monitored to find customer complaints that point at unserved workflows — and what each review found.',
  alternates: { canonical: '/cluster/intelligence/' },
};

export default function IntelligencePage() {
  const reviewed = watchlist.filter((w) => w.lastReviewed !== null).length;

  return (
    <main className="cr">
      <ClusterHeader
        path="/cluster/intelligence/"
        title="Web intelligence"
        intro="What is watched and why. Nothing here is a claim about a competitor’s product; it is the list of what to look at, and the findings each review produced. A row that was never reviewed says so."
      >
        <p className="cr-meta">
          <span>{watchlist.length} items</span>
          <span>{reviewed} reviewed at least once</span>
        </p>
      </ClusterHeader>

      <aside className="cr-rule" style={{ marginTop: 0 }}>
        Customer complaint → unserved workflow → simple product → fast sale. The goal is not to copy competitors.
        Every finding answers: what changed, why it matters, which product it affects, what to build or not build, whom to contact.
      </aside>

      <div className="cr-table-wrap">
        <table className="cr-table">
          <caption>Watchlist</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Kind</th>
              <th scope="col">Why it is watched</th>
              <th scope="col">Last reviewed</th>
              <th scope="col">Findings</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((w) => (
              <tr key={w.id}>
                <th scope="row" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {w.url ? <a href={w.url} rel="noopener noreferrer nofollow">{w.name}</a> : w.name}
                </th>
                <td>{w.kind}</td>
                <td>{w.why}</td>
                <td className="num">{w.lastReviewed ?? <span className="dim">never</span>}</td>
                <td>{w.findings.length ? w.findings.join(' · ') : <span className="dim">none recorded</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
