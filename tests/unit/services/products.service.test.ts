import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';

import productMock from '../../mocks/product.mock';

describe('Testes Unitários em ProductsService', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Não é possível cadastrar um produto sem informar o campo "name"', async function () {
    const productDataMocked = productMock.noName;

    const { statusCode, data } = await productService.registerProduct(productDataMocked);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"name" is required' });
  });

  it('O campo "name" deve ter o tipo "string"', async function () {
    req.body = productMock.nameNumberType;

    const { statusCode, data } = await productService.registerProduct(req.body);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"name" must be a string' });
  });

  it('O campo "name" deve ser uma string com mais de 2 caracteres', async function () {
    const productDataMocked = productMock.nameOneChar;

    const { statusCode, data } = await productService.registerProduct(productDataMocked);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"name" length must be at least 3 characters long' });
  });

  it('Não é possível cadastrar um produto sem informar o campo "price"', async function () {
    const productDataMocked = productMock.noPrice;

    const { statusCode, data } = await productService.registerProduct(productDataMocked);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"price" is required' });
  });

  it('O campo "price" deve ter o tipo "string"', async function () {
    req.body = productMock.priceNumberType;

    const { statusCode, data } = await productService.registerProduct(req.body);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"price" must be a string' });
  });

  it('O campo "price" deve ser uma string com mais de 2 caracteres', async function () {
    const productDataMocked = productMock.priceOneChar;

    const { statusCode, data } = await productService.registerProduct(productDataMocked);

    expect(statusCode).to.equal(422);
    expect(data).to.deep.equal({ message: '"price" length must be at least 3 characters long' });
  });

  it('É possível cadastrar um produto com sucesso', async function () {
    sinon.stub(ProductModel, 'create').resolves(productMock.newProduct);

    const { statusCode, data } = await productService.registerProduct(productMock.productData);

    expect(statusCode).to.equal(201);
    expect(data).to.deep.equal(productMock.newProduct.dataValues);
  });

  // it('É possível listar os produtos com sucesso', async function () {
  //   const productsMocked = productMock.products
  //     .map((product) => product);

  //   sinon.stub(ProductModel, 'findAll').resolves(productsMocked);

  //   const { statusCode, data } = await productService.registerProduct(productMock.productData);

  //   expect(statusCode).to.equal(201);
  //   expect(data).to.deep.equal(productMock.newProduct.dataValues);
  // });
});
