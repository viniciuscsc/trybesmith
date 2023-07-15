import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';

import { ServiceResponseFail, ServiceResponseSuccess } from '../../../src/types/ServiceResponse';

import orderMock from '../../mocks/order.mock';
import { Orders } from '../../../src/types/Order';

chai.use(sinonChai);

describe('Testes Unitários em OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Não é possível cadastrar um pedido sem informar o campo "userId"', async function () {
    req.body = orderMock.noUserId;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 422,
      data: { message: '"userId" must be a number' },
    };

    sinon.stub(orderService, 'registerOrder').resolves(serviceResponse);

    await orderController.registerOrder(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"userId" must be a number' });
  });

  it('É possível listar todos os pedidos com sucesso', async function () {
    const ordersMocked = orderMock.orders;
    
    const serviceResponse: ServiceResponseSuccess<Orders[]> = {
      statusCode: 200,
      data: ordersMocked,
    };

    sinon.stub(orderService, 'getOrders').resolves(serviceResponse);

    await orderController.getOrders(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(ordersMocked);
  });
});
