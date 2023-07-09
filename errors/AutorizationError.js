class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 11000;
  }
}

module.exports = UnauthorizedError;
