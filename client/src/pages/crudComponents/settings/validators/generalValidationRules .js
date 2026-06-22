export const generalValidationRules = {
  name: {
    required: {
      message: "Site name is required",
    },
    minLength: {
      value: 2,
      message: "Site name must be at least 2 characters",
    },
  },

  logo: {
    pattern: {
      value: /^(https?:\/\/.*)?$/,
      message: "Invalid logo URL",
    },
  },

  favicon: {
    pattern: {
      value: /^(https?:\/\/.*)?$/,
      message: "Invalid favicon URL",
    },
  },
};
