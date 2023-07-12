import express from 'express';

import rootLoader from './loaders';
import config from './config';
import logger from './loaders/logger';

const startServer = async () => {
  const app = express();

  await rootLoader({app});

  app.listen(config.port, () => {
    logger.info(`Server running at ${config.port}`);
  });
};

startServer();
