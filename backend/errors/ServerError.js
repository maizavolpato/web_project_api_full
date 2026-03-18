const AppError = require("./AppError");

class ServerError extends AppError {
  constructor(message) {
    super(message, 500);
  }
}

module.exports = ServerError;
