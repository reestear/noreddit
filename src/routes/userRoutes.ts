import { Router } from 'express';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from '../controllers/userController';

const router = Router();

// Create a new user
router.post('/', createUserHandler);

// Get a user by ID
router.get('/:id', getUserByIdHandler);

// Get all users
router.get('/', getAllUsersHandler);

export default router;
