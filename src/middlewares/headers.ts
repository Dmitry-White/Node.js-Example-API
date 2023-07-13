import {RequestHandler} from 'express';

import config from '../config';

const headersMiddleware: RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.client.url);
  res.header('Access-Control-Allow-Headers', config.client.headers);
  res.header('Content-Type', config.client.spec);
  next();
};

export default headersMiddleware;
