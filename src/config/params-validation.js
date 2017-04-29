/**
 * Module dependencies.
 */
const Joi = require('joi');

module.exports = {
  /**
   * Default validations
   */
  defaults: {
    id: {
      params: {
        id: Joi.string().required()
      }
    }
  }
};
