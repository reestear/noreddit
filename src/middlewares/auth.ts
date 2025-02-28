import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

const checkAuth = (req: any, res: Response, next: NextFunction): void => {
  const token: any = req.header('authorization');
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const acc_token = token.split(' ')[1];

  jwt.verify(acc_token, config.secrets.jwt, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    console.log('decoded', decoded);

    req.user_id = decoded.id;
    next();
  });
};

export default checkAuth;
