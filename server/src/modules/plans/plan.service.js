import User from "../users/user.model.js";
import Plan from "./plan.model.js";
import AppError from "../../core/errors/AppError.js";
import { logger } from "../../core/logger/logger.js";

// CREATE PLAN
export const createPlanService = async (data) => {
  return await Plan.create(data);
};

// GET ALL PLANS
export const getAllPlansService = async () => {
  const plans = await Plan.find().sort({ price: 1 });
  if (!plans) {
    throw new AppError("Plans not found", 404);
  }
  return plans;
};

// GET PLAN BY ID
export const getPlanByIdService = async (id) => {
  const plan = await Plan.findById(id);

  if (!plan) {
    throw new AppError("Plan not found", 404);
  }

  return plan;
};

// UPDATE PLAN
export const updatePlanService = async (id, data) => {
  const plan = await Plan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!plan) {
    throw new AppError("Plan not found", 404);
  }

  return plan;
};

// TOGGLE PLAN STATUS
export const togglePlanStatusService = async (id) => {
  const plan = await Plan.findById(id);

  if (!plan) {
    throw new AppError("Plan not found", 404);
  }

  plan.isActive = !plan.isActive;
  await plan.save();

  return plan;
};

// ASSIGN USER A PLAN
export const assignPlanToUserService = async (userId, planId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const plan = await Plan.findById(planId);

  if (!plan) {
    throw new AppError("Plan not found.", 404);
  }

  if (!plan.isActive) {
    throw new AppError("Plan is not active.", 400);
  }
  user.plan = plan._id;

  await user.save();

  // For keeping sensitive data safe
  const safeUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate("plan");

  return safeUser;
};

// DELETE PLAN
export const deletePlanService = async (id) => {
  const plan = await Plan.findByIdAndDelete(id);

  if (!plan) {
    throw new AppError("Plan not found", 404);
  }

  return true;
};
