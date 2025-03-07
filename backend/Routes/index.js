import express from 'express';
import authRoutes from './api/auth.routes.js';
import mediaRoutes from './api/media.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/media', mediaRoutes);

export default router;
