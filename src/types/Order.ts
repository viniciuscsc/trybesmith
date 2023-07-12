export type ProductId = { id: number };

export type Order = {
  id: number;
  userId: number;
  productIds?: ProductId[];
};

export type Orders = {
  id: number;
  userId: number;
  productIds?: number[];
};
