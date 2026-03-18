const winston = require('winston');

//logger para requisições
const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: 'request.log' })
    ],
    format: winston.format.json()
})

//logger erros
const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: 'error.log' })
    ],
    format: winston.format.json()
})

module.exports = {
    requestLogger,
    errorLogger
}