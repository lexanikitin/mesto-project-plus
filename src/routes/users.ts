import express from "express";
import {
  getAllUsersHandler,
  getUserByIDHandler,
  postUserHandler,
  patchUserProfileHandler, patchUserAvatarHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.post("/", postUserHandler);
router.get("/:userId", getUserByIDHandler);
router.patch("/me", patchUserProfileHandler);
router.patch("/me/avatar", patchUserAvatarHandler);

export default router;
