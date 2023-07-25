import express from "express";
import {
  deleteCardHandler,
  getAllCardsHandler,
  postCardHandler,
  toggleLikeHandler,
} from "../controllers/cards";

const router = express.Router();

router.get("/", getAllCardsHandler);
router.post("/", postCardHandler);
router.delete("/:cardId", deleteCardHandler);
router.put("/:cardId/likes", toggleLikeHandler);
router.delete("/:cardId/likes", toggleLikeHandler);

export default router;
