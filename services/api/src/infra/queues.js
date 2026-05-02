/**
 * BullMQ Queue Layer — for heavy / async work.
 *
 * Heavy → async → background workers
 * Light → sync (in-process)
 *
 * Queues:
 *   - email.send         — outgoing emails
 *   - sms.send           — outgoing SMS
 *   - chain.anchor       — Polkadot anchor batching
 *   - stl.recompute.bulk — bulk STL recomputes
 *   - ai.exam.generate   — generate exam questions
 *   - reports.daily      — nightly aggregations
 *   - fraud.scan         — periodic fraud scans
 */

let bullmq = null;
let queues = null;

async function lazyLoad() {
  if (bullmq) return;
  try {
    bullmq = await import('bullmq');
  } catch {
    console.warn('[queues] bullmq not installed. Run: pnpm add bullmq ioredis');
  }
}

export async function getQueues() {
  if (queues) return queues;
  await lazyLoad();
  if (!bullmq) return null;

  const { Queue } = bullmq;
  const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };

  queues = {
    email: new Queue('email.send', { connection }),
    sms: new Queue('sms.send', { connection }),
    anchor: new Queue('chain.anchor', { connection }),
    stl: new Queue('stl.recompute.bulk', { connection }),
    exam: new Queue('ai.exam.generate', { connection }),
    reports: new Queue('reports.daily', { connection }),
    fraud: new Queue('fraud.scan', { connection }),
  };

  return queues;
}

/**
 * Enqueue a heavy task. Returns job id.
 */
export async function enqueueHeavy(queueName, data, opts = {}) {
  const qs = await getQueues();
  if (!qs || !qs[queueName]) {
    console.warn('[queues] queue unavailable:', queueName);
    return null;
  }
  const job = await qs[queueName].add(queueName, data, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 500,
    ...opts,
  });
  return job.id;
}

/**
 * Decision helper: should this work be async?
 * Heavy = async (queue). Light = sync (caller).
 */
export function isHeavyTask(taskName) {
  const heavyTasks = [
    'send_email', 'send_sms', 'anchor_to_chain', 'bulk_stl_recompute',
    'generate_exam', 'daily_report', 'fraud_full_scan', 'export_audit_log',
    'send_notification_to_country', 'recalculate_franchise_payouts',
  ];
  return heavyTasks.includes(taskName);
}

export default { getQueues, enqueueHeavy, isHeavyTask };
