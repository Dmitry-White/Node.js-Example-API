import {RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import logger from '../loaders/logger';
import {policy} from '../loaders/rbac';
import {User} from '../models';
import HttpError from '../services/error';
import UserService from '../services/user';
import {UserShape} from '../types/dto';

const userService = new UserService(User, logger);

const authorize =
  (action: string): RequestHandler =>
  async (req, res, next) => {
    const {email} = req.user as UserShape;
    const asset = req.baseUrl.replace(/^\//, '');

    const {role} = await userService.findUser(email);

    const isAllowed = await policy.can(role, action, asset);
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
