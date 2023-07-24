import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { CustomRequest } from "../middleware/auth";
import ErrorWithCode from "../utilities/ErrorWithCode";

export const getAllUsersHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const postUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};

export const getUserByIDHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId).orFail(() => ErrorWithCode.notFound())
    .then((user) => res.send(user))
    .catch(next);
};

const patchUserData = (
  data: {
    name?: string;
    about?: string;
    avatar?: string;
  },
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authenticatedUserId = req.user?._id;
  User.findOneAndUpdate(
    { authenticatedUserId },
    { data },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => ErrorWithCode.notFound())
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};

export const patchUserProfileHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => patchUserData({ name: req.body.name, about: req.body.about }, req, res, next);

export const patchUserAvatarHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => patchUserData({ avatar: req.body.avatar }, req, res, next);
