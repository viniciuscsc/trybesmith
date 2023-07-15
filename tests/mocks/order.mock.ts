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
};
