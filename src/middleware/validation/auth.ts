import { Joi, celebrate } from "celebrate";
import { urlPattern } from "../../utilities/urlPattern";

export const signupValidationMiddleware = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signinValidationMiddleware = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
