'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', {
      fields: ["questionOne"],
      type: 'foreign key',
      name: 'questionOne_foreign_key',
      references: {
        table: 'security_questions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'questionOne_foreign_key');
  }
};