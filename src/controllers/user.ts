import {RequestHandler} from 'express';

import {jsonApiSerializer} from '../loaders/jsonApi';
import logger from '../loaders/logger';
import {User} from '../models';
import TransformService from '../services/transform';
import UserService from '../services/user';
import {Assets} from '../types';

const userService = new UserService(User, logger);
const transformService = new TransformService(jsonApiSerializer, logger);

const getUsers: RequestHandler = async (req, res) => {
  const users = await userService.getUsers();
  const serialUsers = await transformService.serialize(Assets.USER, users);

  res.set(transformService.dataHeader).send(serialUsers);
};

const getUser: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const user = await userService.getUser(id);
  const serialUser = await transformService.serialize(Assets.USER, user);

  res.set(transformService.dataHeader).send(serialUser);
};

const createUser: RequestHandler = async (req, res) => {
  const user = await userService.createUser(req.body);
  const serialUser = await transformService.serialize(Assets.USER, user);

  res.set(transformService.dataHeader).send(serialUser);
};

const updateUser: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const user = await userService.updateUser(id, req.body);
  const serialUser = await transformService.serialize(Assets.USER, user);

  res.set(transformService.dataHeader).send(serialUser);
};

const removeUser: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const user = await userService.deleteUser(id);
  const serialUser = await transformService.serialize(Assets.USER, user);

  res.set(transformService.dataHeader).send(serialUser);
};

export {getUsers, getUser, createUser, updateUser, removeUser};
