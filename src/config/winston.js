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
      filename: '/logs/all-logs.log',
    })
  ]
});
