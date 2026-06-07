import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import * as userController from "./user.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("superadmin"));

/**
 * 👤 USER ROUTES
 */
router.get("/me", userController.getMe);

router.get("/all", userController.getAllUsers);

router.patch("/edit/:userId", userController.updateUserRoles);

export default router;
