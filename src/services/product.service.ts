import ProductModel from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const registerProduct = async (productData: Product): Promise<ServiceResponse<Product>> => {
  const newProduct = await ProductModel.create(productData);

  return { statusCode: 201, data: newProduct.dataValues };
};

const getProducts = async (): Promise<ServiceResponse<Product[]>> => {
  const productsDB = await ProductModel.findAll();

  const products = productsDB.map((productDB) => productDB.dataValues);

  return { statusCode: 200, data: products };
};

export default {
  registerProduct,
  getProducts,
};
