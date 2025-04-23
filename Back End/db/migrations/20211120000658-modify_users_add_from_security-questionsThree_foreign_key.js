'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', {
      fields: ["questionTwo"],
      type: 'foreign key',
      name: 'questionTwo_foreign_key',
      references: {
        table: 'security_questions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'questionTwo_foreign_key');
  }
};