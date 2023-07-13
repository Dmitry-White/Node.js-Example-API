import express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from '../controllers/user';
import {handleAsync} from '../middlewares/error';
import {hasPermission} from '../middlewares/rbac';
import {Permissions} from '../types';

const router = express.Router();

router.get('/', hasPermission(Permissions.LIST), handleAsync(getUsers));
router.post('/', handleAsync(createUser));
router.get('/:id', hasPermission(Permissions.GET_SINGLE), handleAsync(getUser));
router.put(
  '/:id',
  hasPermission(Permissions.UPDATE_SINGLE),
  handleAsync(updateUser)
);
router.delete(
  '/:id',
  hasPermission(Permissions.DESTROY),
  handleAsync(removeUser)
);

export default router;
