import { Router } from 'express';
import { listMy, markRead, markAllRead, unreadCount } from '../services/notificationService.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const notifs = await listMy(req.user.id, {
      unreadOnly: req.query.unread === 'true',
      limit: Number(req.query.limit || 50),
    });
    res.json({ notifications: notifs });
  } catch (e) {
    next(e);
  }
});

router.get('/unread-count', requireAuth, async (req, res, next) => {
  try {
    res.json({ count: await unreadCount(req.user.id) });
  } catch (e) {
    next(e);
  }
});

router.post('/:id/read', requireAuth, async (req, res, next) => {
  try {
    const n = await markRead(req.params.id, req.user.id);
    res.json(n);
  } catch (e) {
    next(e);
  }
});

router.post('/read-all', requireAuth, async (req, res, next) => {
  try {
    res.json(await markAllRead(req.user.id));
  } catch (e) {
    next(e);
  }
});

export default router;
