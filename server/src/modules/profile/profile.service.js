import cloudinary from "../../config/cloudinary.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";
import AppError from "../../core/errors/AppError.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import User from "../users/user.model.js";
import bcrypt from "bcrypt";

class ProfileService extends BaseCrudService {
  constructor() {
    super(User);
  }

  /**==========================
  |* GET ME (LOGGED USER)
  |**==========================*/
  async getMe(userId) {
    return this.getById(userId, {
      select: "-password -refreshToken",
      populate: "roles plan",
    });
  }

  /**==========================================
  |* UPDATE PROFILE (key, module, name & email)
  |**==========================================*/
  async updateProfileService(userId, payload) {
    const { name, email } = payload;
    const profileUser = await this.getById(userId);

    profileUser.name = name;
    profileUser.email = email;
    profileUser.save();

    return profileUser;
  }

  /**==========================
  |* UPDATE PROFILE AVATAR
  |**==========================*/
  async updateAvatarService(userId, file) {
    if (!file) {
      throw new AppError("Avatar is required", 400);
    }
    const profileUser = await this.getById(userId);
    const oldPublicId = profileUser.avatarPublicId;

    if (oldPublicId) {
      try {
        const result = await cloudinary.uploader.destroy(oldPublicId);
      } catch (error) {
        console.error("Cloudinary delete failed:", error);
      }
    }
    profileUser.avatarUrl = file.path;
    profileUser.avatarPublicId = file.filename;

    await profileUser.save();

    return profileUser;
  }

  /**==========================
  |* RESET PROFILE PASSWORD
  |**==========================*/
  async changePasswordService(userId, body) {
    console.log("🚀 I am change password service");
    const { newPassword, confirmPassword } = body;

    const profileUser = await this.getById(userId);

    if (newPassword !== confirmPassword) {
      throw new AppError("Passwords do not match.", 400);
    }

    profileUser.password = await bcrypt.hash(newPassword, 10);

    profileUser.refreshToken = null; // optional

    await profileUser.save();

    return {
      _id: profileUser._id,
      name: profileUser.name,
      email: profileUser.email,
    };
  }
}
export default new ProfileService();
