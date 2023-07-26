import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import ErrorWithCode from "../utilities/ErrorWithCode";

export const signinHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.cookie("mesto-token", jwt.sign({ _id: user._id }, "mesto-secret", { expiresIn: "7d" }), { httpOnly: true });
      res.send({ message: "Успешный вход в систему" });
    })
    .catch(next);
};

export const signupHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};
