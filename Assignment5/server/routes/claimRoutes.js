import express from 'express';
import { getAllClaims, getMyClaims, submitClaim, updateClaimStatus } from '../controllers/claimController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post('/', protect, asyncHandler(submitClaim));
router.get('/my', protect, asyncHandler(getMyClaims));
router.get('/', protect, adminOnly, asyncHandler(getAllClaims));
router.put('/:id/status', protect, adminOnly, asyncHandler(updateClaimStatus));

export default router;
