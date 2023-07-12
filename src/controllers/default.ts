import {RequestHandler} from 'express';

const defaultGet: RequestHandler = async (req, res) => {
  await new Promise((res, rej) => {
    setTimeout(() => {
      rej('Time out!');
    }, 5000);
  });
  res.json({message: 'Default Route'});
};

const defaultPost: RequestHandler = (req, res) => {
  res.json({message: 'Default Route', body: req.body});
};

export {defaultGet, defaultPost};
