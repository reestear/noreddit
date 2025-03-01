import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { pool } from '../config/db';
import { User } from '../models/userModel';
import { IUserData } from '../types/authTypes';
import {
  comparePasswords,
  createAccessToken,
  createRefreshToken,
  hashPassword,
} from '../utils/authUtils';
import { errorResponse, successResponse } from '../utils/responseUtils';

const registerHandler = async (req: Request, res: Response) => {
  // try {
  //   const userData = req.body;
  //   userData.password = hashPassword(userData.password);

  //   const user = await createUser(userData);
  //   res.status(201).json(successResponse('User created successfully', user));
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json(
  //       errorResponse(
  //         'Failed to create user',
  //         error instanceof Error ? error.message : 'Unknown error'
  //       )
  //     );
  // }

  try {
    let {
      username,
      email,
      password,
      isAdmin,
      bio,
      profileImageUrl,
    }: IUserData = req.body;
    password = hashPassword(password);

    const [rows]: any = await pool.query(
      'CALL sp_create_user(?, ?, ?, ?, ?, ?)',
      [username, email, password, isAdmin, bio, profileImageUrl]
    );
    res.status(201).json(successResponse('User created successfully', null));
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

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json(errorResponse('User not found'));
      return;
    }

    const isPasswordValid = comparePasswords(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json(errorResponse('Invalid password'));
      return;
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res
      .status(200)
      .json(successResponse('Login successful', { accessToken, refreshToken }));
  } catch (error) {}
};

const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json(errorResponse('Refresh token is required'));
      return;
    }

    jwt.verify(
      refreshToken,
      config.secrets.jwt,
      async (err: any, decoded: any) => {
        if (err) {
          res.status(403).json(errorResponse('Invalid refresh token'));
          return;
        }

        const user = await User.findById(decoded.id);
        if (!user) {
          res.status(404).json(errorResponse('User not found'));
          return;
        }

        const accessToken = createAccessToken(user);
        res
          .status(200)
          .json(successResponse('Token refreshed', { accessToken }));
      }
    );
  } catch (error) {
    res
      .status(500)
      .json(
        errorResponse(
          'Failed to refresh token',
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
  }
};

export { loginHandler, refreshTokenHandler, registerHandler };
