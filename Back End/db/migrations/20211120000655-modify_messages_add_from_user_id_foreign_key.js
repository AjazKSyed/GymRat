'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('messages', {
      fields: ["fromuserId"],
      type: 'foreign key',
      name: 'messages_from_user_id_foreign_key',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('messages', 'messages_from_user_id_foreign_key');
  }
};
