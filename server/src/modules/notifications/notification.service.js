import Notification from "./notification.model.js";
import BaseCrudService from "../../core/base/BaseCrudService.js";

class NotificationService extends BaseCrudService {
  constructor() {
    super(Notification);
  }

  /**==========================
  |* MARK NOTIFICATION AS READ
  |**==========================*/
  async markAsRead(notificationId) {
    const notification = await this.getById(notificationId);
    notification.isRead = true;
    notification.save();
    return notification;
  }

  /**==========================
  |* ARCHIVE NOTICE
  |**==========================*/
  async archive(notificationId) {
    const notification = await this.getById(notificationId);
    notification.status = "archived";
    notification.archivedAt = new Date();
    await notification.save();
    return notification;
  }

  /**==========================
  |* FETCH ARCHIVED NOTICE
  |**==========================*/
  async getAllArchived() {
    const archivedNotices = await this.getAll({
      status: { $in: ["archived"] },
    });
    return archivedNotices;
  }

  /**==========================
  |* GET SOFT DELETED NOTICE
  |**==========================*/
  async getAllSoftDeleted() {
    const softDeledNotices = await this.getAll({
      status: { $in: ["softDeleted"] },
    });
    return softDeledNotices;
  }

  /**==========================
  |* PUBLISH NOTICE
  |**==========================*/
  async publishNotice(notificationId) {
    const publishedNotice = await this.getById(notificationId);
    publishedNotice.status = "published";
    publishedNotice.publishedAt = new Date();
    await publishedNotice.save();
    return publishedNotice;
  }

  /**==========================
  |* REVOKE ARCHIVED NOTICE
  |**==========================*/
  async revokeArchived(notificationId) {
    const revokedNotice = await this.getById(notificationId);
    revokedNotice.status = "draft";
    revokedNotice.publishedAt = new Date();
    await revokedNotice.save();
    return revokedNotice;
  }

  /**==========================
  |* SOFT DELETE ANY NOTICE
  |**==========================*/
  async softDelete(notificationId) {
    const softDeletedNotice = await this.getById(notificationId);
    softDeletedNotice.status = "softDeleted";
    softDeletedNotice.softDeletedAt = new Date();
    await softDeletedNotice.save();
    return softDeletedNotice;
  }

  /**==========================
  |* RESTORE SOFT DELETE NOTICE
  |**==========================*/
  async restoreSoftDeleted(notificationId) {
    const softDeletedNotice = await this.getById(notificationId);
    softDeletedNotice.status = "draft";
    softDeletedNotice.restoredAt = new Date();
    softDeletedNotice.softDeletedAt = null;
    await softDeletedNotice.save();
    return softDeletedNotice;
  }
}

export default new NotificationService();
