#!/usr/bin/env node
/**
 * verify-cluster.mjs — the control room's integrity guard.
 *
 * `tsc` already enforces the shape of every record. This checks the rules the
 * type system cannot express, and fails the build when one is broken:
 *
 *   1. Registry slugs are unique; every `duplicates` reference resolves.
 *   2. Every ARCHIVE entry has a kill-list entry naming it.
 *   3. A KPI with a value has a measurement date, and vice versa.
 *   4. A weekly report's week is a valid ISO week; weeks are unique.
 *   5. Decision IDs are unique and sequential in form (D-###).
 *   6. Evidence IDs are unique; every workflow evidenceRef resolves.
 *   7. Every registry entry's `reviewed` date is a real date.
 *
 * Dependency-free. Reads the compiled content via a tiny TypeScript strip so
 * it runs before `next build` without a bundler.
 */

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Load a content module by transpiling content/cluster/*.ts with the
 * TypeScript compiler already in devDependencies, then importing the result
 * from a data: URL. No extra dependency, no build step.
 */
async function loadCluster() {
  const ts = await import('typescript');
  const files = [
    'types', 'clusters', 'mandate', 'registry', 'kpis', 'workflows',
    'evidence', 'decisions', 'roadmap', 'reports', 'intelligence', 'contracts', 'agents',
  ];
  const mods = {};
  for (const f of files) {
    const src = readFileSync(resolve(root, 'content/cluster', `${f}.ts`), 'utf8');
    // Content files only import types from './types' — strip those imports.
    const stripped = src.replace(/^import\s+type\s+[^;]+;\s*$/gm, '').replace(/^import\s+\{[^}]*\}\s+from\s+'\.\/types';\s*$/gm, '');
    const js = ts.default.transpileModule(stripped, {
      compilerOptions: { module: ts.default.ModuleKind.ESNext, target: ts.default.ScriptTarget.ES2022 },
    }).outputText;
    mods[f] = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
  }
  return mods;
}

const errors = [];
const fail = (msg) => errors.push(msg);
const isoDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

const m = await loadCluster();
const { registry } = m.registry;
const { killList, decisions } = m.decisions;
const { kpis } = m.kpis;
const { reports } = m.reports;
const { evidence } = m.evidence;
const { workflows } = m.workflows;

// 1. Registry
const slugs = new Set();
for (const r of registry) {
  if (slugs.has(r.slug)) fail(`registry: duplicate slug "${r.slug}"`);
  slugs.add(r.slug);
  if (!isoDate(r.reviewed)) fail(`registry: ${r.slug} has an invalid reviewed date "${r.reviewed}"`);
  if (r.repo !== null && !/^[\w.-]+\/[\w.-]+$/.test(r.repo)) fail(`registry: ${r.slug} repo must be owner/name, got "${r.repo}"`);
  if (r.maturity === 'not-located' && r.repo !== null) fail(`registry: ${r.slug} is "not-located" but has a repo`);
}
for (const r of registry) for (const d of r.duplicates) if (!slugs.has(d)) fail(`registry: ${r.slug} lists unknown duplicate "${d}"`);

// 2. ARCHIVE needs a kill-list entry
for (const r of registry.filter((x) => x.status === 'ARCHIVE')) {
  const named = killList.some((k) => k.what.toLowerCase().includes(r.name.toLowerCase()) || k.what.includes(r.slug));
  if (!named) fail(`registry: ${r.slug} is ARCHIVE but no kill-list entry names it`);
}

// 3. KPI measurement integrity
for (const k of kpis) {
  if ((k.value === null) !== (k.measuredAt === null)) fail(`kpi: ${k.id} has value/measuredAt mismatch (a measurement needs both)`);
  if (k.measuredAt !== null && !isoDate(k.measuredAt)) fail(`kpi: ${k.id} measuredAt is not an ISO date`);
  if (!k.source || !k.source.trim()) fail(`kpi: ${k.id} has no source`);
}
if (kpis.filter((k) => k.rank === 'primary').length !== 1) fail('kpi: exactly one primary KPI is required');

// 4. Reports
const weeks = new Set();
for (const r of reports) {
  if (!/^\d{4}-W\d{2}$/.test(r.week)) fail(`reports: "${r.week}" is not an ISO week (YYYY-Www)`);
  if (weeks.has(r.week)) fail(`reports: duplicate week ${r.week}`);
  weeks.add(r.week);
  if (!isoDate(r.filed)) fail(`reports: ${r.week} filed date invalid`);
}

// 5. Decisions
const dids = new Set();
for (const d of decisions) {
  if (!/^D-\d{3}$/.test(d.id)) fail(`decisions: id "${d.id}" must match D-###`);
  if (dids.has(d.id)) fail(`decisions: duplicate id ${d.id}`);
  dids.add(d.id);
  if (!isoDate(d.date)) fail(`decisions: ${d.id} date invalid`);
  if (d.requiresCeoApproval && d.status === 'accepted' && !d.approvedBy) fail(`decisions: ${d.id} is accepted, requires CEO approval, but has no approver`);
}

// 6. Evidence and workflow refs
const eids = new Set();
for (const e of evidence) {
  if (eids.has(e.id)) fail(`evidence: duplicate id ${e.id}`);
  eids.add(e.id);
  if (!isoDate(e.date)) fail(`evidence: ${e.id} date invalid`);
  if (e.validation && e.kind === 'conversation') fail(`evidence: ${e.id} is a conversation marked as validation — compliments are not validation`);
}
for (const w of workflows) {
  for (const ref of w.evidenceRefs) if (!eids.has(ref)) fail(`workflows: ${w.id} references unknown evidence "${ref}"`);
  const vals = Object.values(w.score);
  for (const v of vals) if (v !== null && (!Number.isInteger(v) || v < 1 || v > 5)) fail(`workflows: ${w.id} score out of range 1–5`);
  if (vals.some((v) => v !== null) && w.evidenceRefs.length === 0) fail(`workflows: ${w.id} is scored without evidence — founder preference is not a score`);
}

if (errors.length) {
  console.error(`verify-cluster: ${errors.length} problem${errors.length === 1 ? '' : 's'}`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log(
  `verify-cluster OK — ${registry.length} registry entries, ${kpis.length} KPIs (${kpis.filter((k) => k.value !== null).length} measured), ` +
    `${decisions.length} decisions, ${killList.length} killed, ${evidence.length} evidence, ${reports.length} reports.`,
);
