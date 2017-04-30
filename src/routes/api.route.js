/**
 * Module dependencies.
 */
const Express = require('express');

const apiController = require('../controllers/api/index');

const router = Express.Router(); // eslint-disable-line new-cap

router.get('/v1', apiController.version);
router.get('/v1/health-check', apiController.healthCheck);

module.exports = router;
