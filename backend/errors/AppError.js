class AppError extends Error {
  constructor(mensagem, statusCode) {
    super(mensagem);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
