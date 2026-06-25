import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { createAuditLogService } from "../auditLogs/audit.log.service.js";

import {
  createPermissionService,
  getAllPermissionsService,
  getPermissionByIdService,
  updatePermissionService,
  deletePermissionService,
} from "./permission.service.js";

export const createPermission = asyncHandler(async (req, res) => {
  const permission = await createPermissionService(req.body);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "PERMISSION_CREATED",
    module: "PERMISSION",
    targetId: permission?._id,
    metadata: {
      email: user?.email,
      actionKey: permission?.key,
      module: permission?.module,
    },

    req,
  });

  return sendResponse(res, 201, "Permission created", permission);
});

export const getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await getAllPermissionsService();

  return sendResponse(res, 200, "Permissions fetched", permissions);
});

export const getPermissionById = asyncHandler(async (req, res) => {
  const permission = await getPermissionByIdService(req.params.id);

  return sendResponse(res, 200, "Permission fetched", permission);
});

export const updatePermission = asyncHandler(async (req, res) => {
  const permission = await updatePermissionService(req?.params?.id, req.body);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "PERMISSION_UPDATED",
    module: "PERMISSION",
    targetId: permission?._id,
    metadata: {
      email: user?.email,
      actionKey: permission?.key,
      module: permission?.module,
    },
    req,
  });

  return sendResponse(res, 200, "Permission updated", permission);
});

export const deletePermission = asyncHandler(async (req, res) => {
  const permission = await getPermissionByIdService(req?.params?.id);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "PERMISSION_DELETED",
    module: "PERMISSION",
    targetId: permission?._id,
    metadata: {
      email: user?.email,
      actionKey: permission?.key,
      module: permission?.module,
    },

    req,
  });

  await deletePermissionService(req?.params?.id);

  return sendResponse(res, 200, "Permission deleted");
});
