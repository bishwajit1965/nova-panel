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

// // Get me service
// export const getMeService = async (userId) => {
//   const user = await User.findById(userId)
//     .select("-password -refreshToken -__v")
//     .populate("plan");

//   if (!user) {
//     throw new AppError("User not found", 404);
//   }

//   return user;
// };

// // Get single user by ID
// export const getUserByIdService = async (id) => {
//   const user = await User.findById(id).select("-password");
//   if (!user) throw new AppError("User not found", 404);
//   return user;
// };

// // Get all users (admin)
// export const getAllUsersService = async () => {
//   return await User.find({ isSystem: true })
//     .select(
//       "name email plan roles avatarUrl permissions isActive createdAt updatedAt",
//     )
//     .populate("plan")
//     .populate({ path: "roles", populate: { path: "permissions" } });
// };

// // Toggle user status
// export const toggleUsersStatusService = async (userId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError("User not found.", 404);
//   }
//   user.isActive = !user.isActive;
//   await user.save();
//   return user;
// };

// // Super Admin Assigns user a plan
// export const assignPlanToUser = async (userId, planId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError("User not found.", 404);
//   }
//   const plan = await Plan.findById(planId);
//   if (!plan) {
//     throw new AppError("Plan not found.", 404);
//   }

//   user.plan = plan._id;
//   await user.save();
// };

// // Update / Assign user role
// export const updateUserRoleService = async (userId, roles) => {
//   const user = await User.findById(userId);
//   if (!user) throw new AppError("User not found", 404);

//   user.roles = roles;
//   ((user.isSystem = true), await user.save());

//   return user;
// };

// // Assign permissions to roles
// export const updateRolePermissionsService = async (roleId, permissions) => {
//   const role = await Role.findById(roleId).populate({
//     populate: { path: "permissions" },
//   });
//   if (!role) {
//     throw new AppError("Role not found", 404);
//   }

//   role.permissions = permissions;

//   await role.save();

//   return role;
// };

// // Suspend a user
// export const suspendUserService = async (userId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new AppError("User not found.", 404);
//   }
//   user.isActive = !user.isActive;
//   await user.save();
//   return user;
// };
