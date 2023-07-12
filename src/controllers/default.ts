import {RequestHandler} from 'express';

import logger from '../loaders/logger';

const defaultGet: RequestHandler = (req, res) => {
  throw new Error('Forbidden');
};

const defaultDelete: RequestHandler = async (req, res) => {
  throw new Error('Forbidden');
};

const defaultPost: RequestHandler = (req, res) => {
  logger.info(`Running in ${process.env.NODE_ENV}`);
  res.json({message: `Running in ${process.env.NODE_ENV}`, body: req.body});
};

export {defaultGet, defaultDelete, defaultPost};
