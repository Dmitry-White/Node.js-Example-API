import {ErrorRequestHandler, RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import logger from '../loaders/logger';

const getErrorPayload = (code: StatusCodes, message: string) => ({
  success: false,
  error: {
    code,
    message,
  },
});

const handleErrorEvent = (event: string) => (error: Error) => {
  logger.error(event);
  throw error;
};

const handleAsync =
  (handler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

const notFoundErrorHandler: RequestHandler = (req, res, next) => {
  const errorCode = StatusCodes.NOT_FOUND;
  const errorMessage = getReasonPhrase(errorCode);

  const payload = getErrorPayload(errorCode, errorMessage);
  res.status(errorCode).json(payload);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('!!!!!!!!!!!!!!', err);
  const errorCode = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorStatus = err.status || errorCode;
  const errorMessage = err.message || getReasonPhrase(errorCode);

  const payload = getErrorPayload(errorCode, errorMessage);
  res.status(errorStatus).json(payload);
};

export {notFoundErrorHandler, errorHandler, handleErrorEvent, handleAsync};
