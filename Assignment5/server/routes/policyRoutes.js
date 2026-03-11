import express from 'express';
import { createPolicy, deletePolicy, getPolicies, updatePolicy } from '../controllers/policyController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(getPolicies));
router.post('/', protect, adminOnly, asyncHandler(createPolicy));
router.put('/:id', protect, adminOnly, asyncHandler(updatePolicy));
router.delete('/:id', protect, adminOnly, asyncHandler(deletePolicy));

export default router;
