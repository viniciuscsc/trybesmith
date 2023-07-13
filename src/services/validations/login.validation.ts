import bcrypt from 'bcryptjs';
import UserModel from '../../database/models/user.model';
import { Login } from '../../types/Login';
import { ServiceResponseFail } from '../../types/ServiceResponse';

export const validateRequiredFields = (loginData: Login): ServiceResponseFail => {
  const { username, password } = loginData;

  if (!username || !password) {
    return {
      statusCode: 400,
      data: { message: '"username" and "password" are required' },
    };
  }

  return { statusCode: 200, data: { message: '' } };
};

export const validateUsernameAndPassword = async (loginData: Login)
: Promise<ServiceResponseFail> => {
  const { username, password } = loginData;

  const user = await UserModel.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return { statusCode: 401, data: { message: 'Username or password invalid' } };
  }

  const { id } = user.dataValues;

  return { statusCode: 200, data: { message: `${id}` } };
};
