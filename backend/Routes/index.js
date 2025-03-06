import express from 'express';
import authRoutes from './api/auth.routes.js';
import mediaUploadRoute from './api/get-upload-url.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/media', mediaUploadRoute);

export default router;
