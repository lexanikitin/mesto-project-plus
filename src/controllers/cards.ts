import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import { CustomRequest } from "../middleware/auth";
import ErrorWithCode from "../utilities/ErrorWithCode";

export const getAllCardsHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const postCardHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const ownerId = req.user?._id;
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: ownerId,
  })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};

export const deleteCardHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => ErrorWithCode.notFound())
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === "CastError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};

export const toggleLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authenticatedUserId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    req.method === "PUT" ? { $addToSet: { likes: authenticatedUserId } } : { $pull: { likes: authenticatedUserId } },
    { new: true },
  )
    .orFail(() => ErrorWithCode.notFound())
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === "CastError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};
