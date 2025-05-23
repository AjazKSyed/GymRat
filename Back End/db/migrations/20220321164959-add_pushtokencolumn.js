'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'pushTokenKey',
     Sequelize.STRING
    );

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users',
      'pushTokenKey'
    );
  }
}
