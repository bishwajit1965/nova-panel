import { asyncHandler } from "../../core/async/asyncHandler.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { createAuditLogService } from "../auditLogs/audit.log.service.js";
import permissionService from "./permission.service.js";

class PermissionController extends BaseCrudController {
  constructor() {
    super(permissionService);
  }

  /**==================
  |* CREATE PERMISSION
  |**==================*/
  create = asyncHandler(async (req, res) => {
    const result = await super.create(req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PERMISSION_CREATED, {
      actor: context.actor?._id,
      action: EVENTS.PERMISSION_CREATED,
      module: MODULES.PERMISSIONS,
      targetId: result._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: result.key,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });
    return this.success(res, "Permission created.", result, 201);
  });

  /**==================
  |* GET ROLE BY ID
  |**=================*/
  getById = asyncHandler(async (req, res) => {
    const permission = await super.getById(req.params.id);
    return sendResponse(res, 200, "Permission fetched.", permission);
  });

  /**===================
  |* GET ALL PERMISSIONS
  |**===================*/
  getAll = asyncHandler(async (req, res) => {
    const result = await super.getAll(req.query);
    return this.success(res, "Permissions fetched.", result, 200);
  });

  /**=================
  |* UPDATE PERMISSION
  |**==================*/
  updateById = asyncHandler(async (req, res) => {
    const permission = await super.updateById(req.params.id, req.body);
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PERMISSION_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.PERMISSION_UPDATED,
      module: MODULES.PERMISSIONS,
      targetId: permission._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: permission.key,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });
    return this.success(res, "Permission updated.", permission, 200);
  });

  /**=================
  |* DELETE PERMISSION
  |**=================-*/
  deleteById = asyncHandler(async (req, res) => {
    const permission = await super.deleteById(req.params.id);
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.PERMISSION_DELETED, {
      actor: context.actor?._id,
      action: EVENTS.PERMISSION_DELETED,
      module: MODULES.PERMISSIONS,

      targetId: permission._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: permission.key,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });
    return this.success(res, "Permission deleted.", permission, 200);
  });
}

export default new PermissionController();

// export const createPermission = asyncHandler(async (req, res) => {
//   const permission = await createPermissionService(req.body);

//   // Generate audit-log
//   const context = buildRequestContext(req);
//   eventBus.emit(EVENTS.PERMISSION_CREATED, {
//     actor: context.actor?._id,
//     action: EVENTS.PERMISSION_CREATED,
//     module: MODULES.PERMISSIONS,
//     targetId: permission?._id,
//     ip: context.ip,
//     userAgent: context.userAgent,
//     roles: context.roles,
//     metadata: {
//       actionKey: permission?.key,
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   return sendResponse(res, 201, "Permission created.", permission);
// });

// export const getAllPermissions = asyncHandler(async (req, res) => {
//   const permissions = await getAllPermissionsService();

//   return sendResponse(res, 200, res.message, permissions);
// });

// export const getPermissionById = asyncHandler(async (req, res) => {
//   const permission = await getPermissionByIdService(req.params.id);

//   return sendResponse(res, 200, "Permission fetched.", permission);
// });

// export const updatePermission = asyncHandler(async (req, res) => {
//   const permission = await updatePermissionService(req?.params?.id, req.body);

//   // Generate audit-log
//   const context = buildRequestContext(req);
//   eventBus.emit(EVENTS.PERMISSION_UPDATED, {
//     actor: context.actor?._id,
//     action: EVENTS.PERMISSION_UPDATED,
//     module: MODULES.PERMISSIONS,
//     targetId: permission?._id,
//     roles: context.roles,
//     metadata: {
//       actionKey: permission?.key,
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   return sendResponse(res, 200, "Permission updated.", permission);
// });

// export const deletePermission = asyncHandler(async (req, res) => {
//   const permission = await getPermissionByIdService(req?.params?.id);

//   // Generate audit-log
//   const context = buildRequestContext(req);
//   eventBus.emit(EVENTS.PERMISSION_DELETED, {
//     actor: context.actor?._id,
//     action: EVENTS.PERMISSION_DELETED,
//     module: MODULES.PERMISSIONS,
//     targetId: permission?._id,
//     roles: context.roles,
//     metadata: {
//       actionKey: permission?.key,
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   await deletePermissionService(req?.params?.id);

//   return sendResponse(res, 200, "Permission deleted.", permission);
// });
