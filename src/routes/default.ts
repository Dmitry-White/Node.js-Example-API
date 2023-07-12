import express from 'express';

import {defaultDelete, defaultGet, defaultPost} from '../controllers/default';
import {handleAsync} from '../middlewares/error';

const router = express.Router();

router.get('/', defaultGet);
router.delete('/', handleAsync(defaultDelete));
router.post('/', defaultPost);

export default router;
