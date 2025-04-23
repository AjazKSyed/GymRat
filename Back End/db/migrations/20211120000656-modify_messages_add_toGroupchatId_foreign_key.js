'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('messages', {
      fields: ["toGroupchatId"],
      type: 'foreign key',
      name: 'messages_toGroupchatId_foreign_key',
      references: {
        table: 'groupchat',
        field: 'groupchatId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('messages', 'messages_toGroupchatId_foreign_key');
  }
};
