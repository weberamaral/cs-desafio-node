/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const APIError = require('../../helpers/api-error');
const models = require('../../config/sequelize');
const messages = require('../../config/messages');

/**
 * @api {post} /auth/sign_in Login
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission by token
 *
 * @apiDescription Autenticação do usuário na API
 *
 * @apiExample Exemplo de uso
 * curl -i http://localhost:8080/api/v1/auth/sign_in
 *
 * @apiHeader {String} Authentication
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authentication": "Bearer eyJhbGciOiJIUzI1N..."
 * }
 *
 * @apiSuccess {String} id
 * @apiSuccess {String} nome
 * @apiSuccess {String} ultimo_login
 * @apiSuccess {String} data_atualizacao
 * @apiSuccess {String} data_criacao
 * @apiSuccess {String} token
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "nome": "Weber Amaral",
 *   "email": "email@email.com",
 *   "ultimo_login": "2017-05-03T19:02:32.000Z",
 *   "data_atualizacao": "2017-05-03T19:02:32.000Z",
 *   "data_criacao": "2017-05-03T19:02:32.000Z",
 *   "token": "eyJhbGciOiJIUzI1N...."
 * }
 *
 * @apiError UserUnAuthorized Usuário não autorizado
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 UnAuthorized
 * {
 *   "mensagem": "E-mail e/ou senha inexistente",
 *   "code": 401
 * }
 *
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
