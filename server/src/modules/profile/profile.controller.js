import { asyncHandler } from "../../core/async/asyncHandler.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";
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

    return this.success(
      res,
      "Profile updated successfully",
      updatedProfile,
      200,
    );
  });
  /**==============
  |* GET ALL USERS
  |**==============*/
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

  /**=============
  |* UPDATE AVATAR
  |**==============*/
  updateAvatar = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const profileAvatarUpdated = await userProfileService.updateAvatarService(
      userId,
      req.file,
    );
    return this.success(
      res,
      "Profile avatar updated",
      profileAvatarUpdated,
      200,
    );
  });

  /**================
  |* CHANGE PASSWORD
  |**================*/
  resetPassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await super.getById(userId);

    const passwordUpdated = await userProfileService.resetPasswordService(
      userId,
      req.body,
    );

    return this.success(
      res,
      "Password reset successfully.",
      passwordUpdated,
      200,
    );
  });
}

export default new ProfileController();
