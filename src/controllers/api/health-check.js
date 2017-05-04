/**
 * @api {get} /health-check Health-Check
 * @apiName HealthCheck
 * @apiGroup Application
 * @apiPermission public
 *
 * @apiDescription Simples health-check da aplicação
 *
 * @apiSuccess {String} OK Success message
 *
 * @apiSuccessExample {html} Success-Response
 * HTTP/1.1 200 OK
 */
module.exports = (req, res) => res.send('OK');
