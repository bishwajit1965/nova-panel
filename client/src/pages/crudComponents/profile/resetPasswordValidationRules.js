export const resetPasswordValidationRules = {
  newPassword: {
    required: { message: "Password is required" },

    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },

    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-]).{6,}$/,
      message:
        "Must include uppercase, lowercase, number, and special character",
    },

    custom: (value) => {
      if (!value) return null;

      const weakPatterns = ["123456", "password", "qwerty", "111111", "123123"];

      if (weakPatterns.some((weak) => value.toLowerCase().includes(weak))) {
        return "That password is too common";
      }

      return null;
    },
  },

  confirmPassword: {
    required: { message: "Please confirm your password" },

    custom: (value, formData) => {
      if (value !== formData.password) {
        return "Passwords do not match";
      }
      return null;
    },
  },
};
