import { asyncHandler } from "../../core/async/asyncHandler.js";
import AppError from "../../core/errors/AppError.js";
import { logger } from "../../core/logger/logger.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { createAuditLogService } from "../auditLogs/audit.log.service.js";
import User from "../users/user.model.js";

import {
  createRoleService,
  getAllRolesService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService,
  assignRolesToUserService,
  assignPermissionToRolesService,
} from "./role.service.js";

/**
 * CREATE ROLE
 */
export const createRole = asyncHandler(async (req, res) => {
  const role = await createRoleService(req.body);

  // Generate audit-log
  const user = req.user;
  await createAuditLogService({
    actor: user?._id,
    action: "ROLE_CREATED",
    module: "ROLES",
    targetId: role?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: role?.slug,
      module: "ROLES",
    },

    req,
  });

  return sendResponse(res, 201, "Role created successfully.", role);
});

/**
 * GET ALL ROLES
 */
export const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await getAllRolesService();

  return sendResponse(res, 200, "Roles fetched successfully.", roles);
});

/**
 * GET ROLE BY ID
 */
export const getRoleById = asyncHandler(async (req, res) => {
  const role = await getRoleByIdService(req.params.id);

  return sendResponse(res, 200, "Role fetched successfully.", {
    role,
  });
});

/**
 * UPDATE ROLE
 */
export const updateRole = asyncHandler(async (req, res) => {
  const role = await updateRoleService(req.params.id, req.body);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "ROLE_UPDATED",
    module: "ROLES",
    targetId: role?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: role?.slug,
      module: "ROLES",
    },

    req,
  });

  return sendResponse(res, 200, "Role update successful", role);
});

/**
 * ASSIGN ROLE TO USER
 */
export const assignRolesToUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { roles } = req.body;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const updatedUser = await assignRolesToUserService(user, roles);

  return sendResponse(res, 200, "Role assigned to user.", {
    user: updatedUser,
  });
});

/***
 * ASSIGNS PERMISSIONS TO ROLES
 */
export const assignPermissionsToRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const role = await assignPermissionToRolesService(id, permissions);

  return sendResponse(res, 200, "Permissions assigned successfully.", { role });
});

/**
 * DELETE ROLE
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const role = await getRoleByIdService(req?.params?.id);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "ROLE_DELETED",
    module: "ROLES",
    targetId: role?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: role?.slug,
      module: "ROLES",
    },

    req,
  });

  await deleteRoleService(req.params.id);

  return sendResponse(res, 200, "Role delete successfully.");
});
