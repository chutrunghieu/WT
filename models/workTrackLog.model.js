'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class workTrackLogs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            workTrackLogs.belongsTo(models.workTracks, { foreignKey: 'workTrack_id', targetKey: 'id' });
        }
    }
    workTrackLogs.init({
        status: {
            type: DataTypes.ENUM(['inProgress', 'completed', 'expired']),
            defaultValue: 'inProgress',
        },
        date: DataTypes.STRING,
        note: DataTypes.STRING,
        workTrack_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'workTrackLogs',
    });
    return workTrackLogs;
};
