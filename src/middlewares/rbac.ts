import {RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import logger from '../loaders/logger';

import {policy} from '../loaders/rbac';
import HttpError from '../services/error';
import {UserShape} from '../types/dto';

const authorize =
  (action: string): RequestHandler =>
  async (req, res, next) => {
    const {role} = req.user as UserShape;

    const asset = req.baseUrl.replace(/^\//, '');

    const isAllowed = await policy.can(role, action, asset);
    logger.info(`Action ${action} for ${role} is allowed: ${isAllowed}`);

    if (!isAllowed) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = `${getReasonPhrase(
        errorCode
      )}: Not enough permissions`;

      next(new HttpError(errorMessage, errorCode));
    }

    next();
  };

export {authorize};
