'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positionRequirements', [
      {
        positionId: 14,
        requirementId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        positionId: 14,
        requirementId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('positionRequirements', null, {});
  },
};
