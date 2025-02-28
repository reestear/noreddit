import { Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  joinCommunity,
  updateUserById,
} from '../services/userService';
import { createAccessToken } from '../utils/authUtils';
import { errorResponse, successResponse } from '../utils/responseUtils';

export const updateUserHandler = async (req: any, res: Response) => {
  try {
    const userData = req.body;
    const user_id = req.user_id;

    console.log('user_id', user_id);
    console.log('userData', userData);

    const user = await updateUserById(user_id, userData);

    res.status(200).json(successResponse('User updated successfully', user));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to update user',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);

    const accessToken = createAccessToken(user);

    res
      .status(201)
      .json(successResponse('User created successfully', { accessToken }));
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

export const joinCommunityHandler = async (req: Request, res: Response) => {
  try {
    const { userID, communityID } = req.params;
    const user = await joinCommunity(userID, communityID);
    res
      .status(200)
      .json(successResponse('User joined community successfully', user));
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to join community',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};
