import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'Default Route'});
});

router.post('/', (req, res) => {
  res.json({message: 'Default Route', body: req.body});
});

export default router;
