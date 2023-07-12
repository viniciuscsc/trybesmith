import { Request, Response } from 'express';
import productService from '../services/product.service';

const registerProduct = async (req: Request, res: Response): Promise<Response> => {
  const productData = req.body;

  const { statusCode, data } = await productService.registerProduct(productData);

  return res.status(statusCode).json(data);
};

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  const { statusCode, data } = await productService.getProducts();

  return res.status(statusCode).json(data);
};

export default {
  registerProduct,
  getProducts,
};
