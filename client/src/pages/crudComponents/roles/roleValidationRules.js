export const roleValidationRules = {
  name: {
    required: { message: "Role name is required" },
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
    required: { message: "Role description is required" },
    maxLength: {
      value: 255,
      message: "Role description must be less than 255 characters",
    },
  },
  slug: {
    required: { message: "Role slug is required" },
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
