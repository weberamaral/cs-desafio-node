/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const APIError = require('../../helpers/api-error');
const models = require('../../config/sequelize');
const messages = require('../../config/messages');

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
      return user.update({ ultimo_login: new Date() })
        .then(result => res.json(result))
        .catch(err => next(err));
    })
    .catch(err => next(err));
};
