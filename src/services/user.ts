import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import {User} from '../models';
import Logger from '../types/logger';
import {UserShape} from '../types/dto';

import HttpError from './error';
import {handleNoUser} from '../middlewares/error';
import AuthService from './auth';
import {Roles} from '../types';

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
      return handleNoUser();
    }

    const user = data.dataValues;
    this.logger.info('Found User: ', user);

    return user;
  }

  async getUser(id: string, caller: UserShape): Promise<UserShape> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      return handleNoUser();
    }

    const user = data.dataValues;
    this.logger.info('Retrieved User: ', user);

    if (id !== caller.id && caller.role !== Roles.ADMIN) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = `${getReasonPhrase(errorCode)}: Mind your business`;

      throw new HttpError(errorMessage, errorCode);
    }

    return data.dataValues;
  }

  async getUsers(): Promise<UserShape[]> {
    const data = await this.userModel.findAll();
    if (!data) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Unable to look for users`;

      throw new HttpError(errorMessage, errorCode);
    }

    const users = data.map(entry => entry.dataValues);
    this.logger.info('Retrieved Users: ', users);

    return users;
  }

  async createUser({
    name,
    email,
    password,
    role = Roles.USER,
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

    const user = data.dataValues;
    this.logger.info('Created User: ', user);

    return user;
  }

  async updateUser(
    id: string | number,
    caller: UserShape,
    details: Partial<UserShape>
  ): Promise<UserShape> {
    const data = await this.userModel.findByPk(id);
    if (!data) {
      return handleNoUser();
    }

    if (id !== caller.id && caller.role !== Roles.ADMIN) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Can't change other people`;

      throw new HttpError(errorMessage, errorCode);
    }

    const user = data.dataValues;
    this.logger.info('Updated User: ', user);

    const payload = {
      ...details,
    };
    if (details.email !== user.email) {
      const token = AuthService.getJwt({email: details.email});
      this.logger.info('Generated JWT: ', {token});

      payload.access_token = token;
    }

    await this.userModel.update(payload, {
      where: {
        id,
      },
    });

    return user;
  }

  async deleteUser(id: string, caller: UserShape): Promise<UserShape> {
    if (id === caller.id) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Don't shoot yourself in the foot`;

      throw new HttpError(errorMessage, errorCode);
    }
    const data = await this.userModel.findByPk(id, {});
    if (!data) {
      return handleNoUser();
    }

    const user = data.dataValues;
    this.logger.info('Deleted User: ', user);

    await this.userModel.destroy({
      where: {
        id,
      },
    });

    return user;
  }
}

export default UserService;
