'use strict';
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      departments.hasMany(models.users, {
        targetKey: 'id',
        foreignKey: 'department_id',
        onDelete: 'SET NULL',
      });
      departments.hasMany(models.kpiNorms, {
        targetKey: 'id',
        foreignKey: 'department_id',
        onDelete: 'SET NULL',
    });
    departments.hasMany(models.positions, {
      targetKey: 'id',
      foreignKey: 'department_id',
      onDelete: 'SET NULL',
  });
    }
  }
  departments.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    code: DataTypes.STRING,
    organizationLevel: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'departments',
  });
  return departments;
};
