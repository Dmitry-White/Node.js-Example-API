import express from 'express';

import {signUp, signIn} from '../controllers/auth';
import {handleAsync} from '../middlewares/error';

const router = express.Router();

router.post('/signup', handleAsync(signUp));
router.post('/signin', handleAsync(signIn));

export default router;
