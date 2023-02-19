'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('missionDepartments', [
      {
        missionId: 1,
        departmentId: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        missionId: 1,
        departmentId: 12,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        missionId: 2,
        departmentId: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        missionId: 2,
        departmentId: 12,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        missionId: 3,
        departmentId: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        missionId: 3,
        departmentId: 13,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('missionDepartments', null, {});
  },
};
