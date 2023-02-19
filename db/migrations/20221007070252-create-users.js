'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
          unique: {
            args: true,
            msg: 'Username already in use!',
          },
        },
        password: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.ENUM(['user', 'admin', 'manager']),
          defaultValue: 'user',
        },
        code: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        sex: {
          type: Sequelize.ENUM(['male', 'female']),
        },
        dateOfBirth: {
          type: Sequelize.STRING,
        },
        dateOfJoin: {
          type: Sequelize.STRING,
        },
        phone: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        department_id: {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
            model: 'departments',
            key: 'id',
          },
        },
        position_id: {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
            model: 'positions',
            key: 'id',
          },
        },
        isDelete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        tableName: 'users',
        freezeTableName: true,
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
