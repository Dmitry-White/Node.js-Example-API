import {RequestHandler} from 'express';

import {jsonApiSerializer} from '../loaders/jsonApi';
import logger from '../loaders/logger';
import TransformService from '../services/transform';
import {Assets} from '../types';

import {handleAsync} from './error';

const transformService = new TransformService(jsonApiSerializer, logger);

const deserialize = (asset: Assets): RequestHandler =>
  handleAsync(async (req, res, next) => {
    const deserialBody = await transformService.deserialize(asset, req.body);
    req.body = deserialBody;
    next();
  });

export default deserialize;
