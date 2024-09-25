class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.message = message;
  }
}

module.exports = ApiError;
