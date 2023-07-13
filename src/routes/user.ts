import express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from '../controllers/user';
import {authenticate} from '../middlewares/auth';
import deserialize from '../middlewares/jsonApi';
import {authorize} from '../middlewares/rbac';
import validate from '../middlewares/validation';
import {Assets, Permissions} from '../types';
import ValidationStrategies from '../types/validation';

const router = express.Router();

router.get('/', authenticate, authorize(Permissions.LIST), getUsers);
router.post(
  '/',
  deserialize(Assets.USER),
  validate(ValidationStrategies.CREATE_USER),
  authenticate,
  authorize(Permissions.CREATE),
  createUser
);
router.get(
  '/:id',
  validate(ValidationStrategies.PARAMS),
  authenticate,
  authorize(Permissions.GET_SINGLE),
  getUser
);
router.put(
  '/:id',
  deserialize(Assets.USER),
  validate(ValidationStrategies.PARAMS),
  validate(ValidationStrategies.UPDATE_USER),
  authenticate,
  authorize(Permissions.UPDATE_SINGLE),
  updateUser
);
router.delete(
  '/:id',
  validate(ValidationStrategies.PARAMS),
  authenticate,
  authorize(Permissions.DESTROY),
  removeUser
);

export default router;
