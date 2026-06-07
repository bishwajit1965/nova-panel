const API_PATHS = {
  /**
   * This file defines the API endpoints and their corresponding query keys for both admin and user (client) operations. It serves as a centralized location for managing API paths, making it easier to maintain and update them as needed. Each endpoint is associated with a unique key that can be used for caching and state management in the application.
   */
  /**=======================
   * SUPER-ADMIN ENDPOINTS
   *========================*/
  SUPER_ADMIN_ROLES: {
    ENDPOINT: "roles",
    KEY: ["superAdmin-roles"],
  },

  SUPER_ADMIN_PERMISSIONS: {
    ENDPOINT: "permissions",
    KEY: ["superAdmin-permissions"],
  },

  SUPER_ADMIN_USERS: {
    ENDPOINT: "users",
    KEY: ["superAdmin-users"],
  },

  /**========================
   * ADMIN ENDPOINTS
   *=========================*/

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

  /**=========================
   * USER (CLIENT)
   *==========================*/

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

  /**=========================
   * CATEGORIES (CORE ENTITY)
   *==========================*/

  CATEGORIES: {
    ENDPOINT: "categories",
    KEY: ["categories"],
  },

  /**=========================
   * PERMISSIONS (CORE ENTITY)
   *==========================*/
  PERMISSIONS: {
    ENDPOINT: "permissions",
    KEY: ["permissions"],
  },
};

export default API_PATHS;
