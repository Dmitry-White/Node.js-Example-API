import express from 'express';
import {authGet} from '../controllers/auth';

const router = express.Router();

router.get('/', authGet);

export default router;
