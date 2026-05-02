import { Router } from 'express';

/**
 * Thin proxy to the AI service. The web app calls /api/ai/* on the API (port 5000)
 * which then forwards to AI_SERVICE_URL (default http://localhost:8080/api/ai/*).
 * This keeps the web client talking to a single backend origin if desired.
 */
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8080';

const router = Router();

router.all('/*', async (req, res) => {
  try {
    const url = `${AI_SERVICE_URL}/api/ai${req.path}`;
    const init = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      init.body = JSON.stringify(req.body || {});
    }
    const upstream = await fetch(url, init);
    const text = await upstream.text();
    res.status(upstream.status);
    try {
      res.json(JSON.parse(text));
    } catch {
      res.send(text);
    }
  } catch (e) {
    res.status(502).json({ error: 'AI service unreachable', detail: e.message });
  }
});

export default router;
