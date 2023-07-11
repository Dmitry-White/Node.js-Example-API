import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'User Route'});
});

export default router;
