import AppError from "../core/errors/AppError.js";
import { getUsage } from "../services/usage.service.js";

export const checkLimit = (limitKey, usageKey) => {
  return async (req, res, next) => {
    try {
      const plan = req.user.plan;

      if (!plan) {
        return next(new AppError("No plan found", 403));
      }

      const limit = plan.limits?.[limitKey];

      if (limit === undefined) {
        return next();
      }

      const usage = await getUsage(req.user._id, usageKey);

      const currentCount = usage?.count || 0;

      if (currentCount >= limit) {
        return next(new AppError("Plan limit exceeded", 403));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

// USAGE
// import Upload from "../upload.model.js";
// import { checkLimit } from "../middlewares/checkLimit.middleware.js";

// router.post(
//   "/upload",
//   authMiddleware,
//   checkLimit("maxUploads", async (req) => {
//     return await Upload.countDocuments({ user: req.user._id });
//   }),
//   uploadController
// );

// router.post(
//   "/upload",
//   authMiddleware,
//   checkPlanFeature("advanced_upload"),
//   authorize("upload.create"),
//   uploadController
// );
