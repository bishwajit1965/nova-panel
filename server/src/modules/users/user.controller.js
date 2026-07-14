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
