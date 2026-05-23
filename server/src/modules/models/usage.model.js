import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },

    key: {
      type: String, // e.g. "upload", "request"
      required: true,
      index: true,
    },

    count: {
      type: Number,
      default: 0,
    },

    resetAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

usageSchema.index({ user: 1, key: 1 }, { unique: true });

export default mongoose.model("Usage", usageSchema);
