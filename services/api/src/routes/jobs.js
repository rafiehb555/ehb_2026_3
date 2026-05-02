import { Router } from 'express';
import JobPosting from '../models/JobPosting.js';
import JobApplication from '../models/JobApplication.js';
import { isConnected } from '../config/db.js';
import { requireAuth } from '../middleware/auth.js';
import { logActivity } from '../services/auditService.js';

const router = Router();

router.get('/', async (req, res) => {
  if (!isConnected()) return res.json({ jobs: [] });
  const q = { status: 'active' };
  if (req.query.category) q.category = req.query.category;
  if (req.query.employmentType) q.employmentType = req.query.employmentType;
  if (req.query.designation) q.designation = req.query.designation;
  const jobs = await JobPosting.find(q).sort({ createdAt: -1 }).limit(Number(req.query.limit || 50)).lean();
  res.json({ jobs });
});

router.get('/mine', requireAuth, async (req, res) => {
  if (!isConnected()) return res.json({ jobs: [] });
  const jobs = await JobPosting.find({ employerId: req.user.id }).sort({ createdAt: -1 }).lean();
  res.json({ jobs });
});

router.get('/:id', async (req, res) => {
  if (!isConnected()) return res.status(503).json({ error: 'DB not connected' });
  const job = await JobPosting.findById(req.params.id).lean();
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (!isConnected()) return res.status(503).json({ error: 'DB not connected' });
    const job = await JobPosting.create({
      employerId: req.user.id,
      ...req.body,
    });
    await logActivity({
      actorUserId: req.user.id,
      action: 'job.posted',
      target: 'job',
      targetId: job._id.toString(),
      after: { title: job.title, requiredStl: job.requiredStl },
    });
    res.json(job);
  } catch (e) {
    next(e);
  }
});

router.post('/:id/apply', requireAuth, async (req, res, next) => {
  try {
    if (!isConnected()) return res.status(503).json({ error: 'DB not connected' });
    const existing = await JobApplication.findOne({ jobId: req.params.id, candidateId: req.user.id });
    if (existing) return res.status(409).json({ error: 'Already applied', application: existing });
    const app = await JobApplication.create({
      jobId: req.params.id,
      candidateId: req.user.id,
      coverLetter: req.body?.coverLetter,
      resumeText: req.body?.resumeText,
      aiResumeUsed: Boolean(req.body?.aiResumeUsed),
    });
    await JobPosting.updateOne({ _id: req.params.id }, { $inc: { 'stats.applications': 1 } });
    res.json(app);
  } catch (e) {
    next(e);
  }
});

router.get('/:id/applications', requireAuth, async (req, res) => {
  if (!isConnected()) return res.json({ applications: [] });
  const job = await JobPosting.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  if (String(job.employerId) !== String(req.user.id)) return res.status(403).json({ error: 'Forbidden' });
  const applications = await JobApplication.find({ jobId: job._id })
    .populate('candidateId', 'name email stl')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ applications });
});

router.get('/me/applied', requireAuth, async (req, res) => {
  if (!isConnected()) return res.json({ applications: [] });
  const applications = await JobApplication.find({ candidateId: req.user.id })
    .populate('jobId', 'title salaryMin salaryMax status')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ applications });
});

export default router;
