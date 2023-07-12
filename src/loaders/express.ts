import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import config from '../config';
import indexRoute from '../routes';
import {RootLoader} from '../types';

const expressLoader = ({app}: RootLoader) => {
  const corsOption = {
    origin: ['http://example1.com'],
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
  };

  app.use(cors(corsOption));
  app.use(bodyParser.json());
  app.use(morgan(config.logs.format));

  app.use(indexRoute);
};

export default expressLoader;
