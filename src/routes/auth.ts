import express from 'express';

import {signUp, signIn} from '../controllers/auth';
import deserialize from '../middlewares/jsonApi';
import validate from '../middlewares/validation';
import {Assets} from '../types';
import ValidationStrategies from '../types/validation';

const router = express.Router();

router.post(
  '/',
  deserialize(Assets.AUTH),
  validate(ValidationStrategies.CREATE_USER),
  signUp
);

router.put(
  '/',
  deserialize(Assets.AUTH),
  validate(ValidationStrategies.SIGNIN),
  signIn
);

export default router;
