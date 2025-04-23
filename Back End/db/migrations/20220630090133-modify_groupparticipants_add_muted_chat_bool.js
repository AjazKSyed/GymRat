'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'groupparticipants',
      'muted',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    );

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'groupparticipants',
      'muted'
    );
  }
}
