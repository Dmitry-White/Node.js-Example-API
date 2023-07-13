import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import {VerifyCallback} from 'passport-jwt';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Logger from '../types/logger';

import config from '../config';
import {BaseDTO, UserDTO, UserShape} from '../types/dto';

import UserService from './user';
import HttpError from './error';
import {Roles} from '../types';

class AuthService {
  userService: UserService;
  logger: Logger;

  constructor(userService: UserService, logger: Logger) {
    this.userService = userService;
    this.logger = logger;
  }

  static verify(userService: UserService): VerifyCallback {
    return async (payload, done) => {
      try {
        const user = await userService.findUser(payload.email);
        done(null, user as Express.User);
      } catch (error) {
        done(error);
      }
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

    const token = AuthService.getJwt({email});
    this.logger.info('Generated JWT: ', {token});

    const user = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: Roles.USER,
      access_token: token,
    });

    return {user, token};
  }

  async signIn({
    email,
    password,
  }: BaseDTO): Promise<{user: UserShape; token: string}> {
    const token = AuthService.getJwt({email});
    this.logger.info('Generated JWT: ', token);

    const user = await this.userService.findUser(email);

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = `${getReasonPhrase(errorCode)}: Wrong password`;

      throw new HttpError(errorMessage, errorCode);
    }

    const updatePayload: Partial<UserShape> = {
      access_token: token,
    };
    await this.userService.updateUser(user.id, user, updatePayload);

    return {user, token};
  }
}

export default AuthService;
