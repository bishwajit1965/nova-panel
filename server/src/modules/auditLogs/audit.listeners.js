import { eventBus } from "../../core/events/eventBus.js";
import { createAuditLogService } from "./audit.log.service.js";

export const registerAuditListeners = () => {
  eventBus.on("*", async (payload, eventName) => {
    try {
      if (!payload?.actor) return;
      await createAuditLogService({
        actor: payload.actor,
        action: payload.action || eventName,
        module: payload.module || "SYSTEM",
        targetId: payload.targetId || null,
        roles: payload.roles || [],
        metadata: payload.metadata || {},
        ip: payload.ip,
        userAgent: payload.userAgent,
      });
    } catch (err) {
      console.error(`Error creating audit log for event: ${eventName}`, err);
    }
  });
};
