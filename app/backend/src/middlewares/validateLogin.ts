import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (emailRegex.test(email) === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
};
