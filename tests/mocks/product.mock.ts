import ProductModel from "../../src/database/models/product.model";

const productData = {
  name: 'name',
  price: 'price',
  orderId: 1,
};

const noName = {
  name: '',
  price: 'price',
  orderId: 1,
};

const nameNumberType = {
  name: 1,
  price: 'price',
  orderId: 1,
};

const nameOneChar = {
  name: 'n',
  price: 'price',
  orderId: 1,
};

const noPrice = {
  name: 'name',
  price: '',
  orderId: 1,
};

const priceNumberType = {
  name: 'name',
  price: 1,
  orderId: 1,
};

const priceOneChar = {
  name: 'name',
  price: 'p',
  orderId: 1,
};

const newProduct = ProductModel.build({
  id: 5,
  name: 'name',
  price: 'price',
  orderId: 1,
});

export default {
  productData,
  noName,
  nameNumberType,
  nameOneChar,
  noPrice,
  priceNumberType,
  priceOneChar,
  newProduct,
};
