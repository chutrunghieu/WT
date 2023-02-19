'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positionLevels', [
      {
        name: 'Lao động phổ thông',
        code: 'LDPT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chuyên viên',
        code: 'CV',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Trưởng nhóm',
        code: 'TN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Trưởng phòng',
        code: 'TP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quản lí cấp trung',
        code: 'QLCT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quản lí cấp cao',
        code: 'QLCC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lãnh đạo',
        code: 'LD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lao động kỹ thuật - NV văn phòng',
        code: 'LDKT-NVVP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
     return queryInterface.bulkDelete('positionLevels', null, {});
  },
};
