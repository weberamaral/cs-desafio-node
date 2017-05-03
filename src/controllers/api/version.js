/**
 * Module dependencies.
 */
const { name, version } = require('../../../package.json');

/**
 * @api {get} / Index
 * @apiVersion 0.1.0
 * @apiName Index
 * @apiGroup Application
 * @apiPermission public
 *
 * @apiDescription Apresentação da versão e nome da aplicação
 *
 * @apiExample Exemplo de uso
 * curl -i http://localhost:8080/api/v1/
 *
 * @apiSuccess {String} name Nome da aplicação
 * @apiSuccess {String} version Versão da aplicação
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "name": "cs-desadio-node",
 *   "version": "1"
 * }
 */
module.exports = (req, res) => res.json({ name, version });
