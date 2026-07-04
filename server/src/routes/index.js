// import authRoutes from "../modules/auth/auth.routes.js";
// import adminRoutes from "../modules/admin/admin.routes.js";
// import userRoutes from "../modules/users/user.routes.js";
// import planRoutes from "../modules/plans/plan.routes.js";
// import uploadRoutes from "../modules/uploads/upload.routes.js";
// import roleRoutes from "../modules/roles/role.routes.js";
// import permissionRoutes from "../modules/permissions/permission.routes.js";
// import systemSettingsRoutes from "../modules/systemSettings/system.settings.routes.js";
// import auditLogRoutes from "../modules/auditLogs/audit.log.routes.js";

import express from "express";
import modules from "../modules/loadModules.js";

const router = express.Router();

modules.forEach((mod) => {
  if (!mod.name || !mod.routes) {
    throw new Error("invalid module structure.");
  }
  router.use(`/${mod.name}`, mod.routes);
});

// router.use("/auth", authRoutes);
// router.use("/admins", adminRoutes);
// router.use("/users", userRoutes);
// router.use("/plans", planRoutes);
// router.use("/uploads", uploadRoutes);
// router.use("/roles", roleRoutes);
// router.use("/permissions", permissionRoutes);
// router.use("/settings", systemSettingsRoutes);
// router.use("/auditLogs", auditLogRoutes);

export default router;
