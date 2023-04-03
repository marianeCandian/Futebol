import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'secret';
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const newToken = (data: Users): string => jwt.sign({ data }, secret, jwtConfig);

const validateToken = async (token: string) => jwt.verify(token, secret);

export { newToken, validateToken };
