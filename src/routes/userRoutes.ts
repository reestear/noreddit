import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  joinCommunityHandler,
  updateUserHandler,
} from '../controllers/userController';
import checkAuth from '../middlewares/auth';

const router = Router();

// router.use(checkAuth);

// Create a new user
router.post('/', createUserHandler);

// Get a user by ID
router.get('/:id', getUserByIdHandler);

// Get all users
router.get('/', getAllUsersHandler);

// Update user info
router.put('/me', checkAuth, updateUserHandler);

router.post('/join_community/:userID/:communityID', joinCommunityHandler);

export default router;
