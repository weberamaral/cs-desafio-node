/**
 * Module dependencies.
 */
const Winston = require('winston');

module.exports = new (Winston.Logger)({
  transports: [
    new Winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
});
