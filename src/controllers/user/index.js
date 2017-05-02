/**
 * Module dependencies.
 */
const createUser = require('./create');
const getUser = require('./get');

module.exports = {
  create: createUser,
  get: getUser
};
