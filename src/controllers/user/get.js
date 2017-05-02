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
  models.User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new APIError(messages.errors.user.get.notFound, HttpStatus.NOT_FOUND));
      }
      return res.json(user);
    })
    .catch(err => next(err));
};
