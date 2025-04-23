'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'distance');
    await queryInterface.removeColumn('users', 'answerOne');
    await queryInterface.removeColumn('users', 'answerTwo');
    await queryInterface.removeColumn('users', 'answerThree');

    await queryInterface.removeConstraint('users', 'questionOne_foreign_key', {})
    await queryInterface.removeConstraint('users', 'questionTwo_foreign_key', {})
    await queryInterface.removeConstraint('users', 'questionThree_foreign_key', {})

    await queryInterface.removeColumn('users', 'questionOne');
    await queryInterface.removeColumn('users', 'questionTwo');
    await queryInterface.removeColumn('users', 'questionThree');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};