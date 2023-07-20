import express from "express";
import {
  getAllUsersHandler,
  getUserByIDHandler,
  postUserHandler,
  patchUserProfileHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.post("/", postUserHandler);
router.get("/:userId", getUserByIDHandler);
router.patch("/me", patchUserProfileHandler);

export default router;
