import express from 'express';
import {
  applyPolicy,
  getAllApplications,
  getMyApplications,
  payPremium,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post('/', protect, upload.single('document'), asyncHandler(applyPolicy));
router.get('/my', protect, asyncHandler(getMyApplications));
router.get('/', protect, adminOnly, asyncHandler(getAllApplications));
router.put('/:id/status', protect, adminOnly, asyncHandler(updateApplicationStatus));
router.post('/:id/pay', protect, asyncHandler(payPremium));

export default router;
