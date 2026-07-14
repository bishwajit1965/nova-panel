import { logger } from "../../core/logger/logger.js";

export const canUseFeature = (user, featureKey) => {
  const features = user?.plan?.features || [];

  logger("features", features);

  return features.includes(featureKey);
};
