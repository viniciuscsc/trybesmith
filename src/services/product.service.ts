import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponseFail, ServiceResponseSuccess } from '../types/ServiceResponse';
import {
  validateProductRequiredFields,
  validateProductInputType,
  validateMinAmountChars,
} from './validations/product.validation';

const registerProduct = async (productData: Product)
: Promise<ServiceResponseSuccess<Product> | ServiceResponseFail> => {
  const productRequiredFieldsError = validateProductRequiredFields(productData);
  if (productRequiredFieldsError.statusCode !== 200) return productRequiredFieldsError;

  const inputProductTypeError = validateProductInputType(productData);
  if (inputProductTypeError.statusCode !== 200) return inputProductTypeError;

  const minAmountCharsError = validateMinAmountChars(productData);
  if (minAmountCharsError.statusCode !== 200) return minAmountCharsError;
  
  const newProduct = await ProductModel.create(productData);

  return { statusCode: 201, data: newProduct.dataValues };
};

const getProducts = async (): Promise<ServiceResponseSuccess<Product[]>> => {
  const productsDB = await ProductModel.findAll();

  const products = productsDB.map((productDB) => productDB.dataValues);

  return { statusCode: 200, data: products };
};

export default {
  registerProduct,
  getProducts,
};
