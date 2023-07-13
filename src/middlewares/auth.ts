import {RequestHandler} from 'express';
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

import config from '../config';
import logger from '../loaders/logger';
import {User} from '../models';
import AuthService from '../services/auth';
import UserService from '../services/user';

const userService = new UserService(User, logger);

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.server.jwtsecret,
    },
    AuthService.verify(userService)
  )
);

const authenticate: RequestHandler = (req, res, next) => {
  const passportCallback: (
    err: unknown,
    user?: Express.User | false | null,
    info?: object | string | Array<string | undefined>
  ) => unknown = (err, user, info) => {
    if (err || !user) {
      return next(info);
    }

    req.user = user;
    return next();
  };

  const middleware = passport.authenticate(
    'jwt',
    {session: false},
    passportCallback
  );

  middleware(req, res, next);
};

const authMiddleware = passport.initialize();

export {authenticate, authMiddleware};
