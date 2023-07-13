import {RequestHandler} from 'express';

import {jsonApiSerializer} from '../loaders/jsonApi';
import logger from '../loaders/logger';
import {handleAsync} from '../middlewares/error';
import {User} from '../models/';
import AuthService from '../services/auth';
import TransformService from '../services/transform';
import UserService from '../services/user';
import {Assets} from '../types';

const userService = new UserService(User, logger);
const authService = new AuthService(userService, logger);
const transformService = new TransformService(jsonApiSerializer, logger);

const signUp: RequestHandler = handleAsync(async (req, res) => {
  const auth = await authService.signUp(req.body);
  const serialAuth = await transformService.serialize(Assets.AUTH, auth);

  res.send(serialAuth);
});

const signIn: RequestHandler = handleAsync(async (req, res) => {
  const auth = await authService.signIn(req.body);
  const serialAuth = await transformService.serialize(Assets.AUTH, auth);

  res.send(serialAuth);
});

export {signUp, signIn};
