import bodyMiddleware from '../middlewares/body';
import corsMiddleware from '../middlewares/cors';
import {
  errorHandler,
  handleErrorEvent,
  notFoundErrorHandler,
} from '../middlewares/error';
import headersMiddleware from '../middlewares/headers';
import morganMiddleware from '../middlewares/morgan';
import indexRoute from '../routes';
import {RootLoader} from '../types';

const expressLoader = ({app}: RootLoader) => {
  app.use(corsMiddleware);
  app.use(headersMiddleware);
  app.use(bodyMiddleware);
  app.use(morganMiddleware);

  app.use(indexRoute);

  process.on('unhandledRejection', handleErrorEvent('unhandledRejection'));
  process.on('uncaughtException', handleErrorEvent('uncaughtException'));
  app.use(notFoundErrorHandler);
  app.use(errorHandler);
};

export default expressLoader;
