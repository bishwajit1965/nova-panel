const API_PATHS = {
  // =========================
  // ADMIN
  // =========================

  ADMIN_USERS: {
    ENDPOINT: "admin/users",
    KEY: ["admin-users"],
  },

  ADMIN_ORDERS: {
    ENDPOINT: "admin/orders",
    KEY: ["admin-orders"],
  },

  ADMIN_ANALYTICS: {
    ENDPOINT: "admin/analytics",
    KEY: ["admin-analytics"],
  },

  // =========================
  // USER (CLIENT)
  // =========================

  USERS: {
    ENDPOINT: "client/users",
    KEY: ["users"],
  },

  ORDERS: {
    ENDPOINT: "client/orders",
    KEY: ["orders"],
  },

  PROFILE: {
    ENDPOINT: "client/profile",
    KEY: ["profile"],
  },

  CART: {
    ENDPOINT: "client/cart",
    KEY: ["cart"],
  },

  // =========================
  // CATEGORIES (CORE ENTITY)
  // =========================

  CATEGORIES: {
    ENDPOINT: "categories",
    KEY: ["categories"],
  },

  // =========================
  // PERMISSIONS (CORE ENTITY)
  // =========================
  PERMISSIONS: {
    ENDPOINT: "permissions",
    KEY: ["permissions"],
  },
};

export default API_PATHS;
