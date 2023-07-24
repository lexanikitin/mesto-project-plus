import {NextFunction, Request, Response} from "express";
import Card from "../models/card";
import {CustomRequest} from "../middleware/auth";
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
  const { name, link, likes, createdAt } = req.body;
  Card.create({
    name,
    link,
    owner: ownerId,
    likes,
    createdAt,
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
    .catch(next);
};

export const putLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authenticatedUserId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: authenticatedUserId } },
    { new: true },
  )
    .orFail(() => ErrorWithCode.notFound())
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};

export const deleteLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authenticatedUserId = req.user?._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: authenticatedUserId } },
    { new: true },
  )
    .orFail(() => ErrorWithCode.notFound())
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(ErrorWithCode.badRequest());
      } else {
        next(error);
      }
    });
};
