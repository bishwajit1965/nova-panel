import { createAuditLog } from "./audit.log.service.js";

export const auditLogger = (action, module) => {
  return async (req, res, next) => {
    res.on("finish", async () => {
      try {
        if (res.statusCode < 400) {
          await createAuditLog({
            actor: req.user?._id,
            action,
            module,
            req,
          });
        }
      } catch (err) {
        console.error("Audit log failed:", err);
      }
    });

    next();
  };
};
