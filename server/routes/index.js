import express from 'express';

const router = express.Router();

router.use('/api', (req, res, next) => require('./api').default(req, res, next));

export default router;
