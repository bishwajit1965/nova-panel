import { logger } from "../../core/logger/logger.js";

export const canUseFeature = (user, featureKey) => {
  console.log("USER+++>", user);

  const features = user?.plan?.features || [];

  console.log("FEATURES=>:", features);

  logger("features", features);

  return features.includes(featureKey);
};
