import BaseCrudController from "../../core/base/BaseCrudController.js";
import notificationService from "./notification.service.js";
import { asyncHandler } from "../../core/async/asyncHandler.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";

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
    const notification = await super.getById(req.params.id);

    return sendResponse(res, 200, "Notification fetched", notification, 200);
  });

  /**==========================
  |* GET ALL NOTIFICATIONS
  |**==========================*/
  getAll = asyncHandler(async (req, res) => {
    const notifications = await super.getAll(req.query);
    return (this, success(res, "Notifications fetched", notifications, 200));
  });

  /**==========================
  |* MARK NOTIFICATION AS READ
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
    const notification = await super.updateById(req.params.id, req.body);
    const context = buildRequestContext(req);

    eventBus.emit(EVENTS.NOTIFICATION_UPDATED, {
      actor: context.actor?._id,
      action: EVENTS.NOTIFICATION_UPDATED,
      MODULE: MODULES.NOTIFICATIONS,
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
  |* DELETE NOTIFICATION BY ID
  |**==========================*/
  deleteById = asyncHandler(async (req, res) => {
    const notification = await super.deleteById(req.params.id);
    const context = buildRequestContext(req);
    eventBus.emit(EVENTS.NOTIFICATION_DELETED, {
      actor: context.actor?._id,
      action: EVENTS.NOTIFICATION_DELETED,
      MODULE: MODULES.NOTIFICATIONS,
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
