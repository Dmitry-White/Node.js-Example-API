import {authMiddleware} from '../middlewares/auth';
import bodyMiddleware from '../middlewares/body';
import corsMiddleware from '../middlewares/cors';
import {
  errorHandler,
  handleErrorEvent,
  jwtErrorHandler,
  notFoundErrorHandler,
  ormErrorHandler,
  validationErrorHandler,
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

  app.use(authMiddleware);

  app.use(indexRoute);

  app.use(notFoundErrorHandler);
  app.use(jwtErrorHandler);
  app.use(validationErrorHandler);
  app.use(ormErrorHandler);
  app.use(errorHandler);
  process.on('unhandledRejection', handleErrorEvent('unhandledRejection'));
  process.on('uncaughtException', handleErrorEvent('uncaughtException'));
};

export default expressLoader;
