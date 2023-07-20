import express from "express";
import { getAllUsersHandler, getUserByIDHandler, postUserHandler } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.post("/", postUserHandler);
router.get("/:userId", getUserByIDHandler);

export default router;
