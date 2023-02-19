'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('requirements', [
      {
        name: 'Thông thạo Excel',
        description: 'Thông thạo Excel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Thông thạo Word',
        description: 'Thông thạo Word',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('requirements', null, {});
  },
};
