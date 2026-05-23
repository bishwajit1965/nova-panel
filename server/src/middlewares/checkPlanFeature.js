import AppError from "../core/errors/AppError.js";

export const checkPlanFeature = (featureKey) => {
  return (req, res, next) => {
    const plan = req.user?.plan;

    if (!plan) {
      return next(new AppError("No active plan found.", 403));
    }

    if (!plan.isActive) {
      return next(new AppError("Plan is inactive.", 403));
    }

    const hasFeature = plan.features?.includes(featureKey);

    if (!hasFeature) {
      return next(new AppError("Feature not available in your plan.", 403));
    }

    next();
  };
};
