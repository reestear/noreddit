import { sign } from 'jsonwebtoken';
import { config } from '../config';
import { IUser } from '../models/userModel';

const createAccessToken = (user: IUser) => {
  return sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export { createAccessToken };
