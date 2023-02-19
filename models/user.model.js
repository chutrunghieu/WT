'use strict';
const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            users.belongsTo(models.departments, { foreignKey: 'department_id', targetKey: 'id' });
            users.belongsTo(models.positions, { foreignKey: 'position_id', targetKey: 'id' });
            users.hasMany(models.tokens, {
                targetKey: 'id',
                foreignKey: 'user_id',
                onDelete: 'SET NULL',
            });
        }
    }
    users.init({
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'Username already in use!',
            },
        },
        password: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM(['user', 'admin', 'manager']),
            defaultValue: 'user',
        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        sex: {
            type: DataTypes.ENUM(['male', 'female']),
        },
        dateOfBirth: DataTypes.STRING,
        dateOfJoin: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        department_id: DataTypes.INTEGER,
        position_id: DataTypes.INTEGER,
        isDelete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'users',
    });
    return users;
};
