import SystemSettings from "./system.settings.model.js";
import AppError from "../../core/errors/AppError.js";

let cachedSettings = null;
let lastFetchedAt = null;

const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// 🔹 GET SETTINGS (single global document)
export const getSettingsService = async () => {
  const now = Date.now();

  // ✔ Return cache if valid
  if (cachedSettings && lastFetchedAt && now - lastFetchedAt < CACHE_TTL) {
    return cachedSettings;
  }

  let settings = await SystemSettings.findOne({ key: "global" });

  // auto-create if missing (safe default)
  if (!settings) {
    settings = await SystemSettings.create({
      key: "global",
    });
  }

  // Update cache
  cachedSettings = settings;
  lastFetchedAt = now;

  return settings;
};

// 🔹 UPDATE SETTINGS (merge update, not replace)
export const updateSettingsService = async (data) => {
  const settings = await SystemSettings.findOneAndUpdate(
    { key: "global" },
    { $set: data },
    {
      returnDocument: "after",
      upsert: true,
      runValidators: true,
    },
  );

  if (!settings) {
    throw new AppError("Failed to update system settings", 500);
  }

  // Update cache
  cachedSettings = settings;
  lastFetchedAt = Date.now();

  return settings;
};

// 🔹 RESET SETTINGS (optional but useful)
export const resetSettingsService = async () => {
  const defaultSettings = {
    key: "global",
    site: {
      name: "My App",
      logo: "https://i.ibb.co.com/Q3s9YK8b/web-Dev-Pro-F.png",
      favicon: "https://i.ibb.co.com/Q3s9YK8b/web-Dev-Pro-F.png",
    },
    branding: {
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      footerText: "All rights reserved.",
    },
    seo: {
      title: "",
      description: "",
      keywords: [],
    },
    links: {},
    features: {
      maintenanceMode: false,
      registrationEnabled: true,
    },
    contact: {},
  };

  const settings = await SystemSettings.findOneAndUpdate(
    { key: "global" },
    defaultSettings,
    { returnDocument: "after", upsert: true },
  );

  // 🔥 IMPORTANT: refresh cache
  cachedSettings = settings;
  lastFetchedAt = Date.now();

  return settings;
};
