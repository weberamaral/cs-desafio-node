/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const config = require('../config/config');

/**
 * API Error handler middleware
 */
module.exports = () => (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const customError = {
    mensagem: err.isPublic ? err.message : HttpStatus[err.status],
    code: err.status
  };
  if (err.errors && err.errors.length > 0) {
    customError.errors = err.errors;
  }
  if (config.env === 'development') {
    customError.stack = err.stack;
  }
  return res.status(err.status).json(customError);
};
