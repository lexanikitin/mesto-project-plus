import express from "express";
import {
  getAllUsersHandler,
  getUserByIDHandler,
  patchUserProfileHandler,
  patchUserAvatarHandler,
  geyMyProfileHandler,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.get("/me", geyMyProfileHandler);
router.get("/:userId", getUserByIDHandler);
router.patch("/me", patchUserProfileHandler);
router.patch("/me/avatar", patchUserAvatarHandler);

export default router;
