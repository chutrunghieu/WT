'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class positionRequirements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.requirements.belongsToMany(models.positions, { through: positionRequirements, onDelete: 'CASCADE' });
      models.positions.belongsToMany(models.requirements, { through: positionRequirements, onDelete: 'CASCADE' });
    }
  }
  positionRequirements.init({
    requirementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      positionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'positionRequirements',
  });
  return positionRequirements;
};
