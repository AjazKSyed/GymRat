'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'notifications',
      'groupId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'notifications',
      'groupId'
    );
  }
}
