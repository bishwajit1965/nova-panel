export const hasRole = (user, roles = []) => {
  return user.roles?.some((role) => roles.includes(role.slug));
};
