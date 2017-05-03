/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');
const Moment = require('moment');

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
      if (user.token !== req.headers.authorization.replace('Bearer ', '')) {
        return next(new APIError(messages.errors.unAuthorized, HttpStatus.UNAUTHORIZED));
      }
      if (Moment(new Date()).diff(Moment(user.ultimo_login), 'minutes') > config.security.expireLogin) {
        return next(new APIError(messages.errors.sessionTimeout, HttpStatus.UNAUTHORIZED));
      }
      return res.json(user);
    })
    .catch(err => next(err));
};
