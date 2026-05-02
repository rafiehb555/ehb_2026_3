/**
 * BullMQ Workers — process queued jobs.
 * Run as separate process: `node src/infra/workers.js`
 *
 * Each worker handles one queue.
 */

import 'dotenv/config';

let bullmq = null;
async function lazyLoad() {
  if (!bullmq) bullmq = await import('bullmq');
}

const connection = { url: process.env.REDIS_URL || 'redis://localhost:6379' };

async function startWorkers() {
  await lazyLoad();
  if (!bullmq) {
    console.error('[workers] bullmq not installed. Run: pnpm add bullmq ioredis');
    process.exit(1);
  }
  const { Worker } = bullmq;

  // Email worker
  new Worker('email.send', async (job) => {
    console.log('[worker:email]', job.id, job.data);
    // TODO: integrate SES / SendGrid
    return { sent: true };
  }, { connection });

  // SMS worker
  new Worker('sms.send', async (job) => {
    console.log('[worker:sms]', job.id, job.data);
    // TODO: integrate Twilio
    return { sent: true };
  }, { connection });

  // Polkadot anchor worker (batched)
  new Worker('chain.anchor', async (job) => {
    console.log('[worker:anchor]', job.id);
    const blockchain = (await import('../adapters/blockchain/blockchainAdapter.js')).default;
    return await blockchain.anchor(job.data);
  }, { connection, concurrency: 2 });

  // Bulk STL recompute worker
  new Worker('stl.recompute.bulk', async (job) => {
    console.log('[worker:stl]', job.id);
    const { userIds = [] } = job.data;
    return { processed: userIds.length };
  }, { connection, concurrency: 4 });

  // Exam generator worker
  new Worker('ai.exam.generate', async (job) => {
    console.log('[worker:exam]', job.id, job.data.industry);
    // Calls services/ai/src/routes/chat.js with prompts
    return { generated: 0 };
  }, { connection, concurrency: 1 });

  // Daily reports worker
  new Worker('reports.daily', async (job) => {
    console.log('[worker:reports]', job.id);
    return { report_generated: true };
  }, { connection });

  // Fraud scan worker
  new Worker('fraud.scan', async (job) => {
    console.log('[worker:fraud]', job.id);
    const { applyAutoDecision } = await import('../services/autoDecisionEngine.js');
    return await applyAutoDecision(job.data);
  }, { connection, concurrency: 4 });

  console.log('[workers] all workers started');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startWorkers().catch((err) => {
    console.error('[workers] startup failed', err);
    process.exit(1);
  });
}

export { startWorkers };
