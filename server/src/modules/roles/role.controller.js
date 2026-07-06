import { asyncHandler } from "../../core/async/asyncHandler.js";
import AppError from "../../core/errors/AppError.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { logger } from "../../core/logger/logger.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { createAuditLogService } from "../auditLogs/audit.log.service.js";
import User from "../users/user.model.js";
import BaseCrudController from "../../core/base/BaseCrudController.js";
import roleService from "./role.service.js";

class RoleController extends BaseCrudController {
  constructor() {
    super(roleService);
  }

  /**==============
  |* CREATE ROLE
  |**==============*/
  create = asyncHandler(async (req, res) => {
    const result = await super.create(req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.ROLE_CREATED, {
      actor: context.actor?._id,
      action: EVENTS.ROLE_CREATED,
      module: MODULES.ROLES,
      targetId: result._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: result.name,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Role created.", result, 201);
  });

  /**=================
  |* GET ROLE BY ID
  |**=================*/
  getById = asyncHandler(async (req, res) => {
    const role = await super.getById(req.params.id);

    return sendResponse(res, 200, "Role fetched successfully.", role);
  });

  /**===============
  |* GET ALL ROLES
  |**===============*/
  getAll = asyncHandler(async (req, res) => {
    const roles = await super.getAll(req.query);

    return this.success(res, "Roles fetched.", roles, 200);
  });

  /**==============
  |* UPDATE ROLE
  |**==============*/
  updateById = asyncHandler(async (req, res) => {
    const role = await super.updateById(req.params.id, req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.ROLE_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.ROLE_UPDATED,
      module: MODULES.ROLES,
      targetId: role._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: role.slug,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Role updated successfully.", role);
  });

  /**====================
  |* ASSIGN ROLE TO USER
  |**====================*/
  assignRolesToUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { roles } = req.body;

    const user = await User.findById(id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const updatedUser = await assignRolesToUser(user, roles);

    return sendResponse(res, 200, "Role assigned to user.", {
      user: updatedUser,
    });
  });

  /**============================
  |* ASSIGN PERMISSIONS TO ROLE
  |**============================*/
  assignPermissionsToRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    const role = await assignPermissionsToRole(id, permissions);

    return sendResponse(res, 200, "Permissions assigned to role.", role);
  });

  /**=============
  |* DELETE ROLE
  |**=============*/
  deleteById = asyncHandler(async (req, res) => {
    const role = await super.deleteById(req.params.id);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.ROLE_DELETED, {
      actor: context.actor?._id,
      action: EVENTS.ROLE_DELETED,
      module: MODULES.ROLES,
      targetId: role._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: role.slug,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Role deleted successfully.", role);
  });
}
export default new RoleController();

/**
 * CREATE ROLE
 */
// export const createRole = asyncHandler(async (req, res) => {
//   const role = await createRoleService(req.body);

//   // Generate audit-log
//   const context = buildRequestContext(req);

//   eventBus.emit(EVENTS.ROLE_CREATED, {
//     actor: context.actor?._id,
//     action: EVENTS.ROLE_CREATED,
//     module: MODULES.ROLES,
//     targetId: role._id,
//     ip: context.ip,
//     userAgent: context.userAgent,
//     roles: context.roles,
//     metadata: {
//       actionKey: role.slug,
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   return sendResponse(res, 201, "Role created successfully.", role);
// });

/**
 * GET ALL ROLES
 */
// export const getAllRoles = asyncHandler(async (req, res) => {
//   const roles = await getAllRolesService();

//   return sendResponse(res, 200, "Roles fetched successfully.", roles);
// });

/**
 * GET ROLE BY ID
 */
// export const getRoleById = asyncHandler(async (req, res) => {
//   const role = await getRoleByIdService(req.params.id);

//   return sendResponse(res, 200, "Role fetched successfully.", {
//     role,
//   });
// });

/**
 * UPDATE ROLE
 */
// export const updateRole = asyncHandler(async (req, res) => {
//   const role = await updateRoleService(req.params.id, req.body);

//   // Generate audit-log
//   const context = buildRequestContext(req);
//   eventBus.emit(EVENTS.ROLE_UPDATED, {
//     actor: context.actor?._id,
//     action: EVENTS.ROLE_UPDATED,
//     module: MODULES.ROLES,
//     targetId: role?._id,
//     ip: context.ip,
//     userAgent: context.userAgent,
//     roles: context.roles,
//     metadata: {
//       actionKey: role?.slug,
//       module: "ROLES",
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   return sendResponse(res, 200, "Role update successful", role);
// });

/**
 * ASSIGN ROLE TO USER
 */
// export const assignRolesToUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const { roles } = req.body;

//   const user = await User.findById(id);

//   if (!user) {
//     throw new AppError("User not found.", 404);
//   }

//   const updatedUser = await assignRolesToUserService(user, roles);

//   return sendResponse(res, 200, "Role assigned to user.", {
//     user: updatedUser,
//   });
// });

/***
 * ASSIGNS PERMISSIONS TO ROLES
 */
// export const assignPermissionsToRole = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { permissions } = req.body;

//   const role = await assignPermissionToRolesService(id, permissions);

//   return sendResponse(res, 200, "Permissions assigned successfully.", { role });
// });

/**
 * DELETE ROLE
 */
// export const deleteRole = asyncHandler(async (req, res) => {
//   const role = await getRoleByIdService(req?.params?.id);

//   // Generate audit-log
//   const context = buildRequestContext(req);
//   eventBus.emit(EVENTS.ROLE_DELETED, {
//     actor: context.actor?._id,
//     action: EVENTS.ROLE_DELETED,
//     module: MODULES.ROLES,
//     targetId: role?._id,
//     ip: context.ip,
//     userAgent: context.userAgent,
//     roles: context.roles,
//     metadata: {
//       actionKey: role?.slug,
//       operationStatus: OPERATION_STATUS.SUCCESS,
//     },
//   });

//   await deleteRoleService(req.params.id);

//   return sendResponse(res, 200, "Role delete successfully.");
// });
