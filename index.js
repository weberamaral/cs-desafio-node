/**
 * Module dependencies.
 */
const App = require('./src/config/express');
const debug = require('debug')('cs-desafio-node:index');

const config = require('./src/config/config');
const models = require('./src/config/sequelize');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

debug('Starting cs-desafio-node server');

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) { // eslint-disable-line no-lonely-if
  App.listen(config.port, () => {
    debug(`Server started on port ${config.port} and pid ${process.pid}`);
  });
  models.sequelize.sync({ force: config.sequelize.forceDbSync }).then(() => {
    debug('Database connection Okay.');
  });
}

module.exports = App;
