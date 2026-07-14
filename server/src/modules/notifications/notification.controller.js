import BaseCrudController from "../../core/base/BaseCrudController.js";
import notificationService from "./notification.service.js";
import { asyncHandler } from "../../core/async/asyncHandler.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";
import { sendResponse } from "../../utils/sendResponse.js";

class NotificationController extends BaseCrudController {
  constructor() {
    super(notificationService);
  }

  /**==========================
  |* CREATE NOTIFICATION
  |**==========================*/
  create = asyncHandler(async (req, res) => {
    const notification = await super.create(req.body);

    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.NOTIFICATION_CREATED, {
      actor: context.actor?._id,
      action: EVENTS.NOTIFICATION_CREATED,
      module: MODULES.NOTIFICATIONS,
      targetId: notification._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: notification.title,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });

    return this.success(res, "Notification created", notification, 201);
  });

  /**==========================
  |* GET BY ID
  |**==========================*/
  getById = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await super.getById(notificationId);

    return sendResponse(res, 200, "Notification fetched", notification);
  });

  /**==========================
  |* GET ALL NOTIFICATIONS
  |**==========================*/
  getAll = asyncHandler(async (req, res) => {
    const notifications = await super.getAll({
      status: { $in: ["draft", "published"] },
    });
    return this.success(res, "Notifications fetched", notifications, 200);
  });

  /**==========================
  |* MARK NOTIFICATION
  |**==========================*/
  markAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await notificationService.markAsRead(notificationId);
    return this.success(res, "Notification updated", notification, 200);
  });

  /**==========================
  |* UPDATE NOTIFICATION BY ID
  |**==========================*/
  updateById = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await super.updateById(notificationId, req.body);
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.NOTIFICATION_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.NOTIFICATION_UPDATED,
      module: MODULES.NOTIFICATIONS,
      targetId: notification._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: notification.title,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });
    return this.success(res, "Notification updated.", notification, 200);
  });

  /**==========================
  |* ARCHIVE NOTICE
  |**==========================*/
  archiveNotice = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await notificationService.archive(notificationId);
    return this.success(res, "Notice archived.", notification, 200);
  });

  /**============================
  |* FETCH ALL ARCHIVED NOTICES
  |**=============================*/
  archivedNotices = asyncHandler(async (req, res) => {
    const archivedNotices = await notificationService.getAllArchived(req.query);
    return this.success(res, "Archived notice fetched.", archivedNotices, 200);
  });

  /**==========================
  |* REVOKE ARCHIVED NOTICE
  |**==========================*/
  revokeArchivedNotice = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const revokedNotice =
      await notificationService.revokeArchived(notificationId);
    return this.success(res, "Revoked Archived notice", revokedNotice, 200);
  });

  /**==========================
  |* PUBLISH NOTICE
  |**==========================*/
  publish = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const publishedNotice =
      await notificationService.publishNotice(notificationId);
    return this.success(res, "Notice published", publishedNotice, 200);
  });

  /**==========================
  |* SOFT DELETE NOTICE
  |**==========================*/
  softDeleteNotice = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const softDeletedNotice =
      await notificationService.softDelete(notificationId);
    return this.success(res, "Notice soft deleted", softDeletedNotice, 200);
  });

  /**==========================
  |* GET SOFT DELETED NOTICES
  |**==========================*/
  getSoftDeleted = asyncHandler(async (req, res) => {
    const softDeletedNotices = await notificationService.getAllSoftDeleted(
      req.query,
    );
    return this.success(
      res,
      "Soft deleted notices are fetched",
      softDeletedNotices,
      200,
    );
  });

  /**==========================
  |* RESTORE SOFT-DELETE NOTICE
  |**==========================*/
  restoreSoftDeletedNotice = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const softDeletedNotice =
      await notificationService.restoreSoftDeleted(notificationId);
    return this.success(
      res,
      "Soft deleted notice restored.",
      softDeletedNotice,
      200,
    );
  });

  /**==========================
  |* DELETE NOTIFICATION BY ID
  |**==========================*/
  deleteById = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const notification = await super.deleteById(notificationId);
    const context = buildRequestContext(req);
    eventBus.emit(EVENTS.NOTIFICATION_DELETED, {
      actor: context.actor?._id,
      action: EVENTS.NOTIFICATION_DELETED,
      module: MODULES.NOTIFICATIONS,
      targetId: notification._id,
      ip: context.ip,
      userAgent: context.userAgent,
      roles: context.roles,
      metadata: {
        actionKey: notification.title,
        operationStatus: OPERATION_STATUS.SUCCESS,
      },
    });
    return this.success(res, "Notification deleted.", notification, 200);
  });
}

export default new NotificationController();
