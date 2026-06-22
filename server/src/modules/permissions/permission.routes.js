import express from "express";
import * as permissionController from "./permission.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";

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
router.get("/all", permissionController.getAllPermissions);

// Get Permission by ID
router.get("/:id", permissionController.getPermissionById);

// Create Permission
router.post("/create", permissionController.createPermission);

// Update Permission
router.patch("/edit/:id", permissionController.updatePermission);

// Delete Permission
router.delete("/delete/:id", permissionController.deletePermission);

export default router;
