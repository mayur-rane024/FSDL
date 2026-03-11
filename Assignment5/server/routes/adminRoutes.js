import express from 'express';
import { exportReport, getAdminStats, getUsers } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, asyncHandler(getAdminStats));
router.get('/users', protect, adminOnly, asyncHandler(getUsers));
router.get('/report/export', protect, adminOnly, asyncHandler(exportReport));

export default router;
