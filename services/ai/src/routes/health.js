const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EHB AI',
    time: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
  });
});

module.exports = router;
