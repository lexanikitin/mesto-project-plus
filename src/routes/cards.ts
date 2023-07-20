import express from "express";
import {deleteCardHandler, getAllCardsHandler, postCardHandler} from "../controllers/cards";
import {postUserHandler} from "../controllers/users";

const router = express.Router();

router.get("/", getAllCardsHandler);
router.post("/", postCardHandler);
router.delete("/:cardId", deleteCardHandler);

export default router;
