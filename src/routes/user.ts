import express from 'express';
import passport from 'passport';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from '../controllers/user';
import {handleAsync} from '../middlewares/error';
import {authorize} from '../middlewares/rbac';
import validate from '../middlewares/validation';
import {Permissions} from '../types';
import ValidationStrategies from '../types/validation';

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  authorize(Permissions.LIST),
  handleAsync(getUsers)
);
router.post(
  '/',
  validate(ValidationStrategies.CREATE_USER),
  passport.authenticate('jwt', {session: false}),
  authorize(Permissions.CREATE),
  handleAsync(createUser)
);
router.get(
  '/:id',
  validate(ValidationStrategies.PARAMS),
  passport.authenticate('jwt', {session: false}),
  authorize(Permissions.GET_SINGLE),
  handleAsync(getUser)
);
router.put(
  '/:id',
  validate(ValidationStrategies.PARAMS),
  validate(ValidationStrategies.UPDATE_USER),
  passport.authenticate('jwt', {session: false}),
  authorize(Permissions.UPDATE_SINGLE),
  handleAsync(updateUser)
);
router.delete(
  '/:id',
  validate(ValidationStrategies.PARAMS),
  passport.authenticate('jwt', {session: false}),
  authorize(Permissions.DESTROY),
  handleAsync(removeUser)
);

export default router;
