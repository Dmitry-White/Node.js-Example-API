import * as express from 'express';

import {Assets} from '../types';

import defaultRouter from './default';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use(`/${Assets.USER}`, userRouter);

export default router;
