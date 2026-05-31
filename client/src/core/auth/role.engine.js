import { ROLES, ROLE_HOME } from "./role.constants";

export const normalizeRoles = (roles = []) =>
  roles
    .map((r) => (typeof r === "string" ? r : r?.name))
    .filter(Boolean)
    .map((r) => r.toLowerCase());

export const getPrimaryRole = (roles = []) => {
  const normalized = normalizeRoles(roles);

  if (normalized.includes(ROLES.SUPER_ADMIN)) return ROLES.SUPER_ADMIN;

  if (normalized.includes(ROLES.ADMIN)) return ROLES.ADMIN;

  if (normalized.includes(ROLES.MODERATOR)) return ROLES.MODERATOR;

  return ROLES.USER;
};

export const getRedirectPath = (roles = []) => {
  const primaryRole = getPrimaryRole(roles);
  return ROLE_HOME[primaryRole] || "/";
};

export const hasRole = (roles = [], role) => {
  return normalizeRoles(roles).includes(role.toLowerCase());
};
