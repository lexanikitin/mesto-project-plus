import { Joi, celebrate } from "celebrate";
import mongoose from "mongoose";
import { urlPattern } from "../../utilities/urlPattern";

export const postCardValidationMiddleware = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(urlPattern).required(),
  }),
});

export const cardValidationMiddleware = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .custom((value, helpers) => (mongoose.isValidObjectId(value) ? value : helpers.error("any.invalid")))
      .required(),
  }),
});
