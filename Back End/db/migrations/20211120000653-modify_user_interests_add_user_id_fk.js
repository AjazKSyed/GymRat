'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('user_interests', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_interests_user_foreign_key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('user_interests', 'user_interests_user_foreign_key');
  }
};
