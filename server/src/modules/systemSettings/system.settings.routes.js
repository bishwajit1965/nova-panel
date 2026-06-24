import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";

import {
  getSettings,
  updateSettings,
  resetSettings,
  seedSystemSettings,
} from "./system.settings.controller.js";

import { ROLES } from "../../constants/roles.constant.js";

const router = express.Router();

router.get("/public", getSettings);

// 🌍 PUBLIC READ
router.get(
  "/all",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
  getSettings,
);

// 🔐 ADMIN UPDATE
router.patch(
  "/edit/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]),
  updateSettings,
);

// 🧨 SUPER ADMIN RESET
router.post(
  "/reset",
  authMiddleware,
  roleMiddleware([ROLES.SUPER_ADMIN]),
  resetSettings,
);

// Seeder route (can be protected or removed in production)
router.post("/seed", async (req, res, next) => {
  try {
    const result = await seedSystemSettings();
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("❌ SEED ERROR:", err);
    next(err);
  }
});

export default router;
