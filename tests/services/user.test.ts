import UserService from '../../src/services/user';
import logger from '../../src/loaders/logger';
import {User} from '../../src/models';
import {Roles} from '../../src/types';

const dbUser = {
  id: '1',
  name: 'Tester1',
  email: 'test1@example.com',
  password: 'password',
  role: 'USER',
  access_token: '',
};

const sameCaller = {
  id: '1',
  name: 'Tester 1',
  email: 'test1@example.com',
  password: 'password',
  role: Roles.USER,
  access_token: '',
};

const otherCaller = {
  id: '2',
  name: 'Tester2',
  email: 'test2@example.com',
  password: 'password',
  role: Roles.USER,
  access_token: '',
};

const adminCaller = {
  id: '0',
  name: 'Admin',
  email: 'admin@example.com',
  password: 'password',
  role: Roles.ADMIN,
  access_token: '',
};

const newUser = {
  name: 'Tester3',
  email: 'test3@example.com',
  password: 'password',
};

jest.mock('../../src/models/user', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();

  const dbUser = {
    id: '1',
    name: 'Tester1',
    email: 'test1@example.com',
    password: 'password',
    role: 'USER',
    access_token: '',
  };

  const UserMock = dbMock.define('users', dbUser);
  UserMock.findByPk = UserMock.findById;

  return UserMock;
});

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

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(User, logger);
  });

  describe('Find User', () => {
    it('should run', async () => {
      const actual = await userService.findUser(dbUser.email);
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('Get User', () => {
    it('should run', async () => {
      const actual = await userService.getUser(dbUser.id, sameCaller);
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });

    it('should throw', async () => {
      const actual = async () =>
        await userService.getUser(dbUser.id, otherCaller);

      await expect(actual).rejects.toThrowError(
        'Forbidden: Mind your business'
      );
    });
  });

  describe('Get Users', () => {
    it('should run', async () => {
      const actual = await userService.getUsers();
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual([expected]);
    });
  });

  describe('Create User', () => {
    it('should run', async () => {
      const actual = await userService.createUser(newUser);
      const expected = {
        ...newUser,
        id: '1',
        role: Roles.USER,
        access_token: '',
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('Update User', () => {
    it('should run for user', async () => {
      const actual = await userService.updateUser(dbUser.id, sameCaller, {});
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });

    it('should run for user', async () => {
      const actual = await userService.updateUser(dbUser.id, adminCaller, {});
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });

    it('should throw', async () => {
      const actual = async () =>
        await userService.updateUser(dbUser.id, otherCaller, {});

      await expect(actual).rejects.toThrowError(
        "Forbidden: Can't change other people"
      );
    });
  });

  describe('Delete User', () => {
    it('should run', async () => {
      const actual = await userService.deleteUser(dbUser.id, otherCaller);
      const expected = {
        ...dbUser,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      };

      expect(actual).toEqual(expected);
    });

    it('should throw for user', async () => {
      const actual = async () =>
        await userService.deleteUser(dbUser.id, sameCaller);

      await expect(actual).rejects.toThrowError(
        "Forbidden: Don't shoot yourself in the foot"
      );
    });

    it('should throw for admin', async () => {
      const actual = async () =>
        await userService.deleteUser(adminCaller.id, adminCaller);

      await expect(actual).rejects.toThrowError(
        "Forbidden: Don't shoot yourself in the foot"
      );
    });
  });
});
