/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const models = require('../../config/sequelize');

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  models.User.create(req.body)
    .then((user) => {
      return res.status(HttpStatus.CREATED).json(user);
    })
    .catch((err) => next(err));
};
