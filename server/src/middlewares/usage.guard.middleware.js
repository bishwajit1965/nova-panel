import AppError from "../core/errors/AppError.js";
import { logger } from "../core/logger/logger.js";
import {
  checkUsageLimit,
  getUsage,
} from "../modules/services/usage.service.js";

export const usageGuard = (key) => {
  return async (req, res, next) => {
    const user = req.user;
    const plan = user.plan;
    if (!plan) {
      return next(new AppError("No active plan found", 403));
    }

    const usage = await getUsage(user._id, key, plan);

    const isBlocked = checkUsageLimit(usage, plan, key);

    if (isBlocked) {
      return next(
        new AppError(
          `Current plan ${key} limit reached. Upgrade your plan.`,
          403,
        ),
      );
    }

    next();
  };
};
