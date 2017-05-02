/**
 * Module dependencies.
 */
const Express = require('express');
const ExpressValidation = require('express-validation');

const validations = require('../config/params-validation');
const userController = require('../controllers/user/index');

const router = Express.Router(); // eslint-disable-line new-cap

router.post('/v1/users', ExpressValidation(validations.user.create), userController.create);

module.exports = router;
