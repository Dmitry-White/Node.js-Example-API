import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import {User} from '../models';
import Logger from '../types/logger';
import {UserShape} from '../types/dto';

import HttpError from './error';

class UserService {
  userModel: typeof User;
  logger: Logger;

  constructor(userModel: typeof User, logger: Logger) {
    this.userModel = userModel;
    this.logger = logger;
  }

  async findUser(email: string): Promise<UserShape> {
    const data = await this.userModel.findOne({
      where: {
        email,
      },
    });
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(errorCode)}: No such user1`;

      throw new HttpError(errorMessage, errorCode);
    }

    const user = data.toJSON();
    this.logger.info('Found User: ', user);

    return user;
  }

  async createUser({
    name,
    email,
    password,
    role = 'USER',
    access_token = '',
  }: Partial<UserShape>): Promise<UserShape> {
    const data = await this.userModel.create({
      name,
      email,
      password,
      role,
      access_token,
    });
    if (!data) {
      const errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Unable to create user`;

      throw new HttpError(errorMessage, errorCode);
    }

    const user = data.toJSON();
    this.logger.info('Created User: ', user);

    return user;
  }

  async updateUser(
    id: string | number,
    payload: Partial<UserShape>
  ): Promise<UserShape> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(errorCode)}: No such user2`;

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

  async getUser(id: string): Promise<UserShape> {
    console.log('getUser');
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(errorCode)}: No such user3`;

      throw new HttpError(errorMessage, errorCode);
    }

    const user = data.toJSON();
    this.logger.info('Retrieved User: ', user);

    return user;
  }

  async getUsers(): Promise<UserShape[]> {
    console.log('getUsers');
    const data = await this.userModel.findAll();
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Unable to look for users`;

      throw new HttpError(errorMessage, errorCode);
    }

    const users = data.map(entry => entry.toJSON());
    this.logger.info('Retrieved Users: ', users);

    return users;
  }

  async deleteUser(id: string): Promise<UserShape> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(errorCode)}: No such user4`;

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
