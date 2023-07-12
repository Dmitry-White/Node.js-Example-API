import {RequestHandler} from 'express';

const defaultGet: RequestHandler = (req, res) => {
  throw new Error('Forbidden');
};

const defaultDelete: RequestHandler = async (req, res) => {
  throw new Error('Forbidden');
};

const defaultPost: RequestHandler = (req, res) => {
  res.json({message: 'Default Route', body: req.body});
};

export {defaultGet, defaultDelete, defaultPost};
