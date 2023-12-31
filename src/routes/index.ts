import express from "express";
import usersRouter from "./users";
import cardsRouter from "./cards";
import ErrorWithCode from "../utilities/ErrorWithCode";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/cards", cardsRouter);
router.use("*", (req, res, next) => next(ErrorWithCode.notFound()));

export default router;
