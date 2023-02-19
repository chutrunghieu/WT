'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class workTracks extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            workTracks.belongsTo(models.kpiNorms, { foreignKey: 'kpiNorm_id', targetKey: 'id' });
            workTracks.belongsTo(models.missions, { foreignKey: 'mission_id', targetKey: 'id' });
            workTracks.hasMany(models.workTrackLogs, {
                targetKey: 'id',
                foreignKey: 'workTrack_id',
                onDelete: 'SET NULL',
            });
        }
    }
    workTracks.init({
        kpiNorm_id: DataTypes.INTEGER,
        parent_id: DataTypes.INTEGER,
        mission_id: DataTypes.INTEGER,
        // createdBy: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        priority: DataTypes.INTEGER,
        review: DataTypes.STRING,
        note: DataTypes.TEXT,
        description: DataTypes.TEXT,
        deadline: DataTypes.STRING,
        startDate: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM(['pending', 'accepted', 'completed', 'closed']),
            defaultValue: 'accepted',
        },
    }, {
        sequelize,
        modelName: 'workTracks',
    });
    return workTracks;
};
