export const notificationValidationRules = {
  key: {
    required: { message: "Notification key is required" },
    minLength: {
      value: 3,
      message: "Notification key must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Notification key must be less than 50 characters",
    },
  },

  title: {
    required: { message: "Notification title is required" },
    maxLength: {
      value: 100,
      message: "Notification title must be less than 100 characters",
    },
  },
  authority: {
    required: { message: "Authority is required" },
    maxLength: {
      value: 150,
      message: "Authority must be less than 100 characters",
    },
  },

  message: {
    required: { message: "Notification message is required" },
    maxLength: {
      value: 1000,
      message: "Notification message must be less than 255 characters",
    },
  },

  module: {
    required: { message: "Notification module is required" },
    maxLength: {
      value: 50,
      message: "Notification module must be less than 50 characters",
    },
  },
};
