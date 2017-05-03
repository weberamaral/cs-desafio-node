/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');
const JWT = require('jsonwebtoken');
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
  const email = req.body.email;
  return models.User.find({ where: { email } })
    .then((user) => {
      if (!user || !user.authenticate(req.body.senha)) {
        return next(new APIError(messages.errors.auth.login.notFound, HttpStatus.UNAUTHORIZED));
      }
      let token;
      try {
        token = JWT.sign({
          email: user.email,
          exp: Moment().add(30, 'minutes').valueOf(),
          iat: (new Date()).getTime()
        }, config.security.jwt);
      } catch (err) {
        return next(err);
      }
      return user.update({
        ultimo_login: new Date().toISOString(),
        token
      })
        .then(result => res.json(result))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};
