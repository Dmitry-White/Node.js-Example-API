import {RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import logger from '../loaders/logger';
import {policy} from '../loaders/rbac';
import {User} from '../models';
import HttpError from '../services/error';
import UserService from '../services/user';

const userService = new UserService(User, logger);

const hasPermission =
  (action: string): RequestHandler =>
  async (req, res, next) => {
    const {email} = req.body;
    const asset = req.baseUrl.replace(/^\//, '');

    const user = await userService.findUser(email);
    if (!user) {
      const errorCode = StatusCodes.NOT_FOUND;
      const errorMessage = getReasonPhrase(errorCode);

      throw new HttpError(errorMessage, errorCode);
    }

    const {role} = user;
    console.log('ROLE: ', role);
    console.log('ACTION: ', action);
    console.log('ASSET: ', asset);

    const isAllowed = await policy.can(role, action, asset);
    console.log('isAllowed', isAllowed);
    if (!isAllowed) {
      const errorCode = StatusCodes.FORBIDDEN;
      const errorMessage = getReasonPhrase(errorCode);

      next(new HttpError(errorMessage, errorCode));
    }

    next();
  };

export {hasPermission};
