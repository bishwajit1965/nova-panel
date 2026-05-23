import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    action: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      required: true, // upload, plan, user, settings
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    metadata: {
      type: Object,
      default: {},
    },

    ip: String,
    userAgent: String,
  },
  { timestamps: true },
);

export default mongoose.model("AuditLog", auditLogSchema);
