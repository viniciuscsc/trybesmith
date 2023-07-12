import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const registerProduct = async (productData: Product): Promise<ServiceResponse<Product>> => {
  const newProduct = await ProductModel.create(productData);

  return { statusCode: 201, data: newProduct.dataValues };
};

export default {
  registerProduct,
};
