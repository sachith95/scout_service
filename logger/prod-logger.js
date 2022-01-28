import { format, createLogger, transports } from 'winston';
const { timestamp, combine, errors, json } = format;

function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [new transports.File({
        level: 'info',
        filename: './logs/all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false 
    })],
  });
}

module.exports = buildProdLogger;