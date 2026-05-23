import AppError from "../core/errors/AppError.js";

export const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new AppError("Unauthorized access attempted.", 401));
      }

      // superAdmin bypass (optional global override)
      if (user.primaryRole === "superAdmin") {
        return next();
      }

      const roles = user.roles || [];

      // collect all permissions from roles
      let userPermissions = roles.flatMap((role) => role.permissions || []);

      // remove duplicates
      userPermissions = [...new Set(userPermissions)];

      // wildcard support (* = full access)
      if (userPermissions.includes("*")) {
        return next();
      }

      // permission check
      const hasPermission = requiredPermissions.every((perm) =>
        userPermissions.includes(perm),
      );

      if (!hasPermission) {
        return next(new AppError("Forbidden: insufficient permissions.", 403));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
