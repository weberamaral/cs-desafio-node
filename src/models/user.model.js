/**
 * Module dependencies.
 */
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
    instanceMethods: {
      toJSON: () => {
        const values = this.values();
        delete values.senha;
        delete values.salt;
        return value;
      },
      authenticate: (plainText) => {
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
    }
  });
  return User;
};
