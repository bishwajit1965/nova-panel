import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import permissionController from "./permission.controller.js";

const router = express.Router();

/**
 * 🔐 Protect all permission routes
 * Only admin & superAdmin can manage permissions
 */
router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

/**
 * 🧩 PERMISSION CRUD ROUTES
 */

// Get all Permissions
router.get("/all", permissionController.getAll);

// Get Permission by ID
router.get("/:id", permissionController.getById);

// Create Permission
router.post("/create", permissionController.create);

// Update Permission
router.patch("/edit/:id", permissionController.updateById);

// Delete Permission
router.delete("/delete/:id", permissionController.deleteById);

export default router;
