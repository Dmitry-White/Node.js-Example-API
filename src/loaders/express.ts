import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import indexRoute from '../routes';
import {ExpressLoader} from '../types';

const expressLoader = ({app}: ExpressLoader) => {
  const corsOption = {
    origin: ['http://example1.com'],
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
  };

  app.use(cors(corsOption));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.use(indexRoute);
};

export default expressLoader;
