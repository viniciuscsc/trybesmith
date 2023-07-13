import { Request, Response } from 'express';
import orderService from '../services/order.service';

const registerOrder = async (req: Request, res: Response): Promise<Response> => {
  const orderData = req.body;

  const { statusCode, data } = await orderService.registerOrder(orderData);

  return res.status(statusCode).json(data);
};

const getOrders = async (req: Request, res: Response): Promise<Response> => {
  const { statusCode, data } = await orderService.getOrders(); 

  return res.status(statusCode).json(data);
};

export default {
  getOrders,
  registerOrder,
};
