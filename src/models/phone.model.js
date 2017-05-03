/**
 *
 * @param sequelize
 * @param DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    ddd: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING(9),
      allowNull: false
    }
  }, {
    tableName: 'telefones',
    timestamps: true,
    underscored: true,
    updatedAt: 'data_atualizacao',
    createdAt: 'data_criacao',
    classMethods: {
      associate: (models) => {
        Phone.belongsTo(models.User, {
          as: 'usuario',
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Phone;
};
