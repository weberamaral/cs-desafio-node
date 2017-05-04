/**
 * @api {get} /health-check Health-Check
 * @apiName HealthCheck
 * @apiGroup Application
 * @apiPermission public
 *
 * @apiDescription Simples health-check da aplicação
 *
 * @apiExample Exemplo de uso
 * curl -i http://localhost:8080/api/v1/health-check
 *
 * @apiSuccess {String} OK Success message
 *
 * @apiSuccessExample {html} Success-Response
 * HTTP/1.1 200 OK
 */
module.exports = (req, res) => res.send('OK');
