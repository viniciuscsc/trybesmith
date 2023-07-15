import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';

import { ServiceResponseFail, ServiceResponseSuccess } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';

import productMock from '../../mocks/product.mock';

chai.use(sinonChai);

describe('Testes Unitários em ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Não é possível cadastrar um produto sem informar o campo "name"', async function () {
    req.body = productMock.noName;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 400,
      data: { message: '"name" is required' },
    };

    sinon.stub(productService, 'registerProduct').resolves(serviceResponse);

    await productController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('É possível cadastrar um produto com sucesso', async function () {
    req.body = productMock.productData;

    const serviceResponse: ServiceResponseSuccess<Product> = {
      statusCode: 201,
      data: productMock.newProduct.dataValues,
    };

    sinon.stub(productService, 'registerProduct').resolves(serviceResponse);

    await productController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMock.newProduct.dataValues);
  });
});
