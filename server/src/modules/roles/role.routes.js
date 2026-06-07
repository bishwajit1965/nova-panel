import express from "express";

import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  assignRolesToUser,
  assignPermissionsToRole,
} from "./role.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("superadmin", "admin"));

router.get("/all", getAllRoles);
router.get("/:id", getRoleById);
router.post("/create", createRole);
router.patch("/edit/:id", updateRole);
router.patch("/assign/:id", assignRolesToUser); // :id => userId
router.patch("/edit/:roleId", assignPermissionsToRole); //:id => roleId
router.delete("/delete/:id", deleteRole);

export default router;
