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

// UPLOAD FILE
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No file chosen", 400);
  }
  const upload = await saveUpload(req.file, req.user._id);
  await incrementUsage(req.user._id, "upload");

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "FILE_UPLOADED",
    module: "UPLOADS",
    targetId: upload?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: upload?.publicId,
      module: "UPLOADS",
    },
    req,
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
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "FILE_UPDATED",
    module: "UPLOADS",
    targetId: updated?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: updated?.publicId,
      module: "UPLOADS",
    },
    req,
  });
  return sendResponse(res, 200, "File updated successfully.", updated);
});

// DELETE FILE
export const deleteFile = asyncHandler(async (req, res) => {
  const { id } = req?.params;

  const upload = await Upload.findById(id);

  // Generate audit-log
  const user = req?.user;
  await createAuditLogService({
    actor: user?._id,
    action: "FILE_DELETED",
    module: "UPLOADS",
    targetId: upload?._id,
    roles: user?.roles,
    metadata: {
      email: user?.email,
      actionKey: upload?.publicId,
      module: "UPLOADS",
    },
    req,
  });
  await deleteUploadById(req.params.id, req.user);
  return sendResponse(res, 200, "File deleted successfully.");
});
