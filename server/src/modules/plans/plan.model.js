import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    durationInDays: {
      type: Number,
      default: 30,
    },

    features: {
      type: [String],
      default: [],
    },

    limits: {
      maxUploads: {
        type: Number,
        default: 5,
      },

      maxRequests: {
        type: Number,
        default: 100,
      },

      maxProducts: {
        type: Number,
        default: 10,
      },

      maxAdmins: {
        type: Number,
        default: 1,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Plan", planSchema);
