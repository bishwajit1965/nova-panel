import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    module: {
      type: String, // e.g. "blog", "user", "plan"
      default: "general",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Permission", permissionSchema);
