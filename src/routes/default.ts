import express from 'express';
import {defaultGet, defaultPost} from '../controllers/default';

const router = express.Router();

router.get('/', defaultGet);
router.post('/', defaultPost);

export default router;
