import {StatusCodes} from 'http-status-codes';

class HttpError extends Error {
  code: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.code = statusCode;
  }
}

export default HttpError;
