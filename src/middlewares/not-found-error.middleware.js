/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const messages = require('../config/messages');
const APIError = require('../helpers/api-error');

/**
 * NotFound handler middleware
 */
module.exports = () => (req, res, next) =>
  next(new APIError(messages.errors.apiNotFound, HttpStatus.NOT_FOUND));
