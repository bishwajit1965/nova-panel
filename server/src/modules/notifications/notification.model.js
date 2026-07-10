import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    key: { type: String, required: true },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    category: {
      type: String,
      enum: [
        "general",
        "announcement",
        "event",
        "policy",
        "maintenance",
        "update",
        "alert",
        "other",
      ],
      default: "general",
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "critical"],
      default: "normal",
    },

    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    link: {
      type: String,
      default: null,
    },

    module: {
      type: String,
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    scheduledAt: {
      type: Date,
      default: null,
    },

    expiresAt: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived", "softDeleted"],
      default: "draft",
    },

    authority: {
      type: String,
      required: true,
      trim: true,
    },

    softDeletedAt: {
      type: Date,
      default: null,
    },

    restoredAt: {
      type: Date,
      default: null,
    },

    archivedAt: {
      type: Date,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
