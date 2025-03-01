import { Router } from 'express';
import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../controllers/authController';

const router = Router();

// Register a new user
router.post('/register', registerHandler);

// Login
router.post('/login', loginHandler);

// Refresh token
router.post('/refresh_token', refreshTokenHandler);

export default router;
