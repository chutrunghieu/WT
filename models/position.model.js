'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class positions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            positions.belongsTo(models.departments, { foreignKey: 'department_id', targetKey: 'id' });
            positions.belongsTo(models.positionLevels, { foreignKey: 'position_levels_id', targetKey: 'id' });
            positions.hasMany(models.users, {
                targetKey: 'id',
                foreignKey: 'position_id',
                onDelete: 'SET NULL',
              });
            positions.hasMany(models.kpiNorms, {
                targetKey: 'id',
                foreignKey: 'position_id',
                onDelete: 'SET NULL',
            });
        }
    }
    positions.init({
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        description: DataTypes.TEXT,
        address: DataTypes.STRING,
        manager: DataTypes.INTEGER,
        position_levels_id: DataTypes.INTEGER,
        department_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'positions',
    });
    return positions;
};
