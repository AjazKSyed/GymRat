'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_friends', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      friendUserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)')
      },
      sentId: {
        type: Sequelize.INTEGER
      },
      gotId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('APPROVED', 'PENDING', 'DENIED')
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_friends');
  }
};