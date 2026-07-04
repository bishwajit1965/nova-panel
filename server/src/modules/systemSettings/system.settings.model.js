import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    site: {
      name: { type: String, default: "My App" },
      description: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    branding: {
      logo: { type: String, default: "" },
      favicon: { type: String, default: "" },
      primaryColor: { type: String, default: "#000000" },
      secondaryColor: { type: String, default: "#ffffff" },
      footerText: { type: String, default: "All rights reserved." },
    },

    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: [{ type: String }],
    },

    social: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
    },

    features: {
      maintenanceMode: { type: Boolean, default: false },
      registrationEnabled: { type: Boolean, default: true },
    },

    contact: {
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      address: { type: String, default: "" },
    },

    system: {
      timezone: { type: String, default: "UTC" },
      dateFormat: { type: String, default: "YYYY-MM-DD" },
      timeFormat: { type: String, default: "24h" },
      language: { type: String, default: "en" },
      pagination: { type: Number, default: 10 },
      defaultTheme: { type: String, default: "light" },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SystemSettings", systemSettingsSchema);
