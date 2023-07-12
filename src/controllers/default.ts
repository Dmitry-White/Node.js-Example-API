import {RequestHandler} from 'express';

import logger from '../loaders/logger';
import {User} from '../models';

const defaultGet: RequestHandler = (req, res) => {
  throw new Error('Forbidden');
};

const defaultDelete: RequestHandler = async (req, res) => {
  throw new Error('Forbidden');
};

const defaultPost: RequestHandler = async (req, res) => {
  logger.info(`Running in ${process.env.NODE_ENV}`);
  const users = await User.findAll();
  res.json({message: `Running in ${process.env.NODE_ENV}`, body: users});
};

export {defaultGet, defaultDelete, defaultPost};
