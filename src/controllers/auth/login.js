/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');

const APIError = require('../../helpers/api-error');
const models = require('../../config/sequelize');
const messages = require('../../config/messages');

/**
 * @api {post} /auth/sign_in Login
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission by token
 *
 * @apiDescription Autenticação do usuário na API
 *
 * @apiSuccess {String} id Id do usuário na aplicação
 * @apiSuccess {String} nome Nome do usuário cadastrado
 * @apiSuccess {String} ultimo_login Último login do usuário na aplicação
 * @apiSuccess {String} data_atualizacao Data da última atualização do usuário
 * @apiSuccess {String} data_criacao data de criação do usuário
 * @apiSuccess {String} token Token de acesso do usuário na aplicação
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
 * @apiError UnAuthorizedError Usuário não autorizado
 * @apiErrorExample {json} Não autorizado
 * HTTP/1.1 401 UnAuthorized
 * {
 *   "mensagem": "E-mail e/ou senha inexistente",
 *   "code": 401
 * }
 *
 * @apiError UnprocessableEntityError Erro ao processar dados da entidade
 * @apiErrorexample {json} Entidade não processada
 * HTTP/1.1 422 Unprocessable entity
 * {
 *   "mensagem": "Erro de validação de dados"
 *   "code": 422,
 *   "errors": [
 *     {
 *       "field": "field_name",
 *       "mensagem": "Descrição do erro"
 *     }
 *   ]
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
