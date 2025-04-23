'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('users', {
      fields: ["questionThree"],
      type: 'foreign key',
      name: 'questionThree_foreign_key',
      references: {
        table: 'security_questions',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'questionThree_foreign_key');
  }
};