import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import * as adminController from "./admin.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]));

/**
 * Admin profile route
 */
router.get("/me", adminController.getMe);

/**
 * 🛡️ ADMIN ROUTES (inside same file)
 */
router.get("/users", adminController.getAllAdmins);

router.get("/:id", adminController.getAdminById);

router.patch("/role/:id", adminController.updateAdminRole);

router.patch("/status/:id", adminController.toggleAdminStatus);

export default router;
