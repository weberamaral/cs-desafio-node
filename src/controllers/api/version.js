/**
 * Module dependencies.
 */
const { name, version } = require('../../../package.json');

/**
 *
 * @param req
 * @param res
 */
module.exports = (req, res) => res.json({ name, version });
