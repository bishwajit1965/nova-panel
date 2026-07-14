import { EVENTS } from "./events.js";
import { MODULES } from "./modules.js";

export const EVENT_REGISTRY = Object.freeze({
  // UPLOADS
  [EVENTS.UPLOAD_CREATED]: {
    module: MODULES.UPLOADS,
    description: "A new file upload was created",
  },

  [EVENTS.MULTIPLE_UPLOADS_CREATED]: {
    module: MODULES.UPLOADS,
    description: "Multiple file uploads were created",
  },

  [EVENTS.UPLOAD_UPDATED]: {
    module: MODULES.UPLOADS,
    description: "An existing upload was updated",
  },

  [EVENTS.UPLOAD_DELETED]: {
    module: MODULES.UPLOADS,
    description: "An upload was deleted",
  },

  // ROLES
  [EVENTS.ROLE_CREATED]: {
    module: MODULES.ROLES,
    description: "A new role was created",
  },
  [EVENTS.ROLE_UPDATED]: {
    module: MODULES.ROLES,
    description: "An existing role was updated",
  },
  [EVENTS.ROLE_DELETED]: {
    module: MODULES.ROLES,
    description: "A role was deleted",
  },

  // PROFILES
  [EVENTS.PROFILE_CREATED]: {
    module: MODULES.PROFILE,
    description: "A new user profile is created",
  },
  [EVENTS.PROFILE_UPDATED]: {
    module: MODULES.PROFILE,
    description: "A profile name & email are updated",
  },
  [EVENTS.PROFILE_AVATAR_UPDATED]: {
    module: MODULES.PROFILE,
    description: "A profile avatar is updated",
  },
  [EVENTS.PROFILE_PASSWORD_CHANGED]: {
    module: MODULES.PROFILE,
    description: "A profile password is changed",
  },

  // PERMISSIONS
  [EVENTS.PERMISSION_CREATED]: {
    module: MODULES.PERMISSIONS,
    description: "A new permission was created",
  },
  [EVENTS.PERMISSION_UPDATED]: {
    module: MODULES.PERMISSIONS,
    description: "An existing permission was updated",
  },
  [EVENTS.PERMISSION_DELETED]: {
    module: MODULES.PERMISSIONS,
    description: "A permission was deleted",
  },

  // NOTIFICATIONS
  [EVENTS.NOTIFICATION_CREATED]: {
    module: MODULES.NOTIFICATIONS,
    description: "Notification was created",
  },
  [EVENTS.NOTIFICATION_UPDATED]: {
    module: MODULES.NOTIFICATIONS,
    description: "Notification was updated",
  },
  [EVENTS.NOTIFICATION_DELETED]: {
    module: MODULES.NOTIFICATIONS,
    description: "Notification was deleted",
  },

  // PLANS
  [EVENTS.PLAN_CREATED]: {
    module: MODULES.PLANS,
    description: "A new plan was created",
  },

  [EVENTS.PLAN_UPDATED]: {
    module: MODULES.PLANS,
    description: "An existing plan was updated",
  },

  [EVENTS.PLAN_DELETED]: {
    module: MODULES.PLANS,
    description: "A plan was deleted",
  },

  // USERS
  [EVENTS.USER_REGISTERED]: {
    module: MODULES.USERS,
    description: "A new user registered",
  },

  [EVENTS.USER_LOGIN]: {
    module: MODULES.USERS,
    description: "User logged in",
  },

  [EVENTS.USER_UPDATED]: {
    module: MODULES.USERS,
    description: "User profile updated",
  },

  // TESTS
  [EVENTS.TEST_CREATED]: {
    module: MODULES.TESTS,
    description: "A new test was created",
  },

  [EVENTS.TEST_UPDATED]: {
    module: MODULES.TESTS,
    description: "An existing test was updated",
  },

  [EVENTS.TEST_DELETED]: {
    module: MODULES.TESTS,
    description: "A test was deleted",
  },

  // SECURITY
  [EVENTS.ACCESS_DENIED]: {
    module: MODULES.SECURITY,
    description: "Unauthorized access attempt detected",
  },
});
