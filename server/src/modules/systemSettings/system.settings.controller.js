import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import AppError from "../../core/errors/AppError.js";
import SystemSettings from "./system.settings.model.js";

import {
  getSettingsService,
  updateSettingsService,
  resetSettingsService,
} from "./system.settings.service.js";

// 🔹 GET SETTINGS (PUBLIC or USER ACCESS)
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getSettingsService();

  return sendResponse(res, 200, "System settings fetched successfully", {
    settings,
  });
});

// 🔹 UPDATE SETTINGS (ADMIN ONLY)
export const updateSettings = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const updated = await updateSettingsService(req.body);

  return sendResponse(res, 200, "System settings updated successfully", {
    settings: updated,
  });
});

// 🔹 RESET SETTINGS (SUPER ADMIN ONLY)
export const resetSettings = asyncHandler(async (req, res) => {
  const settings = await resetSettingsService();

  return sendResponse(res, 200, "System settings reset successfully", {
    settings,
  });
});

export const seedSystemSettings = async () => {
  const exists = await SystemSettings.findOne({ key: "global" });

  if (exists) {
    return exists; // already seeded
  }

  const settings = await SystemSettings.create({
    key: "global",

    site: {
      name: "My App",
      logo: "https://i.ibb.co.com/Q3s9YK8b/web-Dev-Pro-F.png",
      favicon: "https://i.ibb.co.com/Q3s9YK8b/web-Dev-Pro-F.png",
    },

    branding: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      footerText: " All rights reserved.",
    },

    seo: {
      title: "My App",
      description: "A modern web application",
      keywords: ["app", "web", "platform"],
    },

    links: {
      website: "https://www.nova.com",
      facebook: "https://www.facebook.com/Nova",
      instagram: "https://www.instagram.com/Nova",
      linkedin: "https://www.linkedin.com/company/Nova",
      github: "https://github.com/Nova",
    },

    features: {
      maintenanceMode: false,
      registrationEnabled: true,
    },

    contact: {
      email: "nova@example.com",
      phone: "+88 1234 5678",
      address: "123 Main St, Dhaka, Bangladesh",
    },
  });

  return settings;
};
