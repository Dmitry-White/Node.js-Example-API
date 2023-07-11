import * as express from 'express';

import defaultRouter from './default';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
