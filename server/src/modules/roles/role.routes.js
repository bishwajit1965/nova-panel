import express from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/roles.constant.js";
import roleController from "./role.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware([ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.MODERATOR]));

router.get("/all", roleController.getAll);
router.get("/:id", roleController.getById);
router.post("/create", roleController.create);
router.patch("/edit/:id", roleController.updateById);
router.patch("/assign/:id", roleController.assignRolesToUser); // :id => userId
router.patch("/edit/:roleId", roleController.assignPermissionsToRole); //:id => roleId
router.delete("/delete/:id", roleController.deleteById);

export default router;
