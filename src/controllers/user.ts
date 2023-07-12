import {RequestHandler} from 'express';

const userGet: RequestHandler = (req, res) => {
  res.json({message: 'User Route', body: req.body});
};

export {userGet};
