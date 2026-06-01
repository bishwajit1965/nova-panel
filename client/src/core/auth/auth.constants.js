// USERS ROLES
export const ROLES = {
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user",
};

// DECIDES USERS LANDING PRIORITY
export const ROLE_HOME = {
  [ROLES.SUPER_ADMIN]: "/superAdmin/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
  [ROLES.MODERATOR]: "/moderator/dashboard",
  [ROLES.USER]: "/users",
};

// DECIDES USERS ROLES PRIORITY
export const ROLE_PRIORITY = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.MODERATOR,
  ROLES.USER,
];
