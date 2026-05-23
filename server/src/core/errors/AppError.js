class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.error = this.getErrorType(statusCode);

    Error.captureStackTrace(this, this.constructor);
  }

  getErrorType(statusCode) {
    if (statusCode >= 500) return "SERVER_ERROR";
    if (statusCode === 401) return "UNAUTHORIZED";
    if (statusCode === 403) return "FORBIDDEN";
    if (statusCode === 404) return "NOT_FOUND";
    if (statusCode === 400) return "BAD_REQUEST";
    return "BAD_REQUEST";
  }
}

export default AppError;
