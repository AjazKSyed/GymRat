'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('groupparticipants', {
      fields: ["userId"],
      type: 'foreign key',
      name: 'groupparticipants_userId_foreign_key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('groupparticipants', 'groupparticipants_userId_foreign_key');
  }
};
