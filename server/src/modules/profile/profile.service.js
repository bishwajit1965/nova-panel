import cloudinary from "../../config/cloudinary.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";
import AppError from "../../core/errors/AppError.js";
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
  |* UPDATE AVATAR
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
  |* RESET PASSWORD
  |**==========================*/
  async resetPasswordService(userId, body) {
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
