// Validation rules for auth routes
export const validationRules = {
  email: {
    required: { message: "Email is required" },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },
    custom: (value) => {
      if (value && value !== value.toLowerCase()) {
        return "Email should be in lowercase (recommended)";
      }
      return null;
    },
  },

  password: {
    required: { message: "Password is required" },

    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },

    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      message: "Password must include uppercase, lowercase, and a number",
    },

    custom: (value) => {
      if (!value) return null;

      const weakPatterns = ["123456", "password", "qwerty", "111111", "123123"];

      if (weakPatterns.includes(value.toLowerCase())) {
        return "That password is too common. Choose something stronger";
      }

      return null;
    },
  },
};

export const registerValidationRules = {
  name: {
    required: { message: "Name is required" },

    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },

    maxLength: {
      value: 50,
      message: "Name cannot exceed 50 characters",
    },
  },

  email: {
    required: { message: "Email is required" },

    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email address",
    },

    custom: (value) => {
      if (value && value !== value.toLowerCase()) {
        return "Email should be lowercase";
      }
      return null;
    },
  },

  password: {
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

  verifyPassword: {
    required: { message: "Please confirm your password" },

    custom: (value, formData) => {
      if (value !== formData.password) {
        return "Passwords do not match";
      }
      return null;
    },
  },

  avatarUrl: {
    required: { message: "Profile image URL is required" },

    pattern: {
      value: /^https?:\/\/.+/i,
      message: "Enter a valid image URL",
    },
  },

  acceptTerms: {
    custom: (value) => {
      if (!value) {
        return "You must accept the terms to continue";
      }
      return null;
    },
  },
};
