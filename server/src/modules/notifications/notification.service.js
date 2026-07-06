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
}

export default new NotificationService();
