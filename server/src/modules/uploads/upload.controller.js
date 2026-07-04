import {
  saveUpload,
  saveMultipleUploads,
  updateUploadById,
  deleteUploadById,
  getMyUploads,
} from "./upload.service.js";

import Upload from "./upload.model.js";
import projectConfig from "../../config/project.config.js";
import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../core/errors/AppError.js";
import { incrementUsage } from "../services/usage.service.js";
import { createAuditLogService } from "../auditLogs/audit.log.service.js";
import mongoose from "mongoose";
import { eventBus } from "../../core/events/eventBus.js";
import { EVENTS } from "../../core/events/events.js";
import { MODULES } from "../../core/events/modules.js";
import { buildRequestContext } from "../../utils/buildRequestContext.js";
import { OPERATION_STATUS } from "../../core/events/operationStatus.js";

// UPLOAD FILE
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No file chosen", 400);
  }
  const upload = await saveUpload(req.file, req.user._id);
  await incrementUsage(req.user._id, "upload");

  // Generate audit-log
  const context = buildRequestContext(req);

  eventBus.emit(EVENTS.UPLOAD_CREATED, {
    actor: context.actor?._id,
    action: EVENTS.UPLOAD_CREATED,
    module: MODULES.UPLOADS,
    targetId: upload._id,
    ip: context.ip,
    userAgent: context.userAgent,
    roles: context.roles,
    metadata: {
      actionKey: upload.publicId,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });

  return sendResponse(res, 201, "File uploaded successfully.", upload);
});

// UPLOAD MULTIPLE FILES
export const uploadMultipleFiles = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError("No files chosen", 400);
  }

  const uploads = await saveMultipleUploads(req.files, req.user._id);
  await incrementUsage(req.user._id, "upload");

  const batchId = new mongoose.Types.ObjectId();

  // Generate audit-log
  const context = buildRequestContext(req);

  eventBus.emit(EVENTS.MULTIPLE_UPLOADS_CREATED, {
    actor: context.actor?._id,
    action: EVENTS.MULTIPLE_UPLOADS_CREATED,
    module: MODULES.UPLOADS,
    targetId: batchId, // or uploads[0]._id if you really want
    ip: context.ip,
    userAgent: context.userAgent,
    roles: context.roles,
    metadata: {
      count: uploads.length,
      operation: "BATCH",
      uploads: uploads.map((u) => ({
        id: u._id,
        publicId: u?.publicId,
        originalName: u?.originalName,
      })),
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });

  return sendResponse(res, 201, "Multiple files uploaded.", {
    uploads,
    count: uploads.length,
  });
});

// GET UPLOADED FILES
export const getUploadedData = asyncHandler(async (req, res) => {
  const uploaded = await getMyUploads(req.user._id);
  return sendResponse(res, 200, "Files fetched successfully.", uploaded, {
    count: uploaded.length,
  });
});

// UPDATE FILE
export const updateFile = asyncHandler(async (req, res) => {
  const updated = await updateUploadById(req.params.id, req.file, req.user);

  // Generate audit-log
  const context = buildRequestContext(req);

  eventBus.emit(EVENTS.UPLOAD_UPDATED, {
    actor: context.actor?._id,
    action: EVENTS.UPLOAD_UPDATED,
    module: MODULES.UPLOADS,
    targetId: updated?._id,
    ip: context.ip,
    userAgent: context.userAgent,
    roles: context.roles,
    metadata: {
      actionKey: updated?.publicId,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });
  return sendResponse(res, 200, "File updated successfully.", updated);
});

// DELETE FILE
export const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  const upload = await Upload.findById(id);

  // Generate audit-log
  const context = buildRequestContext(req);

  eventBus.emit(EVENTS.UPLOAD_DELETED, {
    actor: context.actor?._id,
    action: EVENTS.UPLOAD_DELETED,
    module: MODULES.UPLOADS,
    targetId: upload?._id,
    roles: context.roles,
    metadata: {
      actionKey: upload?.publicId,
      operationStatus: OPERATION_STATUS.SUCCESS,
    },
  });
  await deleteUploadById(req.params.id, req.user);
  return sendResponse(res, 200, "File deleted successfully.");
});
