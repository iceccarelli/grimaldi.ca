/**
 * contracts.ts — cross-cluster integration contracts (§13–14).
 *
 * Communication between clusters happens through versioned APIs, events,
 * schemas and documented interfaces — never through database coupling. Each
 * contract names a producer, a consumer, a version and a field-level schema,
 * and states how each side keeps working when the other is absent.
 *
 * Status 'proposed' means documented here and nowhere else. Nothing is built
 * on a contract until both counterparties have a customer reason.
 */

import type { Contract } from './types';

export const contracts: Contract[] = [
  {
    id: 'operational-event',
    name: 'OperationalEvent',
    version: '0.1.0',
    status: 'proposed',
    producer: 'energy',
    consumer: 'operations',
    summary:
      'Energy Intelligence (e.g. GridOS) detects an asset anomaly and emits an operational event. Operations (Runway Fuel or a vertical) may convert it into a work order.',
    schema: [
      { field: 'eventId', type: 'string (UUID)', meaning: 'Idempotency key; a consumer that sees it twice does nothing the second time.' },
      { field: 'emittedAt', type: 'string (RFC 3339)', meaning: 'Producer clock, UTC.' },
      { field: 'producer', type: '"energy"', meaning: 'Cluster of origin. Fixed per contract.' },
      { field: 'assetRef', type: 'string (URI)', meaning: 'Opaque reference into the producer’s asset registry. The consumer never resolves it against a shared database.' },
      { field: 'kind', type: '"anomaly" | "threshold" | "outage" | "maintenance-due"', meaning: 'Closed set; new kinds bump the minor version.' },
      { field: 'severity', type: '"info" | "warning" | "critical"', meaning: 'Producer’s assessment. The consumer decides what a work order is worth.' },
      { field: 'summary', type: 'string ≤ 280', meaning: 'Human-readable, for the work-order title.' },
      { field: 'evidenceUrl', type: 'string (URL) | null', meaning: 'Where the producer keeps the detail. Optional; the event is complete without it.' },
    ],
    independence:
      'Energy runs with no consumer subscribed. Operations runs with no producer: work orders are also created by hand and by the verticals’ own triggers.',
  },
  {
    id: 'work-order',
    name: 'WorkOrder',
    version: '0.1.0',
    status: 'proposed',
    producer: 'operations',
    consumer: 'physical-ai',
    summary:
      'Operations issues a work order — an inspection, a pick, a paint pass — that Physical AI may execute with its own planning, simulation, safety and authorization chain. Operations never commands an actuator.',
    schema: [
      { field: 'workOrderId', type: 'string (UUID)', meaning: 'Idempotency key.' },
      { field: 'createdAt', type: 'string (RFC 3339)', meaning: 'Operations clock, UTC.' },
      { field: 'originEventId', type: 'string (UUID) | null', meaning: 'The OperationalEvent that caused it, if any.' },
      { field: 'task', type: '"inspection" | "palletize" | "surface-finish" | "other"', meaning: 'Closed set of task families Physical AI recognizes.' },
      { field: 'siteRef', type: 'string (URI)', meaning: 'Opaque site or cell reference.' },
      { field: 'window', type: '{ notBefore, notAfter }', meaning: 'Execution window. Outside it the order expires without action.' },
      { field: 'approval', type: '{ approvedBy, approvedAt }', meaning: 'A human approved the order in Operations. Required; a work order without approval is invalid by schema.' },
      { field: 'callbackUrl', type: 'string (URL)', meaning: 'Where the result is delivered. Operations polls if the callback fails.' },
    ],
    independence:
      'Physical AI accepts work orders from any source including a human console. Operations keeps a work order in state "awaiting-executor" indefinitely if no executor exists.',
  },
  {
    id: 'inspection-result',
    name: 'InspectionResult',
    version: '0.1.0',
    status: 'proposed',
    producer: 'physical-ai',
    consumer: 'energy',
    summary:
      'Physical AI returns the result of an executed work order. Energy Intelligence attaches it to the asset that raised the original event. Operations receives a copy to close the work order.',
    schema: [
      { field: 'resultId', type: 'string (UUID)', meaning: 'Idempotency key.' },
      { field: 'workOrderId', type: 'string (UUID)', meaning: 'The WorkOrder executed.' },
      { field: 'completedAt', type: 'string (RFC 3339)', meaning: 'Executor clock, UTC.' },
      { field: 'outcome', type: '"completed" | "partial" | "aborted" | "failed-safe"', meaning: 'Closed set. "failed-safe" means the safety chain stopped execution — always reported, never hidden.' },
      { field: 'findings', type: 'Finding[]', meaning: 'Each with classification, localization and confidence. Empty array is a valid result.' },
      { field: 'evidence', type: 'Artefact[]', meaning: 'Images, point clouds, logs, by URL with hash.' },
      { field: 'interventions', type: 'number', meaning: 'Human interventions during execution. A KPI for Physical AI; a cost input for Operations.' },
    ],
    independence:
      'Energy treats a missing result as "no inspection performed" and keeps its own anomaly open. Operations closes work orders manually if no executor reports.',
  },
];

export const contractById = (id: string): Contract | undefined => contracts.find((c) => c.id === id);
