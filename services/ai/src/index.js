// EHB AI Service — Express + OpenAI
// Port 8080 (override with AI_PORT env var).

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const healthRouter = require('./routes/health');
const aiRouter = require('./routes/ai');
const chatRouter = require('./routes/chat');

const PORT = Number(process.env.AI_PORT || 8080);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/', (req, res) => {
  res.json({
    service: 'EHB AI',
    status: 'ok',
    version: '0.1.0',
    docs: 'see EHB-PHASE-1-DMO-FRANCHISE-AI.md §3.3',
    hasApiKey: Boolean(process.env.OPENAI_API_KEY),
  });
});

app.use('/api/health', healthRouter);
// Chat router mounted FIRST so /api/ai/chat hits the smart endpoint
// before falling through to the legacy ai router.
app.use('/api/ai', chatRouter);
app.use('/api/ai', aiRouter);

app.use((req, res) => res.status(404).json({ error: 'Not Found', path: req.path }));
app.use((err, req, res, _next) => {
  console.error('[AI ERROR]', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[AI] EHB AI listening on http://localhost:${PORT}`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn('[AI] OPENAI_API_KEY not set — running in stub mode');
  }
});
