/**
 * agents.ts — the agentic workflows (§7), as permission specifications.
 *
 * Four agents, each around one economic workflow. Every agent has explicit
 * `may` and `mayNot` lists and a named human approval step. None is built:
 * status 'specified' means the permissions are written down before any code,
 * so that the code has a contract to be tested against.
 */

import type { AgentSpec } from './types';

export const agents: AgentSpec[] = [
  {
    id: 'estimation',
    name: 'Estimation agent',
    steps: ['reads project information', 'identifies missing information', 'calculates the estimate', 'produces the assumptions', 'requests human approval'],
    may: ['read job files, photos and measurements the customer uploaded', 'read the price book', 'draft an estimate with every assumption listed', 'ask the estimator a question'],
    mayNot: ['send anything to a customer', 'change the price book', 'approve its own estimate', 'invent a measurement it does not have'],
    approval: 'The estimator approves or edits every estimate before it becomes a quote.',
    status: 'specified',
  },
  {
    id: 'sales',
    name: 'Sales agent',
    steps: ['qualifies the lead', 'prepares the response', 'schedules the meeting', 'updates the CRM'],
    may: ['read inbound leads', 'draft a reply for review', 'propose meeting slots from the calendar', 'write structured fields to the CRM'],
    mayNot: ['send a reply without review during the pilot', 'commit to a price', 'promise a date', 'contact a lead that opted out'],
    approval: 'A human sends the first reply. Autonomy is widened only per template, per customer, by decision.',
    status: 'specified',
  },
  {
    id: 'operations',
    name: 'Operations agent',
    steps: ['detects a delayed job', 'identifies the cause', 'proposes a schedule change', 'requests approval'],
    may: ['read the schedule and job status', 'read crew availability', 'propose a re-sequenced schedule with the trade-offs stated'],
    mayNot: ['move a job without approval', 'notify a customer', 'reassign a crew member', 'suppress a delay from the report'],
    approval: 'The dispatcher approves every schedule change.',
    status: 'specified',
  },
  {
    id: 'finance',
    name: 'Finance agent',
    steps: ['identifies unpaid invoices', 'prioritizes collection', 'drafts the communication', 'records the outcome'],
    may: ['read receivables', 'rank by age and amount', 'draft a reminder in the company’s tone', 'record the outcome of a call a human made'],
    mayNot: ['send a reminder without approval', 'offer a discount or a payment plan', 'write off anything', 'contact a customer in dispute'],
    approval: 'The owner approves each communication; the agent never touches money.',
    status: 'specified',
  },
];
