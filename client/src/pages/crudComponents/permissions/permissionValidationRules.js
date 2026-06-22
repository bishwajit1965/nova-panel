export const permissionValidationRules = {
  key: {
    required: { message: "Permission key is required" },
    minLength: {
      value: 3,
      message: "Permission key must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Permission key must be less than 50 characters",
    },
  },
  description: {
    required: { message: "Permission description is required" },
    maxLength: {
      value: 255,
      message: "Permission description must be less than 255 characters",
    },
  },
  module: {
    required: { message: "Permission module is required" },
    maxLength: {
      value: 50,
      message: "Permission module must be less than 50 characters",
    },
  },
};
