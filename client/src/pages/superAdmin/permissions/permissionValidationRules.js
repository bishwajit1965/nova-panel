export const permissionValidationRules = {
  key: {
    required: "Permission key is required",
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
    maxLength: {
      value: 255,
      message: "Permission description must be less than 255 characters",
    },
  },
  module: {
    required: "Permission module is required",
    // pattern: {
    //   value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    //   message: "Permission module must be lowercase and can contain hyphens",
    // },
    maxLength: {
      value: 50,
      message: "Permission module must be less than 50 characters",
    },
  },
};
