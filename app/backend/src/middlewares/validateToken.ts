import { Request, Response, NextFunction } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
import { validateToken } from '../utils/generateToken';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const payload = await validateToken(authorization);
    // req.body = payload;
    res.locals.payload = payload;
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};
