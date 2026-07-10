import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import notificationController from "./notification.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.use(roleMiddleware([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR]));

router.get("/all", notificationController.getAll);

router.get("/archived", notificationController.archivedNotices);

router.get("/soft/deleted", notificationController.getSoftDeleted);

router.get("/get-single/:notificationId", notificationController.getById);

router.post("/create", notificationController.create);

router.patch("/publish/:notificationId", notificationController.publish);

router.patch("/edit/:notificationId", notificationController.updateById);

router.patch("/read/:notificationId", notificationController.markAsRead);

router.patch("/archive/:notificationId", notificationController.archiveNotice);

router.patch(
  "/revoke/archived/:notificationId",
  notificationController.revokeArchivedNotice,
);

router.delete(
  "/soft/delete/:notificationId",
  notificationController.softDeleteNotice,
);

router.patch(
  "/restore/soft/deleted/:notificationId",
  notificationController.restoreSoftDeletedNotice,
);

router.delete("/delete/:notificationId", notificationController.deleteById);

export default router;
