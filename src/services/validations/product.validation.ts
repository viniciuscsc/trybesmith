import { Product } from '../../types/Product';
import { ServiceResponseFail } from '../../types/ServiceResponse';

const validateProductRequiredFields = (productData: Product)
: ServiceResponseFail => {
  const { name, price } = productData;

  if (!name) return { statusCode: 400, data: { message: '"name" is required' } };

  if (!price) return { statusCode: 400, data: { message: '"price" is required' } };

  return { statusCode: 200, data: { message: '' } };
};

const validateProductInputType = (productData: Product)
: ServiceResponseFail => {
  const { name, price } = productData;

  if (typeof name !== 'string') {
    return { statusCode: 422, data: { message: '"name" must be a string' } };
  }

  if (typeof price !== 'string') {
    return { statusCode: 422, data: { message: '"price" must be a string' } };
  }

  return { statusCode: 200, data: { message: '' } };
};

const validateMinAmountChars = (productData: Product)
: ServiceResponseFail => {
  const { name, price } = productData;
  const minAmountChars = 3;

  if (name.length < minAmountChars) {
    return {
      statusCode: 422,
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }

  if (price.length < minAmountChars) {
    return {
      statusCode: 422,
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }

  return { statusCode: 200, data: { message: '' } };
};

export default {
  validateProductRequiredFields,
  validateProductInputType,
  validateMinAmountChars,
};
