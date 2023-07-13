import validation from 'express-joi-validation';
import Joi from 'joi';

const validator = validation.createValidator({passError: true});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
});

const paramsScehma = Joi.object({
  id: Joi.string()
    .regex(/^[a-zA-Z0-9-]*$/)
    .min(36)
    .required(),
});

export {
  validator,
  signinSchema,
  createUserSchema,
  updateUserSchema,
  paramsScehma,
};
