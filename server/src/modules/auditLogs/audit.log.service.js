import AuditLog from "./audit.log.model.js";

export const createAuditLog = async ({
  actor,
  action,
  module,
  targetId = null,
  metadata,
  req,
}) => {
  return await AuditLog.create({
    actor,
    action,
    module,
    targetId,
    metadata: {
      planId: req.user.plan?._id,
      planName: req.user.plan?.name,
      maxUploads: req.user.plan?.limits?.maxUploads,
    },
    ip: req?.ip,
    userAgent: req?.headers["user-agent"],
  });
};

export const getAllLogsService = async () => {
  return await AuditLog.find()
    .populate("actor", "name email")
    .sort({ createdAt: -1 });
};
