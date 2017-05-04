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
 * @api {get} /user/:id GetUser
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission by token
 *
 * @apiDescription Busca de usuário
 *
 * @apiParam {String} id Id do usuário para busca
 *
 * @apiHeader {String} Authentication Bearer token de autorização
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *   "Authentication": "Bearer eyJhbGciOiJIUzI1N..."
 * }
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
 *   "mensagem": "Não autorizado",
 *   "code": 401
 * }
 *
 * @apiError SessionInvalidError Sessão Inválida
 * @apiErrorExample {json} Sessão Inválida
 * HTTP/1.1 401 UnAuthorized
 * {
 *   "mensagem": "Sessão Inválida",
 *   "code": 401
 * }
 *
 * @apiError NotFoundError Não Encontrado
 * @apiErrorExample {json} Não Encontrado
 * HTTP/1.1 404 NotFound
 * {
 *   "mensagem": "Usuário não encontrado",
 *   "code": 404
 * }
 *
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
