'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class positionLevels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      positionLevels.hasMany(models.positions, {
        targetKey: 'id',
        foreignKey: 'position_levels_id',
        onDelete: 'SET NULL',
    });
    }
  }
  positionLevels.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'positionLevels',
  });
  return positionLevels;
};
