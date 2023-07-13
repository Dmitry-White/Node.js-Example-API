import {RequestHandler} from 'express';

import logger from '../loaders/logger';
import {User} from '../models/';
import AuthService from '../services/auth';
import UserService from '../services/user';

const userService = new UserService(User, logger);
const authService = new AuthService(userService, logger);

const authenticate: RequestHandler = async (req, res) => {
  const data = await authService.signUp(req.body);

  res.json(data);
};

export {authenticate};
