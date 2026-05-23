import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { getAllLogsService } from "./audit.log.service.js";

export const getAllAuditLogs = asyncHandler(async (req, res) => {
  const logs = await getAllLogsService();

  return sendResponse(res, 200, "Audit logs fetched successfully", {
    logs,
  });
});
