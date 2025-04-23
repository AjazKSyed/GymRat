'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('user_interests', {
      fields: ['interestId'],
      type: 'foreign key',
      name: 'user_interests_interest_foreign_key',
      references: {
        table: 'interests',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('user_interests', 'user_interests_interest_foreign_key');
  }
};
