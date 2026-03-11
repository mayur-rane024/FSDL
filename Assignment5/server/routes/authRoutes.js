import express from 'express';
import { getProfile, loginUser, registerUser, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.post('/register', asyncHandler(registerUser));
router.post('/login', asyncHandler(loginUser));
router.get('/profile', protect, asyncHandler(getProfile));
router.put('/profile', protect, asyncHandler(updateProfile));

export default router;
