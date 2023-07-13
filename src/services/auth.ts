import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import {VerifyCallback} from 'passport-jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Logger from '../types/logger';

import config from '../config';
import {UserDTO, UserShape} from '../types/dto';

import UserService from './user';
import HttpError from './error';

class AuthService {
  userService: UserService;
  logger: Logger;

  constructor(userService: UserService, logger: Logger) {
    this.userService = userService;
    this.logger = logger;
  }

  static verify(userService: UserService): VerifyCallback {
    return async (payload, done) => {
      const user = await userService.getUser(payload.id);
      if (!user) {
        const errorCode = StatusCodes.NOT_FOUND;
        const errorMessage = getReasonPhrase(errorCode);

        done(new HttpError(errorMessage, errorCode));
      }

      done(null, user as Express.User);
    };
  }

  static getJwt(
    payload: Object,
    lifespan: string = config.server.jwtttl
  ): string {
    const options = {
      expiresIn: lifespan,
    };
    const token = jwt.sign(payload, config.server.jwtsecret, options);
    return token;
  }

  static genHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  };

  async signUp({
    name,
    email,
    password,
  }: UserDTO): Promise<{user: UserShape; token: string}> {
    const hashedPassword = await AuthService.genHash(password);
    this.logger.info('Hashed password', {hashedPassword});

    const user = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: 'USER',
    });

    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = AuthService.getJwt(payload);
    this.logger.info('Generated JWT: ', token);

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'role');
    return {user, token};
  }
}

export default AuthService;
