import {RequestHandler} from 'express';

const authGet: RequestHandler = (req, res) => {
  res.json({message: 'Auth Route', body: req.body});
};

export {authGet};
