import {RequestHandler} from 'express';

import logger from '../loaders/logger';
import {User} from '../models/';
import AuthService from '../services/auth';
import UserService from '../services/user';

const userService = new UserService(User, logger);
const authService = new AuthService(userService, logger);

const signUp: RequestHandler = async (req, res) => {
  const user = await authService.SignUp(req.body);

  res.json(user);
};

const signIn: RequestHandler = async (req, res) => {
  const user = await authService.SignIn(req.body);

  res.json(user);
};

export {signUp, signIn};
