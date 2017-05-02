/**
 *
 * @param sequelize
 * @param DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    ddd: {
      type: DataTypes.INTEGER(3),
      allowNull: false
    },
    numero: {
      type: DataTypes.INTEGER(9),
      allowNull: false
    }
  }, {
    tableName: 'telefones',
    timestamps: true,
    underscored: true,
    updatedAt: 'data_atualizacao',
    createdAt: 'data_criacao'
  });
  return Phone;
};
