import express from 'express';

import rootLoader from './loaders';
import config from './config';

const startServer = async () => {
  const app = express();

  await rootLoader({app});

  app.listen(config.port, () => {
    console.log(`Server running at ${config.port}`);
  });
};

startServer();
