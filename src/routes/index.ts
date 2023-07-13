import * as express from 'express';

import {Assets} from '../types';

import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use(`/${Assets.AUTH}`, authRouter);
router.use(`/${Assets.USER}`, userRouter);

export default router;
