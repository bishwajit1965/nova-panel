// This middleware checks if the user has exceeded their plan limits for a specific action.
// It takes a limit key (e.g., "maxProjects") and a function to get the current usage count for that limit.
// If the user has exceeded the limit, it throws a 403 error. Otherwise, it calls next() to proceed with the request.
// BUT IT IS NOT USED ANYWHERE,

import AppError from "../core/errors/AppError";

export const checkPlanLimit =
  (limitKey, getCurrentUsage) => async (req, res, next) => {
    try {
      const user = req.user;

      if (!user?.plan) {
        throw new AppError("Plan not assigned", 403);
      }

      const limit = user.plan?.limits?.[limitKey];

      if (limit === undefined) {
        throw new AppError(`Invalid limit key: ${limitKey}`, 400);
      }

      const usage = await getCurrentUsage(req, user);

      if (usage >= limit) {
        throw new AppError(`Limit exceeded for ${limitKey}`, 403);
      }

      next();
    } catch (err) {
      next(err); // IMPORTANT (no res.json)
    }
  };
