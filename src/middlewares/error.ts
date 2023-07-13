import {ErrorRequestHandler, RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import {jsonApiSerializer} from '../loaders/jsonApi';
import logger from '../loaders/logger';
import TransformService from '../services/transform';
import {Assets} from '../types';

const transformService = new TransformService(jsonApiSerializer, logger);

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
      console.log('1');
      next(error);
    }
  };

const notFoundErrorHandler: RequestHandler = async (req, res, next) => {
  logger.info('notFoundErrorHandler');

  const errorCode = StatusCodes.NOT_FOUND;
  const errorMessage = getReasonPhrase(errorCode);

  const payload = getErrorPayload(errorCode, errorMessage);
  const serialError = await transformService.serialize(Assets.ERROR, payload);
  res.status(errorCode).send(serialError);
};

const jwtErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  logger.info('jwtErrorHandler');

  if (err.name === 'JsonWebTokenError') {
    const errorCode = StatusCodes.BAD_REQUEST;
    const errorMessage = `${getReasonPhrase(errorCode)}: ${err.message}`;

    const payload = getErrorPayload(errorCode, errorMessage);
    const serialError = await transformService.serialize(Assets.ERROR, payload);

    res.status(errorCode).send(serialError);
  } else {
    next(err);
  }
};

const validationErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  logger.info('validationErrorHandler');

  if (err?.error?.isJoi) {
    const errorCode = StatusCodes.BAD_REQUEST;
    const errorMessage = `${getReasonPhrase(errorCode)}: ${err.error.message}`;

    const payload = getErrorPayload(errorCode, errorMessage);
    const serialError = await transformService.serialize(Assets.ERROR, payload);

    res.status(errorCode).send(serialError);
  } else {
    next(err);
  }
};

const ormErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  logger.info('ormErrorHandler');

  if (err?.sql) {
    const errorCode = StatusCodes.BAD_REQUEST;
    const errorMessage = `${getReasonPhrase(errorCode)}: ${
      err.original.message
    }`;

    const payload = getErrorPayload(errorCode, errorMessage);
    const serialError = await transformService.serialize(Assets.ERROR, payload);

    res.status(errorCode).send(serialError);
  } else {
    next(err);
  }
};

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  logger.info('errorHandler');

  const errorCode = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorStatus = err.status || errorCode;
  const errorMessage = err.message || getReasonPhrase(errorCode);

  const payload = getErrorPayload(errorCode, errorMessage);
  const serialError = await transformService.serialize(Assets.ERROR, payload);
  res.status(errorStatus).send(serialError);
};

export {
  notFoundErrorHandler,
  jwtErrorHandler,
  validationErrorHandler,
  ormErrorHandler,
  errorHandler,
  handleErrorEvent,
  handleAsync,
};
