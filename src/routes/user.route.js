/**
 * Module dependencies.
 */
const Express = require('express');

const userController = require('../controllers/user/index');

const router = Express.Router(); // eslint-disable-line new-cap

router.post('/v1/users', userController.create);

module.exports = router;
