import User from "./user.model.js";
import Role from "../roles/role.model.js";
import AppError from "../../core/errors/AppError.js";
import Plan from "../plans/plan.model.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";

class UserService extends BaseCrudService {
  constructor() {
    super(User);
  }
  // GET ME SERVICE
  async getMe(userId) {
    return this.getById(userId, {
      select: "-password -refreshToken",
      populate: "roles plan",
    });
  }

  // TOGGLE ACTIVE STATUS (SUSPEND & REVOKE SUSPENSION)
  async toggleStatus(userId) {
    const user = await this.getById(userId);

    user.isActive = !user.isActive;
    await user.save();

    return user;
  }

  // ASSIGN PLAN
  async assignPlan(userId, planId) {
    const user = await this.getById(userId);

    user.plan = planId;
    await user.save();

    return user;
  }

  // ASSIGN ROLES
  async assignRoles(userId, roles = []) {
    if (!Array.isArray(roles)) {
      throw new AppError("Roles must be an array", 400);
    }

    const user = await this.getById(userId);

    user.roles = [...new Set([...user.roles, ...roles])];

    await user.save();

    return user;
  }
}

export default new UserService();
