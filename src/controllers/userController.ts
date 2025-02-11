import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById } from '../services/userService';
import { errorResponse, successResponse } from '../utils/responseUtils';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    res.status(201).json(successResponse('User created successfully', user));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to create user',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};

export const getUserByIdHandler = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json(errorResponse('User not found'));
    }
    res.status(200).json(successResponse('User fetched successfully', user));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to fetch user',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(successResponse('Users fetched successfully', users));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to fetch users',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};
