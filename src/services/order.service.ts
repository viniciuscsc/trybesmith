import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { NewOrder, Orders } from '../types/Order';
import { ServiceResponseFail, ServiceResponseSuccess } from '../types/ServiceResponse';
import {
  validateOrderRequiredFields,
  validateOrderInputTypes,
  validateUserExistence,
} from './validations/order.validation';

const registerOrder = async (orderData: NewOrder)
: Promise<ServiceResponseSuccess<NewOrder> | ServiceResponseFail> => {
  const orderRequiredFieldsError = validateOrderRequiredFields(orderData);
  if (orderRequiredFieldsError.statusCode !== 200) return orderRequiredFieldsError;

  const orderInputTyperError = validateOrderInputTypes(orderData);
  if (orderInputTyperError.statusCode !== 200) return orderInputTyperError;

  const userExistenceError = await validateUserExistence(orderData);
  if (userExistenceError.statusCode !== 200) return userExistenceError;

  const newOrderDB = await OrderModel.create(orderData);

  const newOrder = {
    userId: newOrderDB.dataValues.userId,
    productIds: orderData.productIds,
  };

  return { statusCode: 201, data: newOrder };
};

const getOrders = async (): Promise<ServiceResponseSuccess<Orders[]>> => {
  const ordersDB = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
  });

  console.log(ordersDB[0].dataValues.productIds);  

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
  registerOrder,
};
