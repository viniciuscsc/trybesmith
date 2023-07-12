import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/TokenPayload';

const secret = process.env.JWT_SECRET || 'secret';

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, secret) as TokenPayload;
  return decoded;
};

export default {
  sign,
  verify,
};
