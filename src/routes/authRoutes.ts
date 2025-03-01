import { Router } from 'express';
import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../controllers/authController';
import checkAuth from '../middlewares/auth';

const router = Router();

// Register a new user
router.post('/register', registerHandler);

// Login
router.post('/login', loginHandler);

// Refresh token
router.post('/refresh_token', refreshTokenHandler);

router.get('/me', checkAuth, (req, res) => {});

export default router;
