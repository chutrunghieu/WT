'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      units.hasMany(models.kpiNorms, {
        targetKey: 'id',
        foreignKey: 'unit_id',
        onDelete: 'SET NULL',
      });
      units.hasMany(models.missions, {
        targetKey: 'id',
        foreignKey: 'unit_id',
        onDelete: 'SET NULL',
      });
    }
  }
  units.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'units',
  });
  return units;
};
