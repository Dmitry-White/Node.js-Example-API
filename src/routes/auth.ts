import express from 'express';

import {signUp, signIn} from '../controllers/auth';
import {handleAsync} from '../middlewares/error';
import validate from '../middlewares/validation';
import ValidationStrategies from '../types/validation';

const router = express.Router();

router.post(
  '/signup',
  validate(ValidationStrategies.CREATE_USER),
  handleAsync(signUp)
);

router.post(
  '/signin',
  validate(ValidationStrategies.SIGNIN),
  handleAsync(signIn)
);

export default router;
