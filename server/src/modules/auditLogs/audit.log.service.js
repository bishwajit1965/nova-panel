import AuditLog from "./audit.log.model.js";

export const createAuditLogService = async ({
  actor,
  action,
  module,
  targetId = null,
  metadata = {},
  req,
}) => {
  if (!actor) return;

  return await AuditLog.create({
    actor,
    action,
    module,
    targetId,
    metadata: {
      ...metadata,
      planId: req.user?.plan?._id,
      planName: req.user?.plan?.name,
      maxUploads: req.user?.plan?.limits?.maxUploads,
    },
    ip: req?.ip,
    userAgent: req?.headers["user-agent"],
  });
};

// export const getAllLogsService = async () => {
//   return await AuditLog.find()
//     .populate("actor", "name email roles")
//     .sort({ createdAt: -1 });
// };

export const getAllLogsService = async () => {
  return await AuditLog.find()
    .populate({
      path: "actor",
      select: "name email roles",
      populate: {
        path: "roles",
        select: "name",
      },
    })
    .sort({ createdAt: -1 });
};
