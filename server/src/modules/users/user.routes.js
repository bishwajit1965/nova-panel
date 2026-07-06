import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import userController from "./user.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

// 👤 USER ROUTES

router.get("/me", userController.getMe);

router.get("/all", userController.getAll);

router.patch("/edit/:userId", userController.updateById);

router.patch("/assign/plan/:userId", userController.assignPlan);

router.patch("/suspend/:userId", userController.toggleStatus);

export default router;
