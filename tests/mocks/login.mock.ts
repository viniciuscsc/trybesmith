import UserModel from "../../src/database/models/user.model";

const noUsername = {
  username: '',
  password: 'password',
};

const noPassword = {
  username: 'username',
  password: '',
};

const invalidUsername = {
  username: 'invalidUsername',
  password: 'password'
};

const invalidPassword = {
  username: 'username',
  password: 'invalidPassword'
};

const validUser = UserModel.build({
  id: 1,
  username: 'username',
  vocation: 'vocation',
  level: 10,
  password: 'password',
});

const validLogin = {
  username: 'username',
  password: 'password',
};

export default {
  noUsername,
  noPassword,
  invalidUsername,
  invalidPassword,
  validUser,
  validLogin,
};
