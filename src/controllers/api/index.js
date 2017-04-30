/**
 * Module dependencies.
 */
const versionApi = require('./version');
const healthCheckApi = require('./health-check');

module.exports = {
  version: versionApi,
  healthCheck: healthCheckApi
};
