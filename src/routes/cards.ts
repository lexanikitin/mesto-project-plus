import express from "express";
import {
  deleteCardHandler,
  getAllCardsHandler,
  postCardHandler,
  putLikeHandler,
  deleteLikeHandler,
} from "../controllers/cards";

const router = express.Router();

router.get("/", getAllCardsHandler);
router.post("/", postCardHandler);
router.delete("/:cardId", deleteCardHandler);
router.put("/:cardId/likes", putLikeHandler);
router.delete("/:cardId/likes", deleteLikeHandler);

export default router;
