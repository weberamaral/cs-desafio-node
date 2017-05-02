/**
 * Module dependencies
 */
const ExpressValidation = require('express-validation');
const _ = require('lodash');
const APIError = require('../helpers/api-error');

/**
 * Error handler middleware
 */
module.exports = () => (err, req, res, next) => {
  if (err instanceof ExpressValidation.ValidationError) {
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
