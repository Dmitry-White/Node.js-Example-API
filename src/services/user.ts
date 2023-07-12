import {Model} from 'sequelize';

import UserModel from '../models/user';
import Logger from '../types/logger';
import {User} from '../types/model';

class UserService {
  userModel: typeof UserModel;
  logger: Logger;

  constructor(userModel: typeof UserModel, logger: Logger) {
    this.userModel = userModel;
    this.logger = logger;
  }

  async createUser(): Promise<Model<User> | null> {
    const user: Model<User> = {} as Model<User>;

    if (!user) return null;

    this.logger.info('User Create');

    return Promise.resolve(user);
  }

  async updateUser(): Promise<Model<User> | null> {
    const user: Model<User> = {} as Model<User>;

    if (!user) return null;

    this.logger.info('User Update');

    return Promise.resolve(user);
  }

  async getUser(): Promise<Model<User> | null> {
    const user: Model<User> = {} as Model<User>;

    if (!user) return null;

    this.logger.info('User Get');

    return Promise.resolve(user);
  }

  async getUsers(): Promise<Model<User>[] | null> {
    const users: Model<User>[] = [];

    if (!users) return null;

    this.logger.info('Users Get');

    return Promise.resolve(users);
  }

  async deleteUser(): Promise<Model<User> | null> {
    const user: Model<User> = {} as Model<User>;

    if (!user) return null;

    this.logger.info('User Delete');

    return Promise.resolve(user);
  }
}

export default UserService;
