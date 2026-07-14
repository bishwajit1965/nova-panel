export const profileValidationRules = {
  name: {
    required: { message: "Name field is required" },
    minLength: {
      value: 3,
      message: "Name field must be at least 3 characters",
    },
    maxLength: {
      value: 50,
      message: "Name field must be less than 50 characters",
    },
  },
  email: {
    required: { message: "Email field is required" },
    minLength: {
      value: 3,
      message: "Email field must be at least 6 characters",
    },
    maxLength: {
      value: 50,
      message: "Email field must be less than 50 characters",
    },
  },
};
