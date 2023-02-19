'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class missions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            missions.belongsTo(models.units, { foreignKey: 'unit_id', targetKey: 'id' });
            missions.hasMany(models.workTracks, {
                targetKey: 'id',
                foreignKey: 'mission_id',
                onDelete: 'SET NULL',
            });
        }
    }
    missions.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        unit_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        kpiValue: DataTypes.INTEGER,
        startTime: DataTypes.STRING,
        endTime: DataTypes.STRING,
        manday: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'missions',
    });
    return missions;
};
