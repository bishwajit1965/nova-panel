export const planValidationRules = {
  name: {
    required: { message: "Plan name is required" },
    minLength: {
      value: 2,
      message: "Plan name must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Plan name must be less than 100 characters",
    },
  },

  slug: {
    required: { message: "Slug is required" },
    pattern: {
      value: /^[a-z0-9-]+$/,
      message: "Slug must be lowercase and can contain hyphens only",
    },
    minLength: {
      value: 2,
      message: "Slug must be at least 2 characters",
    },
    maxLength: {
      value: 100,
      message: "Slug must be less than 100 characters",
    },
  },

  description: {
    required: { message: "Description is required" },
    maxLength: {
      value: 500,
      message: "Description must be less than 500 characters",
    },
  },

  price: {
    required: { message: "Price is required" },
    min: {
      value: 0,
      message: "Price cannot be negative",
    },
  },

  durationInDays: {
    required: { message: "Duration is required" },
    min: {
      value: 1,
      message: "Duration must be at least 1 day",
    },
    max: {
      value: 3650,
      message: "Duration cannot exceed 10 years",
    },
  },

  features: {
    required: { message: "At least one feature is required" },
    custom: {
      validate: (value) =>
        Array.isArray(value) && value.every((v) => typeof v === "string"),
      message: "Features must be an array of strings",
    },
  },

  packageType: {
    required: { message: "Package type is required" },
    enum: {
      value: ["starter", "pro", "enterprise"],
      message: "Invalid package type selected",
    },
  },
};
