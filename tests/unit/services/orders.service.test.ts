import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';

import orderService from '../../../src/services/order.service';
import validateToken from '../../../src/middlewares/token.validation';

import orderMock from '../../mocks/order.mock';

describe('Testes Unitários em OrdersService', function () {
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  
  it('Não é possível cadastrar pedidos sem token', async function () {
    req.headers = orderMock.noAuthorization;

    await validateToken(req, res, next);

    expect(res.status).to.have.calledWith(401);
    expect(res.json).to.have.calledWithExactly({ message: 'Token not found' });
  });
  
  it('Não é possível cadastrar um pedido com token inválido', async function () {
    req.headers = orderMock.invalidToken;

    await validateToken(req, res, next);

    expect(res.status).to.have.calledWith(401);
    expect(res.json).to.have.calledWithExactly({ message: 'Invalid token' });
  });
  
  it('Não é possível cadastrar um pedido sem informar o campo "userId"', async function () {
    req.body = orderMock.noUserId;
    
    const { statusCode, data } = await orderService.registerOrder(req.body);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"userId" is required' });
  });
  
  it('O campo "userId" deve ter o tipo "number"', async function () {
    req.body = orderMock.userIdStringType;

    const { statusCode, data } = await orderService.registerOrder(req.body);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"userId" must be a number' });
  });
  
  it('Não é possível cadastrar um pedido com "userId" inexistente', async function () {
    const orderDataMocked = orderMock.userIdNotFound;

    const { statusCode, data } = await orderService.registerOrder(orderDataMocked);

    expect(statusCode).to.equal(404);
    expect(data).to.deep.equal({ message: '"userId" not found' });
  });
  
  it('Não é possível cadastrar um pedido sem informar o campo "productIds"', async function () {
    req.body = orderMock.noProductIds;

    const { statusCode, data } = await orderService.registerOrder(req.body);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"productIds" is required' });
  });
  
  it('O campo "productIds" deve ser um Array', async function () {
    req.body = orderMock.productIdsStringType;

    const { statusCode, data } = await orderService.registerOrder(req.body);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"productIds" must be an array' });
  });
  
  it('O campo "productIds" não deve ser um Array vazio', async function () {
    req.body = orderMock.emptyArray;

    const { statusCode, data } = await orderService.registerOrder(req.body);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"productIds" must include only numbers' });
  });
});
