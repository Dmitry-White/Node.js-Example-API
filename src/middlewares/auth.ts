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

const authMiddleware = passport.initialize();

export default authMiddleware;
