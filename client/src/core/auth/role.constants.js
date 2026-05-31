export const ROLES = {
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

export const ROLE_HOME = {
  [ROLES.SUPER_ADMIN]: "/superAdmin/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.MODERATOR]: "/moderator/dashboard",
  [ROLES.USER]: "/users",
};
