// server/src/modules/loadModules.js

import userModule from "./users/user.module.js";
import authModule from "./auth/auth.module.js";
import adminModule from "./admin/admin.module.js";
import planModule from "./plans/plan.module.js";
import uploadModule from "./uploads/upload.module.js";
import roleModule from "./roles/role.module.js";
import permissionModule from "./permissions/permission.module.js";
import systemSettingsModule from "./systemSettings/system.settings.module.js";
import auditLogModule from "./auditLogs/audit.log.module.js";
import testModule from "./test/test.module.js";
import notificationModule from "./notifications/notification.module.js";

const modules = [
  userModule,
  authModule,
  adminModule,
  planModule,
  uploadModule,
  roleModule,
  permissionModule,
  systemSettingsModule,
  auditLogModule,
  testModule,
  notificationModule,
];

export default modules;
