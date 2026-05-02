import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { signToken, requireAuth } from '../middleware/auth.js';
import { velocityGuard } from '../middleware/velocity.js';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { checkOfac } from '../services/complianceService.js';
import { emit as emitEvent } from '../services/eventBus.js';
import { recordReferral } from '../services/growthEngine.js';

const router = Router();

// In-memory fallback when DB not connected (demo only)
const memoryUsers = [];

// Velocity guard (50 signups/IP/24h per v3.3 §13.1.3 #9) attached at register endpoint
router.post('/register', velocityGuard, async (req, res) => {
  const { email, password, name, country } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  // OFAC sanctions screening (v3.3 §13.1.3 #13)
  try {
    const ofac = await checkOfac({ name, email, country });
    if (!ofac.allowed) {
      return res.status(403).json({
        error: 'Registration blocked by sanctions check',
        reason: ofac.reason,
        source: ofac.source,
      });
    }
  } catch (e) {
    console.warn('[auth] OFAC check failed (allowing through):', e.message);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  if (isConnected()) {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User exists' });
    const user = await User.create({ email, passwordHash, name, role: 'user' });
    const token = signToken({ id: user._id.toString(), email, role: user.role });

    // P4: emit signup event + record referral if code provided
    emitEvent('user.signup', { userId: user._id.toString(), email, country }).catch(() => {});
    if (req.body.referralCode) {
      recordReferral({ referrerCode: req.body.referralCode, refereeUserId: user._id.toString() }).catch(() => {});
      emitEvent('referral.completed', { referrerCode: req.body.referralCode, refereeUserId: user._id.toString() }).catch(() => {});
    }

    return res.json({ token, user: publicUser(user) });
  }

  // in-memory
  if (memoryUsers.find((u) => u.email === email)) {
    return res.status(409).json({ error: 'User exists (memory)' });
  }
  const id = `mem-${memoryUsers.length + 1}`;
  const user = {
    _id: id,
    email,
    passwordHash,
    name,
    role: 'user',
    stl: { score: 0, level: 1 },
  };
  memoryUsers.push(user);
  const token = signToken({ id, email, role: 'user' });
  res.json({ token, user: publicUser(user), note: 'in-memory (no DB connected)' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password required' });
  }

  const user = isConnected()
    ? await User.findOne({ email })
    : memoryUsers.find((u) => u.email === email);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const id = (user._id || user.id).toString();
  const token = signToken({ id, email, role: user.role });
  res.json({ token, user: publicUser(user) });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

function publicUser(u) {
  return {
    id: (u._id || u.id).toString(),
    email: u.email,
    name: u.name,
    role: u.role,
    stl: u.stl,
  };
}

export default router;
