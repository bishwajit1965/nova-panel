import { authMiddleware } from "./auth.middleware.js";
import { roleMiddleware } from "./role.middleware.js";
import { requirePermission } from "./permission.middleware.js";
import { usageGuard } from "./usage.guard.middleware.js";
import { requireFeature } from "../modules/plans/plan.middleware.js";
import { auditLogger } from "../modules/auditLogs/audit.log.middleware.js";

// This middleware factory allows you to combine multiple guards into a single middleware chain.
export const accessGuard = (options = {}) => {
  const chain = [];

  const hasSecurityRules =
    options.roles ||
    options.permissions ||
    options.feature ||
    options.usage ||
    options.audit;

  // ---------------------------
  // 1. AUTH ENGINE (SMART)
  // ---------------------------
  if (options.auth !== false && hasSecurityRules) {
    chain.push(authMiddleware);
  } else if (options.auth !== false && !options.auth) {
    // default protected route behavior
    chain.push(authMiddleware);
  }

  // ---------------------------
  // 2. USAGE (FAST FAIL FIRST)
  // ---------------------------
  if (options.usage) {
    chain.push(usageGuard(options.usage));
  }

  // ---------------------------
  // 3. ROLE CHECK
  // ---------------------------
  if (options.roles) {
    chain.push(roleMiddleware(options.roles));
  }

  // ---------------------------
  // 4. FEATURE CHECK (PLAN)
  // ---------------------------
  if (options.feature) {
    chain.push(requireFeature(options.feature));
  }

  // ---------------------------
  // 5. PERMISSION CHECK (FINE-GRAINED)
  // ---------------------------
  if (options.permissions) {
    chain.push(requirePermission(options.permissions));
  }

  // ---------------------------
  // 6. AUDIT (LAST STEP)
  // ---------------------------
  if (options.audit) {
    chain.push(auditLogger(options.audit, options.auditModule || "system"));
  }

  // ---------------------------
  // EXECUTION PIPELINE
  // ---------------------------
  return async (req, res, next) => {
    let index = 0;

    const run = async (err) => {
      if (err) return next(err);
      if (index >= chain.length) return next();

      const mw = chain[index++];

      try {
        await mw(req, res, run);
      } catch (error) {
        next(error);
      }
    };

    run();
  };
};
