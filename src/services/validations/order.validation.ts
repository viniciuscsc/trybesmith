import UserModel from '../../database/models/user.model';
import { Order } from '../../types/Order';
import { ServiceResponseFail } from '../../types/ServiceResponse';

export const validateOrderRequiredFields = (orderData: Order): ServiceResponseFail => {
  const { userId, productIds } = orderData;

  if (!userId) return { statusCode: 400, data: { message: '"userId" is required' } };

  if (!productIds) return { statusCode: 400, data: { message: '"productIds" is required' } };

  return { statusCode: 200, data: { message: '' } };
};

export const validateOrderInputTypes = (orderData: Order): ServiceResponseFail => {
  const { userId, productIds } = orderData;

  if (typeof userId !== 'number') {
    return { statusCode: 422, data: { message: '"userId" must be a number' } };
  }

  if (typeof productIds !== 'object') {
    return { statusCode: 422, data: { message: '"productIds" must be an array' } };
  }

  if (productIds.length === 0) {
    return { statusCode: 422, data: { message: '"productIds" must include only numbers' } };
  }

  return { statusCode: 200, data: { message: '' } };
};

export const validateUserExistence = async (orderData: Order)
: Promise<ServiceResponseFail> => {
  const { userId } = orderData;

  const user = await UserModel.findByPk(userId);

  if (!user) return { statusCode: 404, data: { message: '"userId" not found' } };

  return { statusCode: 200, data: { message: '' } };
};
