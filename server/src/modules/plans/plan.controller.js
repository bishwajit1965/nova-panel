import { asyncHandler } from "../../core/async/asyncHandler.js";
import AppError from "../../core/errors/AppError.js";
import { sendResponse } from "../../utils/sendResponse.js";

import {
  createPlanService,
  getAllPlansService,
  getPlanByIdService,
  updatePlanService,
  togglePlanStatusService,
  assignPlanToUserService,
  deletePlanService,
} from "./plan.service.js";

// CREATE PLAN
export const createPlan = asyncHandler(async (req, res) => {
  const plan = await createPlanService(req.body);
  return sendResponse(res, 201, "Plan created successfully.", { plan });
});

// GET ALL PLANS
export const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await getAllPlansService();

  return sendResponse(res, 200, "Plans fetched successfully.", { plans });
});

// GET PLAN BY ID
export const getPlanById = asyncHandler(async (req, res) => {
  const plan = await getPlanByIdService(req.params.id);
  return sendResponse(res, 200, "Plan fetched successfully", { plan });
});

// UPDATE PLAN
export const updatePlan = asyncHandler(async (req, res) => {
  const plan = await updatePlanService(req.params.id, req.body);

  return sendResponse(res, 200, "Plan updated successfully.", { plan });
});

// TOGGLE PLAN STATUS
export const togglePlanStatus = asyncHandler(async (req, res) => {
  const plan = await togglePlanStatusService(req.params.id);

  return sendResponse(res, 200, "Plan status updated successfully.", { plan });
});

// ASSIGN USER A PLAN
export const assignPlanToUser = asyncHandler(async (req, res) => {
  const { userId, planId } = req.body;

  const user = await assignPlanToUserService(userId, planId);
  return sendResponse(res, 201, "Plan assigned successfully.", { user });
});

// DELETE PLAN
export const deletePlan = asyncHandler(async (req, res) => {
  const plan = await deletePlanService(req.params.id);

  return sendResponse(res, 200, "Plan deleted successfully.");
});
