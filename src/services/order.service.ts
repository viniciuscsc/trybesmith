import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Orders } from '../types/Order';
import { ServiceResponseSuccess } from '../types/ServiceResponse';

const getOrders = async (): Promise<ServiceResponseSuccess<Orders[]>> => {
  const ordersDB = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });

  const orders = ordersDB
    .map(({ dataValues: { id, productIds, userId } }) => ({
      id,
      userId,
      productIds: productIds?.map((pIs) => pIs.id),
    }));

  return { statusCode: 200, data: orders };
};

export default {
  getOrders,
};
