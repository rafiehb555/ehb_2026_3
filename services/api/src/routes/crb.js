import { Router } from 'express';
import {
  listAvailableExams,
  startExam,
  submitAttempt,
  myCertificates,
} from '../services/crbService.js';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { isConnected } from '../config/db.js';

const router = Router();

router.get('/exams', async (req, res, next) => {
  try {
    let stlLevel = 1;
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ') && isConnected()) {
      try {
        const { verifyToken } = await import('../middleware/auth.js');
        const payload = verifyToken(auth.slice(7));
        const u = await User.findById(payload.id).select('stl').lean();
        stlLevel = u?.stl?.level || 1;
      } catch {}
    }
    const exams = await listAvailableExams(stlLevel);
    res.json({ exams });
  } catch (e) {
    next(e);
  }
});

router.post('/exams/:id/start', requireAuth, async (req, res, next) => {
  try {
    const r = await startExam({ userId: req.user.id, examId: req.params.id });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/attempts/:id/submit', requireAuth, async (req, res, next) => {
  try {
    const r = await submitAttempt({
      attemptId: req.params.id,
      userId: req.user.id,
      answers: req.body?.answers,
    });
    res.json(r);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/certificates/my', requireAuth, async (req, res, next) => {
  try {
    res.json({ certificates: await myCertificates(req.user.id) });
  } catch (e) {
    next(e);
  }
});

export default router;
