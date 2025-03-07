import express from 'express';
import authRoutes from './api/auth.routes.js';
import mediaRoutes from './api/media.routes.js';
import projectRoutes from './api/project.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/media', mediaRoutes);
router.use('/project', projectRoutes);

export default router;
