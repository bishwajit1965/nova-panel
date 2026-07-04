import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import testController from "./test.controller.js";

const router = express.Router();

// Common auth validator to all routes
router.use(authMiddleware);

// Role-based access control middleware for all routes
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

// Define routes for test module
router.get("/getAll", testController.getAll);

// Define routes for test module
router.post("/create", testController.create);

// Define routes for test module
router.patch("/edit/:id", testController.updateById);

// Define routes for test module
router.delete("/delete/:id", testController.deleteById);

export default router;
