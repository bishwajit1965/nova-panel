import AppError from "../../core/errors/AppError.js";
import { canUseFeature } from "./feature.engine.js";

export const requireFeature = (featureKey) => (req, res, next) => {
  try {
    if (!canUseFeature(req.user, featureKey)) {
      throw new AppError(`Feature not available: ${featureKey}`, 403);
    }

    next();
  } catch (err) {
    next(err); // IMPORTANT
  }
};
