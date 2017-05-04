/**
 * Module dependencies.
 */
const HttpStatus = require('http-status');
const APIError = require('../../helpers/api-error');
const messages = require('../../config/messages');
const models = require('../../config/sequelize');

/**
 * @api {post} /user CreateUser
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Cadastro de usuário
 *
 * @apiParam {String} nome Nome do usuário
 * @apiParam {String} email E-mail do usuário
 * @apiParam {String} senha Senha do usuário
 * @apiParam {Array} telefones Telefones do usuário
 *
 * @apiParamExample {json} Request-Example
 * {
 *   "nome": "Weber Amaral",
 *   "email": "email@email.com",
 *   "senha": "123mudar",
 *   "telefones": [
 *     {
 *       "ddd": "11",
 *       "numero": "987651234"
 *     }
 *   ]
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
 * @apiError ConflictError Usuário existente
 * @apiErrorExample {json} Conflito
 * HTTP/1.1 409 Conflict
 * {
 *   "mensagem": "E-mail já existente",
 *   "code": 409
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
