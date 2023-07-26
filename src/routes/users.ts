import express from "express";
import {
  getAllUsersHandler,
  getUserByIDHandler,
  patchUserProfileHandler,
  patchUserAvatarHandler,
} from "../controllers/users";
import {
  getUserByIDValidationMiddleware,
  patchUserAvatarValidationMiddleware,
  patchUserProfileValidationMiddleware
} from "../middleware/validation/user";

const router = express.Router();

router.get("/", getAllUsersHandler);
router.get("/me", getUserByIDHandler);
router.get("/:userId", getUserByIDValidationMiddleware, getUserByIDHandler);
router.patch("/me", patchUserProfileValidationMiddleware, patchUserProfileHandler);
router.patch("/me/avatar", patchUserAvatarValidationMiddleware, patchUserAvatarHandler);

export default router;
