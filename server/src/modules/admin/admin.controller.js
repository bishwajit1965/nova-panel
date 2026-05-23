import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import * as adminService from "./admin.service.js";

// 👤 Get logged-in admin profile
export const getMe = asyncHandler(async (req, res) => {
  const user = await adminService.getMeService(req.user._id);
  return sendResponse(res, 200, "Admin fetched successfully", {
    user,
  });
});

// Get admin by id
export const getAdminById = asyncHandler(async (req, res) => {
  const user = await adminService.getAdminByIdService(req.params.id);
  return sendResponse(res, 200, "Admin fetched by id.", { user });
});

// 🧑‍🤝‍🧑 Get all admins (ADMIN)
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await adminService.getAllAdminsService();
  return sendResponse(res, 200, "Admins fetched successfully.", { admins });
});

//🔀 Toggle admin status
export const toggleAdminStatus = asyncHandler(async (req, res) => {
  const user = await adminService.toggleAdminStatusService(req.params.id);
  return sendResponse(res, 200, "Admin status updated", { user });
});

// 🛡️ Update admin role (ADMIN)
export const updateAdminRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  const user = await adminService.updateAdminRoleService(id, role);
  return sendResponse(res, 201, "Admin role updated successfully.", { user });
});
