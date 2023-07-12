export type ServiceResponse<T> = {
  statusCode: 200 | 201,
  data: T,
};
