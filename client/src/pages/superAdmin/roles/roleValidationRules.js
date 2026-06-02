export const roleValidationRules = {
  name: {
    required: "Role name is required",
    minLength: {
      value: 3,
      message: "Role name must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Role name must be less than 50 characters",
    },
  },
  description: {
    maxLength: {
      value: 255,
      message: "Role description must be less than 255 characters",
    },
  },
  slug: {
    required: "Role slug is required",
    // pattern: {
    //   value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    //   message: "Role slug must be lowercase letters, numbers, and hyphens only",
    // },
    minLength: {
      value: 3,
      message: "Role slug must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Role slug must be less than 50 characters",
    },
  },
};
