/**
 * Module dependencies.
 */
const Express = require('express');
const ExpressValidation = require('express-validation');

const validations = require('../config/params-validation');
const authController = require('../controllers/auth/index');

const router = Express.Router(); // eslint-disable-line new-cap

router.post('/v1/auth/sign_in', ExpressValidation(validations.auth.login), authController.login);

module.exports = router;
