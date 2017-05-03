/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');
const JWT = require('jsonwebtoken');

const APIError = require('../../helpers/api-error');
const models = require('../../config/sequelize');
const messages = require('../../config/messages');
const config = require('../../config/config');

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  models.User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new APIError(messages.errors.user.get.notFound, HttpStatus.NOT_FOUND));
      }
      try {
        const decode = JWT.decode(user.token, config.security.jwt);
        if (user.email !== decode.email) {
          return next(new APIError(messages.errors.unAuthorized, HttpStatus.UNAUTHORIZED));
        }
        if (new Date().getTime() >= new Date(decode.exp)) {
          return next(new APIError(messages.errors.sessionTimeout, HttpStatus.UNAUTHORIZED));
        }
      } catch (err) {
        return next(err);
      }
      return res.json(user);
    })
    .catch(err => next(err));
};
