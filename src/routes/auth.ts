import express from 'express';

import {authenticate} from '../controllers/auth';
import {handleAsync} from '../middlewares/error';
import validate from '../middlewares/validation';
import ValidationStrategies from '../types/validation';

const router = express.Router();

router.post(
  '/',
  validate(ValidationStrategies.CREATE_USER),
  handleAsync(authenticate)
);

export default router;
