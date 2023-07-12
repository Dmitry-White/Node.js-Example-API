import express from 'express';
import logger from '../loaders/logger';

const router = express.Router();

router.get('/', (req, res) => {
  logger.error('Test');
  res.json({message: 'Default Route'});
});

router.post('/', (req, res) => {
  res.json({message: 'Default Route', body: req.body});
});

export default router;
