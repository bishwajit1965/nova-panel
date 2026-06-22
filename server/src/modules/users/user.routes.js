import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import * as userController from "./user.controller.js";
import { ROLES } from "../../constants/roles.constant.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

/**
 * 👤 USER ROUTES
 */
router.get("/me", userController.getMe);

router.get("/all", userController.getAllUsers);

router.patch("/edit/:userId", userController.updateUserRoles);

router.patch("/assign/plan/:userId", userController.assignUserPlan);

router.patch("/suspend/:userId", userController.suspendUser);

export default router;
