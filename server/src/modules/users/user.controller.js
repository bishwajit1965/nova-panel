import { asyncHandler } from "../../core/async/asyncHandler.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";
import { sendResponse } from "../../utils/sendResponse.js";
import userService from "./user.service.js";

class UserController extends BaseCrudController {
  constructor() {
    super(userService);
  }

  // GET ME
  getMe = asyncHandler(async (req, res) => {
    const result = await super.getMe(req.query);
    return this.success(res, "Me fetched.", result);
  });

  // GET ALL USERS
  getAll = asyncHandler(async (req, res) => {
    const result = await super.getAll(
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

    return this.success(res, "Users fetched", result);
  });

  // GET SINGLE USER
  getById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await super.getById(userId);

    return this.success(res, "User fetched", result);
  });

  // UPDATE USER
  updateById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await super.updateById(userId, req.body);

    return this.success(res, "User updated", result);
  });

  // DELETE USER
  deleteById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await super.deleteById(userId);

    return this.success(res, "User deleted", result);
  });

  // TOGGLE STATUS (custom action)
  toggleStatus = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await userService.toggleStatus(userId);

    return this.success(res, "User status updated", result);
  });

  // ASSIGN PLAN (custom action)
  assignPlan = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await userService.assignPlan(userId, req.body.planId);

    return this.success(res, "Plan assigned", result);
  });

  // ASSIGN ROLES (custom action)
  assignRoles = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await userService.assignRoles(userId, req.body.roles);

    return this.success(res, "Roles assigned", result);
  });
}

export default new UserController();

// // 👤 Get logged-in user profile
// export const getMe = asyncHandler(async (req, res) => {
//   const user = await userService.getMeService(req.user._id);
//   return sendResponse(res, 200, "User fetched successfully", {
//     user,
//   });
// });

// // Get user by id
// export const getUserById = asyncHandler(async (req, res) => {
//   const user = await userService.getUserByIdService(req.params.id);
//   return sendResponse(res, 200, "User fetched by id.", user);
// });

// // 🧑‍🤝‍🧑 Get all users (ADMIN)
// export const getAllUsers = asyncHandler(async (req, res) => {
//   const users = await userService.getAllUsersService();
//   return sendResponse(res, 200, "Users fetched successfully.", users);
// });

// //🔀 Toggle user status
// export const toggleUserStatus = asyncHandler(async (req, res) => {
//   const user = await userService.toggleUsersStatusService(req.params.id);
//   return sendResponse(res, 200, "User status updated", user);
// });

// // 🛡️ Update user role (ADMIN)
// export const updateUserRoles = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const { roles } = req.body;

//   const updatedUser = await userService.updateUserRoleService(userId, roles);
//   return sendResponse(res, 201, "User role updated successfully.", updatedUser);
// });

// // Assign Plan to user
// export const assignUserPlan = asyncHandler(async (req, res) => {
//   console.log("✅ Assign plan route is hit");
//   const { userId } = req.params;
//   const { planId } = req.body;
//   const userPlan = await userService.assignPlanToUser(userId, planId);
//   return sendResponse(res, 201, "User plan assigned.", userPlan);
// });

// // Suspend a user
// export const suspendUser = asyncHandler(async (req, res) => {
//   console.log("🚀 Suspend user method is hit");
//   const { userId } = req.params;
//   console.log("USER ID", userId);
//   const userSuspended = await userService.suspendUserService(userId);
//   return sendResponse(res, 201, "User suspended", userSuspended);
// });

// export const updateRolePermissions = async (req, res) => {
//   const { id } = req.params;
//   const { permissions } = req.body;

//   const role = await Role.findById(id);

//   if (!role) {
//     throw new AppError("Role not found", 404);
//   }

//   role.permissions = permissions;

//   await role.save();

//   const updatedRole = await Role.findById(id).populate("permissions");

//   return res.json({
//     success: true,
//     data: updatedRole,
//   });
// };
