import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';
import Users from '../database/models/UsersModel';

const secret = process.env.JWT_SECRET || 'secret';
const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const newToken = (data: Users): string => jwt.sign({ data }, secret, jwtConfig);

const validateToken = async (token: string) => jwt.verify(token, secret) as IToken;

export { newToken, validateToken };
