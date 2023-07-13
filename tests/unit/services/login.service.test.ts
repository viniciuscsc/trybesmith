import { expect } from 'chai';
import sinon from 'sinon';

import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';

import loginMock from '../../mocks/login.mock';
import loginValidation from '../../../src/services/validations/login.validation';

describe('Testes Unitários em LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Não é possível fazer login se "username" não é enviado', async function () {
    const loginDataMocked = loginMock.noUsername;

    const { statusCode, data } = await loginService.login(loginDataMocked);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Não é possível fazer login se "password" não é enviado', async function () {
    const loginDataMocked = loginMock.noPassword;

    const { statusCode, data } = await loginService.login(loginDataMocked);

    expect(statusCode).to.equal(400);
    expect(data).to.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Não é possível fazer login com um "username" inválido', async function () {
    const loginDataMocked = loginMock.invalidUsername;

    sinon.stub(UserModel, 'findOne').resolves(null);

    const { statusCode, data } = await loginService.login(loginDataMocked);

    expect(statusCode).to.equal(401);
    expect(data).to.deep.equal({ message: 'Username or password invalid' });
  });

  it('Não é possível fazer login com um "password" inválido', async function () {
    const loginDataMocked = loginMock.invalidPassword;
    const validUserMocked = loginMock.validUser;

    sinon.stub(UserModel, 'findOne').resolves(validUserMocked);

    const { statusCode, data } = await loginService.login(loginDataMocked);

    expect(statusCode).to.equal(401);
    expect(data).to.deep.equal({ message: 'Username or password invalid' });
  });

  it('É possível fazer login com sucesso', async function () {
    const loginDataMocked = loginMock.validLogin;
    const validUserMocked = loginMock.validUser;
    
    sinon.stub(UserModel, 'findOne').resolves(validUserMocked);
    sinon.stub(loginValidation, 'validateUsernameAndPassword').resolves({
      statusCode: 200,
      data: { message: '1' },
    });

    const { statusCode, data } = await loginService.login(loginDataMocked);

    expect(statusCode).to.equal(200);
    expect(data).to.have.key('token');
  });  
});

