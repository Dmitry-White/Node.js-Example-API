import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import {User} from '../models';
import Logger from '../types/logger';
import {BaseDTO, UserOutput, UserShape, UsersOutput} from '../types/dto';

import HttpError from './error';

class UserService {
  userModel: typeof User;
  logger: Logger;

  constructor(userModel: typeof User, logger: Logger) {
    this.userModel = userModel;
    this.logger = logger;
  }

  async findUser(email: string): Promise<UserOutput> {
    const data = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!data) return null;

    const user = data.toJSON();
    this.logger.info('Found User: ', user);

    return user;
  }

  async createUser({
    name,
    email,
    password,
    access_token,
    role,
  }: Partial<UserShape>): Promise<UserOutput> {
    const data = await this.userModel.create({
      name,
      email,
      password,
      access_token,
      role,
    });
    if (!data) return null;

    const user = data.toJSON();
    this.logger.info('Created User: ', user);

    return user;
  }

  async updateUser(id: string, payload: BaseDTO): Promise<UserOutput> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = getReasonPhrase(errorCode);

      throw new HttpError(errorMessage, errorCode);
    }

    await this.userModel.update(payload, {
      where: {
        id,
      },
    });

    const user = data.toJSON();
    this.logger.info('Updated User: ', user);

    return user;
  }

  async getUser(id: string): Promise<UserOutput> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = getReasonPhrase(errorCode);

      throw new HttpError(errorMessage, errorCode);
    }

    const user = data.toJSON();
    this.logger.info('Retrieved User: ', user);

    return user;
  }

  async getUsers(): Promise<UsersOutput> {
    const data = await this.userModel.findAll();
    if (!data) return null;

    const users = data.map(entry => entry.toJSON());
    this.logger.info('Retrieved Users: ', users);

    return users;
  }

  async deleteUser(id: string): Promise<UserOutput> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = getReasonPhrase(errorCode);

      throw new HttpError(errorMessage, errorCode);
    }

    await this.userModel.destroy({
      where: {
        id,
      },
    });

    const user = data.toJSON();
    this.logger.info('Deleted User: ', user);

    return user;
  }
}

export default UserService;
