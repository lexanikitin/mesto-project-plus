import {NextFunction, Request, Response} from "express";
import User from "../models/user";

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
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => res.send(user))
    .catch(next);
};

export const getUserByIDHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(next);
};
