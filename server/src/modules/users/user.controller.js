import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import * as userService from "./user.service.js";

// 👤 Get logged-in user profile
export const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMeService(req.user._id);
  return sendResponse(res, 200, "User fetched successfully", {
    user,
  });
});

// Get user by id
export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserByIdService(req.params.id);
  return sendResponse(res, 200, "User fetched by id.", { user });
});

// 🧑‍🤝‍🧑 Get all users (ADMIN)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsersService();
  return sendResponse(res, 200, "Users fetched successfully.", { users });
});

//🔀 Toggle user status
export const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.toggleUsersStatusService(req.params.id);
  return sendResponse(res, 200, "User status updated", { user });
});

// 🛡️ Update user role (ADMIN)
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  const user = await userService.updateUserRoleService(id, role);
  return sendResponse(res, 201, "User role updated successfully.", { user });
});
