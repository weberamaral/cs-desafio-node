/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');
const APIError = require('../../helpers/api-error');
const messages = require('../../config/messages');
const models = require('../../config/sequelize');

/**
 *
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  let userInstance;
  return models.sequelize.transaction(transaction =>
    models.User.create(req.body, { transaction })
      .then((user) => {
        userInstance = user;
        req.body.telefones.forEach((phone) => {
          phone.usuario_id = user.id; // eslint-disable-line no-param-reassign
        });
        return models.Phone.bulkCreate(req.body.telefones, { transaction, individualHooks: true });
      })
      .then(() => res.status(HttpStatus.CREATED).json(userInstance))
      .catch((err) => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return next(new APIError(messages.errors.user.create.email, HttpStatus.CONFLICT));
        }
        return next(err);
      })
  );
};
