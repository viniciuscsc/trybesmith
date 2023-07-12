export type ServiceResponseFail = {
  statusCode?: 400 | 401,
  data: { message: string },
};

export type ServiceResponseSuccess<T> = {
  statusCode: 200 | 201,
  data: T,
};
