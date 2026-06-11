import express from "express";
import {
  uploadFile,
  getUploadedData,
  uploadMultipleFiles,
  deleteFile,
  updateFile,
} from "./upload.controller.js";

import { upload } from "./upload.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { requireFeature } from "../plans/plan.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { requirePermission } from "../../middlewares/permission.middleware.js";
import { usageGuard } from "../../middlewares/usage.guard.middleware.js";
import { PERMISSIONS } from "../../constants/permissions.constants.js";
import { ROLES } from "../../constants/roles.constant.js";
import { auditLogger } from "../auditLogs/audit.log.middleware.js";
import { accessGuard } from "../../middlewares/accessGuard.js";

const router = express.Router();

router.use(authMiddleware);
// router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN]));

// Fetch files from cloudinary
router.get("/all", getUploadedData);

// single file
router.post(
  "/single",
  accessGuard({
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    feature: "basic_upload",
    permissions: [PERMISSIONS.UPLOAD_CREATE],
    usage: "upload",
    audit: PERMISSIONS.UPLOAD_CREATE,
    auditModule: "upload",
  }),

  upload.single("file"),
  uploadFile,
);

// router.post(
//   "/single",
//   requireFeature("basic_upload"),
//   requirePermission([PERMISSIONS.UPLOAD_CREATE]),
//   usageGuard("upload"),
//   auditLogger(PERMISSIONS.UPLOAD_CREATE, "upload"),
//   upload.single("file"),
//   uploadFile,
// );

// multiple files
router.post(
  "/multiple",
  accessGuard({
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    feature: "advanced_upload",
    permissions: [PERMISSIONS.UPLOAD_CREATE],
    usage: "upload",
    audit: PERMISSIONS.UPLOAD_CREATE,
    auditModule: "upload",
  }),

  upload.array("files", 10),
  uploadMultipleFiles,
);

// Update old file if any new one selected
router.put(
  "/:id",
  accessGuard({
    roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    feature: "advanced_upload",
    permissions: [PERMISSIONS.UPLOAD_UPDATE],
    usage: "upload",
    audit: PERMISSIONS.UPLOAD_UPDATE,
    auditModule: "upload",
  }),
  upload.single("file"),
  updateFile,
);

// delete file
router.delete("/delete/:id", deleteFile);

export default router;
