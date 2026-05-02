// EHB API Service — Express + Mongoose + Socket.IO (ESM)
// Port 5000 (override with API_PORT env var).

import 'dotenv/config';
import http from 'node:http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDB } from './config/db.js';
import { initSocketIo } from './server-socket.js';

import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import pssRouter from './routes/pss.js';
import stlRouter from './routes/stl.js';
import franchiseRouter from './routes/franchise.js';
import dmoRouter from './routes/dmo.js';
import walletRouter from './routes/wallet.js';
import blockchainRouter from './routes/blockchain.js';
import gosellrRouter from './routes/gosellr.js';
import ordersRouter from './routes/orders.js';
import reviewsRouter from './routes/reviews.js';
import complaintsRouter from './routes/complaints.js';
import ridersRouter from './routes/riders.js';
import deliveryRouter from './routes/delivery.js';
import notificationsRouter from './routes/notifications.js';
import crbRouter from './routes/crb.js';
import affiliateRouter from './routes/affiliate.js';
import affiliateWalletRouter from './routes/affiliateWallet.js';
import complianceRouter from './routes/compliance.js';
import kycRouter from './routes/kyc.js';
import adminAffiliateConfigRouter from './routes/adminAffiliateConfig.js';
import adminAffiliateOpsRouter from './routes/adminAffiliateOps.js';
import affiliateHealthRouter from './routes/affiliateHealth.js';
import withdrawalsRouter from './routes/withdrawals.js';
import jobsRouter from './routes/jobs.js';
import aiRouter from './routes/ai-proxy.js';
import aiCoreRouter from './routes/ai.route.js'; // AI Core entry — POST /api/ai/route
import dmoControlRouter from './routes/dmoControl.js'; // DMO Control Center
import metricsRouter, { trackRequest } from './middleware/metrics.js'; // Prometheus metrics
import webhooksRouter from './routes/webhooks.js'; // Payment webhooks
import founderConsoleRouter from './routes/founderConsole.js'; // Founder control panel
import {
  apiLimiter, sanitizeInputs, deviceFingerprint, securityHeaders, webhookReplayGuard,
} from './middleware/security.js';

const PORT = Number(process.env.API_PORT || 5000);
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(securityHeaders);                  // P5: security headers
app.use(deviceFingerprint);                // P5: track device fingerprint
app.use(express.json({ limit: '10mb' }));
app.use(sanitizeInputs);                   // P5: strip Mongo operator injection
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(trackRequest);                     // Prometheus request tracking
app.use('/api', apiLimiter);               // P5: default API rate limit

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'EHB API',
    status: 'ok',
    version: '0.2.0',
    phase: 'Phase 2 — GoSellr + Complaints + Riders + Real-Time',
    docs: 'see EHB-PHASE-2-PLAN.md',
  });
});

// Routes
app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/pss', pssRouter);
app.use('/api/stl', stlRouter);
app.use('/api/franchise', franchiseRouter);
app.use('/api/dmo', dmoRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/blockchain', blockchainRouter);
app.use('/api/gosellr', gosellrRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/complaints', complaintsRouter);
app.use('/api/riders', ridersRouter);
app.use('/api/delivery', deliveryRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/crb', crbRouter);
app.use('/api/affiliate', affiliateRouter);
app.use('/api/wallet/affiliate', affiliateWalletRouter);
app.use('/api/compliance', complianceRouter);
app.use('/api/kyc', kycRouter);
app.use('/api/admin/affiliate', adminAffiliateConfigRouter);
app.use('/api/admin/affiliate', adminAffiliateOpsRouter);
app.use('/api/health/affiliate', affiliateHealthRouter);
app.use('/api/withdrawals', withdrawalsRouter);
app.use('/api/jobs', jobsRouter);
// AI Core entry MUST be mounted before the proxy so /api/ai/route, /api/ai/intents, /api/ai/health
// hit the smart router first; everything else falls through to the upstream AI service proxy.
app.use('/api/ai', aiCoreRouter);
app.use('/api/ai', aiRouter);
app.use('/api/dmo/control', dmoControlRouter); // DMO Control Center (admin only)
app.use('/api', metricsRouter); // /api/metrics for Prometheus
app.use('/api/webhooks', webhooksRouter); // Payment provider webhooks
app.use('/api/founder', founderConsoleRouter); // Founder Control Panel (FOUNDER role only)

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[API ERROR]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start — connect DB (optional) then listen with HTTP server + Socket.IO
async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (mongoUri) {
    try {
      await connectDB(mongoUri);
      console.log('[API] MongoDB connected');
    } catch (e) {
      console.warn('[API] MongoDB connection failed — running without DB:', e.message);
    }
  } else {
    console.warn('[API] MONGODB_URI not set — running in stub mode (no DB)');
  }

  const httpServer = http.createServer(app);
  initSocketIo(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`[API] EHB API listening on http://localhost:${PORT}`);
    console.log(`[API] Socket.IO ready on /socket.io (namespaces: /dmo /orders /delivery)`);
  });
}

start().catch((e) => {
  console.error('[API] Fatal start error:', e);
  process.exit(1);
});
