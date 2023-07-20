import {NextFunction, Request, Response} from "express";
import Card from "../models/card";
import {CustomRequest} from "../middleware/authMiddleware";

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
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteCardHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndDelete(req.params.cardId)
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
    .then((card) => res.send(card))
    .catch(next);
};

export const deleteLikeHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const authenticatedUserId = req.user?._id;

  Card.findByIdAndUpdate(
    req.params.cardId,
    // @ts-ignore
    { $pull: { likes: authenticatedUserId } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch(next);
};
