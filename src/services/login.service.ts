import { Login } from '../types/Login';
import { ServiceResponseFail, ServiceResponseSuccess } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import jwtUtil from '../utils/jwt.util';
import {
  validateRequiredFields,
  validateUsernameAndPassword,
} from './validations/login.validation';

const login = async (loginData: Login)
: Promise<ServiceResponseSuccess<Token> | ServiceResponseFail> => {
  const { username } = loginData;

  const requiredFieldsError = validateRequiredFields(loginData);
  if (requiredFieldsError.statusCode) return requiredFieldsError;

  const usernameAndPasswordError = await validateUsernameAndPassword(loginData);
  if (usernameAndPasswordError.statusCode) return usernameAndPasswordError;

  const userId = +usernameAndPasswordError.data.message;

  const token = jwtUtil.sign({ id: userId, username });

  return { statusCode: 200, data: { token } };
};

export default { login };