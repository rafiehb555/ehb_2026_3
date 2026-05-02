import { Router } from 'express';
import { submitPss, getPssStatus } from '../services/pssService.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/submit', async (req, res, next) => {
  try {
    // Extract userId from token if present (auth optional for demo)
    const auth = req.headers.authorization || '';
    let userId = null;
    if (auth.startsWith('Bearer ')) {
      try {
        const payload = verifyToken(auth.slice(7));
        userId = payload.id;
      } catch {}
    }
    const result = await submitPss({ userId, ...req.body });
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/status/:userId', async (req, res, next) => {
  try {
    const s = await getPssStatus(req.params.userId);
    if (!s) return res.status(404).json({ error: 'User not found' });
    res.json(s);
  } catch (e) {
    next(e);
  }
});

export default router;
