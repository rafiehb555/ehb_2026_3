import { Router } from 'express';
import { isConnected } from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EHB API',
    time: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
    db: isConnected() ? 'connected' : 'disconnected',
  });
});

export default router;
