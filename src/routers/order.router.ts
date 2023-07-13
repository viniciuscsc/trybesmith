import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateToken from '../middlewares/token.validation';

const orderRouter = Router();

orderRouter.post('/orders', validateToken, orderController.registerOrder);
orderRouter.get('/orders', orderController.getOrders);

export default orderRouter;
