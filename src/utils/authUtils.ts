import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../config';
import { IUser } from '../models/userModel';

const createAccessToken = (user: IUser) => {
  return sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

const createRefreshToken = (user: IUser) => {
  return sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: '7d',
  });
};

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export {
  comparePasswords,
  createAccessToken,
  createRefreshToken,
  hashPassword,
};
