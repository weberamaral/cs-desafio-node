/**
 * Module dependencies.
 */
const JWT = require('jsonwebtoken');
const Moment = require('moment');

const config = require('../config/config');
const securityPassword = require('../helpers/security-password');

/**
 *
 * @param sequelize
 * @param DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ultimo_login: {
      type: DataTypes.DATE
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'usuarios',
    timestamps: true,
    underscored: true,
    updatedAt: 'data_atualizacao',
    createdAt: 'data_criacao',
    hooks: {
      /* eslint-disable no-param-reassign */
      /* eslint-disable func-names */
      beforeValidate: function (user) { // eslint-disable-line object-shorthand
        const saltHashPassword = securityPassword.saltHashPassword(user.senha);
        user.salt = saltHashPassword.salt;
        user.senha = saltHashPassword.hash;
        return sequelize.Promise.resolve(user);
      },
      /* eslint-disable no-param-reassign */
      /* eslint-disable func-names */
      beforeCreate: function (user) { // eslint-disable-line object-shorthand
        user.ultimo_login = user.data_criacao;
        user.token = JWT.sign({
          email: user.email,
          exp: Moment(new Date(user.data_criacao)).add(30, 'minutes').valueOf(),
          iat: (new Date(user.data_criacao)).getTime()
        }, config.security.jwt);
        return sequelize.Promise.resolve(user);
      }
    },
    instanceMethods: {
      toJSON: function () { // eslint-disable-line object-shorthand
        const values = this.get();
        delete values.senha;
        delete values.salt;
        return values;
      },
      authenticate: function (plainText) { // eslint-disable-line object-shorthand
        return securityPassword.saltHashPassword(plainText, this.salt).hash ===
            this.senha;
      }
    }
  });
  return User;
};
