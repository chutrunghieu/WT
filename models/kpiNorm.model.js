'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class kpiNorms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            kpiNorms.belongsTo(models.departments, { foreignKey: 'department_id', targetKey: 'id' });
            kpiNorms.belongsTo(models.units, { foreignKey: 'unit_id', targetKey: 'id' });
            kpiNorms.belongsTo(models.positions, { foreignKey: 'position_id', targetKey: 'id' });
            kpiNorms.hasMany(models.workTracks, {
                targetKey: 'id',
                foreignKey: 'kpiNorm_id',
                onDelete: 'SET NULL',
            });
        }
    }
    kpiNorms.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        quantity: DataTypes.INTEGER,
        kpi_value: DataTypes.INTEGER,
        descriptionKpiValue: DataTypes.STRING,
        manday: DataTypes.INTEGER,
        taskType: DataTypes.STRING,
        parent_id: DataTypes.INTEGER,
        department_id: DataTypes.INTEGER,
        position_id: DataTypes.INTEGER,
        unit_id: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'kpiNorms',
    });
    return kpiNorms;
};
