import AuditLog from "./audit.log.model.js";
export const createAuditLogService = async ({
  actor,
  action,
  module,
  targetId = null,
  roles,
  metadata = {},
  ip,
  userAgent,
}) => {
  if (!actor) return;

  return AuditLog.create({
    actor,
    action,
    module,
    targetId,
    roles,
    metadata,
    ip,
    userAgent,
  });
};

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
