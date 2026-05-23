import { logger } from "../../core/logger/logger.js";
import Usage from "../models/usage.model.js";

const LIMIT_MAP = {
  upload: "maxUploads",
  request: "maxRequests",
  product: "maxProducts",
  admin: "maxAdmins",
};

export const getUsage = async (userId, key, plan) => {
  const usage = await Usage.findOne({ user: userId, key });
  logger("Usage", usage);

  if (!usage) return { count: 0 };

  const expired = isCycleExpired(usage, plan);

  if (expired) {
    usage.count = 0;
    usage.resetAt = new Date();
    await usage.save();
  }

  return usage;
};

export const incrementUsage = async (userId, key) => {
  return await Usage.findOneAndUpdate(
    { user: userId, key },
    { $inc: { count: 1 } },
    { upsert: true, new: true },
  );
};

const isCycleExpired = (usage, plan) => {
  if (!usage) return true;

  const now = new Date();
  const resetAt = new Date(usage.resetAt);

  const durationDays = plan?.durationInDays || 30;

  const expiryDate = new Date(resetAt);

  expiryDate.setDate(expiryDate.getDate() + durationDays);

  return now > expiryDate;
};

export const checkUsageLimit = (usage, plan, key) => {
  const limits = plan?.limits || {};

  const max = limits[LIMIT_MAP[key]] || Infinity;
  logger("MAX", max);
  logger("Usage Count", usage.count);

  return (usage?.count || 0) >= max;
};
