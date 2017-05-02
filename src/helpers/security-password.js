/**
 * Module dependencies.
 */
const crypto = require('crypto');

const internals = {};
/**
 *
 * @param length
 */
internals.generateSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
};
/**
 *
 * @param password
 * @param salt
 */
internals.generateHash = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return {
    salt: salt,
    hash: hash.digest('hex')
  };
};

module.exports = {
  /**
   *
   * @param userPassword
   * @return {{salt, hash}}
   */
  saltHashPassword: (userPassword, salt) => {
    salt = salt || internals.generateSalt(16);
    return internals.generateHash(userPassword, salt);
  }
};
