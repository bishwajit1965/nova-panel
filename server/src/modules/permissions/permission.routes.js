import express from "express";
import * as permissionController from "./permission.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * 🔐 Protect all permission routes
 * Only admin & superAdmin can manage permissions
 */
router.use(authMiddleware);
router.use(roleMiddleware("admin", "superAdmin"));

/**
 * 🧩 PERMISSION CRUD ROUTES
 */

// Create Permission
router.post("/", permissionController.createPermission);

// Get all Permissions
router.get("/all", permissionController.getAllPermissions);

// Get Permission by ID
router.get("/:id", permissionController.getPermissionById);

// Update Permission
router.patch("/edit/:id", permissionController.updatePermission);

// Delete Permission
router.delete("/:id", permissionController.deletePermission);

export default router;
