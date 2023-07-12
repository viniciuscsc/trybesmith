import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRouter = Router();

productRouter.post('/products', productController.registerProduct);

export default productRouter;