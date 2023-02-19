'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('units', [
      {
        name: 'Suppliers',
        code: 'DV01',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'File',
        code: 'DV02',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Data',
        code: 'DV03',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Report',
        code: 'DV04',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bộ',
        code: 'DV05',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Báo cáo',
        code: 'DV06',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hợp đồng',
        code: 'DV07',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lần',
        code: 'DV08',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('units', null, {});
  },
};
