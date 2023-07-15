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

const products = [
 { id: 1, name: 'name1', price: 'price1', orderId: 1 },
 { id: 2, name: 'name2', price: 'price2', orderId: 2 },
];

export default {
  productData,
  noName,
  nameNumberType,
  nameOneChar,
  noPrice,
  priceNumberType,
  priceOneChar,
  newProduct,
  products,
};
