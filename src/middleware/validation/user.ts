import { Joi, celebrate } from "celebrate";
import mongoose from "mongoose";
import { urlPattern } from "../../utilities/urlPattern";

export const getUserByIDValidationMiddleware = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .custom((value, helpers) => (mongoose.isValidObjectId(value) ? value : helpers.error("any.invalid")))
      .required(),
  }),
});

export const patchUserProfileValidationMiddleware = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});

export const patchUserAvatarValidationMiddleware = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern).required(),
  }),
});
