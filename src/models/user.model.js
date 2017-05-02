/**
 * Module dependencies.
 */
const debug = require('debug')('cs-desafio-node:user.model');

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
      beforeCreate: function (user) { // eslint-disable-line object-shorthand
        const saltHashPassword = securityPassword.saltHashPassword(user.senha);
        user.salt = saltHashPassword.salt; // eslint-disable-line no-param-reassign
        user.senha = saltHashPassword.hash; // eslint-disable-line no-param-reassign
        user.ultimo_login = user.data_criacao; // eslint-disable-line no-param-reassign
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
        return securityPassword.saltHashPassword(plainText, this.salt) ===
            this.senha;
      }
    },
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Phone, {
          as: 'phones',
          foreignKey: {
            allowNull: false
          }
        });
      }
    },
  });
  return User;
};
