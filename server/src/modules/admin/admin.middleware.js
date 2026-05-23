import AppError from "../core/errors/AppError.js";
import {
  checkUsageLimit,
  getUsage,
} from "../modules/services/usage.service.js";

export const usageGuard = (key) => {
  return async (req, res, next) => {
    const user = req.user;
    const plan = user.plan;

    const usage = await getUsage(user._id, key, plan);

    const isBlocked = checkUsageLimit(usage, plan, key);

    if (isBlocked) {
      return next(
        new AppError(
          "Current plan upload limit reached. Upgrade your plan to upload more files.",
          403,
        ),
      );
    }

    next();
  };
};
