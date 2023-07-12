import {ErrorRequestHandler, RequestHandler} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';

const getErrorPayload = (code: StatusCodes, message: string) => ({
  success: false,
  error: {
    code,
    message,
  },
});

const notFoundErrorHandler: RequestHandler = (req, res, next) => {
  const errorCode = StatusCodes.NOT_FOUND;
  const errorMessage = getReasonPhrase(StatusCodes.NOT_FOUND);

  const payload = getErrorPayload(errorCode, errorMessage);
  res.status(StatusCodes.NOT_FOUND).json(payload);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const errorCode = err.code || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  const payload = getErrorPayload(errorCode, errorMessage);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json(payload);
};

export {notFoundErrorHandler, errorHandler};
