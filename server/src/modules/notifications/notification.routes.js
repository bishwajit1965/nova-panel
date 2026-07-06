import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import notificationController from "./notification.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

router.get("/all", notificationController.getAll);

router.post("/create", notificationController.create);

router.patch("/edit/:notificationId", notificationController.updateById);

router.patch("/read/:notificationId", notificationController.markAsRead);

router.delete("/delete/:notificationId", notificationController.deleteById);

export default router;
