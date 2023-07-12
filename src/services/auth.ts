import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Logger from '../types/logger';

import config from '../config';
import {BaseDTO, UserDTO, UserOutput} from '../types/dto';
import {UserShape} from '../types/dto';

import UserService from './user';

class AuthService {
  userService: UserService;
  logger: Logger;

  constructor(userService: UserService, logger: Logger) {
    this.userService = userService;
    this.logger = logger;
  }

  async SignUp({
    name,
    email,
    password,
  }: UserDTO): Promise<{user: UserOutput; token: string}> {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(password, salt);
    this.logger.info('Hashed password:', hashedPassword);

    const token = this.generateToken({name, email, role: 'USER'});
    this.logger.info('Generated JWT: ', token);

    const user = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: 'USER',
      access_token: token,
    });
    if (!user) {
      throw new Error('User cannot be created');
    }
    this.logger.info('Created User:', user);

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'role');
    return {user, token};
  }

  async SignIn({
    email,
    password,
  }: BaseDTO): Promise<{user: UserOutput; token: string}> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new Error('User not registered');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid Password');
    }
    this.logger.info('Valid password', validPassword);

    const token = this.generateToken(user);
    this.logger.info('Generated JWT: ', token);

    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'role');
    return {user, token};
  }

  private generateToken(user: Partial<UserShape>) {
    const payload = {
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const token = jwt.sign(payload, config.server.jwtsecret);
    this.logger.info('Sign JWT for : ', user);

    return token;
  }
}

export default AuthService;
