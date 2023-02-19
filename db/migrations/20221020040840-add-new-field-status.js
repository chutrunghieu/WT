'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'workTracks', // table name
      'status', // new field name
      {
        type: Sequelize.ENUM(['pending', 'accepted', 'completed', 'closed']),
        defaultValue: 'accepted',
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('workTracks', 'status');
  },
};
