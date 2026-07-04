import { asyncHandler } from "../../core/async/asyncHandler.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
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
  const context = buildRequestContext(req);
  eventBus.emit(EVENTS.PERMISSION_CREATED, {
    actor: context.actor?._id,
    action: EVENTS.PERMISSION_CREATED,
    module: MODULES.PERMISSIONS,
    targetId: permission?._id,
    ip: context.ip,
    userAgent: context.userAgent,
    roles: context.roles,
    metadata: {
      actionKey: permission?.key,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });

  return sendResponse(res, 201, "Permission created.", permission);
});

export const getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await getAllPermissionsService();

  return sendResponse(res, 200, res.message, permissions);
});

export const getPermissionById = asyncHandler(async (req, res) => {
  const permission = await getPermissionByIdService(req.params.id);

  return sendResponse(res, 200, "Permission fetched.", permission);
});

export const updatePermission = asyncHandler(async (req, res) => {
  const permission = await updatePermissionService(req?.params?.id, req.body);

  // Generate audit-log
  const context = buildRequestContext(req);
  eventBus.emit(EVENTS.PERMISSION_UPDATED, {
    actor: context.actor?._id,
    action: EVENTS.PERMISSION_UPDATED,
    module: MODULES.PERMISSIONS,
    targetId: permission?._id,
    roles: context.roles,
    metadata: {
      actionKey: permission?.key,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });

  return sendResponse(res, 200, "Permission updated.", permission);
});

export const deletePermission = asyncHandler(async (req, res) => {
  const permission = await getPermissionByIdService(req?.params?.id);

  // Generate audit-log
  const context = buildRequestContext(req);
  eventBus.emit(EVENTS.PERMISSION_DELETED, {
    actor: context.actor?._id,
    action: EVENTS.PERMISSION_DELETED,
    module: MODULES.PERMISSIONS,
    targetId: permission?._id,
    roles: context.roles,
    metadata: {
      actionKey: permission?.key,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });

  await deletePermissionService(req?.params?.id);

  return sendResponse(res, 200, "Permission deleted.", permission);
});
