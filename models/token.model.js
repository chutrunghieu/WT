'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tokens extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            tokens.belongsTo(models.users, { foreignKey: 'user_id', targetKey: 'id' });
        }
    }
    tokens.init({
        data_token: DataTypes.STRING,
        type: {
            type: DataTypes.ENUM(['refreshToken', 'expired']),
            defaultValue: 'refreshToken',
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'tokens',
    });
    return tokens;
};
