import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';

import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';

import { ServiceResponseFail, ServiceResponseSuccess } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

import loginMock from '../../mocks/login.mock';

chai.use(sinonChai);

describe('Testes Unitários em LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Não é possível fazer login se "username" não é enviado', async function () {
    req.body = loginMock.noUsername;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 400,
      data: { message: '"username" and "password" are required' },
    };

    sinon.stub(loginService, 'login').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"username" and "password" are required',
    });
  });

  it('Não é possível fazer login se "password" não é enviado', async function () {
    req.body = loginMock.noPassword;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 400,
      data: { message: '"username" and "password" are required' },
    };

    sinon.stub(loginService, 'login').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"username" and "password" are required',
    });
  });

  it('Não é possível fazer login com um "username" inválido', async function () {
    req.body = loginMock.invalidUsername;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 401,
      data: { message: 'Username or password invalid' },
    };

    sinon.stub(loginService, 'login').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({
      message: 'Username or password invalid',
    });
  });

  it('Não é possível fazer login com um "password" inválido', async function () {
    req.body = loginMock.invalidPassword;

    const serviceResponse: ServiceResponseFail = {
      statusCode: 401,
      data: { message: 'Username or password invalid' },
    };

    sinon.stub(loginService, 'login').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({
      message: 'Username or password invalid',
    });
  });

  it('É possível fazer login com sucesso (o retorno é um token)', async function () {
    req.body = loginMock.validLogin;

    const tokenMocked = loginMock.validToken;
    const serviceResponse: ServiceResponseSuccess<Token> = {
      statusCode: 200,
      data: tokenMocked,
    };

    sinon.stub(loginService, 'login').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(tokenMocked);
  });
});
