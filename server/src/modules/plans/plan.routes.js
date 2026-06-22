import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import {
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  togglePlanStatus,
  assignPlanToUser,
  deletePlan,
} from "./plan.controller.js";

import { ROLES } from "../../constants/roles.constant.js";

const router = express.Router();

// Common auth validator to all routes
router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

router.post("/create", createPlan);
router.get("/all", getAllPlans);
router.get("/:id", getPlanById);
router.patch("/edit/:planId", updatePlan);
router.put("/assign", assignPlanToUser);
router.patch("/toggle/:id", togglePlanStatus);
router.delete("/delete/:id", deletePlan);

export default router;
