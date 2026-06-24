import SystemSettings from "../modules/systemSettings/system.settings.model.js";

export const maintenanceMiddleware = async (req, res, next) => {
  try {
    const bypassPaths = [
      "/api/v1/auth",
      "/api/v1/admin",
      "/api/v1/superadmin",
      "/api/v1/moderator",
      "/api/v1/system-settings",
    ];

    const shouldBypass = bypassPaths.some((path) =>
      req.originalUrl.startsWith(path),
    );

    if (shouldBypass) {
      return next();
    }

    const systemSettings = await SystemSettings.findOne({ key: "global" });

    if (systemSettings?.features?.maintenanceMode) {
      return res.status(503).json({
        success: false,
        maintenance: true,
        message: "Site is under maintenance",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
