import express from "express";
import {
  deleteCardHandler,
  getAllCardsHandler,
  postCardHandler,
  toggleLikeHandler,
} from "../controllers/cards";
import { cardValidationMiddleware, postCardValidationMiddleware } from "../middleware/validation/cards";

const router = express.Router();

router.get("/", getAllCardsHandler);
router.post("/", postCardValidationMiddleware, postCardHandler);
router.delete("/:cardId", cardValidationMiddleware, deleteCardHandler);
router.put("/:cardId/likes", cardValidationMiddleware, toggleLikeHandler);
router.delete("/:cardId/likes", cardValidationMiddleware, toggleLikeHandler);

export default router;
