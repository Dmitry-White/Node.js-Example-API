import {getReasonPhrase, StatusCodes} from 'http-status-codes';

import {
  validator,
  signinSchema,
  createUserSchema,
  updateUserSchema,
  paramsScehma,
} from '../loaders/validation';
import HttpError from '../services/error';
import ValidationStrategies from '../types/validation';

const validateLogin = validator.body(signinSchema);

const validateCreateUser = validator.body(createUserSchema);
const validateUpdateUser = validator.body(updateUserSchema);

const validateParams = validator.params(paramsScehma);

const validate = (strategy: string) => {
  switch (strategy) {
    case ValidationStrategies.SIGNIN:
      return validateLogin;

    case ValidationStrategies.CREATE_USER:
      return validateCreateUser;

    case ValidationStrategies.UPDATE_USER:
      return validateUpdateUser;

    case ValidationStrategies.PARAMS:
      return validateParams;

    default: {
      const errorCode = StatusCodes.INTERNAL_SERVER_ERROR;
      const errorMessage = getReasonPhrase(errorCode);

      throw new HttpError(errorMessage, errorCode);
    }
  }
};

export default validate;
