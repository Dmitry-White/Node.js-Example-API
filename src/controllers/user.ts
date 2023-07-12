import {RequestHandler} from 'express';
import logger from '../loaders/logger';

import UserModel from '../models/user';
import UserService from '../services/user';

const userService = new UserService(UserModel, logger);

const getUsers: RequestHandler = (req, res) => {
  const users = userService.getUsers();
  res.json(users);
};
const getUser: RequestHandler = (req, res) => {
  const user = userService.getUser();
  res.json(user);
};
const createUser: RequestHandler = (req, res) => {
  const user = userService.createUser();
  res.json(user);
};
const updateUser: RequestHandler = (req, res) => {
  const user = userService.updateUser();
  res.json(user);
};
const removeUser: RequestHandler = (req, res) => {
  const user = userService.deleteUser();
  res.json(user);
};

export {getUsers, getUser, createUser, updateUser, removeUser};
