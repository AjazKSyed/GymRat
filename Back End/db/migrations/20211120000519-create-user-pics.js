"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_pics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      imgtype: {
        type: Sequelize.ENUM('general0', 'general1', 'general2', 'general3', 'profile')
      },
      status: {
        type: Sequelize.ENUM('approved', 'pending', 'rejected'),
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_pics");
  }
};
