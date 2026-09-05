# grimaldi.ca — control surface of the Operations cluster

**Agent 3 — Operations & Commercial Automation. Command: "Make money and build distribution."**

This repository is the website at https://grimaldi.ca and the control and integration surface of the Operations cluster of Grimaldi Engineering. It displays and orchestrates; it sells nothing. Every number on it is measured and sourced, or it says *not yet measured*.

## What the site is

| Surface | Route | Source of truth |
| --- | --- | --- |
| Control room | `/` | computed from everything below |
| Architecture, constitution | `/cluster/` | `content/cluster/clusters.ts` |
| Mandate (16 sections) | `/cluster/mandate/` | `content/cluster/mandate.ts` |
| Repository registry | `/cluster/registry/`, `/cluster/registry/[slug]/` | `content/cluster/registry.ts` + live GitHub (`lib/github.ts`) |
| KPI system | `/cluster/kpi/` | `content/cluster/kpis.ts` |
| Workflow ranking | `/cluster/workflows/` | `content/cluster/workflows.ts` |
| 90-day roadmap + evidence | `/cluster/roadmap/` | `content/cluster/roadmap.ts`, `evidence.ts` |
| Decision log + kill list | `/cluster/decisions/` | `content/cluster/decisions.ts` |
| Weekly CEO reports | `/cluster/reports/` | `content/cluster/reports.ts` |
| Agent permissions | `/cluster/agents/` | `content/cluster/agents.ts` |
| Cross-cluster contracts | `/cluster/contracts/` | `content/cluster/contracts.ts` |
| Web-intelligence watchlist | `/cluster/intelligence/` | `content/cluster/intelligence.ts` |
| Machine index | `/api/cluster/`, `/api/cluster/registry/`, `/api/cluster/kpi/` | same files, same functions |
| The operator | `/about/`, `/now/`, `/topics/`, `/books/`, `/contact/` | `content/now.ts`, `content/topics/` |

Everything is typed TypeScript content. `tsc` refuses a registry entry with a missing field or a status outside the six the constitution allows. `scripts/verify-cluster.mjs` enforces the rules the type system cannot: a KPI with a value but no measurement date, an `ARCHIVE` without a kill-list entry, a scored workflow without evidence, a conversation marked as validation.

## The evidence rule

- A KPI is `null` until measured. The UI renders `null` as "not yet measured", never as 0.
- Roadmap progress is **counted** from `evidence.ts`. It is never typed in.
- GitHub language, last push and licence are fetched at build time (revalidated twice a day) and omitted when GitHub is unreachable.
- Repositories the mandate names but the public inventory could not locate are listed as *not located*, not linked to a guess.

## Operating the control room

| To… | Edit | Then |
| --- | --- | --- |
| Log a customer conversation, pilot, partnership or customer | `content/cluster/evidence.ts` | roadmap and KPIs update on the next build |
| Record a KPI measurement | `content/cluster/kpis.ts` — set `value` **and** `measuredAt`, name the `source` | |
| Score a workflow | `content/cluster/workflows.ts` — 1–5 per dimension, with `evidenceRefs` | the table re-ranks itself |
| Take a decision | append to `content/cluster/decisions.ts` (`D-###`) | |
| Freeze, kill or archive | append to `killList` in `decisions.ts`; set the registry status | CI checks the two agree |
| Change a repository's status | `content/cluster/registry.ts` + a decision | |
| File the weekly report | append to `content/cluster/reports.ts` (`YYYY-Www`) | |
| Review a watchlist item | `content/cluster/intelligence.ts` — set `lastReviewed`, append `findings` | |
| Propose or version a contract | `content/cluster/contracts.ts` | |

```bash
npm ci
npm run verify          # verify-cluster + tsc
npm run build           # every route must prerender ○ Static (registry routes revalidate twice a day)
npm run dev
```

Optional: `GITHUB_TOKEN` in the Vercel project raises the GitHub API ceiling. The contact and subscribe routes need `RESEND_API_KEY` (see `lib/site.ts`).

## Delivery convention

Changes arrive as `.patch` files and are **applied, never committed** — CI fails if a `.patch` is tracked. From the Codespace:

```bash
git apply --check <file>.patch && git apply <file>.patch
# or, if the patch was uploaded to main through the GitHub web UI:
scripts/apply-patch.sh
```

## Group constitution (summary)

Three clusters — Energy Intelligence, Physical AI & Robotics, Operations & Commercial Automation. Each owns its domain. No fourth cluster. Repositories move between clusters only with a documented decision and CEO approval. Shared primitives only when genuinely cross-cluster. Communication through versioned APIs, events, schemas and contracts — never undocumented database coupling. Agents are rewarded for revenue, customers, deployments, measurable ROI, benchmarks, IP, research quality and reduced complexity — not for commits, repositories, lines of code, features or architecture.

The full text is at `/cluster/`.
