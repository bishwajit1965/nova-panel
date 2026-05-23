import AppError from "../core/errors/AppError.js";

export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return next(new AppError("User not found.", 400));
      }
      const userRoles = user?.roles || [];

      // extract role names
      const roleNames = userRoles.map((role) =>
        typeof role === "string" ? role : role.name,
      );

      const hasRole = roleNames.some((role) => allowedRoles.includes(role));

      if (!hasRole) {
        return next(new AppError("Forbidden: insufficient role access", 403));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
