/**
 * Module dependencies
 */
const ExpressValidation = require('express-validation');
const HttpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('../helpers/api-error');
const messages = require('../config/messages');

/**
 * Error handler middleware
 */
module.exports = () => (err, req, res, next) => {
  if (err instanceof ExpressValidation.ValidationError) {
    if (err.status === HttpStatus.UNAUTHORIZED) {
      return next(new APIError(messages.errors.unAuthorized, HttpStatus.UNAUTHORIZED));
    }
    // const errors = [];
    // _.each(err.errors, (error) => {
    //   error.mensagem = error.messages.join('. '); // eslint-disable-line no-param-reassign
    //   errors.push(_.pick(error, ['field', 'message']));
    // });
    return next(new APIError(err.message, err.status, err.errors));
  } else if (!(err instanceof APIError)) {
    return next(new APIError(err.message, err.status));
  }
  return next(err);
};
