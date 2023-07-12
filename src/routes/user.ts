import express from 'express';
import {userGet} from '../controllers/user';

const router = express.Router();

router.get('/', userGet);

export default router;
