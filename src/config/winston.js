/**
 * Module dependencies.
 */
const Winston = require('winston');

module.exports = new (Winston.Logger)({
  transports: [
    new Winston.transports.Console({
      level: 'debug',
      json: true,
      colorize: true
    }),
    new Winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    })
  ],
  exitOnError: false
});
