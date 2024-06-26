import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/generateToken';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = await validateToken(authorization);
    res.locals.payload = payload;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};
