import OrderModel from "../../src/database/models/order.model";
import { NewOrder } from "../../src/types/Order";

const orderData = {
  userId: 1,
  productIds: [{ id: 1 }, {id: 2}],
};

const noAuthorization = {
  authorization: '',
};

const invalidToken = {
  authorization: 'Bearer invalidToken',
};

const noUserId = {
  productIds: [{ id: 1 }, {id: 2}],
};

const userIdStringType = {
  userId: '1',
  productIds: [{ id: 1 }, {id: 2}],
};

const userIdNotFound = {
  userId: 99,
  productIds: [{ id: 1 }, {id: 2}],
};

const noProductIds = {
  userId: 1,
};

const productIdsStringType = {
  userId: 1,
  productIds: '[{ id: 1 }, {id: 2}]',
};

const emptyArray = {
  userId: 1,
  productIds: [],
};

const newOrderDB = OrderModel.build({
	id: 4,
	userId: 1,
});

const numberProductIds = [1, 2];

const orders = [
	{ id: 1, userId: 1, productIds: [2, 1] },
	{ id: 2, userId: 3, productIds: [4, 3] },
	{ id: 3, userId: 2, productIds: [5] },
]

export default {
  orderData,
  noAuthorization,
  invalidToken,
  noUserId,
  userIdStringType,
  userIdNotFound,
  noProductIds,
  productIdsStringType,
  emptyArray,
  newOrderDB,
  numberProductIds,
  orders,
};
