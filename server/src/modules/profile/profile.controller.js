import { asyncHandler } from "../../core/async/asyncHandler.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { ACTION_KEYS } from "../auditLogs/auditActionsAndKeyConstants.js";
import userProfileService from "./profile.service.js";

class ProfileController extends BaseCrudController {
  constructor() {
    super(userProfileService);
  }

  /**==========================
  |* GET ME (LOGGED USER)
  |**==========================*/
  getMe = asyncHandler(async (req, res) => {
    const result = await super.getMe(req.query);
    return this.success(res, "Me fetched.", result);
  });

  /**==========================================
  |* UPDATE PROFILE (key, module, name & email)
  |**==========================================*/
  updateProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const updatedProfile = await userProfileService.updateProfileService(
      userId,
      req.body,
    );

    // Generate audit log
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PROFILE_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.PROFILE_UPDATED,
      module: MODULES.PROFILE,
      targetId: updatedProfile._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: ACTION_KEYS.PROFILE_UPDATE || null,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(
      res,
      "Profile updated successfully",
      updatedProfile,
      200,
    );
  });

  /**======================
  |* GET ALL USERS PROFILE
  |**======================*/
  getAll = asyncHandler(async (req, res) => {
    const profileUsers = await super.getAll(
      { isSystem: true },
      {
        select: "name email roles plan isActive avatarUrl createdAt updatedAt",
        populate: [
          {
            path: "roles",
            populate: { path: "permissions" },
          },
          {
            path: "plan",
          },
        ],
        sort: "-createdAt",
      },
    );
    return this.success(res, "Users fetched", profileUsers, 200);
  });

  /**======================
  |* UPDATE PROFILE AVATAR
  |**======================*/
  updateAvatar = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const profileAvatarUpdated = await userProfileService.updateAvatarService(
      userId,
      req.file,
    );

    // Generate audit log
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PROFILE_AVATAR_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.PROFILE_AVATAR_UPDATED,
      module: MODULES.PROFILE,
      targetId: profileAvatarUpdated._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: ACTION_KEYS.PROFILE_AVATAR_UPDATE || null,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(
      res,
      "Profile avatar updated",
      profileAvatarUpdated,
      200,
    );
  });

  /**========================
  |* CHANGE PROFILE PASSWORD
  |**========================*/
  changePassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await super.getById(userId);

    const passwordUpdated = await userProfileService.changePasswordService(
      userId,
      req.body,
    );

    // Generate audit log
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PROFILE_PASSWORD_CHANGED, {
      actor: context.actor?._id,
      action: EVENTS.PROFILE_PASSWORD_CHANGED,
      module: MODULES.PROFILE,
      targetId: passwordUpdated._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: ACTION_KEYS.PROFILE_PASSWORD_CHANGE || null,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Password changed.", passwordUpdated, 200);
  });
}

export default new ProfileController();
