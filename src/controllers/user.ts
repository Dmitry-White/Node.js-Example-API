import {RequestHandler} from 'express';

import logger from '../loaders/logger';
import {User} from '../models';
import UserService from '../services/user';

const userService = new UserService(User, logger);

const getUsers: RequestHandler = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

const getUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const user = await userService.getUser(id);
  res.json(user);
};

const createUser: RequestHandler = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

const updateUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const user = await userService.updateUser(id, req.body);
  res.json(user);
};

const removeUser: RequestHandler = async (req, res) => {
  const id = req.params.id;
  const user = await userService.deleteUser(id);
  res.json(user);
};

export {getUsers, getUser, createUser, updateUser, removeUser};
