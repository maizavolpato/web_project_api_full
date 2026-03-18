const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    const message = statusCode === 500 ? 'Erro interno do servidor' : err.message;
    
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;