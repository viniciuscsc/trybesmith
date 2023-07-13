import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';

const validateToken = async (req: Request, res: Response, next: NextFunction)
: Promise<Response | void> => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const data = authorization.split(' ');
  const token = data[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' }); 
  }

  try {
    res.locals.user = jwtUtil.verify(token);
    
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default validateToken;
