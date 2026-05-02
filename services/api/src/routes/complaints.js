import { Router } from 'express';
import {
  fileComplaint,
  listMyComplaints,
  listPendingComplaints,
  getComplaint,
  resolveComplaint,
  appealComplaint,
} from '../services/complaintService.js';
import { listMyPenalties } from '../services/penaltyService.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const c = await fileComplaint({ filerId: req.user.id, ...req.body });
    res.json(c);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    res.json({ complaints: await listMyComplaints(req.user.id) });
  } catch (e) {
    next(e);
  }
});

router.get('/pending', requireAuth, requireRole('DMO_MANAGER', 'DMO_DIRECTOR', 'SUPER_ADMIN', 'DMO_ANALYST'), async (req, res, next) => {
  try {
    res.json({ complaints: await listPendingComplaints({ limit: Number(req.query.limit || 100) }) });
  } catch (e) {
    next(e);
  }
});

router.get('/penalties/my', requireAuth, async (req, res, next) => {
  try {
    res.json({ penalties: await listMyPenalties(req.user.id) });
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const c = await getComplaint(req.params.id);
    if (!c) return res.status(404).json({ error: 'Complaint not found' });
    res.json(c);
  } catch (e) {
    next(e);
  }
});

router.post('/:id/resolve', requireAuth, requireRole('DMO_MANAGER', 'DMO_DIRECTOR', 'SUPER_ADMIN'), async (req, res, next) => {
  try {
    const result = await resolveComplaint({
      complaintId: req.params.id,
      reviewerId: req.user.id,
      ...req.body,
    });
    res.json(result);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

router.post('/:id/appeal', requireAuth, async (req, res, next) => {
  try {
    const c = await appealComplaint({
      complaintId: req.params.id,
      userId: req.user.id,
      appealNotes: req.body?.appealNotes,
    });
    res.json(c);
  } catch (e) {
    if (e.status) return res.status(e.status).json({ error: e.message });
    next(e);
  }
});

export default router;
