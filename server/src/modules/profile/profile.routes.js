import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import profileController from "./profile.controller.js";
import { upload } from "../../config/cloudinary.upload.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR]));

// GET ME
router.get("/me", profileController.getMe);

// GET ALL USERS FOR PROFILE
router.get("/all", profileController.getAll);

// EDIT NAME & EMAIL
router.patch("/edit/profile/:userId", profileController.updateProfile);

// EDIT AVATAR
router.patch(
  "/edit/avatar/:userId",
  upload.single("avatar"),
  profileController.updateAvatar,
);

// RESET PASSWORD
router.patch("/change/password/:userId", profileController.changePassword);

export default router;
