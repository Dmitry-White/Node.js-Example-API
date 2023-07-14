import bcrypt from 'bcrypt';

import AuthService from '../../src/services/auth';
import UserService from '../../src/services/user';
import logger from '../../src/loaders/logger';
import {User} from '../../src/models';
import {Roles} from '../../src/types';

const password = 'password';
const salt = bcrypt.genSaltSync(10);
const hashed = bcrypt.hashSync(password, salt);

const mockUser = {
  id: 1,
  name: 'Tester',
  email: 'test@example.com',
  password: hashed,
  role: Roles.USER,
  access_token: '',
};

const baseMock = {
  email: mockUser.email,
  password,
};

const fullMock = {
  ...baseMock,
  name: mockUser.name,
};

const resultMock = {
  user: mockUser,
  token: 'signed',
};

jest.mock('../../src/services/user', () =>
  jest.fn().mockImplementation(() => ({
    findUser: () => mockUser,
    createUser: () => mockUser,
    updateUser: () => mockUser,
  }))
);

jest.mock('jsonwebtoken', () => ({
  sign: () => 'signed',
}));

jest.mock('sequelize', () => {
  const mSequelize = {
    authenticate: jest.fn(),
    define: jest.fn(),
    sync: jest.fn(),
  };
  const actualSequelize = jest.requireActual('sequelize');

  return {
    Sequelize: jest.fn(() => mSequelize),
    DataTypes: actualSequelize.DataTypes,
  };
});

describe('AuthService', () => {
  let userService: UserService;
  let authService: AuthService;

  beforeEach(() => {
    userService = new UserService(User, logger);
    authService = new AuthService(userService, logger);
  });

  describe('Sign Up', () => {
    it('should run', async () => {
      const actual = await authService.signUp(fullMock);
      const expected = resultMock;

      expect(actual).toEqual(expected);
    });
  });

  describe('Sign In', () => {
    it('should run', async () => {
      const actual = await authService.signIn(baseMock);
      const expected = resultMock;

      expect(actual).toEqual(expected);
    });
  });
});
