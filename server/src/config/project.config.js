const projectConfig = {
  app: {
    name: "Project Core",
    version: "1.0.0",
  },

  auth: {
    accessTokenExpiry: "15m",
    refreshTokenExpiry: "7d",
  },

  roles: {
    defaultRole: "user",
    allowedRoles: ["user", "admin", "superAdmin"],
  },

  uploads: {
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    maxFileSize: 5 * 1024 * 1024,
  },
};

export default projectConfig;
