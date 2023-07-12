import express from 'express';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
} from '../controllers/user';
import {handleAsync} from '../middlewares/error';

const router = express.Router();

router.get('/', handleAsync(getUsers));
router.post('/', handleAsync(createUser));
router.get('/:id', handleAsync(getUser));
router.put('/:id', handleAsync(updateUser));
router.delete('/:id', handleAsync(removeUser));

export default router;
