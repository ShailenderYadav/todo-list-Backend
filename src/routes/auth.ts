import express from 'express';
import { signup, login, logout, refreshToken } from '../controllers/auth';
import { authenticateRefreshToken } from '../middleware/auth';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', authenticateRefreshToken, refreshToken);

export default router; 