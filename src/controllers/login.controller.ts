import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response): Promise<Response> => {
  const loginData = req.body;

  const { statusCode, data } = await loginService.login(loginData);

  return res.status(statusCode).json(data);
};

export default { login };
